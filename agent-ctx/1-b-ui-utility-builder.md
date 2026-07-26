---
Task ID: 1-b
Agent: ui-utility-builder
Task: Create StickyCTABar and ScrollProgressBar components

Work Log:
- Read `/home/z/my-project/worklog.md` (1012 lines) to understand prior work — homepage has 10+ sections, QuoteProvider wraps the page, QuoteButton from `@/components/quote/QuoteButton` is the canonical CTA, `#quote` is the FinalCTA section, `#contact` is the ContactSection.
- Inspected existing `ScrollToTop` and `CookieConsent` components in `src/components/ui-custom/` to match patterns (useSyncExternalStore for mount + reduced-motion, brand color tokens, Manrope inline font).
- Verified brand color tokens in `src/app/globals.css`: `bg-navy`, `text-orange`, `bg-orange`, `from-orange`, `via-orange-light`, `to-orange` all resolve via Tailwind 4 from `--color-*` CSS vars (with dark-mode overrides).
- Verified `QuoteButton` API: accepts `className`, `children`, `productSystem?`, `productClass?`, `variant?`, `size?`, `showArrow?`. Used `className="bg-orange hover:bg-orange-hover text-white text-sm font-medium h-9 px-5 rounded-full"` and child text `Request a quote`.
- Created `src/components/ui-custom/ScrollProgressBar.tsx`:
  - `'use client'`, fixed `top-0 left-0 right-0 z-[60] h-[3px]` wrapper above the header (z-50).
  - Inner div uses `bg-gradient-to-r from-orange via-orange-light to-orange`, width updated via ref (direct DOM mutation, no React re-render per scroll).
  - `requestAnimationFrame`-throttled scroll + resize listeners (passive).
  - Tracks `scrollY / (scrollHeight - innerHeight)`; opacity 0 until scrollY > 100.
  - Inline `transition: 'width 80ms linear, opacity 200ms ease'`; reduced-motion mode swaps to `opacity 200ms ease` only (no width transition).
  - `boxShadow: '0 0 8px rgba(232, 97, 26, 0.4)'` on inner bar for glow.
  - Listens to `prefers-reduced-motion` changes via `matchMedia` and updates transition live.
  - Named export `ScrollProgressBar` plus default export.
- Created `src/components/ui-custom/StickyCTABar.tsx`:
  - `'use client'`, fixed `bottom-2 left-2 right-2` on mobile, `sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-3xl sm:w-[calc(100vw-2rem)]` on desktop.
  - Pill: `rounded-full bg-navy/95 backdrop-blur-md border border-white/10 shadow-2xl text-white px-4 py-2.5`, flex justify-between.
  - Left: `Phone` icon (lucide) in orange-soft chip + "Talk to technical sales" + subtitle "+91-123-456-7890 · Mon–Sat 9:30–18:30 IST" (`hidden sm:block text-[0.7rem] text-white/60`).
  - Right: WhatsApp `<a>` (`bg-[#25D366] hover:bg-[#1DA851]`, `MessageCircle` icon, opens `https://wa.me/911234567890` new tab) + `QuoteButton` with the required className.
  - Visibility: hidden initially; show when `scrollY > 600`; hide when `#quote` top < `innerHeight * 0.7`; hide for first 5s after mount if `be-cookie-consent` localStorage absent; also re-evaluate on custom `be:cookie-visible` event.
  - Animation: `translateY(4rem) opacity-0` → `translateY(0) opacity-100`, 400ms ease-out; instant when `prefers-reduced-motion`.
  - `role="region" aria-label="Quick contact"`, `aria-hidden` toggled with visibility, `inert` attribute applied via spread when hidden so keyboard users skip it.
  - Used `useSyncExternalStore` for reduced-motion (avoids `setState` synchronously in effect, which lint forbids).
  - Outer container `pointer-events-none`, inner pill `pointer-events-auto` so hidden state never blocks clicks.
  - All listeners (scroll, resize, custom event, setTimeout) cleaned up on unmount.
- Ran `bun run lint`. Initial pass had one error: `setState synchronously within an effect` for `setReducedMotion(mq.matches)`. Fixed by switching to `useSyncExternalStore` (same pattern as `Reveal.tsx`). Final lint: 0 errors, 1 pre-existing acceptable warning (Manrope font in `layout.tsx`).
- Verified dev server log shows clean compiles, no errors.

Stage Summary:
- Produced two new files (no existing files modified):
  - `/home/z/my-project/src/components/ui-custom/ScrollProgressBar.tsx`
  - `/home/z/my-project/src/components/ui-custom/StickyCTABar.tsx`
- Both components are SSR-safe, TypeScript-strict, cleanup their listeners, respect `prefers-reduced-motion`, and use only brand color tokens that work in light + dark mode.
- `ScrollProgressBar` mutates the DOM via ref (no per-scroll React render); `StickyCTABar` uses rAF-throttled scroll/resize + a custom `be:cookie-visible` event hook.
- Both export a named export AND a default export to satisfy the spec wording.
- Lint result: `0 errors, 1 warning` (warning is the pre-existing `no-page-custom-font` in `layout.tsx` — unrelated to this task).
- Next step for the orchestrator: mount `<ScrollProgressBar />` and `<StickyCTABar />` somewhere inside the page tree (e.g. in `src/app/page.tsx` alongside `<ScrollToTop />` and `<CookieConsent />`). The `QuoteButton` inside `StickyCTABar` requires being inside the existing `QuoteProvider`, which already wraps the page.
