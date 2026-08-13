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
import { getCanonicalProductPath } from '@/data/product-routes';

const staticPages: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats/high-voltage-electrical-insulation-mats', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats/auto-glow-reflective-band-insulating-mats', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats/bi-color-insulating-mats', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats/coloured-strip-insulating-mats', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/electrical-insulating-mats/international-iec-61111', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/waterproofing-solutions', priority: 0.8, changeFrequency: 'monthly' },
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

  // For products not already covered by static pages, generate sitemap
  // entries using the canonical route resolver. This avoids the old
  // `/products/${slug}` anti-pattern for nested products.
  const productsAlreadyInSitemap = new Set(staticPages.map((p) => p.path));

  const productEntries: MetadataRoute.Sitemap = products
    .filter((product) => {
      const canonicalPath = getCanonicalProductPath(product.slug);
      return !productsAlreadyInSitemap.has(canonicalPath);
    })
    .map((product) => ({
      url: buildUrl(getCanonicalProductPath(product.slug)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...staticEntries, ...productEntries];
}
