// Fetches neighbourhood boundary polygons from OpenStreetMap Nominatim and
// caches them in the neighbourhoods table.
//
// Strategy: lazy fetch on first detail-page request, then never again unless
// we explicitly clear the cache. Nominatim caps usage at ~1 req/sec and asks
// for a real User-Agent — both honored here.
//
// The cached value is the raw GeoJSON `geometry` object (Polygon or
// MultiPolygon). NULL in the column means "never fetched"; the string `""`
// means "fetched but no match" so we don't keep re-hitting Nominatim for
// neighbourhoods OSM doesn't know.
import { sql } from "drizzle-orm";
import { db } from "./storage";

type Geometry =
  | { type: "Polygon"; coordinates: number[][][] }
  | { type: "MultiPolygon"; coordinates: number[][][][] };

interface NominatimFeature {
  geometry?: Geometry;
  properties?: { display_name?: string };
}

interface NominatimResponse {
  features?: NominatimFeature[];
}

const USER_AGENT =
  "RiversRealEstate/1.0 (https://riversrealestate.ca; spencer@riversrealestate.ca)";

// Single-flight in-process queue so multiple concurrent requests don't all
// race to hit Nominatim at the same moment. Also enforces the 1-req/sec
// politeness cap.
let lastFetchAt = 0;
const inflight = new Map<string, Promise<Geometry | null>>();

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastFetchAt;
  if (elapsed < 1100) {
    await new Promise((r) => setTimeout(r, 1100 - elapsed));
  }
  lastFetchAt = Date.now();
}

async function fetchFromNominatim(name: string): Promise<Geometry | null> {
  const query = `${name}, Calgary, Alberta, Canada`;
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "geojson");
  url.searchParams.set("polygon_geojson", "1");
  url.searchParams.set("limit", "1");
  // Country hint keeps results tight to Canada. We deliberately don't set
  // `featuretype` — none of Nominatim's coarse buckets (country/state/city/
  // settlement) cover Calgary suburbs cleanly, and the qualified query
  // string ("X, Calgary, Alberta, Canada") already disambiguates well.
  url.searchParams.set("countrycodes", "ca");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    await rateLimit();
    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept-Language": "en-CA,en",
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn(
        `[polygons] nominatim ${res.status} for "${query}": ${res.statusText}`,
      );
      return null;
    }
    const body = (await res.json()) as NominatimResponse;
    const geom = body?.features?.[0]?.geometry;
    if (!geom) return null;
    if (geom.type !== "Polygon" && geom.type !== "MultiPolygon") return null;
    return geom;
  } catch (err: any) {
    if (err?.name === "AbortError") {
      console.warn(`[polygons] nominatim timeout for "${query}"`);
    } else {
      console.warn(`[polygons] nominatim error for "${query}":`, err?.message);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

interface CachedRow {
  polygon: string | null;
  polygon_fetched_at: string | null;
}

function readCache(slug: string): CachedRow | null {
  try {
    const row = db
      .all(
        sql`SELECT polygon, polygon_fetched_at FROM neighbourhoods WHERE slug = ${slug} LIMIT 1`,
      )
      .at(0) as CachedRow | undefined;
    return row ?? null;
  } catch {
    return null;
  }
}

function writeCache(slug: string, geom: Geometry | null): void {
  const value = geom ? JSON.stringify(geom) : "";
  const now = new Date().toISOString();
  try {
    db.run(
      sql`UPDATE neighbourhoods SET polygon = ${value}, polygon_fetched_at = ${now} WHERE slug = ${slug}`,
    );
  } catch (err) {
    console.warn(`[polygons] failed to cache for ${slug}:`, err);
  }
}

/**
 * Returns the GeoJSON polygon for a neighbourhood, fetching from Nominatim
 * on first call and caching the result. Returns null if OSM has no match
 * (cached as empty string so we don't refetch).
 */
export async function getNeighbourhoodPolygon(
  slug: string,
  name: string,
): Promise<Geometry | null> {
  const cached = readCache(slug);
  if (cached?.polygon !== null && cached?.polygon !== undefined) {
    // Already fetched. Empty string means "no match" — return null without
    // re-hitting Nominatim.
    if (cached.polygon === "") return null;
    try {
      return JSON.parse(cached.polygon) as Geometry;
    } catch {
      // Corrupt cache row — fall through to refetch.
    }
  }

  // Coalesce concurrent first-fetches for the same slug.
  const existing = inflight.get(slug);
  if (existing) return existing;

  const promise = (async () => {
    const geom = await fetchFromNominatim(name);
    writeCache(slug, geom);
    return geom;
  })().finally(() => {
    inflight.delete(slug);
  });

  inflight.set(slug, promise);
  return promise;
}
