import type { PageContext } from "vike/types";

export const description = (pageContext: PageContext) => {
  const data = pageContext.data as
    | { name?: string; tagline?: string; address?: string }
    | null
    | undefined;
  if (!data?.name) {
    return "Calgary luxury condo building guide from Rivers Real Estate.";
  }
  const tag = data.tagline ? ` ${data.tagline}.` : "";
  const where = data.address ? ` Located at ${data.address}.` : "";
  return `${data.name} — Calgary luxury condo building.${tag}${where} Active suites and architectural notes from Spencer Rivers.`;
};
