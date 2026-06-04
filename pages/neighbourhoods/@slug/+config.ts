// SSR per request — the prerender build only sees the seed DB inside the
// Fly builder image, not the live RETS-synced listings on the runtime
// volume, so prerendered pages showed at most one fallback listing each.
// SSR is still indexable (h1, story, copy land in the raw HTML); we just
// also get the current MLS inventory in the "Properties on the market
// today" section.
export default { prerender: false };
