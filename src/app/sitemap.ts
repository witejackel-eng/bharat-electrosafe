/**
 * Next.js Metadata API — sitemap.
 *
 * Contains all valid public routes: homepage, about, contact and
 * every product page. Uses the central site URL helper so that
 * every entry resolves against the official production domain.
 *
 * lastModified is omitted unless a genuine content update date is
 * available — we do not falsely tell search engines that every page
 * changes on every deployment.
 */

import type { MetadataRoute } from 'next';
import { buildUrl } from '@/lib/site-url';
import { products } from '@/data/products';

const staticPages: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact-us', priority: 0.8, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...staticEntries, ...productEntries];
}
