import type { PageContext } from "vike/types";

export const title = (pageContext: PageContext) => {
  const data = pageContext.data as { name?: string } | null | undefined;
  if (!data?.name) return "Calgary condo building — Rivers Real Estate";
  return `${data.name} — Calgary luxury condo building`;
};
