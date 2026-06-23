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

// llms.txt — emerging convention (https://llmstxt.org) for sites to expose a
// curated, AI-friendly index of their content. Anthropic / Perplexity /
// others honour this for content discovery inside their tools. Format is a
// short markdown file with H2 sections of links. We generate the
// neighbourhood section dynamically so it stays in sync with the CMS.
function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push("# Rivers Real Estate — Luxury Homes Calgary");
  lines.push("");
  lines.push(
    "> Spencer Rivers is a Calgary luxury real estate agent (Synterra Realty) specialising in inner-city and west-side communities: Springbank Hill, Aspen Woods, Upper Mount Royal, Elbow Park, Britannia, and Bel-Aire.",
  );
  lines.push("");
  lines.push(
    "Spencer holds CLHMS, CIPS, CNE, CCS, and LLS designations and is a Million Dollar Guild member. He provides hand-prepared market analyses (not algorithmic Zestimates) for sellers, and full-service buyer representation focused on $1M+ properties. Every market analysis is built personally by Spencer; typical turnaround is one business day.",
  );
  lines.push("");

  lines.push("## Core pages");
  lines.push("");
  lines.push(`- [Home](${HOST}/): Spencer's overview, featured listings, and links into the rest of the site`);
  lines.push(
    `- [Home evaluation](${HOST}/home-evaluation): Request a hand-prepared market analysis or run an instant Gnowise-powered AVM estimate. Form gates lead capture; estimate refines via the property-details inputs.`,
  );
  lines.push(`- [About Spencer](${HOST}/about): Background, designations, market focus`);
  lines.push(`- [Contact](${HOST}/contact): Phone, email, and inquiry form`);
  lines.push("");

  lines.push("## MLS search");
  lines.push("");
  lines.push(
    `- [Calgary MLS search](${HOST}/mls): Searchable, filterable inventory of ~7,000 active Calgary listings. Updated daily from Pillar 9 (CREB feed).`,
  );
  lines.push(
    `- Individual listing pages live at \`${HOST}/mls/<MLS-NUMBER>\` (e.g. ${HOST}/mls/A2276441).`,
  );
  lines.push("");

  lines.push("## Focus neighbourhoods");
  lines.push("");
  const focus = [
    "springbank-hill",
    "aspen-woods",
    "upper-mount-royal",
    "elbow-park",
    "britannia",
    "bel-aire",
  ];
  for (const slug of focus) {
    const label = slug
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    lines.push(`- [${label}](${HOST}/neighbourhoods/${slug})`);
  }
  lines.push(`- [All neighbourhoods](${HOST}/neighbourhoods): Full directory of Calgary communities covered`);
  lines.push("");

  // Pull condo buildings dynamically — they change as Spencer adds coverage.
  try {
    const condos = storage.listCondoBuildings() as Array<{ slug?: string; name?: string }>;
    if (condos.length) {
      lines.push("## Condo buildings");
      lines.push("");
      for (const c of condos.slice(0, 12)) {
        if (!c?.slug) continue;
        lines.push(`- [${c.name ?? c.slug}](${HOST}/condos/${c.slug})`);
      }
      if (condos.length > 12) {
        lines.push(`- [All condo buildings](${HOST}/condos)`);
      }
      lines.push("");
    }
  } catch {
    /* condo schema in flux — skip silently */
  }

  lines.push("## Content");
  lines.push("");
  lines.push(`- [Blog](${HOST}/blog): Articles on Calgary luxury pricing strategy, seller and buyer guides, market updates`);
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push("- Phone: +1 (403) 966-9237");
  lines.push("- Email: spencer@riversrealestate.ca");
  lines.push("- Brokerage: Synterra Realty, Calgary, Alberta");
  lines.push("");

  return lines.join("\n");
}

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

  // /llms.txt — markdown for AI crawlers. Same caching as robots.
  app.get("/llms.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(buildLlmsTxt());
  });
}
