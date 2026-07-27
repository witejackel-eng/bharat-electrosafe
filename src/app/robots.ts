/**
 * Next.js 16 Metadata API — robots.
 *
 * Indexing is gated by the `NEXT_PUBLIC_ALLOW_INDEXING` environment variable.
 * Defaults to "off" to avoid indexing the site in preview / staging
 * environments. When enabled, the entire site is allowed for crawling and
 * the sitemap URL is exposed to all user agents.
 */

import type { MetadataRoute } from 'next';
import { company } from '@/data/company';

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
const sitemapUrl = `${company.siteUrl}/sitemap.xml`;

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
      host: company.siteUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    sitemap: sitemapUrl,
  };
}
