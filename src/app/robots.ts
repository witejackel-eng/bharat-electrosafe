/**
 * Next.js Metadata API — robots.
 *
 * Indexing is gated by NEXT_PUBLIC_ALLOW_INDEXING. Defaults to off
 * (false) for local, preview and staging. When enabled (true) only
 * in the production environment, the entire site is allowed for
 * crawling and the production sitemap URL is exposed.
 *
 * When indexing is disabled, robots.txt disallows all crawling and
 * page-level metadata emits noindex/nofollow — this prevents search
 * engines from accidentally indexing non-production URLs.
 *
 * robots.txt and page-level robots metadata must agree:
 * - Production: robots.txt allows all; page metadata allows index.
 * - Preview/staging: robots.txt disallows all; page metadata noindex.
 */

import type { MetadataRoute } from 'next';
import { siteUrl, allowIndexing } from '@/lib/site-url';

const sitemapUrl = `${siteUrl}/sitemap.xml`;

export default function robots(): MetadataRoute.Robots {
  if (allowIndexing) {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      sitemap: sitemapUrl,
      host: siteUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    /* When indexing is disabled, do not expose the sitemap URL —
       it would point crawlers at pages that are noindex. */
  };
}
