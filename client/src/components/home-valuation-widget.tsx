// Instant home valuation widget with Google Places autocomplete + inline
// iteration history + email-the-report flow.
//
// UX:
//   1. Address autocomplete (Calgary-biased) + optional unit/condo toggle.
//   2. Submit → estimate displayed inline. Form stays visible so the user
//      can try more addresses without losing prior results.
//   3. "History" — every successful estimate is added to a list below.
//   4. "Email me this report" — captures name + email + (optional) phone,
//      sends a branded HTML report to the visitor AND posts a lead to
//      Spencer (via the same inquiry pipeline used by the manual form).

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Building2,
  Home,
  Sparkles,
  AlertTriangle,
  Mail,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice, formatPriceCompact } from "@/lib/format";
import {
  PlacesAutocomplete,
  type PlaceSelection,
} from "@/components/places-autocomplete";

interface ValuationResponse {
  ok: boolean;
  message?: string;
  estimate?: number;
  valueLow?: number;
  valueHigh?: number;
  /** 0..1 — higher is better. Replaces the old riskOfDecline. */
  confidence?: number;
  valuationSource?: "A" | "H" | "HA";
  estimatedLease?: number;
  leaseLow?: number;
  leaseHigh?: number;
  capRate?: number;
  liquidityScore?: number;
  // Gnowise v2 returns inferred attributes in property_attributes; field
  // shape varies. We accept the loose shape and only surface keys we
  // recognize.
  parameters?: Record<string, any>;
}

interface HistoryEntry {
  id: string;
  address: string;
  aptNum: string;
  isCondo: boolean;
  result: ValuationResponse;
}

interface Props {
  onSeedManualForm?: (address: string, aptNum: string) => void;
}

export function HomeValuationWidget({ onSeedManualForm }: Props) {
  const [address, setAddress] = useState("");
  const [aptNum, setAptNum] = useState("");
  const [isCondo, setIsCondo] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [emailFor, setEmailFor] = useState<HistoryEntry | null>(null);

  const valuation = useMutation<ValuationResponse, Error>({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/public/valuation", {
        address: address.trim(),
        aptNum: aptNum.trim() || undefined,
        isCondo: isCondo || !!aptNum.trim(),
        condition: 3,
      });
      return res.json();
    },
    onSuccess: (result) => {
      if (!result.ok || result.estimate == null) return;
      setHistory((prev) => [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          address: address.trim(),
          aptNum: aptNum.trim(),
          isCondo,
          result,
        },
        ...prev,
      ]);
    },
  });

  const handlePlace = (p: PlaceSelection) => {
    setAddress(p.formattedAddress);
  };

  const latestFailure =
    valuation.data && !valuation.data.ok ? valuation.data : null;

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
              and recent comparable sales. Test as many addresses as you'd like
              — no email required. When you want it on file, email yourself
              the report with one click.
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
                <span>Estimated value with likely high/low range</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-1 shrink-0 text-background/85"
                  strokeWidth={2}
                />
                <span>Property details (type, beds, baths, sqft) inferred</span>
              </li>
            </ul>
          </div>

          {/* Right: form (always visible) + history --------------------------- */}
          <div className="space-y-5">
            <div className="bg-background text-foreground rounded-sm border border-border p-7 lg:p-9 shadow-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!valuation.isPending && address.trim().length > 5) {
                    valuation.mutate();
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="val-address">Property address</Label>
                  <PlacesAutocomplete
                    id="val-address"
                    value={address}
                    onChange={setAddress}
                    onSelect={handlePlace}
                    data-testid="input-valuation-address"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Pick from the dropdown for the best match.
                  </p>
                </div>

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
                  {valuation.isPending ? "ESTIMATING…" : "GET ESTIMATE"}
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
                        {latestFailure.message ??
                          "The instant valuation didn't return a result."}
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
            </div>

            {/* History — most recent first ------------------------------- */}
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
                    onEmail={() => setEmailFor(entry)}
                    onRequestManual={() => {
                      onSeedManualForm?.(entry.address, entry.aptNum);
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

      {emailFor && (
        <EmailReportDialog
          entry={emailFor}
          onClose={() => setEmailFor(null)}
          onSent={() => setEmailFor(null)}
        />
      )}
    </section>
  );
}

// ---------- History row ----------------------------------------------------

function HistoryRow({
  entry,
  onEmail,
  onRequestManual,
}: {
  entry: HistoryEntry;
  onEmail: () => void;
  onRequestManual: () => void;
}) {
  const r = entry.result;
  return (
    <div className="px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[13px] font-medium leading-tight truncate">
            {entry.aptNum ? `${entry.address} · Unit ${entry.aptNum}` : entry.address}
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
            {r.parameters?.PropertyType && <span>{r.parameters.PropertyType}</span>}
            {(r.parameters?.Bedrooms ?? r.parameters?.bedrooms) != null && (
              <>
                <span>·</span>
                <span>{r.parameters.Bedrooms ?? r.parameters.bedrooms} bed</span>
              </>
            )}
            {(r.parameters?.Washrooms ?? r.parameters?.Bathrooms ?? r.parameters?.washrooms) !=
              null && (
              <>
                <span>·</span>
                <span>
                  {r.parameters.Washrooms ?? r.parameters.Bathrooms ?? r.parameters.washrooms} bath
                </span>
              </>
            )}
            {(r.parameters?.RoomsArea ?? r.parameters?.rooms_area) != null && (
              <>
                <span>·</span>
                <span>
                  {(
                    r.parameters.RoomsArea ?? r.parameters.rooms_area
                  ).toLocaleString("en-CA")} sqft
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
          {/* Optional new-API extras: monthly rent + cap rate */}
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
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onEmail}
          className="font-display text-[10px] tracking-[0.22em]"
        >
          <Mail className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.8} />
          EMAIL ME THIS REPORT
        </Button>
        <Button
          type="button"
          variant="ghost"
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

// ---------- Email dialog ---------------------------------------------------

function EmailReportDialog({
  entry,
  onClose,
  onSent,
}: {
  entry: HistoryEntry;
  onClose: () => void;
  onSent: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const send = useMutation<{ ok: boolean; message?: string }, Error>({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/public/valuation/email", {
        name,
        email,
        phone,
        address: entry.address,
        aptNum: entry.aptNum,
        isCondo: entry.isCondo,
      });
      return res.json();
    },
    onSuccess: (r) => {
      if (r.ok) {
        setTimeout(onSent, 1500);
      }
    },
  });

  const sent = send.data?.ok;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Email this report
          </DialogTitle>
          <DialogDescription className="text-[13px]">
            {entry.aptNum ? `${entry.address} · Unit ${entry.aptNum}` : entry.address}
            <br />
            <span className="text-foreground font-medium">
              {formatPrice(entry.result.estimate!)}
            </span>
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-6 text-center">
            <CheckCircle2
              className="w-10 h-10 mx-auto text-foreground"
              strokeWidth={1.5}
            />
            <h3 className="mt-3 font-serif text-xl">Sent.</h3>
            <p className="mt-2 text-muted-foreground text-[13px]">
              Check your inbox for the report. Spencer's been notified too —
              expect a follow-up within one business hour.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                !send.isPending &&
                name.trim().length > 1 &&
                email.includes("@")
              ) {
                send.mutate();
              }
            }}
            className="space-y-3"
          >
            <div className="space-y-1.5">
              <Label htmlFor="rep-name">Your name</Label>
              <Input
                id="rep-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and last"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rep-email">Email</Label>
              <Input
                id="rep-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rep-phone">Phone (optional)</Label>
              <Input
                id="rep-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(403) 555-1234"
              />
            </div>
            {send.data && !send.data.ok && (
              <div className="text-[12px] text-destructive">
                {send.data.message ?? "Couldn't send. Try again?"}
              </div>
            )}
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={send.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  send.isPending ||
                  name.trim().length < 2 ||
                  !email.includes("@")
                }
                className="font-display text-[11px] tracking-[0.22em]"
              >
                {send.isPending ? "SENDING…" : "SEND REPORT"}
              </Button>
            </DialogFooter>
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              Spencer will see this and may follow up. Reply to opt-out anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
