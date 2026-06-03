import type { PageContext } from "vike/types";
import { getBlogPost, listBlogPosts } from "../../../server/public-data";

export const data = async (pageContext: PageContext) => {
  const slug = pageContext.routeParams!.slug;
  const post = getBlogPost(slug);
  const allPosts = post ? listBlogPosts() : [];
  if (!post) {
    pageContext.statusCode = 404;
  }
  return { post, allPosts };
};
