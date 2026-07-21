import path from "node:path";
import fs from "node:fs";

// User-uploaded images (CMS hero photos) live on the persistent volume next to
// the SQLite DB — the /data mount on Fly — so they survive deploys, unlike the
// built client assets baked into the Docker image. Served at /uploads/*.
export const uploadsDir = path.join(
  path.dirname(process.env.DB_PATH || "data.db"),
  "uploads",
);

try {
  fs.mkdirSync(uploadsDir, { recursive: true });
} catch (err) {
  console.error("[uploads] failed to create uploads dir:", err);
}
