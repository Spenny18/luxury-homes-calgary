import type { PageContext } from "vike/types";
import { getNeighbourhoodDetail } from "../../../server/public-data";

export const data = async (pageContext: PageContext) => {
  const slug = pageContext.routeParams!.slug;
  const detail = await getNeighbourhoodDetail(slug);
  if (!detail) {
    pageContext.statusCode = 404;
    return null;
  }
  return detail;
};
