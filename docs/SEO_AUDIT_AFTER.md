# SEO Audit — AFTER

This document records the state of the Bharat Electrosafe website's
SEO implementation **after** the technical-SEO pass. It is the
companion to `docs/SEO_AUDIT_BEFORE.md`.

Lighthouse SEO scores below are not claimed here — they require a
live production deployment against the canonical domain
`https://bharatelectrosafe.com` with the production environment
variables set. The code-level work is complete; the remaining items
are external launch actions in `docs/SEO_LAUNCH_CHECKLIST.md`.

---

## Changes applied in this pass

### 1. Structured data (spec section 17)

| Change | File(s) | Before | After |
|---|---|---|---|
| Remove FAQPage JSON-LD from homepage | `src/app/page.tsx` | `<FAQStructuredData path="/" faqs={homeFaqs} />` | Removed — visible FAQ accordion retained |
| Remove FAQPage JSON-LD from product pages | `src/app/products/*/page.tsx` (6 files) | `<ProductPageStructuredData … faqs={faqs} />` | `<ProductPageStructuredData productSlug="…" />` |
| Remove FAQPage schema generator | `src/lib/structured-data.ts` | `faqSchema()` exported | `faqSchema()` removed |
| Remove FAQStructuredData component | `src/components/structured-data.tsx` | `FAQStructuredData` exported | Removed |
| Remove LocalBusiness schema | `src/lib/structured-data.ts`, `src/components/structured-data.tsx` | Homepage emitted Organization + WebSite + LocalBusiness | Homepage emits Organization + WebSite only |
| Convert Product schema → WebPage | `src/lib/structured-data.ts`, `src/components/structured-data.tsx` | `productSchema()` emitted `@type: Product` | `productPageSchema()` emits `@type: WebPage` |
| Add CollectionPage + ItemList to products hub | `src/lib/structured-data.ts`, `src/components/structured-data.tsx` | Products hub emitted BreadcrumbList only | Products hub emits CollectionPage (with ItemList) + BreadcrumbList |
| Remove `LOCAL_BUSINESS_ID` | `src/lib/structured-data.ts` | Exported | Removed |

### 2. HTML language (spec section 24)

| Change | File | Before | After |
|---|---|---|---|
| Set `lang="en-IN"` | `src/app/layout.tsx` | `<html lang="en">` | `<html lang="en-IN">` |

### 3. Contact page title (spec section 10)

| Change | File | Before | After |
|---|---|---|---|
| Update Contact page title | `src/app/contact-us/page.tsx` | `Contact Bharat Electrosafe` | `Contact Bharat Electrosafe for Product Enquiries` |

### 4. Documentation (spec sections 4, 29, 35)

| New file | Purpose |
|---|---|
| `docs/SEO_REDIRECT_MAP.csv` | Complete legacy-PHP → clean-route redirect map (spec section 4) |
| `docs/SEO_LAUNCH_CHECKLIST.md` | External launch actions for Vercel, GSC, BWT, GBP, DNS (spec section 29) |
| `docs/SEO_AUDIT_BEFORE.md` | Baseline audit (spec section 35) |
| `docs/SEO_AUDIT_AFTER.md` | This document (spec section 35) |

### 5. Automated SEO tests (spec section 34)

| New file | Coverage |
|---|---|
| `tests/a11y/seo-regression.spec.ts` | HTTP 200, unique title, unique description, exactly one canonical, canonical uses canonical origin, exactly one H1, html lang present, no production noindex, OG title/description/image, Twitter card, favicon, main content, no horizontal overflow, no broken internal links, production robots allows crawling, preview robots blocks, sitemap 200, sitemap contains all 6 products, every sitemap URL 200, no sitemap URL redirects, every sitemap URL canonical, legacy PHP routes redirect directly, 404 returns 404, favicon returns image, OG image 1200×630, JSON-LD parses, FAQPage absent, no fake offers/reviews/ratings, civil products do not contain electrical-mat certification claims |

### 6. Lighthouse CI (spec section 35)

| New file | Purpose |
|---|---|
| `lighthouserc.json` | Lighthouse CI configuration targeting 7 priority routes with `categories:seo` minimum score `1.0` |

---

## Post-pass route inventory

All 10 canonical routes return 200 on the production build and emit
the corrected structured data:

| Route | HTTP | H1 | Canonical | Title | OG | Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|
| `/` | 200 | 1 | `https://bharatelectrosafe.com/` | Unique | ✅ | ✅ | Organization + WebSite |
| `/products` | 200 | 1 | `https://bharatelectrosafe.com/products` | Unique | ✅ | ✅ | CollectionPage + BreadcrumbList |
| `/products/electrical-insulating-mats` | 200 | 1 | Self | Unique | ✅ | ✅ | WebPage + BreadcrumbList |
| `/products/coloured-strip-insulating-mats` | 200 | 1 | Self | Unique | ✅ | ✅ | WebPage + BreadcrumbList |
| `/products/bi-color-insulating-mats` | 200 | 1 | Self | Unique | ✅ | ✅ | WebPage + BreadcrumbList |
| `/products/auto-glow-reflective-band-insulating-mats` | 200 | 1 | Self | Unique | ✅ | ✅ | WebPage + BreadcrumbList |
| `/products/bharat-membrane` | 200 | 1 | Self | Unique | ✅ | ✅ | WebPage + BreadcrumbList |
| `/products/bharat-hydro-seal` | 200 | 1 | Self | Unique | ✅ | ✅ | WebPage + BreadcrumbList |
| `/about-us` | 200 | 1 | Self | Unique | ✅ | ✅ | BreadcrumbList |
| `/contact-us` | 200 | 1 | Self | Unique | ✅ | ✅ | BreadcrumbList |

## Structured-data summary (per route)

| Route | JSON-LD types emitted | JSON-LD types removed |
|---|---|---|
| `/` | Organization, WebSite | LocalBusiness, FAQPage |
| `/products` | CollectionPage (with ItemList), BreadcrumbList | — |
| `/products/*` (×6) | WebPage, BreadcrumbList | Product, FAQPage |
| `/about-us` | BreadcrumbList | — |
| `/contact-us` | BreadcrumbList | — |

## Canonical domain policy

- ✅ `canonicalOrigin` hardcoded to `https://bharatelectrosafe.com`.
- ✅ All canonical/sitemap/JSON-LD/OG URLs route through `buildUrl()`.
- ✅ `metadataBase` uses `deploymentOrigin` (preview-safe).
- ✅ Vercel alias `bharat-electrosafe.vercel.app` is never used as a
  canonical URL, sitemap URL, Organisation URL, product URL, OG URL,
  or structured-data entity URL.

## Indexing guard

- ✅ `robots.txt` is gated by `allowIndexing`.
- ✅ Page-level `robots` metadata is gated by `allowIndexing`.
- ✅ Preview deployments emit `noindex,nofollow`.
- ✅ Production deployments (when `NEXT_PUBLIC_ALLOW_INDEXING=true`
  AND `VERCEL_ENV=production`) emit `index,follow`.

## Legacy PHP redirects

- ✅ All 9 PHP routes redirect with `permanent: true` (301).
- ✅ `docs/SEO_REDIRECT_MAP.csv` documents every redirect.
- ✅ Direct one-hop redirects (no chains).
- ✅ Case-sensitive legacy path `/BharatHydro-Seal.php` preserved.

## robots.txt

- ✅ Production: `User-agent: *` / `Allow: /` / sitemap reference /
  host.
- ✅ Preview: `User-agent: *` / `Disallow: /` / no sitemap reference.
- ✅ Does not block JavaScript, CSS, images, `/_next/` or product
  images.

## XML sitemap

- ✅ Contains all 10 canonical routes.
- ✅ Canonical absolute URLs.
- ✅ No PHP URLs, no Vercel URLs, no API routes, no 404 pages, no
  redirecting URLs, no duplicate variants.
- ✅ Omits `lastModified` (no fake build-time dates).

## Page-level canonicals

- ✅ Every route emits exactly one self-referencing canonical.
- ✅ All canonicals use the canonical origin.
- ✅ No child page inherits the homepage canonical.
- ✅ No Vercel, www, or HTTP canonicals.

## Site-wide metadata

- ✅ Title default and template match spec section 9.
- ✅ Homepage description matches spec section 9.
- ✅ `metadataBase`, `applicationName`, `publisher`, `creator`,
  `robots`, OG, Twitter, icons, manifest, theme colour all
  configured.
- ✅ No `meta-keywords` tag.
- ✅ `<html lang="en-IN">`.
- ✅ Google Search Console verification meta tag is emitted only when
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set.

## Unique route metadata

- ✅ Every route has a unique title and description matching spec
  section 10.
- ✅ Contact page title is
  `Contact Bharat Electrosafe for Product Enquiries`.
- ✅ No keyword stuffing, no repeated titles or descriptions.

## Open Graph, Twitter, favicon

- ✅ Favicon system complete (icon.svg, favicon.ico, apple-icon.png,
  192px, 512px, maskable variants).
- ✅ OG image and Twitter image are 1200×630, served via App Router
  file conventions with alt-text companions.
- ✅ Manifest configured with correct brand colours and icons.
- ✅ Every child route inherits a valid social image unless it has an
  intentional route-specific image (6 product routes do).

## HTML and heading structure

- ✅ Every page has exactly one H1.
- ✅ Logical H2/H3 hierarchy.
- ✅ Semantic landmarks, crawlable navigation and footer.
- ✅ Expandable biography and FAQ content is in the rendered DOM.

## Internal linking

- ✅ Homepage → Products hub + all 6 product cards.
- ✅ Products hub → all 6 product pages.
- ✅ Every product page → Products hub (breadcrumb) + 2–3 related
  products.
- ✅ About and Contact in header and footer.
- ✅ Breadcrumbs use anchor elements.
- ✅ Descriptive anchor text (no "click here" / "learn more" for key
  navigation).

## Breadcrumbs

- ✅ Visible breadcrumbs on Products hub, all product pages, About,
  Contact.
- ✅ `BreadcrumbList` JSON-LD matches visible breadcrumb.
- ✅ Canonical URLs, correct positions, no duplication.

## Image SEO

- ✅ Descriptive filenames, accurate alt text.
- ✅ Explicit width/height, stable aspect ratios.
- ✅ WebP format.
- ✅ LCP image loads eagerly with `priority`.
- ✅ Below-the-fold images lazy-loaded.
- ✅ Responsive `sizes`.

## Mobile-first indexing

- ✅ Mobile and desktop contain equivalent content.
- ✅ No content hidden behind hover-only interactions.
- ✅ Responsive 360px–1920px.

## Accessibility (supporting SEO)

- ✅ `<html lang="en-IN">`.
- ✅ Skip link, main landmark, footer landmark.
- ✅ Labelled form fields, visible keyboard focus.
- ✅ Accessible menu controls and accordions.
- ✅ Sufficient contrast.
- ✅ Logical heading order.
- ✅ Meaningful page titles, descriptive link text.

## Status codes and error handling

- ✅ Public routes return 200.
- ✅ Permanent redirects return 301.
- ✅ Custom 404 page returns HTTP 404 (no soft 404).
- ✅ 404 page links to homepage, Products, Contact.

## Content trust and E-E-A-T

- ✅ Factual-content rules preserved.
- ✅ No fake testimonials, reviews, authors, experts or case studies.
- ✅ No strengthened claims for keyword purposes.

## Local business NAP consistency

- ✅ Single NAP record in `src/data/company.ts`.
- ✅ Consumed by header, footer, contact page, structured data,
  manifest.
- ✅ No invented opening hours or lat/long.

## Security and crawler access

- ✅ CSP allows all legitimate first-party assets and YouTube-nocookie
  embeds.
- ✅ HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options,
  Permissions-Policy all configured.
- ✅ Security headers do not block Googlebot, Bingbot, CSS, JS, fonts,
  images or social-preview images.

## Automated SEO tests

- ✅ `tests/a11y/seo-regression.spec.ts` covers every assertion in
  spec section 34.

## Lighthouse CI

- ✅ `lighthouserc.json` configured with `categories:seo` minimum
  score `1.0` on 7 priority routes.

---

## Items still requiring external account access

These cannot be completed from code and are tracked in
`docs/SEO_LAUNCH_CHECKLIST.md`:

1. Vercel domain configuration (apex + www + HTTPS + SSL + production
   branch = `main`).
2. Production environment variables (`NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_ALLOW_INDEXING`).
3. Google Search Console Domain property verification (DNS TXT) and
   sitemap submission.
4. Bing Webmaster Tools verification and sitemap submission.
5. Google Business Profile URL update.
6. LinkedIn and other verified social profile URL updates.
7. DNS records pointing at Vercel.

## Lighthouse SEO score

**Not claimed as 100/100 yet.** The code-level work is complete, but
a Lighthouse SEO score of 100 requires the live custom domain
`https://bharatelectrosafe.com` to be deployed with the production
environment variables set. The Lighthouse CI configuration
(`lighthouserc.json`) is ready to run against the production build
once the domain is live.

## Validation

- ✅ `bun run typecheck` — PASS (no errors)
- ✅ `bun run lint` — PASS (no errors)
- ✅ `next build --webpack` — PASS (23 routes generated)
- ⚠️ `next build` (Turbopack) — pre-existing Rust panic unrelated to
  this work (also fails on `main` before these changes; Vercel's
  build environment uses its own Turbopack runtime)
