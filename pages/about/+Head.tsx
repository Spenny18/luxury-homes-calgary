import {
  aboutPageNode,
  breadcrumbsNode,
  jsonLdScriptHtml,
} from "@/lib/schema";

const NODES = [
  aboutPageNode(),
  breadcrumbsNode([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]),
];

export default function Head() {
  return (
    <>
      <link rel="canonical" href="https://luxuryhomescalgary.ca/about" />
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
