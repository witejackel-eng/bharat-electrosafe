import { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { company } from '@/data/company'

/* Derived from the product catalogue rather than hand-listed, so a new
   product can never ship with a missing sitemap entry — which is how
   BharatHydro Seal went unlisted previously. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = company.website

  const productEntries: MetadataRoute.Sitemap = products.map((product, index) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    /* The flagship mat page ranks highest; the rest sit one step below. */
    priority: index === 0 ? 0.9 : 0.8,
  }))

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...productEntries,
    {
      url: `${base}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contact-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
