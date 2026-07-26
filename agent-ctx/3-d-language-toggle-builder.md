# Task ID: 3-d — language-toggle-builder

## Task
Add EN/HI language toggle (i18n-lite) with translation dictionary to the Bharat Electrosafe homepage. Visible, functional, persists to localStorage, no hydration mismatch (cached-raw `useSyncExternalStore` pattern from CookieConsent).

## Files Created

### `src/lib/i18n.ts`
Lightweight i18n store (no `'use client'` — non-component module).
- Exports `Locale` ('en' | 'hi'), `STORAGE_KEY = 'be-locale'`, `DEFAULT_LOCALE = 'en'`.
- Module-level cached state: `cachedLocale` + `cachedRaw`. `refresh()` only re-parses + notifies when the raw string actually changes — keeps `useSyncExternalStore` snapshots referentially stable (avoids React "getSnapshot should be cached" warning).
- `subscribeLocale(cb)` — adds listener; attaches `storage` (cross-tab) + `be:locale-change` custom event (in-tab) listeners; cleanup removes all three.
- `getLocaleSnapshot()` → returns `cachedLocale` (client). `getLocaleServerSnapshot()` → always `DEFAULT_LOCALE` (SSR — prevents hydration mismatch).
- `setLocale(locale)` — eagerly updates both caches, writes to localStorage, dispatches `be:locale-change` (storage event does NOT fire in the writing tab), and updates `document.documentElement.lang`.
- `t(key, locale?)` — translates a single key via the inlined EN/HI dictionaries. Missing keys fall back to the key itself (visible during dev).
- Dictionary covers 13 curated keys across 4 namespaces: `nav.*` (4: products, proof, company, quote), `hero.*` (5: eyebrow, title, subtitle, cta.primary, cta.secondary), `cta.*` (3: quote, call, whatsapp), `footer.rights` (1). Hindi translations provided for all keys.

### `src/components/i18n/LocaleToggle.tsx`
`'use client'` pill-shaped toggle button.
- `useSyncExternalStore(subscribeLocale, getLocaleSnapshot, getLocaleServerSnapshot)` for SSR-safe subscription.
- Renders Globe icon + current locale label (EN / हिं) + "/" separator + muted next-locale label (हिं / EN).
- `onClick={() => setLocale(next)}` — flips locale.
- `aria-label` and `title` announce the language switch intent.
- Brand tokens throughout: `bg-white dark:bg-card`, `text-navy dark:text-white`, hover `border-orange/40 text-orange`. Works in light and dark modes.

### `src/components/i18n/useLocale.ts`
`'use client'` thin wrapper hook that re-exports the `useSyncExternalStore` call. Lets any client component subscribe to locale changes without re-implementing the boilerplate.

### `src/components/i18n/LanguageInitScript.tsx`
Tiny inline `<script>` rendered in `<head>` to set `<html lang>` from localStorage before hydration. Prevents flash where screen readers / crawlers see `lang="en"` while the page is Hindi.

## Files Modified

### `src/components/layout/Header.tsx`
- Imported `LocaleToggle` from `@/components/i18n/LocaleToggle`.
- Inserted `<LocaleToggle className="hidden md:inline-flex" />` immediately BEFORE `<ThemeToggle>` in the desktop CTA cluster (so the toggle is visible only on desktop; mobile users get the toggle inside the drawer).

### `src/components/navigation/MobileDrawer.tsx`
- Imported `LocaleToggle`.
- Inserted `<LocaleToggle />` in the row next to the existing `ThemeToggle` (after the "Theme" label). The drawer now exposes both toggles for mobile users.

### `src/components/home/Hero.tsx`
- Imported `useLocale` from `@/components/i18n/useLocale` and `t` from `@/lib/i18n`.
- `const locale = useLocale();` at top of `Hero()` body.
- Replaced 5 string literals with `t('hero.eyebrow', locale)`, `t('hero.title', locale)`, `t('hero.subtitle', locale)`, `t('hero.cta.secondary', locale)` (the "Explore our products" Link) and `t('hero.cta.primary', locale)` (the QuoteButton "Request a technical quote"). All surrounding props, classes, structures, and the other Reveal-wrapped elements (system indicators, image composition, trust badges) untouched.
- Note: English copy now matches the i18n dictionary (e.g. eyebrow → "IS 15652 Certified · Made in India", title → "Electrical insulating mats that protect every panel, every substation, every shift.", secondary CTA → "Explore product systems"). Previous Hero copy ("Protection systems for environments that cannot afford failure.", "Electrical and infrastructure protection", "Explore our products") is replaced by the dictionary's curated EN values per spec.

### `src/components/home/FinalCTA.tsx`
- Imported `useLocale` and `t`.
- `const locale = useLocale();` at top of `FinalCTA()` body.
- Replaced 3 CTA label literals: `Request a Quote` → `{t('cta.quote', locale)}`, `Call technical sales` → `{t('cta.call', locale)}`, `WhatsApp` → `{t('cta.whatsapp', locale)}`. (English "WhatsApp" now reads "WhatsApp us" per the dictionary.) All other JSX, classes, animations and trust indicators unchanged.

### `src/app/layout.tsx`
- Imported `LanguageInitScript` from `@/components/i18n/LanguageInitScript`.
- Placed `<LanguageInitScript />` in `<head>` immediately after the existing theme-init `<script>` and the Manrope `<link>`. Runs synchronously before paint to set `<html lang>` to the saved value.

## Verification

- `bun run lint` → 0 errors, 1 pre-existing warning (`@next/next/no-page-custom-font` in layout.tsx — Manrope link, unrelated, present since Task 1).
- `bunx tsc --noEmit` → 0 errors in any file created or modified by this task. Pre-existing errors in unrelated files (`examples/websocket/*`, `skills/*`, `src/app/api/chat/route.ts:12`, `src/components/motion/Reveal.tsx:84`) are from prior tasks and not touched here.
- Dev server log: stable — multiple `✓ Compiled` and `GET / 200` entries after the file modifications, no compile/runtime errors.

## Key Decisions
- **Cached-raw pattern (MANDATORY)**: Module-level `cachedRaw` + `cachedLocale` ensure `useSyncExternalStore`'s `getSnapshot` returns the same primitive across renders when nothing changed. This is the same pattern CookieConsent uses and is what prevents the React infinite-loop warning.
- **Cross-tab vs in-tab updates**: `storage` events do NOT fire in the tab that wrote the value, so `setLocale` also dispatches a custom `be:locale-change` event. Subscribers listen to both.
- **SSR snapshot returns DEFAULT_LOCALE ('en')**: Server renders EN strings, client also renders EN on the first hydration pass, then re-renders with the saved locale once the subscription is established. No hydration mismatch.
- **Curated subset only**: 13 keys across `nav.*`, `hero.*`, `cta.*`, `footer.rights`. Full-app translation is explicitly out of scope per the task brief — the toggle is a visible signal that the site respects language preference, not a full i18n rewrite.
- **`<html lang>` kept in sync**: Both the pre-hydration `LanguageInitScript` and the `setLocale` runtime path update `document.documentElement.lang` so screen readers and search crawlers see the correct language.
- **Mobile drawer toggle placement**: Added next to existing `ThemeToggle` in the same row (after the "Theme" label) so both controls are co-located for mobile users. The desktop header toggle is `hidden md:inline-flex` so it does not duplicate on mobile.
