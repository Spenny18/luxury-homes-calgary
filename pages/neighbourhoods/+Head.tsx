import { usePageContext } from "vike-react/usePageContext";
import {
  placeNode,
  breadcrumbsNode,
  webPageNode,
  jsonLdScriptHtml,
} from "@/lib/schema";

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
