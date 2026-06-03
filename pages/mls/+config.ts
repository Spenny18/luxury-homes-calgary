// CSR-only — Vike serves a near-empty shell; <App /> rehydrates with the live
// MLS data on the client. These routes are not indexable content.
export default { ssr: false, prerender: false };
