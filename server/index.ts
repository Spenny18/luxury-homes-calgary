import "dotenv/config";
import express, { Response, NextFunction } from "express";
import type { Request } from "express";
import { registerRoutes } from "./routes";
import { registerSeoRoutes } from "./seo";
import { createServer } from "node:http";
import { startSyncCron } from "./rets-sync";
import { startLeadAlertCron } from "./lead-alert-cron";
import path from "node:path";

// Vike is ESM-only; the bundled server runs as CJS, so we have to load it via
// dynamic import (the only CJS→ESM bridge that works at runtime). esbuild
// preserves `import()` unchanged.
const vikeServerPromise = import("vike/server");

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);
  // SEO endpoints — must be registered before the Vike catch-all below so
  // /sitemap.xml and /robots.txt don't fall through to Vike's "no page
  // matched" error renderer.
  registerSeoRoutes(app);

  // Legacy alias redirects. The WordPress site uses /home-valuation
  // (American spelling); Spencer's recent marketing uses /home-evaluation
  // (the spelling he asked us to use). Catch the old form here so any
  // backlink to the WP URL lands on the working page.
  app.get(["/home-valuation", "/home-valuation/"], (_req, res) => {
    res.redirect(301, "/home-evaluation");
  });

  try {
    startSyncCron();
  } catch (err) {
    console.error("[mls-sync] failed to start cron:", err);
  }
  try {
    startLeadAlertCron();
  } catch (err) {
    console.error("[lead-alerts] failed to start cron:", err);
  }

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // Mount Vite (dev) or serve the prerendered client assets (prod). Vike's
  // renderPage handles the actual page rendering in both modes — in dev it
  // streams freshly transformed HTML, in prod it either serves a prerendered
  // HTML file or SSR-renders per request.
  if (process.env.NODE_ENV === "production") {
    // Serve hashed client assets (the JS/CSS chunks Vike's build emits) and
    // any prerendered HTML files. The catch-all below falls through to Vike
    // for routes that aren't a static file (e.g. SSR'd /, /p/:slug).
    const clientDist = path.resolve(__dirname, "client");
    // `redirect: false` stops express.static from issuing a 301 to add a
    // trailing slash when the URL matches a directory (which it does for
    // every prerendered page, e.g. /neighbourhoods/upper-mount-royal →
    // /neighbourhoods/upper-mount-royal/). That redirect is bad for SEO:
    // Google's index and the sitemap use the no-slash form, and the extra
    // hop costs link equity. Letting the request fall through to Vike's
    // renderPage means the no-slash URL serves the page HTML directly.
    app.use(express.static(clientDist, { index: false, redirect: false }));
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // Vike renders the page (SSG'd, SSR'd, or CSR-shell — depending on the
  // matched route's +config). Everything not matched by an /api/* route or a
  // static asset above lands here. `renderPage` comes from a dynamic import
  // because Vike is ESM-only and this server runs as CJS in production.
  const { renderPage } = await vikeServerPromise;
  app.use(async (req, res, next) => {
    try {
      const pageContext = await renderPage({
        urlOriginal: req.originalUrl,
        headersOriginal: req.headers as Record<string, string>,
      });
      const { httpResponse } = pageContext;
      if (!httpResponse) return next();
      const { body, statusCode, headers } = httpResponse;
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode).send(body);
    } catch (err) {
      next(err);
    }
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
