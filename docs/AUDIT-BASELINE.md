# Audit Baseline — Bharat Electrosafe

**Date:** 2026-07-28
**Commit SHA at baseline:** `08f9a1a3abc6a800af6936277868ecfb60b61a56`
**Branch:** `main`
**Previous final commit:** `08f9a1a` — "docs: populate commit SHA in LIGHTHOUSE_FINAL.md"

## Deployed state at baseline

The latest main-branch commit at the start of this audit pass was
`08f9a1a`. The Vercel preview at `https://bharat-electrosafe.vercel.app/`
serves the Vercel deployment for the latest main commit.

### Already-deployed changes verified in code

The following were present in the codebase at baseline (committed in
`8312be3` and `7049797`):

- State-aware `aria-label` on the Products dropdown chevron button
  (`"Open products menu"` / `"Close products menu"`)
- Dark amber accessible text tokens:
  - `--be-yellow-text: #755600` (contrast ≈ 7.0:1 on white — passes AAA)
  - `--be-yellow-text-hover: #604600`
- These tokens applied across Header, Footer, TrustDocuments, TextLink,
  Breadcrumb, ProductRange, OfficeLocation, and all product/client pages
- FAQ single-source-of-truth in `src/data/faqs.ts`
- Root-level `global-error.tsx` boundary
- Triple-gated production indexing guard in `src/lib/site-url.ts`
- Claims audit in `docs/CLAIMS_AUDIT.md`

## Verified baseline scores (from user-provided reports)

| Tool | Metric | Before |
|------|--------|--------|
| PageSpeed Desktop | Performance | 100 |
| PageSpeed Desktop | Accessibility | 91 |
| PageSpeed Desktop | Best Practices | 100 |
| PageSpeed Desktop | SEO (preview) | 69 |
| PageSpeed Desktop | Agentic Browsing | 1/2 |
| PageSpeed Desktop | FCP | ~0.8s |
| PageSpeed Desktop | LCP | ~0.5s |
| PageSpeed Desktop | TBT | ~10ms |
| PageSpeed Desktop | CLS | 0 |
| PageSpeed Mobile | Performance | 94 |
| PageSpeed Mobile | Accessibility | 100 |
| PageSpeed Mobile | Best Practices | 100 |
| PageSpeed Mobile | Agentic Browsing | 3/3 |
| PageSpeed Mobile | FCP | 1.2s |
| PageSpeed Mobile | LCP | 2.9s |
| PageSpeed Mobile | TBT | 110ms |
| PageSpeed Mobile | Speed Index | 2.6s |
| WebPageTest | FCP | 0.549s |
| WebPageTest | LCP | 0.549s |
| WebPageTest | TBT | 0s |
| WebPageTest | CLS | 0 |
| WebPageTest | Page weight | ~911 KB |
| WebPageTest | Requests | 47 |
| GTmetrix | Grade | A |
| GTmetrix | Performance | 100% |
| GTmetrix | Structure | 100% |
| GTmetrix | LCP | 393ms |
| GTmetrix | TBT | 8ms |
| GTmetrix | CLS | 0 |
| GTmetrix | Fully loaded | ~913ms |
| GTmetrix | Total size | ~920 KB |
| GTmetrix | Requests | 47 |
| WAVE | Errors | 1 (empty button) |
| WAVE | Contrast errors | 7 |
| WAVE | Alerts | 22 |
| WAVE | AIM score | 7.8/10 |
| Mozilla Observatory | Grade | B+ |
| Mozilla Observatory | Score | 80/100 |
| Mozilla Observatory | Tests passed | 9/10 |

## Known issues at baseline

1. **WAVE empty button** — the Sheet close control (mobile navigation)
   had an `<XIcon>` with only `sr-only` "Close" text. WAVE did not
   reliably detect the `sr-only` span as an accessible name.

2. **7 WAVE contrast errors** — `text-be-yellow-500` (#FFC400) and
   `text-be-yellow-600` (#DFAA00) on light backgrounds. Mostly resolved
   in `8312be3` but residual instances in OfficeLocation icons and
   ProductsClient bullets.

3. **22 WAVE alerts** — to be classified as genuine / intentional /
   manual / false-positive (see `docs/WAVE-REVIEW.md`).

4. **Agentic Browsing 1/2 (desktop)** — accessibility tree not
   well-formed. Likely caused by the empty Sheet close button and/or
   the mobile Sheet's close control being in the tab sequence while
   the Sheet was closed.

5. **Mobile Performance 94** — LCP 2.9s, TBT 110ms. Caused by:
   - HomeHero being a Client Component (IntersectionObserver)
   - HeroTechnicalVisual using Framer Motion (large client bundle)
   - 372 KB hero product texture (`photo-surface-01.webp`)
   - Toaster mounted globally (dead code — `useToast` never called)
   - Framer Motion in Header and BackToTop
   - 5 static Manrope font weights instead of 1 variable font

6. **Mozilla Observatory B+ (80/100)** — main deduction: CSP contains
   `script-src 'unsafe-inline'` and `style-src 'unsafe-inline'`.

7. **SEO 69 on preview** — expected and intentional. The preview
   deployment is `noindex` by design. SEO 100 must be measured on the
   official `https://bharatelectrosafe.com` domain after migration.

## Cache status

Vercel deployments are immutable and served via CDN. Each commit to
`main` produces a new deployment with a fresh cache. The preview alias
(`bharat-electrosafe.vercel.app`) always points to the latest
production build of `main`.

Lighthouse and WAVE tests should be run with `?v=<timestamp>` or
after a hard refresh to ensure the latest deployment is tested, not a
cached version.
