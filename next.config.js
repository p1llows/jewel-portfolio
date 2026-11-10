const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {(phase: string) => import("next").NextConfig} */
module.exports = (phase) => ({
  // Cloudflare Pages: static export
  output: "export",
  images: {
    unoptimized: true,
  },
  // Keep `next dev` and `next build` in separate folders. They used to share `.next`, so running a
  // build (or a second dev server) while dev was up corrupted its cache and crashed it.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});
