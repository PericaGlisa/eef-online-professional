import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tsConfigPaths(), tailwindcss()],
  },
  server: {
    port: 8080,
    strictPort: true,
  },
});
