import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Adds a content hash to a file in public/, so browsers load the new file after each change.
// GitHub Pages caches assets for 10 minutes, and a new page with an old stylesheet looks broken.
const cache = new Map();
export function asset(path) {
  if (!cache.has(path)) {
    const hash = createHash("sha1").update(readFileSync(join(process.cwd(), "public", path))).digest("hex").slice(0, 10);
    cache.set(path, `${path}?v=${hash}`);
  }
  return cache.get(path);
}
