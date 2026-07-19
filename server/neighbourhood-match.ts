// Maps CREB's SubdivisionName field to one of our neighbourhood pages.
// CREB's `neighbourhood` field is a coarse district label that only ever
// resolves to a handful of communities, but SubdivisionName carries the real
// community name for ~1,100 Calgary-area subdivisions. Matching on it lets all
// 72 neighbourhood pages surface their live inventory instead of just the six
// hard-coded farm areas.

// Normalise a label for comparison: lowercase, "&"→"and", drop everything that
// isn't a letter or digit. So "St. Andrews Heights", "st-andrews-heights", and
// "St Andrews Heights" all collapse to the same key.
export function normKey(s: string | null | undefined): string {
  return (s ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

// Build a lookup from normalised community name AND slug to the canonical
// display name. Indexing both catches compound CREB labels: "Bridgeland/
// Riverside" collapses to "bridgelandriverside", which matches the slug
// `bridgeland-riverside` even though the display name is just "Bridgeland".
export function buildSubdivisionMap(
  neighbourhoods: Array<{ slug: string; name: string }>,
): Map<string, string> {
  const map = new Map<string, string>();
  for (const n of neighbourhoods) {
    map.set(normKey(n.name), n.name);
    map.set(normKey(n.slug), n.name);
  }
  return map;
}

// Estate/surrounding communities where CREB uses granular sub-area names
// (e.g. "Artesia at Heritage Pointes", "Bearspaw Village") that never equal our
// page name. Curated substring rules, tried only after the exact/part match so
// they can't shadow a precise hit. Kept deliberately narrow to avoid
// over-matching (Watermark is its own page and matches exactly, so a broad
// /bearspaw/ rule still won't steal it).
const SUBDIVISION_ALIASES: Array<[RegExp, string]> = [
  [/heritage\s*point/i, "Heritage Pointe"],
  [/bearspaw/i, "Bearspaw"],
];

// Resolve a CREB SubdivisionName to one of our neighbourhood names, or
// undefined if it isn't one we have a page for. Tries the whole label first,
// then each slash/comma-separated part (CREB uses "Community/Subarea"), then
// the curated alias rules.
export function matchSubdivision(
  subdivision: string | null | undefined,
  map: Map<string, string>,
): string | undefined {
  if (!subdivision) return undefined;
  const whole = map.get(normKey(subdivision));
  if (whole) return whole;
  for (const part of subdivision.split(/[/,]/)) {
    const hit = map.get(normKey(part));
    if (hit) return hit;
  }
  for (const [re, name] of SUBDIVISION_ALIASES) {
    if (re.test(subdivision)) return name;
  }
  return undefined;
}
