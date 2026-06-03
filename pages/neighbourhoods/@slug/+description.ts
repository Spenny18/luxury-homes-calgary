import type { PageContext } from "vike/types";

export const description = (pageContext: PageContext) => {
  const data = pageContext.data as
    | { name?: string; tagline?: string }
    | null
    | undefined;
  if (!data?.name) {
    return "Calgary luxury neighbourhood guide from Rivers Real Estate.";
  }
  const tag = data.tagline ? ` ${data.tagline}.` : "";
  return `${data.name}, Calgary — neighbourhood guide, average prices, active listings.${tag} Curated by Spencer Rivers, REALTOR®.`;
};
