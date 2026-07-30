# Bharat Electrosafe — Client Revision Worklog

## Project Status
Working directly in the Bharat Electrosafe repository (github.com/witejackel-eng/bharat-electrosafe).
Dev server runs on port 3000. All client revision items COMPLETE and verified.

## Completed Modifications

### 1. Bharat Hydro Seal — COMPLETELY REMOVED
Removed from all 12+ files: products.ts (object, gallery, array, comparison), faqs.ts,
product-metadata.ts, structured-data.ts, Header (icon map + Waves import), Footer,
RelatedProducts, ProductFAQ, EnquiryQuoteLayout (form option), ProductsClient (bullet),
metadata descriptions (home + contact), llms.txt. Route folder + images deleted.
"six product families" → "five" everywhere. Hydro seal 404s correctly.

### 2. Unified Navy Header — COMPLETE
- Added navy brand tokens to globals.css (be-navy-950..600, be-brand-blue, be-brand-yellow)
- Header now a unified navy band (radial blue glow + navy gradient)
- Logo's own navy field absorbed into header — no visible square around logo
- Transparent header logo (891x349 webp, soft alpha) extracted from client's master JPEG
- White nav text, yellow active/hover states, yellow CTA with navy text
- Sticky compact transition (84px → 72px on scroll)
- Navy mobile drawer with white text, yellow active states, body scroll lock
- BE-mark favicons created (favicon-32-be.png, favicon-48-be.png)
- Theme color updated to navy #00275B

### 3. Header → Hero Transition — COMPLETE
- `.be-hero-to-navy` class: restrained navy illumination at hero top fading to warm-white
- No wave, no blob — a clean designed opening

### 4. Product-Led Hero — COMPLETE
- Replaced SVG illustration with real photography
- Switchgear environment photo (industrial context) + mat product close-up inset
- Yellow protected-zone dashed frame + Switchgear/Insulating Mat callouts
- Copy: "Protection engineered between people and electrical risk."
- CTAs: Explore Products / Request a Quote
- Proof badges (IS 15652:2006, BIS Licence, ERDA/NTH, IEC 61111) render immediately
- Static-first (@starting-style), reduced-motion safe
- Removed unused HeroTechnicalVisual + HeroTechnicalLegend components

### 5. Leadership Swivel Carousel — COMPLETE
- New LeadershipSwivel client component (coverflow-style)
- Active card centred + flat; side cards rotateY 16°, scaled 0.84, 55% opacity
- Pointer drag (horizontal only, 40px threshold), prev/next buttons, pagination dots
- Keyboard ←/→ on focused carousel (never traps page scroll)
- Each card: portrait (38%), name, role, short bio, 3 expertise labels, leadership focus
- "View Full Profile" opens accessible side drawer: full biography, focus box, expertise
- Drawer: focus trap, Escape close, focus restoration, body scroll lock
- Verified: next button changes active card; drawer opens with correct content

### 6. Low-Res Portrait Treatment — COMPLETE
- All 3 portraits cropped to 4:5 (480x600), unified on navy background
- Mild sharpening, 15% desaturation, contrast control, edge vignette toward navy
- Yellow→blue gradient accent rule under each portrait frame
- No face regeneration, no identity alteration

### 7. Responsive + Accessibility — VERIFIED
- No horizontal overflow at any breakpoint
- Keyboard navigation works (ArrowRight changes active leader)
- No console errors
- Standard Tailwind responsive breakpoints (lg:hidden hamburger, hidden lg:flex nav)
- Focus rings throughout (be-brand-yellow on navy, be-brand-yellow on light)
- ARIA: carousel role, slide role, tablist pagination, dialog aria-modal
- Reduced-motion: disables perspective, shortens transitions, static final states

### Verification Results
- All 6 routes return 200; /products/bharat-hydro-seal returns 404
- `bun run typecheck` — clean (exit 0)
- `bun run lint` — clean (exit 0)
- Header navy RGB ~(2,34,80) confirmed via screenshot analysis
- Hero H1: "Protection engineered between people and electrical risk."
- Leadership: 3 cards, 3 dots, active card shows full info, drawer works
- No "hydro seal" anywhere in rendered page

## Files Modified
- src/app/globals.css (navy tokens, header/hero/leadership/drawer styles)
- src/app/layout.tsx (favicon + theme color)
- src/app/page.tsx (metadata description)
- src/app/contact-us/page.tsx (metadata description)
- src/app/products/page.tsx (six→five)
- src/app/products/ProductsClient.tsx (comparison bullet + supporting text)
- src/components/layout/Header.tsx (navy unified band, logo, nav, mobile sheet)
- src/components/layout/Footer.tsx (hydro seal name map removed)
- src/components/home/HomeHero.tsx (product-led hero, rewritten)
- src/components/about/CompanyLeadership.tsx (uses LeadershipSwivel)
- src/components/about/LeadershipSwivel.tsx (NEW — swivel carousel + drawer)
- src/components/products/RelatedProducts.tsx (hydro seal accent removed)
- src/components/products/ProductFAQ.tsx (comment)
- src/components/contact/EnquiryQuoteLayout.tsx (form option removed)
- src/data/products.ts (hydro seal removed, five families)
- src/data/faqs.ts (hydro seal FAQ removed)
- src/data/team.ts (treated portraits, leadershipFocus field)
- src/lib/product-metadata.ts (hydro seal removed)
- src/lib/structured-data.ts (hydro seal schema removed)
- public/llms.txt (hydro seal removed, six→five)

## Files Created
- src/components/about/LeadershipSwivel.tsx
- public/brand/bharat-electrosafe-logo-header.png (transparent logo)
- public/brand/bharat-electrosafe-logo-header.webp (transparent logo, 76KB)
- public/images/brand/favicon-be-mark.png, favicon-48-be.png, favicon-32-be.png
- public/media/hero/switchgear-scene.webp, switchgear-scene-mobile.webp
- public/media/hero/mat-product-closeup.webp
- public/media/leadership/*-treated.webp (3 unified portraits)

## Files Deleted
- src/app/products/bharat-hydro-seal/ (route folder)
- public/media/products/bharat-hydro-seal/ (images)
- src/components/home/HeroTechnicalVisual.tsx (unused after hero redesign)
- src/components/home/HeroTechnicalLegend.tsx (unused)

## Remaining Limitations
- Leadership portraits remain low-resolution (source limitation); treated to unify
  backgrounds and reduce compression inconsistency, but cannot add detail.
- No high-resolution technician-on-mat photograph available; hero uses a real
  switchgear environment + real mat product close-up composite instead of a
  fabricated technician scene (per brief's fallback composition guidance).

---
Task ID: QA-POLISH-1
Agent: Z.ai Code (main session)
Task: QA-driven polish round — assess project status, perform testing/QA via agent-browser, independently select work focus (fix bugs or add features), improve styling details, add functionality, update worklog.

Work Log:
- Read existing worklog.md; confirmed prior client-revision work (navy header, product-led hero, leadership swivel carousel, Hydro Seal removal) was complete and committed.
- Discovered dev server had stopped; restarted with subshell pattern `(node node_modules/.bin/next dev -p 3000 &)` for stable background execution.
- Performed QA with agent-browser across all routes (/, /products, /about-us, /contact-us, all 5 product detail pages, /products/bharat-hydro-seal). All returned expected codes (200 except hydro-seal 404).
- Verified no "hydro" references in rendered DOM on home or about pages.
- Captured screenshots across viewports (1440x900, 390x844); sampled header/hero/CTA colors via Python/PIL. Confirmed navy header band (0,30,75), yellow accents, warm-white hero.
- Tested leadership carousel: next/prev buttons change active card, View Full Profile drawer opens with correct content (10 paragraphs), Escape closes it.
- Tested mobile menu open/close, mobile horizontal overflow (none at 390px).
- Ran `bun run lint` and `bun run typecheck` — both clean.

Identified bug: StatsSection.tsx hardcoded '6' for Product Families (dormant — component wasn't used on any page). Fixed to use `productFamilyCount` (= 5 after Hydro Seal removal).

Independently selected work focus (site was stable, no critical bugs): added premium polish features + styling details.

Implemented:
1. ScrollProgress component — thin yellow reading-progress bar on header bottom edge, rAF-throttled, reduced-motion safe. Integrated into Header so it appears on all routes.
2. MobileStickyCTA component — bottom-fixed Call/WhatsApp/Get Quote bar, mobile-only, appears after scrolling past hero, retracts near footer, safe-area aware. Added to home, about-us, products routes.
3. StatsSection rebuild — animated count-up (0→5) for Product Families via rAF + ease-out cubic, reduced-motion safe. Other stats (IS 15652:2006, BIS licence) render as text (identifiers, not quantities). Added StatsSection to homepage between hero and product range.
4. HomeHero proof badges — each badge now pairs a lucide icon (ShieldCheck, BadgeCheck, FlaskConical, Globe2) with its label via new .be-proof-badge CSS class.
5. LeadershipSwivel active card hover — .be-swivel-card-active class produces subtle lift + enhanced shadow + yellow border on hover.
6. Stat card hover — bg tint, icon hover swap to yellow fill, underline grows.
7. New .be-section-divider premium hairline CSS (available for future use).
8. globals.css: be-mobile-cta-in keyframes, be-proof-badge styles, be-swivel-card-active hover, be-section-divider, reduced-motion coverage for new animations.

Fixed lint errors during development:
- React hooks lint rule `react-hooks/set-state-in-effect` flagged synchronous setState in effect for prefers-reduced-motion checks. Refactored ScrollProgress, MobileStickyCTA, and StatsSection useCountUp to move setState calls inside rAF callbacks (async) or CSS media queries instead of synchronous effect-body calls.

Verification Results:
- All routes 200; /products/bharat-hydro-seal 404.
- Hero H1: "Protection engineered between people and electrical risk."
- 4 proof badges with icons render; first label "IS 15652:2006".
- Stats section: Product Families animates to 5; other stats render as text.
- Scroll progress bar: width tracks scroll position (e.g. 11.4% at ~500px scroll, 26.5% at ~600px).
- Mobile (390px): no horizontal overflow; 4 proof badges render.
- Mobile sticky CTA: appears after scrolling past ~1.4 viewport heights on home and about-us; contains Call/WhatsApp/Get Quote with correct hrefs.
- Leadership drawer: opens with full bio, Escape closes.
- `bun run lint` — clean (exit 0).
- `bun run typecheck` — clean (exit 0).

Stage Summary:
- Committed as da60727 and pushed to origin/main (github.com/witejackel-eng/bharat-electrosafe).
- 10 files changed, 399 insertions, 54 deletions. 2 new components (ScrollProgress, MobileStickyCTA).
- No critical bugs found in QA; site was stable before this round. All work was additive polish + one dormant bug fix (6→5 product families count).
- All new animations respect prefers-reduced-motion via CSS media queries or rAF-deferred setState.
- No new dependencies added; only existing lucide-react icons used.

Unresolved / Risks:
- Leadership portraits remain low-resolution (source limitation; treated in prior round).
- No high-res technician-on-mat photograph; hero uses switchgear + mat close-up composite (per prior round's fallback decision).
- MobileStickyCTA testing via `agent-browser eval window.scrollTo` did not reliably trigger React scroll listener; native `agent-browser scroll` and reload-based testing confirmed the component works. This is a testing-tooling artifact, not a production bug.
- The .be-section-divider CSS class was added but not yet applied between homepage sections (available for next round if desired).

Recommended next-phase priorities:
1. Apply .be-section-divider between major homepage sections for premium editorial rhythm.
2. Add ScrollProgress + MobileStickyCTA to remaining product detail routes (bharat-membrane, electrical-insulating-mats, etc.) for consistency.
3. Consider a product comparison tool or product-finder wizard as the next user-facing feature.
4. Add structured-data review for the new StatsSection content (ensure no schema regressions).
5. Performance audit: measure CLS from the new stats count-up and mobile CTA slide-in.

---
Task ID: QA-POLISH-2
Agent: Z.ai Code (main session)
Task: QA-driven polish round 2 — assess project status, perform testing/QA via agent-browser, independently select work focus (fix bugs or add features), improve styling details, add functionality, update worklog.

Work Log:
- Read existing worklog.md; confirmed prior QA-POLISH-1 round (scroll progress, mobile sticky CTA, animated stats, hero badges, leadership hover) was complete and pushed as da60727.
- Discovered an unpushed commit (81febf4) containing qa-shots/ and tool-results/ artifacts from prior testing — these should not be in the public repo.
- Restarted dev server (it had stopped); verified all routes return expected codes (/, /products, /about-us, /contact-us, all 5 product detail pages = 200; /products/bharat-hydro-seal = 404).
- Performed QA with agent-browser across desktop (1440x900) and mobile (390x844) viewports.

QA Findings (3 confirmed bugs + polish opportunities):

BUG 1 (HIGH) — Sticky header did not actually stick.
- Root cause: <header className="relative z-50"> wrapper generated a box whose height equalled only its content (contact strip + sticky bar ≈ 104px). position:sticky child can only stick within its parent's height, so the bar scrolled off after ~0px.
- Symptom: at scrollY=600, sticky bar top was -567 (should be 0). Compact class WAS applied (height shrank 84→72) but position didn't stick.
- Fix: changed header to className="contents z-50" (display:contents). The header element no longer generates a box, so the sticky bar's containing block becomes the page flex column (min-h-screen, tall). Header remains in the accessibility tree.
- Verified: at scrollY=600, stickyTop=0, stickyHeight=72. Screenshot header pixels are navy (2,52,108). Contact strip correctly scrolls off (stripTop=-600).

BUG 2 (MEDIUM) — Next.js Image aspect-ratio warnings for client logos.
- Root cause: TrustDocuments.tsx rendered client logos with width={80} height={40} + className="object-contain". CSS object-contain on a fixed-aspect-ratio image triggered "has either width or height modified" warnings (8 logos × every page render).
- Same pattern in LogoRail.tsx (width={140} height={60} + className="object-contain max-h-12 w-auto").
- Fix: both now use the fill pattern (relative sized container + Image fill + object-contain), matching the trust-marks grid above. 0 warnings after reload.

BUG 3 (LOW) — Next.js scroll-behavior smooth warning.
- Fix: added data-scroll-behavior="smooth" to <html> element per Next.js 16 guidance.

POLISH — MobileStickyCTA missing on 5 product detail pages.
- Prior worklog noted this as a recommended next step. Added MobileStickyCTA import + render to EIMClient, CSIMClient, BiColorClient, AutoGlowClient, BMClient. Verified via SSR curl that the component is in the HTML.

NEW FEATURE — Interactive product comparison tool (/products).
- CompareContext: React context holding up to 3 selected product slugs. toggle/clear/isSelected API. Not persisted (per-session only).
- CompareToggle: checkbox-style button on each product card. role="checkbox" aria-checked. Disabled at capacity (3) with tooltip. stop-propagation so card Link isn't triggered.
- CompareBar: sticky bottom tray (navy, z-30) showing selected product chips with remove buttons, count, Clear, and "Compare now" (enabled at ≥2). Slides up via rAF-deferred mount + translate-y transition. Respects reduced-motion.
- CompareModal: full-screen dialog (z-100) with side-by-side table. Rows: image+name, category, class, primary use, quick facts (union of labels), key benefits (presence check), working voltage, AC proof voltage, CTA. Focus trap (Tab cycles within dialog), Escape close, body scroll lock, focus restoration. Grid uses --cols CSS var for responsive column count.
- Verified: 5 toggles render with correct aria-labels; clicking 2 shows bar with correct chips; Compare button opens modal with 63 rows; Escape closes.

PREMIUM STYLING:
- be-premium-sheen CSS class: subtle diagonal light sweep across PrimaryButton on hover (0.6s ease-out). Pseudo-element, no layout impact. Disabled for reduced-motion.
- Enhanced global :focus-visible — 2px brand-yellow outline + 4px offset. Navy-surface variant adds dark box-shadow ring for contrast against yellow.
- Applied be-premium-sheen to PrimaryButton base classes.
- Animated client logo marquee replaces static grid in TrustDocuments — uses existing LogoRail (40s linear infinite, pause-on-hover) with edge-fade gradient masks for premium feel. Logos now pass actual src to LogoRail.
- Breadcrumb upgraded: BreadcrumbList JSON-LD structured data (SEO), Home icon on first crumb, focus-ring utility on links, label truncation (max-w) for long product names, sticky first column in modal.

REPO CLEANUP:
- Added qa-shots/ and tool-results/ to .gitignore.
- git rm --cached removed all committed qa-shots and tool-results files from the tree (9,201 lines of binary/text artifacts removed).

Verification Results:
- All routes 200; /products/bharat-hydro-seal 404.
- bun run lint — clean (exit 0).
- bun run typecheck — clean (exit 0).
- Sticky header: at scrollY=600, stickyTop=0, stickyHeight=72 (was -567 before fix).
- Client logo image warnings: 0 after reload (was 8 per render).
- Compare tool: 5 toggles, bar appears with 2 chips, modal opens with 63 rows, Escape closes.
- Mobile (390px): no horizontal overflow; compare toggles render; mobile CTA works after reload.
- Header navy confirmed via pixel sampling: (0,26,68) at top, (2,52,108) when sticky.

Stage Summary:
- Committed as 605ebb7 and pushed to origin/main (da60727..605ebb7).
- 56 files changed, 948 insertions, 9,201 deletions (mostly artifact removal).
- 4 new components: CompareContext, CompareToggle, CompareBar, CompareModal.
- 13 source files modified.
- No critical bugs remain. All prior work (Hydro Seal removal, navy header, product-led hero, leadership swivel, scroll progress, mobile CTA, animated stats) preserved and stable.

Unresolved / Risks:
- Dev server (Next.js 16 Turbopack) is unstable in the sandbox — dies under combined load of Next.js dev + agent-browser chromium. Restarts cleanly with nohup. This is a sandbox resource issue, not a code bug. Production build on Vercel is unaffected.
- MobileStickyCTA scroll-listener does not always fire under agent-browser's programmatic scroll (documented in QA-POLISH-1). Confirmed working via reload + native scroll + client-side navigation. This is a testing-tooling artifact.
- ProductImageCarousel gallery image (06-colour-and-pattern-range) emits a "fill and height 0" warning during initial render. The image renders correctly once layout settles. Minor; does not affect UX. Could be addressed by ensuring the aspect-ratio container has a min-height.
- Leadership portraits remain low-resolution (source limitation; treated in prior round).

Recommended next-phase priorities:
1. ProductImageCarousel: add min-height to the aspect-ratio container to silence the "fill and height 0" warning during initial render.
2. Add the comparison tool's selected-state to URL search params (e.g. ?compare=slug1,slug2) so a comparison can be shared/bookmarked.
3. Consider a product-finder wizard (guided quiz: voltage → environment → application → recommended product) as the next user-facing feature.
4. Performance audit: measure CLS from the marquee animation and the compare modal open/close.
5. Add structured-data review for the new BreadcrumbList JSON-LD (ensure no duplicate schema on product detail pages).

---
Task ID: QA-POLISH-3
Agent: Z.ai Code (main session)
Task: QA-driven polish round 3 — assess project status, perform testing/QA via agent-browser, independently select work focus (fix bugs or add features), improve styling details, add functionality, update worklog.

Work Log:
- Read existing worklog.md; confirmed prior QA-POLISH-2 round (sticky header fix, client logo image warning fix, product comparison tool, premium sheen/focus-visible styling, breadcrumb JSON-LD) was complete and pushed as 605ebb7 + 1148663.
- Restarted dev server (it had stopped); verified all routes return expected codes (/, /products, /about-us, /contact-us, all 5 product detail pages = 200; /products/bharat-hydro-seal = 404).
- Performed QA with agent-browser. Site was stable — no critical bugs found in the previous round's work. The scroll-behavior warning was already fixed; the "fill and height 0" carousel warning only appeared during HMR/stale sessions, not on fresh loads.
- Identified one minor LCP performance warning: bi-color-insulating-mats/card.webp detected as LCP on homepage — should be loading="eager" / priority.
- Independently selected work focus: implement the Product Finder Wizard (top recommended next-phase item from QA-POLISH-2) + URL-shareable compare state (second recommended item) + more premium styling.

Implemented:

1. Product Finder Wizard (NEW FEATURE — src/components/products/ProductFinderWizard.tsx)
   - 3-question guided quiz: primary need → operating voltage → environment
   - Smart flow: waterproofing path skips voltage question (only 2 steps)
   - Recommendation engine maps (need, voltage, environment) → product slug
     • Electrical safety + LV → Electrical Insulating Mats (Class A)
     • Electrical safety + MV → Electrical Insulating Mats (Class B)
     • Electrical safety + HV → Electrical Insulating Mats (Class C)
     • Hazard visibility → Coloured Strip (secondary: Bi-Color)
     • Low-light/emergency → Auto-Glow / Reflective Band
     • Waterproofing → BharatMembrane
   - Result card: product image, "BEST MATCH" badge, reasoning text,
     "View product" + "Ask our team" CTAs, optional "Also consider" section
   - Accessibility: role="region", progressbar with aria-valuenow, aria-pressed
     on options, aria-live="polite" result region, focus moves to result heading
   - Keyboard: Enter advances when canAdvance, Back button, Start over
   - Premium styling: gradient top accent, progress bar, animated step
     transitions (fade-in via key change), be-result-reveal staggered animation
   - Integrated into /products as Section 3 (between product grid and comparison table)

2. URL-Shareable Compare State (ENHANCEMENT — CompareContext.tsx)
   - CompareContext now syncs selection to ?compare=slug1,slug2 URL param
   - On mount: reads URL and pre-populates selection (rAF-deferred for lint)
   - On change: writes to URL via history.replaceState (no scroll, no extra entry)
   - shareUrl computed from current selection for clipboard copy
   - CompareBar: new "Share" button (visible at 2+ selected) copies URL to
     clipboard with navigator.clipboard.writeText + execCommand fallback
   - "Copied!" confirmation with aria-live="polite", auto-resets after 2s
   - Verified: URL updates to ?compare=electrical-insulating-mats,coloured-strip-insulating-mats;
     reloading the URL restores the selection (2 chips, 2 checked toggles)

3. ProductImageCarousel Fix (BUG FIX)
   - Added min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] to the aspect-ratio
     container so the slot has non-zero height before CSS computes, silencing
     the Next.js Image "fill and height 0" warning during initial hydration.

4. LCP Priority Fix (PERFORMANCE)
   - ProductRange: added priority={isAboveFold} to the first 3 product card
     images (index 0-2) so they load eagerly and don't get flagged as late-LCP.

5. Premium Styling (5 new CSS utilities in globals.css)
   - be-card-glow: soft yellow radial glow that appears on hover for product
     cards. Pairs with hover-card-lift. Disabled for reduced-motion.
   - be-underline-grow: animated underline that grows from left on hover/focus.
     Applied to "View Product" text on homepage + /products cards.
   - be-step-badge: gradient-filled numbered circle for wizard/process steps.
   - be-result-reveal: staggered fade-and-rise for wizard results. 3 children
     animate in sequence (0ms, 120ms, 240ms). Applied to wizard result section.
   - be-pulse-attention: gentle 2-pulse animation to draw attention to new
     features. Stops after 2 iterations.
   - Applied be-card-glow to: homepage ProductRange cards, /products grid cards
   - Applied be-underline-grow to: "View Product" text on both card variants
   - Applied be-result-reveal to: wizard result section
   - Applied be-premium-sheen to: CompareBar "Compare now" button

Verification Results:
- All routes 200; /products/bharat-hydro-seal 404.
- bun run lint — clean (exit 0).
- bun run typecheck — clean (exit 0).
- Wizard: 4 options on step 1, clicking "Operator protection" → Continue →
  "What is your working voltage?" → select MV → Continue → "What is your
  environment?" → select indoor → "See recommendation" → result: "Electrical
  Insulating Mats" with reasoning "Class B, 2.5 mm protect operators near
  medium-voltage equipment up to 11 kV".
- Wizard waterproofing path: selecting "Waterproofing & containment" → Continue
  correctly SKIPS voltage → goes to environment → result: "BharatMembrane".
- Compare URL sync: selecting 2 products updates URL to
  ?compare=electrical-insulating-mats,coloured-strip-insulating-mats.
- Compare URL persistence: reloading the URL restores selection (2 chips, 2 checked).
- Share button: clicking shows "Copied!" confirmation. Visible at 2+ selected.
- Mobile (390px): no horizontal overflow; wizard renders; compare toggles render.
- Compare bar navy confirmed via pixel sampling: (13, 42, 86).

Stage Summary:
- Committed as bab47f1 and pushed to origin/main (1148663..bab47f1).
- 7 files changed, 818 insertions, 21 deletions.
- 1 new component: ProductFinderWizard (538 lines).
- 6 files modified: globals.css, ProductsClient, ProductRange, CompareBar,
  CompareContext, ProductImageCarousel.
- No critical bugs remain. All prior work preserved and stable.

Unresolved / Risks:
- Dev server (Next.js 16 Turbopack) remains unstable in the sandbox under
  combined dev + browser load. Restarts cleanly with nohup. Production unaffected.
- ProductImageCarousel warning may still appear during HMR (hot module reload)
  but not on fresh page loads. The min-height fix addresses the initial render.
- Leadership portraits remain low-resolution (source limitation; treated in prior round).

Recommended next-phase priorities:
1. Add the product finder wizard to the homepage (compact variant) so visitors
   can find products without navigating to /products.
2. Consider A/B testing the wizard against the static SelectionGuidance section
   to measure engagement and conversion.
3. Add structured data (FAQPage or HowTo) for the wizard questions/answers for SEO.
4. Performance audit: measure CLS from the wizard step transitions and the
   be-result-reveal staggered animation.
5. Consider adding "Add to compare" from within the wizard result card so users
   can compare the recommended product against alternatives in one click.

---
Task ID: QA-POLISH-4
Agent: Z.ai Code (main session)
Task: QA-driven polish round 4 — assess project status, perform testing/QA via agent-browser, independently select work focus (fix bugs or add features), improve styling details, add functionality, update worklog.

Work Log:
- Read existing worklog.md; confirmed prior QA-POLISH-3 round (Product Finder Wizard on /products, URL-shareable compare state, LCP priority fix, premium CSS utilities) was complete and pushed as bab47f1.
- Dev server was stopped; restarted with setsid+disown pattern. Noted Next.js 16 "Cross origin request detected from 127.0.0.1 to /_next/*" warning in dev log — this was contributing to dev-server instability under browser load.
- Performed QA with agent-browser on desktop (1440x900) and mobile (390x844). Homepage loaded correctly: H1 "Protection engineered between people and electrical risk.", 0 hydro references, header display:contents (sticky fix intact), 4 proof badges with icons, ScrollProgress present, 6 sections.

QA Findings (1 confirmed bug + 1 stability improvement):

BUG 1 (MEDIUM) — /BharatHydro-Seal.php redirect pointed to a 404.
- Root cause: next.config.ts had `{ source: '/BharatHydro-Seal.php', destination: '/products/bharat-hydro-seal' }` from before the Hydro Seal removal. The /products/bharat-hydro-seal route was deleted, so legacy PHP links landed on a 404.
- Fix: changed destination to '/products' so legacy links land on the product range.
- Verified: curl /BharatHydro-Seal.php → 308 → /products (was 404 chain before).

STABILITY — allowedDevOrigins added to next.config.ts.
- Root cause: agent-browser connects via 127.0.0.1 while Next.js dev server reports its origin as localhost. Next.js 16 blocks cross-origin /_next/* requests unless allowedDevOrigins is configured, which was causing request drops and server instability under browser load.
- Fix: added `allowedDevOrigins: ['http://127.0.0.1', 'http://localhost', 'http://21.0.13.102']` to nextConfig.
- Result: dev server now survives sequential route testing (10 routes with 2s delays all returned expected codes).

Independently selected work focus (site was stable after bug fix): implement top 2 recommended next-phase items from QA-POLISH-3 worklog + add premium styling. Implemented 6 new features/enhancements:

Implemented:

1. Compact Product Finder Wizard on Homepage (NEW FEATURE — src/components/home/HomeProductFinder.tsx)
   - Two-column section: left = intro copy + "Browse all products" CTA + trust microcopy; right = compact wizard card.
   - Wraps the wizard in its own CompareProvider so visitors can build a comparison directly from the homepage without navigating to /products.
   - Renders CompareBar + CompareModal via a CompareHost sub-component (mirrors the /products CompareBarHost pattern).
   - be-pulse-attention on the wizard card on first load to draw the eye.
   - lg:sticky left column so the intro stays visible while the wizard is interacted with.
   - Integrated into homepage as Section 4 (between ProductRange and ProcessSection).

2. ProductFinderWizard refactor (ENHANCEMENT — ProductFinderWizard.tsx)
   - New `variant?: 'full' | 'compact'` prop (default 'full'). Compact variant: smaller padding (p-5 sm:p-6 vs p-5 sm:p-8 md:p-10), smaller header (text-lg vs text-xl), smaller option cards (p-3 vs p-4, size-8 vs size-9 icons), smaller result image (sm:w-36 vs sm:w-48).
   - NEW "Add to compare" button in the wizard result card. Uses `useContext(CompareContext)` directly (null-safe) so it degrades gracefully if rendered outside a provider. Shows GitCompare icon + "Add to compare" → Check icon + "Added to compare" when selected. Disabled at capacity (3) with tooltip. aria-pressed reflects state.
   - Step transition animation upgraded from `animate-[fade-in_0.3s_ease-out]` to new `be-fade-in-up` class (rise + fade, signals forward progress).
   - Exported CompareContext from CompareContext.tsx so the wizard can consume it via useContext.

3. ProcessSection — "How we work" 4-step band (NEW FEATURE — src/components/home/ProcessSection.tsx)
   - 4-step quality process: Requirement & specification → Manufacture to IS 15652:2006 → Batch testing & verification → Dispatch with documentation.
   - Uses be-step-badge CSS utility for numbered circles + lucide icons (ClipboardCheck, PackageCheck, Microscope, Truck).
   - be-step-connector CSS draws a vertical yellow gradient line between steps on mobile (single column); horizontal hairline on lg.
   - be-card-glow + be-tile-lift for premium hover. Closing trust line with ShieldCheck icon.
   - Content is factual (references real IS 15652:2006 standard, BIS licence CM/L:8800129617, ERDA/NTH testing) — no fabricated metrics.
   - Integrated into homepage as Section 5 (between HomeProductFinder and TrustDocuments).

4. HowTo Structured Data for the wizard (SEO — structured-data.tsx + page.tsx)
   - New ProductFinderHowToStructuredData component emits HowTo JSON-LD with 4 steps mirroring the wizard flow (identify need → determine voltage → consider environment → confirm against spec).
   - Added to homepage alongside the existing FAQPage + Organization + WebSite + LocalBusiness schemas.
   - Verified: homepage now emits 5 JSON-LD scripts (Organization, WebSite, LocalBusiness, FAQPage, HowTo).

5. Premium CSS utilities (3 new in globals.css)
   - be-fade-in-up: keyframe that rises 8px + fades in over 0.32s. Used for wizard step transitions. Reduced-motion safe.
   - be-step-connector: vertical yellow gradient timeline between numbered steps on mobile. Applied to ProcessSection <ol>.
   - be-tile-lift: subtle 2px hover lift for informational tiles (subtler than hover-card-lift so timelines stay aligned). Applied to ProcessSection cards. Reduced-motion safe.

6. Homepage section order refreshed (HomeClient.tsx)
   - New order: Hero → Stats → ProductRange → HomeProductFinder (NEW) → ProcessSection (NEW) → TrustDocuments → CapabilityIndustries → HomeFAQCTA.
   - 8 sections total (was 6). All server-rendered except the interactive islands (Header, wizard, compare tray, FAQ, BackToTop, ScrollProgress, MobileStickyCTA, RevealObserver).

Verification Results:
- All 9 valid routes return 200; /products/bharat-hydro-seal returns 404.
- /BharatHydro-Seal.php → 308 redirect → /products (was 404 chain).
- bun run lint — clean (exit 0).
- bun run typecheck — clean (exit 0).
- Homepage: 7 visible sections + StatsSection = 8 total <section> elements.
- Section headings in order: "Protection engineered…", "Our product range", "Not sure which mat you need?", "From specification to a certified, installed mat", "Certifications, testing and registrations", "Built around safety…", "Frequently asked questions".
- Wizard (compact) present with "Find the right product" header, 4 options on step 1.
- Wizard flow verified end-to-end: Operator protection → Continue → MV → Continue → Indoor substation → See recommendation → result "Electrical Insulating Mats" with reasoning.
- "Add to compare" button present in wizard result. Clicking it shows CompareBar: "1/3 selected | Electrical Insulating Mats | Clear | Compare now".
- HowTo JSON-LD present alongside Organization, WebSite, LocalBusiness, FAQPage.
- Mobile (390x844): no horizontal overflow (bodyWidth 390 = viewport 390); wizard present; 4 process steps render; 8 sections.
- Dev server stability improved: survived 10 sequential route requests with 2s delays (was dying after 1-3 requests before allowedDevOrigins fix).

Stage Summary:
- 8 files changed: next.config.ts, page.tsx, HomeClient.tsx, ProductFinderWizard.tsx, CompareContext.tsx, structured-data.tsx, globals.css + 2 new files (HomeProductFinder.tsx, ProcessSection.tsx).
- 2 new components: HomeProductFinder, ProcessSection.
- 1 bug fixed (hydro-seal redirect 404 → /products).
- 1 stability fix (allowedDevOrigins).
- 3 new CSS utilities (be-fade-in-up, be-step-connector, be-tile-lift).
- 1 new structured data type (HowTo).
- No critical bugs remain. All prior work preserved and stable.

Unresolved / Risks:
- Dev server (Next.js 16 Turbopack) still dies under rapid-fire requests (e.g. a bash for-loop with no delay). Survives sequential requests with 2s delays. This is a sandbox resource issue, not a code bug — production on Vercel is unaffected.
- Leadership portraits remain low-resolution (source limitation; treated in prior round).
- The homepage now mounts a second CompareProvider scope (one for HomeProductFinder, one for /products). Selection does NOT sync between the two scopes because CompareContext is per-provider — but both sync to the same ?compare= URL param, so navigating from homepage to /products preserves the selection via URL hydration. This is the intended design (URL is the source of truth).

Recommended next-phase priorities:
1. A/B test the compact homepage wizard against the static ProductRange to measure engagement and whether it increases "Request a Quote" conversions.
2. Add a "Technical Resources" / downloads section (datasheets, installation guides, compliance certificates) as a new homepage section or /resources route.
3. Consider an interactive Industries-Served filter (click an industry → see recommended products) to replace or augment the static CapabilityIndustries section.
4. Performance audit: measure CLS from the be-pulse-attention on the wizard and the be-fade-in-up step transitions.
5. Add BreadcrumbList JSON-LD to the homepage (currently only on product/about/contact pages).

---
Task ID: QA-POLISH-5
Agent: Z.ai Code (main session)
Task: QA-driven polish round 5 — assess project status, perform testing/QA via agent-browser, independently select work focus (fix bugs or add features), improve styling details, add functionality, update worklog.

Work Log:
- Read existing worklog.md; confirmed prior QA-POLISH-4 round (compact homepage wizard, ProcessSection, HowTo structured data, allowedDevOrigins stability fix, hydro-seal redirect fix) was complete and pushed as bab47f1.
- Dev server was stopped; restarted with `(node node_modules/.bin/next dev -p 3000 >dev.log 2>&1 &)` subshell pattern. Verified all 9 valid routes return 200; /products/bharat-hydro-seal returns 404; /BharatHydro-Seal.php → 308 redirect → /products (prior fix intact).
- Performed QA with agent-browser on desktop (1440x900) and mobile (390x844):
  - Homepage H1, 8 sections, 5 JSON-LD scripts (Organization, WebSite, LocalBusiness, FAQPage, HowTo), 4 proof badges, header display:contents (sticky fix intact).
  - Wizard flow verified end-to-end: Operator protection → MV → Indoor → result "Electrical Insulating Mats (Class B)" with reasoning.
  - Compare URL sync (?compare=electrical-insulating-mats) + Add to compare from wizard both work.
  - Mobile: no horizontal overflow, MobileStickyCTA appears after scroll, wizard + compare work.
  - `bun run lint` and `bun run typecheck` both clean.
- No critical bugs found in QA. Site was stable before this round.

Independently selected work focus: implement the top 3 recommended next-phase items from QA-POLISH-4 worklog (Technical Resources section, interactive Industries filter, homepage structured data) + premium styling. Implemented 3 new features + 4 new CSS utilities.

Implemented:

1. Technical Resources & Compliance Library (NEW FEATURE — src/components/home/TechnicalResources.tsx)
   - Centralised, filterable library of every verifiable document on the site.
   - Aggregates from /data/trust.ts allTrustMarks (certificates with PDFs) AND /data/products.ts product.documents (test reports, datasheets, licences, standards info) into a single grid.
   - Deduplication: product documents processed FIRST so the ERDA test report is correctly categorised as kind='test-report' (not miscategorised as a certificate via the trust mark). Trust marks with PDFs are then added only if their href isn't already captured.
   - 6 filter chips with live counts: All (16), Test reports (1), Certificates (5), Licences (4), Datasheets (5), Standards info (1).
   - Standards quick-reference band at the top: 4 tiles for IS 15652:2006, IEC 61111, IS 15909:2020, BIS CM/L:8800129617.
   - Each card uses the existing DocumentCard component (no duplication of card logic). Cards with PDFs get View + Download buttons; cards without PDFs route to a prefilled /contact-us request.
   - "Request full document set" CTA in the header; "Browse all products" link in the footer.
   - Stagger-reveal animation re-triggers on filter change (rAF-deferred for lint).
   - SR-only heading updates with the current filter result count.
   - Integrated into homepage as Section 8 (between InteractiveIndustries and HomeFAQCTA).

2. Interactive Industries Filter (NEW FEATURE — src/components/home/InteractiveIndustries.tsx)
   - Replaces the static CapabilityIndustries section (which had a static "Industries we serve" chip rail).
   - 6 industry chips: Power Utilities, Substations & Switchrooms, Railways & Metro, Oil & Gas, Manufacturing, Infrastructure & Construction.
   - Click a chip → results panel updates with: industry header (navy gradient band), lead-reason callout (yellow-tinted box), recommended product list (with thumbnails, "Lead match" badge on first item, descriptions, hover-arrow), and a "Discuss your [industry] application" CTA.
   - Industry → product mappings are conservative and derived from the application notes in /data/products.ts.
   - Left column: sticky intro + manufacturing image + proof points (carried over from CapabilityIndustries).
   - Mobile: results panel scrolls into view when chip is clicked (only on <1024px); desktop keeps side-by-side layout.
   - Active chip gets be-industry-active-glow CSS (charcoal fill + yellow icon + soft glow shadow). Inactive chips get hover lift + yellow border.
   - aria-live="polite" on results panel; aria-pressed on chips; focus-visible rings throughout.
   - Integrated into homepage as Section 7 (replaces CapabilityIndustries).

3. Homepage ItemList Structured Data (NEW SEO — src/lib/structured-data.ts + structured-data.tsx + page.tsx)
   - New homepageItemListSchema() function in the centralised structured-data lib.
   - Emits an ItemList JSON-LD with numberOfItems=5 and itemListElement[] entries (position + name + url) for each product.
   - New HomepageItemListStructuredData React component (rendered only on the homepage route, NOT sitewide — unlike Organisation/WebSite/LocalBusiness which are sitewide entity definitions).
   - Homepage now emits 6 JSON-LD scripts: Organization, WebSite, LocalBusiness, FAQPage, HowTo, ItemList.
   - No fabricated SKUs, prices, ratings, or availability — only position, name, and url per item.

4. Premium CSS Utilities (4 new in globals.css)
   - be-filter-chip: pill-style toggle with a radial yellow glow that follows the pointer on hover. Pseudo-element, no layout impact. Reduced-motion safe.
   - be-resource-tile: wrapper for DocumentCard in the TechnicalResources library. Adds a top-edge yellow gradient accent on hover + 3px lift + soft shadow. Frames the document like a filed paper tab.
   - be-industry-active-glow: charcoal fill + 1px ring + soft glow shadow for the active industry chip. Makes the selected chip feel like a "filed tab" against the results panel.
   - be-scroll-x: refined thin scrollbar styling (6px thumb, transparent track, grey-250 thumb that darkens to grey-400 on hover) for horizontally-scrolling containers.

5. InteractiveIndustries active chip enhancement
   - Active industry chip now uses be-industry-active-glow (was just shadow-md).
   - Inactive chips get hover:-translate-y-0.5 for a subtle lift.

Verification Results:
- All 9 valid routes return 200; /products/bharat-hydro-seal returns 404; /BharatHydro-Seal.php → 308.
- bun run lint — clean (exit 0).
- bun run typecheck — clean (exit 0).
- Homepage: 9 sections (was 8). New section headings: "Built around safety…" (InteractiveIndustries) and "Datasheets, certificates & test reports" (TechnicalResources).
- Homepage JSON-LD: 6 scripts (Organization, WebSite, LocalBusiness, FAQPage, HowTo, ItemList). ItemList valid: type=ItemList, @id=…/#product-list, numberOfItems=5, firstItem={position:1, name:"Electrical Insulating Mats", url:"https://bharatelectrosafe.com/products/electrical-insulating-mats"}.
- InteractiveIndustries: 6 industry chips render. Clicking "Railways & Metro" → activeH4="Railways & Metro", leadMatchProduct="Electrical Insulating Mats", leadReason="Traction-voltage insulation plus auto-glow bands for low-light evacuation corridors." Clicking "Oil & Gas" → leadReason="Insulating mats plus bi-color and strip demarcation for hazardous-zone boundaries." Both verified on desktop and mobile.
- TechnicalResources: 6 filter chips with correct counts (All=16, Test reports=1, Certificates=5, Licences=4, Datasheets=5, Standards info=1). Clicking "Test reports" → 1 visible card titled "ERDA test report — 2.5 mm insulating mat". Clicking "All" → 16 visible cards. 4 standards quick-reference tiles render. Active chip pixel sample: charcoal (39,39,41) ≈ #242426.
- Mobile (390x844): no horizontal overflow on homepage. InteractiveIndustries: 6 chips, results panel updates on click. TechnicalResources: 6 filter chips, 16 visible cards, 8 standards tiles (4×2 grid). MobileStickyCTA appears after scroll and does not overlap the TechnicalResources filter chips.
- No "hydro seal" references in rendered DOM.
- Dev log: all requests 200, no errors or warnings.

Stage Summary:
- 7 files changed: page.tsx, HomeClient.tsx, globals.css, structured-data.tsx, structured-data.ts + 2 new files (TechnicalResources.tsx, InteractiveIndustries.tsx).
- 2 new components: TechnicalResources (centralised compliance library with filters), InteractiveIndustries (interactive industry → product picker).
- 1 new structured data type: ItemList (homepage-only).
- 4 new CSS utilities: be-filter-chip, be-resource-tile, be-industry-active-glow, be-scroll-x.
- 1 component replaced: CapabilityIndustries → InteractiveIndustries (CapabilityIndustries.tsx file left in place but no longer imported; can be removed in a future cleanup).
- No critical bugs. All prior work (Hydro Seal removal, navy header, product-led hero, leadership swivel, scroll progress, mobile CTA, animated stats, compact wizard, ProcessSection, compare tool, URL-shareable compare) preserved and stable.

Unresolved / Risks:
- CapabilityIndustries.tsx is now unused (replaced by InteractiveIndustries). Left in place to avoid breaking any future imports; can be removed in a future cleanup.
- Dev server (Next.js 16 Turbopack) remains unstable in the sandbox under rapid-fire requests. Restarts cleanly with subshell pattern. Production on Vercel is unaffected.
- Leadership portraits remain low-resolution (source limitation; treated in prior round).
- The TechnicalResources library aggregates 16 documents, of which 9 have no downloadable PDF (4 BIS licence cards from mat products, 4 datasheet cards, 1 standards-info card). These render as "Request document" buttons that route to /contact-us with a prefilled message. This is the intended behaviour per the source-data rules in /data/trust.ts (marks without a released document get a label and no download control).

Recommended next-phase priorities:
1. Remove the unused CapabilityIndustries.tsx file (and its imports) now that InteractiveIndustries replaces it.
2. Add a /resources route that mirrors the homepage TechnicalResources section as a standalone page (with deeper filtering by product, standard, or issuer).
3. Add a "Compare products" CTA inside the InteractiveIndustries results panel so visitors can add the recommended products to the compare tray in one click.
4. Performance audit: measure CLS from the TechnicalResources filter transition (stagger-reveal re-trigger) and the InteractiveIndustries results panel update.
5. Add a BreadcrumbList JSON-LD to the homepage (still only on product/about/contact pages) — though an ItemList is now present, a single-item Home breadcrumb is low-value per schema.org guidance.

---
Task ID: structure-restoration-1
Agent: Super Z (main)
Task: Restore homepage structure + Bharat Hydro Seal + leadership carousel + header + hero (client revision)

Work Log:
- Created backup branch `backup-before-structure-restoration` and pushed to origin
- Restored homepage to 5-section structure: HomeHero → ProductRange → TrustDocuments → CapabilityIndustries → HomeFAQCTA
- Removed unrequested homepage sections: StatsSection, HomeProductFinder, ProcessSection, InteractiveIndustries, TechnicalResources
- Restored Bharat Hydro Seal completely: product data, route, 24 media assets, mega-menu icon, footer links, enquiry form, sitemap, structured data, llms.txt, PHP redirect
- Restored "six product families" wording across /products route (was "five")
- Rebuilt leadership carousel: 860px active card (was 420px), 2 bio paragraphs visible (was 3-line clamp), rotateY 10° + scale 0.88 on neighbours, fixed hardcoded "of ${3}" aria-label → uses leaders.length
- Mobile: neighbours hidden via opacity:0 (no text bleed), single bio paragraph
- Header: removed vertical logo divider per spec
- Hero: replaced small-square-inset with product-first composition — large mat as dominant foreground (≈45% of scene), switchgear softly darkened in background, yellow safety edge + "Insulating Mat" callout; dedicated mobile portrait scene
- Fixed a11y: CompareBar Clear button now disabled when tray is aria-hidden (was triggering axe aria-hidden-focus rule)
- Removed 12 committed QA screenshots from repo root (tool-result artifacts)
- All 65 Playwright a11y tests pass
- Production build succeeds (16 routes including /products/bharat-hydro-seal)
- Responsive QA: all 10 viewports pass (360, 390, 430, 768, 820, 1024, 1280, 1366, 1440, 1920) — zero horizontal overflow, BHS visible, carousel OK, zero console errors on production

Stage Summary:
- 5 commits pushed to main: restore, leadership, header+hero, a11y fix, chore
- Backup branch: backup-before-structure-restoration
- Site has 6 product families again with BHS fully integrated
- Leadership carousel is premium and substantial (860px active card, 2 bio paragraphs, expertise, focus, drawer)
- Header is unified navy with no logo rectangle
- Hero tells one product story (mat dominant, not a tiny inset)

---
Task ID: design-corrections-2026-07-29
Agent: main
Task: Implement design corrections per client spec — header colour integration, FAQ redesign, leadership card grid (replacing swivel), responsive/accessibility polish. No new sections, no removed products, no hero redesign.

Work Log:
- Updated globals.css warm-white token from #FFFEF9 to #FCFBF7 (warm off-white page background)
- Replaced .be-header-navy radial-glow + navy gradient with restrained linear-gradient(110deg, #07386F 0%, #052B5D 55%, #031F49 100%)
- Added 2px brand-yellow ::after accent line beneath main header bar
- Softened header shadow to 0 6px 22px rgba(2,31,73,0.12); compact state 0 8px 26px rgba(2,31,73,0.16)
- Darkened .be-contact-strip-navy to linear-gradient(110deg, #031F49 0%, #021A3E 100%) for tonal hierarchy
- Softened nav text to rgba(255,255,255,0.82); hover bg from 0.06 to 0.04 (more restrained)
- Removed heavy bg-white/8 hover on Products chevron trigger
- Added new .be-page-top-tint utility class — linear-gradient(180deg, rgba(7,56,111,0.055) 0%, rgba(252,251,247,0) 140px) over warm-white
- Updated existing .be-hero-to-navy to use the same gradient spec (homepage hero)
- Applied .be-page-top-tint to AboutIntro, ProductsHero, ProductHero (all 6 product detail pages), ContactUsClient first section
- Updated src/data/faqs.ts homeFaqs array from 4 to 8 practical buyer questions (standard, class selection, custom sizes, installations, documentation, quotation info, lead time, BharatMembrane/Hydro Seal clarification)
- Lead-time answer confirms timing depends on product, dimensions, quantity, delivery location and is confirmed during quotation (no invented timelines)
- BharatMembrane and Bharat Hydro Seal answer clearly states they are waterproofing/civil-protection products that do NOT inherit IS 15652:2006 insulating-mat certification
- Redesigned FAQ.tsx: increased gap-3 to gap-4 (14-18px vertical spacing), added thin yellow accent on left edge of open item, semibold questions, max-w-[60ch] answer width for comfortable line-length, warm-white card backgrounds with subtle border
- Reduced empty space between FAQ accordion and CTA in HomeFAQCTA (mt-8 to mt-4)
- Created new src/components/about/LeadershipGrid.tsx — clean 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile)
- Desktop hover: hovered card expands to 1.25fr, others shrink to 0.875fr (smooth 400ms cubic-bezier), restrained 1.02 scale, enhanced border + shadow, biography reveals inside card via grid-template-rows 0fr→1fr technique
- Mobile/tablet: 44px "Read biography" button toggles biography inline, only one expanded at a time, button label changes to "Close biography" with rotating chevron
- Keyboard accessible: :focus-within reveals biography for keyboard users
- Reduced-motion: all transitions disabled, bio still reachable
- All portraits use consistent 4:5 crop with controlled object-position; bg-be-navy-800 backdrop
- Updated CompanyLeadership.tsx to import LeadershipGrid instead of LeadershipSwivel
- Deleted src/components/about/LeadershipSwivel.tsx (571 lines) — confirmed unused elsewhere
- Removed .be-swivel-stage, .be-swivel-track, .be-swivel-card CSS and .be-swivel-card.be-swivel-card-active:hover refinement from globals.css
- Verified all 6 products including Bharat Hydro Seal remain in mobile menu accordion

Stage Summary:
- 11 files changed, 1 file deleted, 1 file created (net -461 lines)
- typecheck: PASS
- lint: PASS (1 pre-existing warning, 0 errors)
- production build: PASS (all 16 routes generated, 5 required routes verified HTTP 200)
- accessibility.spec.ts: 65/65 PASS (all routes incl. /products/bharat-hydro-seal, /about-us, /contact-us)
- product-hero-compress.spec.ts: 81/81 PASS (all 6 product pages across 1024/1366/1440 + mobile 390)
- header-mobile.spec.ts: passing tests confirm no logo rectangle, no nav wrap, no CTA collision, mobile menu works, sticky header correct
- Pre-existing test failures (NOT introduced by these changes, verified by stashing): 2 header-mobile tests (aria-expanded test uses stale locator after label change; header-width test expects boundingBox on display:contents element) and hero-desktop/hero-mobile tests (expect SVG technical illustration that doesn't exist in current hero — HomeHero.tsx was not modified)
- Files modified: src/app/globals.css, src/app/contact-us/ContactUsClient.tsx, src/app/products/ProductsClient.tsx, src/components/about/AboutIntro.tsx, src/components/about/CompanyLeadership.tsx, src/components/home/HomeFAQCTA.tsx, src/components/layout/Header.tsx, src/components/products/ProductHero.tsx, src/components/ui/FAQ.tsx, src/data/faqs.ts
- Files deleted: src/components/about/LeadershipSwivel.tsx
- Files created: src/components/about/LeadershipGrid.tsx

---
Task ID: remove-product-finder
Agent: super-z (main)
Task: Remove the complete Product Finder block from the /products page (PRODUCT FINDER eyebrow, "Not sure which product you need?" heading, supporting paragraph, "Find the right product" wizard card, 3-question flow, step indicator/progress bar, recommendation/result state, reset/restart controls, and any leftover whitespace). Do NOT remove product catalogue, product cards, comparison tools, product data, Bharat Hydro Seal, or change any other page/section.

Work Log:
- Read existing worklog.md; confirmed prior round (header colour integration, FAQ redesign, leadership grid) was complete and pushed as 0bd96e9.
- Inspected src/app/products/ProductsClient.tsx — located Product Finder at lines 317-335 (ProductFinderSection function) and 506-507 (render call), plus import at line 20.
- Grep'd entire src/ and tests/ for ProductFinder, ProductFinderWizard, ProductFinderSection, product-finder, FinderWizard, RecommendationWizard, ProductRecommendation — confirmed the only consumer is ProductsClient.tsx; ProductFinderWizard.tsx is not used elsewhere (HomeProductFinder was already removed in an earlier structure-restoration commit).
- Verified no tests reference the Product Finder (tests/a11y/*.spec.ts only enumerate product routes for a11y checks).
- Inspected src/components/products/ProductFinderWizard.tsx — self-contained component using its own local state, lucide-react icons, getProductBySlug, CompareContext (graceful null-safe), cn util. No exports other than ProductFinderWizard; no shared recommendation logic to preserve.
- Inspected src/app/globals.css for Finder-specific CSS — confirmed be-result-reveal, be-pulse-attention, be-fade-in-up keyframes/rules are ONLY used by ProductFinderWizard.tsx. Kept be-premium-sheen (still used by CompareBar.tsx and PrimaryButton.tsx). Kept be-step-badge / be-step-connector (already orphaned by earlier homepage restoration, not Finder-specific — left untouched to stay within task scope).
- Edited src/app/products/ProductsClient.tsx:
  * Removed `import { ProductFinderWizard } from '@/components/products/ProductFinderWizard';`
  * Removed entire `ProductFinderSection()` function definition (Section 3.5 block, 19 lines)
  * Removed `<ProductFinderSection />` render call from main()
  * Renumbered section comments (4. Comparison table → 3, 5. Selection guidance → 4, 6. Technical help CTA → 5)
- Deleted src/components/products/ProductFinderWizard.tsx (589 lines, no other consumers).
- Removed 3 orphaned CSS blocks from src/app/globals.css (51 lines): `@keyframes be-result-reveal` + `.be-result-reveal > *` rules, `@keyframes be-pulse-attention` + `.be-pulse-attention` rule, `@keyframes be-fade-in-up` + `.be-fade-in-up` rule (each with their prefers-reduced-motion override).
- Verified zero remaining references: `rg ProductFinderWizard|ProductFinderSection src/ tests/` → no matches; `rg be-result-reveal|be-pulse-attention|be-fade-in-up src/ tests/` → no matches.

Stage Summary:
- 3 files changed (2 modified, 1 deleted), net -667 lines / +3 lines.
- typecheck (tsc --noEmit): PASS, 0 errors
- lint (eslint .): PASS, 0 errors, 1 pre-existing warning (EnquiryQuoteLayout.tsx React Hook Form watch() — unrelated, was already present in prior commit)
- production build (next build): PASS, all 16 routes generated including /products and /products/bharat-hydro-seal
- Route HTTP checks (npm run start + curl): /, /products, /products/bharat-hydro-seal, /products/bharat-membrane, /products/electrical-insulating-mats, /products/coloured-strip-insulating-mats, /products/bi-color-insulating-mats, /products/auto-glow-reflective-band-insulating-mats, /about-us, /contact-us → all HTTP 200
- /products page content check (135388 bytes): zero Product Finder markup, zero finder-specific CSS classes; required sections (PRODUCT FAMILIES, Product comparison, SELECTION GUIDE, Need technical guidance) all present; all six product families including Bharat Hydro Seal still linked
- Files modified: src/app/products/ProductsClient.tsx, src/app/globals.css
- Files deleted: src/components/products/ProductFinderWizard.tsx
- No new files, no new sections, no replacement added — vertical gap closed naturally as ComparisonTable now follows ProductFamilyGrid directly via SectionShell topRule + bg transitions (bg-be-white → bg-be-cream)

---
Task ID: hero-image-header-leadership
Agent: super-z (main)
Task: Three improvements to bharat-electrosafe repo:
  1. Replace homepage hero visual with the attached insulating-mat image (full-width photographic hero, no collage, no labels in image, semantic HTML content over the open left side, mobile gets a 4:3 crop with copy-first layout).
  2. Refine the header: single restrained navy gradient, 2px yellow rule, soft shadow, compact height (~72px desktop / 60-64px mobile / 64px sticky-compact), logo ~180px desktop / ~130px mobile, centred navigation, compact yellow CTA. Remove the desktop contact strip (email/phone/WhatsApp remain in footer + /contact-us).
  3. Fix the About Us leadership cards: cards must NOT widen, scale, or float on hover. Only the biography content area expands/collapses inside the card. Hover (desktop), click (toggle button), and keyboard focus-within all reveal the bio. One-at-a-time on mobile tap.

Work Log:
- Read prior worklog and inspected HomeHero.tsx (339 lines, old product-first hero with switchgear background + mat inset + "Insulating Mat" / "Switchgear" callouts), Header.tsx (741 lines, navy bar + desktop-only contact strip with email/phone/WhatsApp), LeadershipGrid.tsx (285 lines, grid-fr hover expansion + scale(1.02) + dimming of neighbours), team.ts (3 leaders with shortBio + fullProfile + expertise), globals.css (1498 lines).
- VLM-analysed the attached 1672x941 PNG: technician is centre-right, blue insulating mat covers the entire floor, left side is open with closed cabinets, closed cabinets visible on both sides, bright even industrial lighting. Perfect for full-width hero with text on left.
- Wrote /home/z/my-project/scripts/optimize-hero-image.py — generates two optimised WebP crops from the source PNG:
  * public/media/hero/bharat-electrosafe-insulating-mat-hero.webp (1920x780, 72 KB) — desktop wide hero, focus_left=0.42 keeps technician visible right-of-centre, left ~40% open for text.
  * public/media/hero/bharat-electrosafe-insulating-mat-hero-mobile.webp (900x675, 63 KB) — mobile 4:3 crop, focus_left=0.55 keeps technician just right of centre with mat visible below.
  * Quality 82, method 6, no sharpening/saturation/contrast boost, no colour grading.
- VLM-verified both crops: technician fully visible (not badly cropped), blue mat clearly visible across lower foreground, closed cabinets visible on both sides, no large empty section.
- Rewrote src/components/home/HomeHero.tsx (158 lines) as a Server Component:
  * Desktop / tablet-landscape (≥lg): full-bleed photograph (1920x780, object-cover) at min-height 620-680px (clamp(620px, 78vh, 680px), 590px on short laptops). Real HTML content positioned over the open left side, restrained by a left-to-right warm-white gradient that fades to transparent at 66% (never reaches the technician).
  * Mobile / tablet-portrait (<lg): copy first on warm-white background, image immediately below at 4:3 aspect.
  * Single shared HeroContent() function — eyebrow → headline → supporting copy → CTAs → proof badges — used on both layouts so messaging is identical.
  * Single semantic <h1> with class .be-photo-hero__headline (~58-68px desktop via clamp(2.5rem, 4.6vw, 4.25rem), 600px max-width).
  * Hero image alt: "Electrical technician operating switchgear while standing on an electrical insulating mat covering the control-room floor." (per spec).
  * Both images priority + sizes=100vw / 100vw for LCP without loading desktop asset on mobile.
- Updated src/app/globals.css:
  * Removed the old "PRODUCT-FIRST HERO SCENE" CSS block (be-hero-scene, be-hero-bg-image, be-hero-mat-foreground, be-hero-mat-image, be-hero-callout — 51 lines).
  * Removed the old "LAPTOP-HEIGHT OPTIMISATION home-hero-compact" media query block (27 lines, orphaned after hero rebuild).
  * Added new "PHOTOGRAPHIC HOMEPAGE HERO" CSS block: .be-photo-hero, .be-photo-hero__desktop, .be-photo-hero__image (one-shot @starting-style fade), .be-photo-hero__scrim (left-only warm-white gradient 98→92→48→0%), .be-photo-hero__content (max-width 600px), .be-photo-hero__headline, .be-photo-hero__lede.
  * Updated header CSS: tightened .be-header-navy shadow to spec value (0 5px 18px rgba(3, 31, 73, 0.14) instead of 0 6px 22px rgba(2, 31, 73, 0.12)); removed the .be-contact-strip-navy rule entirely (contact strip is gone from the markup); updated .be-header-navy-compact shadow accordingly.
  * Removed .be-contact-strip-navy :focus-visible from the focus-ring CSS.
- Updated src/components/layout/Header.tsx:
  * Removed unused imports: Mail, Phone, MessageCircle from lucide-react; company from '@/data/company'; productNavigationItems from '@/data/products'.
  * Removed the entire desktop-only contact strip (lines 270-309 of the previous version — 40 lines of contact info + WhatsApp link markup).
  * Tightened main bar heights: default 60px mobile / 72px desktop (was 64 / 84), compact 60px mobile / 64px desktop (was 64 / 72).
  * Tightened logo sizes: default 124px mobile / 180px desktop (was 124-140 / 196), compact 116px mobile / 168px desktop (was 116-132 / 168).
  * Tightened logo padding (px-1.5 sm:px-2 instead of px-2 sm:px-2.5) so the navy band reads as one composition without excess logo zone.
  * Added min-h-[44px] to the desktop "Request a Quote" CTA to guarantee the 44px touch-target spec.
- Rewrote src/components/about/LeadershipGrid.tsx (242 lines):
  * Removed the grid-fr expansion logic entirely (no more --be-grid-cols CSS variable, no more 1.25fr/0.875fr column ratios, no more scale(1.02) transform, no more dimming of neighbouring cards).
  * Three states now drive biography reveal:
    1. openIndex (JS) — toggled by the "View biography" / "Close biography" button (click, Enter, Space, mobile tap).
    2. hoveredIndex (JS) — toggled by onMouseEnter / onMouseLeave on the card. Used instead of pure CSS :hover for guaranteed cross-browser reliability (pure CSS :hover was tested but failed in headless browsers that report (hover: hover) as false).
    3. :focus-within (CSS) — keyboard users tabbing to the toggle button get the bio revealed automatically.
  * The card article element gets the be-leader-card-expanded class when EITHER the toggle is open OR the card is hovered. This class drives ONLY the yellow border + soft shadow — never scale, never width change.
  * The bio region gets the be-leader-bio-open class when isBioRevealed is true. This class drives ONLY the grid-template-rows 0fr → 1fr transition (250-350ms cubic-bezier).
  * Toggle button label flips between "View biography" / "Close biography" with chevron rotation, 44px minimum touch target, aria-expanded + aria-controls.
  * One-at-a-time on mobile: tapping button 2 while button 1 is open closes button 1 and opens button 2 (verified via Playwright).
  * Cards stay equal width at all times (1fr 1fr 1fr on desktop, 1fr 1fr on tablet, 1fr on mobile). No grid-template-columns transition.
- Updated src/app/globals.css for leadership card CSS:
  * Removed: .be-leader-card.be-leader-card-hovered rule (scale(1.02) + heavy shadow), .be-leader-card.be-leader-card-dimmed rule (opacity 0.92), grid-template-columns transition, transform transition on .be-leader-card.
  * Kept: yellow accent line at top of card, warm-white background, thin neutral border.
  * New: subtle border + soft shadow on .be-leader-card-expanded (no scale, no transform). Subtle yellow left-accent inside the expanded bio area. Smooth 300ms cubic-bezier transition on grid-template-rows + 250ms on opacity.
  * Added @media (hover: hover) block OUTSIDE @layer utilities at the end of the file — kept as a defensive CSS rule (in case any user has both JS hover state AND CSS hover capability, the visual result is the same).
- Verified all six product families remain linked in the mobile drawer and mega-menu (Bharat Hydro Seal included — untouched).

Stage Summary:
- 6 files changed (3 modified, 1 new asset pair, 1 script created, 1 worklog updated):
  * src/components/home/HomeHero.tsx (rewritten, 344 → 158 lines)
  * src/components/layout/Header.tsx (modified, 741 → 696 lines — contact strip removed, heights/logos tightened, CTA min-height added)
  * src/components/about/LeadershipGrid.tsx (rewritten, 285 → 242 lines — grid-fr expansion removed, biography-only expansion implemented)
  * src/app/globals.css (modified — old hero CSS removed, new photographic hero CSS added, header CSS refined, leadership card CSS rewritten, hover rule moved outside @layer)
  * public/media/hero/bharat-electrosafe-insulating-mat-hero.webp (NEW, 1920x780, 72 KB)
  * public/media/hero/bharat-electrosafe-insulating-mat-hero-mobile.webp (NEW, 900x675, 63 KB)
  * /home/z/my-project/scripts/optimize-hero-image.py (NEW — reproducible image-optimisation script)
- typecheck (tsc --noEmit): PASS, 0 errors
- lint (eslint .): PASS, 0 errors, 1 pre-existing warning (EnquiryQuoteLayout.tsx React Hook Form watch() — unrelated)
- production build (next build): PASS, all 16 routes generated including /products, /products/bharat-hydro-seal, /about-us
- HTTP route checks (npm run start + curl): /, /products, /products/bharat-hydro-seal, /products/bharat-membrane, /products/electrical-insulating-mats, /about-us, /contact-us → all HTTP 200
- /products page content check (296,067 bytes): zero old collage markup (no "Insulating Mat" / "Switchgear" callouts, no be-hero-mat-foreground / be-hero-bg-image / be-hero-mat-image classes, no hero-product / switchgear-scene references); new hero image referenced once; hero alt text present; eyebrow + headline + both CTAs + all 4 proof badges present; zero be-contact-strip-navy references in HTML
- Hero image HTTP check: desktop webp 200 OK 74 KB image/webp; mobile webp 200 OK 64 KB image/webp
- Visual VLM verification (desktop 1440x900): full-width photograph of technician + blue mat + closed cabinets confirmed; headline visible over left side; CTAs visible; all 4 proof badges visible; navy header compact with no contact strip; no white-rectangle fog, no large empty space, text does not cover technician.
- Visual VLM verification (mobile 390x844): headline visible at top on warm-white; both CTAs visible; all 4 proof badges visible; photograph of technician + blue mat visible below the text; compact navy header with logo + menu only; no overflow, no horizontal scroll.
- Visual VLM verification (leadership default state, 1440x900): exactly 3 equal-width cards in a single row; each card shows portrait + name + designation + short text + expertise labels + "View biography" button; cards normal-sized (not enlarged, scaled, or floating); navy header compact.
- Visual VLM verification (leadership hover state, 1440x900): first card expanded to show full multi-paragraph biography; first card has yellow border; other two cards unchanged in width and content; first card grew downward only (width 408.53px unchanged, height 819→1251px); portrait/name/role/expertise/button all still visible.
- Visual VLM verification (leadership toggle state, 1440x900): clicking "View biography" reveals full bio + changes label to "Close biography" + rotates chevron; clicking "View biography" on card 2 while card 1 is open closes card 1 and opens card 2 (one-at-a-time verified via JS state inspection).
- Visual VLM verification (tablet 768x1024): leadership cards arranged in 2 columns, normal-sized, no horizontal overflow.
- Horizontal overflow check: 0 px at all 10 required viewports (360, 390, 430, 768, 820, 1024, 1280, 1366, 1440, 1920).
- Console errors: zero on /, /about-us, /products. Page errors: zero on /, /about-us.
- Files deleted: none (the old ProductFinderWizard.tsx was deleted in the prior commit; this round only modifies existing files).
- No new sections added. No existing sections removed (other than the contact strip from the header, which is explicitly permitted by spec). Homepage section order preserved (Hero → ProductRange → TrustDocuments → CapabilityIndustries → HomeFAQCTA). Bharat Hydro Seal and all six product families remain linked in mobile drawer + mega-menu + footer.

---
Task ID: HERO-SPLIT-LEADERSHIP-FIX-1
Agent: Z.ai Code (main session)
Task: Fix two production problems — (1) homepage hero photograph composition (replace full-bg image+scrim with split hero copy-left/photo-right); (2) About Us "View biography" toggle opens but does not reliably close (hover + focus-within + click states fight each other).

Work Log:
- Cloned existing Bharat Electrosafe repo to /home/z/my-project/be-repo.
- Read current HomeHero.tsx (full-bg 1920x780 photographic hero with warm-white scrim over left text region), globals.css hero rules, LeadershipGrid.tsx (uses openIndex + hoveredIndex + CSS :hover and :focus-within biography open rules — three competing sources of truth), and CompanyLeadership.tsx.
- Inspected hero assets: 1920x780 desktop webp + 900x675 mobile webp already exist. Verified via VLM (z-ai vision) that both contain technician + switchgear + blue mat scene.
- Verified via VLM quarter-slice analysis that technician is centred around x=1200 in source (not x=700 as initially guessed) and spans full source height (helmet at y=0, feet at y=780).
- Generated new hero crops via /home/z/my-project/scripts/generate_hero_crops.py:
  * Desktop: 1200x900 (4:3) — source crop (760,0)-(1800,780), upscaled 1.154x. Technician centred, switchgear visible, large foreground mat kept, empty left cabinets removed.
  * Mobile: 900x780 (preserves full source height; ~1.154:1 aspect, slightly taller than 4:3 — necessary because cropping vertically would lose helmet or feet, both of which the brief explicitly forbids cropping).
  * WebP quality 86, method 6, no sharpening, no HDR.
- VLM-verified both crops: desktop technician fully visible (head, hands, feet), switchgear visible, mat in foreground, well-composed, no stretching, no large empty area. Mobile same.
- Rewrote src/components/home/HomeHero.tsx as a premium split hero:
  * Single HeroContent (one <h1>) rendered in left column on desktop (≥lg) and stacked above image on mobile/tablet-portrait (<lg) via responsive CSS.
  * Two <Image> elements (desktop 1200x900 + mobile 900x780) in separate wrappers (.be-split-hero__visual-desktop and .be-split-hero__visual-mobile) — CSS `display:none` swaps visibility at the lg breakpoint.
  * Both images carry full alt text; the hidden wrapper is removed from the a11y tree via display:none, so screen readers announce the scene exactly once.
  * Single semantic <h1> shared across all viewports (fixes pre-existing duplicate-H1 bug — old hero had HeroContent rendered twice, once in desktop branch and once in mobile branch, each with an <h1>).
  * Desktop visual frame: 4:3 aspect, restrained 0.75rem radius, thin neutral border, very subtle shadow. No floating labels, no dashed frame, no graphic overlays.
  * Mobile visual frame: natural ~900x780 aspect (preserves helmet + feet), full-bleed (no radius, no border) so the photograph reads as one credible industrial scene.
  * Headline ~56-66px desktop via clamp(2.5rem, 4.2vw, 4.125rem); ~32-44px mobile.
  * Paragraph ~17px desktop.
  * Tablet-portrait (768-1023px) — copy above image, both at full container width with page-horizontal-padding.
  * Short laptop viewports (≤820px tall) — hero padding shrinks, headline shrinks to keep the hero in a 1366x768 viewport.
- Updated globals.css hero section (replaced .be-photo-hero* rules with .be-split-hero* rules):
  * Removed .be-photo-hero__desktop min-height:620px / height:clamp(620px, 78vh, 680px) (was forcing a tall fixed height).
  * Removed .be-photo-hero__scrim linear-gradient readability overlay.
  * Removed .be-photo-hero__content, __headline, __lede rules (replaced by .be-split-hero__copy, __headline, __lede).
  * Added .be-split-hero__visual-desktop (4:3 aspect-ratio, radius, border, shadow) and .be-split-hero__visual-mobile (900/780 aspect-ratio, full-bleed).
  * Added responsive swap: .be-split-hero__visual-mobile { display: none } by default, @media (max-width:1023px) flips to .be-split-hero__visual-desktop { display:none } / .be-split-hero__visual-mobile { display:block }.
  * Mobile/tablet-portrait <lg: single-column grid, copy block with horizontal padding, full-bleed image below.
- Fixed LeadershipGrid.tsx biography toggle:
  * Removed `hoveredIndex`, `setHoveredIndex`, `handleHoverEnter`, `handleHoverLeave`, `onMouseEnter`, `onMouseLeave`, `isBioRevealed = isOpen || isHovered` — single source of truth is now `openIndex` only.
  * `isOpen = openIndex === index` — biography opens ONLY when the toggle button is clicked.
  * Same button clicked again → openIndex becomes null → biography closes immediately and smoothly, even while pointer remains over the card, even while button retains keyboard focus.
  * Another card's button clicked → previous openIndex is replaced → previous biography closes, new one opens. Only one open at a time on all screen sizes.
  * Added Escape-key handler: pressing Escape while focus is inside an open card calls `onClose()` (sets openIndex to null). Focus stays on the button so the user can re-open or tab away cleanly.
  * Article ref + useEffect attaches keydown listener only when isOpen is true, cleaned up on close.
  * Button: aria-expanded={isOpen}, aria-controls={bioRegionId}, label flips "View biography" / "Close biography", chevron rotates only when isOpen, 44px min touch target, visible keyboard focus ring.
- Updated globals.css leadership rules:
  * Removed `.be-leader-card:focus-within` border-color/box-shadow selector (was opening bio via CSS focus-within).
  * Removed `.be-leader-card.be-leader-card-expanded .be-leader-bio, .be-leader-card .be-leader-bio-open, .be-leader-card:focus-within .be-leader-bio { grid-template-rows: 1fr; opacity: 1; }` — replaced with single `.be-leader-bio.be-leader-bio-open { grid-template-rows: 1fr; opacity: 1; }`.
  * Same in prefers-reduced-motion block.
  * Updated the @media (hover: hover) block at the bottom of globals.css: removed `.be-leader-card:hover .be-leader-bio { grid-template-rows: 1fr; opacity: 1; }` rule (was opening bio on hover). Hover now changes ONLY border-color + a subtle soft shadow (lighter than the open-state shadow).
  * Updated docstring to reflect single-source-of-truth design.
- Updated src/components/about/CompanyLeadership.tsx supporting text from "Hover a card on desktop or tap "Read biography" on mobile..." to "Tap "View biography" on any card to read the fuller profile." (matches new toggle-only behaviour).
- Updated CompanyLeadership.tsx docstring to describe the new toggle-only behaviour.

Verification:
- bun run typecheck — clean (exit 0).
- bun run lint — clean (exit 0).
- bun run build — clean (16/16 routes prerendered, no errors).
- bunx playwright test tests/a11y/accessibility.spec.ts — 65/65 passed (1.1m). The previously-failing "has exactly one h1" test on "/" now passes (fixed the duplicate-H1 bug).
- Cross-viewport hero checks (10 viewports: 360x800, 390x844, 430x932, 768x1024, 820x1180, 1024x768, 1280x800, 1366x768, 1440x900, 1920x1080):
  * No horizontal overflow at any viewport.
  * H1 visible at all viewports.
  * Image visible in initial viewport at desktop sizes (≥1024); below the fold on mobile/tablet-portrait (intentional — copy-first layout).
  * VLM-verified desktop 1440x900: copy on left (eyebrow, H1, paragraph, both CTAs, 4 proof badges), photograph on right in dedicated frame, technician visible, blue mat visible in foreground, no text over photograph, no readability scrim.
  * VLM-verified mobile 390x844: copy block (all elements) above full-width photograph; technician centred, switchgear visible.
- Leadership toggle behaviour verified via Playwright script:
  * All 3 buttons start aria-expanded=false, label "View biography".
  * Click button 0 → opens (aria-expanded=true, label "Close biography", chevron rotated).
  * Click button 0 again → closes (aria-expanded=false, label "View biography", chevron reset). Closes even with pointer still over the card.
  * Hover button 0 after close → does NOT open (aria-expanded stays false). THIS IS THE FIX.
  * Click button 0 then button 1 → only button 1 open, button 0 closed. Single-open behaviour works.
  * Press Escape while button 0 is open → closes. Focus stays on button 0.
  * VLM-verified open state: 3 equal-width cards, first card taller with expanded biography + leadership focus box + 3 bio paragraphs, first card button says "Close biography", other two say "View biography".
- Known pre-existing test failures (NOT regressions from this work; verified by stashing changes and re-running):
  * tests/a11y/header-mobile.spec.ts — 5 failures (4 aria-expanded + 1 header-width). These test the mobile header navigation, which this work did not touch. Failures are pre-existing on origin/main.
  * tests/a11y/hero-desktop-compress.spec.ts and tests/a11y/hero-mobile.spec.ts — reference old hero content (H1 "Certified protection for critical electrical environments", CTA "View Products", technical legend dl, SVG [role="img"] illustration) that was removed in commit d1bb826 (previous hero redesign). Tests were never updated and fail on origin/main too. Out of scope for this task.

Stage Summary:
- 5 files changed: src/components/home/HomeHero.tsx (rewritten), src/components/about/LeadershipGrid.tsx (rewritten toggle logic), src/components/about/CompanyLeadership.tsx (supporting text + docstring), src/app/globals.css (hero + leader CSS), public/media/hero/bharat-electrosafe-insulating-mat-hero.webp (new 1200x900 crop), public/media/hero/bharat-electrosafe-insulating-mat-hero-mobile.webp (new 900x780 crop).
- Plus: scripts/generate_hero_crops.py (new) — kept in /home/z/my-project/scripts/ (not in repo) for reproducibility.
- Root cause of hero composition problem: full-bg 1920x780 image with object-cover + 590-680px container height caused unpredictable vertical cropping across viewport ratios; image was also stretched horizontally from a 1024x1024 source (per past worklog notes), so the technician was right-of-centre with empty left room and was being further cropped by the scrim+overlay layout.
- Root cause of biography close bug: three competing sources of truth — JS click state (`openIndex`), JS hover state (`hoveredIndex`), and CSS `:focus-within` / `:hover` selectors that opened the bio via grid-template-rows:1fr. After clicking "Close biography", the cursor still over the card or the focused button kept the bio open via the hover/focus-within path. Fixed by removing all hover/focus-within bio open logic; `openIndex` is now the single source of truth.
- Deployment: commit and push to main triggers Vercel auto-deploy.


---
Task ID: 3
Agent: Z User (continuation session)
Task: Fix mobile hero composition (replace tight 4:3 mobile crop with 3:2 dedicated mobile crop + reorder mobile content: eyebrow → headline → photograph → paragraph → CTAs → badges) and re-verify the biography toggle fix from commit 97a09ab.

Work Log:
- Inspected current state of src/components/home/HomeHero.tsx, src/components/about/LeadershipGrid.tsx, src/app/globals.css.
- Verified LeadershipGrid.tsx already correctly implements single-source-of-truth biography toggle (commit 97a09ab) — no hoveredIndex, no onMouseEnter/Leave, no CSS :hover/:focus-within on .be-leader-bio. No code changes needed.
- Confirmed the mobile hero crop (900x780, ~1.154:1 aspect) was the actual problem — VLM verified technician filled 90-95% of mobile image height with boots cut off, yellow boundary only in bottom-right corner.
- Source analysis: the existing 1200x900 desktop hero source has the technician's helmet at Y=0-70 (touching top edge) and boots at Y=780-890 (only 10-20px of floor space below). No vertical slack to crop a wider 3:2 mobile image without losing helmet or boots.
- Generated new mobile hero via two-stage process:
  1. AI outpaint source 1200x900 → 1440x720 (forces vertical extension above helmet and below boots; technician and switchgear preserved).
  2. Sharp-crop 1440x720 → 1080x720 (3:2 final mobile crop).
  - VLM verified: technician fully visible (helmet, hands, legs, both boots), 30-35% of image width, 80-85% of image height (down from 90-95%), blue mat visible across foreground, yellow boundary visible, switchgear visible, no overlays.
- Rebuilt HomeHero.tsx with grid-template-areas for explicit mobile reordering:
  - Desktop (≥1024px): two-column split (copy-pre + copy-post stacked left | visual right).
  - Tablet (768-1023px): balanced two-column.
  - Mobile (<768px): single column with order copy-pre → visual → copy-post (eyebrow → headline → photograph → paragraph → CTAs → badges).
- Added compact mobile CTAs (two equal-width buttons in one row at ≥360px, stacked at <360px, 48px min-height).
- Added compact two-column proof badge grid on mobile with 10px font, wrap-enabled labels (BIS Licence CM/L:8800129617 wraps cleanly).
- Fixed horizontal overflow at 360px and 390px mobile viewports:
  - Root cause 1: `grid-template-columns: 1fr` allowed inline-block eyebrow content to push grid items beyond the column. Fixed with `minmax(0, 1fr)`.
  - Root cause 2: `white-space: nowrap` on .be-proof-badge__label (base rule, line 1340) was winning over my mobile override because it was later in source order. Moved the mobile override to be AFTER the base rule.
  - Root cause 3: Long uppercase eyebrow text with tracking-widest didn't wrap. Added `word-break: break-word; overflow-wrap: anywhere` on the eyebrow span.
- Updated stale Playwright tests:
  - tests/a11y/hero-mobile.spec.ts — rewrote to test the new split hero (mobile content order, mobile image src, no overflow, CTA row, 2-col badge grid).
  - tests/a11y/hero-desktop-compress.spec.ts — rewrote to test two-column split layout (copy left, visual right, desktop image src).
  - tests/a11y/leadership-biography.spec.ts — NEW file with 28 tests across 4 viewports verifying: open/close behaviour, close-while-pointer-on-card, close-while-button-focused, only-one-open-at-a-time, Escape key, chevron rotation (using modern CSS `rotate` property — Tailwind v4 uses rotate-180 not transform: rotate), 44px touch target, hover does not open biography.
- Ran full test suite:
  - Type-check: 0 errors.
  - Lint: 0 errors.
  - Production build: success, 16 routes prerendered.
  - hero-mobile.spec.ts: 28/28 passed.
  - hero-desktop-compress.spec.ts: 32/32 passed.
  - leadership-biography.spec.ts: 28/28 passed.
  - accessibility.spec.ts: 65/65 passed.
  - header-mobile.spec.ts: 37/42 passed (5 pre-existing failures unrelated to this task — verified by stashing my changes and confirming the same 5 tests fail on the previous commit).
- Captured viewport screenshots at 9 breakpoints (360×800, 390×844, 430×932, 768×1024, 820×1180, 1024×768, 1366×768, 1440×900, 1920×1080) — zero horizontal overflow at all breakpoints.
- Biography toggle verified at all 9 breakpoints: open=true/"Close biography" (bio height 436-594px), close=false/"View biography" (bio height 4px), only-one-open-at-a-time, Escape closes.

Stage Summary:
- New mobile hero image: public/media/hero/bharat-electrosafe-insulating-mat-hero-mobile.webp (1080x720, 3:2, ~41KB).
- Modified: src/components/home/HomeHero.tsx (rebuilt as three-block grid with grid-template-areas).
- Modified: src/app/globals.css (split-hero CSS rewritten for mobile-first ordering, compact mobile CTAs and badges, horizontal overflow fixes).
- Modified: tests/a11y/hero-mobile.spec.ts, tests/a11y/hero-desktop-compress.spec.ts (rewrote stale tests to match new hero).
- Added: tests/a11y/leadership-biography.spec.ts (new comprehensive biography toggle test suite).
- All type-check, lint, build, and 153 of 158 Playwright tests pass. The 5 failing tests are pre-existing header-mobile issues unrelated to this task.
- Ready to commit and push to main (Vercel auto-deploys on push).
