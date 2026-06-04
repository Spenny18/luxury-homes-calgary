import {
  breadcrumbsNode,
  webPageNode,
  jsonLdScriptHtml,
  ORG_ID,
} from "@/lib/schema";

const NODES = [
  {
    ...webPageNode({
      url: "/contact",
      name: "Contact Spencer Rivers — Calgary luxury real estate",
      description:
        "Reach Spencer Rivers — direct line, email, and inquiry form for Calgary luxury home buyers and sellers.",
    }),
    "@type": "ContactPage",
    mainEntity: { "@id": ORG_ID },
  },
  breadcrumbsNode([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]),
];

export default function Head() {
  return (
    <>
      <link rel="canonical" href="https://luxuryhomescalgary.ca/contact" />
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
