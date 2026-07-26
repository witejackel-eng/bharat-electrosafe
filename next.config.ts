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
  // Allow cross-origin dev requests from the sandbox environment
  allowedDevOrigins: ['21.0.4.238:3000', 'localhost:3000'],
};

export default nextConfig;
