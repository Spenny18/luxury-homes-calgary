// Leaflet rendering for the condo detail page. Kept separate so it can be
// lazy-loaded after hydration (Leaflet touches window at module load and is
// not SSR-safe).
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const propertyIcon = L.divIcon({
  className: "rivers-condo-pin",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#23412d;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface Props {
  lat: number;
  lng: number;
}

export default function CondoDetailMap({ lat, lng }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap, &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]} icon={propertyIcon} />
    </MapContainer>
  );
}
