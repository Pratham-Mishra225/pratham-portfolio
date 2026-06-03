// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Enable Nitro with the Vercel preset.
  // This activates Vercel Build Output API v3: output goes to .vercel/output/
  // with proper serverless function wrappers, static asset placement, and
  // auto-generated routing config — no manual vercel.json routes needed.
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output",
      publicDir: ".vercel/output/static",
      serverDir: ".vercel/output/functions",
    },
    // Nitro vercel preset option — not in Lovable's narrowed `nitro` types yet, but forwarded at build time.
    ...({
      vercel: { functions: { runtime: "nodejs20.x" } },
    } as Record<string, unknown>),
  },
});
