// Generates FAQ entries for a neighbourhood detail page from its structured
// data (borders, price, schools, live listings). Mirrors condo-faqs.ts: any
// question without a real answer is dropped so the rendered list stays tight
// and the FAQPage schema never ships thin entries. Rendered by FaqAccordion on
// the page and emitted as FAQPage JSON-LD in pages/neighbourhoods/+Head.tsx.

import { formatPriceCompact } from "@/lib/format";

export interface FaqEntry {
  q: string;
  a: string;
}

export interface NeighbourhoodFaqInput {
  name: string;
  slug: string;
  quadrant?: string | null;
  borders?: {
    north?: string;
    south?: string;
    east?: string;
    west?: string;
  } | null;
  avgPrice?: number | null;
  activeCount?: number | null;
  schools?: Array<{ name: string }> | null;
  listings?: Array<{ listPrice: number }> | null;
}

// Comma + "and" list, collapsing blanks.
function jury(parts: string[]): string {
  const cleaned = parts.map((p) => p.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";
  if (cleaned.length === 1) return cleaned[0];
  if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(", ")}, and ${cleaned[cleaned.length - 1]}`;
}

const REGION: Record<string, string> = {
  "city-centre": "inner-city Calgary",
  west: "west Calgary",
  south: "south Calgary",
  southwest: "southwest Calgary",
  southeast: "southeast Calgary",
  north: "north Calgary",
  northwest: "northwest Calgary",
  northeast: "northeast Calgary",
  east: "east Calgary",
  surrounding: "the Calgary area",
};

export function buildNeighbourhoodFaqs(n: NeighbourhoodFaqInput): FaqEntry[] {
  const faqs: FaqEntry[] = [];
  const name = n.name;
  const region = REGION[(n.quadrant ?? "").toLowerCase()] ?? "Calgary";

  // 1. Where is it? — every neighbourhood has at least a region.
  const b = n.borders ?? {};
  const sides: string[] = [];
  if (b.north) sides.push(`${b.north} to the north`);
  if (b.south) sides.push(`${b.south} to the south`);
  if (b.east) sides.push(`${b.east} to the east`);
  if (b.west) sides.push(`${b.west} to the west`);
  faqs.push({
    q: `Where is ${name} located?`,
    a: sides.length
      ? `${name} is a residential community in ${region}, bordered by ${jury(sides)}.`
      : `${name} is a residential community in ${region}.`,
  });

  // 2. Average home price.
  if (n.avgPrice && n.avgPrice > 0) {
    faqs.push({
      q: `What is the average home price in ${name}?`,
      a: `Homes in ${name} sell for an average of about ${formatPriceCompact(
        n.avgPrice,
      )}, though prices vary with lot size, home size, and condition.`,
    });
  }

  // 3. Schools.
  if (n.schools && n.schools.length > 0) {
    const names = n.schools.map((s) => s.name).filter(Boolean);
    if (names.length > 0) {
      faqs.push({
        q: `What schools are in ${name}?`,
        a: `Schools serving the ${name} area include ${jury(names.slice(0, 6))}.`,
      });
    }
  }

  // 4. Current inventory, with a live price range.
  if (n.activeCount && n.activeCount > 0) {
    const prices = (n.listings ?? [])
      .map((l) => l.listPrice)
      .filter((p) => p > 0);
    let priceText = "";
    if (prices.length > 0) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      priceText =
        min === max
          ? `, priced around ${formatPriceCompact(min)}`
          : `, priced from ${formatPriceCompact(min)} to ${formatPriceCompact(
              max,
            )}`;
    }
    const isAre = n.activeCount === 1 ? "is" : "are";
    const homeWord = n.activeCount === 1 ? "home" : "homes";
    faqs.push({
      q: `Are there homes for sale in ${name} right now?`,
      a: `Yes — there ${isAre} currently ${n.activeCount} active ${homeWord} for sale in ${name}${priceText}. Inventory turns over quickly, so contact Spencer Rivers for the latest availability.`,
    });
  }

  // 5. Closing agent question.
  faqs.push({
    q: `Who can help me buy or sell a home in ${name}?`,
    a: `Spencer Rivers represents both buyers and sellers in ${name} and can share off-market opportunities that never reach the public MLS. Call or text him directly to talk about the community.`,
  });

  return faqs;
}
