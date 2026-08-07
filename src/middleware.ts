/**
 * Next.js Middleware — Canonical Domain Enforcement & Host Redirects.
 *
 * Guarantees that only https://bharatelectrosafe.com is the indexable
 * canonical origin. All other hosts that reach this middleware are
 * permanently redirected to the corresponding canonical URL.
 *
 * Redirect rules (in priority order):
 *
 *   1. www.bharatelectrosafe.com → bharatelectrosafe.com  (308)
 *   2. bharat-electrosafe.vercel.app → bharatelectrosafe.com  (308)
 *   3. Any other *.vercel.app production alias → bharatelectrosafe.com  (308)
 *
 * Safety guards:
 *   - Never redirect localhost / 127.0.0.1 (local development)
 *   - Never redirect Vercel preview deployments (*-git-*.vercel.app)
 *     so they remain usable for QA / PR previews
 *   - Preserve path and query string during redirect
 *   - Use 308 (permanent) to preserve method and preclude redirect loops
 *
 * Vercel guarantees HTTPS on production, so every request reaching this
 * middleware already uses HTTPS in production.
 */

import { NextRequest, NextResponse } from 'next/server';

/** The canonical production origin — must match src/lib/site-url.ts */
const CANONICAL_ORIGIN = 'https://bharatelectrosafe.com';
const CANONICAL_HOST = 'bharatelectrosafe.com';

/** Hosts that must redirect to the canonical domain */
const WWW_HOST = 'www.bharatelectrosafe.com';
const VERCEL_PRODUCTION_ALIAS = 'bharat-electrosafe.vercel.app';

/**
 * Vercel preview deployments follow the pattern:
 *   {project}-git-{branch}-{hash}.vercel.app
 *   {project}-{hash}.vercel.app (unique deployment URL)
 *
 * We must NOT redirect these — they are used for PR previews and QA.
 * Only the stable production alias needs redirecting.
 */

function shouldRedirectToCanonical(host: string): boolean {
  if (!host) return false;

  // Local development — never redirect
  if (host === 'localhost' || host === '127.0.0.1') return false;

  // Exact canonical host — no redirect needed
  if (host === CANONICAL_HOST) return false;

  // www subdomain — redirect to canonical
  if (host === WWW_HOST) return true;

  // Vercel production alias — redirect to canonical
  if (host === VERCEL_PRODUCTION_ALIAS) return true;

  // All other hosts (preview deployments, custom domains, etc.) — do not redirect
  // Preview deployments like bharat-electrosafe-git-*.vercel.app must remain usable
  return false;
}

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const host = nextUrl.hostname;

  if (shouldRedirectToCanonical(host)) {
    const canonicalUrl = new URL(nextUrl.pathname + nextUrl.search, CANONICAL_ORIGIN);
    return NextResponse.redirect(canonicalUrl, 308);
  }

  return NextResponse.next();
}

/**
 * Matcher — run middleware on all routes except:
 *   - _next/static (static assets)
 *   - _next/image (image optimization)
 *   - favicon.ico and other static files in public/
 *
 * This avoids unnecessary middleware execution on static assets while
 * ensuring all page routes and API routes are covered.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except those starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon-*.png, apple-touch-icon.png
     * - icons/, og/, images/, media/, brand/, documents/ (static public assets)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|favicon-|apple-touch-icon|icons/|og/|images/|media/|brand/|documents/|robots\\.txt|llms\\.txt).*)',
  ],
};
