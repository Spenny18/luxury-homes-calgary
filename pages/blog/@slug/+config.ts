// SSR per request — see /pages/blog/+config.ts. Detail pages need to
// follow the same model so a post added to the runtime DB renders
// immediately instead of 404'ing because the build never saw it.
export default { prerender: false };
