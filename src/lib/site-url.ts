/**
 * Central site URL helper — single source for all URL construction.
 *
 * Every canonical, sitemap entry, robots.txt host, Open Graph URL and
 * JSON-LD url field must route through this module. No component, page
 * or data file may build production URLs independently.
 *
 * The canonical domain is always https://bharatelectrosafe.com in
 * production. Preview and local deployments may use a different URL
 * for content resolution, but structured metadata must never identify
 * a Vercel preview URL as the permanent public domain.
 *
 * ── Indexing guard ──
 *
 * Indexing is enabled ONLY when ALL of the following are true:
 *
 *   1. NEXT_PUBLIC_ALLOW_INDEXING === 'true'
 *   2. The resolved site URL is exactly https://bharatelectrosafe.com
 *   3. The deployment is production (VERCEL_ENV === 'production'),
 *      or VERCEL_ENV is unset (local development / non-Vercel hosting
 *      where the operator is responsible for setting the env correctly)
 *
 * This prevents a preview deployment from becoming indexable even if
 * NEXT_PUBLIC_ALLOW_INDEXING=true is accidentally inherited from the
 * Production environment, because preview deployments either:
 *   - have VERCEL_ENV === 'preview' (condition 3 fails), or
 *   - have a *.vercel.app URL that does not match condition 2.
 */

/** The official production domain — hardcoded as the canonical fallback. */
export const PRODUCTION_DOMAIN = 'https://bharatelectrosafe.com';

/**
 * Resolved site URL. Uses NEXT_PUBLIC_SITE_URL when set; otherwise falls
 * back to the permanent production domain so that metadata never accidentally
 * identifies a preview deployment as the canonical origin.
 */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || PRODUCTION_DOMAIN;

/**
 * Whether the current deployment is a Vercel production deployment.
 * VERCEL_ENV is set by Vercel to 'production', 'preview', or 'development'.
 * When VERCEL_ENV is unset (local dev or non-Vercel hosting), we treat it
 * as 'production' so the operator controls indexing via NEXT_PUBLIC_SITE_URL
 * and NEXT_PUBLIC_ALLOW_INDEXING alone.
 */
const isVercelProduction =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';

/**
 * Whether the resolved site URL is exactly the official production domain.
 * This prevents preview URLs (*.vercel.app) from ever being treated as
 * indexable, even if NEXT_PUBLIC_SITE_URL is misconfigured.
 */
const isOfficialDomain = siteUrl === PRODUCTION_DOMAIN;

/**
 * Whether indexing is enabled. Triple-gated so that no single
 * misconfiguration can expose a non-production deployment:
 *
 *   1. NEXT_PUBLIC_ALLOW_INDEXING === 'true' (explicit opt-in)
 *   2. siteUrl === 'https://bharatelectrosafe.com' (official domain)
 *   3. VERCEL_ENV is 'production' or unset (not a Vercel preview)
 *
 * Defaults to false for local, preview and staging environments.
 */
export const allowIndexing: boolean =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' &&
  isOfficialDomain &&
  isVercelProduction;

/**
 * Build an absolute URL for a given path, using the central site URL.
 * Strips trailing slashes to avoid canonical duplication.
 *
 * @param path — route path, e.g. '/', '/about-us', '/products/electrical-insulating-mats'
 * @returns absolute URL, e.g. 'https://bharatelectrosafe.com/about-us'
 */
export function buildUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Homepage is the only route that ends with a slash at domain level.
  if (cleanPath === '/') return siteUrl;
  return `${siteUrl}${cleanPath}`;
}
