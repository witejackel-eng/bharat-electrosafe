import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://bharat-electrosafe.vercel.app';

/**
 * Content-Security-Policy.
 *
 * Interim policy uses `script-src 'self' 'unsafe-inline'` so Next.js inline
 * bootstrap scripts are not blocked. `unsafe-eval` is never added.
 * Resend is server-side only and is not listed in browser connect-src.
 */
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  isProduction ? 'upgrade-insecure-requests' : '',
].filter(Boolean);

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader.join('; '),
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()',
  },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // Permanent PHP → new-route redirects (section 20)
    const phpRedirects: Array<{ source: string; destination: string }> = [
      { source: '/index.php', destination: '/' },
      { source: '/about-us.php', destination: '/#about' },
      { source: '/contact-us.php', destination: '/#contact' },
      {
        source: '/electrical-insulating-mats.php',
        destination: '/#electrical-insulating-mats',
      },
      {
        source: '/coloured-strip-insulating-mats.php',
        destination: '/#coloured-strip-insulating-mats',
      },
      {
        source: '/bi-color-insulating-mats.php',
        destination: '/#bi-color-insulating-mats',
      },
      {
        source: '/auto-glow-reflective-band-insulating-mat.php',
        destination: '/#auto-glow-reflective-band-insulating-mat',
      },
      { source: '/bharat-membrane.php', destination: '/#bharat-membrane' },
      { source: '/BharatHydro-Seal.php', destination: '/#bharat-hydro-seal' },
    ];

    return phpRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
export { siteUrl };
