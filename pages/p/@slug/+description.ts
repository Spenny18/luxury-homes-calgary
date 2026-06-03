import type { PageContext } from "vike/types";

export const description = (pageContext: PageContext) => {
  const listing = pageContext.data as
    | { description?: string; address?: string }
    | null
    | undefined;
  if (listing?.description) return listing.description.slice(0, 200);
  if (listing?.address) return `${listing.address}, Calgary — listed by Spencer Rivers.`;
  return "Calgary luxury home listing — Rivers Real Estate.";
};
