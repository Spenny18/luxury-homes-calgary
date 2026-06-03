import {
  listNeighbourhoods,
  getNeighbourhoodDetail,
} from "../../../server/public-data";

// Enumerate every neighbourhood slug for build-time prerender so each one gets
// its own HTML file.
export const onBeforePrerenderStart = async () => {
  const neighbourhoods = listNeighbourhoods();
  return neighbourhoods
    .map((n) => {
      const detail = getNeighbourhoodDetail(n.slug);
      if (!detail) return null;
      return {
        url: `/neighbourhoods/${n.slug}`,
        pageContext: {
          routeParams: { slug: n.slug },
          data: detail,
        },
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
};
