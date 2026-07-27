# Task 6 — SEO Files (sitemap, robots, structured data)

## Files created / modified

### New files
- **`src/app/sitemap.ts`** — Next.js 16 Metadata API `sitemap()` returning 9 URLs (root + 2 section anchors + 6 product-family anchors), each with `lastModified`, `changeFrequency: 'monthly'`, and priority (1.0 for `/`, 0.8 for sections). URLs built from `company.siteUrl`.
- **`src/app/robots.ts`** — Next.js 16 `robots()` function. Indexing gated by `NEXT_PUBLIC_ALLOW_INDEXING === 'true'` (default false → disallow all). Always references `${company.siteUrl}/sitemap.xml`.
- **`src/components/structured-data.tsx`** — Server component (no `'use client'`) rendering JSON-LD `<script>` tags:
  - 6 `Product` entries (one per family): `name`, `description`, `brand`, `manufacturer`, `category`, `url`. **No** prices, offers, availability, ratings, reviews, SKUs, GTINs, or invented technical values (master prompt section 23).
  - 1 `WebSite` entry with site name, URL, publisher (no SearchAction — the site has no search UI).
  - BharatMembrane description mentions "PVC Geo-Membrane" and "IS 15909:2020". BharatHydro Seal description mentions "Water Stop Solutions" and "IS 15058-2002".
  - Named + default export `ProductStructuredData`.

### Modified
- **`src/app/page.tsx`** — Removed `'use client'` directive; imported and rendered `<ProductStructuredData />` so the JSON-LD reaches crawlers in the initial server-rendered HTML.

### Deleted
- **`public/robots.txt`** — static file conflicted with the Next.js `robots()` route (was throwing 500 "A conflicting public file and page file was found for path /robots.txt"). The Metadata API route now serves `/robots.txt` dynamically.

## Verification (live against the dev server)
- `bun run lint` → clean, no errors / warnings.
- `GET /sitemap.xml` → 9 `<url>` entries, correct priorities (1.0 root, 0.8 sections), `monthly` changefreq.
- `GET /robots.txt` → `User-Agent: * Disallow: /` + `Sitemap: …/sitemap.xml` (indexing off by default).
- `GET /` → 8 JSON-LD blocks rendered server-side: 1 Organization (from `layout.tsx`), 6 Product, 1 WebSite.
- Product schema key set verified: `[@context, @type, name, description, brand, manufacturer, category, url]` — no forbidden keys (price / offers / availability / aggregateRating / review / sku / gtin / mpn / priceSpecification).
- BharatMembrane & BharatHydro Seal descriptions verified to mention required standard tokens.

## Compliance with master prompt (section 23)
- No prices, offers, availability, ratings, reviews, fake SKUs, fake GTINs, or invented technical values.
- Visible copy and schema descriptions match (both originate from `products.ts`).
- Engineered-membrane products explicitly mention their applicable IS standard in the schema description.

## Worklog
Appended a full entry to `/home/z/my-project/worklog.md` (Task ID 6, Agent: SEO/Structured-Data Agent).
