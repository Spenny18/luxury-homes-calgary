// Legacy bootstrap kept only so module-level imports here remain valid; the
// app's actual client entry is now Vike's onRenderClient hook, which mounts
// either the SSR'd page or, for the catch-all /mls and /admin shells, the
// <App /> Wouter router (path-based, not hash-based).
import "./index.css";
