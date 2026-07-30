/**
 * Centralised social-preview image metadata for Bharat Electrosafe.
 *
 * Two parallel copies of each social image exist:
 *   • `src/app/opengraph-image.png` and `src/app/twitter-image.png` —
 *     served at the site root by Next.js App Router file conventions
 *     (auto-emitted as <meta property="og:image"> / <meta name="twitter:image">).
 *   • `public/og/bharat-electrosafe-og-v2.png` and
 *     `public/og/bharat-electrosafe-twitter-v2.png` — explicit versioned
 *     copies served from /og/ with a `-v2` suffix so social-platform
 *     caches (which key on URL) are forced to re-fetch after a brand
 *     refresh. These are the URLs declared in `openGraph.images` /
 *     `twitter.images` so crawlers hit the versioned file directly.
 *
 * Both copies are byte-identical 1200×630 PNGs composed from the official
 * Bharat Electrosafe logo (left panel, navy background) and the approved
 * hero photograph of a technician at switchgear (right panel).
 *
 * Routes that DO NOT have a product-specific social image should import
 * `siteOgImage` and `siteTwitterImage` and spread them into the route's
 * `openGraph` and `twitter` metadata objects. This guarantees every
 * route shares the same site-wide social card with accurate alt text —
 * Next.js does NOT auto-inherit the file-convention image to child
 * routes when the child route defines its own `openGraph` object
 * (even with `images` omitted), so explicit wiring is required.
 */

/**
 * OG image URL — versioned public path so social-platform caches
 * (Facebook, LinkedIn, WhatsApp, Twitter, Slack) re-fetch after a brand
 * refresh. The same file is also served at `/opengraph-image.png` by the
 * App Router file convention, but we point crawlers at the versioned URL
 * so a future `...-v3.png` rotation is cache-bustable without touching
 * the file-convention path.
 */
export const SITE_OG_IMAGE_URL = '/og/bharat-electrosafe-og-v2.png';
/** Twitter image URL — same versioning rationale as the OG image. */
export const SITE_TWITTER_IMAGE_URL = '/og/bharat-electrosafe-twitter-v2.png';

/**
 * Accurate alt text describing the OG/Twitter image contents.
 * Reads naturally to screen readers and social-platform crawlers.
 */
export const SITE_SOCIAL_IMAGE_ALT =
  'Bharat Electrosafe electrical insulating mat protecting a technician working near industrial switchgear.';

/** OG image dimensions — both files are 1200×630 PNGs. */
export const SITE_SOCIAL_IMAGE_WIDTH = 1200;
export const SITE_SOCIAL_IMAGE_HEIGHT = 630;

/**
 * Site-wide OG image entry — spread into `openGraph.images` on routes
 * without a product-specific image.
 *
 * @example
 * import { siteOgImage } from '@/lib/social-image';
 * export const metadata = {
 *   openGraph: { ..., images: [siteOgImage] },
 * };
 */
export const siteOgImage = {
  url: SITE_OG_IMAGE_URL,
  width: SITE_SOCIAL_IMAGE_WIDTH,
  height: SITE_SOCIAL_IMAGE_HEIGHT,
  alt: SITE_SOCIAL_IMAGE_ALT,
} as const;

/**
 * Site-wide Twitter image entry — spread into `twitter.images` on
 * routes without a product-specific image.
 *
 * Provided as an object (not a bare URL string) so Next.js emits
 * `twitter:image:alt` alongside `twitter:image` — Twitter cards
 * support alt text and it improves accessibility for screen-reader
 * users browsing link previews.
 *
 * @example
 * import { siteTwitterImage } from '@/lib/social-image';
 * export const metadata = {
 *   twitter: { ..., images: [siteTwitterImage] },
 * };
 */
export const siteTwitterImage = {
  url: SITE_TWITTER_IMAGE_URL,
  width: SITE_SOCIAL_IMAGE_WIDTH,
  height: SITE_SOCIAL_IMAGE_HEIGHT,
  alt: SITE_SOCIAL_IMAGE_ALT,
} as const;
