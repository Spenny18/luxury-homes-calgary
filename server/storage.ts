import {
  users,
  listings,
  leads,
  messages,
  tours,
  mlsListings,
  mlsSyncRuns,
  blogPosts,
  neighbourhoods,
  testimonials,
  poisCache,
  savedSearches,
  socialPosts,
} from "@shared/schema";
import type {
  User,
  PublicUser,
  ListingRow,
  Lead,
  Message,
  Tour,
  InsertListing,
  InsertLead,
  InsertMessage,
  InsertTour,
  MlsListing,
  InsertMlsListing,
  MlsSyncRun,
  BlogPost,
  InsertBlogPost,
  Neighbourhood,
  InsertNeighbourhood,
  Testimonial,
  InsertTestimonial,
  PoiCacheRow,
  SavedSearch,
  InsertSavedSearch,
  SocialPost,
  InsertSocialPost,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, desc, and, gte, lte, like, sql, or, asc } from "drizzle-orm";

// Use data.db for SQLite. The publish flow snapshots/restores `data.db` across
// redeploys. If the snapshot becomes corrupt ("database disk image is
// malformed"), fall back to a fresh file so seed() + RETS sync can rebuild it.
import fs from "node:fs";
function openDb(): InstanceType<typeof Database> {
  const path = "data.db";
  try {
    const db = new Database(path);
    // Probe for corruption with a cheap PRAGMA quick_check
    const check = db.prepare("PRAGMA quick_check").get() as { quick_check?: string } | undefined;
    if (check && check.quick_check && check.quick_check !== "ok") {
      console.warn("[storage] quick_check =", check.quick_check, "— rebuilding data.db");
      db.close();
      try { fs.renameSync(path, path + ".corrupt." + Date.now()); } catch (e) { try { fs.unlinkSync(path); } catch {} }
      return new Database(path);
    }
    return db;
  } catch (err: any) {
    console.error("[storage] open failed, rebuilding:", err?.message);
    try { fs.renameSync(path, path + ".corrupt." + Date.now()); } catch (e) { try { fs.unlinkSync(path); } catch {} }
    return new Database(path);
  }
}
const sqlite = openDb();
sqlite.pragma("journal_mode = WAL");

// Create tables (idempotent — for SQLite without migrations)
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    title TEXT,
    avatar TEXT,
    phone TEXT,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS listings (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    neighbourhood TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Calgary, AB',
    price INTEGER NOT NULL,
    beds INTEGER NOT NULL,
    baths REAL NOT NULL,
    sqft INTEGER NOT NULL,
    lot_size TEXT,
    year_built INTEGER NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    description TEXT NOT NULL,
    features TEXT NOT NULL DEFAULT '[]',
    hero_image TEXT NOT NULL,
    gallery TEXT NOT NULL DEFAULT '[]',
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    listing_id TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Landing page',
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    from_agent INTEGER NOT NULL DEFAULT 0,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    listing_id TEXT NOT NULL,
    lead_id INTEGER,
    scheduled_for TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested',
    notes TEXT,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS mls_listings (
    id TEXT PRIMARY KEY,
    mls_number TEXT NOT NULL,
    listing_key INTEGER,
    status TEXT NOT NULL DEFAULT 'Active',
    list_price INTEGER NOT NULL,
    sold_price INTEGER,
    street_number TEXT,
    street_name TEXT,
    unit TEXT,
    full_address TEXT NOT NULL,
    neighbourhood TEXT,
    city TEXT NOT NULL DEFAULT 'Calgary',
    province TEXT NOT NULL DEFAULT 'AB',
    postal_code TEXT,
    lat REAL,
    lng REAL,
    property_type TEXT NOT NULL DEFAULT 'Detached',
    property_sub_type TEXT,
    beds INTEGER NOT NULL DEFAULT 0,
    beds_above INTEGER,
    beds_below INTEGER,
    baths REAL NOT NULL DEFAULT 0,
    half_baths INTEGER,
    sqft INTEGER,
    sqft_below INTEGER,
    lot_size TEXT,
    year_built INTEGER,
    parking TEXT,
    garage_spaces INTEGER,
    list_date TEXT,
    days_on_market INTEGER,
    description TEXT,
    features TEXT NOT NULL DEFAULT '[]',
    list_agent_name TEXT,
    list_agent_phone TEXT,
    list_office TEXT,
    hero_image TEXT,
    gallery TEXT NOT NULL DEFAULT '[]',
    photo_count INTEGER NOT NULL DEFAULT 0,
    source TEXT NOT NULL DEFAULT 'pillar9',
    raw_json TEXT,
    synced_at TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_mls_neighbourhood ON mls_listings(neighbourhood);
  CREATE INDEX IF NOT EXISTS idx_mls_status ON mls_listings(status);
  CREATE INDEX IF NOT EXISTS idx_mls_price ON mls_listings(list_price);
  CREATE TABLE IF NOT EXISTS mls_sync_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    started_at TEXT NOT NULL,
    finished_at TEXT,
    status TEXT NOT NULL DEFAULT 'running',
    source TEXT NOT NULL DEFAULT 'pillar9',
    fetched INTEGER NOT NULL DEFAULT 0,
    upserted INTEGER NOT NULL DEFAULT 0,
    removed INTEGER NOT NULL DEFAULT 0,
    error_message TEXT
  );
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    body TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Market',
    hero_image TEXT NOT NULL,
    author_name TEXT NOT NULL DEFAULT 'Spencer Rivers',
    author_avatar TEXT,
    read_minutes INTEGER NOT NULL DEFAULT 4,
    published_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS neighbourhoods (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    story TEXT NOT NULL DEFAULT '[]',
    outside_copy TEXT NOT NULL DEFAULT '[]',
    amenities_copy TEXT NOT NULL DEFAULT '[]',
    shop_dine_copy TEXT NOT NULL DEFAULT '[]',
    hero_image TEXT NOT NULL,
    gallery TEXT NOT NULL DEFAULT '[]',
    center_lat REAL NOT NULL,
    center_lng REAL NOT NULL,
    avg_price INTEGER NOT NULL,
    active_count INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    body TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS pois_cache (
    id TEXT PRIMARY KEY,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    radius INTEGER NOT NULL DEFAULT 1000,
    payload TEXT NOT NULL,
    fetched_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS saved_searches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    filters TEXT NOT NULL DEFAULT '{}',
    email_alerts INTEGER NOT NULL DEFAULT 1,
    last_run_at TEXT,
    match_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS social_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    listing_id TEXT,
    caption TEXT NOT NULL,
    image_url TEXT,
    channels TEXT NOT NULL DEFAULT '[]',
    scheduled_for TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    posted_at TEXT,
    created_at TEXT NOT NULL
  );
`);

// --- Lightweight migrations (additive only) ---
// Add `listing_key` column to mls_listings if missing. SQLite ALTER TABLE ADD
// COLUMN is idempotent only if we check first — the easiest way is PRAGMA.
try {
  const cols = sqlite.prepare("PRAGMA table_info(mls_listings)").all() as Array<{ name: string }>;
  if (cols.length > 0 && !cols.some((c) => c.name === "listing_key")) {
    sqlite.exec("ALTER TABLE mls_listings ADD COLUMN listing_key INTEGER");
    console.log("[migration] added listing_key to mls_listings");
  }
} catch (err) {
  console.error("[migration] failed to add listing_key column:", err);
}

export const db = drizzle(sqlite);

// Convert raw row → public-shape (parse JSON arrays)
export type PublicListing = Omit<ListingRow, "features" | "gallery"> & {
  features: string[];
  gallery: string[];
};

function toPublicListing(row: ListingRow): PublicListing {
  return {
    ...row,
    features: safeParseArray(row.features),
    gallery: safeParseArray(row.gallery),
  };
}

function safeParseArray(s: string | null | undefined): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function stripUser(u: User): PublicUser {
  const { passwordHash, ...rest } = u;
  return rest;
}

export interface IStorage {
  // Users
  getUserById(id: number): User | undefined;
  getUserByEmail(email: string): User | undefined;
  createUser(data: { email: string; passwordHash: string; name: string; title?: string; avatar?: string; phone?: string }): User;

  // Listings
  listListings(opts?: { status?: string }): PublicListing[];
  getListingById(id: string): PublicListing | undefined;
  getListingBySlug(slug: string): PublicListing | undefined;
  createListing(data: any, userId: number): PublicListing;
  updateListing(id: string, patch: any): PublicListing | undefined;
  deleteListing(id: string): boolean;
  incrementViews(id: string): void;

  // Leads
  listLeads(): Lead[];
  getLead(id: number): Lead | undefined;
  createLead(data: InsertLead): Lead;
  updateLeadStatus(id: number, status: string): Lead | undefined;

  // Messages
  listMessagesByLead(leadId: number): Message[];
  createMessage(data: InsertMessage): Message;

  // Tours
  listTours(): Tour[];
  createTour(data: InsertTour): Tour;
  updateTourStatus(id: number, status: string): Tour | undefined;
}

// trailing storage methods are on DatabaseStorage above


export class DatabaseStorage implements IStorage {
  // Users
  getUserById(id: number) {
    return db.select().from(users).where(eq(users.id, id)).get();
  }
  getUserByEmail(email: string) {
    return db.select().from(users).where(eq(users.email, email)).get();
  }
  createUser(data: { email: string; passwordHash: string; name: string; title?: string; avatar?: string; phone?: string }) {
    return db
      .insert(users)
      .values({
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
        title: data.title ?? null,
        avatar: data.avatar ?? null,
        phone: data.phone ?? null,
      })
      .returning()
      .get();
  }

  // Listings
  listListings() {
    const rows = db
      .select()
      .from(listings)
      .orderBy(desc(listings.createdAt))
      .all();
    return rows.map(toPublicListing);
  }
  getListingById(id: string) {
    const row = db.select().from(listings).where(eq(listings.id, id)).get();
    return row ? toPublicListing(row) : undefined;
  }
  getListingBySlug(slug: string) {
    const row = db.select().from(listings).where(eq(listings.slug, slug)).get();
    return row ? toPublicListing(row) : undefined;
  }
  createListing(data: any, userId: number) {
    const id = data.id ?? `l-${Date.now().toString(36)}`;
    const row = db
      .insert(listings)
      .values({
        id,
        slug: data.slug,
        title: data.title,
        address: data.address,
        neighbourhood: data.neighbourhood,
        city: data.city ?? "Calgary, AB",
        price: data.price,
        beds: data.beds,
        baths: data.baths,
        sqft: data.sqft,
        lotSize: data.lotSize ?? null,
        yearBuilt: data.yearBuilt,
        type: data.type,
        status: data.status ?? "active",
        description: data.description,
        features: JSON.stringify(data.features ?? []),
        heroImage: data.heroImage,
        gallery: JSON.stringify(data.gallery ?? []),
        lat: data.lat,
        lng: data.lng,
        userId,
      })
      .returning()
      .get();
    return toPublicListing(row);
  }
  updateListing(id: string, patch: any) {
    const update: any = { ...patch };
    if (Array.isArray(update.features)) update.features = JSON.stringify(update.features);
    if (Array.isArray(update.gallery)) update.gallery = JSON.stringify(update.gallery);
    delete update.id;
    delete update.createdAt;
    const row = db
      .update(listings)
      .set(update)
      .where(eq(listings.id, id))
      .returning()
      .get();
    return row ? toPublicListing(row) : undefined;
  }
  deleteListing(id: string) {
    const r = db.delete(listings).where(eq(listings.id, id)).run();
    return r.changes > 0;
  }
  incrementViews(id: string) {
    const row = db.select().from(listings).where(eq(listings.id, id)).get();
    if (!row) return;
    db.update(listings)
      .set({ views: (row.views ?? 0) + 1 })
      .where(eq(listings.id, id))
      .run();
  }

  // Leads
  listLeads() {
    return db.select().from(leads).orderBy(desc(leads.createdAt)).all();
  }
  getLead(id: number) {
    return db.select().from(leads).where(eq(leads.id, id)).get();
  }
  createLead(data: InsertLead) {
    return db
      .insert(leads)
      .values({
        listingId: data.listingId ?? null,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        message: data.message,
        source: data.source ?? "Landing page",
        status: data.status ?? "new",
      })
      .returning()
      .get();
  }
  updateLeadStatus(id: number, status: string) {
    return db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning()
      .get();
  }

  // Messages
  listMessagesByLead(leadId: number) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.leadId, leadId))
      .all();
  }
  createMessage(data: InsertMessage) {
    return db
      .insert(messages)
      .values({
        leadId: data.leadId,
        fromAgent: data.fromAgent ?? false,
        body: data.body,
      })
      .returning()
      .get();
  }

  // ---- MLS listings -------------------------------------------------------
  upsertMlsListing(data: InsertMlsListing): MlsListing {
    const existing = db.select().from(mlsListings).where(eq(mlsListings.id, data.id!)).get();
    if (existing) {
      return db
        .update(mlsListings)
        .set({ ...data, syncedAt: new Date().toISOString() })
        .where(eq(mlsListings.id, data.id!))
        .returning()
        .get();
    }
    return db.insert(mlsListings).values(data).returning().get();
  }
  getMlsListingById(id: string): MlsListing | undefined {
    return db.select().from(mlsListings).where(eq(mlsListings.id, id)).get();
  }
  countMlsListings(): number {
    const r = db.select({ c: sql<number>`count(*)` }).from(mlsListings).get();
    return Number(r?.c ?? 0);
  }
  countActiveMlsListings(): number {
    const r = db
      .select({ c: sql<number>`count(*)` })
      .from(mlsListings)
      .where(eq(mlsListings.status, "Active"))
      .get();
    return Number(r?.c ?? 0);
  }
  searchMlsListings(opts: {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number; // minimum
    baths?: number; // minimum
    propertyType?: string;
    neighbourhood?: string;
    status?: string;
    minSqft?: number;
    maxSqft?: number;
    sort?: "price-asc" | "price-desc" | "newest" | "sqft-desc";
    limit?: number;
    offset?: number;
  }) {
    const where: any[] = [];
    if (opts.minPrice) where.push(gte(mlsListings.listPrice, opts.minPrice));
    if (opts.maxPrice) where.push(lte(mlsListings.listPrice, opts.maxPrice));
    if (opts.beds) where.push(gte(mlsListings.beds, opts.beds));
    if (opts.baths) where.push(gte(mlsListings.baths, opts.baths));
    if (opts.propertyType && opts.propertyType !== "Any") where.push(eq(mlsListings.propertyType, opts.propertyType));
    if (opts.neighbourhood) where.push(eq(mlsListings.neighbourhood, opts.neighbourhood));
    if (opts.status) where.push(eq(mlsListings.status, opts.status));
    if (opts.minSqft) where.push(gte(mlsListings.sqft, opts.minSqft));
    if (opts.maxSqft) where.push(lte(mlsListings.sqft, opts.maxSqft));
    if (opts.q) {
      const q = `%${opts.q}%`;
      where.push(
        or(
          like(mlsListings.fullAddress, q),
          like(mlsListings.neighbourhood, q),
          like(mlsListings.mlsNumber, q),
          like(mlsListings.description, q),
        )!,
      );
    }
    let qb: any = db.select().from(mlsListings);
    if (where.length) qb = qb.where(and(...where));
    switch (opts.sort) {
      case "price-asc":
        qb = qb.orderBy(asc(mlsListings.listPrice));
        break;
      case "price-desc":
        qb = qb.orderBy(desc(mlsListings.listPrice));
        break;
      case "sqft-desc":
        qb = qb.orderBy(desc(mlsListings.sqft));
        break;
      case "newest":
      default:
        qb = qb.orderBy(desc(mlsListings.listDate), desc(mlsListings.syncedAt));
        break;
    }
    const all = qb.all() as MlsListing[];
    const total = all.length;
    const limit = opts.limit ?? 24;
    const offset = opts.offset ?? 0;
    const items = all.slice(offset, offset + limit).map((row) => ({
      ...row,
      gallery: safeParseArray(row.gallery),
      features: safeParseArray(row.features),
    }));
    return { items, total };
  }
  listFeaturedMls(limit = 6) {
    const rows = db
      .select()
      .from(mlsListings)
      .where(eq(mlsListings.status, "Active"))
      .orderBy(desc(mlsListings.listPrice))
      .all()
      .slice(0, limit);
    return rows.map((row) => ({
      ...row,
      gallery: safeParseArray(row.gallery),
      features: safeParseArray(row.features),
    }));
  }
  listMlsByNeighbourhood(slug: string, limit = 12) {
    // We match neighbourhood by name (slug is the URL-friendly form)
    const rows = db
      .select()
      .from(mlsListings)
      .where(
        and(
          eq(mlsListings.status, "Active"),
          eq(mlsListings.neighbourhood, slug),
        )!,
      )
      .orderBy(desc(mlsListings.listPrice))
      .all()
      .slice(0, limit);
    return rows.map((row) => ({
      ...row,
      gallery: safeParseArray(row.gallery),
      features: safeParseArray(row.features),
    }));
  }
  listSimilarMls(listing: MlsListing, limit = 4) {
    const rows = db
      .select()
      .from(mlsListings)
      .where(
        and(
          eq(mlsListings.status, "Active"),
          eq(mlsListings.neighbourhood, listing.neighbourhood ?? ""),
        )!,
      )
      .all()
      .filter((r) => r.id !== listing.id)
      .slice(0, limit);
    return rows.map((row) => ({
      ...row,
      gallery: safeParseArray(row.gallery),
      features: safeParseArray(row.features),
    }));
  }
  /** Mark every active mls_listings row whose id is NOT in keep[] as Removed.
   *  Returns the number of rows updated. Used by the sync loop to expire stale
   *  listings that no longer appear in the active feed. */
  markMlsListingsRemovedExcept(keep: string[]): number {
    if (keep.length === 0) {
      const r = db
        .update(mlsListings)
        .set({ status: "Removed" })
        .where(eq(mlsListings.status, "Active"))
        .run();
      return Number((r as any)?.changes ?? 0);
    }
    // SQLite has a parameter limit (~999). Chunk if needed.
    const CHUNK = 500;
    let total = 0;
    // Build an exclusion list per chunk and update with a NOT IN.
    for (let i = 0; i < keep.length; i += CHUNK) {
      const slice = keep.slice(i, i + CHUNK);
      // For chunked NOT IN we need rows whose id is NOT in any chunk.
      // Easier approach: load all active ids, compute set difference in JS,
      // then update affected rows individually. The total is small (~few thousand).
      // But we only need to do it once per sync, not per chunk — break out below.
      void slice;
    }
    const activeRows = db
      .select({ id: mlsListings.id })
      .from(mlsListings)
      .where(eq(mlsListings.status, "Active"))
      .all() as { id: string }[];
    const keepSet = new Set(keep);
    const toRemove = activeRows.map((r) => r.id).filter((id) => !keepSet.has(id));
    for (const id of toRemove) {
      db.update(mlsListings).set({ status: "Removed" }).where(eq(mlsListings.id, id)).run();
      total++;
    }
    return total;
  }

  // ---- MLS sync runs ------------------------------------------------------
  startSyncRun(opts: { source: string }): MlsSyncRun {
    return db
      .insert(mlsSyncRuns)
      .values({
        startedAt: new Date().toISOString(),
        status: "running",
        source: opts.source,
      })
      .returning()
      .get();
  }
  finishSyncRun(
    id: number,
    patch: { status: string; fetched?: number; upserted?: number; removed?: number; errorMessage?: string },
  ) {
    return db
      .update(mlsSyncRuns)
      .set({
        finishedAt: new Date().toISOString(),
        status: patch.status,
        fetched: patch.fetched ?? 0,
        upserted: patch.upserted ?? 0,
        removed: patch.removed ?? 0,
        errorMessage: patch.errorMessage ?? null,
      })
      .where(eq(mlsSyncRuns.id, id))
      .returning()
      .get();
  }
  getLatestSyncRun(): MlsSyncRun | undefined {
    return db.select().from(mlsSyncRuns).orderBy(desc(mlsSyncRuns.startedAt)).all()[0];
  }
  listRecentSyncRuns(limit = 10): MlsSyncRun[] {
    return db.select().from(mlsSyncRuns).orderBy(desc(mlsSyncRuns.startedAt)).all().slice(0, limit);
  }
  // ---- Blog posts ---------------------------------------------------------
  listBlogPosts(): BlogPost[] {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt)).all();
  }
  getBlogBySlug(slug: string): BlogPost | undefined {
    return db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).get();
  }
  upsertBlogPost(data: InsertBlogPost): BlogPost {
    const existing = db.select().from(blogPosts).where(eq(blogPosts.slug, data.slug!)).get();
    if (existing) {
      return db.update(blogPosts).set(data).where(eq(blogPosts.slug, data.slug!)).returning().get();
    }
    return db.insert(blogPosts).values(data).returning().get();
  }
  // ---- Neighbourhoods ----------------------------------------------------
  listNeighbourhoods(): Neighbourhood[] {
    return db.select().from(neighbourhoods).orderBy(asc(neighbourhoods.sortOrder)).all();
  }
  getNeighbourhoodBySlug(slug: string): Neighbourhood | undefined {
    return db.select().from(neighbourhoods).where(eq(neighbourhoods.slug, slug)).get();
  }
  upsertNeighbourhood(data: InsertNeighbourhood): Neighbourhood {
    const existing = db.select().from(neighbourhoods).where(eq(neighbourhoods.slug, data.slug!)).get();
    if (existing) {
      return db.update(neighbourhoods).set(data).where(eq(neighbourhoods.slug, data.slug!)).returning().get();
    }
    return db.insert(neighbourhoods).values(data).returning().get();
  }
  refreshNeighbourhoodActiveCounts() {
    const all = db.select().from(neighbourhoods).all();
    for (const n of all) {
      const c = db
        .select({ c: sql<number>`count(*)` })
        .from(mlsListings)
        .where(
          and(eq(mlsListings.status, "Active"), eq(mlsListings.neighbourhood, n.name))!,
        )
        .get();
      db.update(neighbourhoods).set({ activeCount: Number(c?.c ?? 0) }).where(eq(neighbourhoods.slug, n.slug)).run();
    }
  }
  // ---- Testimonials -------------------------------------------------------
  listTestimonials(): Testimonial[] {
    return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder)).all();
  }
  upsertTestimonial(data: InsertTestimonial): Testimonial {
    if (data.id) {
      const existing = db.select().from(testimonials).where(eq(testimonials.id, data.id)).get();
      if (existing) {
        return db.update(testimonials).set(data).where(eq(testimonials.id, data.id)).returning().get();
      }
    }
    return db.insert(testimonials).values(data).returning().get();
  }

  // Tours
  listTours() {
    return db.select().from(tours).orderBy(desc(tours.scheduledFor)).all();
  }
  createTour(data: InsertTour) {
    return db
      .insert(tours)
      .values({
        listingId: data.listingId,
        leadId: data.leadId ?? null,
        scheduledFor: data.scheduledFor,
        status: data.status ?? "requested",
        notes: data.notes ?? null,
      })
      .returning()
      .get();
  }
  updateTourStatus(id: number, status: string) {
    return db
      .update(tours)
      .set({ status })
      .where(eq(tours.id, id))
      .returning()
      .get();
  }

  // ---- POIs cache ---------------------------------------------------------
  getPoisCacheById(id: string): PoiCacheRow | undefined {
    return db.select().from(poisCache).where(eq(poisCache.id, id)).get();
  }
  upsertPoisCache(row: { id: string; lat: number; lng: number; radius: number; payload: string }) {
    const existing = db.select().from(poisCache).where(eq(poisCache.id, row.id)).get();
    if (existing) {
      return db
        .update(poisCache)
        .set({ payload: row.payload, fetchedAt: new Date().toISOString() })
        .where(eq(poisCache.id, row.id))
        .returning()
        .get();
    }
    return db.insert(poisCache).values(row).returning().get();
  }

  // ---- Saved searches -----------------------------------------------------
  listSavedSearches(userId: number): SavedSearch[] {
    return db
      .select()
      .from(savedSearches)
      .where(eq(savedSearches.userId, userId))
      .orderBy(desc(savedSearches.createdAt))
      .all();
  }
  createSavedSearch(data: InsertSavedSearch & { userId: number }): SavedSearch {
    return db
      .insert(savedSearches)
      .values({
        userId: data.userId,
        name: data.name,
        filters: typeof data.filters === "string" ? data.filters : JSON.stringify(data.filters ?? {}),
        emailAlerts: data.emailAlerts ?? true,
      })
      .returning()
      .get();
  }
  updateSavedSearch(id: number, patch: Partial<{ name: string; filters: any; emailAlerts: boolean }>): SavedSearch | undefined {
    const update: any = { ...patch };
    if (update.filters && typeof update.filters !== "string") {
      update.filters = JSON.stringify(update.filters);
    }
    return db
      .update(savedSearches)
      .set(update)
      .where(eq(savedSearches.id, id))
      .returning()
      .get();
  }
  deleteSavedSearch(id: number): boolean {
    const r = db.delete(savedSearches).where(eq(savedSearches.id, id)).run();
    return (r.changes ?? 0) > 0;
  }

  // ---- Social posts -------------------------------------------------------
  listSocialPosts(userId: number): SocialPost[] {
    return db
      .select()
      .from(socialPosts)
      .where(eq(socialPosts.userId, userId))
      .orderBy(desc(socialPosts.createdAt))
      .all();
  }
  createSocialPost(data: InsertSocialPost & { userId: number }): SocialPost {
    return db
      .insert(socialPosts)
      .values({
        userId: data.userId,
        listingId: data.listingId ?? null,
        caption: data.caption,
        imageUrl: data.imageUrl ?? null,
        channels: typeof (data as any).channels === "string" ? (data as any).channels : JSON.stringify(data.channels ?? []),
        scheduledFor: data.scheduledFor ?? null,
        status: data.status ?? "draft",
      })
      .returning()
      .get();
  }
  updateSocialPost(id: number, patch: Partial<{ status: string; postedAt: string; caption: string; imageUrl: string; channels: any }>): SocialPost | undefined {
    const update: any = { ...patch };
    if (update.channels && typeof update.channels !== "string") {
      update.channels = JSON.stringify(update.channels);
    }
    return db
      .update(socialPosts)
      .set(update)
      .where(eq(socialPosts.id, id))
      .returning()
      .get();
  }
  deleteSocialPost(id: number): boolean {
    const r = db.delete(socialPosts).where(eq(socialPosts.id, id)).run();
    return (r.changes ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
export { stripUser };
