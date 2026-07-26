---
Task ID: 2-c
Agent: cookie-header-polish
Task: Slim down CookieConsent banner and improve Header search input border

Work Log:
- Read worklog.md, CookieConsent.tsx, Header.tsx, SearchTrigger.tsx, StickyCTABar.tsx (to confirm the `be:cookie-visible` event contract already consumed by StickyCTABar)
- CookieConsent.tsx: added `X` icon import from lucide-react
- CookieConsent.tsx: narrowed banner (max-w-5xl → max-w-3xl), softened shadow (shadow-2xl → shadow-xl), thinned top accent (h-[3px] → h-[2px]), reduced padding (p-4 sm:p-5 md:p-6 → p-3 sm:p-4) with extra right padding (pr-9 sm:pr-10) to clear the new dismiss button
- CookieConsent.tsx: shrank icon container (w-11 h-11 → w-9 h-9) and icon (size-5 → size-4); tightened title (text-base sm:text-lg → text-sm sm:text-base), body (text-sm leading-relaxed → text-[0.8rem] leading-snug, mt-1.5 → mt-1), privacy link (added text-xs)
- CookieConsent.tsx: compacted action buttons (h-10 → h-8, text-sm → text-xs, px-5/px-4 → px-3), reduced action column (md:w-56 lg:w-64 → md:w-44 lg:w-48), flipped inner button group from md:flex-col to md:flex-row so all 3 buttons form a single row on md+
- CookieConsent.tsx: added absolute top-right X dismiss button (size-6, hover:bg-white/10, rounded-full, aria-label="Dismiss cookie banner") wired to handleNecessaryOnly
- CookieConsent.tsx: added useEffect that dispatches `be:cookie-visible` CustomEvent with detail { visible } whenever isBannerVisible changes; moved isBannerVisible computation above the early return to avoid temporal-dead-zone ReferenceError (caught via dev.log and fixed)
- CookieConsent.tsx: Preferences Dialog left untouched (only the banner was slimmed)
- Header.tsx: replaced SearchTrigger className with a visibly bordered style (border border-border/60 bg-white/60 hover:bg-white hover:border-orange/40 text-navy text-xs font-medium h-9 px-3 rounded-lg transition-colors items-center gap-2) while keeping hidden md:inline-flex for responsive hiding
- Header.tsx: strengthened scrolled boxShadow (0 4px 20px / 0 1px 3px → 0 8px 28px / 0 2px 6px with rgba(27,42,74,...))
- Header.tsx: added absolutely-positioned 1px bottom gradient line (from-transparent via-orange/40 to-transparent) that fades in (opacity transition) when scrolled
- Verified with `bun run lint` — no errors in the two modified files (the single remaining error in QuoteAdminDialog.tsx and the layout.tsx font warning are pre-existing and outside the scope of this task)
- Confirmed dev.log shows GET / 200 after the fix (an intermediate TDZ ReferenceError on isBannerVisible was resolved by reordering the declaration above the useEffect)

Stage Summary:
- Files modified: src/components/ui-custom/CookieConsent.tsx, src/components/layout/Header.tsx
- Cookie banner is now meaningfully smaller (narrower max-width, tighter padding, smaller type, compact h-8 buttons in a single md+ row) yet preserves all existing functionality (accept all / necessary only / manage preferences dialog)
- New X quick-dismiss button + `be:cookie-visible` window event enable faster dismissal and let StickyCTABar hide itself while the banner is on screen
- Header search trigger now has a clear bordered pill look that no longer blends into the white navbar; scrolled header gains a stronger shadow plus a subtle orange bottom accent line for more presence
- All brand tokens (navy/orange/orange-light/orange-hover/steel/border) work in light & dark; ARIA attributes (role=dialog, aria-label, aria-live=polite, aria-modal=false, aria-hidden) preserved; no `any` used
- Lint result: clean for the two modified files (pre-existing unrelated QuoteAdminDialog.tsx `Badge` error and layout.tsx font warning remain untouched per task scope)
