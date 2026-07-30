import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://bharatelectrosafe.com';

/**
 * Content-Security-Policy.
 *
 * Uses `script-src 'self' 'unsafe-inline'` so Next.js inline bootstrap
 * scripts are not blocked. `unsafe-eval` is never added. Resend is
 * server-side only and is not listed in browser connect-src.
 *
 * The `unsafe-inline` limitation is a known moderate residual risk for
 * this static marketing site. A nonce-based CSP would require dynamic
 * rendering or middleware that adds architectural complexity beyond
 * what is justified for this content-first site.
 */
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "manifest-src 'self'",
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
  /* HSTS: using a safe rollout value without preload. The preload list
     requires the client to control all subdomains and support HTTPS on
     every one. If that is verified, preload can be added later. */
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains',
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ['http://127.0.0.1', 'http://localhost'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // Permanent PHP → new-route redirects
    const phpRedirects: Array<{ source: string; destination: string }> = [
      { source: '/index.php', destination: '/' },
      { source: '/about-us.php', destination: '/about-us' },
      { source: '/contact-us.php', destination: '/contact-us' },
      { source: '/electrical-insulating-mats.php', destination: '/products/electrical-insulating-mats' },
      { source: '/coloured-strip-insulating-mats.php', destination: '/products/coloured-strip-insulating-mats' },
      { source: '/bi-color-insulating-mats.php', destination: '/products/bi-color-insulating-mats' },
      { source: '/auto-glow-reflective-band-insulating-mat.php', destination: '/products/auto-glow-reflective-band-insulating-mats' },
      { source: '/bharat-membrane.php', destination: '/products/bharat-membrane' },
      { source: '/BharatHydro-Seal.php', destination: '/products/bharat-hydro-seal' },
    ];

    return [
      ...phpRedirects.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
export { siteUrl };
