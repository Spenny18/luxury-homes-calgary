// Instant home valuation widget — two-phase flow:
//
//   Phase 1: collect contact info (name + email + phone). The "Get
//            Estimate" button is disabled until these are valid.
//   Phase 2: address autocomplete + run as many estimates as the visitor
//            wants. Each estimate adds to a history list below AND sends
//            (a) a branded HTML report email to the visitor and
//            (b) a lead notification to Spencer with the valuation details.
//
// We deliberately gate the value behind contact info — Spencer's whole
// reason for adding this is lead capture. Each estimate is a fully-formed
// lead with what they're evaluating + their info.

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Building2,
  Home,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice, formatPriceCompact } from "@/lib/format";
import {
  PlacesAutocomplete,
  type PlaceSelection,
} from "@/components/places-autocomplete";
import { StaticMapPreview } from "@/components/static-map-preview";

interface ValuationResponse {
  ok: boolean;
  message?: string;
  estimate?: number;
  valueLow?: number;
  valueHigh?: number;
  confidence?: number;
  valuationSource?: "A" | "H" | "HA";
  estimatedLease?: number;
  leaseLow?: number;
  leaseHigh?: number;
  capRate?: number;
  liquidityScore?: number;
  parameters?: Record<string, any>;
}

interface EmailResponse {
  ok: boolean;
  message?: string;
  result?: ValuationResponse;
  leadId?: number;
}

interface HistoryEntry {
  id: string;
  displayAddress: string;
  aptNum: string;
  isCondo: boolean;
  result: ValuationResponse;
}

interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onSeedManualForm?: (address: string, aptNum: string) => void;
}

function isContactComplete(c: Contact): boolean {
  return (
    c.name.trim().length >= 2 &&
    c.email.includes("@") &&
    c.email.includes(".") &&
    c.phone.trim().length >= 7
  );
}

export function HomeValuationWidget({ onSeedManualForm }: Props) {
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
  });
  // Once the user finishes the contact form, we collapse it to a single-line
  // "as <Name>" badge with an Edit pencil. Lets them update if they typo'd
  // their email without redoing the layout for every subsequent valuation.
  const [contactLocked, setContactLocked] = useState(false);

  const [address, setAddress] = useState("");
  const [aptNum, setAptNum] = useState("");
  const [isCondo, setIsCondo] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceSelection | null>(
    null,
  );
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const valuation = useMutation<EmailResponse, Error>({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/public/valuation/email", {
        name: contact.name.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim(),
        address: selectedPlace?.streetAddress
          ? selectedPlace.streetAddress
          : address.trim(),
        aptNum: aptNum.trim(),
        isCondo: isCondo || !!aptNum.trim(),
        postalCode: selectedPlace?.postalCode,
        municipality: selectedPlace?.city,
        province: selectedPlace?.province,
      });
      return res.json();
    },
    onSuccess: (envelope) => {
      const r = envelope.result;
      if (!envelope.ok || !r || !r.ok || r.estimate == null) return;
      setHistory((prev) => [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          displayAddress:
            selectedPlace?.formattedAddress ||
            (aptNum.trim()
              ? `${address.trim()} · Unit ${aptNum.trim()}`
              : address.trim()),
          aptNum: aptNum.trim(),
          isCondo,
          result: r,
        },
        ...prev,
      ]);
    },
  });

  const handlePlace = (p: PlaceSelection) => {
    setAddress(p.formattedAddress);
    setSelectedPlace(p);
  };

  // Surface failures inline above the address form. The mutation payload
  // could fail because either (a) Gnowise couldn't value the address or
  // (b) the email send itself errored — both render the same way.
  const envelope = valuation.data;
  const latestFailure =
    envelope &&
    (!envelope.ok || !envelope.result?.ok)
      ? envelope.result?.message ?? envelope.message ?? "Couldn't run that one."
      : null;

  const contactReady = isContactComplete(contact);
  const phase: "contact" | "address" = contactLocked ? "address" : "contact";

  return (
    <section
      id="instant"
      className="relative bg-foreground text-background"
      data-testid="valuation-widget"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px] gap-12 lg:gap-16 items-start">
          {/* Left: copy ---------------------------------------------------- */}
          <div>
            <div className="font-display text-[11px] tracking-[0.32em] text-background/65 inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3" strokeWidth={1.8} />
              INSTANT ALGORITHMIC ESTIMATE
            </div>
            <h2
              className="mt-5 font-serif text-3xl lg:text-5xl leading-[1.05]"
              style={{ letterSpacing: "-0.01em" }}
            >
              See your home's estimated value in seconds.
            </h2>
            <p className="mt-5 max-w-xl text-background/80 text-[15px] leading-relaxed">
              Powered by an automated valuation model trained on public records
              and recent comparable sales. Each estimate is emailed directly
              to you, and Spencer follows up personally within one business
              hour so you can ask any questions.
            </p>
            <ul className="mt-6 space-y-2 text-background/70 text-[13px]">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-1 shrink-0 text-background/85"
                  strokeWidth={2}
                />
                <span>Calgary address autocomplete (Google Places)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-1 shrink-0 text-background/85"
                  strokeWidth={2}
                />
                <span>Estimated value, likely range, rent + cap rate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-1 shrink-0 text-background/85"
                  strokeWidth={2}
                />
                <span>
                  Test as many addresses as you like — your contact info is
                  entered once
                </span>
              </li>
            </ul>
          </div>

          {/* Right: form + history --------------------------------------- */}
          <div className="space-y-5">
            <div className="bg-background text-foreground rounded-sm border border-border p-7 lg:p-9 shadow-2xl">
              {/* Contact info — either expanded form or collapsed badge */}
              {phase === "contact" ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (contactReady) setContactLocked(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground mb-2">
                      STEP 1 OF 2 — YOUR INFO
                    </div>
                    <h3 className="font-serif text-xl leading-tight">
                      Enter your contact info once.
                    </h3>
                    <p className="text-[13px] text-muted-foreground mt-1.5">
                      Each estimate gets emailed to you, and Spencer reviews
                      every one personally before following up.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="val-name">Your name</Label>
                    <Input
                      id="val-name"
                      value={contact.name}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, name: e.target.value }))
                      }
                      placeholder="First and last"
                      data-testid="input-contact-name"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="val-email">Email</Label>
                    <Input
                      id="val-email"
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      data-testid="input-contact-email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="val-phone">Phone</Label>
                    <Input
                      id="val-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, phone: e.target.value }))
                      }
                      placeholder="(403) 555-1234"
                      data-testid="input-contact-phone"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!contactReady}
                    className="w-full h-12 font-display text-[11px] tracking-[0.22em]"
                    data-testid="button-contact-continue"
                  >
                    CONTINUE TO ADDRESS
                  </Button>

                  <p className="text-[11px] text-muted-foreground leading-relaxed text-center">
                    Spencer reviews every request personally. No spam, reply
                    to opt out anytime.
                  </p>
                </form>
              ) : (
                <>
                  {/* Collapsed contact badge */}
                  <div className="flex items-start justify-between gap-3 mb-5 pb-5 border-b border-border">
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground">
                        SENDING REPORTS TO
                      </div>
                      <div className="text-[14px] font-medium mt-1 truncate">
                        {contact.name}{" "}
                        <span className="text-muted-foreground font-normal">
                          · {contact.email}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContactLocked(false)}
                      className="shrink-0 text-muted-foreground hover:text-foreground"
                      aria-label="Edit contact info"
                    >
                      <Pencil className="w-4 h-4" strokeWidth={1.8} />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (
                        !valuation.isPending &&
                        address.trim().length > 5
                      ) {
                        valuation.mutate();
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground mb-2">
                        STEP 2 — PROPERTY ADDRESS
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="val-address">Property address</Label>
                      <PlacesAutocomplete
                        id="val-address"
                        value={address}
                        onChange={(v) => {
                          setAddress(v);
                          setSelectedPlace(null);
                        }}
                        onSelect={handlePlace}
                        data-testid="input-valuation-address"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Pick from the dropdown for the best match.
                      </p>
                    </div>

                    {/* Aerial preview once an address is selected — lets the
                        user visually confirm we have the right property
                        before they spend a Gnowise call on it. */}
                    {selectedPlace?.lat != null &&
                      selectedPlace?.lng != null && (
                        <div
                          className="space-y-1.5"
                          data-testid="map-preview-wrap"
                        >
                          <Label>Confirm the property</Label>
                          <StaticMapPreview
                            lat={selectedPlace.lat}
                            lng={selectedPlace.lng}
                            alt={`Aerial view of ${selectedPlace.formattedAddress}`}
                          />
                        </div>
                      )}

                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end">
                      <div className="space-y-1.5">
                        <Label htmlFor="val-unit">Unit / suite (if condo)</Label>
                        <Input
                          id="val-unit"
                          value={aptNum}
                          onChange={(e) => {
                            setAptNum(e.target.value);
                            if (e.target.value.trim()) setIsCondo(true);
                          }}
                          placeholder="e.g. 2104"
                          data-testid="input-valuation-unit"
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                        <Checkbox
                          checked={isCondo}
                          onCheckedChange={(v) => setIsCondo(!!v)}
                          id="val-iscondo"
                        />
                        <span className="text-[13px] select-none">
                          It's a condo
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={valuation.isPending || address.trim().length < 6}
                      className="w-full h-12 font-display text-[11px] tracking-[0.22em]"
                      data-testid="button-valuation-submit"
                    >
                      {valuation.isPending
                        ? "ESTIMATING…"
                        : "GET ESTIMATE & EMAIL REPORT"}
                    </Button>

                    {latestFailure && (
                      <div className="border border-border bg-secondary/50 rounded-sm p-3 flex gap-2 items-start">
                        <AlertTriangle
                          className="w-4 h-4 mt-0.5 shrink-0 text-foreground/70"
                          strokeWidth={1.6}
                        />
                        <div className="flex-1 text-[13px] leading-relaxed">
                          <div className="font-medium">Couldn't run that one.</div>
                          <div className="text-muted-foreground mt-0.5">
                            {latestFailure}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              onSeedManualForm?.(address.trim(), aptNum.trim());
                              document
                                .getElementById("manual-evaluation")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="mt-2 font-display text-[10px] tracking-[0.22em] underline hover:no-underline"
                          >
                            REQUEST A MANUAL ANALYSIS INSTEAD →
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>

            {history.length > 0 && (
              <div
                className="bg-background/95 text-foreground rounded-sm border border-background/15 shadow-2xl divide-y divide-border"
                data-testid="valuation-history"
              >
                <div className="px-5 py-3 flex items-center justify-between">
                  <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground">
                    YOUR ESTIMATES THIS SESSION
                  </div>
                  <button
                    type="button"
                    onClick={() => setHistory([])}
                    className="text-[11px] text-muted-foreground hover:text-foreground tracking-wider"
                    data-testid="button-history-clear"
                  >
                    Clear
                  </button>
                </div>
                {history.map((entry) => (
                  <HistoryRow
                    key={entry.id}
                    entry={entry}
                    onRequestManual={() => {
                      onSeedManualForm?.(
                        entry.displayAddress,
                        entry.aptNum,
                      );
                      document
                        .getElementById("manual-evaluation")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- History row ----------------------------------------------------

function HistoryRow({
  entry,
  onRequestManual,
}: {
  entry: HistoryEntry;
  onRequestManual: () => void;
}) {
  const r = entry.result;
  return (
    <div className="px-5 py-5">
      <div className="text-[13px] font-medium leading-tight truncate">
        {entry.displayAddress}
      </div>
      <div className="mt-2 flex items-baseline gap-3 flex-wrap">
        <div
          className="font-serif text-3xl"
          style={{ letterSpacing: "-0.01em" }}
        >
          {formatPrice(r.estimate!)}
        </div>
        {r.valueLow != null && r.valueHigh != null && (
          <div className="text-[12px] text-muted-foreground tabular-nums">
            {formatPriceCompact(r.valueLow)} – {formatPriceCompact(r.valueHigh)}
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
        {(r.parameters?.PropertyType ?? r.parameters?.property_type) && (
          <span>{r.parameters.PropertyType ?? r.parameters.property_type}</span>
        )}
        {(r.parameters?.Bedrooms ?? r.parameters?.bedrooms) != null && (
          <>
            <span>·</span>
            <span>{r.parameters.Bedrooms ?? r.parameters.bedrooms} bed</span>
          </>
        )}
        {(r.parameters?.Washrooms ??
          r.parameters?.Bathrooms ??
          r.parameters?.washrooms) != null && (
          <>
            <span>·</span>
            <span>
              {r.parameters.Washrooms ??
                r.parameters.Bathrooms ??
                r.parameters.washrooms}{" "}
              bath
            </span>
          </>
        )}
        {(r.parameters?.RoomsArea ?? r.parameters?.rooms_area) != null && (
          <>
            <span>·</span>
            <span>
              {(
                r.parameters.RoomsArea ?? r.parameters.rooms_area
              ).toLocaleString("en-CA")}{" "}
              sqft
            </span>
          </>
        )}
        {typeof r.confidence === "number" && (
          <>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              {r.confidence >= 0.8 ? (
                <Home className="w-3 h-3" strokeWidth={1.6} />
              ) : (
                <Building2 className="w-3 h-3" strokeWidth={1.6} />
              )}
              {r.confidence >= 0.8
                ? "High confidence"
                : r.confidence >= 0.5
                  ? "Moderate confidence"
                  : "Lower confidence"}
            </span>
          </>
        )}
      </div>
      {(typeof r.estimatedLease === "number" ||
        typeof r.capRate === "number") && (
        <div className="mt-3 flex gap-4 flex-wrap text-[11px]">
          {typeof r.estimatedLease === "number" && (
            <div className="inline-flex items-center gap-1.5">
              <span className="font-display tracking-[0.18em] text-muted-foreground uppercase">
                Rent est
              </span>
              <span className="tabular-nums">
                {formatPriceCompact(r.estimatedLease)}/mo
              </span>
            </div>
          )}
          {typeof r.capRate === "number" && (
            <div className="inline-flex items-center gap-1.5">
              <span className="font-display tracking-[0.18em] text-muted-foreground uppercase">
                Cap rate
              </span>
              <span className="tabular-nums">
                {(r.capRate * 100).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      )}
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRequestManual}
          className="font-display text-[10px] tracking-[0.22em]"
        >
          REQUEST HAND-PREPARED ANALYSIS →
        </Button>
      </div>
    </div>
  );
}
