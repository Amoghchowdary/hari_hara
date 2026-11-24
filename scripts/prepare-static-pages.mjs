import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

// GitHub Pages cannot rewrite unknown paths to index.html. Generate SPA entry points
// for all public URLs so direct links and refreshes do not return HTTP 404.
const dist = resolve("dist");
const index = join(dist, "index.html");
if (!existsSync(index)) throw new Error("dist/index.html missing; run vite build first");
const html = readFileSync(index, "utf8");
const source = readFileSync("src/lib/services.ts", "utf8");
const slugs = Array.from(source.matchAll(/slug:\s*"([a-z0-9-]+)"/g), (m) => m[1]);
const publicRoutes = ["about", "contact", "projects", "quote", "services", ...slugs.map((slug) => `services/${slug}`)];
for (const route of publicRoutes) {
  const dir = join(dist, ...route.split("/"));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
}
copyFileSync(index, join(dist, "404.html"));
console.log(`Static Pages: ${publicRoutes.length} page shells plus 404 fallback prepared.`);
