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
 */

/** The official production domain — hardcoded as the canonical fallback. */
const PRODUCTION_DOMAIN = 'https://bharatelectrosafe.com';

/**
 * Resolved site URL. Uses NEXT_PUBLIC_SITE_URL when set; otherwise falls
 * back to the permanent production domain so that metadata never accidentally
 * identifies a preview deployment as the canonical origin.
 */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || PRODUCTION_DOMAIN;

/**
 * Whether indexing is explicitly enabled. Only true when
 * NEXT_PUBLIC_ALLOW_INDEXING === 'true'. Defaults to false for
 * local, preview and staging environments.
 */
export const allowIndexing: boolean =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

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
