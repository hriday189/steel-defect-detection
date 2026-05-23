import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

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
      // Proxy all /api/* requests to FastAPI backend
      "/api": {
  target: "https://steel-defect-detection-3tu7.onrender.com",
  changeOrigin: true,
  rewrite: (path) => path.replace(/^\/api/, ""),
},
    },
  },
})
