// SSR per request — see neighbourhoods/@slug/+config.ts. The condo detail
// page surfaces active suites in the building, which only the live runtime
// DB has. Static build-time prerender would leave them empty.
export default { prerender: false };
