import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

// Per-app Vike config. Per-page overrides live in each page's +config.ts.
export default {
  extends: vikeReact,

  // Default: server-render every page. Per-page `prerender: true` opts into
  // build-time static generation; per-page `ssr: false` opts into CSR-only.
  prerender: false,

  // Data we attach in +data loaders, +Head loaders, or onBeforeRender is
  // serialized into the SSR HTML so the hydrated client doesn't have to
  // re-fetch it.
  passToClient: ["pageProps", "data", "routeParams", "urlPathname"],

  // Default brand-wide head defaults. Per-page <Head> additions stack on top.
  title: "Rivers Real Estate — Luxury Homes Calgary",
  description:
    "Spencer Rivers — luxury homes in Springbank Hill, Aspen Woods, Upper Mount Royal, Elbow Park, Britannia, and Bel-Aire. Synterra Realty.",
  lang: "en",

  // Inject the brand fonts in the <head> for every page.
  Head: "import:./HeadDefault.tsx:default",

  // Wrap every page in <QueryClientProvider> + <ThemeProvider> + <Toaster>.
  Wrapper: "import:./Wrapper.tsx:default",
} satisfies Config;
