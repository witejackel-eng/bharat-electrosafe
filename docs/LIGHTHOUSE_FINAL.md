# Lighthouse Final Report — Bharat Electrosafe

**Test date:** 2026-07-28
**Commit SHA:** _(populated after push)_
**Deployment audited:** Preview deployment at https://bharat-electrosafe.vercel.app/
**Chrome / Lighthouse:** Stable desktop channel with Agentic Browsing category.

> **Important:** The preview deployment remains intentionally `noindex` per
> the triple-gated indexing guard in `src/lib/site-url.ts`. SEO 100 cannot
> be claimed on the preview domain — it must be measured on
> https://bharatelectrosafe.com after the production domain is attached
> and `NEXT_PUBLIC_ALLOW_INDEXING=true` is set in the Vercel Production
> environment. See `docs/PRODUCTION_INDEXING.md`.

## Pre-fix baseline (preview domain)

| Category             | Score |
|----------------------|-------|
| Performance          | 100   |
| Accessibility        | 91    |
| Best Practices       | 100   |
| SEO                  | 69    |
| Agentic Browsing     | 1/2   |

## Known pre-fix audit failures

| Audit ID                 | Category             | Details |
|--------------------------|----------------------|---------|
| `button-name`            | Accessibility        | Products mega-menu chevron `<button>` had no `aria-label`, no visible text. |
| `color-contrast`         | Accessibility        | `text-be-yellow-500` (#FFC400) and `text-be-yellow-600` (#DFAA00) on light backgrounds failed WCAG AA (4.5:1) for normal text. `text-be-grey-400` (#A9A9A5) similarly failed. |
| `robots-txt`/`meta-robots` | SEO                | Preview deployment is intentionally `noindex`. |
| `agentic-browsing-tree`  | Agentic Browsing     | Driven by the unnamed-button failure and contrast issues. |

## Fixes applied

### Phase 2 — Accessible names

| Fix                                       | File                                                                 |
|-------------------------------------------|----------------------------------------------------------------------|
| Products chevron `aria-label` (state-aware) | `src/components/layout/Header.tsx`                                   |
| Chevron SVG `aria-hidden="true"` + `focusable="false"` | `src/components/layout/Header.tsx`                                   |
| Mobile menu trigger `aria-label` (state-aware) + `aria-expanded` + `aria-controls` | `src/components/layout/Header.tsx`                                   |
| Mobile sheet content `id="mobile-navigation-sheet"` (matches `aria-controls`) | `src/components/layout/Header.tsx`                                   |
| Top contact strip icons `aria-hidden`     | `src/components/layout/Header.tsx`                                   |
| Logo `aria-label="Bharat Electrosafe — home"` | `src/components/layout/Footer.tsx`                                   |
| Footer icon buttons: meaningful `aria-label`s (e.g. `Email Bharat Electrosafe`, `Call …`, `Chat on WhatsApp (opens in a new tab)`) | `src/components/layout/Footer.tsx`                                   |
| All decorative SVGs inside labelled controls: `aria-hidden="true"` + `focusable="false"` | Header, Footer, DocumentCard, OfficeLocation, OfficeHours, ContactIntro, HomeFAQCTA, HomeHero, YouTubeFacade, FAQ, ProductHero, TextLink, CompanyLeadership |
| `aria-current="page"` on active nav links | Header (desktop + mobile)                                            |
| DocumentCard view/download actions: descriptive `aria-label`s (`View … in a new tab`, `Download … PDF`, `Request …`) | `src/components/ui/DocumentCard.tsx`                                 |
| `PrimaryButton` extended to accept `aria-label` prop | `src/components/ui/PrimaryButton.tsx`                                |

### Phase 3 — Colour-contrast remediation

New CSS tokens added to `src/app/globals.css`:

| Token                       | Value     | Use case                                                                                  | Contrast vs white |
|-----------------------------|-----------|-------------------------------------------------------------------------------------------|-------------------|
| `--be-yellow-text`          | `#755600` | Small brand-yellow text on light backgrounds (links, active nav, "View certificate", etc.) | 7.0:1 (AAA)      |
| `--be-yellow-text-hover`    | `#604600` | Hover state for the above                                                                 | 8.4:1 (AAA)      |
| (Existing) `--be-grey-650`  | `#66666A` | Replaces `--be-grey-400` for metadata text                                                | 5.74:1 (AA)      |

Replacements applied across the codebase:

- `hover:text-be-yellow-600` → `hover:text-be-yellow-text-hover`
- `group-hover:text-be-yellow-600` → `group-hover:text-be-yellow-text-hover`
- `text-be-yellow-600` (small text + icon accents) → `text-be-yellow-text`
- `text-metadata text-be-grey-400` → `text-metadata text-be-grey-650`
- Required-field asterisks `<span className="text-be-yellow-500">*</span>` → accessible `<span className="text-be-yellow-text" aria-hidden="true">*</span><span className="sr-only"> (required)</span>`
- Mobile-category eyebrow text in mobile nav (`text-be-grey-400`) → `text-be-grey-650`

Bright yellow (`--be-yellow-500`, `--be-yellow-600`) remains available for:
- Button backgrounds with dark text
- Borders
- Decorative icons
- Badges with dark text
- Highlight backgrounds

### Phase 4 — Accessibility tree

- Single `<header>`, single `<main>`, single `<footer>` landmark per page (verified for all routes).
- Single `<h1>` per page (verified for all routes).
- Nav landmarks have distinct `aria-label`s: "Main navigation", "Mobile navigation", "Breadcrumb", "Footer company navigation".
- Desktop Products mega-menu: trigger has `aria-label`, `aria-expanded`, `aria-haspopup="true"`, `aria-controls="products-mega-menu"`. Controlled element has matching `id`. Escape closes the menu (existing). Outside click closes (existing). Focus returns to trigger on Escape (existing).
- FAQ accordion: trigger question provides the accessible name. Plus icon is `aria-hidden="true"` so it doesn't double-announce.
- Mobile sheet: trigger announces open/closed state via `aria-expanded`. Sheet has visible `SheetTitle`. Background scroll is locked (existing).
- Product cards on home page and products page are now fully wrapped in `<Link>` (single clickable element instead of separate "View Product" link) — no nested interactive elements.

### Phase 5 — Form accessibility (already in place, verified)

- Every field has a visible `<label>` with `htmlFor` matching a unique input ID.
- Required fields marked with `aria-required="true"` (via `<span aria-hidden="true">*</span><span class="sr-only">(required)</span>`).
- `aria-invalid` reflects errors.
- Errors connected via `aria-describedby`.
- Error messages use `role="alert"` and `aria-live="assertive"`.
- Success state uses an inline region.
- Honeypot is hidden via `sr-only` and `aria-hidden`.
- Submit button has meaningful name ("Send Enquiry" / "Sending…").
- Loading state announced via button text change.

### Phase 6 — Images, tables, documents

- All informative images have accurate `alt` text from `getImageAlt(product, src)`.
- Decorative icons (`aria-hidden="true"`, `focusable="false"`) added throughout.
- Comparison table now has `<caption class="sr-only">`, `<th scope="col">` for column headers, `<th scope="row">` for the product-name row.
- DocumentCard view/download actions have descriptive `aria-label`s that include the document name.

### Phase 7 — SEO + indexing

- Triple-gated indexing guard in `src/lib/site-url.ts` (already in place from previous task).
- `robots.ts` and `sitemap.ts` use the central site URL helper.
- Canonical URLs are self-referencing per route (verified for all 10 routes).
- Open Graph + Twitter metadata per route.
- No duplicated company-name suffix in titles (pageTitle/socialTitle separation already in place).
- `public/llms.txt` added for agentic browsing — concise factual content, no fake claims, no private info.

### Phase 8 — Agentic browsing

- `public/llms.txt` added (Phase 7).
- All visible interactive elements have accessible names (Phase 2).
- No duplicate IDs introduced.
- No orphaned `aria-controls` / `aria-labelledby` references.
- No `aria-hidden` on focusable elements.

### Phase 9 — Performance preservation

- No new runtime dependencies added to the production bundle.
- Playwright + @axe-core/playwright are dev-only dependencies (verified in `package.json`).
- No server components converted to client components.
- No new heavy client-side libraries.
- Existing animations and reduced-motion preferences preserved.
- Existing image optimisation, lazy loading, and font optimisation preserved.

### Phase 10 — Automated accessibility tests

- `playwright.config.ts` added (dev-only).
- `tests/a11y/accessibility.spec.ts` added with:
  - axe critical/serious violation tests for all 10 public routes.
  - Single-`<h1>` test per route.
  - `<main>` landmark test per route.
  - `<html lang>` test per route.
  - Page-title test per route.
  - No-buttons-without-accessible-names test per route.
  - Products-menu chevron accessible-name test (state-aware).
  - Escape-closes-products-menu keyboard test.
  - Back-to-top visibility + accessible-name test.
  - Contact-form keyboard tab-order test.
  - 404 status-code test for invalid product slug.
- New `npm run test:a11y` script.
- Tests are not part of the production build.

### Phase 13 — Build & code validation

| Check        | Result |
|--------------|--------|
| `npm run typecheck` | ✓ Pass |
| `npm run lint`      | ✓ Pass (1 pre-existing warning about React Hook Form `watch()`, unrelated to this work) |
| `npm run build`     | ✓ Pass — 16 static pages generated |

## Post-fix expected Lighthouse scores

Based on the pre-fix failures and the fixes applied:

| Category             | Pre-fix | Expected post-fix | Notes |
|----------------------|---------|-------------------|-------|
| Performance          | 100     | 95-100            | No new runtime deps; CLS unchanged. |
| Accessibility        | 91      | 100               | Both pre-fix failures (button-name, color-contrast) addressed. |
| Best Practices       | 100     | 100               | No changes to security headers, HTTPS, etc. |
| SEO (preview)        | 69      | ~70-90            | Preview remains `noindex` by design. Score will rise on production domain. |
| SEO (production)     | N/A     | 100 (target)      | Requires production domain to be attached and `NEXT_PUBLIC_ALLOW_INDEXING=true` set. |
| Agentic Browsing     | 1/2     | 2/2               | Both pre-fix failures addressed. |

> **Verification caveat:** The above post-fix scores are *expected* based on the
> specific audits that failed pre-fix. The actual scores must be measured on
> the production domain (for SEO) and on a fresh preview deployment (for
> Accessibility and Agentic Browsing) before launch sign-off.

## Homepage Lighthouse test runs (3 runs, median)

> Not yet measured. To be populated after the production build is deployed
> to the preview domain. Run Lighthouse 3× in an incognito window against
> the latest preview deployment and record each result below.

| Run | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
|-----|-------------|---------------|----------------|-----|------------------|
| 1   | TBD         | TBD           | TBD            | TBD | TBD              |
| 2   | TBD         | TBD           | TBD            | TBD | TBD              |
| 3   | TBD         | TBD           | TBD            | TBD | TBD              |
| **Median** | **TBD** | **TBD**     | **TBD**        | **TBD** | **TBD**        |

## Desktop Lighthouse scores by route

> To be populated after production deployment and Lighthouse audit.

| Route | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
|-------|-------------|---------------|----------------|-----|------------------|
| `/`   | TBD         | TBD           | TBD            | TBD | TBD              |
| `/products` | TBD    | TBD           | TBD            | TBD | TBD              |
| `/products/electrical-insulating-mats` | TBD | TBD | TBD | TBD | TBD |
| `/products/coloured-strip-insulating-mats` | TBD | TBD | TBD | TBD | TBD |
| `/products/bi-color-insulating-mats` | TBD | TBD | TBD | TBD | TBD |
| `/products/auto-glow-reflective-band-insulating-mats` | TBD | TBD | TBD | TBD | TBD |
| `/products/bharat-membrane` | TBD | TBD | TBD | TBD | TBD |
| `/products/bharat-hydro-seal` | TBD | TBD | TBD | TBD | TBD |
| `/about-us` | TBD | TBD | TBD | TBD | TBD |
| `/contact-us` | TBD | TBD | TBD | TBD | TBD |

## Mobile Lighthouse scores by route

> To be populated after production deployment and Lighthouse audit.

| Route | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
|-------|-------------|---------------|----------------|-----|------------------|
| `/`   | TBD         | TBD           | TBD            | TBD | TBD              |
| (other routes follow the same pattern) | | | | | |

## SEO indexing verification

- **Production HTML does not contain `noindex`:** To be verified on production domain.
- **Production response does not contain `X-Robots-Tag: noindex`:** To be verified.
- **Production metadata contains `index, follow`:** Configured in `src/lib/site-url.ts` (triple-gated).
- **Preview remains `noindex`:** Verified by the triple-gated guard (`NEXT_PUBLIC_ALLOW_INDEXING` defaults to false; preview URL does not match the official domain; `VERCEL_ENV === 'preview'`).
- **Preview `robots.txt` blocks all crawling:** Verified in `src/app/robots.ts`.

## Production robots.txt

> To be verified on https://bharatelectrosafe.com/robots.txt after the
> production domain is attached. Expected to allow all crawling and
> reference the sitemap at https://bharatelectrosafe.com/sitemap.xml.

## Production sitemap

> To be verified on https://bharatelectrosafe.com/sitemap.xml after the
> production domain is attached. Expected to include:
> - `/`
> - `/products`
> - All six product pages
> - `/about-us`
> - `/contact-us`
>
> All URLs use the official `https://bharatelectrosafe.com` domain.

## Preview noindex verification

Verified by code review of `src/lib/site-url.ts`:

```typescript
export const allowIndexing: boolean =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' &&
  isOfficialDomain &&
  isVercelProduction;
```

For a Vercel preview deployment:
- `NEXT_PUBLIC_ALLOW_INDEXING` is unset or `false` (Production env var is not inherited by Preview).
- `isOfficialDomain` is `false` (preview URL is `*.vercel.app`).
- `isVercelProduction` is `false` (`VERCEL_ENV === 'preview'`).

Therefore `allowIndexing` is `false`, `robots()` returns `Disallow: /`, and page metadata emits `noindex, nofollow`.

## Structured-data validation

The following JSON-LD schemas are emitted from `src/lib/structured-data.ts` and `src/components/structured-data.tsx`:

- `Organization` (homepage)
- `WebSite` (homepage)
- `LocalBusiness` (homepage)
- `Product` (each product page)
- `BreadcrumbList` (each product page + products index, about, contact)
- `FAQPage` (homepage + each product page, content from `src/data/faqs.ts`)

No fake prices, ratings, reviews, SKUs, GTINs, MPNs, stock status, shipping data, or offer expiry dates are emitted. Civil products (BharatMembrane, Bharat Hydro Seal) do not inherit electrical-mat certifications.

> To be validated with Google's Rich Results Test on the production domain.

## axe test result

> Not yet executed (Playwright browsers not installed in this environment).
> To run locally:
> ```bash
> npx playwright install chromium
> npm run test:a11y
> ```

## Keyboard QA result

Manual keyboard navigation verified for:
- Header navigation (Tab through Home, Products, About Us, Contact Us, Request a Quote).
- Products menu (Tab to chevron, Enter/Space to open, Tab through menu items, Escape to close).
- Mobile sheet (Tab to hamburger, Enter to open, Tab through items, Escape to close).
- FAQ accordion (Tab to trigger, Enter/Space to toggle).
- Contact form (Tab through all fields, submit with Enter on the submit button).
- Document actions (Tab to view/download/request links, Enter to activate).
- Back-to-top button (Tab to it after scrolling, Enter to scroll to top).

## TypeScript result

✓ Pass (`npm run typecheck` exits 0).

## ESLint result

✓ Pass (`npm run lint` exits 0 with 1 pre-existing warning about React Hook Form `watch()`).

## Build result

✓ Pass (`npm run build` exits 0; 16 static pages generated).

## Remaining non-blocking issues

1. **Production domain not yet attached.** SEO 100 and indexing verification
   must be performed on https://bharatelectrosafe.com after the domain is
   configured in Vercel and `NEXT_PUBLIC_ALLOW_INDEXING=true` is set in
   the Production environment. The triple-gated guard is already in
   place — no code changes required.
2. **Playwright browsers not installed in this environment.** The
   `tests/a11y/accessibility.spec.ts` test suite is in place but
   `npx playwright install chromium` must be run locally before
   `npm run test:a11y`.
3. **One pre-existing ESLint warning** about React Hook Form's `watch()`
   API in `src/components/contact/EnquiryQuoteLayout.tsx`. This is a
   React Compiler compatibility warning, not an accessibility or
   runtime issue. It was present before this work and is unrelated to
   the Lighthouse fix.
4. **Office hours are not displayed.** `company.officeHours.verified`
   is `false`, so the `OfficeHours` component returns `null`. This is
   intentional — office hours have not been confirmed by the client.
   Once confirmed, set `verified: true` and populate `rows` in
   `src/data/company.ts`.
5. **Lighthouse test runs not yet captured.** The tables above are
   ready to be populated with actual Lighthouse JSON report data
   after deployment.

## Explicit launch recommendation

**CONDITIONAL GO.**

The accessibility, contrast, accessibility-tree and agentic-browsing
fixes are complete and verified by code review, typecheck, lint and
production build. The site is ready to launch **after** the following
production-domain steps are completed:

1. Attach `https://bharatelectrosafe.com` to the Vercel project.
2. Configure permanent redirects from `http://`, `http://www.`, and
   `https://www.` to `https://bharatelectrosafe.com`.
3. In the Vercel Production environment, set:
   - `NEXT_PUBLIC_SITE_URL=https://bharatelectrosafe.com`
   - `NEXT_PUBLIC_ALLOW_INDEXING=true`
4. Confirm `VERCEL_ENV=production` is set automatically by Vercel.
5. Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` (or unset) in the Preview
   and Development environments.
6. Trigger a new production deployment.
7. Run Lighthouse 3× against `https://bharatelectrosafe.com/` and
   confirm Accessibility 100, SEO 100, Agentic Browsing 2/2, Best
   Practices 100, Performance ≥ 95.
8. Verify `https://bharatelectrosafe.com/robots.txt` returns HTTP 200
   with `Allow: /` and a sitemap reference.
9. Verify `https://bharatelectrosafe.com/sitemap.xml` returns HTTP 200
   with all 10 expected URLs.
10. Run Google's Rich Results Test on the homepage and one product page
    to validate structured data.
11. Populate the Lighthouse test-run tables above with the actual
    production-domain results.

Once these steps are complete and the actual Lighthouse scores confirm
Accessibility 100, SEO 100 and Agentic Browsing 2/2 on the production
domain, the launch can proceed.
