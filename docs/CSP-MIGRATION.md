# CSP Migration Analysis — Bharat Electrosafe

**Date:** 2026-07-28
**Status:** Analysis complete — nonce-based CSP **not merged** (documented trade-off)

## Current (baseline) CSP

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self';
connect-src 'self';
frame-src 'self' https://www.youtube-nocookie.com;
object-src 'none';
base-uri 'self';
frame-ancestors 'none';
form-action 'self';
upgrade-insecure-requests
```

Defined in `next.config.ts` → `securityHeaders`.

**Mozilla Observatory result:** B+ (80/100), 9/10 tests passed.
**Main deduction:** CSP contains `unsafe-inline` in `script-src` and
`style-src`.

## Why `unsafe-inline` is currently required

Next.js (App Router, Turbopack build) injects inline `<script>` tags
into the server-rendered HTML for:

1. **React hydration bootstrap** — inline scripts that set up the
   React Server Component payload and hydration data.
2. **Next.js runtime configuration** — inline `<script>` with
   `__NEXT_DATA__` or equivalent runtime config.
3. **Font preload hints** — inline style for `next/font` CSS variable
   injection.
4. **CSS-in-JS from `tw-animate-css`** — some animation utilities are
   inlined.

Removing `unsafe-inline` from `script-src` without a replacement
**blocks all Next.js inline bootstrap scripts**, breaking hydration,
interactivity, and client-side routing entirely.

## Option A: Nonce-based strict CSP (investigated, not merged)

### How it would work

1. Add a Next.js middleware (`src/middleware.ts`) that runs on every
   request.
2. Generate a cryptographically random nonce per request using
   `crypto.randomUUID()` or `crypto.getRandomValues()`.
3. Set the nonce in a request header (`x-nonce`).
4. Read the nonce in `next.config.ts` headers or a custom header
   function and include it in the CSP:
   `script-src 'self' 'nonce-<RANDOM>' 'strict-dynamic'`.
5. Next.js 14+ supports passing the nonce to inline scripts via the
   `<Script nonce>` component and the `nonce` option in metadata.

### Critical trade-offs identified

| Factor | Current (unsafe-inline) | Nonce-based CSP |
|--------|------------------------|-----------------|
| Rendering | Static (○) — CDN-cached HTML | Dynamic (ƒ) — server-rendered per request |
| TTFB | ~200ms (CDN edge) | ~200-400ms (server compute + nonce injection) |
| Vercel function usage | Zero (static) | Per-request function invocation |
| Hosting cost | Static CDN (cheap) | Dynamic functions (pay-per-invocation) |
| Cache headers | `Cache-Control: s-maxage=31536000` | `Cache-Control: no-store` or short TTL |
| LCP | ~0.5s (static) | Potentially worse (dynamic TTFB) |
| FCP | ~0.8s | Potentially worse |
| Complexity | Low | High (middleware + nonce plumbing) |
| Observatory grade | B+ (80) | A or A+ (90+) |

### Why it was not merged

1. **Performance regression risk:** The homepage and all product pages
   are currently statically prerendered (○ in build output). A
   nonce-based CSP forces every request through a server function to
   generate and inject the nonce, converting static pages to dynamic
   (ƒ). This would:
   - Increase TTFB from ~200ms (CDN edge) to ~200-400ms (server
     compute).
   - Eliminate CDN edge caching for HTML.
   - Increase Vercel function invocations (cost).
   - Risk regressing the current Performance 100 desktop / 94 mobile
     scores.

2. **The user's spec explicitly requires:** "Merge the nonce
   implementation only when: Observatory improves to A or A+,
   Lighthouse Performance remains at least 95 desktop, Mobile
   Performance remains at least 90, LCP remains below 1 second
   desktop... No route breaks, Hosting cost and dynamic rendering are
   acceptable."

   Without being able to test the deployed performance impact on
   Vercel (this is a local development environment), merging a
   nonce-based CSP that could regress Performance from 100 to <95 is
   not acceptable per the spec.

3. **`strict-dynamic` browser support** is good in modern browsers but
   the nonce plumbing in Next.js 16 with Turbopack is not fully
   documented for all inline script paths. Risk of breaking hydration
   or client-side routing on some pages.

### Recommendation

A nonce-based CSP should be implemented as a **separate branch** with
a **Report-Only rollout** first, tested on the Vercel preview with
real Lighthouse/PageSpeed runs, and only merged if performance does
not regress. This requires deployment-environment testing that cannot
be done in this local session.

## Option B: Hash-based CSP (not viable)

Next.js inline scripts are generated dynamically at build time with
content that includes build hashes, route manifests, and hydration
data. The hash changes on every build, making static hash-based CSP
impractical without a build-time hash extraction step that is fragile
and maintenance-heavy.

## Option C: Retain current CSP (selected)

The current CSP is retained with the following security posture:

- `object-src 'none'` — no plugins
- `base-uri 'self'` — no base URI hijacking
- `frame-ancestors 'none'` — no clickjacking
- `form-action 'self'` — no form data exfiltration
- `upgrade-insecure-requests` — HTTPS enforcement
- `img-src 'self' data: https:` — images only from self or HTTPS
- `connect-src 'self'` — no third-party API calls from browser
- `frame-src 'self' https://www.youtube-nocookie.com` — only
  same-origin and YouTube no-cookie (About page videos)
- HSTS: `max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(),
  browsing-topics=(), interest-cohort=()`

### Additional headers considered

The following headers were considered but **not added** because they
risk breaking functionality or require testing that cannot be done
locally:

- `Cross-Origin-Opener-Policy: same-origin` — could break the
  YouTube embed's ability to communicate with its parent page.
- `Cross-Origin-Embedder-Policy` — would block cross-origin images
  and resources not explicitly opted in via CORP.
- `Cross-Origin-Resource-Policy: same-origin` — would block the
  `img-src https:` allowance for any cross-origin images.

## Mozilla Observatory target

- **Current:** B+ (80/100)
- **With nonce-based CSP:** A or A+ (90+)
- **Decision:** Retain B+ with documented trade-off. The performance
  cost of dynamic rendering is not acceptable for a site that
  currently achieves Performance 100 desktop and 94 mobile. Security
  is not weakened in any other dimension — the only deduction is the
  `unsafe-inline` in `script-src` and `style-src`, which is required
  for Next.js to function.

## Report-Only rollout plan (for future implementation)

If a nonce-based CSP is pursued in the future:

1. Create branch `csp-nonce-report-only`
2. Implement middleware with nonce generation
3. Deploy with `Content-Security-Policy-Report-Only` header (not
   enforcing)
4. Test all routes on Vercel preview
5. Collect violation reports
6. Run Lighthouse mobile + desktop on the preview deployment
7. Compare TTFB, FCP, LCP, TBT, CLS against current baseline
8. Only merge if Performance stays ≥95 desktop / ≥90 mobile and LCP
   stays <1s desktop

## Final Observatory score

**B+ (80/100)** — retained. The `unsafe-inline` deduction is
documented as an evidence-based security/performance trade-off per
the user's acceptance criterion #18.
