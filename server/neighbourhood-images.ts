// Curated hero images for neighbourhood pages, applied to the runtime DB on
// boot by applyNeighbourhoodImages(). Photos are CC-licensed (attribution in
// heroCredit) and self-hosted under client/public/img/neighbourhoods/. Owned or
// stock photos leave heroCredit null. Only replaces the old stock/AI heroes
// (Unsplash / luxuryhomescalgary.ca) or a prior curated image, so a CMS edit to
// a different source is never clobbered.
import { storage } from "./storage";

export interface NbImageCredit {
  author: string;
  authorUrl?: string;
  license: string; // e.g. "CC BY 2.0"
  licenseUrl: string;
  sourceUrl: string;
}

export interface NbImage {
  slug: string;
  heroImage: string; // e.g. "/img/neighbourhoods/bel-aire.jpg"
  heroCredit: NbImageCredit | null;
}

export const neighbourhoodImages: NbImage[] = [
  {
    slug: "bel-aire",
    heroImage: "/img/neighbourhoods/bel-aire.jpg",
    heroCredit: {
      author: "Daniel from Glasgow, United Kingdom",
      authorUrl: "https://www.flickr.com/people/57511216@N04",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=68531052",
    },
  },
];

// A hero we're allowed to replace: the old stock/AI sources, a prior curated
// image of ours, or an empty value. Anything else (e.g. a photo Spencer set via
// the CMS) is left alone.
function isReplaceable(url: string | null | undefined): boolean {
  if (!url) return true;
  if (url.startsWith("/img/neighbourhoods/")) return true;
  try {
    const host = new URL(url).host;
    return host === "images.unsplash.com" || host === "luxuryhomescalgary.ca";
  } catch {
    return true;
  }
}

export function applyNeighbourhoodImages(): void {
  if (!neighbourhoodImages.length) return;
  let applied = 0;
  let skipped = 0;
  for (const im of neighbourhoodImages) {
    const existing = storage.getNeighbourhoodBySlug(im.slug);
    if (!existing || !isReplaceable(existing.heroImage)) {
      skipped++;
      continue;
    }
    const creditJson = im.heroCredit ? JSON.stringify(im.heroCredit) : "";
    if (
      existing.heroImage === im.heroImage &&
      ((existing as { heroCredit?: string }).heroCredit ?? "") === creditJson
    ) {
      skipped++;
      continue;
    }
    try {
      storage.upsertNeighbourhood({
        slug: im.slug,
        heroImage: im.heroImage,
        heroCredit: creditJson,
      } as never);
      applied++;
    } catch (err) {
      console.error(`[nb-images] failed to apply ${im.slug}:`, err);
      skipped++;
    }
  }
  console.log(
    `[nb-images] applied ${applied}, skipped ${skipped} (of ${neighbourhoodImages.length})`,
  );
}
