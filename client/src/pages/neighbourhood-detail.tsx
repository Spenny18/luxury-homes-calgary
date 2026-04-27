import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowRight, ChevronLeft, MapPin, Home as HomeIcon } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";
import { ListingCard } from "@/components/listing-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatPriceCompact } from "@/lib/format";
import {
  parseJsonArray,
  type PublicNeighbourhoodDetail,
} from "@/lib/mls-types";

export default function NeighbourhoodDetailPage() {
  const [, params] = useRoute<{ slug: string }>("/neighbourhoods/:slug");
  const slug = params?.slug;

  const { data, isLoading } = useQuery<PublicNeighbourhoodDetail>({
    queryKey: ["/api/public/neighbourhoods", slug],
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
            NEIGHBOURHOOD NOT FOUND
          </div>
          <h1 className="mt-4 font-serif text-4xl">
            That community isn't on the list yet
          </h1>
          <Link href="/neighbourhoods">
            <a className="inline-block mt-8 font-display text-[11px] tracking-[0.22em] underline">
              ← BACK TO NEIGHBOURHOODS
            </a>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const story = parseJsonArray(data.story);
  const galleryImgs = parseJsonArray(data.gallery);
  const listings = data.listings ?? [];

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
          <Link href="/neighbourhoods">
            <a
              className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.22em] text-white/70 hover:text-white mb-8 self-start"
              data-testid="link-back-to-neighbourhoods"
            >
              <ChevronLeft className="w-3 h-3" strokeWidth={1.8} />
              ALL NEIGHBOURHOODS
            </a>
          </Link>
          <div className="font-display text-[11px] tracking-[0.32em] text-white/70 inline-flex items-center gap-2">
            <MapPin className="w-3 h-3" strokeWidth={1.8} />
            CALGARY · ALBERTA
          </div>
          <h1 className="mt-4 font-serif text-[52px] lg:text-[88px] leading-[0.98] max-w-[1100px]">
            {data.name}
          </h1>
          <div className="mt-5 max-w-2xl font-serif italic text-[20px] lg:text-[26px] text-white/85">
            {data.tagline}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4 pt-8 border-t border-white/20">
            <Stat label="Average price" value={formatPriceCompact(data.avgPrice)} />
            <Stat label="Active listings" value={String(data.activeCount)} />
            <Stat label="Community" value={data.name} />
          </div>
        </div>
      </section>

      {/* Story body */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
          THE STORY
        </div>
        <div className="mt-6 space-y-6 font-serif text-[20px] lg:text-[22px] leading-[1.55] text-foreground/90">
          {story.length > 0 ? (
            story.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{data.tagline}</p>
          )}
        </div>
      </section>

      {/* Three columns */}
      <section className="max-w-[1300px] mx-auto px-6 lg:px-10 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
        <CopyBlock label="Outside" body={data.outsideCopy} />
        <CopyBlock label="Amenities" body={data.amenitiesCopy} />
        <CopyBlock label="Shop & dine" body={data.shopDineCopy} />
      </section>

      {/* Gallery strip (if available) */}
      {galleryImgs.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3">
            {galleryImgs.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary"
              >
                <img
                  src={src}
                  alt={`${data.name} ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Map */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-20">
        <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
          ON THE MAP
        </div>
        <h2 className="mt-3 font-serif text-3xl lg:text-4xl">
          Where {data.name} sits
        </h2>
        <div
          className="mt-6 aspect-[16/9] rounded-sm overflow-hidden border border-border bg-secondary"
          data-testid="neighbourhood-map"
        >
          <MapContainer
            center={[data.centerLat, data.centerLng]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CircleMarker
              center={[data.centerLat, data.centerLng]}
              radius={16}
              pathOptions={{
                color: "#fff",
                weight: 3,
                fillColor: "#000",
                fillOpacity: 1,
              }}
            >
              <Tooltip permanent direction="top" offset={[0, -10]} opacity={1}>
                <div
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {data.name}
                </div>
              </Tooltip>
            </CircleMarker>
            {listings
              .filter((l) => l.lat != null && l.lng != null)
              .slice(0, 24)
              .map((l) => (
                <CircleMarker
                  key={l.id}
                  center={[l.lat as number, l.lng as number]}
                  radius={6}
                  pathOptions={{
                    color: "#fff",
                    weight: 2,
                    fillColor: "#666",
                    fillOpacity: 1,
                  }}
                >
                  <Tooltip>
                    <div
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 11,
                      }}
                    >
                      {l.fullAddress}
                    </div>
                  </Tooltip>
                </CircleMarker>
              ))}
          </MapContainer>
        </div>
      </section>

      {/* Active listings */}
      <section className="bg-secondary/40 py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                ACTIVE IN {data.name.toUpperCase()}
              </div>
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl">
                Properties on the market today
              </h2>
            </div>
            <Link
              href={`/mls?neighbourhood=${encodeURIComponent(data.name)}`}
            >
              <a
                className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.22em]"
                data-testid="link-search-neighbourhood"
              >
                SEE ALL
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </a>
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="mt-10 border border-dashed border-border rounded-sm p-12 text-center">
              <HomeIcon
                className="w-8 h-8 mx-auto text-muted-foreground"
                strokeWidth={1.4}
              />
              <h3 className="mt-4 font-serif text-2xl">
                Nothing currently listed here
              </h3>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm">
                Inventory turns over quickly in {data.name}. Reach out and
                Spencer will share off-market homes that match what you're
                looking for.
              </p>
              <Link href="/contact">
                <a>
                  <Button className="mt-6" data-testid="button-contact-spencer">
                    Get in touch
                  </Button>
                </a>
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.slice(0, 8).map((l) => (
                <ListingCard key={l.id} listing={l} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center">
        <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
          THINKING {data.name.toUpperCase()}?
        </div>
        <h2 className="mt-4 font-serif text-4xl lg:text-5xl leading-[1.05]">
          The right home in this community starts with the right conversation.
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-muted-foreground text-[15px]">
          Spencer represents both buyers and sellers in {data.name} and can
          share off-market opportunities that never make the public MLS.
        </p>
        <Link href="/contact">
          <a>
            <Button
              className="mt-8 h-12 px-8 rounded-sm font-display text-[11px] tracking-[0.22em]"
              data-testid="button-detail-cta-contact"
            >
              CALL OR TEXT SPENCER DIRECTLY
            </Button>
          </a>
        </Link>
      </section>
    </PublicLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-[10px] tracking-[0.22em] text-white/55">
        {label.toUpperCase()}
      </div>
      <div className="mt-1.5 font-serif text-2xl tabular-nums">{value}</div>
    </div>
  );
}

function CopyBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground pb-3 border-b border-border">
        {label.toUpperCase()}
      </div>
      <p className="mt-5 text-[15px] leading-[1.7] text-foreground/85">
        {body}
      </p>
    </div>
  );
}
