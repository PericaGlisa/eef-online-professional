// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).      
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isNetlify = process.env.NETLIFY === "true" || process.env.NODE_ENV === "production";

export default defineConfig({
  vite: {
    server: {
      port: 8080,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: isNetlify
    ? {
        preset: "netlify",
        output: {
          dir: ".output",
          publicDir: ".output/public",
        },
        rollup: {
          external: [
            '@tanstack/react-router',
            '@tanstack/react-query',
            '@tanstack/react-start',
            '@tanstack/react-start-client',
            '@tanstack/router-plugin',
          ],
        },
      }
    : {},
});
