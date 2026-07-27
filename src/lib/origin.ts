/**
 * Origin validation utilities for cross-site form protection.
 *
 * Section 16 of the corrective-engineering master prompt:
 * do NOT use `startsWith()` — compare parsed origins exactly.
 *
 * The allow-list is built from:
 *   - NEXT_PUBLIC_SITE_URL
 *   - VERCEL_URL (current deployment, https prepended if no protocol)
 *   - http://localhost:3000 (only when NODE_ENV !== 'production')
 *
 * This keeps the contact route file focused on email logic while
 * origin validation lives in one auditable place.
 */

/**
 * Parse a raw header value (origin, referer, etc.) and return its origin.
 * Returns null if the value is empty or not a valid URL.
 */
export function parseOrigin(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/**
 * Build the list of origins that are allowed to submit the contact form.
 * Computed fresh on every call so environment changes (preview deploys,
 * local dev) are picked up without module-level caching.
 */
export function getAllowedOrigins(): string[] {
  const allowed = new Set<string>();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    const parsed = parseOrigin(siteUrl);
    if (parsed) allowed.add(parsed);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    // VERCEL_URL comes in as "project-xyz.vercel.app" (no protocol).
    const withProtocol = /^https?:\/\//i.test(vercelUrl)
      ? vercelUrl
      : `https://${vercelUrl}`;
    const parsed = parseOrigin(withProtocol);
    if (parsed) allowed.add(parsed);
  }

  if (process.env.NODE_ENV !== 'production') {
    allowed.add('http://localhost:3000');
  }

  return Array.from(allowed);
}

/**
 * Exact-origin comparison. Rejects null and any value whose parsed origin
 * is not in the allow-list. Never uses substring/startsWith matching.
 */
export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return false;
  const parsed = parseOrigin(origin);
  if (!parsed) return false;
  return getAllowedOrigins().includes(parsed);
}
