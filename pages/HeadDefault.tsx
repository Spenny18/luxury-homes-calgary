// Default <head> additions shared by every page.
// Per-page +Head.tsx (or +title / +description) stacks on top of these.
import { sitewideGraph, jsonLdScriptHtml } from "@/lib/schema";

// Follow Up Boss Pixel (WidgetTracker WT-GFURXFCK). Matches site visitors
// to leads in FUB so Spencer sees their pageview history on each contact
// record. Loaded async so it doesn't block render; runs once per page
// load on every route (public + /mls + /admin).
const FUB_PIXEL_SRC = `(function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function() {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"), (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i; e.parentNode.insertBefore(t,e);}) (window,"https://widgetbe.com/agent",document,"widgetTracker"); window.widgetTracker("create", "WT-GFURXFCK"); window.widgetTracker("send", "pageview");`;

// Sitewide Schema.org graph (Organization/RealEstateAgent, Person, WebSite,
// Logo). Serialised once at module load — the contents don't depend on
// pageContext. Per-route +Head.tsx adds page-specific @types on top.
const SITEWIDE_JSONLD = jsonLdScriptHtml(sitewideGraph());

export default function HeadDefault() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23B8893D'/%3E%3Cstop offset='50%25' stop-color='%23D4AF37'/%3E%3Cstop offset='100%25' stop-color='%23B8893D'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' fill='%23000'/%3E%3Cpath d='M14 50 L14 28 L24 18 L34 18 L34 26 L42 26 L42 50 Z' fill='none' stroke='url(%23g)' stroke-width='2.6' stroke-linejoin='round'/%3E%3Cpath d='M22 50 L22 40 L28 40 L28 50' fill='none' stroke='url(%23g)' stroke-width='2.4'/%3E%3Crect x='18' y='32' width='3' height='3' fill='url(%23g)'/%3E%3Crect x='30' y='32' width='3' height='3' fill='url(%23g)'/%3E%3Crect x='36' y='32' width='3' height='3' fill='url(%23g)'/%3E%3C/svg%3E"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <script dangerouslySetInnerHTML={{ __html: FUB_PIXEL_SRC }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: SITEWIDE_JSONLD }}
      />
    </>
  );
}
