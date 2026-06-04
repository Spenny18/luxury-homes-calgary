// SSR per request — see neighbourhoods/@slug/+config.ts for the longer
// rationale. The build runs inside Fly's builder image with a seed-only
// DB, so prerendering this page only ever shipped the 20 seed condos
// and silently dropped any buildings added directly to the runtime DB
// (Arris, The River, The Views, etc.). SSR keeps the runtime DB as
// the source of truth for which condos are listed.
export default { prerender: false };
