// Applies the long-form neighbourhood copy in neighbourhood-content.ts to the
// runtime DB at startup. Upgrade-only: a page is updated only when the new copy
// is longer than what's stored, so this never clobbers a richer CMS edit and is
// idempotent across reboots. Runs after seedDatabase() (which inserts the rows).
import { storage } from "./storage";
import { neighbourhoodContent } from "./neighbourhood-content";

const COPY_FIELDS = [
  "story",
  "realEstateCopy",
  "lifeCopy",
  "outsideCopy",
  "amenitiesCopy",
  "shopDineCopy",
] as const;

// Total characters across the six copy fields. `stored` rows hold JSON strings;
// generated content holds arrays.
function copyChars(obj: Record<string, unknown>, stored: boolean): number {
  let total = 0;
  for (const field of COPY_FIELDS) {
    let arr: unknown[] = [];
    const v = obj[field];
    if (stored) {
      try {
        const parsed = JSON.parse((v as string) ?? "[]");
        if (Array.isArray(parsed)) arr = parsed;
      } catch {
        arr = [];
      }
    } else if (Array.isArray(v)) {
      arr = v;
    }
    total += arr.join(" ").length;
  }
  return total;
}

export function applyNeighbourhoodContent(): void {
  if (!neighbourhoodContent.length) return;
  let applied = 0;
  let skipped = 0;
  for (const c of neighbourhoodContent) {
    const existing = storage.getNeighbourhoodBySlug(c.slug);
    // Rows are created by seedDatabase(); we only enrich existing ones.
    if (!existing) {
      skipped++;
      continue;
    }
    if (copyChars(c as unknown as Record<string, unknown>, false) <= copyChars(existing as unknown as Record<string, unknown>, true)) {
      skipped++;
      continue;
    }
    const patch: Record<string, unknown> = { slug: c.slug };
    for (const field of COPY_FIELDS) {
      patch[field] = JSON.stringify((c as unknown as Record<string, unknown>)[field] ?? []);
    }
    if (Array.isArray(c.schools) && c.schools.length) {
      patch.schools = JSON.stringify(c.schools);
    }
    try {
      storage.upsertNeighbourhood(patch as never);
      applied++;
    } catch (err) {
      console.error(`[nb-content] failed to apply ${c.slug}:`, err);
      skipped++;
    }
  }
  console.log(
    `[nb-content] applied ${applied}, skipped ${skipped} (of ${neighbourhoodContent.length})`,
  );
}
