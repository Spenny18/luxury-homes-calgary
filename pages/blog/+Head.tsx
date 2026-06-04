import { usePageContext } from "vike-react/usePageContext";
import {
  blogPostingNode,
  breadcrumbsNode,
  webPageNode,
  jsonLdScriptHtml,
} from "@/lib/schema";

// Handles both /blog (list) and /blog/:slug (detail) since Vike inherits
// this +Head down the @slug subdirectory.
export default function Head() {
  const pageContext = usePageContext();
  const pathname = (pageContext.urlPathname || "/blog").replace(/\/$/, "");
  const slug = pageContext.routeParams?.slug;
  const canonical = `https://luxuryhomescalgary.ca${pathname || "/blog"}`;

  // Per-page schema. Detail pages get a BlogPosting; the index page gets a
  // CollectionPage / WebPage; both get breadcrumbs.
  const nodes: unknown[] = [];

  if (slug) {
    const post = pageContext.data as
      | {
          title?: string;
          excerpt?: string;
          body?: string;
          heroImage?: string | null;
          authorName?: string;
          publishedAt?: string;
          readMinutes?: number;
          category?: string;
        }
      | null
      | undefined;
    if (post?.title) {
      nodes.push(
        blogPostingNode({
          slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          heroImage: post.heroImage,
          authorName: post.authorName,
          publishedAt: post.publishedAt,
          readMinutes: post.readMinutes,
          category: post.category,
        }),
      );
      nodes.push(
        breadcrumbsNode([
          { name: "Home", url: "/" },
          { name: "Journal", url: "/blog" },
          { name: post.title, url: `/blog/${slug}` },
        ]),
      );
    }
  } else {
    nodes.push(
      webPageNode({
        url: "/blog",
        name: "The Journal — Rivers Real Estate",
        description:
          "Calgary luxury real estate — pricing strategy, neighbourhood intelligence, market data, written by Spencer Rivers.",
      }),
    );
    nodes.push(
      breadcrumbsNode([
        { name: "Home", url: "/" },
        { name: "Journal", url: "/blog" },
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
