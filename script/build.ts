import { build as esbuild } from "esbuild";
import { build as vikeBuild, prerender } from "vike/api";
import { rm, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

// Dependencies we want bundled INTO the server binary (smaller cold-start,
// fewer node_modules openat syscalls in production). Everything else stays
// external and is npm-installed at runtime.
const allowlist = [
  "@google/generative-ai",
  "axios",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

// Vike + react + react-leaflet etc. live in the client bundle. They must NOT
// be bundled into the server binary — the server only needs `vike/server` at
// runtime, which itself dynamically loads the built page modules.
const serverExternalForce = ["vike", "vike-react", "vike/server"];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client + server bundles (vike)...");
  await vikeBuild();

  console.log("prerendering static pages...");
  await prerender();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = Array.from(
    new Set([
      ...allDeps.filter((dep) => !allowlist.includes(dep)),
      ...serverExternalForce,
    ]),
  );

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  // The runtime image (Dockerfile) only copies dist/. Vike's server runtime
  // resolves page modules out of dist/server at request time, so the prebuilt
  // assets need to live next to the server binary.
  if (existsSync("dist/server")) {
    // already at the right path — vite outputs server build to dist/server
  }

  console.log("done.");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
