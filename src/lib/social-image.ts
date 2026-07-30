/**
 * Centralised social-preview image metadata for Bharat Electrosafe.
 *
 * The OG image (`src/app/opengraph-image.png`) and Twitter image
 * (`src/app/twitter-image.png`) are 1200×630 PNGs served at the site
 * root by Next.js App Router file conventions.
 *
 * Routes that DO NOT have a product-specific social image should import
 * `siteOgImage` and `siteTwitterImage` and spread them into the route's
 * `openGraph` and `twitter` metadata objects. This guarantees every
 * route shares the same site-wide social card with accurate alt text —
 * Next.js does NOT auto-inherit the file-convention image to child
 * routes when the child route defines its own `openGraph` object
 * (even with `images` omitted), so explicit wiring is required.
 */

/** OG image URL — served at site root by App Router file convention. */
export const SITE_OG_IMAGE_URL = '/opengraph-image.png';
/** Twitter image URL — served at site root by App Router file convention. */
export const SITE_TWITTER_IMAGE_URL = '/twitter-image.png';

/**
 * Accurate alt text describing the OG/Twitter image contents.
 * Reads naturally to screen readers and social-platform crawlers.
 */
export const SITE_SOCIAL_IMAGE_ALT =
  'Bharat Electrosafe electrical insulating mat protecting a technician working in an industrial switchgear room.';

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
