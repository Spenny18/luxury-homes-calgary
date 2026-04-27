import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "node:http";
import session from "express-session";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { storage, stripUser } from "./storage";
import { seedDatabase } from "./seed";
import { signUpSchema, signInSchema, inquirySchema } from "@shared/schema";
import { runSync } from "./rets-sync";
import { fetchListingPhoto } from "./rets-photos";

const execFileAsync = promisify(execFile);

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

// Bearer-token store (used because the deploy proxy strips Set-Cookie headers,
// so the iframe-hosted app cannot use real cookie sessions). Tokens live in
// memory and clear on server restart — acceptable for a single-tenant demo app.
const bearerTokens = new Map<string, { userId: number; createdAt: number }>();
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function issueToken(userId: number): string {
  const token = randomBytes(24).toString("base64url");
  bearerTokens.set(token, { userId, createdAt: Date.now() });
  return token;
}

function resolveUserId(req: Request): number | null {
  // Prefer Authorization: Bearer <token>
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.slice(7);
    const entry = bearerTokens.get(token);
    if (entry && Date.now() - entry.createdAt < TOKEN_TTL_MS) {
      return entry.userId;
    }
  }
  // Fall back to session cookie (works in dev / direct origin)
  if (req.session?.userId) return req.session.userId;
  return null;
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = resolveUserId(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  (req as any).authUserId = userId;
  next();
}

// Tiny in-memory rate limiter. Tracks request counts per IP per route.
// Sufficient for a single-instance deploy; resets on restart.
function rateLimit(opts: { windowMs: number; max: number; key: string }) {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  return (req: Request, res: Response, next: NextFunction) => {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    const key = `${opts.key}:${ip}`;
    const now = Date.now();
    const bucket = buckets.get(key);
    if (!bucket || bucket.resetAt < now) {
      buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
      return next();
    }
    if (bucket.count >= opts.max) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again shortly." });
    }
    bucket.count += 1;
    next();
  };
}

const signInLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  key: "signin",
});
const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  key: "inquiry",
});

async function sendInquiryEmail(opts: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  listingTitle?: string;
  listingAddress?: string;
}) {
  const subject = opts.listingTitle
    ? `New inquiry — ${opts.listingTitle}`
    : `New inquiry from ${opts.name}`;

  const body = [
    `New inquiry received via luxuryhomescalgary.ca`,
    ``,
    `Property: ${opts.listingTitle ?? "(general inquiry)"}`,
    opts.listingAddress ? `Address: ${opts.listingAddress}` : "",
    ``,
    `From: ${opts.name}`,
    `Email: ${opts.email}`,
    opts.phone ? `Phone: ${opts.phone}` : "",
    ``,
    `Message:`,
    opts.message,
    ``,
    `—`,
    `Sent automatically from luxuryhomescalgary.ca`,
  ]
    .filter(Boolean)
    .join("\n");

  const payload = {
    source_id: "gcal",
    tool_name: "send_email",
    arguments: {
      action: {
        action: "send",
        to: ["spencer@riversrealestate.ca"],
        cc: [],
        bcc: [],
        subject,
        body,
      },
    },
  };

  try {
    const { stdout } = await execFileAsync("external-tool", [
      "call",
      JSON.stringify(payload),
    ], { timeout: 20_000 });
    return { ok: true, response: stdout };
  } catch (err: any) {
    console.error("[inquiry email] failed:", err?.stderr || err?.message || err);
    return { ok: false, error: String(err?.stderr || err?.message || err) };
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Seed on startup (idempotent)
  try {
    seedDatabase();
  } catch (e) {
    console.error("[seed] failed:", e);
  }

  // Sessions — cookie-based, no localStorage needed.
  // The deployed site is loaded inside an iframe and the API is proxied
  // through a different origin, so cookies must be SameSite=None+Secure to
  // be accepted in that third-party context. In dev we use lax+insecure.
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) app.set("trust proxy", 1);

  // Resolve session secret. In production we REFUSE to start without one
  // so a forgeable hardcoded fallback can't ship to a live URL.
  let sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    if (isProd) {
      // Generate a random per-process secret. Sessions reset on restart,
      // but they cannot be forged.
      sessionSecret = randomBytes(48).toString("base64url");
      console.warn(
        "[auth] SESSION_SECRET not set \u2014 using ephemeral random secret. Sessions reset on restart.",
      );
    } else {
      sessionSecret = "rivers-dev-only-secret";
    }
  }

  app.use(
    session({
      // Published *.pplx.app sites strip any cookie whose name doesn't
      // start with __Host-. Use that prefix in production so the session
      // cookie survives the proxy.
      name: isProd ? "__Host-rivers-sid" : "rivers.sid",
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  // ---------- AUTH ----------
  // This is a single-tenant back-office for Spencer Rivers. Public sign-up
  // is disabled — the seed user is the only legitimate account. Returning
  // 404 hides the endpoint entirely from probing.
  app.post("/api/auth/sign-up", async (_req, res) => {
    return res.status(404).json({ message: "Not found" });
  });

  app.post("/api/auth/sign-in", signInLimiter, async (req, res) => {
    const parsed = signInSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = storage.getUserByEmail(parsed.data.email);
    if (!user || !bcrypt.compareSync(parsed.data.password, user.passwordHash)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.userId = user.id;
    const token = issueToken(user.id);
    res.json({ user: stripUser(user), token });
  });

  app.post("/api/auth/sign-out", (req, res) => {
    // Invalidate Bearer token if present
    const auth = req.headers.authorization;
    if (auth?.startsWith("Bearer ")) {
      bearerTokens.delete(auth.slice(7));
    }
    req.session?.destroy?.(() => {
      res.json({ ok: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    const userId = resolveUserId(req);
    if (!userId) return res.json({ user: null });
    const user = storage.getUserById(userId);
    if (!user) return res.json({ user: null });
    res.json({ user: stripUser(user) });
  });

  // ---------- LISTINGS ----------
  // Public: list all active listings (used on agent dashboard + public listing page)
  app.get("/api/listings", (_req, res) => {
    res.json(storage.listListings());
  });

  // Public: get listing by slug (public-facing property page)
  app.get("/api/listings/by-slug/:slug", (req, res) => {
    const listing = storage.getListingBySlug(req.params.slug);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    storage.incrementViews(listing.id);
    res.json(listing);
  });

  // Authenticated: get by id (for editing)
  app.get("/api/listings/:id", requireAuth, (req, res) => {
    const listing = storage.getListingById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  });

  app.post("/api/listings", requireAuth, (req, res) => {
    const userId = (req as any).authUserId as number;
    try {
      const created = storage.createListing(req.body, userId);
      res.json(created);
    } catch (e: any) {
      res.status(400).json({ message: e.message ?? "Could not create listing" });
    }
  });

  app.patch("/api/listings/:id", requireAuth, (req, res) => {
    const updated = storage.updateListing(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Listing not found" });
    res.json(updated);
  });

  app.delete("/api/listings/:id", requireAuth, (req, res) => {
    const ok = storage.deleteListing(req.params.id);
    res.json({ ok });
  });

  // ---------- LEADS ----------
  app.get("/api/leads", requireAuth, (_req, res) => {
    res.json(storage.listLeads());
  });

  app.patch("/api/leads/:id", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!req.body.status) return res.status(400).json({ message: "status required" });
    const updated = storage.updateLeadStatus(id, req.body.status);
    if (!updated) return res.status(404).json({ message: "Lead not found" });
    res.json(updated);
  });

  // ---------- MESSAGES ----------
  app.get("/api/leads/:id/messages", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.json(storage.listMessagesByLead(id));
  });

  app.post("/api/leads/:id/messages", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!req.body.body) return res.status(400).json({ message: "body required" });
    const msg = storage.createMessage({
      leadId: id,
      fromAgent: true,
      body: req.body.body,
    });
    res.json(msg);
  });

  // ---------- TOURS ----------
  app.get("/api/tours", requireAuth, (_req, res) => {
    res.json(storage.listTours());
  });

  app.post("/api/tours", requireAuth, (req, res) => {
    try {
      const tour = storage.createTour(req.body);
      res.json(tour);
    } catch (e: any) {
      res.status(400).json({ message: e.message ?? "Invalid tour data" });
    }
  });

  app.patch("/api/tours/:id", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid id" });
    const status = (req.body ?? {}).status;
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Status required" });
    }
    const updated = storage.updateTourStatus(id, status);
    if (!updated) return res.status(404).json({ message: "Tour not found" });
    res.json(updated);
  });

  // ---------- PUBLIC INQUIRY ----------
  // Creates a lead row + sends Spencer an email via Gmail (gcal connector).
  app.post("/api/inquiry", inquiryLimiter, async (req, res) => {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }
    const lead = storage.createLead({
      listingId: parsed.data.listingId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      source: parsed.data.source ?? "Landing page",
      status: "new",
    } as any);

    // Look up listing details for the email
    let listingTitle: string | undefined;
    let listingAddress: string | undefined;
    if (parsed.data.listingId) {
      const l = storage.getListingById(parsed.data.listingId);
      if (l) {
        listingTitle = l.title;
        listingAddress = l.address;
      }
    }

    // Fire-and-forget email; don't block the response on it
    sendInquiryEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      listingTitle,
      listingAddress,
    }).then((r) => {
      if (!r.ok) console.warn("[inquiry] email did not send:", r.error);
    });

    res.json({ ok: true, leadId: lead.id });
  });

  // ---------- PUBLIC MLS / MARKETING API ----------
  // GET /api/public/mls/search — paginated, filterable MLS search
  app.get("/api/public/mls/search", (req, res) => {
    const q = req.query;
    const num = (v: any) => (v != null && v !== "" ? Number(v) : undefined);
    const result = storage.searchMlsListings({
      q: typeof q.q === "string" ? q.q : undefined,
      minPrice: num(q.minPrice),
      maxPrice: num(q.maxPrice),
      beds: num(q.beds),
      baths: num(q.baths),
      propertyType: typeof q.propertyType === "string" ? q.propertyType : undefined,
      neighbourhood: typeof q.neighbourhood === "string" ? q.neighbourhood : undefined,
      status: (typeof q.status === "string" ? q.status : "Active") || "Active",
      minSqft: num(q.minSqft),
      maxSqft: num(q.maxSqft),
      sort: q.sort as any,
      limit: num(q.limit) ?? 24,
      offset: num(q.offset) ?? 0,
    });
    res.json(result);
  });

  // GET /api/public/mls/featured
  app.get("/api/public/mls/featured", (_req, res) => {
    res.json(storage.listFeaturedMls(6));
  });

  // GET /api/mls/:id/photo/:idx — proxy real RETS photos through our server
  // so the browser never sees Pillar 9 credentials. Photos are cached for 24h
  // in memory (LRU, max 500 entries). Falls back to 404 → client placeholder.
  app.get("/api/mls/:id/photo/:idx", async (req, res) => {
    const id = req.params.id;
    const idx = parseInt(req.params.idx, 10);
    if (!id || !Number.isFinite(idx) || idx < 0 || idx > 49) {
      return res.status(400).json({ message: "Invalid photo request" });
    }
    // First check the listing exists and has at least idx+1 photos
    const listing = storage.getMlsListingById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if ((listing.photoCount ?? 0) <= idx) {
      return res.status(404).json({ message: "Photo index out of range" });
    }
    try {
      const photo = await fetchListingPhoto(id, idx);
      if (!photo) return res.status(404).json({ message: "Photo not available" });
      res.setHeader("Content-Type", photo.contentType);
      res.setHeader("Cache-Control", "public, max-age=86400, immutable");
      return res.end(photo.body);
    } catch (err: any) {
      console.error("[photo proxy] failure:", err?.message ?? err);
      return res.status(502).json({ message: "Photo backend unavailable" });
    }
  });

  // GET /api/public/mls/:id
  app.get("/api/public/mls/:id", (req, res) => {
    const listing = storage.getMlsListingById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    const safeParse = (s: string | null | undefined): any[] => {
      if (!s) return [];
      try { return JSON.parse(s); } catch { return []; }
    };
    const similar = storage.listSimilarMls(listing, 4);
    res.json({
      ...listing,
      gallery: safeParse(listing.gallery as any),
      features: safeParse(listing.features as any),
      similar,
    });
  });

  // GET /api/public/neighbourhoods (list)
  app.get("/api/public/neighbourhoods", (_req, res) => {
    res.json(storage.listNeighbourhoods());
  });

  // GET /api/public/neighbourhoods/:slug
  app.get("/api/public/neighbourhoods/:slug", (req, res) => {
    const n = storage.getNeighbourhoodBySlug(req.params.slug);
    if (!n) return res.status(404).json({ message: "Neighbourhood not found" });
    const listings = storage.listMlsByNeighbourhood(n.name, 24);
    res.json({ ...n, listings });
  });

  // GET /api/public/blog
  app.get("/api/public/blog", (_req, res) => {
    res.json(storage.listBlogPosts());
  });

  // GET /api/public/blog/:slug
  app.get("/api/public/blog/:slug", (req, res) => {
    const post = storage.getBlogBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  // GET /api/public/testimonials
  app.get("/api/public/testimonials", (_req, res) => {
    res.json(storage.listTestimonials());
  });

  // GET /api/public/stats — site stats for the homepage
  app.get("/api/public/stats", (_req, res) => {
    const activeCount = storage.countActiveMlsListings();
    const total = storage.countMlsListings();
    const lastSync = storage.getLatestSyncRun();
    res.json({
      activeListings: activeCount,
      totalListings: total,
      lastSyncAt: lastSync?.finishedAt ?? null,
      lastSyncStatus: lastSync?.status ?? null,
    });
  });

  // GET /api/admin/mls-sync (auth) — recent sync runs for admin sidebar
  app.get("/api/admin/mls-sync", requireAuth, (_req, res) => {
    res.json(storage.listRecentSyncRuns(15));
  });

  // POST /api/admin/mls-sync/run (auth) — manually trigger a sync run
  app.post("/api/admin/mls-sync/run", requireAuth, async (_req, res) => {
    try {
      // Fire-and-forget so the request returns quickly; the table will
      // pick up the new run on its next refetch.
      runSync().catch((err) => {
        console.error("[mls-sync] manual run failed:", err);
      });
      res.json({ ok: true, message: "Sync started" });
    } catch (err: any) {
      res.status(500).json({ ok: false, message: err?.message ?? "Sync failed" });
    }
  });

  // POST /api/admin/mls-sync/reset (auth) — drop & recreate mls_listings table
  // (used to recover from "database disk image is malformed" after a publish
  // restored a corrupt SQLite snapshot; sync immediately starts after rebuild).
  app.post("/api/admin/mls-sync/reset", requireAuth, async (_req, res) => {
    try {
      const { db } = await import("./storage");
      const { sql } = await import("drizzle-orm");
      // Drop the corrupt tables
      try { db.run(sql`DROP TABLE IF EXISTS mls_listings`); } catch (e) { console.error("[reset] drop mls_listings:", e); }
      try { db.run(sql`DROP TABLE IF EXISTS mls_sync_runs`); } catch (e) { console.error("[reset] drop mls_sync_runs:", e); }
      // Rebuild the file to recover any corrupt pages left behind
      try { db.run(sql`VACUUM`); console.log("[reset] VACUUM ok"); } catch (e) { console.error("[reset] VACUUM failed:", e); }
      // Recreate fresh schemas (mirror of CREATE TABLE in storage.ts)
      db.run(sql`
        CREATE TABLE IF NOT EXISTS mls_listings (
          id TEXT PRIMARY KEY,
          mls_number TEXT,
          listing_key INTEGER,
          source TEXT,
          status TEXT,
          list_price INTEGER,
          original_price INTEGER,
          beds INTEGER,
          beds_above INTEGER,
          beds_below INTEGER,
          baths REAL,
          half_baths INTEGER,
          sqft INTEGER,
          sqft_below INTEGER,
          year_built INTEGER,
          property_type TEXT,
          property_sub_type TEXT,
          street_number TEXT,
          street_name TEXT,
          street_suffix TEXT,
          street_dir_suffix TEXT,
          unit_number TEXT,
          city TEXT,
          province TEXT,
          postal_code TEXT,
          neighbourhood TEXT,
          full_address TEXT,
          lat REAL,
          lng REAL,
          description TEXT,
          features TEXT,
          gallery TEXT,
          hero_image TEXT,
          photo_count INTEGER,
          lot_size TEXT,
          parking TEXT,
          garage_spaces INTEGER,
          days_on_market INTEGER,
          list_office TEXT,
          list_agent TEXT,
          modification_timestamp TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      db.run(sql`
        CREATE TABLE IF NOT EXISTS mls_sync_runs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          finished_at TEXT,
          status TEXT,
          source TEXT,
          fetched INTEGER,
          upserted INTEGER,
          removed INTEGER,
          error_message TEXT
        )
      `);
      // Kick off fresh sync
      runSync().catch((err) => {
        console.error("[mls-sync] post-reset run failed:", err);
      });
      res.json({ ok: true, message: "Tables reset; sync started" });
    } catch (err: any) {
      res.status(500).json({ ok: false, message: err?.message ?? "Reset failed" });
    }
  });

  // ---------- POIs (Overpass API) ----------
  // GET /api/mls/:id/pois — schools, restaurants, parks, transit within 1km
  // Cached 24h in pois_cache table.
  app.get("/api/mls/:id/pois", async (req, res) => {
    const listing = storage.getMlsListingById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.lat == null || listing.lng == null) {
      return res.json({
        center: { lat: null, lng: null },
        radius: 1000,
        schools: [], restaurants: [], parks: [], transit: [],
        cached: false, message: "No coordinates for listing",
      });
    }
    const lat = Number(listing.lat);
    const lng = Number(listing.lng);
    const radius = 1000; // 1km
    const cacheId = `${lat.toFixed(4)}:${lng.toFixed(4)}:${radius}`;
    const cached = storage.getPoisCacheById(cacheId);
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    if (cached && new Date(cached.fetchedAt).getTime() > dayAgo) {
      try {
        const payload = JSON.parse(cached.payload);
        return res.json({ ...payload, center: { lat, lng }, radius, cached: true });
      } catch {}
    }
    // Build Overpass QL
    const ql = `[out:json][timeout:20];
(
  node[amenity~"^(school|college|university|kindergarten)$"](around:${radius},${lat},${lng});
  way[amenity~"^(school|college|university|kindergarten)$"](around:${radius},${lat},${lng});
  node[amenity~"^(restaurant|cafe|fast_food|pub|bar|bistro)$"](around:${radius},${lat},${lng});
  node["leisure"~"^(park|playground|garden|nature_reserve|pitch|sports_centre|fitness_centre)$"](around:${radius},${lat},${lng});
  way["leisure"~"^(park|playground|garden|nature_reserve|pitch|sports_centre|fitness_centre)$"](around:${radius},${lat},${lng});
  node["public_transport"~"^(station|stop_position|platform)$"](around:${radius},${lat},${lng});
  node["highway"="bus_stop"](around:${radius},${lat},${lng});
  node["railway"~"^(station|halt|tram_stop)$"](around:${radius},${lat},${lng});
  node["shop"~"^(supermarket|mall|convenience|department_store|bakery|deli|greengrocer)$"](around:${radius},${lat},${lng});
);
out center tags;`;
    // Try multiple Overpass mirrors — the main server (overpass-api.de) often
    // returns 406 / 429 / 504 under load. Fall back through community mirrors
    // before giving up.
    const OVERPASS_MIRRORS = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
      "https://overpass.openstreetmap.fr/api/interpreter",
      "https://overpass.private.coffee/api/interpreter",
    ];
    let overpassData: any = null;
    let lastStatus: number | null = null;
    let lastError: string | null = null;
    for (const url of OVERPASS_MIRRORS) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Some mirrors return 406 without an explicit Accept header.
            "Accept": "application/json,text/plain,*/*",
            "User-Agent": "RiversRealEstate/1.0 (https://luxuryhomescalgary.ca)",
          },
          body: "data=" + encodeURIComponent(ql),
        });
        if (!response.ok) {
          lastStatus = response.status;
          lastError = `${url} -> ${response.status}`;
          console.warn("[pois] mirror failed:", lastError);
          continue;
        }
        overpassData = await response.json();
        if (overpassData) break;
      } catch (e: any) {
        lastError = `${url} -> ${e?.message ?? "fetch failed"}`;
        console.warn("[pois] mirror error:", lastError);
      }
    }
    try {
      if (!overpassData) {
        // All mirrors failed — return empty (don't cache, so we'll retry on next request).
        console.error("[pois] all Overpass mirrors failed:", lastError);
        return res.json({
          center: { lat, lng },
          radius,
          schools: [], restaurants: [], parks: [], transit: [],
          cached: false,
          error: `Overpass mirrors unavailable (last status ${lastStatus ?? "n/a"})`,
        });
      }
      const data = overpassData;
      const elements: any[] = data.elements ?? [];

      const haversine = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
        const R = 6371000;
        const toRad = (d: number) => (d * Math.PI) / 180;
        const dLat = toRad(b.lat - a.lat);
        const dLng = toRad(b.lng - a.lng);
        const sa = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
        return 2 * R * Math.asin(Math.sqrt(sa));
      };

      const schools: any[] = [];
      const restaurants: any[] = [];
      const parks: any[] = [];
      const transit: any[] = [];

      for (const el of elements) {
        const elat = el.lat ?? el.center?.lat;
        const elng = el.lon ?? el.center?.lon;
        if (elat == null || elng == null) continue;
        const tags = el.tags ?? {};
        const name = tags.name ?? tags["name:en"] ?? null;
        if (!name) continue;
        const dist = Math.round(haversine({ lat, lng }, { lat: elat, lng: elng }));
        const base = {
          id: `${el.type}/${el.id}`,
          name,
          lat: elat,
          lng: elng,
          distance: dist,
          tags,
        };
        if (tags.amenity && ["school", "college", "university", "kindergarten"].includes(tags.amenity)) {
          schools.push({ ...base, kind: tags.amenity });
        } else if (tags.amenity && ["restaurant", "cafe", "fast_food", "pub", "bar", "bistro"].includes(tags.amenity)) {
          restaurants.push({ ...base, kind: tags.amenity, cuisine: tags.cuisine ?? null });
        } else if (tags.leisure) {
          parks.push({ ...base, kind: tags.leisure });
        } else if (tags.public_transport || tags.railway || tags.highway === "bus_stop") {
          let kind = "transit";
          if (tags.railway === "station" || tags.railway === "tram_stop") kind = "train";
          else if (tags.highway === "bus_stop") kind = "bus";
          transit.push({ ...base, kind });
        } else if (tags.shop) {
          // Group shops with transit category as "shopping"
          transit.push({ ...base, kind: "shop", shop: tags.shop });
        }
      }

      const sortByDist = (arr: any[]) => arr.sort((a, b) => a.distance - b.distance).slice(0, 25);
      const payload = {
        schools: sortByDist(schools),
        restaurants: sortByDist(restaurants),
        parks: sortByDist(parks),
        transit: sortByDist(transit),
      };
      storage.upsertPoisCache({
        id: cacheId,
        lat,
        lng,
        radius,
        payload: JSON.stringify(payload),
      });
      res.json({ ...payload, center: { lat, lng }, radius, cached: false });
    } catch (err: any) {
      console.error("[pois] error:", err?.message ?? err);
      // Return empty result rather than 500 so UI degrades gracefully
      res.json({
        center: { lat, lng },
        radius,
        schools: [], restaurants: [], parks: [], transit: [],
        cached: false,
        error: err?.message ?? "Overpass error",
      });
    }
  });

  // ---------- SAVED SEARCHES (auth) ----------
  app.get("/api/saved-searches", requireAuth, (req, res) => {
    const userId = (req as any).authUserId as number;
    const items = storage.listSavedSearches(userId).map((s) => ({
      ...s,
      filters: (() => { try { return JSON.parse(s.filters); } catch { return {}; } })(),
    }));
    res.json(items);
  });
  app.post("/api/saved-searches", requireAuth, (req, res) => {
    const userId = (req as any).authUserId as number;
    const { name, filters, emailAlerts } = req.body ?? {};
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Name required" });
    }
    const created = storage.createSavedSearch({
      userId,
      name,
      filters: filters ?? {},
      emailAlerts: emailAlerts !== false,
    } as any);
    res.json(created);
  });
  app.patch("/api/saved-searches/:id", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid id" });
    const updated = storage.updateSavedSearch(id, req.body ?? {});
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  });
  app.delete("/api/saved-searches/:id", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid id" });
    res.json({ ok: storage.deleteSavedSearch(id) });
  });

  // ---------- SOCIAL POSTS (auth) ----------
  app.get("/api/social-posts", requireAuth, (req, res) => {
    const userId = (req as any).authUserId as number;
    const items = storage.listSocialPosts(userId).map((p) => ({
      ...p,
      channels: (() => { try { return JSON.parse(p.channels); } catch { return []; } })(),
    }));
    res.json(items);
  });
  app.post("/api/social-posts", requireAuth, (req, res) => {
    const userId = (req as any).authUserId as number;
    const { caption, imageUrl, channels, scheduledFor, status, listingId } = req.body ?? {};
    if (!caption || typeof caption !== "string") {
      return res.status(400).json({ message: "Caption required" });
    }
    const created = storage.createSocialPost({
      userId,
      caption,
      imageUrl: imageUrl ?? null,
      channels: Array.isArray(channels) ? channels : [],
      scheduledFor: scheduledFor ?? null,
      status: status ?? "draft",
      listingId: listingId ?? null,
    } as any);
    res.json({
      ...created,
      channels: (() => { try { return JSON.parse(created.channels); } catch { return []; } })(),
    });
  });
  app.post("/api/social-posts/:id/post", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid id" });
    // Demo: simulate posting to all channels by marking the post as posted.
    const updated = storage.updateSocialPost(id, {
      status: "posted",
      postedAt: new Date().toISOString(),
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  });
  app.delete("/api/social-posts/:id", requireAuth, (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid id" });
    res.json({ ok: storage.deleteSocialPost(id) });
  });

  // ---------- ANALYTICS (auth) ----------
  // Lightweight read-only analytics derived from existing tables.
  app.get("/api/analytics/summary", requireAuth, (_req, res) => {
    const allListings = storage.listListings();
    const allLeads = storage.listLeads();
    const allTours = storage.listTours();
    const activeMls = storage.countActiveMlsListings();
    const totalMls = storage.countMlsListings();

    // Bucket leads by week (last 12 weeks)
    const now = new Date();
    const weeks: { weekStart: string; leads: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * 7);
      const ws = new Date(d);
      ws.setDate(d.getDate() - d.getDay());
      ws.setHours(0, 0, 0, 0);
      weeks.push({ weekStart: ws.toISOString().slice(0, 10), leads: 0 });
    }
    for (const lead of allLeads) {
      const t = new Date(lead.createdAt).getTime();
      for (let i = weeks.length - 1; i >= 0; i--) {
        const ws = new Date(weeks[i].weekStart).getTime();
        if (t >= ws) {
          weeks[i].leads++;
          break;
        }
      }
    }
    // Lead sources breakdown
    const sourceMap = new Map<string, number>();
    for (const l of allLeads) {
      sourceMap.set(l.source, (sourceMap.get(l.source) ?? 0) + 1);
    }
    const sources = Array.from(sourceMap.entries()).map(([source, count]) => ({ source, count }));

    // Lead status pipeline
    const statusMap = new Map<string, number>();
    for (const l of allLeads) {
      statusMap.set(l.status, (statusMap.get(l.status) ?? 0) + 1);
    }
    const pipeline = Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }));

    // Top neighbourhoods by lead count
    const nbMap = new Map<string, number>();
    for (const l of allLeads) {
      if (!l.listingId) continue;
      const lst = storage.getListingById(l.listingId);
      if (lst?.neighbourhood) {
        nbMap.set(lst.neighbourhood, (nbMap.get(lst.neighbourhood) ?? 0) + 1);
      }
    }
    const neighbourhoods = Array.from(nbMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, leads]) => ({ name, leads }));

    // Aggregate views & list price
    const totalViews = allListings.reduce((s, l) => s + (l.views ?? 0), 0);
    const portfolioValue = allListings.reduce((s, l) => s + (l.price ?? 0), 0);

    res.json({
      kpis: {
        activeMls,
        totalMls,
        managedListings: allListings.length,
        totalLeads: allLeads.length,
        upcomingTours: allTours.filter((t) => t.status === "requested" || t.status === "confirmed").length,
        totalViews,
        portfolioValue,
        conversionRate: allLeads.length
          ? Math.round((allLeads.filter((l) => l.status === "qualified" || l.status === "closed").length / allLeads.length) * 1000) / 10
          : 0,
      },
      weeklyLeads: weeks,
      sources,
      pipeline,
      neighbourhoods,
    });
  });

  return httpServer;
}
