---
Task ID: 1
Agent: main
Task: Fix reveal-animation bug — About section blank/invisible on homepage

Work Log:
- Cloned GitHub repo from https://github.com/witejackel-eng/bharat-electrosafe
- Synced all source code into /home/z/my-project (preserved node_modules, bun.lock)
- Identified root cause: HomeClient.tsx wrapped sections in `<div class="reveal-up">` but RevealObserver observed `<section>` elements and searched INSIDE for `.reveal-up` — the wrapper div was a PARENT, never found
- Fixed HomeClient.tsx: removed 4 outer `<div class="reveal-up">` wrappers
- Fixed HomeAbout.tsx: added `reveal-up` directly to `<section>` element
- Fixed StatisticsStrip.tsx: added `reveal-up` directly to `<section>` element
- Fixed TrustDocuments.tsx: added `className="reveal-up"` to `<SectionShell>`
- Fixed CapabilityIndustries.tsx: added `className="reveal-up"` to `<SectionShell>`
- Rewrote RevealObserver.tsx: observes `.reveal-up` and `.stagger-reveal` elements directly via IntersectionObserver; added 6s safety timeout
- Added `<noscript>` fallback in layout.tsx: forces reveal content visible when JS disabled
- Verified: 15 `.reveal-up` elements all have `revealed` class, 2 `.stagger-reveal` elements also revealed
- Verified: No blank areas in homepage, no horizontal overflow
- Verified: Section order correct (Hero → Statistics → About → Product Range → Trust → Capabilities → FAQ/CTA)
- Verified: Lint passes (0 errors, 1 pre-existing warning)
- Verified: TypeScript errors are all pre-existing (playwright, resend, Breadcrumb casing)
- Committed with correct git author (witejackel-eng / witejackel@gmail.com)

Stage Summary:
- Root cause: `.reveal-up` wrapper div outside `<section>` — observer searched inside sections, never found parent
- Fix: Move `reveal-up` class onto each section's root element; observe reveal elements directly
- Progressive enhancement: noscript fallback + 6s safety timeout + reduced-motion CSS preserved
- All visual QA passed: About section visible, Statistics visible, no blank areas, no overflow
- Commit: 7efea6c "fix: resolve reveal-animation bug — About section blank/invisible"

---
Task ID: 2-b
Agent: main
Task: Add "Recently Viewed Products" section using localStorage

Work Log:
- Created src/hooks/use-recently-viewed.ts — useRecentlyViewed hook
  - Persists an ordered slug list (max 4, most-recent-first) in localStorage under key `be-recently-viewed`
  - API: { recentlyViewed, addToRecentlyViewed(slug), clearRecentlyViewed() }
  - SSR-safe: returns [] on server and during hydration via useSyncExternalStore
  - Cross-tab sync via native `storage` event listener
  - Module-level cache + pub/sub so multiple hook instances in same tab stay in sync
  - Uses useSyncExternalStore (same pattern as src/hooks/use-mobile.ts) instead of
    useEffect + setState — avoids react-hooks/set-state-in-effect lint error and
    prevents cascading renders
- Created src/components/home/RecentlyViewed.tsx — client component
  - 'use client' directive, uses useRecentlyViewed hook
  - Renders null when no recently viewed items (no empty homepage space)
  - SectionShell variant="compact" bg="bg-be-cream" with reveal-up wrapper
  - SectionHeader: eyebrow="PICK UP WHERE YOU LEFT OFF", title="Recently Viewed"
  - "Clear" button (with Trash2 icon) to reset the list
  - Cards grid: 1 col mobile / 2 col tablet / 4 col desktop
  - Each card: image, name (line-clamp-1), description (line-clamp-2), "View" link
  - Card design matches ProductRange cards but smaller/more compact (p-4 vs p-5)
  - Includes "View All Products" link to /products
  - Uses productVisuals.card for image data; getProductBySlug() for name/description
  - Has fallback metadata for the 3 standalone product pages not in products.ts
    registry (international-iec-61111, pvc-flooring-solutions, other-products)
- Added tracking to all 9 product client components — each calls addToRecentlyViewed(slug) on mount:
  - src/app/products/electrical-insulating-mats/EIMClient.tsx → 'electrical-insulating-mats'
  - src/app/products/bharat-membrane/BMClient.tsx → 'bharat-membrane'
  - src/app/products/pvc-flooring-solutions/PVCFlooringClient.tsx → 'pvc-flooring-solutions'
  - src/app/products/other-products/OtherProductsClient.tsx → 'other-products'
  - src/app/products/bharat-hydro-seal/BHSClient.tsx → 'bharat-hydro-seal'
  - src/app/products/coloured-strip-insulating-mats/CSIMClient.tsx → 'coloured-strip-insulating-mats'
  - src/app/products/bi-color-insulating-mats/BiColorClient.tsx → 'bi-color-insulating-mats'
  - src/app/products/auto-glow-reflective-band-insulating-mats/AutoGlowClient.tsx → 'auto-glow-reflective-band-insulating-mats'
  - src/app/products/international-iec-61111/IECClient.tsx → 'international-iec-61111'
  - Each product client added: import { useRecentlyViewed } + a separate useEffect that
    calls addToRecentlyViewed(slug) on mount (kept existing IntersectionObserver effect intact)
- Added RecentlyViewed to homepage at src/app/HomeClient.tsx
  - Imported RecentlyViewed from '@/components/home/RecentlyViewed'
  - Rendered <RecentlyViewed /> after <HomeFAQCTA /> and before <NewsletterCTA />
    (newsletter section was added by a separate agent — section 9 in the homepage order)
- Styling compliance:
  - Brand colors only: be-cream, be-warm-white, be-charcoal-950, be-navy-800, be-yellow-500/300/100/50, be-grey-650/250, be-yellow-text, be-brand-yellow
  - NO indigo or blue colors
  - Cards: rounded-xl, border, shadow-sm, hover:shadow-lg, hover:-translate-y-1
  - Mobile responsive: 1 col (mobile) / 2 col (sm:) / 4 col (lg:)
  - Accessible: aria-labels on clear button and product links, alt text from productVisuals
  - reveal-up class on inner wrapper for scroll animation
- Verification:
  - `bun run lint`: 0 new errors/warnings introduced by my files
    (remaining 1 pre-existing error in AnimatedStatValue.tsx and 1 pre-existing warning in Header.tsx are unchanged)
  - dev.log: homepage GET / returns 200, compilation succeeds, no runtime errors related to my changes
  - All 9 product client components import the hook correctly and have a clean useEffect
  - RecentlyViewed component renders null on SSR and during hydration (no flash, no layout shift)

---

---
Task ID: 2-a
Agent: subagent (newsletter section)
Task: Add a newsletter/subscribe section before the footer on the homepage

Work Log:
- Read all required reference files: SectionShell, PrimaryButton, Eyebrow, input, rate-limit, db, schema.prisma, api/contact/route, HomeClient, HomeFAQCTA, HomeHero, Footer, EnquiryQuoteLayout, globals.css, origin.ts
- Confirmed `be-` brand color tokens are defined as CSS variables in globals.css (be-navy-900, be-yellow-500, be-yellow-400, be-yellow-text, be-charcoal-950, be-warm-white, be-grey-650, etc.)
- Confirmed `cn()` uses twMerge so Eyebrow className overrides win
- Confirmed shadcn Input is at `src/components/ui/input.tsx` (lowercase) — Linux is case-sensitive, so imports use `@/components/ui/input`
- Confirmed rate-limit.ts exposes `checkRateLimit(ip)` returning `{ allowed, retryAfterMs }`
- Confirmed origin.ts exposes `isAllowedOrigin` + `parseOrigin` for exact-match origin validation

Schema change:
- Added `NewsletterSubscription` model to `prisma/schema.prisma`:
  - id (cuid), email (unique), createdAt, ip (nullable), userAgent (nullable)
- Ran `bunx prisma db push` (no `db:push` script in package.json — used bunx directly)
- Verified Prisma Client regenerated with `newsletterSubscription` delegate

Files created:
1. `src/app/api/newsletter/route.ts` — POST handler
   - Accepts `{ email: string }` JSON body
   - Strict content-type enforcement (application/json only)
   - 4 KB body size limit
   - Exact-origin validation via `isAllowedOrigin` (no substring/startsWith)
   - Rate-limited via `checkRateLimit` (5 req / 10 min / IP — reuses existing policy)
   - Server-side email validation: RFC 5322 simplified regex + length cap (254) + dot-pattern checks
   - Email normalised to lowercase before persistence
   - Stores `ip` (truncated to 100 chars) and `userAgent` (truncated to 500 chars)
   - Duplicate emails → 200 `{ success: true, alreadySubscribed: true }` (caught via Prisma P2002)
   - Returns 200 on success, 400 (bad email/body), 403 (bad origin), 415 (bad content-type), 413 (body too large), 429 (rate-limited with Retry-After), 500 (db failure), 405 (GET disallowed with `Allow: POST`)
   - All responses include `Cache-Control: no-store` + `X-Robots-Tag: noindex, nofollow`
   - Redacted logging — no PII, only email length + domain

2. `src/components/home/NewsletterForm.tsx` — client island ('use client')
   - State machine: idle → submitting → success | error
   - Client-side email regex for progressive enhancement (server is authoritative)
   - Uses shadcn `Input` (with className overrides for white-on-navy contrast: h-12, rounded-xl, bg-white, text-be-charcoal-950, pl-10 for icon)
   - Uses `PrimaryButton` (type="submit") with conditional spinner+text children
   - Mail icon prefix (absolute-positioned) inside a relative wrapper
   - Success state replaces the form with an inline confirmation card (role="status", aria-live="polite") showing different copy for alreadySubscribed vs new subscription
   - Error message wired with `role="alert"` + `aria-describedby`
   - Submit button exposes `aria-busy` during submission
   - Touch targets ≥ 44px (input h-12, button min-h-[44px] via PrimaryButton)
   - Resets error state when user resumes typing

3. `src/components/home/NewsletterCTA.tsx` — server component (no 'use client')
   - Uses `SectionShell` with `variant="conversion"` + `bg="bg-be-navy-900"`
   - `reveal-up` class on SectionShell (opts into RevealObserver animation)
   - `overflow-hidden` on section so decorative blur doesn't escape
   - Two-column grid on lg+ (copy left, form card right); single column on mobile
   - Eyebrow "NEWSLETTER" (overridden to `text-be-yellow-400` for navy contrast)
   - h2 "Stay updated on electrical safety" in white
   - Subtext: "Get notified about new product launches, technical bulletins, and industry updates. No spam — unsubscribe anytime." in be-grey-400
   - ShieldCheck trust badge row: "Privacy protected. Unsubscribe with one click."
   - Form card: rounded-xl, border-white/10, bg-be-navy-850/50, p-6 lg:p-8, shadow-lg
   - Decorative background (aria-hidden): top-right yellow radial glow (blurred) + lower-left faint Mail-icon SVG grid pattern (6% opacity)
   - Renders `<NewsletterForm />` as a client island

Files modified:
4. `src/app/HomeClient.tsx`
   - Added `import NewsletterCTA from '@/components/home/NewsletterCTA';`
   - Inserted `<NewsletterCTA />` as section 9 (after RecentlyViewed, before Footer) so the newsletter is the last CTA before the footer for both first-time and return visitors
   - (Note: RecentlyViewed was added by a parallel agent and renders null for first-time visitors, so for new visitors the order is FAQ → Newsletter → Footer, matching the task spec exactly)

Verification:
- `bunx eslint` on the 4 changed/created files: 0 errors, 0 warnings (EXIT=0)
- `bunx tsc --noEmit`: no TypeScript errors in newsletter-related files (full project has pre-existing errors in playwright, resend, Breadcrumb casing — none touched)
- `bun run lint` (full project): only pre-existing errors remain in AnimatedStatValue.tsx, Header.tsx, CompareModal.tsx — none in my files
- API smoke tests via curl (origin: http://localhost:3000):
  - Valid email → 200 `{"success":true}` with Cache-Control: no-store + X-Robots-Tag: noindex, nofollow ✓
  - Invalid email → 400 `{"success":false,"error":"Please enter a valid email address."}` ✓
  - Duplicate email → 200 `{"success":true,"alreadySubscribed":true}` ✓
  - GET method → 405 `{"success":false,"error":"Method not allowed."}` with `Allow: POST` ✓
- DB verification via direct Prisma Client query: subscription row persisted with email/ip/userAgent; second INSERT for same email rejected by unique constraint and caught as P2002 → alreadySubscribed
- Cleanup: deleted the test row after verification
- Homepage HTML check: `curl http://localhost:3000/` returns HTML containing "NEWSLETTER", "Stay updated on electrical safety", and the `newsletter-email` input id — confirming server-rendered output
- dev.log shows: `POST /api/newsletter 200` (success), `POST /api/newsletter 400` (bad email), `POST /api/newsletter 200` (duplicate), `GET /api/newsletter 405` (method not allowed) — all expected
- dev.log shows: `GET / 200` consistently — homepage renders without errors after the change

Design system compliance:
- Brand colors only: be-navy-900, be-navy-850, be-yellow-500, be-yellow-400, be-charcoal-950, be-warm-white, be-grey-650, be-grey-400, white ✓
- NO indigo or blue ✓
- Rounded-xl corners ✓
- Mobile responsive (single-col mobile, two-col lg+) ✓
- Accessible: labels, aria-required, aria-invalid, aria-describedby, role="alert"/"status", aria-live, aria-busy, sr-only hints, 44px touch targets ✓
- Reveal animation: reveal-up class on SectionShell ✓
- Subtle hover effects: PrimaryButton provides hover translate/shadow ✓
- Server-rendered static content; only the form is a client island ✓

Stage Summary:
- NewsletterSubscription model added to Prisma schema and pushed to SQLite
- API route at /api/newsletter with full security controls (origin, rate-limit, validation, dedup, no-store, noindex)
- NewsletterCTA server component + NewsletterForm client island added to homepage
- Section renders between HomeFAQCTA/RecentlyViewed and Footer
- All lint/type checks pass for new files; pre-existing project errors untouched
- API smoke-tested end-to-end with curl — all status codes and bodies correct
- Homepage HTML verified to contain the new section server-side

---
Task ID: 2-c
Agent: main
Task: Add a product comparison feature (compare up to 3 products)

Work Log:
- Read existing compare files (CompareContext, CompareBar, CompareModal, CompareToggle) — all four already existed as a partial implementation that was NOT wired into the app (no provider in layout, no toggles on cards, bar required props). Extended each rather than recreating.
- Read layout.tsx, ProductRange.tsx, HomeClient.tsx, ProductsClient.tsx, products.ts, product-visuals.ts, dialog.tsx (shadcn), MobileStickyCTA.tsx for context.

Files changed:
- src/components/products/CompareContext.tsx — EXTENDED:
  • Added localStorage persistence (key `be-compare-list`) alongside the existing URL `?compare=` sync. On mount: URL takes precedence (shareable link wins), else localStorage. On every change: writes to BOTH stores. SSR-safe (typeof window guards) + try/catch around localStorage.
  • Added task-spec API as aliases/wrappers (existing API kept for the already-wired components): `addToCompare(slug)`, `removeFromCompare(slug)`, `clearCompare()`, `isInCompare(slug)`, `canAddMore` (boolean = !atCapacity), `compareCount` (number = count).
  • rAF-deferred hydration read to satisfy react-hooks/set-state-in-effect rule.

- src/components/products/CompareToggle.tsx — EXTENDED:
  • Switched icons from Scale → GitCompare (with Check when selected).
  • Two variants: `chip` (default, for in-card content) and `overlay` (opaque-on-image pill with backdrop-blur, for absolute positioning over card images).
  • Labels: "Compare" / "Remove" + live `count/3` badge.
  • Keeps preventDefault + stopPropagation so the wrapping card <Link> is not triggered.
  • role="checkbox", aria-checked, aria-label with product name + state, disabled when at capacity and not selected.

- src/components/products/CompareBar.tsx — EXTENDED (rewritten to be self-contained):
  • Dropped the `selectedNames`/`onCompare` props — now derives product names from the registry via getProductBySlug and manages its own modal open state. Drops cleanly into layout.tsx with no props.
  • Renders <CompareModal> as a sibling so it overlays the whole page.
  • Icons: GitCompare (label), X (chip remove), Trash2 (Clear), ArrowRight (Compare now), Link2/Check (Share/Copied).
  • "Comparing N of 3" label (task spec wording).
  • Position: `fixed inset-x-0 bottom-14 lg:bottom-0 z-30` — sits ABOVE the MobileStickyCTA (lg:hidden, ~56px) on mobile and flush to the bottom on desktop.
  • Slide-up entrance via translate-y-full → translate-y-0, motion-reduce respected.
  • Share button (≥2 selected) copies the ?compare= URL; aria-live "Copied!" confirmation.

- src/components/products/CompareModal.tsx — EXTENDED (rewritten on shadcn/ui Dialog):
  • Switched from a fully-custom dialog to the shared shadcn/ui Dialog (Radix UI) — gains native focus trap, Escape, body scroll lock, and overlay animation for free.
  • DialogTitle + DialogDescription rendered sr-only for screen readers.
  • Rows added per task spec: Product (image+name+View link), Category, Class, Description, Standards (badges), Material (materialProperties), Thickness (quickFacts → spec fallback), Working voltage, AC proof voltage, Applications (first 3), Key features (first 3), and a per-column footer with View product + Remove buttons.
  • Difference highlighting: a `valuesDiffer()` helper compares the projected value for each row across products; differing rows tint the sticky label cell (bg-be-yellow-50/70) and show a small yellow dot so a buyer can scan for divergence.
  • "Add more" prompt: when fewer than 2 products are selected, renders a centered prompt with a "Browse products" link instead of the table.
  • Horizontal scroll on mobile (min-w-[640px] inner container), sticky first column.
  • Per-column Remove button uses removeFromCompare(slug) with an aria-label naming the product.

- src/components/home/ProductRange.tsx — EXTENDED (surgical):
  • Imported CompareToggle + getProductBySlug.
  • In ProductGroupCard: resolves the product from the registry; only renders the toggle (overlay variant, top-right of image) for cards that map to a real product. Group pages (PVC Flooring, Other Products) have no spec table to compare, so the toggle is omitted there.
  • Card layout, hover, accent line, number badge — all untouched.

- src/app/products/ProductsClient.tsx — EXTENDED (surgical):
  • Imported CompareToggle + getProductBySlug.
  • In DomesticFeatureCard: derives slug from href, resolves product data, renders the toggle (overlay variant) in the top-right of the image only for real products. All four domestic mat cards qualify.
  • Card layout untouched.

- src/app/layout.tsx — EXTENDED:
  • Imported CompareProvider + CompareBar.
  • Wrapped {children} with <CompareProvider> and added <CompareBar /> as a sibling inside the provider, inside <body>. Provider wraps the entire page tree so toggles on the homepage and /products share one selection state, persisted to localStorage + URL.

Verification:
- `bun run lint`: 0 errors / 0 warnings in any compare-related or touched file. The 1 error (AnimatedStatValue.tsx:65 set-state-in-effect) and 1 warning (Header.tsx:615 unused eslint-disable) are PRE-EXISTING and in files I did not touch (AnimatedStatValue.tsx is an untracked file from another task).
- dev.log: one transient `useCompare must be used within a CompareProvider` error appeared in an intermediate state (CompareToggle added to ProductRange before CompareProvider was added to layout). After the layout edit, the server recompiled and all subsequent `GET /` requests returned 200 with no errors. Latest log entries are clean.
- Design system: brand colors only (be-navy-900, be-yellow-500, be-charcoal-950, be-warm-white, be-grey-650, be-yellow-text). NO indigo/blue. Rounded corners, shadows, smooth transitions. Mobile responsive. Accessible (ARIA labels, keyboard nav, focus management via Radix Dialog).

Stage Summary:
- Compare feature is fully wired end-to-end: toggle on homepage + /products cards → sticky CompareBar → CompareModal with side-by-side table.
- State persists across page navigation via localStorage (key: be-compare-list) AND is shareable via the ?compare= URL param.
- Up to 3 products compared; differences highlighted; per-column remove; "add more" prompt when <2 selected.
- Self-contained CompareBar drops into the root layout with no props.
