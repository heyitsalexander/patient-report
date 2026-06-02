import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — emits a self-contained `out/` folder that can be
  // hosted on any static host (Netlify Drop, Vercel, Cloudflare Pages, S3,
  // GitHub Pages…) or served locally with `npx serve out`.
  output: "export",
  images: {
    // next/image's loader needs a server. For static export we let the
    // browser fetch the raw file directly.
    unoptimized: true,
  },
};

export default nextConfig;
