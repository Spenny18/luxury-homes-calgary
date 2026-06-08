import {
  webPageNode,
  breadcrumbsNode,
  jsonLdScriptHtml,
  ORG_ID,
} from "@/lib/schema";

const NODES = [
  webPageNode({
    url: "/home-evaluation",
    name: "Calgary home evaluation — Spencer Rivers, REALTOR®",
    description:
      "Free, no-obligation Calgary home evaluation from Spencer Rivers — luxury real estate specialist serving Springbank Hill, Aspen Woods, Upper Mount Royal, Elbow Park, Britannia, and Bel-Aire.",
  }),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://riversrealestate.ca/home-evaluation#service",
    name: "Comprehensive Calgary home evaluation",
    description:
      "Hand-built market analysis on every home — comparable sales, neighbourhood-specific positioning, and an honest pricing recommendation.",
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: "Calgary",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Calgary",
        addressRegion: "Alberta",
        addressCountry: "CA",
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
    },
  },
  breadcrumbsNode([
    { name: "Home", url: "/" },
    { name: "Home evaluation", url: "/home-evaluation" },
  ]),
];

export default function Head() {
  return (
    <>
      <link rel="canonical" href="https://luxuryhomescalgary.ca/home-evaluation" />
      {NODES.map((n, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScriptHtml(n) }}
        />
      ))}
    </>
  );
}
