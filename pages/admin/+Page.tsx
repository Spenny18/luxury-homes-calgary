// Catch-all CSR shell for the auth-gated admin app. SSR is off (sessions are
// client-side anyway) and prerender is off (no public crawl surface).
import App from "../../client/src/App";
export default App;
