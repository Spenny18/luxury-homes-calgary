import type { PageContext } from "vike/types";

export const title = (pageContext: PageContext) => {
  const post = (pageContext.data as { post?: { title?: string } } | undefined)?.post;
  if (!post?.title) return "The Journal — Rivers Real Estate";
  return `${post.title} — Rivers Real Estate`;
};
