# Task 3-a — sustainability-builder

## Goal
Build `/home/z/my-project/src/components/home/SustainabilitySection.tsx` — a self-contained Sustainability/Environmental section for the Bharat Electrosafe homepage.

## Reference files reviewed
- `worklog.md` (Task 1 brand tokens, Task 3 StatsBar/WhyChooseUs patterns, Task 10-c design-system lock)
- `src/components/home/WhyChooseUs.tsx` — card hover + Manrope inline style + eyebrow/h2/subtitle header pattern
- `src/components/home/StatsBar.tsx` — IntersectionObserver count-up (ease-out cubic, 1.5s, threshold 0.4, rAF, hasAnimated ref guard)
- `src/components/home/CaseStudiesSection.tsx` — `id` + `scroll-mt-32` + `bg-background py-20 md:py-28` section shell + Reveal stagger conventions
- `src/components/motion/Reveal.tsx` — props API (delay/translateY/once); prefers-reduced-motion handled internally
- `src/app/globals.css` — brand tokens (`--color-orange-soft`, `--color-orange`, `.text-eyebrow`, `.card-default`, `.card-dark`, dark-mode `.dark .bg-navy` → #0A1424)
- `src/app/page.tsx` — section composition (Sustainability NOT yet wired; orchestrator will add)

## File created
`/home/z/my-project/src/components/home/SustainabilitySection.tsx` (~270 lines)

## Structure
1. **Header** — eyebrow "Our Commitment" → h2 "Engineered for safety. Designed for the planet." → subtitle on lifecycle responsibility. Each in `<Reveal>` (60/120/180ms).
2. **Block 1 — Animated metrics row** (4 cards, `grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6`):
   - `100%` Recyclable rubber content (Leaf)
   - `42%` Energy from solar (Manesar plant) (SunMedium)
   - `1.2M kg` CO₂e avoided annually (TrendingDown) — animated as decimal 0.0 → 1.2
   - `0` Restricted substances (RoHS/REACH) (ShieldCheck)
   - Replicated `useCountUp` hook inline from StatsBar pattern (threshold 0.4, ease-out cubic, 1.5s, rAF, hasAnimated ref guard, disconnect on first trigger). Supports `decimals` for the 1.2M kg case.
   - Each card wrapped in `<Reveal delay={240 + i*60}>`.
3. **Block 2 — Three commitment pillars** (`grid md:grid-cols-3 gap-6`):
   - Material Stewardship (Recycle) — IS 15652 compounds, post-industrial recycled content, recoverable trim.
   - Process Efficiency (Factory) — closed-loop water cooling, low-temp curing presses, solar-assisted lighting, scrap-recovery program.
   - End-of-life Recovery (Leaf) — take-back program, re-granulation, partner recyclers in 4 states.
   - Each card: `bg-white dark:bg-card border border-border/60 rounded-2xl p-6` + accent bar `w-10 h-1 bg-orange rounded-full mb-4` + tinted icon square + h4 + 3-line body.
   - Subheading eyebrow "Three pillars" (420ms) + h3 "How we reduce impact at every stage." (460ms).
   - Pillar Reveal stagger: 480 + i*80ms.
4. **Block 3 — Certifications strip** (`mt-12 bg-navy dark:bg-card rounded-2xl px-6 py-5`, Reveal delay 720ms):
   - Left: ShieldCheck (text-orange) + "Verified by" + 4 pill badges (`bg-white/10 text-white text-xs px-3 py-1.5 rounded-full`): ISO 14001:2015, RoHS Compliant, REACH Compliant, Zero-Waste-to-Landfill (2026 target).
   - Right: ghost Link `#contact` "Request ESG datasheet →" with `text-orange hover:text-orange-hover` + ArrowRight micro-translate on hover.

## Key decisions
- **Replicated `useCountUp` inline** rather than extracting to a shared hook — spec said "extract or replicate"; replicating keeps the section self-contained (no need to modify StatsBar.tsx or create a new hooks file).
- **Decimals support** added for the `1.2M kg` metric — `toFixed(decimals)` for the 1.2 case, `Math.floor` for integer cases.
- **Pillar card layout** — included a tinted icon square (`w-11 h-11 rounded-xl bg-orange-soft/40 text-orange`) above the title for visual consistency with metric cards, in addition to the spec-required accent bar.
- **WCAG contrast** — followed Task 10-c lock: body text `text-[#374151] dark:text-white/75`, labels `text-[#4B5563] dark:text-white/70`, numbers `text-navy dark:text-white`. On the navy cert strip: `text-white/80` for "Verified by" + `text-white` for badges (AA on dark navy).
- **Did NOT modify page.tsx** — orchestrator will wire `<SustainabilitySection />` into the section composition.

## Lint & type-check
- `bun run lint` → **0 errors, 1 pre-existing warning** (`@next/next/no-page-custom-font` in `layout.tsx` — unrelated).
- `bunx tsc --noEmit` filtered for "Sustainability" → **no type errors**.
- Dev server log: stable, `GET / 200`, no compile/runtime errors.

## Next steps for orchestrator
- Import `SustainabilitySection` from `@/components/home/SustainabilitySection` in `src/app/page.tsx`.
- Recommended placement: after `<ProjectGallery />` and `<SectionDivider variant="default" />` (keeps the "proof" cluster together before Testimonials), or after `<InsightsSection />`.
- Optionally add `sustainability` to the `SECTIONS` array in `src/components/ui-custom/QuickNav.tsx`.
