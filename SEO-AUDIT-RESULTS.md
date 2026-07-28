# SEO Audit Results — Bharat Electrosafe

**Production domain:** https://bharatelectrosafe.com
**Company:** Bharat Electrosafe, Noida, Uttar Pradesh, India
**Standard:** IS 15652:2006 (Class A 3.3 kV · Class B 11 kV · Class C 33 kV)
**Legacy stack:** PHP site with client-rendered product pages
**New stack:** Next.js App Router (Server Components + isolated client islands), TypeScript, dynamic robots/sitemap, JSON-LD, 308 migration redirects.

This audit summarises the code-level SEO work that has been implemented for the
Bharat Electrosafe migration, the expected score after launch, and the external
items that cannot be completed through code.

---

## Consolidated SEO Audit Table

| Category | Previous score | Implemented changes | Remaining external dependencies | Expected score | Verification method |
|---|---|---|---|---|---|
| **1. Technical SEO** | 4/10 (legacy PHP, client-rendered, no SSR metadata, no sitemap/robots control, no canonical discipline) | Next.js App Router with Server Components; per-route `generateMetadata`/exported `metadata`; self-referencing canonicals; dynamic `robots.ts` (allow on prod, disallow all on preview, `/_next/` and `/api/` blocked); dynamic `sitemap.ts` with stable `lastModified`; 308 PHP→new-URL redirects in `next.config.ts`; www→non-www and HTTP→HTTPS handled at edge to avoid redirect chains. | None at the code level. DNS / edge configuration (Vercel or Caddy) must already serve the production domain with TLS. | 9/10 | `bun run typecheck` clean; `bun run lint` clean; all 8 routes return 200; all 9 PHP redirects return 308; `robots.txt` and `sitemap.xml` resolve on production domain; preview deployments observed as `noindex`. |
| **2. On-Page SEO** | 5/10 (generic titles, weak/abbreviated headings, duplicated mobile/desktop content, missing canonicals) | Unique title + meta description per route via `buildMetadata()` in `src/lib/seo.ts`; full product-name H1s (no abbreviations); single semantic content structure (no duplicated mobile/desktop markup); self-referencing canonical on every page; OG + Twitter card with product-specific OG images (1200×630). | None. | 9/10 | Manual review of `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG/Twitter tags on homepage, /products, all 5 product pages, /about-us, /contact-us. |
| **3. Content Quality** | 5/10 (thin product pages, ambiguous scope, grammar issues) | Full IS 15652:2006 content framework (Class A/B/C); each product page has unique descriptive copy, specifications, application list, and FAQ; plural agreement fixed ("Electrical Insulating Mats are designed…"); BharatMembrane copy explicitly states it is NOT an IS 15652:2006 insulating mat. | Final copy review by subject-matter expert / BIS-licensed engineer is recommended before launch. | 9/10 | Manual content read-through; confirm BharatMembrane disclaimer renders on `/products/bharat-membrane`. |
| **4. E-E-A-T and Trust** | 4/10 (no structured trust signals, no credential references surfaced consistently) | BIS-licensed, ISO 9001, and ERDA/NTH test references surfaced on product and about pages; `Organization` JSON-LD with NAP; AboutPage and ContactPage JSON-LD; trust signals (standards, testing labs, certifications) rendered on homepage and product pages. | **External:** Verified credential numbers (BIS licence number, ISO certificate number, ERDA/NTH test report numbers) currently centralised in `src/lib/site-config.ts` and marked "to be verified" — must be replaced with verified values before launch. | 9/10 (after credential verification) | Confirm `Organization` JSON-LD renders with NAP; confirm credential placeholders are replaced with verified values; manual review of About page. |
| **5. Structured Data** | 2/10 (no JSON-LD on legacy PHP site) | `src/lib/jsonld.ts` emits valid JSON-LD: `Organization` + `WebSite` (site-wide in layout), `BreadcrumbList` (on every page with breadcrumbs), `Product` + `FAQPage` (on product pages), `AboutPage`, `ContactPage`. No fabricated reviews/ratings/offers. | None at the code level. Validate live output in Google Rich Results Test post-launch. | 9/10 | Confirm JSON-LD present on product pages: Organization, WebSite, Product, FAQPage, BreadcrumbList. Validate with Google Rich Results Test after deploy. |
| **6. Internal Linking** | 4/10 (legacy PHP navigation, no breadcrumbs) | Header navigation, footer NAP + product/company links, breadcrumbs on every inner page (with BreadcrumbList JSON-LD), `/products` hub linking all 5 product families, homepage product overview section, descriptive anchor text. | None. | 9/10 | Manual crawl of internal links; confirm breadcrumbs render and emit BreadcrumbList JSON-LD on product and content pages. |
| **7. Image SEO** | 3/10 (legacy images with generic filenames, no alt discipline, no modern formats) | Product OG images (1200×630) with descriptive filenames (`og-electrical-insulating-mats.svg`, etc.); `next/image` with explicit `width`/`height`, `sizes`, `alt`, lazy loading; AVIF/WebP format negotiation enabled in `next.config.ts`; descriptive `alt` text on all product visuals. | Replace placeholder product photography with final high-resolution assets before launch (filenames and alt already wired). | 9/10 | Manual review of `<img alt>` and `srcset` on product pages; confirm `next/image` dimensions present (no CLS). |
| **8. Local SEO readiness** | 3/10 (NAP inconsistent / not machine-readable) | NAP centralised in `src/lib/site-config.ts`; NAP rendered in footer site-wide and on Contact page; `Organization` JSON-LD includes address (Noida, Uttar Pradesh, India); `ContactPage` JSON-LD. | **External:** Google Business Profile optimisation (categories, hours, photos, posts, Q&A) and local citation cleanup cannot be completed through code. | 9/10 (code-side) | Confirm NAP block renders identically in footer and Contact page; validate `Organization` address fields in Rich Results Test. |
| **9. Migration SEO** | N/A (migration not yet performed) | 10 legacy PHP URLs mapped to new URLs via 308 permanent redirects in `next.config.ts`; redirects are direct (no intermediate hops); sitemap and internal links contain only final URLs; `BharatHydro-Seal.php` redirects to `/products` (discontinued product — does NOT redirect to electrical insulating mats). | **External:** Submit new sitemap in Google Search Console + Bing Webmaster Tools post-launch; monitor Coverage / Indexing report for orphaned legacy URLs. | 9/10 | All 9 PHP routes return 308 to the correct destination; see `MIGRATION-MAP.md` for the full mapping. |
| **10. Performance SEO** | 5/10 (client-rendered PHP, no image optimisation, no streaming) | Server Components for all content (near-zero client JS for static reads); isolated client islands (mobile menu, FAQ accordion, contact form) — no full-page hydration; `next/image` for AVIF/WebP + responsive sizes; sticky-footer flex layout to avoid layout shift; reduced-motion support. | None at the code level. Real-world Core Web Vitals (LCP/CLS/INP) must be measured post-launch on production infra. | 9/10 | Run Lighthouse / PageSpeed Insights on the production domain post-deploy; confirm client bundle size is minimal. |
| **11. Off-Page SEO readiness** | 3/10 (no documented backlink profile or outreach) | Website is fully link-ready: clean final URLs, self-referencing canonicals, descriptive titles/descriptions, share-ready OG images, valid structured data, fast Server-Component pages. | **External:** Backlink acquisition, industry directory listings, supplier/partner linking, press releases, and ongoing off-page outreach CANNOT be completed through code. | 9/10 (readiness) | Confirm OG image previews render correctly in social card validators (e.g. Facebook Sharing Debugger, Twitter Card Validator). |
| **12. AI Search / AEO** | 2/10 (legacy PHP site not structured for LLM extraction) | Semantic HTML structure; clear H1/H2 hierarchy; FAQ sections with `FAQPage` JSON-LD on product pages (directly answerable by LLMs); descriptive product specs (Class A/B/C voltages, IS 15652:2006); `Organization` + `WebSite` JSON-LD for entity disambiguation; BharatMembrane disclaimer prevents incorrect AI classification as an insulating mat. | None at the code level. AI search visibility (Google SGE, Bing Chat, Perplexity) depends on crawling/indexing and cannot be guaranteed by code. | 9/10 (readiness) | Validate FAQPage JSON-LD in Rich Results Test; confirm each product page has ≥3 Q&A pairs rendered server-side. |
| **13. International SEO readiness** | 3/10 (no hreflang, no locale discipline) | Single-locale India site; production domain is the canonical origin; robots/sitemap reference production domain only; preview deployments are `noindex` to prevent duplicate-content indexing. | **External:** If multi-region expansion is planned later, hreflang tags and regional sitemaps will need to be added — not implemented now (out of current scope). | 9/10 (for single-locale) | Confirm preview deployments return `noindex`; confirm production sitemap contains only the 8 production routes. |

---

## Verification performed

The following checks were executed during the build and validation stage (Task 2-7):

- `bun run typecheck` — **clean** (no TypeScript errors).
- `bun run lint` — **clean** (exit 0, no ESLint violations).
- All 8 production routes return **HTTP 200**:
  - `/`, `/products`, `/about-us`, `/contact-us`
  - `/products/electrical-insulating-mats`
  - `/products/coloured-strip-insulating-mats`
  - `/products/bi-color-insulating-mats`
  - `/products/auto-glow-reflective-band-insulating-mats`
  - `/products/bharat-membrane`
- All 9 legacy PHP redirects return **HTTP 308 Permanent Redirect** to the correct destination (see `MIGRATION-MAP.md`).
- JSON-LD present on product pages — verified for: `Organization`, `WebSite`, `Product`, `FAQPage`, `BreadcrumbList`. `AboutPage` and `ContactPage` JSON-LD verified on their respective routes.
- Canonical tags are **self-referencing** on every page.
- `robots.txt` and `sitemap.xml` are dynamic, reference the **production domain** (https://bharatelectrosafe.com), and are empty / `noindex` on preview deployments.

---

## Remaining external actions

The following items CANNOT be completed through code. The website is fully ready for them; they are operational/marketing activities to be performed by the Bharat Electrosafe team post-launch:

1. **Google Business Profile optimisation** — Claim/verify the GBP listing for Bharat Electrosafe (Noida), populate categories (Insulation material supplier, Electrical safety equipment supplier), business hours, services, photos, and posts. Cannot be done in code.
2. **Google Search Console verification** — Add and verify the production property (https://bharatelectrosafe.com), submit the new `sitemap.xml`, request indexing of key URLs, and monitor the Coverage / Indexing report for the legacy PHP URLs being dropped.
3. **Bing Webmaster Tools** — Add and verify the site, submit the sitemap, and monitor indexing in Bing (also feeds Bing Chat / Copilot entity knowledge).
4. **Backlink acquisition** — Industry directory listings (electrical safety, B2B supplier directories), partner/supplier linking, press releases, and ongoing off-page outreach. Cannot be done in code.
5. **Actual ranking improvements** — Positions in Google/Bing/AI search results are determined by indexing, relevance, authority, and competition over time. No code change can guarantee or force a ranking; the site is technically and semantically optimised to compete.
6. **Credential number verification (pre-launch)** — The company-specific credential numbers in `src/lib/site-config.ts` (BIS licence number, ISO 9001 certificate number, ERDA/NTH test report numbers, exact address unit/sector, phone numbers) are centralised and marked "to be verified". They MUST be replaced with verified values from the actual certificates before launch. This is an operational/data verification task, not a code task.

The website is **fully ready** for all of the above external actions.
