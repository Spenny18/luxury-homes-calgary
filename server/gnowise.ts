// Gnowise (swcalgary.homes) "Address to Value" proxy.
//
// The vendor exposes two endpoints. We only use the primary one here:
//
//   1. forecastclient — pass an address string, get back inferred property
//      details + an estimate / range. Best for the consumer widget: the
//      user just types an address and gets a number.
//
//   2. offmarketclient — requires a structured 16-field schema (bedrooms,
//      bathrooms, basement type, etc). Too much friction for a public web
//      form. If the primary endpoint can't find the address, we degrade to
//      the existing manual evaluation form on the page.
//
// API keys live in Fly secrets (GNOWISE_API_KEY). We never ship them to
// the browser.
const PRIMARY_URL =
  "https://2dbgwzjfcj.execute-api.ca-central-1.amazonaws.com/forecastclient";

export interface ValuationInput {
  address: string;
  aptNum?: string;
  isCondo?: boolean;
  condition?: number;
}

export interface ValuationResponse {
  ok: boolean;
  message?: string;
  estimate?: number;
  valueLow?: number;
  valueHigh?: number;
  riskOfDecline?: number;
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

  const body = {
    Address: input.address,
    AptNum: input.aptNum ?? "",
    IsCondo: !!input.isCondo,
    Condition: input.condition ?? 3,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(PRIMARY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "User-Agent":
          "RiversRealEstate/1.0 (+https://riversrealestate.ca)",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      // 404 / 400 means "we don't have this property" rather than "we broke".
      // Surface a friendly message; the page falls through to manual form.
      const text = await res.text().catch(() => "");
      console.warn(
        `[gnowise] ${res.status} ${res.statusText} for "${input.address}": ${text.slice(0, 200)}`,
      );
      return {
        ok: false,
        message:
          res.status === 404
            ? "We couldn't find that address in the public records index. Try the manual evaluation form below."
            : "The instant valuation service is temporarily unavailable. Use the manual form below.",
      };
    }

    const data = await res.json();
    const report = data?.Report ?? {};
    if (typeof report.Estimate !== "number") {
      return {
        ok: false,
        message:
          "We couldn't generate an estimate for that address. Try the manual form below for a hand-prepared analysis.",
      };
    }
    return {
      ok: true,
      estimate: report.Estimate,
      valueLow: report.ValueLow,
      valueHigh: report.ValueHigh,
      riskOfDecline: report.RiskOfDecline,
      parameters: data?.Parameters ?? null,
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
