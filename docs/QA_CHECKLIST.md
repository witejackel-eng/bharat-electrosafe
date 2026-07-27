# QA Checklist

Results from this pass. Items marked **not measured** were not run — no score
or result is claimed anywhere without having produced it.

---

## Build and quality gates

| Check | Command | Result |
|---|---|---|
| Install | `npm install` | ✅ Pass |
| Lint | `npm run lint` | ✅ Pass — 0 problems |
| Typecheck | `npm run typecheck` | ✅ Pass — 0 errors |
| Production build | `next build` | ✅ Pass — 15 routes |

All four were failing or absent at the start of this pass (see
`REPOSITORY_AUDIT.md`).

---

## Routes

| Check | Result |
|---|---|
| 10 approved routes return 200 | ✅ |
| Custom 404 returns HTTP 404 | ✅ |
| Exactly one `<h1>` per route | ✅ 11/11 |
| Unique `<title>` per route | ✅ |
| Meta description present | ✅ 11/11 |
| Canonical present | ✅ 11/11 |
| `sitemap.xml` builds | ✅ |
| `robots.txt` builds | ✅ |
| Legacy `.php` redirects | ✅ verified |
| Slug-variant redirects | ✅ verified |

## Content integrity

| Check | Before | After |
|---|---|---|
| Broken images | 21 | **0** |
| Dead download links | 8 | **0** |
| Fabricated customer names | 15 | **0** |
| "HDPE" occurrences | 12 | **0** |
| Invented product codes | 12 | **0** |

## Console and runtime

| Check | Result |
|---|---|
| Console errors on homepage | ✅ none |
| Console errors on product page | ✅ none |
| Hydration warnings | ✅ none observed |

## Responsive

| Check | Result |
|---|---|
| Horizontal overflow at 320 px | ✅ none |
| Product page layout at 320 px | ✅ no overflow |
| Tables scroll within their container | ✅ by design (`overflow-x-auto`) |

**Not measured:** the full viewport matrix (360/390/430/768/820/1024/1180/
1280/1440/1920). Only 320 px and desktop were exercised. The layout is
Tailwind-responsive throughout, but intermediate breakpoints have not been
individually inspected.

## Accessibility

| Check | Result |
|---|---|
| Skip-to-content link | ✅ present in root layout |
| Landmarks (`main`, `nav`) with labels | ✅ |
| Breadcrumb `aria-label` | ✅ |
| Tables have captions | ✅ |
| Decorative icons `aria-hidden` | ✅ |
| Duplicated marquee items hidden from AT | ✅ added this pass |
| Touch targets ≥ 44 px | ✅ on primary CTAs |

**Not measured:** full keyboard traversal of the mobile drawer and product
dropdown; screen-reader pass; automated axe audit; colour-contrast
measurement across all token pairs.

## Security

| Check | Result |
|---|---|
| `reactStrictMode: true` | ✅ |
| TS/ESLint errors not ignored in build | ✅ |
| Zod server-side validation on contact API | ✅ |
| CSP, nosniff, frame-options, referrer-policy, permissions-policy | ✅ present |
| No proprietary asset paths in client code | ✅ |
| **`.env` tracked in a public repo** | ❌ **open — rotate credential** |
| HSTS | ⚠️ commented out; enable in production |

## Performance

**Not measured.** No Lighthouse run was performed, so no scores are claimed.
See `PERFORMANCE_REPORT.md` for the structural findings and the one change
that would matter most.

---

## Follow-up

1. **Rotate the leaked `DATABASE_URL`** and untrack `.env`.
2. Run Lighthouse on a deployed build and record real numbers.
3. Walk the full viewport matrix.
4. Keyboard + screen-reader pass on header dropdown and mobile drawer.
5. Resolve the three asset gaps.
6. Add the missing OG share image.
7. Revisit `images.unoptimized: true` once the deployment target is confirmed.
