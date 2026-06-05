// Shared OSM Overpass POI lookup. Returns schools / restaurants / parks /
// transit within `radius` metres of a lat/lng. Cached for 24h in the
// pois_cache table by a rounded lat/lng key so calls for the same point
// from different routes (the /mls/:id and /condos/:slug pages) share the
// same warm cache.
import { storage } from "./storage";

const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

export interface PoisPayload {
  center: { lat: number; lng: number };
  radius: number;
  schools: any[];
  restaurants: any[];
  parks: any[];
  transit: any[];
  cached?: boolean;
  error?: string;
}

function haversine(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sa =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(sa));
}

export async function fetchPoisAt(
  lat: number,
  lng: number,
  radius = 1000,
): Promise<PoisPayload> {
  const cacheId = `${lat.toFixed(4)}:${lng.toFixed(4)}:${radius}`;
  const cached = storage.getPoisCacheById(cacheId);
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  if (cached && new Date(cached.fetchedAt).getTime() > dayAgo) {
    try {
      const payload = JSON.parse(cached.payload);
      return { ...payload, center: { lat, lng }, radius, cached: true };
    } catch {
      /* fallthrough — corrupt cache row */
    }
  }

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

  let overpassData: any = null;
  let lastError: string | null = null;
  for (const url of OVERPASS_MIRRORS) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json,text/plain,*/*",
          "User-Agent":
            "RiversRealEstate/1.0 (https://luxuryhomescalgary.ca)",
        },
        body: "data=" + encodeURIComponent(ql),
      });
      if (!response.ok) {
        lastError = `${url} -> ${response.status}`;
        continue;
      }
      overpassData = await response.json();
      if (overpassData) break;
    } catch (e: any) {
      lastError = `${url} -> ${e?.message ?? "fetch failed"}`;
    }
  }

  if (!overpassData) {
    return {
      center: { lat, lng },
      radius,
      schools: [],
      restaurants: [],
      parks: [],
      transit: [],
      cached: false,
      error: lastError ?? "All Overpass mirrors failed",
    };
  }

  const elements: any[] = overpassData.elements ?? [];
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
    if (
      tags.amenity &&
      ["school", "college", "university", "kindergarten"].includes(tags.amenity)
    ) {
      schools.push({ ...base, kind: tags.amenity });
    } else if (
      tags.amenity &&
      ["restaurant", "cafe", "fast_food", "pub", "bar", "bistro"].includes(
        tags.amenity,
      )
    ) {
      restaurants.push({
        ...base,
        kind: tags.amenity,
        cuisine: tags.cuisine ?? null,
      });
    } else if (tags.leisure) {
      parks.push({ ...base, kind: tags.leisure });
    } else if (
      tags.public_transport ||
      tags.railway ||
      tags.highway === "bus_stop"
    ) {
      let kind = "transit";
      if (tags.railway === "station" || tags.railway === "tram_stop")
        kind = "train";
      else if (tags.highway === "bus_stop") kind = "bus";
      transit.push({ ...base, kind });
    } else if (tags.shop) {
      transit.push({ ...base, kind: "shop", shop: tags.shop });
    }
  }

  const sortByDist = (arr: any[]) =>
    arr.sort((a, b) => a.distance - b.distance).slice(0, 25);
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
  return { ...payload, center: { lat, lng }, radius, cached: false };
}
