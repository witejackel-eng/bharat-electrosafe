/**
 * Next.js 16 Metadata API — sitemap.
 *
 * Multi-page application with dedicated routes for each page and product.
 * All routes use real paths (not anchor links) for proper SEO indexing.
 */

import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { products } from '@/data/products';

const siteUrl = company.siteUrl;

const staticPages: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/about-us', priority: 0.8 },
  { path: '/contact-us', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const changeFrequency = 'monthly' as const;

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(
    ({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency,
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
