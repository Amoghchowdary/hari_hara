import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// V8 is explicitly deployed at the root of the verified custom domain.
// Never build /hari_hara/ asset URLs for this deployment.
export default defineConfig({
  base: "/",
  server: { host: "127.0.0.1", port: 3000 },
  preview: { host: "127.0.0.1", port: 4173 },
  plugins: [tailwindcss(), tsconfigPaths(), react()],
});
