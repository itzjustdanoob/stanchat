import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ routesDirectory: "./src/src/routes", generatedRouteTree: "./src/src/routeTree.gen.ts" }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/src"),
    },
  },
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5050",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    cssMinify: false,
  },
});
