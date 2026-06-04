// One-shot scraper: walks the WordPress sitemaps for neighbourhoods + condos,
// pulls the hero image from each page, fuzzy-matches WP slugs to the slugs in
// our SQLite DB, and emits UPDATE statements ready to run against /data
// /rivers.db on Fly.
//
// Usage from luxury-homes-calgary/:
//   npx tsx script/scrape-wp-images.ts > /tmp/wp-images.sql
//
// Then ship to Fly + apply (we'll do this via fly ssh):
//   fly ssh sftp shell -a luxury-homes-calgary
//   put /tmp/wp-images.sql /data/wp-images.sql
//   exit
//   fly ssh console -a luxury-homes-calgary -C "node -e \"
//     const db = require('better-sqlite3')('/data/rivers.db');
//     const sql = require('fs').readFileSync('/data/wp-images.sql','utf8');
//     db.exec(sql);
//   \""
//
// Doesn't touch the DB itself — just prints SQL to stdout for review first.

import { storage } from "../server/storage";

const WP = "https://luxuryhomescalgary.ca";
const NEIGHBOURHOOD_SITEMAP = `${WP}/neighbourhood-sitemap.xml`;
const CONDO_SITEMAP = `${WP}/calgary-condos-test-sitemap.xml`;

// Slug suffixes the WordPress side tacks on. We strip these before matching
// against the DB's clean slugs.
const SUFFIXES = [
  "-homes-for-sale-2",
  "-homes-for-sale",
  "-condos-for-sale",
  "-condos-calgary",
  "-condos",
  "-condo",
  "-calgary", // britannia-calgary, etc.
  "-residences",
];

function normalizeSlug(s: string): string {
  let t = s.trim().toLowerCase();
  for (const suf of SUFFIXES) {
    if (t.endsWith(suf)) {
      t = t.slice(0, -suf.length);
      break;
    }
  }
  return t.replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  return res.text();
}

async function fetchUrls(sitemapUrl: string): Promise<string[]> {
  const xml = await fetchPage(sitemapUrl);
  const urls: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) urls.push(m[1]);
  return urls;
}

// Find the first non-junk uploaded image on the page. Reject:
//   - the global brand logo (cropped-spencer-rivers-…)
//   - any Spencer headshot file (spencer00*, spencer-*)
//   - the Synterra Realty logo
//   - WP's auto-resized thumbnails (filenames ending -123x456)
//   - market-report charts ("report-detached", "report-attached", etc.)
//   - AI-generated infographic placeholders ("infographic_marketing")
function extractHeroImage(html: string): string | null {
  const re = /https:\/\/luxuryhomescalgary\.ca\/wp-content\/uploads\/[^"'\\ )]+\.(?:jpe?g|png|webp)/gi;
  const SKIP_PATTERNS = [
    /cropped-spencer/i,
    /spencer-rivers/i,
    /spencer\d{3,}/i, // Spencer00286, etc.
    /\blogo\b/i,
    /synterra/i,
    /-report-detached/i,
    /-report-attached/i,
    /-report-condo/i,
    /infographic/i,
    /-square[-.]/i,
    /-linkedin/i,
    /favicon/i,
  ];
  const found: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) found.push(m[0]);
  for (const url of found) {
    if (SKIP_PATTERNS.some((p) => p.test(url))) continue;
    if (/-\d{2,3}x\d{2,3}\./.test(url)) continue; // skip resized thumbnails
    return url;
  }
  return null;
}

function slugFromUrl(url: string, segment: string): string | null {
  const re = new RegExp(`/${segment}/([^/]+)/?$`);
  const m = url.match(re);
  return m ? m[1] : null;
}

async function withDelay<T>(ms: number, fn: () => Promise<T>): Promise<T> {
  await new Promise((r) => setTimeout(r, ms));
  return fn();
}

async function buildHeroMap(
  sitemap: string,
  segment: "neighbourhood" | "calgary-condos",
  wantedKeys: Set<string>,
): Promise<Map<string, { wpSlug: string; image: string; url: string }>> {
  const allUrls = (await fetchUrls(sitemap)).filter(
    (u) => u.includes(`/${segment}/`) && !u.endsWith(`/${segment}/`),
  );
  // Skip-early: only scrape pages whose WP slug, after normalization, matches
  // a slug we actually have in the DB. Avoids hammering Cloudflare for 380
  // pages we'll never use.
  const urls = allUrls.filter((u) => {
    const wpSlug = slugFromUrl(u, segment);
    if (!wpSlug) return false;
    return wantedKeys.has(normalizeSlug(wpSlug));
  });
  process.stderr.write(
    `[wp] ${segment}: ${urls.length}/${allUrls.length} pages relevant to our DB\n`,
  );

  const out = new Map<string, { wpSlug: string; image: string; url: string }>();
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const wpSlug = slugFromUrl(url, segment);
    if (!wpSlug) continue;
    try {
      const html = await withDelay(450, () => fetchPage(url));
      const img = extractHeroImage(html);
      if (img) {
        const key = normalizeSlug(wpSlug);
        if (!out.has(key)) out.set(key, { wpSlug, image: img, url });
      }
      if ((i + 1) % 10 === 0) {
        process.stderr.write(`[wp] ${segment}: ${i + 1}/${urls.length}…\n`);
      }
    } catch (err: any) {
      process.stderr.write(`[wp] ${url} failed: ${err?.message}\n`);
    }
  }
  return out;
}

async function main() {
  const dbHoods = storage.listNeighbourhoods();
  const dbCondos = storage.listCondoBuildings();

  // Build the set of DB-slug normalizations + a couple of likely variants the
  // WP side might have used. We use these to skip-filter WP URLs upfront.
  const expandKeys = (slug: string, name: string): string[] => {
    const base = normalizeSlug(slug);
    const variants = new Set<string>([
      base,
      normalizeSlug(slug + "-2"),
      normalizeSlug(name.toLowerCase().replace(/\s+/g, "-")),
      // Calgary-suffixed forms (e.g. britannia-calgary, the-river-condos-calgary)
      normalizeSlug(slug + "-calgary"),
    ]);
    return [...variants];
  };
  const hoodKeys = new Set(dbHoods.flatMap((n) => expandKeys(n.slug, n.name)));
  const condoKeys = new Set(dbCondos.flatMap((c) => expandKeys(c.slug, c.name)));

  process.stderr.write("[wp] scraping…\n");
  const [hoodHeroes, condoHeroes] = await Promise.all([
    buildHeroMap(NEIGHBOURHOOD_SITEMAP, "neighbourhood", hoodKeys),
    buildHeroMap(CONDO_SITEMAP, "calgary-condos", condoKeys),
  ]);

  process.stderr.write(
    `[wp] DB has ${dbHoods.length} neighbourhoods, ${dbCondos.length} condos\n`,
  );
  process.stderr.write(
    `[wp] WP has ${hoodHeroes.size} unique neighbourhood heroes, ${condoHeroes.size} condo heroes\n`,
  );

  const updates: string[] = [];
  const skippedNoMatch: string[] = [];

  for (const n of dbHoods) {
    const hit = hoodHeroes.get(normalizeSlug(n.slug)) ??
      hoodHeroes.get(normalizeSlug(n.slug + "-2")) ??
      hoodHeroes.get(normalizeSlug(n.name.toLowerCase().replace(/\s+/g, "-")));
    if (!hit) {
      skippedNoMatch.push(`neighbourhood ${n.slug}`);
      continue;
    }
    updates.push(
      `UPDATE neighbourhoods SET hero_image = ${sqlString(hit.image)} WHERE slug = ${sqlString(n.slug)};  -- from ${hit.url}`,
    );
  }

  for (const c of dbCondos) {
    const hit = condoHeroes.get(normalizeSlug(c.slug)) ??
      condoHeroes.get(normalizeSlug(c.slug.replace(/-condos$/, ""))) ??
      condoHeroes.get(normalizeSlug(c.name.toLowerCase().replace(/\s+/g, "-")));
    if (!hit) {
      skippedNoMatch.push(`condo ${c.slug}`);
      continue;
    }
    updates.push(
      `UPDATE condo_buildings SET hero_image = ${sqlString(hit.image)} WHERE slug = ${sqlString(c.slug)};  -- from ${hit.url}`,
    );
  }

  process.stderr.write(`[wp] generated ${updates.length} UPDATE statements\n`);
  if (skippedNoMatch.length) {
    process.stderr.write(`[wp] no WP match for ${skippedNoMatch.length}:\n`);
    for (const s of skippedNoMatch) process.stderr.write(`       - ${s}\n`);
  }

  process.stdout.write("-- Generated by script/scrape-wp-images.ts\n");
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
