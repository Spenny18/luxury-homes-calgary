// SSR per request so manually-added neighbourhoods on the runtime DB
// show up immediately, same as /condos. The seeded set is upserted on
// every boot, so this never regresses for the marquee 30.
export default { prerender: false };
