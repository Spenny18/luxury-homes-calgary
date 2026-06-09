// /sitemap.xml and /robots.txt for riversrealestate.ca.
//
// Public canonical host. The sitemap lists every URL we actually want Google
// to crawl: the static pages, every neighbourhood/condo/blog detail, and the
// agent's own listing pages. We build the XML each request — it's cheap
// (~100 rows from SQLite) and lets edits show up without a redeploy.
import type { Express } from "express";
import { storage } from "./storage";

const HOST = "https://riversrealestate.ca";

function escapeXml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default: return "&apos;";
    }
  });
}

function isoDate(d: unknown): string {
  if (!d) return new Date().toISOString().slice(0, 10);
  try {
    const t = typeof d === "string" || typeof d === "number" ? new Date(d) : (d as Date);
    if (isNaN(t.getTime())) return new Date().toISOString().slice(0, 10);
    return t.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
}

function buildSitemap(): string {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().slice(0, 10);

  // Static / hub pages
  urls.push({ loc: `${HOST}/`, lastmod: today, changefreq: "weekly", priority: "1.0" });
  urls.push({ loc: `${HOST}/about`, lastmod: today, changefreq: "monthly", priority: "0.7" });
  urls.push({ loc: `${HOST}/contact`, lastmod: today, changefreq: "monthly", priority: "0.6" });
  urls.push({ loc: `${HOST}/home-evaluation`, lastmod: today, changefreq: "monthly", priority: "0.9" });
  urls.push({ loc: `${HOST}/neighbourhoods`, lastmod: today, changefreq: "weekly", priority: "0.8" });
  urls.push({ loc: `${HOST}/condos`, lastmod: today, changefreq: "weekly", priority: "0.8" });
  urls.push({ loc: `${HOST}/blog`, lastmod: today, changefreq: "weekly", priority: "0.8" });

  // Neighbourhood detail pages
  for (const n of storage.listNeighbourhoods()) {
    urls.push({
      loc: `${HOST}/neighbourhoods/${n.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  // Condo detail pages
  for (const c of storage.listCondoBuildings()) {
    urls.push({
      loc: `${HOST}/condos/${c.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  // Blog posts
  for (const post of storage.listBlogPosts() as any[]) {
    urls.push({
      loc: `${HOST}/blog/${post.slug}`,
      lastmod: isoDate(post.publishedAt ?? post.updatedAt),
      changefreq: "monthly",
      priority: "0.6",
    });
  }

  // Agent-published listings (the /p/:slug pages)
  try {
    for (const l of (storage.listListings as any)() ?? []) {
      if (!l?.slug || l?.status === "inactive") continue;
      urls.push({
        loc: `${HOST}/p/${l.slug}`,
        lastmod: today,
        changefreq: "daily",
        priority: "0.6",
      });
    }
  } catch {
    /* listing schema is in flux; skip if it errors */
  }

  // Active MLS listings (the /mls/:mlsNumber pages). Each is unique content
  // — address, photos, description, neighbourhood — and exactly what Google
  // wants for long-tail real-estate queries like "<street> <neighbourhood>
  // Calgary." Previously the sitemap had zero of these, so the entire MLS
  // surface was invisible to search engines except via internal-link crawl
  // from the homepage. With ~7k active Calgary listings this adds ~7k
  // crawlable URLs at <500 KB sitemap size — well under Google's 50K/50 MB
  // limits, so a single sitemap is fine.
  try {
    // searchMlsListings returns { items, total } and JSON-parses gallery /
    // features for every row. We only need mlsNumber + a date here, so the
    // overhead per row is small enough to not bother with a dedicated
    // sitemap query method — but if this ever climbs over ~30K rows it
    // would be worth one.
    const limit = 20_000;
    const res = (storage.searchMlsListings as any)({
      statuses: ["Active"],
      limit,
    }) as { items?: Array<{ mlsNumber?: string; listDate?: string | null; syncedAt?: string | null }> };
    for (const l of res?.items ?? []) {
      if (!l?.mlsNumber) continue;
      urls.push({
        loc: `${HOST}/mls/${l.mlsNumber}`,
        // Prefer the listing's own list date (stable, marketing-meaningful);
        // fall back to last sync time, then today.
        lastmod: isoDate(l.listDate ?? l.syncedAt ?? today),
        changefreq: "weekly",
        priority: "0.5",
      });
    }
  } catch (err) {
    console.warn("[sitemap] MLS listings query failed:", err);
  }

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const ROBOTS = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${HOST}/sitemap.xml
`;

export function registerSeoRoutes(app: Express) {
  app.get("/sitemap.xml", (_req, res) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(buildSitemap());
  });

  app.get("/robots.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(ROBOTS);
  });
}
