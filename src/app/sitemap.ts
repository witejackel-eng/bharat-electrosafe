/**
 * Next.js Metadata API — sitemap.
 *
 * Contains all valid public routes: homepage, about, contact and
 * every product page. Uses the central site URL helper so that
 * every entry resolves against the official production domain.
 *
 * When indexing is disabled, returns an empty array so that no
 * misleading production URLs are exposed from staging/preview.
 *
 * lastModified is intentionally omitted — we do not falsely tell search
 * engines that every page changes on every deployment. If reliable
 * content-modification dates become available in future, they can be
 * added per-entry.
 */

import type { MetadataRoute } from 'next';
import { buildUrl, allowIndexing } from '@/lib/site-url';
import { products } from '@/data/products';

const staticPages: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats/high-voltage-electrical-insulation-mats', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/waterproofing-solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/international-iec-61111', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/pvc-flooring-solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/other-products', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact-us', priority: 0.8, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // When indexing is disabled, do not expose a misleading production sitemap
  if (!allowIndexing) {
    return [];
  }

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(
    ({ path, priority, changeFrequency }) => ({
      url: buildUrl(path),
      changeFrequency,
      priority,
    }),
  );

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: buildUrl(`/products/${product.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // /products/electrical-insulating-mats is now a family hub (included as a
  // static page above), not a product-detail page. Remove its product-slug
  // entry to avoid a duplicate sitemap URL.
  const filteredProductEntries = productEntries.filter(
    (entry) => !entry.url.endsWith('/products/electrical-insulating-mats'),
  );

  return [...staticEntries, ...filteredProductEntries];
}
