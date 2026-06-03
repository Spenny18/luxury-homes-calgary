// Leaflet rendering for the neighbourhood detail page. Kept in its own file so
// it can be lazy-loaded — react-leaflet + leaflet directly reference `window`
// at module load and would break SSR otherwise.
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapListing {
  id: string;
  lat: number | null;
  lng: number | null;
  fullAddress: string;
}

interface Props {
  name: string;
  centerLat: number;
  centerLng: number;
  listings: MapListing[];
}

export default function NeighbourhoodDetailMap({
  name,
  centerLat,
  centerLng,
  listings,
}: Props) {
  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[centerLat, centerLng]}
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
            {name}
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
  );
}
