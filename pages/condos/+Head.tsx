import { usePageContext } from "vike-react/usePageContext";
import {
  apartmentComplexNode,
  breadcrumbsNode,
  webPageNode,
  faqPageNode,
  jsonLdScriptHtml,
} from "@/lib/schema";
import { buildCondoFaqs } from "@/lib/condo-faqs";

// Handles /condos (list) and /condos/:slug (detail).
export default function Head() {
  const pageContext = usePageContext();
  const pathname = (pageContext.urlPathname || "/condos").replace(/\/$/, "");
  const slug = pageContext.routeParams?.slug;
  const canonical = `https://luxuryhomescalgary.ca${pathname || "/condos"}`;

  const nodes: unknown[] = [];

  if (slug) {
    const c = pageContext.data as
      | {
          name?: string;
          tagline?: string;
          heroImage?: string | null;
          address?: string | null;
          neighbourhood?: string | null;
          neighbourhoodSlug?: string | null;
          lat?: number;
          lng?: number;
          units?: number | null;
          stories?: number | null;
          builtIn?: number | null;
          developer?: string | null;
          architect?: string | null;
          amenities?: string[];
          listings?: Array<{ listPrice: number }>;
        }
      | null
      | undefined;
    if (c?.name) {
      nodes.push(
        apartmentComplexNode({
          slug,
          name: c.name,
          description: c.tagline,
          image: c.heroImage,
          address: c.address,
          lat: c.lat,
          lng: c.lng,
          numberOfUnits: c.units,
          numberOfFloors: c.stories,
          yearBuilt: c.builtIn,
          amenities: c.amenities,
        }),
      );
      nodes.push(
        breadcrumbsNode([
          { name: "Home", url: "/" },
          { name: "Condos", url: "/condos" },
          { name: c.name, url: `/condos/${slug}` },
        ]),
      );

      // FAQPage — generated from the same structured data the page renders
      // visibly, so what Google sees in the SERP exactly matches the
      // accordion below the fold.
      const faqs = buildCondoFaqs({
        name: c.name,
        slug,
        address: c.address,
        neighbourhood: c.neighbourhood,
        neighbourhoodSlug: c.neighbourhoodSlug,
        units: c.units,
        stories: c.stories,
        builtIn: c.builtIn,
        developer: c.developer,
        architect: c.architect,
        amenities: c.amenities,
        listings: c.listings,
      });
      const faqNode = faqPageNode({ url: `/condos/${slug}`, items: faqs });
      if (faqNode) nodes.push(faqNode);
    }
  } else {
    nodes.push(
      webPageNode({
        url: "/condos",
        name: "Calgary luxury condos — Rivers Real Estate",
        description:
          "Calgary's premier condominium buildings in Eau Claire, the Beltline, and East Village. Profiles, active suites, and architectural notes.",
      }),
    );
    nodes.push(
      breadcrumbsNode([
        { name: "Home", url: "/" },
        { name: "Condos", url: "/condos" },
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
