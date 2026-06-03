import type { PageContext } from "vike/types";
import { getPublicListing } from "../../../server/public-data";

export const data = async (pageContext: PageContext) => {
  const slug = pageContext.routeParams!.slug;
  const listing = getPublicListing(slug);
  if (!listing) {
    pageContext.statusCode = 404;
    return null;
  }
  return listing;
};
