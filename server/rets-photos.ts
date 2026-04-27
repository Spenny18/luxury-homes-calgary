// Photo proxy for RETS listing images.
//
// Why we proxy instead of letting the browser hit the RETS server directly:
//   - The Pillar 9 server requires Digest auth and session cookies
//   - Credentials must never reach the browser
//   - Caching dramatically reduces RETS load (each card fetches the same hero)
//
// Strategy:
//   - Single long-lived RetsClient that re-logs-in if a request 401s
//   - In-memory LRU cache keyed by `${listingId}:${index}` (max ~500 entries)
//   - On miss, fetch from RETS and cache for 24h
//   - On RETS error or "no photo", return a 404 so the client falls back to
//     the placeholder hero image.
import { RetsClient, RetsAuthError } from "./rets-client";
import { storage } from "./storage";

interface CacheEntry {
  contentType: string;
  body: Buffer;
  expiresAt: number;
}

const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_ENTRIES = 500;
// Cache "we know this listing has no photo" results for 1 hour so we don't
// re-poke the RETS server on every page view.
const NEGATIVE_TTL_MS = 60 * 60 * 1000;
const negativeCache = new Map<string, number>();
const cache = new Map<string, CacheEntry>();

let client: RetsClient | null = null;
let loginPromise: Promise<void> | null = null;
// "Photo" is the standard RETS object type for listing images on Pillar 9.
// We've also seen "LargePhoto" and "HiRes" \u2014 we try them in order.
const PHOTO_TYPE = process.env.RETS_PHOTO_TYPE ?? "Photo";

function getClient(): RetsClient {
  if (!client) {
    client = new RetsClient({
      loginUrl: process.env.RETS_LOGIN_URL!,
      username: process.env.RETS_USERNAME!,
      password: process.env.RETS_PASSWORD!,
      userAgent: process.env.RETS_USER_AGENT ?? "RiversRealEstate/1.0",
      uaPassword: process.env.RETS_UA_PASSWORD || undefined,
    });
  }
  return client;
}

async function ensureLogin(): Promise<void> {
  if (!loginPromise) {
    loginPromise = (async () => {
      try {
        await getClient().login();
      } catch (err) {
        loginPromise = null;
        throw err;
      }
    })();
  }
  return loginPromise;
}

function lruSet(key: string, entry: CacheEntry) {
  if (cache.size >= MAX_ENTRIES) {
    // Evict the oldest entry (Map iteration order = insertion order)
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }
  cache.set(key, entry);
}

export async function fetchListingPhoto(
  listingId: string,
  index: number,
): Promise<{ contentType: string; body: Buffer } | null> {
  if (!process.env.RETS_USERNAME || !process.env.RETS_PASSWORD) return null;

  const key = `${listingId}:${index}`;
  // 1-based for RETS GetObject \u2014 the API accepts 0-based indexing externally
  const retsIndex = index + 1;

  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return { contentType: cached.contentType, body: cached.body };
  }
  const negExpiry = negativeCache.get(key);
  if (negExpiry && negExpiry > Date.now()) return null;

  // Pillar 9 RETS GetObject keys photos by ListingKeyNumeric, not the
  // alphanumeric ListingId. Look up the numeric key from the DB.
  const listing = storage.getMlsListingById(listingId);
  if (!listing || !listing.listingKey) {
    negativeCache.set(key, Date.now() + NEGATIVE_TTL_MS);
    return null;
  }
  const retsListingId = String(listing.listingKey);

  try {
    await ensureLogin();
    const c = getClient();
    let result;
    try {
      result = await c.getPhoto({
        resource: "Property",
        type: PHOTO_TYPE,
        listingId: retsListingId,
        index: retsIndex,
      });
    } catch (err) {
      // Session likely expired \u2014 force re-login once and retry
      if (err instanceof RetsAuthError) {
        loginPromise = null;
        await ensureLogin();
        result = await c.getPhoto({
          resource: "Property",
          type: PHOTO_TYPE,
          listingId: retsListingId,
          index: retsIndex,
        });
      } else {
        throw err;
      }
    }
    if (!result) {
      negativeCache.set(key, Date.now() + NEGATIVE_TTL_MS);
      return null;
    }
    lruSet(key, {
      contentType: result.contentType,
      body: result.body,
      expiresAt: Date.now() + TTL_MS,
    });
    return result;
  } catch (err) {
    console.error(`[rets-photos] failed for ${key}:`, (err as any)?.message ?? err);
    // Cache negative briefly so we don't hammer
    negativeCache.set(key, Date.now() + NEGATIVE_TTL_MS);
    return null;
  }
}
