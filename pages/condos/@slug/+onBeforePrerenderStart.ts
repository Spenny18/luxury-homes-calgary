import {
  listCondoBuildings,
  getCondoBuildingDetail,
} from "../../../server/public-data";

export const onBeforePrerenderStart = async () => {
  const buildings = listCondoBuildings();
  return buildings
    .map((b: any) => {
      const detail = getCondoBuildingDetail(b.slug);
      if (!detail) return null;
      return {
        url: `/condos/${b.slug}`,
        pageContext: {
          routeParams: { slug: b.slug },
          data: detail,
        },
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
};
