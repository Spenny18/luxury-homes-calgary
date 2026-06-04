// Admin CMS routes for managing content the public site renders:
// condo buildings, neighbourhoods, and blog posts. All gated behind
// `requireAuth` so only Spencer's signed-in session can hit them.
//
// Mounted from routes.ts via registerAdminCmsRoutes(app, requireAuth).
import type { Express, RequestHandler } from "express";
import { z } from "zod";
import { storage } from "./storage";

// Slug helper — keeps URLs clean and lets the admin form accept either
// a custom slug or auto-derive one from the name/title.
function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function stringifyArr(v: unknown): string {
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === "string") {
    // Accept JSON-encoded arrays from the form, OR newline-separated text
    const trimmed = v.trim();
    if (trimmed.startsWith("[")) return trimmed;
    if (!trimmed) return "[]";
    return JSON.stringify(trimmed.split(/\n+/).map((s) => s.trim()).filter(Boolean));
  }
  return "[]";
}

// -------- Condo buildings ----------------------------------------------------

const condoSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1, "Name is required"),
  tagline: z.string().default(""),
  intro: z.any().default([]),
  residencesCopy: z.any().default([]),
  architecturalCopy: z.any().default([]),
  amenities: z.any().default([]),
  address: z.string().min(1, "Address is required"),
  neighbourhood: z.string().min(1, "Neighbourhood is required"),
  neighbourhoodSlug: z.string().min(1, "Neighbourhood slug is required"),
  quadrant: z.string().default("city-centre"),
  units: z.union([z.number(), z.string(), z.null()]).optional(),
  stories: z.union([z.number(), z.string(), z.null()]).optional(),
  builtIn: z.union([z.number(), z.string(), z.null()]).optional(),
  developer: z.string().nullable().optional(),
  architect: z.string().nullable().optional(),
  lat: z.union([z.number(), z.string()]),
  lng: z.union([z.number(), z.string()]),
  heroImage: z.string().url("Hero image must be a URL"),
  gallery: z.any().default([]),
  featured: z.boolean().default(false),
  sortOrder: z.union([z.number(), z.string()]).default(99),
});

function condoFromBody(body: unknown) {
  const parsed = condoSchema.parse(body) as any;
  const slug = parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.name);
  return {
    slug,
    name: parsed.name,
    tagline: parsed.tagline ?? "",
    intro: stringifyArr(parsed.intro),
    residencesCopy: stringifyArr(parsed.residencesCopy),
    architecturalCopy: stringifyArr(parsed.architecturalCopy),
    amenities: stringifyArr(parsed.amenities),
    address: parsed.address,
    neighbourhood: parsed.neighbourhood,
    neighbourhoodSlug: parsed.neighbourhoodSlug,
    quadrant: parsed.quadrant ?? "city-centre",
    units: safeNumber(parsed.units),
    stories: safeNumber(parsed.stories),
    builtIn: safeNumber(parsed.builtIn),
    developer: parsed.developer ?? null,
    architect: parsed.architect ?? null,
    lat: safeNumber(parsed.lat) ?? 0,
    lng: safeNumber(parsed.lng) ?? 0,
    heroImage: parsed.heroImage,
    gallery: stringifyArr(parsed.gallery),
    featured: !!parsed.featured,
    sortOrder: safeNumber(parsed.sortOrder) ?? 99,
  };
}

// -------- Neighbourhoods -----------------------------------------------------

const neighbourhoodSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1, "Name is required"),
  tagline: z.string().default(""),
  story: z.any().default([]),
  outsideCopy: z.any().default([]),
  amenitiesCopy: z.any().default([]),
  shopDineCopy: z.any().default([]),
  realEstateCopy: z.any().default([]),
  lifeCopy: z.any().default([]),
  schools: z.any().default([]),
  gallery: z.any().default([]),
  centerLat: z.union([z.number(), z.string()]),
  centerLng: z.union([z.number(), z.string()]),
  avgPrice: z.union([z.number(), z.string()]).default(0),
  activeCount: z.union([z.number(), z.string()]).default(0),
  sortOrder: z.union([z.number(), z.string()]).default(99),
  quadrant: z.string().default("city-centre"),
  borders: z.any().default({}),
  heroImage: z.string().url("Hero image must be a URL"),
});

function neighbourhoodFromBody(body: unknown) {
  const parsed = neighbourhoodSchema.parse(body) as any;
  const slug = parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.name);

  // Borders are stored as a JSON object; accept either an object from the
  // form or a JSON string the user pasted in.
  let borders = parsed.borders ?? {};
  if (typeof borders === "string") {
    try {
      borders = JSON.parse(borders);
    } catch {
      borders = {};
    }
  }

  return {
    slug,
    name: parsed.name,
    tagline: parsed.tagline ?? "",
    story: stringifyArr(parsed.story),
    outsideCopy: stringifyArr(parsed.outsideCopy),
    amenitiesCopy: stringifyArr(parsed.amenitiesCopy),
    shopDineCopy: stringifyArr(parsed.shopDineCopy),
    realEstateCopy: stringifyArr(parsed.realEstateCopy),
    lifeCopy: stringifyArr(parsed.lifeCopy),
    schools: stringifyArr(parsed.schools),
    gallery: stringifyArr(parsed.gallery),
    centerLat: safeNumber(parsed.centerLat) ?? 0,
    centerLng: safeNumber(parsed.centerLng) ?? 0,
    avgPrice: safeNumber(parsed.avgPrice) ?? 0,
    activeCount: safeNumber(parsed.activeCount) ?? 0,
    sortOrder: safeNumber(parsed.sortOrder) ?? 99,
    quadrant: parsed.quadrant ?? "city-centre",
    borders: JSON.stringify(borders),
    heroImage: parsed.heroImage,
  };
}

// -------- Blog posts ---------------------------------------------------------

const blogSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().default(""),
  body: z.string().default(""),
  category: z.string().default("Market"),
  heroImage: z.string().url("Hero image must be a URL"),
  authorName: z.string().default("Spencer Rivers"),
  authorAvatar: z.string().nullable().optional(),
  readMinutes: z.union([z.number(), z.string()]).default(5),
  publishedAt: z.string().min(1, "Publish date required"),
});

function blogFromBody(body: unknown) {
  const parsed = blogSchema.parse(body) as any;
  const slug = parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.title);
  return {
    slug,
    title: parsed.title,
    excerpt: parsed.excerpt ?? "",
    body: parsed.body ?? "",
    category: parsed.category ?? "Market",
    heroImage: parsed.heroImage,
    authorName: parsed.authorName ?? "Spencer Rivers",
    authorAvatar: parsed.authorAvatar ?? null,
    readMinutes: safeNumber(parsed.readMinutes) ?? 5,
    publishedAt: parsed.publishedAt,
  };
}

// -------- Route registration -------------------------------------------------

export function registerAdminCmsRoutes(
  app: Express,
  requireAuth: RequestHandler,
) {
  // ---- Condos ----
  app.get("/api/admin/cms/condos", requireAuth, (_req, res) => {
    res.json(storage.listCondoBuildings());
  });
  app.get("/api/admin/cms/condos/:slug", requireAuth, (req, res) => {
    const c = storage.getCondoBuildingBySlug(req.params.slug);
    if (!c) return res.status(404).json({ message: "Not found" });
    res.json(c);
  });
  app.post("/api/admin/cms/condos", requireAuth, (req, res) => {
    try {
      const row = condoFromBody(req.body);
      const saved = storage.upsertCondoBuilding(row as any);
      res.json(saved);
    } catch (err: any) {
      res.status(400).json({ message: err?.message ?? "Invalid input" });
    }
  });
  app.put("/api/admin/cms/condos/:slug", requireAuth, (req, res) => {
    try {
      const row = condoFromBody({ ...req.body, slug: req.params.slug });
      const saved = storage.upsertCondoBuilding(row as any);
      res.json(saved);
    } catch (err: any) {
      res.status(400).json({ message: err?.message ?? "Invalid input" });
    }
  });
  app.delete("/api/admin/cms/condos/:slug", requireAuth, (req, res) => {
    const ok = storage.deleteCondoBuilding(req.params.slug);
    res.json({ ok });
  });

  // ---- Neighbourhoods ----
  app.get("/api/admin/cms/neighbourhoods", requireAuth, (_req, res) => {
    res.json(storage.listNeighbourhoods());
  });
  app.get("/api/admin/cms/neighbourhoods/:slug", requireAuth, (req, res) => {
    const n = storage.getNeighbourhoodBySlug(req.params.slug);
    if (!n) return res.status(404).json({ message: "Not found" });
    res.json(n);
  });
  app.post("/api/admin/cms/neighbourhoods", requireAuth, (req, res) => {
    try {
      const row = neighbourhoodFromBody(req.body);
      const saved = storage.upsertNeighbourhood(row as any);
      res.json(saved);
    } catch (err: any) {
      res.status(400).json({ message: err?.message ?? "Invalid input" });
    }
  });
  app.put("/api/admin/cms/neighbourhoods/:slug", requireAuth, (req, res) => {
    try {
      const row = neighbourhoodFromBody({ ...req.body, slug: req.params.slug });
      const saved = storage.upsertNeighbourhood(row as any);
      res.json(saved);
    } catch (err: any) {
      res.status(400).json({ message: err?.message ?? "Invalid input" });
    }
  });
  app.delete("/api/admin/cms/neighbourhoods/:slug", requireAuth, (req, res) => {
    const ok = storage.deleteNeighbourhood(req.params.slug);
    res.json({ ok });
  });
  // Force-refetch the OSM polygon for a neighbourhood (clears the cached row).
  app.post(
    "/api/admin/cms/neighbourhoods/:slug/polygon/refresh",
    requireAuth,
    (req, res) => {
      storage.clearNeighbourhoodPolygon(req.params.slug);
      res.json({ ok: true });
    },
  );

  // ---- Blog posts ----
  app.get("/api/admin/cms/blog", requireAuth, (_req, res) => {
    res.json(storage.listBlogPosts());
  });
  app.get("/api/admin/cms/blog/:slug", requireAuth, (req, res) => {
    const p = storage.getBlogBySlug(req.params.slug);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  });
  app.post("/api/admin/cms/blog", requireAuth, (req, res) => {
    try {
      const row = blogFromBody(req.body);
      const saved = storage.upsertBlogPost(row as any);
      res.json(saved);
    } catch (err: any) {
      res.status(400).json({ message: err?.message ?? "Invalid input" });
    }
  });
  app.put("/api/admin/cms/blog/:slug", requireAuth, (req, res) => {
    try {
      const row = blogFromBody({ ...req.body, slug: req.params.slug });
      const saved = storage.upsertBlogPost(row as any);
      res.json(saved);
    } catch (err: any) {
      res.status(400).json({ message: err?.message ?? "Invalid input" });
    }
  });
  app.delete("/api/admin/cms/blog/:slug", requireAuth, (req, res) => {
    const ok = storage.deleteBlogPost(req.params.slug);
    res.json({ ok });
  });
}
