import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChevronLeft, MapPin, ArrowRight, Building2, Layers, Calendar } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, formatSqft } from "@/lib/format";
import { apiUrl } from "@/lib/queryClient";

interface CondoDetail {
  slug: string;
  name: string;
  tagline: string;
  intro: string[];
  residencesCopy: string[];
  architecturalCopy: string[];
  amenities: string[];
  address: string;
  neighbourhood: string;
  neighbourhoodSlug: string;
  units: number | null;
  stories: number | null;
  builtIn: number | null;
  developer: string | null;
  architect: string | null;
  lat: number;
  lng: number;
  heroImage: string;
  listings: Array<{
    id: string;
    mlsNumber: string;
    fullAddress: string;
    listPrice: number;
    beds: number;
    baths: number;
    sqft: number | null;
    photoCount: number;
    heroImage: string | null;
    status: string;
  }>;
}

const propertyIcon = L.divIcon({
  className: "rivers-condo-pin",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#23412d;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function CondoDetailPage() {
  const [, params] = useRoute<{ slug: string }>("/condos/:slug");
  const slug = params?.slug;

  const { data, isLoading } = useQuery<CondoDetail>({
    queryKey: ["/api/public/condos", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <Skeleton className="h-[60vh] w-full" />
        <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-4">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </div>
      </PublicLayout>
    );
  }

  if (!data) {
    return (
      <PublicLayout>
        <div className="max-w-[800px] mx-auto px-6 py-32 text-center">
          <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
            BUILDING NOT FOUND
          </div>
          <h1 className="mt-4 font-serif text-4xl">That building isn't on the list yet</h1>
          <Link href="/condos">
            <a className="inline-block mt-8 font-display text-[11px] tracking-[0.22em] underline">
              ← BACK TO CONDO BUILDINGS
            </a>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout transparentHeader>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden -mt-16 lg:-mt-20">
        <img
          src={data.heroImage}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85" />
        <div className="relative h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28 text-white">
          <Link href="/condos">
            <a className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.22em] text-white/70 hover:text-white mb-8 self-start">
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.6} />
              BACK TO CONDO BUILDINGS
            </a>
          </Link>
          <div className="font-display text-[11px] tracking-[0.22em] text-white/80 mb-3">
            BUILDING GUIDE
          </div>
          <h1
            className="font-serif text-5xl lg:text-7xl text-white max-w-[960px]"
            style={{ letterSpacing: "-0.015em" }}
          >
            {data.name}
          </h1>
          <div className="mt-3 font-display text-xs tracking-[0.22em] text-white/80">
            {data.neighbourhood.toUpperCase()}, CALGARY
          </div>
          <p className="mt-5 max-w-[680px] text-white/90 leading-relaxed">{data.tagline}</p>
        </div>
      </section>

      {/* Sticky in-page nav */}
      <nav className="border-b border-border bg-background sticky top-16 lg:top-20 z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center gap-6 overflow-x-auto py-3 text-[11px] font-display tracking-[0.22em] text-muted-foreground">
          <a href="#intro" className="hover:text-foreground whitespace-nowrap">INTRO</a>
          <a href="#building" className="hover:text-foreground whitespace-nowrap">THE BUILDING</a>
          <a href="#amenities" className="hover:text-foreground whitespace-nowrap">AMENITIES</a>
          <a href="#real-estate" className="hover:text-foreground whitespace-nowrap">REAL ESTATE</a>
          <a href="#location" className="hover:text-foreground whitespace-nowrap">LOCATION</a>
        </div>
      </nav>

      {/* Intro */}
      <section id="intro" className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {data.intro.map((p, i) => (
          <p
            key={i}
            className="font-serif text-xl lg:text-2xl text-foreground leading-relaxed mb-5"
            style={{ letterSpacing: "-0.005em" }}
          >
            {p}
          </p>
        ))}

        {data.residencesCopy.length > 0 && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="font-display text-[11px] tracking-[0.22em] text-muted-foreground mb-3">
                RESIDENCES & FINISHES
              </div>
              {data.residencesCopy.map((p, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed mb-3">
                  {p}
                </p>
              ))}
            </div>
            <div>
              <div className="font-display text-[11px] tracking-[0.22em] text-muted-foreground mb-3">
                ARCHITECTURE
              </div>
              {data.architecturalCopy.map((p, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed mb-3">
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* The Building stat strip */}
      <section id="building" className="border-y border-border bg-secondary/30">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat icon={Building2} label="Units" value={data.units != null ? String(data.units) : "—"} />
          <Stat icon={Layers} label="Stories" value={data.stories != null ? String(data.stories) : "—"} />
          <Stat icon={Calendar} label="Built in" value={data.builtIn != null ? String(data.builtIn) : "—"} />
          <Stat icon={MapPin} label="Address" value={data.address.split(",")[0]} small />
        </div>
        {(data.developer || data.architect) && (
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pb-8 text-[11px] font-display tracking-[0.18em] text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
            {data.developer && <span>DEVELOPER · {data.developer.toUpperCase()}</span>}
            {data.architect && <span>ARCHITECT · {data.architect.toUpperCase()}</span>}
          </div>
        )}
      </section>

      {/* Amenities */}
      {data.amenities.length > 0 && (
        <section id="amenities" className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="font-display text-[11px] tracking-[0.22em] text-muted-foreground mb-2">
            AMENITIES
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl mb-8" style={{ letterSpacing: "-0.01em" }}>
            What you get with the building
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {data.amenities.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/85">
                <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Active listings in the building */}
      <section id="real-estate" className="bg-secondary/30 border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="font-display text-[11px] tracking-[0.22em] text-muted-foreground">
                AVAILABLE
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl mt-1" style={{ letterSpacing: "-0.01em" }}>
                Currently for sale at {data.name}
              </h2>
            </div>
            <Link href={`/mls?q=${encodeURIComponent(data.address.split(",")[0])}`}>
              <a className="font-display text-[11px] tracking-[0.22em] text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
                FULL MLS RESULTS <ArrowRight className="w-3 h-3" strokeWidth={1.6} />
              </a>
            </Link>
          </div>

          {data.listings.length === 0 ? (
            <div className="rounded-sm border border-border bg-background p-10 text-center text-sm text-muted-foreground">
              No active listings in this building right now. Pre-list inventory often
              moves before it appears here — get in touch and I'll let you know what's coming.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {data.listings.map((l) => (
                <Link key={l.id} href={`/mls/${l.id}`}>
                  <a className="group block">
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-secondary">
                      <img
                        src={l.heroImage ? apiUrl(l.heroImage) : data.heroImage}
                        alt={l.fullAddress}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => ((e.target as HTMLImageElement).src = data.heroImage)}
                      />
                      {l.status !== "Active" && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white font-display text-[10px] tracking-[0.22em]">
                          {l.status.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <div
                        className="font-serif text-2xl text-foreground"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {formatPrice(l.listPrice)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5 truncate">
                        {l.fullAddress}
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[11px] font-display tracking-[0.14em] text-muted-foreground">
                        <span>{l.beds} BD</span>
                        <span>{l.baths} BA</span>
                        <span>{formatSqft(l.sqft)}</span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Location map */}
      <section id="location" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="font-display text-[11px] tracking-[0.22em] text-muted-foreground mb-2">
          LOCATION
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl mb-8" style={{ letterSpacing: "-0.01em" }}>
          {data.address}
        </h2>
        <div className="rounded-sm overflow-hidden border border-border h-[460px]">
          <MapContainer
            center={[data.lat, data.lng]}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap, &copy; CARTO"
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[data.lat, data.lng]} icon={propertyIcon} />
          </MapContainer>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.18em] underline hover:no-underline"
          >
            GET DIRECTIONS <ArrowRight className="w-3 h-3" strokeWidth={1.6} />
          </a>
          <Link href={`/neighbourhoods/${data.neighbourhoodSlug}`}>
            <a className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.18em] underline hover:no-underline">
              {data.neighbourhood.toUpperCase()} NEIGHBOURHOOD GUIDE
              <ArrowRight className="w-3 h-3" strokeWidth={1.6} />
            </a>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 py-16 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-background" style={{ letterSpacing: "-0.01em" }}>
            Interested in {data.name}?
          </h2>
          <p className="mt-4 text-background/80 max-w-[640px] mx-auto leading-relaxed">
            I work this building regularly. Get on the early-look list for new
            inventory, or ask about specific units coming up for sale.
          </p>
          <Link href="/contact">
            <a className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-background text-foreground font-display text-[11px] tracking-[0.22em] hover:bg-background/90 transition-colors">
              CHAT SOON, CHEERS! <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.6} />
            </a>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  small = false,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.6} />
        <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground">
          {label.toUpperCase()}
        </div>
      </div>
      <div
        className={`font-serif ${small ? "text-base" : "text-2xl"} text-foreground`}
        style={{ letterSpacing: "-0.01em" }}
      >
        {value}
      </div>
    </div>
  );
}
