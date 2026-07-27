/**
 * Next.js 16 Metadata API — sitemap.
 *
 * Single-page application with one root route (`/`). To help search engines
 * understand the in-page sections (about, contact, six product families) we
 * expose anchor URLs in the sitemap. Anchor URLs are a recognised convention
 * that points crawlers to the relevant section of the page.
 *
 * Note: this project has only the `/` route; no other routes exist.
 */

import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { products } from '@/data/products';

const siteUrl = company.siteUrl;

/**
 * Static in-page sections that have meaning beyond the six product families.
 */
const staticSections: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/#about', priority: 0.8 },
  { path: '/#contact', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const changeFrequency = 'monthly' as const;

  const staticEntries: MetadataRoute.Sitemap = staticSections.map(
    ({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  // One sitemap entry per product family — anchored to the section slug.
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/#${product.slug}`,
    lastModified,
    changeFrequency,
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
