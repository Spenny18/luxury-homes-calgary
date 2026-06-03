// Catch-all CSR shell for the live MLS search/detail routes.
// Out of SEO scope (live data, auth-gated comparator, etc) per the
// rendering decision in the migration PR. SSR is off so Vike just emits the
// hydrating shell; <App /> takes over with the existing Wouter sub-router.
import App from "../../client/src/App";
export default App;
