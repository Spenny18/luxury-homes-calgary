// Generates FAQ entries for a condo building's detail page. Drops any question
// that doesn't have a real answer (e.g. no developer in the DB → no developer
// FAQ) so the rendered list stays tight and the FAQPage schema doesn't ship
// thin entries Google might flag.

import { formatPriceCompact } from "@/lib/format";

export interface CondoFaqInput {
  name: string;
  slug: string;
  address?: string | null;
  neighbourhood?: string | null;
  neighbourhoodSlug?: string | null;
  units?: number | null;
  stories?: number | null;
  builtIn?: number | null;
  developer?: string | null;
  architect?: string | null;
  amenities?: string[] | null;
  /** Active suite listings inside the building (the ones the page already
   *  shows under "Available now"), used to derive a current price-range
   *  answer. */
  listings?: Array<{ listPrice: number; beds?: number; baths?: number }> | null;
}

export interface FaqEntry {
  q: string;
  a: string;
}

function jurySentence(parts: string[]): string {
  // Render a list of phrases joined with commas + "and" before the last,
  // collapsing duplicates and trimming whitespace.
  const cleaned = parts.map((p) => p.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";
  if (cleaned.length === 1) return cleaned[0];
  if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(", ")}, and ${cleaned[cleaned.length - 1]}`;
}

export function buildCondoFaqs(c: CondoFaqInput): FaqEntry[] {
  const faqs: FaqEntry[] = [];
  const name = c.name;
  const neighbourhood = c.neighbourhood ?? "downtown Calgary";

  // 1. Where is the building? — every condo has this.
  if (c.address) {
    faqs.push({
      q: `Where is ${name} located?`,
      a: `${name} is at ${c.address} in ${neighbourhood}, Calgary, Alberta.`,
    });
  } else {
    faqs.push({
      q: `Where is ${name} located?`,
      a: `${name} is in ${neighbourhood}, Calgary, Alberta.`,
    });
  }

  // 2. Building size — units and/or stories.
  if (c.units != null || c.stories != null) {
    const parts: string[] = [];
    if (c.units != null) parts.push(`${c.units} residences`);
    if (c.stories != null) parts.push(`${c.stories} storeys`);
    faqs.push({
      q: `How many units does ${name} have?`,
      a: `${name} has ${jurySentence(parts)}.`,
    });
  }

  // 3. Year built.
  if (c.builtIn != null) {
    faqs.push({
      q: `When was ${name} built?`,
      a: `${name} was completed in ${c.builtIn}.`,
    });
  }

  // 4. Developer.
  if (c.developer) {
    faqs.push({
      q: `Who developed ${name}?`,
      a: `${name} was developed by ${c.developer}.`,
    });
  }

  // 5. Architect.
  if (c.architect) {
    faqs.push({
      q: `Who designed ${name}?`,
      a: `${name} was designed by ${c.architect}.`,
    });
  }

  // 6. Amenities.
  if (c.amenities && c.amenities.length > 0) {
    const top = c.amenities.slice(0, 8);
    const tail = c.amenities.length > top.length ? ", among others" : "";
    faqs.push({
      q: `What amenities does ${name} offer?`,
      a: `${name} offers ${jurySentence(top)}${tail}.`,
    });
  }

  // 7. Current price range from live listings.
  if (c.listings && c.listings.length > 0) {
    const prices = c.listings.map((l) => l.listPrice).filter((p) => p > 0);
    if (prices.length > 0) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const priceText =
        prices.length === 1 || min === max
          ? `currently listed at ${formatPriceCompact(min)}`
          : `currently listed from ${formatPriceCompact(min)} to ${formatPriceCompact(max)}`;
      const verb = prices.length === 1 ? "is" : "are";
      const noun = prices.length === 1 ? "suite" : "suites";
      faqs.push({
        q: `What's the price range at ${name}?`,
        a: `There ${verb} ${prices.length} active ${noun} at ${name}, ${priceText}. Inventory turns over quickly — contact Spencer Rivers for current availability.`,
      });
    }
  }

  // 8. Neighbourhood cross-link as a closing question.
  if (c.neighbourhood) {
    faqs.push({
      q: `What neighbourhood is ${name} in?`,
      a: `${name} is in ${c.neighbourhood}. Read the full ${c.neighbourhood} neighbourhood guide for context on the area, schools, and dining.`,
    });
  }

  return faqs;
}
