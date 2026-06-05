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
    // CMS-edited FAQ override. Empty array means the client falls back to
    // the auto-generated FAQ in client/src/lib/condo-faqs.ts.
    faqs: parseJsonArr(c.faqs).filter(
      (f: any) => f && (typeof f.q === "string") && (typeof f.a === "string"),
    ),
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

// Normalize a street address into substrings we can LIKE-match against the
// MLS feed. Handles abbreviation pairs that vary across CREB listings
// ("Avenue" ↔ "Ave", "Street" ↔ "St", "Boulevard" ↔ "Blvd") and strips
// city/province trailers. Returns the union of variants.
function streetAddressVariants(full: string): string[] {
  if (!full) return [];
  const stripped = full.split(",")[0].trim();
  if (!stripped) return [];
  const variants = new Set<string>([stripped]);
  const pairs: Array<[RegExp, string]> = [
    [/\bAvenue\b/gi, "Ave"],
    [/\bAve\b/gi, "Avenue"],
    [/\bStreet\b/gi, "St"],
    [/\bSt\b/gi, "Street"],
    [/\bBoulevard\b/gi, "Blvd"],
    [/\bBlvd\b/gi, "Boulevard"],
    [/\bDrive\b/gi, "Dr"],
    [/\bDr\b/gi, "Drive"],
  ];
  for (const [re, replacement] of pairs) {
    if (re.test(stripped)) variants.add(stripped.replace(re, replacement));
  }
  return [...variants];
}

export function getCondoBuildingDetail(slug: string) {
  const c = storage.getCondoBuildingBySlug(slug);
  if (!c) return null;

  // Union strategy: combine GPS proximity AND address substring matching,
  // dedupe by listing ID. Single-strategy lookups break when either:
  //   - the building's stored lat/lng is off (so GPS pulls neighbours
  //     and the address fallback never fires because GPS returned >0)
  //   - the CREB listing's address uses a different abbreviation
  // Doing both catches the union.
  const byGps = storage.listingsAtBuilding(c.lat, c.lng, 50, 60);

  // Match against the primary address PLUS any additional addresses the
  // building has (e.g. The River sits at both 135 AND 137 26 Avenue SW —
  // CMS field comma-separated).
  const extraAddresses = ((c as any).additionalAddresses ?? "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const allAddresses = [c.address, ...extraAddresses];
  const candidateMatchStrings = allAddresses.flatMap(streetAddressVariants);
  const byAddress = candidateMatchStrings.flatMap((a) =>
    storage.listingsAtAddress(a, 60),
  );

  const seen = new Set<string>();
  const merged = [...byAddress, ...byGps].filter((l) => {
    if (seen.has(l.id)) return false;
    seen.add(l.id);
    return true;
  });

  const listings = merged.slice(0, 60).map((l: any) => ({
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
