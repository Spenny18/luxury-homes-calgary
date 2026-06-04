// SSR per request — same reason as /condos and /neighbourhoods. Blog
// posts added to the runtime DB (not in seed) would otherwise be
// invisible until the next deploy rebuilt the static HTML.
export default { prerender: false };
