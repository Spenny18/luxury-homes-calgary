import type { PageContext } from "vike/types";

export const title = (pageContext: PageContext) => {
  const listing = pageContext.data as
    | { title?: string; address?: string }
    | null
    | undefined;
  if (listing?.title) return `${listing.title} — Rivers Real Estate`;
  if (listing?.address) return `${listing.address} — Rivers Real Estate`;
  return "Listing — Rivers Real Estate";
};
