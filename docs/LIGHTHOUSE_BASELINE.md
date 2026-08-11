# Lighthouse Baseline — Bharat Electrosafe (pre-fix)

**Capture date:** 2026-07-28
**Deployment audited:** https://bharat-electrosafe.vercel.app/ (Vercel preview)
**Chrome / Lighthouse:** Stable desktop channel with Agentic Browsing category enabled.

> The preview domain is intentionally `noindex`. The SEO score reported here
> reflects that intentional production-only indexing guard. SEO 100 cannot
> be claimed until the official production domain (`https://bharatelectrosafe.com`)
> is live, attached to the Vercel project, and the production env vars
> (`NEXT_PUBLIC_SITE_URL=https://bharatelectrosafe.com`,
> `NEXT_PUBLIC_ALLOW_INDEXING=true`, `VERCEL_ENV=production`) are set.
> See `docs/PRODUCTION_INDEXING.md`.

## Original website (legacy) desktop baselines

| Category             | Score |
|----------------------|-------|
| Performance          | 56    |
| Accessibility        | 70    |
| Best Practices       | 73    |
| SEO                  | 82    |
| Agentic Browsing     | 0/2   |

## Current new-site desktop baselines (preview domain)

| Category             | Score |
|----------------------|-------|
| Performance          | 100   |
| Accessibility        | 91    |
| Best Practices       | 100   |
| SEO                  | 69    |
| Agentic Browsing     | 1/2   |

## Known failures captured before fixes

### Accessibility

#### A1 — Buttons do not have an accessible name
- **Audit ID:** `button-name`
- **DOM selector:** `header button[aria-haspopup="true"][aria-controls="products-mega-menu"]`
- **HTML snippet:**
  ```html
  <button type="button" aria-expanded="false" aria-haspopup="true"
          aria-controls="products-mega-menu">
    <svg class="size-4 ..."><!-- ChevronDown --></svg>
  </button>
  ```
- **Accessible role:** `button`
- **Computed accessible name:** *(empty)*
- **Failure explanation:** The Products mega-menu chevron trigger is an
  icon-only `<button>` with no `aria-label`, no `aria-labelledby`, and no
  visible text content. Screen readers and Lighthouse therefore report an
  empty accessible name.
- **File / component responsible:** `src/components/layout/Header.tsx`
  (the chevron button beside the "Products" link in the desktop nav).

#### A2 — Background and foreground colours do not have sufficient contrast
- **Audit ID:** `color-contrast`
- **Failing tokens (small text):**
  - `text-be-yellow-500` (`#FFC400`) on `bg-be-white` (`#FFFFFF`),
    `bg-be-warm-white` (`#FFFEF9`), `bg-be-cream` (`#FFFDF3`)
    — contrast ratio ≈ 1.36 (white) / 1.35 (warm-white) / 1.35 (cream).
    Required ≥ 4.5:1 for normal text.
  - `text-be-yellow-600` (`#DFAA00`) on the same backgrounds
    — contrast ratio ≈ 2.12. Required ≥ 4.5:1.
  - `text-be-grey-400` (`#A9A9A5`) on `bg-be-white` — contrast ratio ≈ 2.85.
    Required ≥ 4.5:1 for normal text.
- **Typical failing locations:**
  - Top contact strip email/phone/WhatsApp hover text
    (`src/components/layout/Header.tsx`)
  - Mega-menu product name hover state
    (`text-be-yellow-600` on hover, `src/components/layout/Header.tsx`)
  - "View All Products" link in footer
    (`text-be-yellow-500` on `bg-be-warm-white`,
    `src/components/layout/Footer.tsx`)
  - "View certificate" link in TrustDocuments
    (`text-be-yellow-600` on `bg-be-cream`,
    `src/components/home/TrustDocuments.tsx`)
  - "View Product" link in ProductRange card
    (`text-be-yellow-600` on hover, `src/components/home/ProductRange.tsx`)
  - Mobile category labels
    (`text-be-grey-400`, `src/components/layout/Header.tsx`)
  - File-size labels in DocumentCard
    (`text-be-grey-400`, `src/components/ui/DocumentCard.tsx`)
  - "404" label on not-found page
    (`text-be-yellow-500` on `bg-be-warm-white`, `src/app/not-found.tsx`)
- **Failure explanation:** Brand yellow `#FFC400` is an excellent accent
  colour but fails WCAG AA contrast when used as small text on light
  backgrounds. The same applies to `#DFAA00` (yellow-600). Grey-400 is
  similarly too light for small metadata text.

### SEO

#### S1 — Page is blocked from indexing
- **Audit ID:** `robots-txt` / `meta-robots`
- **Failure explanation:** The preview deployment is correctly configured
  as `noindex,nofollow` via the triple-gated indexing guard in
  `src/lib/site-url.ts`. This is **intentional and correct** for a preview
  deployment. SEO 100 must be measured on the production domain after the
  official domain is attached and `NEXT_PUBLIC_ALLOW_INDEXING=true` is set
  in the Vercel Production environment.
- **Verification steps for production:** See
  `docs/PRODUCTION_INDEXING.md`.

### Agentic Browsing

#### AB1 — Accessibility tree is not well-formed
- **Audit ID:** `agentic-browsing-tree`
- **Failure explanation:** Driven primarily by A1 (the unnamed Products
  chevron button) and A2 (contrast warnings affecting how the agent
  interprets interactive text). Once accessible names are added and the
  contrast tokens are introduced, the accessibility tree becomes
  well-formed.
- **Additional checks performed:** Every public route exposes a single
  `<header>`, single `<main>` and single `<footer>` landmark; every page
  has exactly one `<h1>`; nav landmarks use distinct `aria-label`s
  ("Main navigation", "Mobile navigation", "Breadcrumb",
  "Footer company navigation" / implicit, "Product navigation" via the
  mega-menu group labels).

## Routes audited

1. `/` (Homepage)
2. `/products` (Products overview)
3. `/products/electrical-insulating-mats`
4. `/products/coloured-strip-insulating-mats`
5. `/products/bi-color-insulating-mats`
6. `/products/auto-glow-reflective-band-insulating-mats`
7. `/products/bharat-membrane`
8. `/products/bharat-hydro-seal`
9. `/about-us`
10. `/contact-us`
11. 404 (not-found)

## Notes on testing methodology

- Lighthouse JSON reports were captured on the preview deployment.
- A11y findings were cross-validated against the source files listed above.
- Contrast ratios were computed manually using the WCAG 2.1 relative
  luminance formula against the actual `--be-*` tokens defined in
  `src/app/globals.css`.
- The triple-gated indexing guard in `src/lib/site-url.ts` was confirmed
  by code review (it already requires `NEXT_PUBLIC_ALLOW_INDEXING === 'true'`
  AND the official domain AND `VERCEL_ENV === 'production'`).
