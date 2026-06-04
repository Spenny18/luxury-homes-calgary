// Leaflet rendering for the neighbourhood detail page. Lazy-loaded so the
// react-leaflet / leaflet bundle stays out of the SSR pass (both touch
// `window` at module load).
//
// Styling matches the mls-detail page: CARTO light tiles, black property
// marker for the neighbourhood center, and a popup on each listing showing
// the hero photo, price, address, and beds/baths with a deep link.
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatPriceCompact } from "@/lib/format";
import { apiUrl } from "@/lib/queryClient";

interface MapListing {
  id: string;
  mlsNumber?: string;
  fullAddress: string;
  listPrice: number;
  beds: number;
  baths: number;
  sqft: number | null;
  photoCount?: number;
  heroImage: string | null;
  lat: number | null;
  lng: number | null;
}

interface Props {
  name: string;
  centerLat: number;
  centerLng: number;
  listings: MapListing[];
}

// Same icon shape as the mls-detail map's property pin: black-on-white dot
// with a soft shadow. Module-level is fine — this file is only ever
// evaluated client-side via React.lazy().
const centerIcon = L.divIcon({
  className: "rivers-neighbourhood-pin",
  html: `<div style="width:20px;height:20px;border-radius:50%;background:#0a0a0a;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

function listingPhotoSrc(l: MapListing): string | null {
  // Mirror ListingCard: prefer the RETS-proxied photo when we have an MLS
  // number, fall back to the heroImage URL from the seed/admin data.
  if (l.mlsNumber && (l.photoCount ?? 0) > 0) {
    return apiUrl(`/api/mls/${l.id}/photo/0`);
  }
  return l.heroImage;
}

export default function NeighbourhoodDetailMap({
  name,
  centerLat,
  centerLng,
  listings,
}: Props) {
  const plotted = listings.filter((l) => l.lat != null && l.lng != null);

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap, &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Neighbourhood center pin */}
      <Marker position={[centerLat, centerLng]} icon={centerIcon}>
        <Tooltip permanent direction="top" offset={[0, -14]} opacity={1}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              color: "#0a0a0a",
            }}
          >
            {name}
          </div>
        </Tooltip>
      </Marker>

      {/* Active listings — click for the preview popup */}
      {plotted.slice(0, 60).map((l) => {
        const photo = listingPhotoSrc(l);
        return (
          <CircleMarker
            key={l.id}
            center={[l.lat as number, l.lng as number]}
            radius={7}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: "#23412d",
              fillOpacity: 1,
            }}
          >
            <Popup minWidth={260} maxWidth={300} className="rivers-listing-popup">
              <a
                href={`/mls/${l.id}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {photo ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      overflow: "hidden",
                      borderRadius: 2,
                      background: "#f4f4f5",
                      marginBottom: 10,
                    }}
                  >
                    <img
                      src={photo}
                      alt={l.fullAddress}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : null}
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 20,
                    lineHeight: 1.15,
                    color: "#0a0a0a",
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  {formatPriceCompact(l.listPrice)}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#404040",
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {l.fullAddress}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#737373",
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  <span>
                    {l.beds} bed{l.beds === 1 ? "" : "s"}
                  </span>
                  <span>·</span>
                  <span>
                    {l.baths} bath{l.baths === 1 ? "" : "s"}
                  </span>
                  {l.sqft ? (
                    <>
                      <span>·</span>
                      <span>{l.sqft.toLocaleString("en-CA")} sqft</span>
                    </>
                  ) : null}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 8,
                    borderTop: "1px solid #e5e5e5",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#0a0a0a",
                  }}
                >
                  View listing →
                </div>
              </a>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
