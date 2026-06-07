// Walks every condo in the live API, identifies the ones whose heroImage is
// a broken relative path (e.g. /uploads/condo-heroes/foo.jpg), searches the
// WordPress media library for a matching photo, and prints an UPDATE script.
//
// Reviewed before applying — we'll always lose at the unmatched / weird-photo
// edge cases, but the matches it produces should be high quality because the
// WP filename is usually named after the building.
//
//   npx tsx script/find-wp-condo-heroes.ts > /tmp/wp-condo-heroes.sql
//
// Then apply the same way as before (sftp the .sql into the volume, run
// node -e to exec it).

const WP_API = "https://luxuryhomescalgary.ca/wp-json/wp/v2/media";
const LIVE_API = "https://riversrealestate.ca/api/public/condos";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

interface MediaItem {
  source_url: string;
  title?: { rendered?: string };
}

interface Condo {
  slug: string;
  name: string;
  heroImage: string | null;
}

// Spencer's heroImage values include several "broken" formats from the old
// stack: relative paths like /condo-heroes/foo.png, server-volume paths like
// /uploads/condo-heroes/...?v=123, etc. Anything that isn't a full https URL
// to a non-luxuryhomescalgary host has to be re-sourced.
function isBrokenHero(u: string | null | undefined): boolean {
  if (!u) return true;
  if (u.startsWith("/")) return true;
  if (!/^https?:\/\//i.test(u)) return true;
  return false;
}

const SKIP_PATTERNS = [
  /cropped-spencer/i,
  /spencer-rivers/i,
  /spencer\d{3,}/i,
  /\blogo\b/i,
  /synterra/i,
  /-report-/i,
  /infographic/i,
  /-square[-.]/i,
  /-linkedin/i,
  /favicon/i,
  /-thumbnail[-.]/i,
  /unveiling-the-hidden-secrets/i,
];

function isJunkUrl(url: string): boolean {
  if (SKIP_PATTERNS.some((p) => p.test(url))) return true;
  if (/-\d{2,3}x\d{2,3}\./.test(url)) return true;
  return false;
}

async function searchMedia(query: string): Promise<MediaItem[]> {
  const url = `${WP_API}?search=${encodeURIComponent(query)}&per_page=20`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Builds 1–3 search variants per condo. The WP media library indexes by
// filename + title, so multiple phrasings of the condo's name catch more
// hits than the canonical "name" alone (e.g. "The Guardian North" → also
// search "guardian", "guardian tower").
function searchVariants(name: string): string[] {
  const lower = name.toLowerCase().trim();
  const variants = new Set<string>([lower]);
  // Drop articles for a broader search.
  variants.add(lower.replace(/^the\s+/, ""));
  // The first significant word often matches when the full name doesn't
  // (e.g. "Princeton Hall" → "princeton" catches "Princeton-Hall-Calgary").
  const firstWord = lower.split(/\s+/)[0];
  if (firstWord.length > 3) variants.add(firstWord);
  return [...variants];
}

// Picks the best photo from a set of WP media results. Prefers filenames
// that look like real photos: .jpg/.jpeg, with the condo name embedded, not
// one of the obvious junk patterns above.
function pickBest(name: string, items: MediaItem[]): string | null {
  const namelower = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const candidates = items
    .map((m) => m.source_url)
    .filter((u) => !!u && !isJunkUrl(u));
  if (candidates.length === 0) return null;

  // Score: full name in URL > first word in URL > anything else. Prefer
  // photo extensions over graphic extensions.
  function score(url: string): number {
    const lower = url.toLowerCase();
    let s = 0;
    if (lower.includes(namelower)) s += 100;
    const firstWord = name.toLowerCase().split(/\s+/)[0];
    if (firstWord.length > 3 && lower.includes(firstWord)) s += 30;
    if (/\.jpe?g(\?|$)/.test(lower)) s += 10;
    if (/\.webp(\?|$)/.test(lower)) s += 8;
    if (/\.png(\?|$)/.test(lower)) s += 2;
    // Prefer older uploads (often original photos vs newer marketing
    // re-renders); deprioritise files from 2026/02 which Spencer's been
    // using for video thumbnails recently.
    if (/\/uploads\/2026\/02\//.test(lower)) s -= 12;
    return s;
  }

  candidates.sort((a, b) => score(b) - score(a));
  return candidates[0];
}

async function main() {
  process.stderr.write("[wp] fetching condo list…\n");
  const condoRes = await fetch(LIVE_API);
  const condos = (await condoRes.json()) as Condo[];
  const broken = condos.filter((c) => isBrokenHero(c.heroImage));
  process.stderr.write(
    `[wp] ${broken.length}/${condos.length} condos have broken/missing hero images\n`,
  );

  const updates: string[] = [];
  const noHit: string[] = [];

  for (const c of broken) {
    process.stderr.write(`[wp] searching: ${c.name}…\n`);
    const seen = new Set<string>();
    const hits: MediaItem[] = [];
    for (const q of searchVariants(c.name)) {
      const items = await searchMedia(q);
      for (const it of items) {
        if (it.source_url && !seen.has(it.source_url)) {
          seen.add(it.source_url);
          hits.push(it);
        }
      }
      // Be polite to WP — 250ms between requests.
      await new Promise((r) => setTimeout(r, 250));
    }
    const best = pickBest(c.name, hits);
    if (best) {
      updates.push(
        `UPDATE condo_buildings SET hero_image = ${sqlString(best)} WHERE slug = ${sqlString(c.slug)};  -- ${c.name} (${hits.length} hits)`,
      );
    } else {
      noHit.push(`${c.slug} (${c.name})`);
    }
  }

  process.stderr.write(`[wp] picked ${updates.length}; no match for ${noHit.length}:\n`);
  for (const n of noHit) process.stderr.write(`       - ${n}\n`);

  process.stdout.write("-- Generated by script/find-wp-condo-heroes.ts\n");
  process.stdout.write(`-- ${new Date().toISOString()}\n`);
  process.stdout.write("BEGIN;\n");
  for (const u of updates) process.stdout.write(u + "\n");
  process.stdout.write("COMMIT;\n");
}

function sqlString(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
