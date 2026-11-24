import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// The GH Pages workflow sets SITE_BASE_PATH to /repo-name/ by default.
// Set SITE_BASE_PATH=/ for a custom domain or a user.github.io root repository.
const base = process.env.SITE_BASE_PATH || "/";

export default defineConfig({
  base,
  server: { host: "127.0.0.1", port: 3000 },
  preview: { host: "127.0.0.1", port: 4173 },
  // Routes are loaded from the committed src/routeTree.gen.ts file.
  // The TanStack Vite router plugin is deliberately excluded to prevent ERESOLVE.
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    react(),
  ],
});
