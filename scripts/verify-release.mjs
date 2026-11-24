import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const file = join(dir, name);
  return statSync(file).isDirectory() ? walk(file) : [file];
});
const sourceFiles = walk("src").filter((file) => /\.(tsx?|json)$/.test(file));
for (const file of sourceFiles) {
  const content = readFileSync(file, "utf8");
  if (/supabase|lovable|\/api\/public\/admin-role/i.test(content)) {
    throw new Error(`Removed backend reference remains in ${file}`);
  }
  if (file.replaceAll("\\", "/").includes("src/routes/admin")) {
    throw new Error(`Removed admin route remains: ${file}`);
  }
}
// The source of the independently deployed Apps Script may be absent from the
// frontend-only public GitHub repository. It must NEVER be required to build it.
const required = [
  "public/favicon.ico", "public/favicon-32x32.png", "public/apple-touch-icon.png",
  "src/assets/logo.png", "index.html", ".github/workflows/deploy.yml",
  "src/lib/backend.ts", "src/routeTree.gen.ts", "scripts/prepare-static-pages.mjs",
];
for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing frontend release file: ${file}`);
}
const png = readFileSync("src/assets/logo.png");
if (png.toString("hex", 0, 8) !== "89504e470d0a1a0a") {
  throw new Error("Logo .png is not a real PNG");
}
const html = readFileSync("index.html", "utf8");
if (!html.includes("%BASE_URL%favicon.ico")) {
  throw new Error("Favicon path must be base-aware");
}
const backend = readFileSync("src/lib/backend.ts", "utf8");
if (!backend.includes("AKfycbw9NZ_nPQQSdSCTD26LpQlZhD88gtp15VvR2cy4FelX13vjFwpQRsw3usF2bmONHbTO9A")) {
  throw new Error("Apps Script endpoint missing from frontend configuration");
}
if (!backend.includes("https://github.com/Amoghchowdary/hari_hara")) {
  throw new Error("GitHub repository configuration mismatch");
}
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const viteConfig = readFileSync("vite.config.ts", "utf8");
if (pkg.devDependencies?.["@tanstack/router-plugin"] || pkg.dependencies?.["@tanstack/router-plugin"] ||
    viteConfig.includes("@tanstack/router-plugin") || viteConfig.includes("tanstackRouter(")) {
  throw new Error("Conflicting TanStack Router Vite plugin must not be present");
}
if (existsSync(".env")) throw new Error("Do not commit a local .env file");

// Validate the backend source only if included in the working copy.
const backendSource = "apps-script/Code.gs";
if (existsSync(backendSource)) {
  const code = readFileSync(backendSource, "utf8");
  if (!code.includes("function doPost(e)") || !code.includes("harihara:enquiry-result")) {
    throw new Error("Included Apps Script source is missing the enquiry receipt contract");
  }
  console.log("PASS: Optional Apps Script source contains expected receipt contract.");
} else {
  console.log("SKIP: Apps Script source not copied to frontend Git repository (independently deployed).");
}
console.log(`PASS: ${sourceFiles.length} frontend source files; logo, favicon, endpoint, route tree and Pages workflow checked.`);
