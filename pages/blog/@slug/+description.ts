import type { PageContext } from "vike/types";

export const description = (pageContext: PageContext) => {
  const post = (pageContext.data as { post?: { excerpt?: string } } | undefined)?.post;
  return (
    post?.excerpt ??
    "Calgary luxury real estate notes from Spencer Rivers — pricing strategy, neighbourhood intelligence, market data."
  );
};
