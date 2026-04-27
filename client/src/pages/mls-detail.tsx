import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapContainer, TileLayer, Marker, CircleMarker, Tooltip, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Bed,
  Bath,
  Square,
  Calendar,
  Car,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  Calculator,
  Send,
  Maximize2,
  Check,
  Home as HomeIcon,
} from "lucide-react";
import { PublicLayout } from "@/components/public-layout";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, apiUrl } from "@/lib/queryClient";
import {
  formatPrice,
  formatSqft,
  SPENCER_PHONE,
  SPENCER_PHONE_HREF,
  SPENCER_EMAIL,
} from "@/lib/format";
import type { PublicMlsListing, PublicMlsListingDetail } from "@/lib/mls-types";

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&h=1600&fit=crop";

const propertyIcon = L.divIcon({
  className: "rivers-detail-marker",
  html: `<div style="
    width:32px;height:32px;
    background:#000;border:3px solid #fff;border-radius:50%;
    box-shadow:0 4px 12px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const showingSchema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Please share a valid email"),
  phone: z.string().optional(),
  message: z.string().min(5, "A short note helps me prepare"),
});
type ShowingForm = z.infer<typeof showingSchema>;

export default function MlsDetailPage() {
  const [, params] = useRoute<{ id: string }>("/mls/:id");
  const id = params?.id;

  const { data, isLoading } = useQuery<PublicMlsListingDetail>({
    queryKey: ["/api/public/mls", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10">
          <Skeleton className="aspect-[16/9] w-full rounded-sm" />
          <div className="mt-8 grid lg:grid-cols-[1fr_400px] gap-10">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!data) {
    return (
      <PublicLayout>
        <div className="max-w-[1000px] mx-auto px-6 py-32 text-center">
          <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
            LISTING NOT FOUND
          </div>
          <h1 className="mt-4 font-serif text-4xl">
            This property is no longer available
          </h1>
          <p className="mt-4 text-muted-foreground">
            It may have been sold or removed from the MLS.
          </p>
          <Link href="/mls">
            <a className="inline-block mt-8 font-display text-[11px] tracking-[0.22em] underline">
              ← BROWSE ACTIVE LISTINGS
            </a>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return <MlsDetailBody listing={data} />;
}

function MlsDetailBody({ listing }: { listing: PublicMlsListingDetail }) {
  const status = (listing.status ?? "").toLowerCase();
  const isSold = status === "sold";
  const isPending = status === "pending" || status === "conditional";

  const gallery = useMemo(() => {
    // For RETS-sourced listings (those with photoCount), construct photo URLs
    // for every available photo. The proxy route returns 404 if a photo can't
    // be fetched and onError falls back to the placeholder.
    if (listing.photoCount && listing.photoCount > 0 && listing.id) {
      const max = Math.min(listing.photoCount, 30); // cap to avoid huge galleries
      const urls: string[] = [];
      for (let i = 0; i < max; i++) {
        urls.push(apiUrl(`/api/mls/${listing.id}/photo/${i}`));
      }
      return urls;
    }
    const arr = Array.isArray(listing.gallery) ? listing.gallery : [];
    if (listing.heroImage && !arr.includes(listing.heroImage)) {
      return [apiUrl(listing.heroImage), ...arr];
    }
    if (arr.length === 0 && listing.heroImage) return [apiUrl(listing.heroImage)];
    if (arr.length === 0) return [FALLBACK_HERO];
    return arr;
  }, [listing.gallery, listing.heroImage, listing.photoCount, listing.id]);

  const features = Array.isArray(listing.features) ? listing.features : [];
  const similar = Array.isArray(listing.similar) ? listing.similar : [];

  const [photoIdx, setPhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Reset photo index if listing changes
  useEffect(() => {
    setPhotoIdx(0);
  }, [listing.id]);

  return (
    <PublicLayout>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-6">
        <Link href="/mls">
          <a
            className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.22em] text-muted-foreground hover:text-foreground"
            data-testid="link-back-to-search"
          >
            <ChevronLeft className="w-3 h-3" strokeWidth={1.8} />
            BACK TO SEARCH
          </a>
        </Link>
      </div>

      {/* Gallery */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-3">
          {/* Main image */}
          <button
            className="relative col-span-1 lg:col-span-3 aspect-[16/10] overflow-hidden rounded-sm bg-secondary group"
            onClick={() => setLightboxOpen(true)}
            data-testid="button-open-lightbox"
          >
            <img
              src={gallery[0] || FALLBACK_HERO}
              alt={listing.fullAddress}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_HERO;
              }}
            />
            {(isSold || isPending) && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black text-white font-display text-[11px] tracking-[0.22em]">
                {isSold ? "SOLD" : "PENDING"}
              </div>
            )}
            <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur text-white font-display text-[10px] tracking-[0.22em]">
              <Maximize2 className="w-3 h-3" strokeWidth={1.8} />
              {gallery.length} PHOTOS
            </div>
          </button>

          {/* Thumb strip */}
          <div className="hidden lg:grid grid-rows-3 gap-3">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => {
                  setPhotoIdx(i);
                  setLightboxOpen(true);
                }}
                className="relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary group"
                data-testid={`button-gallery-thumb-${i}`}
              >
                <img
                  src={gallery[i] || gallery[0] || FALLBACK_HERO}
                  alt={`${listing.fullAddress} photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_HERO;
                  }}
                />
                {i === 3 && gallery.length > 4 && (
                  <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center text-white font-display text-sm tracking-[0.18em]">
                    + {gallery.length - 4} MORE
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Header / vitals */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          <div>
            <div className="font-display text-[11px] tracking-[0.22em] text-muted-foreground inline-flex items-center gap-2">
              <MapPin className="w-3 h-3" strokeWidth={1.8} />
              {(listing.neighbourhood || listing.city).toUpperCase()} · MLS #{" "}
              {listing.mlsNumber}
            </div>
            <h1
              className="mt-3 font-serif text-[40px] lg:text-[56px] leading-[1.05] text-foreground"
              data-testid="text-listing-address"
            >
              {listing.fullAddress}
            </h1>
            <div
              className="mt-5 font-serif text-[34px] lg:text-[44px] tabular-nums"
              data-testid="text-listing-price"
            >
              {formatPrice(listing.listPrice)}
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 border-t border-b border-border py-6">
              <Stat icon={Bed} label="Beds" value={String(listing.beds)} />
              <Stat icon={Bath} label="Baths" value={String(listing.baths)} />
              <Stat
                icon={Square}
                label="Interior"
                value={listing.sqft ? formatSqft(listing.sqft) : "—"}
              />
              <Stat
                icon={Calendar}
                label="Built"
                value={listing.yearBuilt ? String(listing.yearBuilt) : "—"}
              />
            </div>

            {/* Description */}
            {listing.description && (
              <div className="mt-10">
                <h2 className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                  ABOUT THIS PROPERTY
                </h2>
                <div className="mt-4 prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-[1.75] text-foreground/85 whitespace-pre-line">
                  {listing.description}
                </div>
              </div>
            )}

            {/* Property facts */}
            <div className="mt-12">
              <h2 className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                PROPERTY FACTS
              </h2>
              <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-[14px]">
                <Fact label="Property type" value={listing.propertyType} />
                {listing.propertySubType && (
                  <Fact label="Style" value={listing.propertySubType} />
                )}
                <Fact label="Status" value={listing.status} />
                {listing.bedsAbove != null && (
                  <Fact
                    label="Beds above grade"
                    value={String(listing.bedsAbove)}
                  />
                )}
                {listing.bedsBelow != null && listing.bedsBelow > 0 && (
                  <Fact
                    label="Beds below grade"
                    value={String(listing.bedsBelow)}
                  />
                )}
                {listing.halfBaths != null && listing.halfBaths > 0 && (
                  <Fact
                    label="Half baths"
                    value={String(listing.halfBaths)}
                  />
                )}
                {listing.sqftBelow && (
                  <Fact
                    label="Below-grade sqft"
                    value={formatSqft(listing.sqftBelow)}
                  />
                )}
                {listing.lotSize && (
                  <Fact label="Lot size" value={listing.lotSize} />
                )}
                {listing.parking && (
                  <Fact label="Parking" value={listing.parking} />
                )}
                {listing.garageSpaces != null && (
                  <Fact
                    label="Garage spaces"
                    value={String(listing.garageSpaces)}
                  />
                )}
                {listing.daysOnMarket != null && (
                  <Fact
                    label="Days on market"
                    value={String(listing.daysOnMarket)}
                  />
                )}
                {listing.postalCode && (
                  <Fact label="Postal code" value={listing.postalCode} />
                )}
              </dl>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                  FEATURES
                </h2>
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8 text-[14px]">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className="inline-flex items-start gap-2.5 text-foreground/85"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0 text-foreground/60"
                        strokeWidth={1.8}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mortgage calculator */}
            <MortgageCalculator price={listing.listPrice} />

            {/* Map + POIs (schools, restaurants, parks, transit) */}
            {listing.lat != null && listing.lng != null && (
              <NeighbourhoodPois
                listingId={listing.id}
                lat={listing.lat}
                lng={listing.lng}
              />
            )}

            {/* Listing source */}
            <div className="mt-12 pt-6 border-t border-border text-[11px] text-muted-foreground font-display tracking-[0.18em]">
              {listing.listOffice ? (
                <>LISTED BY {listing.listOffice.toUpperCase()}</>
              ) : (
                <>LISTED VIA PILLAR 9 MLS</>
              )}
              {listing.source === "rets" && (
                <span className="ml-3">· LIVE FROM PILLAR 9</span>
              )}
            </div>
          </div>

          {/* Right column: contact / showing */}
          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            <ContactCard listing={listing} />
            <ShowingForm listing={listing} />
          </aside>
        </div>
      </section>

      {/* Similar listings */}
      {similar.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24 mb-20">
          <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
            SIMILAR PROPERTIES
          </div>
          <h2 className="mt-3 font-serif text-3xl lg:text-4xl">
            Other homes worth seeing
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similar.map((s) => (
              <ListingCard key={s.id} listing={s} variant="compact" />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={gallery}
          startIdx={photoIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </PublicLayout>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div data-testid={`stat-${label.toLowerCase()}`}>
      <div className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="w-4 h-4" strokeWidth={1.5} />
        <span className="font-display text-[10px] tracking-[0.22em]">
          {label.toUpperCase()}
        </span>
      </div>
      <div className="mt-1.5 font-serif text-2xl tabular-nums">{value}</div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 pb-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ContactCard({ listing }: { listing: PublicMlsListing }) {
  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground">
        SHOWN BY
      </div>
      <div className="mt-2 font-serif text-2xl">Spencer Rivers</div>
      <div className="text-[12px] text-muted-foreground mt-1">
        REALTOR® · Rivers Real Estate
      </div>
      <div className="mt-5 space-y-2.5">
        <a
          href={SPENCER_PHONE_HREF}
          className="flex items-center gap-3 px-3 py-3 border border-border rounded-sm hover:bg-secondary/50 transition-colors text-[14px]"
          data-testid="link-detail-call"
        >
          <Phone className="w-4 h-4" strokeWidth={1.6} />
          {SPENCER_PHONE}
        </a>
        <a
          href={`mailto:${SPENCER_EMAIL}?subject=${encodeURIComponent(
            `MLS ${listing.mlsNumber} · ${listing.fullAddress}`,
          )}`}
          className="flex items-center gap-3 px-3 py-3 border border-border rounded-sm hover:bg-secondary/50 transition-colors text-[14px]"
          data-testid="link-detail-email"
        >
          <Mail className="w-4 h-4" strokeWidth={1.6} />
          {SPENCER_EMAIL}
        </a>
      </div>
    </div>
  );
}

function ShowingForm({ listing }: { listing: PublicMlsListing }) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ShowingForm>({
    resolver: zodResolver(showingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: `I'd like to see ${listing.fullAddress} (MLS ${listing.mlsNumber}). When could we set up a private showing?`,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ShowingForm) => {
      const r = await apiRequest("POST", "/api/inquiry", {
        ...data,
        source: "Listing detail · showing request",
      });
      return r.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Showing request sent",
        description: "Spencer will reach out within the day.",
      });
      form.reset();
    },
    onError: (err: any) => {
      toast({
        title: "Couldn't send",
        description: err?.message ?? "Please try again or call directly.",
        variant: "destructive",
      });
    },
  });

  if (submitted) {
    return (
      <div className="border border-border rounded-sm p-6 bg-card">
        <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
          <Check className="w-5 h-5" strokeWidth={2} />
        </div>
        <div className="mt-4 font-serif text-2xl">Request received</div>
        <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
          Thanks for reaching out about {listing.fullAddress}. Spencer will be
          in touch within the day to confirm a time.
        </p>
        <a
          href={SPENCER_PHONE_HREF}
          className="mt-5 inline-flex items-center gap-2 font-display text-[10px] tracking-[0.22em] underline"
        >
          <Phone className="w-3 h-3" strokeWidth={1.8} />
          OR CALL DIRECTLY
        </a>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground">
        REQUEST A SHOWING
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
          className="mt-4 space-y-3"
          data-testid="form-showing-request"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    data-testid="input-showing-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    data-testid="input-showing-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone (optional)"
                    {...field}
                    data-testid="input-showing-phone"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="What works for you?"
                    {...field}
                    data-testid="textarea-showing-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-11 rounded-sm gap-2"
            disabled={mutation.isPending}
            data-testid="button-submit-showing"
          >
            <Send className="w-4 h-4" strokeWidth={1.8} />
            {mutation.isPending ? "Sending…" : "Request showing"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function MortgageCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(5.25);
  const [years, setYears] = useState(25);

  const downPayment = (price * downPct) / 100;
  const principal = price - downPayment;
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly =
    r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));

  const totalInterest = monthly * n - principal;
  const totalPaid = monthly * n + downPayment;

  return (
    <div className="mt-12">
      <div className="inline-flex items-center gap-2 font-display text-xs tracking-[0.22em] text-muted-foreground">
        <Calculator className="w-3.5 h-3.5" strokeWidth={1.6} />
        MORTGAGE ESTIMATE
      </div>
      <div className="mt-5 border border-border rounded-sm p-6 lg:p-8 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-7">
          <SliderRow
            label="Down payment"
            value={`${downPct}% · ${formatPrice(downPayment)}`}
            slider={
              <Slider
                value={[downPct]}
                min={5}
                max={50}
                step={1}
                onValueChange={(v) => setDownPct(v[0])}
                data-testid="slider-down-payment"
              />
            }
          />
          <SliderRow
            label="Interest rate"
            value={`${rate.toFixed(2)} %`}
            slider={
              <Slider
                value={[rate]}
                min={1}
                max={10}
                step={0.05}
                onValueChange={(v) => setRate(v[0])}
                data-testid="slider-interest-rate"
              />
            }
          />
          <SliderRow
            label="Amortization"
            value={`${years} years`}
            slider={
              <Slider
                value={[years]}
                min={5}
                max={30}
                step={1}
                onValueChange={(v) => setYears(v[0])}
                data-testid="slider-years"
              />
            }
          />
        </div>

        <div className="bg-foreground text-background p-6 rounded-sm flex flex-col justify-center">
          <div className="font-display text-[10px] tracking-[0.22em] text-background/65">
            ESTIMATED MONTHLY
          </div>
          <div
            className="mt-2 font-serif text-4xl tabular-nums"
            data-testid="text-monthly-payment"
          >
            ${Math.round(monthly).toLocaleString("en-CA")}
          </div>
          <div className="mt-5 pt-5 border-t border-background/20 space-y-2 text-[12px] text-background/75">
            <div className="flex justify-between">
              <span>Principal</span>
              <span className="tabular-nums">{formatPrice(principal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total interest</span>
              <span className="tabular-nums">
                ${Math.round(totalInterest).toLocaleString("en-CA")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total paid</span>
              <span className="tabular-nums">
                ${Math.round(totalPaid).toLocaleString("en-CA")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground max-w-2xl leading-relaxed">
        Estimate only. Property tax, insurance, condo fees, and HELOC products
        not included. Connect with your lender for a real pre-approval.
      </p>
    </div>
  );
}

function SliderRow({
  label,
  value,
  slider,
}: {
  label: string;
  value: string;
  slider: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground">
          {label.toUpperCase()}
        </div>
        <div className="font-serif text-base tabular-nums">{value}</div>
      </div>
      <div className="mt-3">{slider}</div>
    </div>
  );
}

function Lightbox({
  images,
  startIdx,
  onClose,
}: {
  images: string[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center"
      data-testid="gallery-lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/85 hover:text-white p-2"
        aria-label="Close"
        data-testid="button-close-lightbox"
      >
        <X className="w-6 h-6" strokeWidth={1.6} />
      </button>
      <button
        onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
        className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10"
        aria-label="Previous"
        data-testid="button-lightbox-prev"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % images.length)}
        className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10"
        aria-label="Next"
        data-testid="button-lightbox-next"
      >
        <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
      </button>
      <img
        src={images[idx]}
        alt={`Photo ${idx + 1}`}
        className="max-w-[95vw] max-h-[88vh] object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_HERO;
        }}
      />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-[11px] tracking-[0.22em] text-white/70 tabular-nums">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}

// ---------------- Neighbourhood POIs (schools, restaurants, parks, transit)
type Poi = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number;
  kind: string;
  cuisine?: string | null;
  shop?: string;
  tags?: any;
};
type PoisPayload = {
  center: { lat: number; lng: number };
  radius: number;
  schools: Poi[];
  restaurants: Poi[];
  parks: Poi[];
  transit: Poi[];
  cached?: boolean;
  error?: string;
};

const POI_CATEGORIES = [
  { id: "all", label: "All", color: "#23412d" },
  { id: "schools", label: "Schools", color: "#2563eb" },
  { id: "restaurants", label: "Restaurants & cafes", color: "#dc2626" },
  { id: "parks", label: "Parks & recreation", color: "#16a34a" },
  { id: "transit", label: "Transit & shopping", color: "#a16207" },
] as const;

type CatId = (typeof POI_CATEGORIES)[number]["id"];

function colorFor(cat: CatId): string {
  return POI_CATEGORIES.find((c) => c.id === cat)?.color ?? "#23412d";
}

function NeighbourhoodPois({
  listingId,
  lat,
  lng,
}: {
  listingId: string;
  lat: number;
  lng: number;
}) {
  const [active, setActive] = useState<CatId>("all");
  const { data, isLoading } = useQuery<PoisPayload>({
    queryKey: ["/api/mls", listingId, "pois"],
    queryFn: async () => {
      const r = await fetch(apiUrl(`/api/mls/${listingId}/pois`));
      if (!r.ok) throw new Error("Failed to load POIs");
      return r.json();
    },
    staleTime: 1000 * 60 * 60, // 1h client cache
  });

  const visible = useMemo(() => {
    if (!data) return { schools: [], restaurants: [], parks: [], transit: [] };
    if (active === "all") return data;
    return {
      schools: active === "schools" ? data.schools : [],
      restaurants: active === "restaurants" ? data.restaurants : [],
      parks: active === "parks" ? data.parks : [],
      transit: active === "transit" ? data.transit : [],
    };
  }, [data, active]);

  const counts = data
    ? {
        schools: data.schools.length,
        restaurants: data.restaurants.length,
        parks: data.parks.length,
        transit: data.transit.length,
      }
    : { schools: 0, restaurants: 0, parks: 0, transit: 0 };

  const list: { poi: Poi; cat: CatId }[] = [];
  for (const p of visible.schools) list.push({ poi: p, cat: "schools" });
  for (const p of visible.restaurants) list.push({ poi: p, cat: "restaurants" });
  for (const p of visible.parks) list.push({ poi: p, cat: "parks" });
  for (const p of visible.transit) list.push({ poi: p, cat: "transit" });
  list.sort((a, b) => a.poi.distance - b.poi.distance);

  return (
    <div className="mt-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-xs tracking-[0.22em] text-muted-foreground">
            LOCATION & NEIGHBOURHOOD
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            What's within a 1 km walk of this property.
          </p>
        </div>
        {isLoading && (
          <span className="text-[11px] font-display tracking-[0.18em] text-muted-foreground">
            LOADING NEARBY PLACES…
          </span>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {POI_CATEGORIES.map((c) => {
          const isActive = active === c.id;
          const count =
            c.id === "all"
              ? counts.schools + counts.restaurants + counts.parks + counts.transit
              : counts[c.id as keyof typeof counts];
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-display tracking-[0.18em] transition-colors ${
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground/75 border-border hover:border-foreground/40"
              }`}
              data-testid={`poi-chip-${c.id}`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              {c.label.toUpperCase()}
              <span className="opacity-60 tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Map */}
        <div className="lg:col-span-3 rounded-sm overflow-hidden border border-border aspect-[4/3] lg:aspect-auto lg:h-[460px] bg-secondary">
          <MapContainer
            center={[lat, lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap, &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Circle
              center={[lat, lng]}
              radius={1000}
              pathOptions={{
                color: "#23412d",
                fillColor: "#23412d",
                fillOpacity: 0.05,
                weight: 1,
                dashArray: "4 4",
              }}
            />
            <Marker position={[lat, lng]} icon={propertyIcon} />
            {(
              [
                ["schools", visible.schools],
                ["restaurants", visible.restaurants],
                ["parks", visible.parks],
                ["transit", visible.transit],
              ] as [CatId, Poi[]][]
            ).flatMap(([cat, arr]) =>
              arr.map((p) => (
                <CircleMarker
                  key={`${cat}-${p.id}`}
                  center={[p.lat, p.lng]}
                  radius={6}
                  pathOptions={{
                    color: "#fff",
                    weight: 2,
                    fillColor: colorFor(cat),
                    fillOpacity: 1,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                    <div className="text-[11px]">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-muted-foreground tabular-nums">
                        {p.distance < 1000
                          ? `${p.distance} m`
                          : `${(p.distance / 1000).toFixed(1)} km`}
                        {" · "}
                        {p.kind}
                      </div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              )),
            )}
          </MapContainer>
        </div>

        {/* List of nearby POIs sorted by distance */}
        <div className="lg:col-span-2 rounded-sm border border-border bg-card max-h-[460px] overflow-auto">
          {list.length === 0 && !isLoading && (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No places found in this category nearby.
            </div>
          )}
          <ul className="divide-y divide-border">
            {list.slice(0, 60).map((row) => (
              <li
                key={`${row.cat}-${row.poi.id}`}
                className="px-4 py-3 flex items-start gap-3 hover:bg-secondary/40 transition-colors"
                data-testid={`poi-row-${row.poi.id}`}
              >
                <span
                  className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: colorFor(row.cat) }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium leading-tight truncate">
                    {row.poi.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground tabular-nums">
                    {row.poi.distance < 1000
                      ? `${row.poi.distance} m`
                      : `${(row.poi.distance / 1000).toFixed(1)} km`}
                    {" · "}
                    <span className="capitalize">
                      {row.poi.kind.replace(/_/g, " ")}
                    </span>
                    {row.poi.cuisine && (
                      <span className="capitalize">
                        {" · "}
                        {row.poi.cuisine}
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${row.poi.lat},${row.poi.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.18em] font-display text-muted-foreground hover:text-foreground"
                >
                  DIRECTIONS
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
