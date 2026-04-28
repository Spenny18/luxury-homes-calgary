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
import { sendEmail, buildLeadAlertHtml, buildMarketSnapshotHtml } from "./email";

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
    console.log("[alerts] RESEND_API_KEY not set — skipping cycle");
    return { scanned: 0, sent: 0, skipped: 0, errors: 0 };
  }
  const origin = process.env.PUBLIC_ORIGIN || "https://luxury-homes-calgary.fly.dev";
  const fallbackTo = process.env.SPENCER_NOTIFY_EMAIL || process.env.RESEND_FROM_EMAIL || "";
  const due = storage.dueSavedSearches();

  let scanned = 0;
  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const alert of due as any[]) {
    scanned++;
    try {
      // Determine recipient: explicit override -> linked lead -> Spencer fallback.
      let recipient: string | null = alert.emailRecipient || null;
      let recipientName = "there";
      if (!recipient && alert.leadId) {
        const lead = storage.getLead(alert.leadId);
        if (lead?.email) {
          recipient = lead.email;
          recipientName = lead.name || "there";
        }
      }
      if (!recipient && fallbackTo) {
        recipient = fallbackTo;
        recipientName = "Spencer";
      }
      if (!recipient) {
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
      const alertType = alert.alertType ?? "listings";

      // For listings type: skip empty digests on short cadences.
      const totalMatches = snap.newListings + snap.priceReductions;
      if (
        alertType === "listings" &&
        totalMatches === 0 &&
        (alert.frequency === "instant" || alert.frequency === "daily")
      ) {
        storage.updateSavedSearch(alert.id, {
          lastSentAt: new Date().toISOString(),
          lastMatchCount: 0,
        });
        skipped++;
        continue;
      }

      // Build HTML based on type.
      let html: string;
      let subject: string;
      if (alertType === "snapshot") {
        html = buildMarketSnapshotHtml({
          leadName: recipientName,
          alertLabel: alert.name,
          origin,
          snapshot: {
            newListings: snap.newListings,
            sold: snap.sold,
            terminated: snap.terminated,
            priceReductions: snap.priceReductions,
            averageListPrice: snap.averageListPrice,
            averageSoldPrice: snap.averageSoldPrice,
          },
          daysBack,
        });
        subject = `${alert.name} · ${daysBack}-day market snapshot`;
      } else {
        html = buildLeadAlertHtml({
          leadName: recipientName,
          alertLabel: alert.name,
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
        subject =
          snap.newListings > 0
            ? `${snap.newListings} new ${snap.newListings === 1 ? "listing" : "listings"} for ${alert.name}`
            : snap.priceReductions > 0
              ? `${snap.priceReductions} price ${snap.priceReductions === 1 ? "reduction" : "reductions"} for ${alert.name}`
              : `Your ${alert.name} update`;
      }

      const result = await sendEmail({
        to: recipient,
        subject,
        html,
        replyTo: process.env.RESEND_FROM_EMAIL,
      });

      if (result.ok) {
        sent++;
        storage.updateSavedSearch(alert.id, {
          lastSentAt: new Date().toISOString(),
          lastMatchCount: totalMatches,
        });
        console.log(
          `[alerts] sent #${alert.id} (${alertType}) to ${recipient} (matches=${totalMatches})`,
        );
      } else {
        errors++;
        console.error(`[alerts] send failed #${alert.id}:`, result.error);
      }
    } catch (e: any) {
      errors++;
      console.error(`[alerts] error processing #${alert.id}:`, e?.message ?? e);
    }
  }

  if (scanned > 0) {
    console.log(`[alerts] cycle done — scanned=${scanned} sent=${sent} skipped=${skipped} errors=${errors}`);
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
