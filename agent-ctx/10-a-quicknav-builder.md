# Task 10-a — quicknav-builder

## Task
Create two new files for the Bharat Electrosafe homepage:
1. `/home/z/my-project/src/components/ui-custom/QuickNav.tsx` — sticky bottom section navigator pill bar
2. `/home/z/my-project/src/components/home/ProjectGallery.tsx` — masonry gallery of stylized installation cards

## Context reviewed
- `worklog.md` (full history, esp. cycle 9 additions: StickyCTABar, ScrollProgressBar, CaseStudiesSection, InsightsSection, cookie-banner external store pattern)
- `src/components/ui-custom/StickyCTABar.tsx` — referenced for the `be:cookie-visible` external store + `useSyncExternalStore` pattern, prefers-reduced-motion store, visibility rules (scrollY > 600, #quote at 70% viewport), `inert` spread pattern, Manrope style prop
- `src/components/motion/Reveal.tsx` — `as`/`className`/`delay`/`translateY` props; note it overrides `style` internally so fontFamily must go on a child element
- `src/components/home/CaseStudiesSection.tsx` — referenced for eyebrow/h2/subtitle header structure, gradient header strip with diagonal sheen + watermark icon + center icon badge pattern, Reveal stagger `150 + i*80`, focus-visible:outline-orange a11y
- `src/app/globals.css` — confirmed brand color tokens (`navy`, `navy-light`, `navy-dark`, `orange`, `orange-light`, `steel`, `ivory`, `ivory-light`) defined in `@theme inline`; `.text-eyebrow` utility class (orange, uppercase, tracked)
- `tailwind.config.ts` + `src/app/globals.css` — confirmed `bg-gradient-to-br` works (used by CaseStudiesSection)
- `src/app/page.tsx` — confirmed all 11 section IDs exist: `products`, `product-selection`, `proof`, `applications`, `case-studies`, `testimonials`, `insights`, `resources`, `contact`, `faq`, `quote`

## Work Log
- Created `/home/z/my-project/src/components/ui-custom/QuickNav.tsx`:
  - `'use client'` directive
  - `SECTIONS` array: 11 entries mapping section id → short label (Products, Selection, Proof, Applications, Case studies, Testimonials, Insights, Resources, Contact, FAQ, Get a quote)
  - Replicated the cookie-banner external store from StickyCTABar (listeners Set, `be:cookie-visible` CustomEvent subscription, localStorage `be-cookie-consent` fallback, SSR server snapshot `false`) so QuickNav and StickyCTABar stay in sync
  - Replicated the prefers-reduced-motion external store (SSR-safe)
  - Main effect (dep `[cookieBannerVisible]`): defines `evaluate()` + `scheduleEvaluate()` (rAF-throttled), attaches passive scroll/resize listeners, builds an `IntersectionObserver` with `rootMargin: '-40% 0px -55% 0px'` and `threshold: [0, 0.1, 0.25, 0.5, 1]`; tracks per-section intersection ratios in a `useRef<Map>` so the best candidate is picked on every callback; observes all 11 section elements; sets a `COOKIE_BLOCK_WINDOW_MS + 100` re-eval timer; cleans up listeners + IO + rAF on unmount
  - Visibility rules in `evaluate()`: hidden if scrollY ≤ 600; hidden if `#quote` top < viewport*0.7; hidden if cookie banner visible OR (no consent stored AND < 5s since mount); else visible
  - `handleJump(id)`: computes `targetY = el.getBoundingClientRect().top + window.scrollY`, calls `window.scrollTo({ top: max(0, targetY - 90), behavior: reducedMotion ? 'auto' : 'smooth' })`; proactively sets activeId so the pill updates before IO fires
  - Outer `<nav aria-label="On this page navigation" aria-hidden={!visible}>` with `hidden md:flex fixed bottom-24 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-2rem)] pointer-events-none` + `inert` spread when hidden (mirrors StickyCTABar TS-safe pattern)
  - Middle div: Manrope style prop, opacity/translateY show-hide transition (`reducedMotion ? 'none' : 'opacity 300ms, transform 300ms'`)
  - Inner pill: `rounded-full bg-navy/90 backdrop-blur-md border border-white/10 shadow-lg px-2 py-1.5` + `overflow-x-auto` with hidden scrollbar (`[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`) so 11 pills scroll if viewport is narrow
  - "On this page" label: `sr-only lg:not-sr-only text-[0.6rem] uppercase tracking-wider text-white/40 px-2 shrink-0`
  - Pills: `text-xs px-3 py-1.5 rounded-full shrink-0 focus-visible:ring-2 ring-orange ring-offset-navy`; active = `bg-orange text-white font-semibold` + `aria-current="location"`; inactive = `text-white/60 font-medium hover:bg-white/10 hover:text-white`; `transition-colors` disabled when reducedMotion

- Created `/home/z/my-project/src/components/home/ProjectGallery.tsx`:
  - `'use client'` directive
  - `<section id="gallery" className="bg-background py-20 md:py-28 scroll-mt-32 relative overflow-hidden">`
  - Header: `.text-eyebrow` "Project Gallery", h2 `text-3xl md:text-4xl font-bold text-navy` "From our production floor to your substation.", subtitle `text-steel max-w-2xl leading-relaxed` — each wrapped in `<Reveal delay={0/80/140}>` with Manrope style prop
  - `galleryItems` array: 6 items with `{ id, title, subtitle, Icon, from, to, span, minHeight }`:
    1. "33 kV Substation Matting" / "Western Region Transmission · 2024" / Zap / `from-navy to-orange` / `col-span-2 row-span-2` / `min-h-[400px]`
    2. "Platform Edge Safety" / "South Indian Metro · 2024" / Train / `from-orange to-steel` / `''` / `min-h-[200px]`
    3. "Control Room Flooring" / "BHEL Bhopal Plant · 2023" / Building2 / `from-steel to-navy` / `''` / `min-h-[200px]`
    4. "Tunnel Lining Project" / "Mumbai Coastal Project · 2023" / Waves / `from-navy-dark to-navy-light` / `''` / `min-h-[200px]`
    5. "Power Plant Installation" / "NTPC Korba · 2024" / Factory / `from-orange-light to-orange` / `row-span-2` / `min-h-[400px]`
    6. "Railway Workshop Mats" / "Indian Railways Jhansi · 2023" / Wrench / `from-navy to-steel` / `''` / `min-h-[200px]`
  - Grid: `grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]` — card 1 spans 2×2 (≈416px tall), card 5 spans 1×2, others 1×1; mobile (2-col) fills perfectly (card 1 full-width hero, card 5 tall on right); md (3-col) leaves intentional breathing gaps at the bottom row
  - Each card wrapped in `<Reveal delay={150 + i*80} translateY={16} className={cn('h-full', item.span)}>`; inner `<article tabIndex={0} aria-labelledby>` with `h-full w-full bg-gradient-to-br {from} {to} {minHeight}` + `focus-visible:outline-2 outline-orange outline-offset-2`; hover `scale-105 brightness-110 shadow-2xl transition-all duration-300` (disabled when reducedMotion)
  - Card internals: diagonal sheen `repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 1px, transparent 10px)` at opacity-20; watermark icon `absolute -bottom-3 -right-3 size-24 text-white/10`; center icon `size-8 text-white` in `w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20`; bottom caption `absolute bottom-0 inset-x-0 p-4` with `from-black/60 to-transparent` overlay, title `text-white font-semibold text-sm`, subtitle `text-white/70 text-xs`
  - Manrope font via style prop on the `<article>` (Reveal overrides its own style internally, so fontFamily is set on the child article)

## Verification
- `bun run lint` → 0 errors, 1 pre-existing warning (`@next/next/no-page-custom-font` in layout.tsx — unrelated to this task)
- `bunx tsc --noEmit` filtered for QuickNav/ProjectGallery → no errors
- Dev server: stable, GET / 200, no compile/runtime errors attributed to the new files
- Files compile cleanly (dev.log shows "✓ Compiled" with no warnings)
- NOTE: Per task spec ("Files to create (ONLY these new files)"), the components are NOT yet wired into `src/app/page.tsx` — the orchestrator should add `<QuickNav />` (near the other fixed-position utilities) and `<ProjectGallery />` (a new `<section id="gallery">`, e.g. after CaseStudiesSection or InsightsSection) plus the corresponding QuickNav entry `gallery` → "Gallery" if desired

## Stage Summary
- 2 files CREATED (no existing files modified):
  - `/home/z/my-project/src/components/ui-custom/QuickNav.tsx` — sticky bottom-center section navigator pill bar (z-30, bottom-24, hidden on mobile, IntersectionObserver-driven active section, cookie-banner-aware visibility, prefers-reduced-motion support, smooth-scroll with 90px header offset)
  - `/home/z/my-project/src/components/home/ProjectGallery.tsx` — masonry grid of 6 stylized gradient installation cards with diagonal sheen, watermark + center icons, bottom caption strips, hover lift, keyboard-focusable
- Both files: TypeScript strict, no `any`, SSR-safe (window/document guarded in effects + useSyncExternalStore server snapshots), brand color tokens work in light/dark, Manrope via style prop, semantic HTML (`<nav aria-label>` / `<section>` / `<article aria-labelledby>`), lucide-react icons, Reveal stagger animation
- Lint: 0 errors, 1 pre-existing unrelated warning
- Components ready to be integrated into `src/app/page.tsx` by the orchestrator
