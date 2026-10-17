import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import packageJson from "./package.json" with { type: "json" };

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      ...(mode === "production" && {
        "console.log": "() => {}",
      }),
    },

    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.PORT_FE) || 5173,
      host: true,
      strictPort: true,
      allowedHosts: [
        "localhost",
        "127.0.0.1",
        "company.com",
        ...(env.VITE_ALLOWED_HOSTS ? env.VITE_ALLOWED_HOSTS.split(",") : []),
      ],

      // WSL2 (/mnt/*) tidak support inotify — pakai polling agar HMR detect perubahan.
      // di macOS / native Linux, tidak perlu ini (default fs.watch sudah jalan).
      watch: {
        usePolling: true,
        interval: 300,
        ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
      },

      proxy: {
        "/api": {
          target: env.VITE_API_TARGET || "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
      },
    },

    preview: {
      port: parseInt(env.PORT_PREVIEW) || 4173,
      host: true,
      strictPort: true,
      allowedHosts: true,
    },

    build: {
      target: "esnext",
      sourcemap: mode !== "production",
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (
                id.includes("react") ||
                id.includes("react-dom") ||
                id.includes("react-router")
              ) {
                return "vendor-react";
              }
              if (
                id.includes("lodash") ||
                id.includes("axios") ||
                id.includes("date-fns")
              ) {
                return "vendor-libs";
              }
              return "vendor-misc";
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },

    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },

    envPrefix: ["VITE_", "APP_"],
  };
});
