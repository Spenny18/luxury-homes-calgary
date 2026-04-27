import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Map as MapIcon,
  List as ListIcon,
} from "lucide-react";
import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { apiRequest } from "@/lib/queryClient";
import { formatPriceCompact, formatSqft } from "@/lib/format";
import type {
  MlsSearchResult,
  PublicMlsListing,
  PublicNeighbourhood,
} from "@/lib/mls-types";
import { Link } from "wouter";

const PAGE_SIZE = 50;

const PROPERTY_TYPES = [
  { value: "any", label: "All types" },
  { value: "Detached", label: "Detached" },
  { value: "Semi-Detached", label: "Semi-Detached" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Apartment", label: "Apartment / Condo" },
  { value: "Estate", label: "Estate" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Sold", label: "Sold" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
  { value: "sqft-desc", label: "Largest first" },
];

interface Filters {
  q: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  propertyType: string;
  neighbourhood: string;
  minSqft: string;
  status: string;
  sort: string;
}

const DEFAULT_FILTERS: Filters = {
  q: "",
  minPrice: "",
  maxPrice: "",
  beds: "any",
  baths: "any",
  propertyType: "any",
  neighbourhood: "any",
  minSqft: "",
  status: "Active",
  sort: "newest",
};

function parseQuery(qs: string): Partial<Filters> {
  const params = new URLSearchParams(qs.startsWith("?") ? qs.slice(1) : qs);
  const out: Partial<Filters> = {};
  const map: (keyof Filters)[] = [
    "q", "minPrice", "maxPrice", "beds", "baths",
    "propertyType", "neighbourhood", "minSqft", "status", "sort",
  ];
  for (const k of map) {
    const v = params.get(k);
    if (v) (out as any)[k] = v;
  }
  return out;
}

// Format price as a compact pill: $1.3M, $750K, $4.2M
function priceShort(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (price >= 1000) return `$${Math.round(price / 1000)}K`;
  return `$${price}`;
}

// Build a price pill divIcon for a single listing marker
function buildPriceIcon(price: number, selected = false) {
  const label = priceShort(price);
  const bg = selected ? "#23412d" : "#ffffff";
  const fg = selected ? "#ffffff" : "#0a0a0a";
  return L.divIcon({
    className: "rivers-price-pill",
    html: `<div style="
      display:inline-flex;align-items:center;justify-content:center;
      padding:5px 11px;border-radius:9999px;
      background:${bg};color:${fg};
      font-family:Manrope,system-ui,sans-serif;font-weight:700;font-size:13px;
      letter-spacing:-0.01em;line-height:1;
      box-shadow:0 2px 8px rgba(0,0,0,0.18),0 0 0 1px rgba(0,0,0,0.06);
      white-space:nowrap;border:${selected ? "1.5px solid #fff" : "1px solid rgba(0,0,0,0.04)"};
      transform:translateY(-2px);
    ">${label}</div>`,
    iconSize: [60, 26],
    iconAnchor: [30, 13],
  });
}

// Build a cluster pill divIcon (house icon + count)
function buildClusterIcon(count: number) {
  return L.divIcon({
    className: "rivers-cluster-pill",
    html: `<div style="
      display:inline-flex;align-items:center;gap:5px;
      padding:6px 11px 6px 9px;border-radius:9999px;
      background:#ffffff;color:#0a0a0a;
      font-family:Manrope,system-ui,sans-serif;font-weight:700;font-size:13px;
      line-height:1;
      box-shadow:0 2px 10px rgba(0,0,0,0.20),0 0 0 1px rgba(0,0,0,0.06);
      white-space:nowrap;
    ">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block">
        <path d="M3 12 L12 4 L21 12"></path>
        <path d="M5 10 L5 20 L19 20 L19 10"></path>
      </svg>
      ${count.toLocaleString()}
    </div>`,
    iconSize: [70, 28],
    iconAnchor: [35, 14],
  });
}

// Cluster listings into a sparse grid by zoom level so we don't render thousands of markers.
function clusterListings(
  listings: PublicMlsListing[],
  zoom: number,
): Array<
  | { kind: "single"; listing: PublicMlsListing; lat: number; lng: number }
  | { kind: "cluster"; count: number; lat: number; lng: number; listings: PublicMlsListing[] }
> {
  // At higher zooms we let everything render as singles; at lower zooms group nearby points.
  const withCoords = listings.filter(
    (l) => typeof l.lat === "number" && typeof l.lng === "number",
  );
  if (zoom >= 14) {
    return withCoords.map((l) => ({
      kind: "single" as const,
      listing: l,
      lat: l.lat as number,
      lng: l.lng as number,
    }));
  }
  // Grid size tuned for Calgary at typical zooms
  const grid = zoom >= 12 ? 0.0035 : zoom >= 11 ? 0.008 : zoom >= 10 ? 0.018 : zoom >= 9 ? 0.04 : 0.09;
  const buckets = new Map<string, PublicMlsListing[]>();
  for (const l of withCoords) {
    const gx = Math.round((l.lng as number) / grid);
    const gy = Math.round((l.lat as number) / grid);
    const k = `${gx}:${gy}`;
    let arr = buckets.get(k);
    if (!arr) {
      arr = [];
      buckets.set(k, arr);
    }
    arr.push(l);
  }
  const out: any[] = [];
  buckets.forEach((arr) => {
    if (arr.length === 1) {
      const l = arr[0];
      out.push({ kind: "single", listing: l, lat: l.lat, lng: l.lng });
    } else {
      let lat = 0, lng = 0;
      for (const l of arr) {
        lat += l.lat as number;
        lng += l.lng as number;
      }
      out.push({
        kind: "cluster" as const,
        count: arr.length,
        lat: lat / arr.length,
        lng: lng / arr.length,
        listings: arr,
      });
    }
  });
  return out;
}

// Component that tracks zoom level so we can re-cluster
function ZoomTracker({ onZoom }: { onZoom: (z: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const handler = () => onZoom(map.getZoom());
    map.on("zoomend", handler);
    onZoom(map.getZoom());
    return () => {
      map.off("zoomend", handler);
    };
  }, [map, onZoom]);
  return null;
}

function FitBoundsOnce({ points }: { points: Array<[number, number]> }) {
  const map = useMap();
  const fittedRef = useRef(false);
  useEffect(() => {
    if (fittedRef.current) return;
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 13);
      fittedRef.current = true;
      return;
    }
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    fittedRef.current = true;
  }, [map, points]);
  return null;
}

export default function MlsSearchPage() {
  const [location, setLocation] = useLocation();
  const initialFilters = useMemo<Filters>(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const qIdx = hash.indexOf("?");
    const qs = qIdx >= 0 ? hash.slice(qIdx + 1) : "";
    return { ...DEFAULT_FILTERS, ...parseQuery(qs) };
  }, []);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [page, setPage] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [popupListing, setPopupListing] = useState<PublicMlsListing | null>(null);
  const [zoom, setZoom] = useState(11);
  // mobile view toggle ("map" or "list")
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  useEffect(() => {
    setPage(0);
  }, [
    filters.q, filters.minPrice, filters.maxPrice, filters.beds,
    filters.baths, filters.propertyType, filters.neighbourhood,
    filters.minSqft, filters.status, filters.sort,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (!v) return;
      if (v === "any") return;
      if (k === "status" && v === "Active") return;
      if (k === "sort" && v === "newest") return;
      params.set(k, v);
    });
    const qs = params.toString();
    const target = qs ? `/mls?${qs}` : `/mls`;
    if (location !== target) setLocation(target);
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (filters.q) p.set("q", filters.q);
    if (filters.minPrice) p.set("minPrice", filters.minPrice);
    if (filters.maxPrice) p.set("maxPrice", filters.maxPrice);
    if (filters.beds && filters.beds !== "any") p.set("beds", filters.beds);
    if (filters.baths && filters.baths !== "any") p.set("baths", filters.baths);
    if (filters.propertyType && filters.propertyType !== "any")
      p.set("propertyType", filters.propertyType);
    if (filters.neighbourhood && filters.neighbourhood !== "any")
      p.set("neighbourhood", filters.neighbourhood);
    if (filters.minSqft) p.set("minSqft", filters.minSqft);
    if (filters.status) p.set("status", filters.status);
    if (filters.sort) p.set("sort", filters.sort);
    p.set("limit", String(PAGE_SIZE));
    p.set("offset", String(page * PAGE_SIZE));
    return p.toString();
  }, [filters, page]);

  const { data, isLoading } = useQuery<MlsSearchResult>({
    queryKey: ["/api/public/mls/search", queryString],
    queryFn: async () => {
      const r = await apiRequest("GET", `/api/public/mls/search?${queryString}`);
      return r.json();
    },
  });

  const { data: neighbourhoods } = useQuery<PublicNeighbourhood[]>({
    queryKey: ["/api/public/neighbourhoods"],
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const updateFilter = <K extends keyof Filters>(k: K, v: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [k]: v }));
  };
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.q) n++;
    if (filters.minPrice) n++;
    if (filters.maxPrice) n++;
    if (filters.beds !== "any") n++;
    if (filters.baths !== "any") n++;
    if (filters.propertyType !== "any") n++;
    if (filters.neighbourhood !== "any") n++;
    if (filters.minSqft) n++;
    if (filters.status !== "Active") n++;
    return n;
  }, [filters]);

  const mapItems = items.filter((l) => l.lat != null && l.lng != null);
  const mapPoints: Array<[number, number]> = mapItems.map((l) => [
    l.lat as number,
    l.lng as number,
  ]);
  const calgaryCenter: [number, number] = [51.0447, -114.0719];

  const clusters = useMemo(() => clusterListings(mapItems, zoom), [mapItems, zoom]);

  // Helper for closing popup
  const closePopup = () => setPopupListing(null);

  return (
    <PublicLayout fullBleed>
      {/* Two-column layout: map left, list right (Scarlet style) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,580px)] xl:grid-cols-[1fr_minmax(0,640px)]"
        style={{ height: "calc(100dvh - 80px)" }}
      >
        {/* MAP — left */}
        <div
          className={`relative ${mobileView === "list" ? "hidden lg:block" : "block"} bg-secondary p-4`}
        >
          <div className="absolute inset-4 rounded-xl overflow-hidden border border-border">
            <MapContainer
              center={calgaryCenter}
              zoom={11}
              scrollWheelZoom
              style={{ height: "100%", width: "100%", background: "#f5f5f5" }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                subdomains={["a", "b", "c", "d"]}
              />
              <ZoomTracker onZoom={setZoom} />
              <FitBoundsOnce points={mapPoints} />

              {clusters.map((c, idx) => {
                if (c.kind === "single") {
                  const isSelected = selectedId === c.listing.id;
                  return (
                    <Marker
                      key={`s-${c.listing.id}`}
                      position={[c.lat, c.lng]}
                      icon={buildPriceIcon(c.listing.listPrice, isSelected)}
                      zIndexOffset={isSelected ? 1000 : 0}
                      eventHandlers={{
                        click: () => {
                          setSelectedId(c.listing.id);
                          setPopupListing(c.listing);
                        },
                      }}
                    />
                  );
                }
                return (
                  <Marker
                    key={`c-${idx}-${c.lat.toFixed(4)}-${c.lng.toFixed(4)}`}
                    position={[c.lat, c.lng]}
                    icon={buildClusterIcon(c.count)}
                    eventHandlers={{
                      click: (e) => {
                        // Zoom in toward the cluster
                        const map = e.target._map as L.Map;
                        if (map) map.setView([c.lat, c.lng], Math.min(map.getZoom() + 2, 16));
                      },
                    }}
                  />
                );
              })}
            </MapContainer>

            {/* Popup card overlay */}
            {popupListing && (
              <div
                className="absolute inset-0 pointer-events-none flex items-end lg:items-center lg:justify-center p-6 z-[450]"
              >
                <div
                  className="pointer-events-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-[420px] relative animate-in fade-in slide-in-from-bottom-4 duration-300"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.22)",
                  }}
                  data-testid="map-popup-card"
                >
                  {/* Photo */}
                  <Link href={`/mls/${popupListing.id}`}>
                    <a
                      className="w-[140px] h-[140px] shrink-0 bg-secondary block"
                      style={{ textDecoration: "none" }}
                    >
                      {popupListing.heroImage ? (
                        <img
                          src={popupListing.heroImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <MapPin className="w-6 h-6" />
                        </div>
                      )}
                    </a>
                  </Link>
                  {/* Details */}
                  <Link href={`/mls/${popupListing.id}`}>
                    <a
                      className="flex-1 p-3.5 pr-9 block min-w-0"
                      style={{ textDecoration: "none", color: "#0a0a0a" }}
                    >
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 19,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                        }}
                      >
                        {priceShort(popupListing.listPrice)}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "#0a0a0a",
                          marginTop: 6,
                          fontWeight: 500,
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {popupListing.fullAddress}
                      </div>
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "#666",
                          marginTop: 6,
                          fontWeight: 500,
                        }}
                      >
                        {popupListing.beds} bd · {popupListing.baths} ba
                        {popupListing.sqft ? ` · ${popupListing.sqft.toLocaleString()} sqft` : ""}
                      </div>
                      {popupListing.listOffice && (
                        <div
                          style={{
                            fontSize: 10.5,
                            color: "#999",
                            marginTop: 8,
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Listed by {popupListing.listOffice}
                        </div>
                      )}
                    </a>
                  </Link>
                  {/* Close */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      closePopup();
                    }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 transition"
                    aria-label="Close"
                    data-testid="button-close-popup"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile view toggle */}
            <button
              onClick={() => setMobileView("list")}
              className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[500] px-5 h-11 rounded-full bg-black text-white text-[13px] font-medium shadow-lg flex items-center gap-2"
              data-testid="button-show-list"
            >
              <ListIcon className="w-4 h-4" />
              View list
            </button>
          </div>
        </div>

        {/* LIST — right */}
        <aside
          className={`${mobileView === "map" ? "hidden lg:flex" : "flex"} flex-col bg-background border-l border-border overflow-hidden`}
        >
          {/* Search bar */}
          <div className="p-4 border-b border-border bg-background">
            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                strokeWidth={1.6}
              />
              <Input
                placeholder="Search by city, neighbourhood, address or MLS #"
                value={filters.q}
                onChange={(e) => updateFilter("q", e.target.value)}
                className="pl-10 h-11 rounded-md text-[14px]"
                style={{ fontFamily: "Manrope, sans-serif" }}
                data-testid="input-mls-search"
              />
            </div>

            {/* Filter pills row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Select
                value={filters.propertyType}
                onValueChange={(v) => updateFilter("propertyType", v)}
              >
                <SelectTrigger
                  className="h-9 w-auto rounded-full border-border text-[13px] px-3.5 hover:bg-secondary/50 transition"
                  data-testid="select-property-type"
                >
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.beds}
                onValueChange={(v) => updateFilter("beds", v)}
              >
                <SelectTrigger
                  className="h-9 w-auto rounded-full border-border text-[13px] px-3.5 hover:bg-secondary/50 transition"
                  data-testid="select-beds"
                >
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any beds</SelectItem>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}+ beds</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.baths}
                onValueChange={(v) => updateFilter("baths", v)}
              >
                <SelectTrigger
                  className="h-9 w-auto rounded-full border-border text-[13px] px-3.5 hover:bg-secondary/50 transition"
                  data-testid="select-baths"
                >
                  <SelectValue placeholder="Baths" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any baths</SelectItem>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}+ baths</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <button
                    className="h-9 px-3.5 rounded-full border border-border text-[13px] hover:bg-secondary/50 transition flex items-center gap-1.5"
                    data-testid="button-more-filters"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.6} />
                    More
                    {activeFilterCount > 0 && (
                      <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-foreground text-background text-[10px] tabular-nums">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[420px] overflow-y-auto">
                  <div className="font-display text-xs tracking-[0.22em] mb-6">REFINE SEARCH</div>
                  <div className="space-y-5">
                    <FilterRow label="Min price">
                      <Input
                        inputMode="numeric"
                        value={filters.minPrice}
                        onChange={(e) =>
                          updateFilter("minPrice", e.target.value.replace(/[^\d]/g, ""))
                        }
                        className="h-11 tabular-nums"
                        placeholder="$"
                      />
                    </FilterRow>
                    <FilterRow label="Max price">
                      <Input
                        inputMode="numeric"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          updateFilter("maxPrice", e.target.value.replace(/[^\d]/g, ""))
                        }
                        className="h-11 tabular-nums"
                        placeholder="$"
                      />
                    </FilterRow>
                    <FilterRow label="Neighbourhood">
                      <Select
                        value={filters.neighbourhood}
                        onValueChange={(v) => updateFilter("neighbourhood", v)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any neighbourhood</SelectItem>
                          {(neighbourhoods ?? []).map((n) => (
                            <SelectItem key={n.slug} value={n.name}>
                              {n.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FilterRow>
                    <FilterRow label="Minimum sqft">
                      <Input
                        inputMode="numeric"
                        value={filters.minSqft}
                        onChange={(e) =>
                          updateFilter("minSqft", e.target.value.replace(/[^\d]/g, ""))
                        }
                        className="h-11 tabular-nums"
                        placeholder="e.g. 2500"
                      />
                    </FilterRow>
                    <FilterRow label="Status">
                      <Select
                        value={filters.status}
                        onValueChange={(v) => updateFilter("status", v)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FilterRow>
                    <div className="pt-4 flex items-center gap-3">
                      <Button onClick={resetFilters} variant="outline" className="flex-1">
                        Reset
                      </Button>
                      <Button onClick={() => setFiltersOpen(false)} className="flex-1">
                        Apply
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="ml-auto">
                <Select
                  value={filters.sort}
                  onValueChange={(v) => updateFilter("sort", v)}
                >
                  <SelectTrigger
                    className="h-9 w-auto rounded-full border-border text-[13px] px-3.5"
                    data-testid="select-sort"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results header */}
          <div className="px-5 pt-5 pb-3 flex items-center justify-between flex-wrap gap-2 border-b border-border/50">
            <div>
              <h1 className="font-serif text-xl text-foreground" style={{ letterSpacing: "-0.01em" }}>
                Properties
              </h1>
              <div className="text-[13px] text-muted-foreground mt-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>
                {isLoading ? "Searching…" : (
                  <>
                    Showing {Math.min(items.length, total).toLocaleString()} of{" "}
                    <span data-testid="text-result-count">{total.toLocaleString()}</span> properties
                  </>
                )}
              </div>
            </div>
          </div>

          {/* List body */}
          <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
            {isLoading ? (
              <div className="p-5 space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="w-[140px] h-[120px] shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-7 w-32" />
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-40" />
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div>
                <div className="divide-y divide-border/60">
                  {items.map((listing) => (
                    <ResultCard
                      key={listing.id}
                      listing={listing}
                      selected={selectedId === listing.id}
                      onHover={() => setSelectedId(listing.id)}
                    />
                  ))}
                </div>

                {pages > 1 && (
                  <div className="px-5 py-6 flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="h-9 rounded-md gap-1.5"
                      data-testid="button-prev-page"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </Button>
                    <div className="text-[12px] text-muted-foreground tabular-nums px-2">
                      {page + 1} / {pages}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
                      disabled={page >= pages - 1}
                      className="h-9 rounded-md gap-1.5"
                      data-testid="button-next-page"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile show-map button */}
          <button
            onClick={() => setMobileView("map")}
            className="lg:hidden h-12 w-full bg-black text-white text-[13px] font-medium flex items-center justify-center gap-2"
            data-testid="button-show-map"
          >
            <MapIcon className="w-4 h-4" />
            View map
          </button>
        </aside>
      </div>
    </PublicLayout>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground mb-2">
        {label.toUpperCase()}
      </div>
      {children}
    </div>
  );
}

// Horizontal listing card (Scarlet style: photo left, details right)
function ResultCard({
  listing,
  selected,
  onHover,
}: {
  listing: PublicMlsListing;
  selected?: boolean;
  onHover?: () => void;
}) {
  return (
    <Link href={`/mls/${listing.id}`}>
      <a
        onMouseEnter={onHover}
        className={`flex gap-4 px-5 py-4 hover:bg-secondary/40 transition cursor-pointer ${selected ? "bg-secondary/60" : ""}`}
        data-testid={`result-card-${listing.id}`}
      >
        <div className="w-[150px] h-[110px] shrink-0 rounded-lg overflow-hidden bg-secondary relative">
          {listing.heroImage ? (
            <img
              src={listing.heroImage}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
              <MapPin className="w-7 h-7" />
            </div>
          )}
          {/* Status badge top-right */}
          {listing.status === "Active" && (
            <span
              className="absolute top-2 right-2 px-2 py-0.5 rounded-sm text-white text-[9.5px] tracking-[0.1em] font-semibold uppercase"
              style={{ background: "rgba(34,197,94,0.95)" }}
            >
              Active
            </span>
          )}
          {listing.propertyType && (
            <span
              className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm text-white text-[9.5px] tracking-[0.08em] font-semibold uppercase"
              style={{ background: "rgba(0,0,0,0.78)" }}
            >
              {listing.propertyType}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0" style={{ fontFamily: "Manrope, sans-serif" }}>
          <div
            className="text-[20px] tabular-nums text-foreground"
            style={{ fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            ${listing.listPrice.toLocaleString()}
          </div>
          <div className="text-[13.5px] text-foreground mt-1.5 flex items-start gap-1.5 leading-snug">
            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground" strokeWidth={1.7} />
            <span className="line-clamp-2">{listing.fullAddress}</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[12.5px] text-muted-foreground">
            <span>
              <span className="text-foreground font-semibold tabular-nums">{listing.beds}</span> bd
            </span>
            <span>
              <span className="text-foreground font-semibold tabular-nums">{listing.baths}</span> ba
            </span>
            {listing.sqft ? (
              <span>
                <span className="text-foreground font-semibold tabular-nums">
                  {formatSqft(listing.sqft)}
                </span>{" "}
                sqft
              </span>
            ) : (
              <span>—</span>
            )}
          </div>
          {listing.listOffice && (
            <div className="text-[10.5px] text-muted-foreground/80 mt-2 truncate">
              Listed by {listing.listOffice}
            </div>
          )}
        </div>
      </a>
    </Link>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="px-6 py-16 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
        <MapPin className="w-6 h-6 text-muted-foreground" strokeWidth={1.4} />
      </div>
      <div className="font-display text-xs tracking-[0.22em] mt-5">NO MATCHES</div>
      <h2 className="mt-3 font-serif text-xl">Nothing here matches those filters</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Try widening the price range or clearing the neighbourhood — small changes
        often surface a property worth a closer look.
      </p>
      <Button onClick={onReset} variant="outline" className="mt-6 h-10 rounded-md">
        Reset filters
      </Button>
    </div>
  );
}
