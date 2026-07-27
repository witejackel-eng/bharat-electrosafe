import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "localhost:3000",
    "preview-chat-cb98e181-7db8-44f2-b1fc-f5f531db8ef1.space-z.ai",
  ],

  /* ── Legacy PHP URL Redirects (permanent 301) ── */
  redirects: async () => [
    // Homepage
    {
      source: "/index.php",
      destination: "/",
      permanent: true,
    },
    // Product pages
    {
      source: "/electrical-insulating-mats.php",
      destination: "/products/electrical-insulating-mats",
      permanent: true,
    },
    {
      source: "/coloured-strip-insulating-mats.php",
      destination: "/products/coloured-strip-insulating-mats",
      permanent: true,
    },
    {
      source: "/bi-color-insulating-mats.php",
      destination: "/products/bi-color-insulating-mats",
      permanent: true,
    },
    {
      source: "/auto-glow-reflective-band-insulating-mat.php",
      destination: "/products/auto-glow-reflective-band-insulating-mats",
      permanent: true,
    },
    {
      source: "/bharat-membrane.php",
      destination: "/products/bharat-membrane",
      permanent: true,
    },
    // Company pages
    {
      source: "/about-us.php",
      destination: "/about-us",
      permanent: true,
    },
    {
      source: "/about.php",
      destination: "/about-us",
      permanent: true,
    },
    {
      source: "/contact-us.php",
      destination: "/contact-us",
      permanent: true,
    },
    {
      source: "/contact.php",
      destination: "/contact-us",
      permanent: true,
    },
    // Legal pages
    {
      source: "/privacy-policy.php",
      destination: "/privacy-policy",
      permanent: true,
    },
    {
      source: "/terms.php",
      destination: "/terms",
      permanent: true,
    },
  ],

  /* ── Security Headers ── */
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        // HSTS only in production when domain has HTTPS
        // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com data:; " +
            "img-src 'self' data: blob: https://bharatelectrosafe.com; " +
            "connect-src 'self'; " +
            "frame-src 'none'; " +
            "object-src 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self';",
        },
      ],
    },
  ],
};

export default nextConfig;
