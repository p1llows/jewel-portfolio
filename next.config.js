/** @type {import("next").NextConfig} */
const nextConfig = {
  // Cloudflare Pages: use static export for most pages
  // API routes require server-side rendering
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
