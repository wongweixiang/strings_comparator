import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/proxy": {
        target: "https://twu.tennis-warehouse.com/learning_center",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ""),
      },
    },
  },
});
