# Mobile Performance Baseline — Bharat Electrosafe

**Date:** 2026-07-28
**Commit at baseline:** `08f9a1a3abc6a800af6936277868ecfb60b61a56`

## Verified mobile baseline (from user-provided PageSpeed Insights report)

| Metric | Value |
|--------|-------|
| Performance | 94 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO (preview) | 69 |
| Agentic Browsing | 3/3 |
| FCP | 1.2s |
| LCP | 2.9s |
| TBT | 110ms |
| Speed Index | 2.6s |
| CLS | 0 |

## Reported opportunities and diagnostics

- Legacy JavaScript: ~14 KiB
- Render-blocking requests: ~350ms
- Forced reflow (layout thrashing)
- LCP request discovery issue
- Network dependency tree
- Reduce unused JavaScript: ~152 KiB
- Three long main-thread tasks

## Desktop and external baselines (for reference)

| Tool | Metric | Value |
|------|--------|-------|
| Lighthouse desktop | Performance | 100 |
| GTmetrix | Grade | A |
| GTmetrix | Performance | 100% |
| GTmetrix | Structure | 100% |
| GTmetrix | LCP | ~393ms |
| GTmetrix | TBT | ~8ms |
| GTmetrix | CLS | 0 |
| WebPageTest | FCP | 0.549s |
| WebPageTest | LCP | 0.549s |
| WebPageTest | TBT | 0s |
| WebPageTest | CLS | 0 |

## LCP element identification

### Analysis (from code inspection)

The homepage hero contains two candidate LCP elements:

1. **H1 heading** — "Certified protection for critical electrical
   environments." in `HomeHero.tsx`
   - Server-rendered (now a Server Component after this pass)
   - Present in initial HTML
   - Uses `text-hero-h1` class (large, prominent)
   - LCP candidate on mobile (text-based, no resource load delay)

2. **Hero technical visual** — the SVG illustration in
   `HeroTechnicalVisual.tsx`
   - Server-rendered SVG (no external image resource for the SVG
     structure itself)
   - Contains a `<image href="/media/hero/mat-texture.webp">` for the
     mat texture
   - Previously loaded `photo-surface-01.webp` (372 KB) — now loads
     `mat-texture.webp` (67 KB)

### Before this pass

- `HomeHero.tsx` was a Client Component with `IntersectionObserver`
- The H1 was in the initial HTML but the proof badges had
  `opacity: 0` initial state (CSS `.stagger-reveal > * { opacity: 0 }`)
- `HeroTechnicalVisual.tsx` was a Client Component with Framer Motion
  `whileInView` animations starting at `opacity: 0`
- The mat texture image was 372 KB (`photo-surface-01.webp`)

### After this pass

- `HomeHero.tsx` is a Server Component — H1 is in initial HTML with
  no opacity-0 initial state
- `HeroTechnicalVisual.tsx` is a Server Component — SVG renders
  immediately, no Framer Motion, no opacity-0 initial state
- The mat texture is 67 KB (`mat-texture.webp`)
- Proof badges render immediately visible (no opacity-0)

### LCP subparts (estimated)

**Before:**
- TTFB: ~200ms
- Resource load delay: ~0ms (text LCP) or ~300ms (image LCP, 372 KB)
- Resource load duration: 0ms (text) or ~400ms (image, 372 KB)
- Render delay: ~500ms (hydration + Framer Motion init)
- **Total LCP: ~2.9s** (per PageSpeed report)

**After (estimated):**
- TTFB: ~200ms (static, CDN-cached)
- Resource load delay: ~0ms (text LCP, no image dependency)
- Resource load duration: 0ms (text-based LCP)
- Render delay: ~100ms (no Framer Motion, no IntersectionObserver
  for hero)
- **Total LCP: ~0.5-1.0s** (estimated, requires deployed verification)

## Long main-thread tasks (before)

Three long tasks were reported. Likely sources:

1. **Framer Motion initialization** — `HeroTechnicalVisual.tsx`
   imported `motion` and `useReducedMotion`, causing the Framer Motion
   runtime to parse and execute on hydration.
2. **Header hydration** — the Header used `AnimatePresence` and
   `motion.div` for the mega-menu, adding Framer Motion overhead.
3. **BackToTop hydration** — used `AnimatePresence` and `motion.button`.

### After this pass

All three sources are eliminated:
- `HeroTechnicalVisual.tsx` is a static Server Component (no client JS)
- `Header.tsx` uses CSS transitions (no Framer Motion)
- `BackToTop.tsx` uses CSS transitions (no Framer Motion)

## Forced reflow (before)

The Header scroll listener set two independent states on every scroll
event (`scrolled` and `compact`), which could cause forced reflow when
React re-rendered the header with different classes.

### After this pass

The Header scroll listener is unchanged (it was already using passive
listeners and the state updates are batched by React). The Framer
Motion removal eliminates the `AnimatePresence` reflow that occurred
when the mega-menu mounted/unmounted. The BackToTop component now
conditionally renders (`if (!visible) return null`) instead of using
AnimatePresence, which is simpler and avoids the exit-animation
reflow.

## JavaScript coverage (before vs after)

| Category | Before (est.) | After (measured) |
|----------|--------------|------------------|
| Total initial JS (uncompressed) | ~900 KB | 802 KB |
| Total initial JS (gzipped, est.) | ~394 KB | ~235 KB |
| Unused JS (per PageSpeed) | ~152 KB | Significantly reduced |
| Framer Motion | ~60 KB | 0 KB |
| Toaster + radix-toast | ~20 KB | 0 KB |
| Hero client overhead | ~13 KB | 0 KB |

## Font configuration (before vs after)

| Configuration | Before | After |
|---------------|--------|-------|
| Font | Manrope (next/font/google) | Manrope (next/font/google) |
| Weights | 5 static (400/500/600/700/800) | 1 variable (weight: "variable") |
| Font requests | 5 | 1 |
| Display strategy | swap | swap |

## Render-blocking CSS

The homepage loads:
- `globals.css` (Tailwind v4 + tw-animate-css)
- `tw-animate-css` (animation utilities used by Radix components)

`tw-animate-css` is required for Radix UI component animations
(Accordion, Sheet, Select, Dialog). Removing it would break the
entrance/exit animations of these components. It is retained.

The estimated ~350ms render-blocking time is primarily from:
1. CSS file download and parse (single compressed CSS file)
2. Font CSS injection (next/font inline styles)

After this pass, the font CSS is smaller (1 variable font vs 5 static
weights), which should slightly reduce render-blocking time.

## Hero texture (before vs after)

| Asset | Before | After |
|-------|--------|-------|
| Filename | `photo-surface-01.webp` | `mat-texture.webp` |
| Dimensions | 1600×900 | 760×250 |
| File size | 381,362 bytes (372 KB) | 68,378 bytes (67 KB) |
| Reduction | — | -304 KB (-80%) |

## Test environment notes

- **Lighthouse version:** Not available locally; baseline scores from
  user-provided PageSpeed Insights report
- **Chrome version:** Latest stable (per PageSpeed Insights)
- **Device emulation:** Mobile (Moto G Power equivalent)
- **Network throttling:** Slow 4G (per Lighthouse mobile preset)
- **CPU throttling:** 4x slowdown (per Lighthouse mobile preset)

## Next steps

The code changes in this pass are designed to improve mobile
Performance from 94 toward 100 by:
1. Eliminating Framer Motion (~60 KB JS, multiple long tasks)
2. Eliminating the dead Toaster (~20 KB JS)
3. Converting the hero to Server Components (no hydration gate on LCP)
4. Replacing the 372 KB texture with a 67 KB purpose-built asset
5. Reducing font requests from 5 to 1

Final mobile Lighthouse results must be verified on the deployed
Vercel preview after pushing these changes. See
`docs/MOBILE-PERFORMANCE-FINAL.md` for results.
