import { usePageContext } from "vike-react/usePageContext";
import {
  placeNode,
  breadcrumbsNode,
  webPageNode,
  faqPageNode,
  jsonLdScriptHtml,
} from "@/lib/schema";
import { buildNeighbourhoodFaqs } from "@/lib/neighbourhood-faqs";

// Handles /neighbourhoods (list) and /neighbourhoods/:slug (detail).
export default function Head() {
  const pageContext = usePageContext();
  const pathname = (pageContext.urlPathname || "/neighbourhoods").replace(
    /\/$/,
    "",
  );
  const slug = pageContext.routeParams?.slug;
  const canonical = `https://luxuryhomescalgary.ca${pathname || "/neighbourhoods"}`;

  const nodes: unknown[] = [];

  if (slug) {
    const n = pageContext.data as
      | {
          name?: string;
          tagline?: string;
          heroImage?: string | null;
          centerLat?: number;
          centerLng?: number;
          quadrant?: string | null;
          borders?: {
            north?: string;
            south?: string;
            east?: string;
            west?: string;
          } | null;
          avgPrice?: number | null;
          activeCount?: number | null;
          schools?: Array<{ name: string }> | null;
          listings?: Array<{ listPrice: number }> | null;
        }
      | null
      | undefined;
    if (n?.name) {
      nodes.push(
        placeNode({
          slug,
          name: n.name,
          description: n.tagline,
          image: n.heroImage,
          lat: n.centerLat,
          lng: n.centerLng,
        }),
      );
      nodes.push(
        breadcrumbsNode([
          { name: "Home", url: "/" },
          { name: "Neighbourhoods", url: "/neighbourhoods" },
          { name: n.name, url: `/neighbourhoods/${slug}` },
        ]),
      );

      // FAQPage — same auto-generated set the page renders via FaqAccordion,
      // so Google sees exactly what's on the page.
      const faqNode = faqPageNode({
        url: `/neighbourhoods/${slug}`,
        items: buildNeighbourhoodFaqs({
          name: n.name,
          slug,
          quadrant: n.quadrant,
          borders: n.borders,
          avgPrice: n.avgPrice,
          activeCount: n.activeCount,
          schools: n.schools,
          listings: n.listings,
        }),
      });
      if (faqNode) nodes.push(faqNode);
    }
  } else {
    nodes.push(
      webPageNode({
        url: "/neighbourhoods",
        name: "Calgary luxury neighbourhoods — Rivers Real Estate",
        description:
          "Calgary's luxury neighbourhoods — Springbank Hill, Aspen Woods, Upper Mount Royal, Elbow Park, Britannia, Bel-Aire and more.",
      }),
    );
    nodes.push(
      breadcrumbsNode([
        { name: "Home", url: "/" },
        { name: "Neighbourhoods", url: "/neighbourhoods" },
      ]),
    );
  }

  return (
    <>
      <link rel="canonical" href={canonical} />
      {nodes.map((n, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScriptHtml(n) }}
        />
      ))}
    </>
  );
}
