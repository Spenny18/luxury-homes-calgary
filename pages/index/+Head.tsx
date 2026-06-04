import {
  webPageNode,
  jsonLdScriptHtml,
  ORG_ID,
  PERSON_ID,
  WEBSITE_ID,
} from "@/lib/schema";

// Homepage WebPage node. Anchors the rest of the sitewide graph (Organization,
// Person, WebSite already emitted by HeadDefault.tsx).
const HOME_WEBPAGE = {
  ...webPageNode({
    url: "/",
    name: "Rivers Real Estate — Luxury Homes Calgary",
    description:
      "Spencer Rivers — luxury homes in Springbank Hill, Aspen Woods, Upper Mount Royal, Elbow Park, Britannia, and Bel-Aire.",
  }),
  about: { "@id": ORG_ID },
  mainEntity: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
};

export default function Head() {
  return (
    <>
      <link rel="canonical" href="https://luxuryhomescalgary.ca/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptHtml(HOME_WEBPAGE) }}
      />
    </>
  );
}
