import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// import * as workboxExpiration from "workbox-expiration";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "physiQ",
        short_name: "physiQ",
        description: "Your AI-powered bodybuilding assistant!",
        theme_color: "#2185d1",
        background_color: "#2185d1",
        icons: [
          {
            src: "icons/152.png",
            sizes: "152x152",
          },
          {
            src: "icons/180.png",
            sizes: "180x180",
          },
          {
            src: "icons/192.png",
            sizes: "192x192",
          },
          {
            src: "icons/512.png",
            sizes: "512x512",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // Increased limit to 10MB
        cleanupOutdatedCaches: true, // Automatically remove old caches
        clientsClaim: true, // Take control immediately
        skipWaiting: true, // Activate immediately
      },
    }),
  ],
  base: "/",
  build: {
    outDir: "./build",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash].[ext]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
