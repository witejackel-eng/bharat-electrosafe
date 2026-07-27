import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowIndexing ? '/' : '/',
        disallow: allowIndexing ? [] : ['/'],
      },
    ],
    sitemap: 'https://bharatelectrosafe.com/sitemap.xml',
  }
}
