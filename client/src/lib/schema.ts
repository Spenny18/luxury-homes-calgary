// Schema.org JSON-LD builders.
//
// Emitted by pages/HeadDefault.tsx (sitewide nodes — Organization, Person,
// WebSite) and by each route's +Head.tsx (page-specific nodes — Place,
// BlogPosting, RealEstateListing, BreadcrumbList, etc.).
//
// All entities use stable @ids so other JSON-LD blobs on the page can
// reference them (e.g. a BlogPosting's `author` resolves to the sitewide
// Person node).

const ORIGIN = "https://riversrealestate.ca";
export const ORG_ID = `${ORIGIN}/#organization`;
export const PERSON_ID = `${ORIGIN}/#spencer`;
export const WEBSITE_ID = `${ORIGIN}/#website`;
export const LOGO_ID = `${ORIGIN}/#logo`;

// ---------- Sitewide entities -----------------------------------------------

export function organizationNode() {
  return {
    "@type": ["RealEstateAgent", "Organization"],
    "@id": ORG_ID,
    name: "Rivers Real Estate",
    alternateName: "Luxury Homes Calgary",
    url: `${ORIGIN}/`,
    logo: { "@id": LOGO_ID },
    image: { "@id": LOGO_ID },
    telephone: "+1-403-966-9237",
    email: "spencer@riversrealestate.ca",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "Alberta",
      addressCountry: "CA",
    },
    // CREB district + neighbourhood coverage Spencer markets.
    areaServed: [
      "Calgary",
      "Springbank Hill",
      "Aspen Woods",
      "Upper Mount Royal",
      "Lower Mount Royal",
      "Elbow Park",
      "Britannia",
      "Bel-Aire",
      "Eau Claire",
      "Beltline",
      "Mission",
      "Inglewood",
    ],
    sameAs: [
      "https://www.facebook.com/SpencerRiversRealEstate/",
      "https://twitter.com/SRiversYYC",
    ],
    founder: { "@id": PERSON_ID },
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Spencer Rivers",
    givenName: "Spencer",
    familyName: "Rivers",
    jobTitle: "REALTOR®",
    honorificSuffix: "CLHMS, CIPS, CNE, CCS, LLS",
    worksFor: { "@id": ORG_ID },
    email: "spencer@riversrealestate.ca",
    telephone: "+1-403-966-9237",
    url: `${ORIGIN}/about`,
    sameAs: [
      "https://www.facebook.com/SpencerRiversRealEstate/",
      "https://twitter.com/SRiversYYC",
    ],
  };
}

export function logoNode() {
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${ORIGIN}/icon-512.png`,
    contentUrl: `${ORIGIN}/icon-512.png`,
    width: 512,
    height: 512,
    caption: "Rivers Real Estate",
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${ORIGIN}/`,
    name: "Rivers Real Estate",
    alternateName: "Luxury Homes Calgary",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-CA",
    // Sitelinks searchbox — Google may render a search input under the
    // brand result if it considers this site important enough.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${ORIGIN}/mls?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Returns the JSON-LD graph that ships in <head> on every page.
export function sitewideGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      personNode(),
      logoNode(),
      websiteNode(),
    ],
  };
}

// ---------- Per-page helpers ------------------------------------------------

export interface Breadcrumb {
  name: string;
  url: string;
}

export function breadcrumbsNode(crumbs: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${ORIGIN}${c.url}`,
    })),
  };
}

function absoluteUrl(u: string | null | undefined): string | undefined {
  if (!u) return undefined;
  if (u.startsWith("http")) return u;
  if (u.startsWith("/")) return `${ORIGIN}${u}`;
  return u;
}

// ----- WebPage (used on every non-home page so breadcrumbs hang off it) -----

export function webPageNode(opts: {
  url: string;
  name: string;
  description?: string;
  image?: string | null;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(opts.url)}#webpage`,
    url: absoluteUrl(opts.url),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-CA",
    primaryImageOfPage: opts.image ? { "@type": "ImageObject", url: absoluteUrl(opts.image) } : undefined,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
  };
}

// ----- Place (neighbourhoods) ----------------------------------------------

export function placeNode(opts: {
  slug: string;
  name: string;
  description?: string;
  image?: string | null;
  lat?: number;
  lng?: number;
  containedInCity?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${ORIGIN}/neighbourhoods/${opts.slug}#place`,
    name: opts.name,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : undefined,
    url: `${ORIGIN}/neighbourhoods/${opts.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.containedInCity ?? "Calgary",
      addressRegion: "Alberta",
      addressCountry: "CA",
    },
    geo:
      opts.lat != null && opts.lng != null
        ? {
            "@type": "GeoCoordinates",
            latitude: opts.lat,
            longitude: opts.lng,
          }
        : undefined,
    containedInPlace: {
      "@type": "City",
      name: "Calgary",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Calgary",
        addressRegion: "Alberta",
        addressCountry: "CA",
      },
    },
  };
}

// ----- ApartmentComplex (condos) -------------------------------------------

export function apartmentComplexNode(opts: {
  slug: string;
  name: string;
  description?: string;
  image?: string | null;
  address?: string | null;
  lat?: number;
  lng?: number;
  numberOfUnits?: number | null;
  numberOfFloors?: number | null;
  yearBuilt?: number | null;
  amenities?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["ApartmentComplex", "ResidenceHall"],
    "@id": `${ORIGIN}/condos/${opts.slug}#building`,
    name: opts.name,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : undefined,
    url: `${ORIGIN}/condos/${opts.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: opts.address ?? undefined,
      addressLocality: "Calgary",
      addressRegion: "Alberta",
      addressCountry: "CA",
    },
    geo:
      opts.lat != null && opts.lng != null
        ? {
            "@type": "GeoCoordinates",
            latitude: opts.lat,
            longitude: opts.lng,
          }
        : undefined,
    numberOfAccommodationUnits: opts.numberOfUnits ?? undefined,
    // Schema.org doesn't have a clean "stories" field on ApartmentComplex.
    // We use additionalProperty for that + builtIn year.
    additionalProperty: [
      opts.numberOfFloors
        ? {
            "@type": "PropertyValue",
            name: "Number of floors",
            value: opts.numberOfFloors,
          }
        : null,
      opts.yearBuilt
        ? {
            "@type": "PropertyValue",
            name: "Year built",
            value: opts.yearBuilt,
          }
        : null,
    ].filter(Boolean),
    amenityFeature: opts.amenities?.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
  };
}

// ----- BlogPosting ---------------------------------------------------------

export function blogPostingNode(opts: {
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  heroImage?: string | null;
  authorName?: string;
  publishedAt?: string;
  readMinutes?: number;
  category?: string;
}) {
  const url = `${ORIGIN}/blog/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: opts.title,
    description: opts.excerpt,
    image: opts.heroImage ? absoluteUrl(opts.heroImage) : undefined,
    datePublished: opts.publishedAt,
    dateModified: opts.publishedAt,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    articleSection: opts.category,
    wordCount: opts.body ? opts.body.split(/\s+/).filter(Boolean).length : undefined,
    timeRequired: opts.readMinutes ? `PT${opts.readMinutes}M` : undefined,
    inLanguage: "en-CA",
    url,
  };
}

// ----- RealEstateListing ---------------------------------------------------

export function realEstateListingNode(opts: {
  slug: string;
  title: string;
  description?: string;
  address: string;
  city?: string;
  neighbourhood?: string | null;
  price: number;
  status?: string;
  beds?: number;
  baths?: number;
  sqft?: number | null;
  yearBuilt?: number | null;
  lotSize?: string | null;
  heroImage?: string | null;
  gallery?: string[];
  lat?: number;
  lng?: number;
  agentSlug?: string; // /p/:slug
}) {
  const url = opts.agentSlug
    ? `${ORIGIN}/p/${opts.agentSlug}`
    : `${ORIGIN}/${opts.slug}`;
  const images = [
    opts.heroImage,
    ...(opts.gallery ?? []),
  ]
    .filter(Boolean)
    .map((u) => absoluteUrl(u as string)!) as string[];
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateListing", "Product"],
    "@id": `${url}#listing`,
    name: opts.title,
    description: opts.description,
    url,
    image: images.length ? images : undefined,
    datePosted: undefined, // listings.createdAt isn't surfaced; ok to omit
    address: {
      "@type": "PostalAddress",
      streetAddress: opts.address,
      addressLocality: opts.city ?? "Calgary",
      addressRegion: "Alberta",
      addressCountry: "CA",
    },
    geo:
      opts.lat != null && opts.lng != null
        ? {
            "@type": "GeoCoordinates",
            latitude: opts.lat,
            longitude: opts.lng,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: "CAD",
      availability:
        opts.status?.toLowerCase() === "sold"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      seller: { "@id": ORG_ID },
    },
    numberOfBedrooms: opts.beds,
    numberOfBathroomsTotal: opts.baths,
    numberOfFullBathrooms: opts.baths ? Math.floor(opts.baths) : undefined,
    floorSize:
      opts.sqft != null
        ? {
            "@type": "QuantitativeValue",
            value: opts.sqft,
            unitCode: "FTK", // UN/CEFACT code for square feet
            unitText: "sqft",
          }
        : undefined,
    yearBuilt: opts.yearBuilt ?? undefined,
    additionalProperty: opts.lotSize
      ? [
          {
            "@type": "PropertyValue",
            name: "Lot size",
            value: opts.lotSize,
          },
        ]
      : undefined,
    broker: { "@id": ORG_ID },
  };
}

// ----- AboutPage ------------------------------------------------------------

export function aboutPageNode() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${ORIGIN}/about#webpage`,
    url: `${ORIGIN}/about`,
    name: "About Spencer Rivers — Calgary luxury real estate",
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-CA",
  };
}

// ----- Single-script render helper -----------------------------------------

/** Convert a JSON-LD object to a `<script>` tag for use in +Head.tsx. */
export function jsonLdScriptHtml(node: unknown): string {
  // Escape `</script>` sequences inside string values to avoid breaking out
  // of the script tag. Cheap belt-and-suspenders.
  return JSON.stringify(node).replace(/<\/script/gi, "<\\/script");
}
