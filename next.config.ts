import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Pin the workspace root. Without this, Turbopack walks up the directory
     tree looking for a lockfile and can select an unrelated parent folder as
     the root, then fail resolving modules that belong to a different project.
     Pinning it makes the build independent of what sits above the repo. */
  turbopack: {
    root: projectRoot,
  },
  devIndicators: false,

  /* Every image the site renders is a local, sanitised derivative under
     /public/media, so the optimiser only ever reads from disk. Formats are
     ordered AVIF-first with a WebP fallback. */
  /* WebP only: the bundled sharp build in this toolchain has no AVIF
     encoder, so advertising AVIF here would fail at request time. */
  images: {
    formats: ["image/webp"],
    deviceSizes: [480, 768, 1024, 1440, 1920],
  },

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
    /* The legacy path is mixed-case. Next matches `source` case-sensitively,
       so the lowercase variant is listed too — some clients lowercase paths. */
    {
      source: "/BharatHydro-Seal.php",
      destination: "/products/bharat-hydro-seal",
      permanent: true,
    },
    {
      source: "/bharathydro-seal.php",
      destination: "/products/bharat-hydro-seal",
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

    /* ── Slug-variant redirects ──
       Earlier revisions of this site used British "colour" spelling and an
       unhyphenated membrane slug. Keep these permanent so any external or
       indexed link still resolves to the canonical route. */
    {
      source: "/products/bi-colour-insulating-mats",
      destination: "/products/bi-color-insulating-mats",
      permanent: true,
    },
    {
      source: "/products/bharatmembrane",
      destination: "/products/bharat-membrane",
      permanent: true,
    },
    {
      source: "/products/auto-glow-reflective-band-insulating-mat",
      destination: "/products/auto-glow-reflective-band-insulating-mats",
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
