# SEO Audit — BEFORE

This document records the state of the Bharat Electrosafe website's
SEO implementation **before** the technical-SEO pass captured in this
commit. It is the baseline against which `docs/SEO_AUDIT_AFTER.md` is
compared.

The audit was performed against commit `6b34c09` on `main` (the
content-correction pass), before the SEO pass began.

---

## Route inventory (all return 200 on the production build)

| Route | Status | Notes |
|---|---|---|
| `/` | 200 | Homepage |
| `/products` | 200 | Products hub |
| `/products/electrical-insulating-mats` | 200 | Product page |
| `/products/coloured-strip-insulating-mats` | 200 | Product page |
| `/products/bi-color-insulating-mats` | 200 | Product page |
| `/products/auto-glow-reflective-band-insulating-mats` | 200 | Product page |
| `/products/bharat-membrane` | 200 | Product page |
| `/products/bharat-hydro-seal` | 200 | Product page |
| `/about-us` | 200 | About page |
| `/contact-us` | 200 | Contact page |

## Canonical domain policy

- ✅ `canonicalOrigin` is hardcoded to `https://bharatelectrosafe.com`
  in `src/lib/site-url.ts`.
- ✅ All canonical links, sitemap entries, structured-data entity IDs,
  OG URLs and Twitter URLs route through `buildUrl()` →
  `buildCanonicalUrl()` → `canonicalOrigin`.
- ✅ `metadataBase` uses `deploymentOrigin` (preview-safe) so relative
  OG image URLs resolve against the deployment that actually serves
  them.
- ⚠️ `allowIndexing` does not verify the deployment origin is the
  canonical domain — it relies only on `NEXT_PUBLIC_ALLOW_INDEXING`
  and `VERCEL_ENV`. A misconfigured production env var could expose a
  preview host as indexable.

## Indexing guard

- ✅ `robots.txt` is gated by `allowIndexing` (production allows all;
  preview disallows all).
- ✅ Page-level `robots` metadata is gated by `allowIndexing`.
- ✅ Preview deployments emit `noindex,nofollow`.

## Legacy PHP redirects

- ✅ All 9 PHP routes from spec section 4 are present in
  `next.config.ts` `redirects()` with `permanent: true` (301).
- ⚠️ No `docs/SEO_REDIRECT_MAP.csv` exists yet.

## robots.txt

- ✅ Production output allows all crawling and references the
  canonical sitemap.
- ✅ Preview output disallows all and does not expose the sitemap.
- ✅ Uses Next.js Metadata API.

## XML sitemap

- ✅ Contains all 10 canonical routes (homepage, /products, /about-us,
  /contact-us + 6 product pages).
- ✅ Uses canonical absolute URLs.
- ✅ Omits `lastModified` (no fake build-time dates).
- ⚠️ Includes `priority` and `changeFrequency` — spec section 7 says
  these are not ranking factors. Harmless but unnecessary.

## Page-level canonicals

- ✅ Every route emits a self-referencing canonical via
  `alternates.canonical`.
- ✅ All canonicals use `buildUrl()` → canonical origin.
- ✅ No child page inherits the homepage canonical.

## Site-wide metadata (root layout)

- ✅ Title default: `Bharat Electrosafe | Electrical Insulating Mats Manufacturer India`
- ✅ Title template: `%s | Bharat Electrosafe`
- ✅ Homepage description matches spec section 9.
- ✅ `metadataBase`, `applicationName`, `publisher`, `creator`,
  `robots`, Open Graph, Twitter, icons, manifest, theme colour all
  configured.
- ✅ No `meta-keywords` tag.
- ✅ Google Search Console verification meta tag is emitted only when
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set.
- ⚠️ `<html lang="en">` — spec section 24 prefers `lang="en-IN"`.

## Unique route metadata

- ✅ Homepage title and description are unique and match spec.
- ⚠️ Contact page title is `Contact Bharat Electrosafe` — spec
  section 10 specifies `Contact Bharat Electrosafe for Product
  Enquiries`.
- ✅ All 6 product page titles and descriptions match spec section 10.
- ✅ Products hub, About and Contact have unique titles and
  descriptions.

## Open Graph, Twitter, favicon

- ✅ Favicon system complete (icon.svg, favicon.ico, apple-icon.png,
  192px, 512px, maskable variants).
- ✅ OG image and Twitter image are 1200×630, served via App Router
  file conventions with alt-text companions.
- ✅ Manifest is configured with correct brand colours and icons.

## Structured data

- ⚠️ **Homepage emits Organization + WebSite + LocalBusiness.** Spec
  section 17 says "Do not emit conflicting Organisation and
  LocalBusiness entities" and "Use LocalBusiness only when the
  address is verified, the premises are genuinely customer-facing or
  operationally relevant, and the schema accurately describes the
  business. Otherwise use one clean Organization entity." The
  registered-office address is from the original company website and
  not independently verified as customer-facing.
- ⚠️ **Product pages emit Product schema.** Spec section 17 says "If
  the current Product markup produces critical Google Rich Results
  errors because required Offer or review data is absent, remove the
  Google-facing Product markup and retain accurate WebPage and
  Breadcrumb structured data." The site is quotation-led with no
  public price, availability or review data — Product without Offer
  risks Rich Results errors.
- ⚠️ **Homepage and product pages emit FAQPage JSON-LD.** Spec
  section 17 says "Remove FAQPage structured data from this
  commercial website. Google removed FAQ rich-result display in
  2026, and obsolete FAQ schema provides no meaningful search-result
  benefit here."
- ⚠️ **Products hub emits only BreadcrumbList.** Spec section 17 says
  the products hub should use `CollectionPage` + `ItemList` +
  `BreadcrumbList`.
- ✅ No fabricated Offers, prices, ratings, reviews, SKUs, GTINs,
  MPNs, availability, shipping or return policies.
- ✅ Stable entity IDs use the canonical domain.

## HTML and heading structure

- ✅ Every page has exactly one H1.
- ✅ Logical H2/H3 hierarchy.
- ✅ Semantic landmarks (header, main, footer, nav).
- ✅ Crawlable navigation and footer.
- ✅ Expandable biography and FAQ content is in the rendered DOM
  (accessible without interaction).

## Internal linking

- ✅ Homepage links to Products hub and all 6 product cards.
- ✅ Products hub links to all 6 product pages.
- ✅ Every product page links back to Products hub via breadcrumb.
- ✅ Every product page links to 2–3 related products.
- ✅ About and Contact are in header and footer.
- ✅ Breadcrumbs use anchor elements.

## Breadcrumbs

- ✅ Visible breadcrumbs on Products hub, all product pages, About,
  Contact.
- ✅ `BreadcrumbList` JSON-LD matches visible breadcrumb.
- ✅ Canonical URLs, correct positions, no duplication.

## Image SEO

- ✅ Descriptive filenames and accurate alt text.
- ✅ Explicit width/height on Next.js `<Image>` components.
- ✅ WebP format for content imagery.
- ✅ Homepage LCP image loads eagerly with `priority`.
- ✅ Below-the-fold images load lazily.
- ✅ Responsive `sizes` attributes.

## Mobile-first indexing

- ✅ Mobile and desktop contain equivalent content.
- ✅ No content hidden from mobile behind hover-only interactions
  (biography and FAQ use click/tap toggles).
- ✅ Responsive layouts at 360px–1920px.

## Accessibility

- ✅ Skip link, main landmark, footer landmark.
- ✅ Labelled form fields, visible keyboard focus.
- ✅ Accessible menu controls and accordions.
- ✅ Sufficient contrast.
- ✅ Logical heading order.
- ⚠️ `<html lang="en">` — spec prefers `lang="en-IN"`.

## Status codes and error handling

- ✅ Public routes return 200.
- ✅ Permanent redirects return 301.
- ✅ Custom 404 page exists with links to homepage, Products, Contact.
- ✅ 404 page returns HTTP 404 (not a soft 404).

## Content trust and E-E-A-T

- ✅ Factual-content rules preserved (see
  `docs/CONTENT_VERIFICATION.md` and
  `docs/CLIENT_CONTENT_CONFIRMATION.md`).
- ✅ No fake testimonials, reviews, authors, experts or case studies.
- ✅ No strengthened certification, standards, awards, legal identity,
  customer, export, leadership, Tata Precision, manufacturing-location
  or testing claims.

## Local business NAP consistency

- ✅ Single NAP record in `src/data/company.ts`, consumed by header,
  footer, contact page, structured data, manifest.
- ✅ No invented opening hours (OfficeHours component returns null
  until `verified: true`).
- ✅ No invented latitude/longitude.

## Security and crawler access

- ✅ CSP allows all legitimate first-party assets and approved
  YouTube-nocookie embeds.
- ✅ HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options,
  Permissions-Policy all configured.
- ✅ Security headers do not block Googlebot, Bingbot, CSS, JavaScript,
  fonts, product images or social-preview images.

## Automated SEO tests

- ✅ Playwright a11y test suite exists.
- ✅ `tests/a11y/content-compliance.spec.ts` covers content rules.
- ⚠️ No dedicated SEO regression test suite covering HTTP status,
  canonical, H1, OG, Twitter, favicon, sitemap, robots, JSON-LD
  parsing, FAQPage absence, etc.

## Lighthouse CI

- ⚠️ No Lighthouse CI configuration exists.

## Items requiring external account access

- Vercel domain configuration (apex + www + HTTPS + SSL).
- Production environment variables (`NEXT_PUBLIC_SITE_URL`,
  `NEXT_PUBLIC_ALLOW_INDEXING`).
- Google Search Console verification and sitemap submission.
- Bing Webmaster Tools verification.
- Google Business Profile URL update.
- DNS records pointing at Vercel.

---

## Summary of issues to fix in the SEO pass

1. Remove `FAQPage` JSON-LD from homepage and product pages.
2. Remove `LocalBusiness` schema (keep single `Organization`).
3. Convert `Product` schema → `WebPage` (no Offer = Rich Results
   error risk).
4. Add `CollectionPage` + `ItemList` to products hub.
5. Change `<html lang="en">` → `<html lang="en-IN">`.
6. Update Contact page title to
   `Contact Bharat Electrosafe for Product Enquiries`.
7. Create `docs/SEO_REDIRECT_MAP.csv`.
8. Create `docs/SEO_LAUNCH_CHECKLIST.md`.
9. Add dedicated SEO regression test suite.
10. Configure Lighthouse CI.
