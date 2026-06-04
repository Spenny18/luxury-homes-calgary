// Server-side data fetchers used by Vike +data loaders.
//
// These mirror the JSON returned by the /api/public/* endpoints in routes.ts
// so a page rendered server-side gets exactly the same shape as the same page
// rendered client-side via useQuery. Keeping them in sync with routes.ts is
// the cost of avoiding an internal HTTP round-trip during SSR/SSG.

import { storage } from "./storage";
import { seedDatabase } from "./seed";
import { getNeighbourhoodPolygon } from "./neighbourhood-polygons";
import { pointInGeometry } from "./point-in-polygon";

// Run the idempotent seeder once when this module is first imported. The
// build-time prerender step needs the DB populated; in production Express
// calls seedDatabase() during registerRoutes() so this is a no-op then.
let seeded = false;
function ensureSeeded() {
  if (seeded) return;
  seeded = true;
  try {
    seedDatabase();
  } catch (err) {
    console.error("[public-data] seed failed:", err);
  }
}
ensureSeeded();

function parseJsonArr(s: string | null | undefined): any[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function safeJson<T = any>(s: string | null | undefined, fallback: T): T {
  if (!s) return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

function shapeNeighbourhood(n: any) {
  return {
    ...n,
    story: parseJsonArr(n.story),
    outsideCopy: parseJsonArr(n.outsideCopy),
    amenitiesCopy: parseJsonArr(n.amenitiesCopy),
    shopDineCopy: parseJsonArr(n.shopDineCopy),
    realEstateCopy: parseJsonArr(n.realEstateCopy),
    lifeCopy: parseJsonArr(n.lifeCopy),
    schools: parseJsonArr(n.schools),
    gallery: parseJsonArr(n.gallery),
    borders: safeJson(n.borders, {}),
  };
}

function shapeCondo(c: any) {
  return {
    ...c,
    intro: parseJsonArr(c.intro),
    residencesCopy: parseJsonArr(c.residencesCopy),
    architecturalCopy: parseJsonArr(c.architecturalCopy),
    amenities: parseJsonArr(c.amenities),
    gallery: parseJsonArr(c.gallery),
  };
}

export function listNeighbourhoods() {
  return storage.listNeighbourhoods().map(shapeNeighbourhood);
}

export async function getNeighbourhoodDetail(slug: string) {
  const n = storage.getNeighbourhoodBySlug(slug);
  if (!n) return null;

  // Lazy fetch + cache the OSM polygon. Null if OSM has no match.
  const polygon = await getNeighbourhoodPolygon(n.slug, n.name);

  // Over-fetch by name (CREB's `neighbourhood` field is a coarse district
  // label) and refine to the actual boundary with the polygon below.
  const candidates = storage.listMlsByNeighbourhood(n.name, 60);

  let listings: typeof candidates;
  if (polygon) {
    listings = candidates.filter(
      (l) =>
        l.lat != null &&
        l.lng != null &&
        pointInGeometry(l.lng as number, l.lat as number, polygon as any),
    );
  } else {
    // No polygon → fall back to the name-only match.
    listings = candidates;
  }
  listings = listings.slice(0, 24);

  return { ...shapeNeighbourhood(n), listings, polygon };
}

export function listCondoBuildings() {
  return storage.listCondoBuildings().map(shapeCondo);
}

export function getCondoBuildingDetail(slug: string) {
  const c = storage.getCondoBuildingBySlug(slug);
  if (!c) return null;
  let raw = storage.listingsAtBuilding(c.lat, c.lng, 75, 60);
  if (raw.length === 0) {
    const addressKey = c.address.split(",")[0].trim();
    raw = storage.listingsAtAddress(addressKey, 60);
  }
  const listings = raw.map((l: any) => ({
    id: l.id,
    mlsNumber: l.mlsNumber,
    fullAddress: l.fullAddress,
    listPrice: l.listPrice,
    beds: l.beds,
    baths: l.baths,
    sqft: l.sqft,
    photoCount: l.photoCount,
    heroImage: l.heroImage,
    status: l.status,
    neighbourhood: l.neighbourhood,
    lat: l.lat,
    lng: l.lng,
  }));
  return { ...shapeCondo(c), listings };
}

export function listBlogPosts() {
  return storage.listBlogPosts();
}

export function getBlogPost(slug: string) {
  return storage.getBlogBySlug(slug) ?? null;
}

export function listTestimonials() {
  return storage.listTestimonials();
}

export function getStats() {
  const activeCount = storage.countActiveMlsListings();
  const total = storage.countMlsListings();
  const lastSync = storage.getLatestSyncRun();
  return {
    activeListings: activeCount,
    totalListings: total,
    lastSyncAt: lastSync?.finishedAt ?? null,
    lastSyncStatus: lastSync?.status ?? null,
  };
}

export function listFeaturedMls(limit = 6) {
  return (storage as any).listFeaturedMls?.(limit) ?? [];
}

export function getPublicListing(slug: string) {
  const listing = storage.getListingBySlug(slug);
  if (!listing) return null;
  return listing;
}
