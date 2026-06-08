// Instant home valuation widget. User types an address; we POST to our
// own /api/public/valuation proxy (which calls Gnowise server-side so the
// API key never reaches the browser); we show the estimate + range +
// risk-of-decline + a CTA to request the full hand-prepared analysis from
// the manual form below.
//
// When the API can't find the address, we display the friendly fallback
// message and the user falls through to the manual form on the same page.

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Building2, Home, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/format";

interface ValuationResponse {
  ok: boolean;
  message?: string;
  estimate?: number;
  valueLow?: number;
  valueHigh?: number;
  riskOfDecline?: number;
  parameters?: {
    PropertyType?: string;
    BuildingStyle?: string;
    Bedrooms?: number;
    Bathrooms?: number;
    RoomsArea?: number;
    LotArea?: number;
    BasementType?: string;
    PoolType?: string;
  };
}

interface Props {
  /** Called with the address the visitor evaluated so the manual form can
   *  prefill the same address. */
  onSeedManualForm?: (address: string, aptNum: string) => void;
}

export function HomeValuationWidget({ onSeedManualForm }: Props) {
  const [address, setAddress] = useState("");
  const [aptNum, setAptNum] = useState("");
  const [isCondo, setIsCondo] = useState(false);

  const mutation = useMutation<ValuationResponse, Error>({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/public/valuation", {
        address: address.trim(),
        aptNum: aptNum.trim() || undefined,
        isCondo: isCondo || !!aptNum.trim(),
        condition: 3,
      });
      return res.json();
    },
  });

  const result = mutation.data;
  const showResult = result && result.ok;
  const showFailure = result && !result.ok;

  return (
    <section
      id="instant"
      className="relative bg-foreground text-background"
      data-testid="valuation-widget"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px] gap-12 lg:gap-16 items-start">
          {/* Left: copy ----------------------------------------------------- */}
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
              and recent comparable sales. Useful as a starting point — but for
              a real number on your specific home, ask Spencer for the
              hand-prepared market analysis below.
            </p>
          </div>

          {/* Right: form / result ------------------------------------------- */}
          <div className="bg-background text-foreground rounded-sm border border-border p-7 lg:p-9 shadow-2xl">
            {!showResult && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!mutation.isPending && address.trim().length > 5) {
                    mutation.mutate();
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="val-address">
                    Property address
                  </Label>
                  <Input
                    id="val-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Aspen Summit Cir SW, Calgary, AB T3H 5C8"
                    data-testid="input-valuation-address"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Include city and postal code for the best match.
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
                  disabled={mutation.isPending || address.trim().length < 6}
                  className="w-full h-12 font-display text-[11px] tracking-[0.22em]"
                  data-testid="button-valuation-submit"
                >
                  {mutation.isPending ? "ESTIMATING…" : "GET INSTANT ESTIMATE"}
                </Button>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Instant only. No email or phone required. We don't store
                  the search.
                </p>
              </form>
            )}

            {/* Failure state — pivot to the manual form below ---------------- */}
            {showFailure && (
              <div className="text-center py-2" data-testid="valuation-failure">
                <AlertTriangle
                  className="w-8 h-8 mx-auto text-foreground/70"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-serif text-xl lg:text-2xl leading-tight">
                  Couldn't run an instant estimate
                </h3>
                <p className="mt-3 text-muted-foreground text-[14px] max-w-md mx-auto">
                  {result?.message ??
                    "The instant valuation didn't return a result."}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => mutation.reset()}
                    data-testid="button-valuation-retry"
                  >
                    Try a different address
                  </Button>
                  <Button
                    onClick={() => {
                      onSeedManualForm?.(address.trim(), aptNum.trim());
                      document
                        .getElementById("manual-evaluation")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-testid="button-valuation-fallback"
                  >
                    Request a manual analysis instead
                  </Button>
                </div>
              </div>
            )}

            {/* Success state — render the estimate -------------------------- */}
            {showResult && (
              <div data-testid="valuation-result">
                <div className="font-display text-[10px] tracking-[0.22em] text-muted-foreground mb-2">
                  ESTIMATED VALUE
                </div>
                <div
                  className="font-serif text-4xl lg:text-5xl"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {formatPrice(result!.estimate!)}
                </div>

                {/* Range bar */}
                {typeof result!.valueLow === "number" &&
                  typeof result!.valueHigh === "number" && (
                    <div className="mt-5">
                      <div className="h-1.5 rounded-full bg-gradient-to-r from-foreground/15 via-foreground to-foreground/15" />
                      <div className="mt-2 flex items-center justify-between text-[12px] text-muted-foreground tabular-nums">
                        <span>{formatPrice(result!.valueLow!)}</span>
                        <span className="text-[10px] tracking-[0.22em] uppercase">
                          Likely range
                        </span>
                        <span>{formatPrice(result!.valueHigh!)}</span>
                      </div>
                    </div>
                  )}

                {/* Inferred property params (when present) */}
                {result!.parameters && (
                  <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-4 text-[12px]">
                    {[
                      {
                        label: "Type",
                        value: result!.parameters.PropertyType,
                      },
                      {
                        label: "Style",
                        value: result!.parameters.BuildingStyle,
                      },
                      {
                        label: "Beds",
                        value:
                          result!.parameters.Bedrooms != null
                            ? String(result!.parameters.Bedrooms)
                            : undefined,
                      },
                      {
                        label: "Baths",
                        value:
                          result!.parameters.Bathrooms != null
                            ? String(result!.parameters.Bathrooms)
                            : undefined,
                      },
                      {
                        label: "Interior",
                        value:
                          result!.parameters.RoomsArea != null
                            ? `${result!.parameters.RoomsArea.toLocaleString("en-CA")} sqft`
                            : undefined,
                      },
                      {
                        label: "Lot",
                        value:
                          result!.parameters.LotArea && result!.parameters.LotArea > 0
                            ? `${result!.parameters.LotArea.toLocaleString("en-CA")} sqft`
                            : undefined,
                      },
                      {
                        label: "Basement",
                        value: result!.parameters.BasementType,
                      },
                      {
                        label: "Pool",
                        value:
                          result!.parameters.PoolType &&
                          result!.parameters.PoolType !== "None"
                            ? result!.parameters.PoolType
                            : undefined,
                      },
                    ]
                      .filter((f) => f.value)
                      .map((f) => (
                        <div key={f.label}>
                          <div className="font-display text-[10px] tracking-[0.18em] text-muted-foreground">
                            {f.label.toUpperCase()}
                          </div>
                          <div className="mt-1 font-medium">{f.value}</div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Risk of decline */}
                {typeof result!.riskOfDecline === "number" && (
                  <div className="mt-6 flex items-center gap-3 text-[13px]">
                    {result!.riskOfDecline >= 60 ? (
                      <Building2
                        className="w-4 h-4 text-foreground/70"
                        strokeWidth={1.6}
                      />
                    ) : (
                      <Home
                        className="w-4 h-4 text-foreground/70"
                        strokeWidth={1.6}
                      />
                    )}
                    <span>
                      Model confidence:{" "}
                      <span className="font-medium">
                        {result!.riskOfDecline < 20
                          ? "high"
                          : result!.riskOfDecline < 50
                            ? "moderate"
                            : "lower — local data is thin"}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        ({result!.riskOfDecline}% risk of decline)
                      </span>
                    </span>
                  </div>
                )}

                <div className="mt-7 pt-6 border-t border-border space-y-3">
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    This number is algorithmic. For a Calgary-specific market
                    analysis with hand-picked comparables and a recommended
                    list price, get the hand-prepared version below.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      onClick={() => {
                        onSeedManualForm?.(address.trim(), aptNum.trim());
                        document
                          .getElementById("manual-evaluation")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="font-display text-[11px] tracking-[0.22em]"
                      data-testid="button-request-manual"
                    >
                      REQUEST THE HAND-PREPARED ANALYSIS
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        mutation.reset();
                        setAddress("");
                        setAptNum("");
                      }}
                      data-testid="button-valuation-reset"
                    >
                      Estimate another
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
