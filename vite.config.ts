import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain Vite + React single-page app. `vite build` emits a static site to dist/;
// client-side routing is handled by React Router, with vercel.json providing the
// SPA fallback so deep links like /app resolve to index.html.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist",
  },
});
