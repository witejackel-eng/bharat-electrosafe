# Task 10-c — design-system-polish

## Scope
VLM QA review identified systemic design-system drift and WCAG contrast failures across the Bharat Electrosafe homepage. Fixed across 5 files.

## Files modified

### 1. `src/app/globals.css`
- Added standardized radius tokens to `:root`: `--radius-card` (16px), `--radius-button` (8px), `--radius-pill` (9999px), `--radius-input` (8px).
- Added typography scale tokens to `:root`: `--text-h1` (2.75rem), `--text-h2` (2.25rem), `--text-h3` (1.5rem), `--text-caption` (0.875rem). Used `--text-body-size` / `--text-meta-size` (with `-size` suffix) for body/meta font sizes because `--text-body` / `--text-meta` are reserved for the WCAG color tokens (the task spec listed both with the same name — resolved the conflict in favour of the WCAG colors, which is the explicit goal of this task).
- Added WCAG-compliant color tokens to `:root`: `--text-body: #374151` (was steel #6B7280 — fails AA on ivory), `--text-meta: #4B5563`, `--text-on-dark: #FFFFFF`, `--text-on-dark-muted: rgba(255,255,255,0.85)` (was /75 — bumped to /85 for AA).
- Added 3 standardized button utility classes in `@layer utilities`: `.btn-primary`, `.btn-secondary`, `.btn-ghost` — all use the brand orange/navy tokens and include focus-visible rings on the primary variant.
- Added 2 standardized card utility classes in `@layer utilities`: `.card-default` (light, hover lifts -translate-y-0.5 + orange border + shadow) and `.card-dark` (navy bg, white text).
- Added dark-mode overrides in the existing `.dark` block: `--text-body: #D1D5DB`, `--text-meta: #9CA3AF`, `--text-on-dark: #1B2A4A` (navy on light bg in dark mode), `--text-on-dark-muted: rgba(27,42,74,0.85)`.
- Added new `animate-badge-pulse` keyframe + class — subtle sonar-style box-shadow ring pulse (text contrast is never affected because only the box-shadow animates). Added it to the reduced-motion override list.

### 2. `src/components/home/WhyChooseUs.tsx`
- Card description `<p>`: `text-steel text-xs md:text-sm` → `text-[#374151] dark:text-white/75 text-sm md:text-[0.95rem] leading-relaxed` (AA contrast fix + readability bump).
- Card hover: `hover:-translate-y-1` → `hover:-translate-y-0.5` (subtler, matches design system).
- Added `focus-within:border-orange/30 focus-within:shadow-md` to cards for keyboard accessibility.

### 3. `src/components/home/StatsBar.tsx`
- Stat label: `text-steel` → `text-[#4B5563] dark:text-white/70` (AA contrast fix).
- Stat number: `text-navy` → `text-navy dark:text-white` (explicit dark-mode token for high contrast).
- Label font size already at `text-xs md:text-sm` (≥0.75rem on mobile — meets AA minimum), so no bump required.

### 4. `src/components/layout/Footer.tsx`
- Column headers: `text-sm font-semibold ... tracking-wider` → `text-xs font-bold uppercase tracking-[0.15em] text-white` (stronger hierarchy).
- Column body links: `text-white/75 hover:text-white` → `text-white/80 hover:text-orange` (better contrast + on-brand orange hover).
- Newsletter description: `text-white/70` → `text-white/80`.
- Copyright text: `text-white/60` → `text-white/75`.
- Bottom-bar legal links (Privacy/Terms) + "Made in India": `text-white/60 hover:text-white` → `text-white/75 hover:text-orange` (AA + on-brand hover).

### 5. `src/components/home/ProductSelection.tsx` (dark navy section)
- Card description: `text-white/75` → `text-white/85` (AA on dark navy).
- "Not selecting an electrical mat?" alternative path link: `text-white/70` → `text-white/80` (AA minimum).
- Recommended badge: added `animate-badge-pulse` class for a subtle sonar-style pulse ring (already had `bg-orange text-white font-bold`).

## Verification
- `bun run lint` → **0 errors, 1 pre-existing warning** (Manrope font in layout.tsx — not introduced by this task; pre-existing from earlier agents).
- Dev server stable: multiple successful compiles, `GET / 200`, no runtime errors.
- All changes are Tailwind v4 compatible (utility classes resolve against the `@theme inline` brand color tokens).

## Design decisions / notes
- Resolved the `--text-body` / `--text-meta` naming conflict between the typography-scale section and the WCAG-color section by giving the font-size variants a `-size` suffix. This preserves both intents (typography scale + WCAG colors) without one clobbering the other. The WCAG colors take the canonical name because they are referenced by name in dark-mode overrides.
- Chose a box-shadow ring pulse (`animate-badge-pulse`) rather than `animate-pulse` (opacity oscillation) for the Recommended badge so label text contrast is never compromised.
- Kept the existing `.dark` brand-utility-class overrides (e.g. `.dark .text-navy`) untouched — they continue to handle the legacy `text-navy` utility used widely across components.
