import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "./wet-trades", // ✅ Fix asset paths for Electron
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // ✅ Prevent 'process is not defined' error in browser
    "process.env": {},
  },
  build: {
    rollupOptions: {
      // ✅ Exclude jspdf from browser bundle
      external: ["jspdf"],
    },
    commonjsOptions: {
      // ✅ Allow mixed ES/CommonJS modules like jspdf
      transformMixedEsModules: true,
    },
  },
}));
