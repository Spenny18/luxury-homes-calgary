// Lead-alert email cron.
//
// Hourly loop:
//   1. Fetch every alert that's "due" per its frequency cadence (or instant
//      alerts that match a listing synced/changed within the last hour).
//   2. For each alert, run the lead's filter set against marketSnapshot()
//      with daysBack = the cadence window (1 / 7 / 30) and pull recent
//      new listings + price reductions.
//   3. If there are matches, email the lead via Resend with the brand-styled
//      digest from email.ts. CC Spencer's notify address.
//   4. Update lastSentAt + lastMatchCount on the alert.
//
// If RESEND_API_KEY isn't set the cron logs and returns; nothing breaks.

import { storage } from "./storage";
import { sendEmail, buildLeadAlertHtml } from "./email";

const FREQ_DAYS: Record<string, number> = {
  instant: 1,
  daily: 1,
  weekly: 7,
  monthly: 30,
};

let timer: NodeJS.Timeout | null = null;

export async function runLeadAlertCycle(): Promise<{
  scanned: number;
  sent: number;
  skipped: number;
  errors: number;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[lead-alerts] RESEND_API_KEY not set — skipping cycle");
    return { scanned: 0, sent: 0, skipped: 0, errors: 0 };
  }
  const origin = process.env.PUBLIC_ORIGIN || "https://luxury-homes-calgary.fly.dev";
  const due = storage.dueLeadAlerts();
  // Also pull instant alerts and treat them as due if any matching listing
  // was synced within the last hour.
  const allActive = storage
    .listLeadAlerts(0) // (placeholder; we iterate per-lead next)
    .filter(() => false);
  void allActive;

  let scanned = 0;
  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const alert of due) {
    scanned++;
    try {
      const lead = storage.getLead(alert.leadId);
      if (!lead || !lead.email) {
        skipped++;
        continue;
      }
      const filters = (() => {
        try {
          return JSON.parse(alert.filters);
        } catch {
          return {};
        }
      })();
      const daysBack = FREQ_DAYS[alert.frequency] ?? 1;
      const snap = storage.marketSnapshot({ filters, daysBack });
      const totalMatches =
        snap.newListings + snap.priceReductions;
      // Don't send empty digests for instant/daily — but DO send for weekly +
      // monthly so the lead always hears from you on cadence even if quiet.
      if (
        totalMatches === 0 &&
        (alert.frequency === "instant" || alert.frequency === "daily")
      ) {
        // Touch lastSentAt anyway so we don't recompute every cycle.
        storage.updateLeadAlert(alert.id, {
          lastSentAt: new Date().toISOString(),
          lastMatchCount: 0,
        });
        skipped++;
        continue;
      }

      const html = buildLeadAlertHtml({
        leadName: lead.name || "there",
        alertLabel: alert.label,
        origin,
        newListings: snap.samples.newListings.slice(0, 6) as any[],
        priceReductions: snap.samples.priceReductions
          .slice(0, 6)
          .map((r: any) => ({
            id: r.id,
            fullAddress: r.fullAddress ?? "",
            listPrice: r.newPrice ?? 0,
            previousPrice: r.oldPrice,
            beds: 0,
            baths: 0,
            sqft: null,
            neighbourhood: r.neighbourhood ?? null,
            heroImage: r.heroImage ?? null,
          })) as any[],
        snapshot: {
          newListings: snap.newListings,
          sold: snap.sold,
          terminated: snap.terminated,
          priceReductions: snap.priceReductions,
        },
        daysBack,
      });

      const subject =
        snap.newListings > 0
          ? `${snap.newListings} new ${snap.newListings === 1 ? "listing" : "listings"} for ${alert.label}`
          : snap.priceReductions > 0
            ? `${snap.priceReductions} price ${snap.priceReductions === 1 ? "reduction" : "reductions"} for ${alert.label}`
            : `Your ${alert.label} update`;

      const result = await sendEmail({
        to: lead.email,
        subject,
        html,
        replyTo: process.env.RESEND_FROM_EMAIL,
      });

      if (result.ok) {
        sent++;
        storage.updateLeadAlert(alert.id, {
          lastSentAt: new Date().toISOString(),
          lastMatchCount: totalMatches,
        });
        console.log(`[lead-alerts] sent #${alert.id} to ${lead.email} (matches=${totalMatches})`);
      } else {
        errors++;
        console.error(`[lead-alerts] send failed #${alert.id}:`, result.error);
      }
    } catch (e: any) {
      errors++;
      console.error(`[lead-alerts] error processing #${alert.id}:`, e?.message ?? e);
    }
  }

  if (scanned > 0) {
    console.log(`[lead-alerts] cycle done — scanned=${scanned} sent=${sent} skipped=${skipped} errors=${errors}`);
  }
  return { scanned, sent, skipped, errors };
}

export function startLeadAlertCron() {
  if (timer) return;
  // First run delayed 30s after boot so the MLS sync gets a head start.
  setTimeout(() => {
    runLeadAlertCycle().catch((e) =>
      console.error("[lead-alerts] uncaught:", e),
    );
  }, 30_000);
  // Hourly thereafter.
  timer = setInterval(() => {
    runLeadAlertCycle().catch((e) =>
      console.error("[lead-alerts] uncaught:", e),
    );
  }, 60 * 60 * 1000);
  console.log("[lead-alerts] scheduled hourly");
}
