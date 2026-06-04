import { usePageContext } from "vike-react/usePageContext";
import {
  realEstateListingNode,
  breadcrumbsNode,
  jsonLdScriptHtml,
} from "@/lib/schema";

export default function Head() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug;
  if (!slug) return null;

  const listing = pageContext.data as
    | {
        title?: string;
        address?: string;
        city?: string;
        neighbourhood?: string | null;
        price?: number;
        status?: string;
        beds?: number;
        baths?: number;
        sqft?: number | null;
        yearBuilt?: number | null;
        lotSize?: string | null;
        description?: string;
        heroImage?: string | null;
        gallery?: string[];
        lat?: number;
        lng?: number;
      }
    | null
    | undefined;

  const nodes: unknown[] = [];
  if (listing?.title && listing.address && listing.price) {
    nodes.push(
      realEstateListingNode({
        slug,
        title: listing.title,
        description: listing.description,
        address: listing.address,
        city: listing.city,
        neighbourhood: listing.neighbourhood,
        price: listing.price,
        status: listing.status,
        beds: listing.beds,
        baths: listing.baths,
        sqft: listing.sqft,
        yearBuilt: listing.yearBuilt,
        lotSize: listing.lotSize,
        heroImage: listing.heroImage,
        gallery: listing.gallery,
        lat: listing.lat,
        lng: listing.lng,
        agentSlug: slug,
      }),
    );
    nodes.push(
      breadcrumbsNode([
        { name: "Home", url: "/" },
        { name: "Listings", url: "/mls" },
        { name: listing.title, url: `/p/${slug}` },
      ]),
    );
  }

  return (
    <>
      <link rel="canonical" href={`https://luxuryhomescalgary.ca/p/${slug}`} />
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
