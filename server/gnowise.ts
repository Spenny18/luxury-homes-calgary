// Gnowise Unified Valuation API v2 proxy (api.gnowise.com).
//
// Single endpoint that returns current value + rent AVM + cap rate +
// liquidity score from just an address (plus optional attributes to narrow
// the confidence interval).
//
// We send Calgary/AB as municipality/province defaults so the model doesn't
// have to disambiguate against Toronto or other markets where ambiguous
// street names exist.
//
// API key lives in Fly secret GNOWISE_API_KEY; never shipped to the
// browser.
import { randomUUID } from "node:crypto";

const ENDPOINT = "https://api.gnowise.com/";

export interface ValuationInput {
  address: string;
  aptNum?: string;
  /** Retained for backward compat with the previous schema; the new API
   *  infers condo vs freehold from PropertyType. We don't forward it. */
  isCondo?: boolean;
  condition?: number;
  postalCode?: string;
  /** Optional explicit municipality (e.g. "Calgary"). Defaults to Calgary
   *  when not provided. */
  municipality?: string;
  /** Optional province code (e.g. "AB"). Defaults to AB when not provided. */
  province?: string;
}

export interface ValuationResponse {
  ok: boolean;
  message?: string;
  estimate?: number;
  valueLow?: number;
  valueHigh?: number;
  /** 0..1 — replaces the old riskOfDecline (semantics inverted: higher is
   *  better). Surfaced in the widget as "High / Moderate / Lower". */
  confidence?: number;
  /** "A" = full AVM model, "H" = House Price Index, "HA" = HPI adjusted with
   *  user-provided historical data. */
  valuationSource?: "A" | "H" | "HA";
  estimatedLease?: number;
  leaseLow?: number;
  leaseHigh?: number;
  capRate?: number;
  liquidityScore?: number;
  parameters?: Record<string, unknown>;
}

export async function fetchValuation(
  input: ValuationInput,
): Promise<ValuationResponse> {
  const key = process.env.GNOWISE_API_KEY;
  if (!key) {
    return {
      ok: false,
      message:
        "Instant valuation isn't configured on this deployment (missing API key).",
    };
  }

  // Default Calgary/AB municipality + province so the model doesn't have to
  // disambiguate against Toronto-area street names. When the client picked
  // an address from Places autocomplete, it sends explicit municipality /
  // province / postalCode parsed from address_components — those override
  // the defaults.
  const body: Record<string, unknown> = {
    Address: input.address,
    AptNum: input.aptNum ?? null,
    Condition: input.condition ?? 3,
    Province: input.province || "AB",
    Municipality: input.municipality || "Calgary",
  };
  if (input.postalCode) body.PostalCode = input.postalCode;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        // Optional but recommended for safe retries on 429.
        "Idempotency-Key": randomUUID(),
        "User-Agent":
          "RiversRealEstate/1.0 (+https://riversrealestate.ca)",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      // Status codes from §10 of the v2 docs. Map each to a user-friendly
      // message that matches what actually went wrong.
      let message: string;
      switch (res.status) {
        case 400:
          message =
            "We couldn't parse that address. Try including city and postal code.";
          break;
        case 401:
          message =
            "The valuation service rejected our credentials. Spencer is fixing this — use the manual form below in the meantime.";
          break;
        case 404:
          message =
            "We couldn't find that address in the valuation index. Try the manual form below for a hand-prepared analysis.";
          break;
        case 429:
          message =
            "The valuation service is rate-limiting requests. Wait a moment and try again.";
          break;
        default:
          message =
            "The instant valuation service is temporarily unavailable. Use the manual form below.";
      }
      const text = await res.text().catch(() => "");
      console.warn(
        `[gnowise] ${res.status} ${res.statusText} for "${input.address}": ${text.slice(0, 300)}`,
      );
      return { ok: false, message };
    }

    const data = await res.json();
    const report = data?.Report ?? {};
    if (typeof report.gnowise_value !== "number") {
      return {
        ok: false,
        message:
          "We couldn't generate an estimate for that address. Try the manual form below for a hand-prepared analysis.",
      };
    }
    return {
      ok: true,
      estimate: report.gnowise_value,
      valueLow:
        typeof report.value_low === "number" ? report.value_low : undefined,
      valueHigh:
        typeof report.value_high === "number" ? report.value_high : undefined,
      confidence:
        typeof report.valuation_confidence === "number"
          ? report.valuation_confidence
          : undefined,
      valuationSource: report.valuation_source,
      estimatedLease:
        typeof report.gnowise_lease === "number"
          ? report.gnowise_lease
          : undefined,
      leaseLow:
        typeof report.lease_low === "number" ? report.lease_low : undefined,
      leaseHigh:
        typeof report.lease_high === "number" ? report.lease_high : undefined,
      capRate:
        typeof report.gnowise_cap_rate === "number"
          ? report.gnowise_cap_rate
          : undefined,
      liquidityScore:
        typeof report.liquidity_score === "number"
          ? report.liquidity_score
          : undefined,
      parameters: report.property_attributes ?? null,
    };
  } catch (err: any) {
    const reason =
      err?.name === "AbortError"
        ? "The instant valuation service didn't respond in time. Use the manual form below."
        : "The instant valuation service hit an unexpected error. Use the manual form below.";
    console.error("[gnowise] fetch failed:", err?.message ?? err);
    return { ok: false, message: reason };
  } finally {
    clearTimeout(timer);
  }
}
