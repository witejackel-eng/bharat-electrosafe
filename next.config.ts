import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Hide the floating Next.js dev indicator (the "N" badge in bottom-left)
  devIndicators: false,
  // Disable image optimization to avoid the dev-server sandbox CSP that
  // was preventing inline rendering of optimized images.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
