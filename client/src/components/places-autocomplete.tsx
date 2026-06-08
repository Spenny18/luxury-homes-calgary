// Address-only autocomplete input powered by Google Places.
//
// Biases results to Calgary (sw_lat,lng / ne_lat,lng bounding box covering
// the city + surrounding bedroom communities) and restricts to Canada so
// stray US matches don't appear in the dropdown.

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useGoogleMaps } from "@/lib/use-google-maps";

export interface PlaceSelection {
  formattedAddress: string;
  placeId?: string;
  lat?: number;
  lng?: number;
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSelect?: (place: PlaceSelection) => void;
  placeholder?: string;
  id?: string;
  "data-testid"?: string;
  className?: string;
}

// Calgary bounding box used to bias autocomplete results. ne ≈ Cochrane /
// Airdrie corner; sw ≈ Springbank / De Winton corner. Wide enough to cover
// all CREB markets without bleeding into other Alberta cities.
const CALGARY_BIAS = {
  ne: { lat: 51.25, lng: -113.85 },
  sw: { lat: 50.85, lng: -114.35 },
};

export function PlacesAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  id,
  className,
  "data-testid": dataTestId,
}: Props) {
  const { ready } = useGoogleMaps();
  const inputRef = useRef<HTMLInputElement>(null);
  const ac = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!ready || !inputRef.current) return;
    const g = (window as any).google as typeof google;
    if (!g?.maps?.places) return;

    const autocomplete = new g.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "ca" },
      bounds: new g.maps.LatLngBounds(
        new g.maps.LatLng(CALGARY_BIAS.sw.lat, CALGARY_BIAS.sw.lng),
        new g.maps.LatLng(CALGARY_BIAS.ne.lat, CALGARY_BIAS.ne.lng),
      ),
      // Bias = soft preference (still lets users pick out-of-bounds);
      // a strict bounds restriction would frustrate anyone evaluating a
      // home in Canmore, Okotoks, etc.
      strictBounds: false,
      fields: ["formatted_address", "geometry", "place_id", "name"],
    });
    ac.current = autocomplete;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const formatted =
        place.formatted_address ?? place.name ?? inputRef.current?.value ?? "";
      onChange(formatted);
      onSelect?.({
        formattedAddress: formatted,
        placeId: place.place_id,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      });
    });

    return () => {
      listener.remove();
      ac.current = null;
    };
  }, [ready, onChange, onSelect]);

  return (
    <Input
      ref={inputRef}
      id={id}
      className={className}
      data-testid={dataTestId}
      placeholder={
        placeholder ?? (ready ? "Start typing an address…" : "Loading…")
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  );
}
