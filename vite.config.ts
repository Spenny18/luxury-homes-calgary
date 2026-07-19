import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    vike({ prerender: { partial: true } }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // Vike owns the HTML rendering, so the project root (not client/) is the
  // Vite root. Static files under client/public (e.g. /img/neighbourhoods/*)
  // are copied verbatim into the build output and served at the site root.
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  // We keep the same output directory the rest of the pipeline already expects.
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/client"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
