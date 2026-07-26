# Task 3-b — Manufacturing Process Timeline Builder

## File created
- `/home/z/my-project/src/components/home/ManufacturingProcessSection.tsx`

## Reference files reviewed before build
- `/home/z/my-project/worklog.md` — full project context incl. Task 10-c design-system lock (radius/typography/WCAG tokens, `.btn-primary`/`.card-default`/`.card-dark` utilities, dark-mode overrides)
- `/home/z/my-project/src/components/home/CaseStudiesSection.tsx` — section card pattern (Reveal stagger, eyebrow + h2 + subtitle header, Manrope via inline style, max-w-2xl header block)
- `/home/z/my-project/src/components/home/WhyChooseUs.tsx` — feature card layout & `.text-eyebrow` utility usage
- `/home/z/my-project/src/components/home/ProductSelection.tsx` — dark navy section pattern (`bg-navy`, white text, subtle backdrop overlays, Reveal stagger at i*100)
- `/home/z/my-project/src/components/motion/Reveal.tsx` — `Reveal` props (`delay`, `translateY`, default `as='div'`), reduced-motion safe via `useSyncExternalStore`
- `/home/z/my-project/src/app/globals.css` — brand tokens (`--color-navy`, `--color-orange`, `--color-orange-hover`, `--color-steel`), `.text-eyebrow`, dark-mode overrides (`bg-navy` → `#0A1424` in dark)
- `/home/z/my-project/src/app/page.tsx` — confirmed `ManufacturingProcessSection` is NOT yet wired (per task instruction: orchestrator will wire it)

## Implementation decisions
1. **Section root**: `<section id="manufacturing" className="bg-navy text-white py-20 md:py-28 scroll-mt-32 relative overflow-hidden">` with `style={{ fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif' }}` per spec.
2. **Radial gradient backdrop**: rendered as a separate `<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.08),transparent_60%)]">` rather than on the section itself — this avoids Tailwind utility conflicts (`bg-navy` + `bg-[gradient]` would not stack on the same element). The overlay sits behind content thanks to the `relative` wrapper.
3. **Header**: eyebrow → h2 → subtitle, each wrapped in `<Reveal>` with delays 0/60/120ms (60ms intervals per spec). Header is left-aligned in a `max-w-2xl` block (matches `CaseStudiesSection` and `ProductSelection` patterns).
4. **Timeline structure**:
   - `<ol aria-label="Manufacturing process stages">` for screen-reader friendliness; each stage wrapped in `<li>` containing a `<Reveal>` wrapping an `<article>`.
   - Desktop vertical center line: `hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/40 to-transparent`.
   - Mobile left line: `md:hidden absolute left-4 top-0 bottom-0 w-px bg-white/15`.
   - Container: `<ol className="relative mt-16 max-w-5xl mx-auto">` per spec.
5. **Alternating layout**: each `<article>` uses `grid md:grid-cols-2 gap-8 items-start`. Content column gets `md:order-2 md:pl-12` on odd indices and `md:order-1 md:pr-12` on even indices (the padding pushes content away from the center line for visual breathing room). A spacer `<div>` gets the opposite order so the grid column flow stays correct on desktop.
6. **Mobile**: single column, all left-aligned. The `pl-10` on the content column provides space between the mobile center line (`left-4`) and the text.
7. **Stage node**: `<span className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-orange ring-4 ring-orange/20 z-10">` positioned on the line at both breakpoints.
8. **Stage content** (exact spec classes):
   - Number: `text-xs font-bold text-orange uppercase tracking-wider`
   - Title: `text-xl md:text-2xl font-bold text-white mt-2`
   - Description: `text-white/75 leading-relaxed mt-3`
   - Tags: `bg-white/5 text-white/70 text-xs px-2.5 py-1 rounded-full` in a `flex flex-wrap gap-2 mt-4`
   - Icon strip: 3× `w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-orange/80` in a `flex gap-2 mt-4`; icons cycled from `[FlaskConical, Layers, Flame, Microscope, QrCode, Truck]` with each stage drawing 3 relevant icons. Icons rendered via `.map()` with `strokeWidth={1.75}` for consistency.
9. **6 stages**: data array typed as `Stage[]` with `{ id, number, title, description, tags, icons }`. Each stage's icons array contains 3 lucide-react icons relevant to that production phase.
10. **Footer CTA**: `mt-12 text-center` wrapper, small caption `text-white/60 text-sm` ("Schedule a virtual plant tour"), and the orange pill button `bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-full transition-colors` with `Video` + "Book a tour" + `ArrowRight` icons, linking to `#contact`. Wrapped in `<Reveal delay={120}>`.
11. **Accessibility**:
    - `<ol aria-label="Manufacturing process stages">` for the timeline list
    - Stage icons marked `aria-hidden="true"` (decorative)
    - Spacer column `aria-hidden="true"`
    - Stage nodes `aria-hidden="true"`
    - Backdrop overlay `aria-hidden="true"`
    - `last:mb-0` on `<li>` to avoid trailing space after the final stage
12. **TypeScript strict**: `Stage` interface with `LucideIcon[]` for icons; no `any` types. Icon array access via `.map()` avoids the need to alias to capitalized component names.
13. **Dark mode**: section is already dark navy (`bg-navy`), so `dark:` overrides are mostly N/A. The dark-mode `bg-navy` token maps to `#0A1424` per `globals.css`, which keeps the section appropriately dark. Text uses `text-white/*` which is theme-stable.

## Verification
- **Lint**: `cd /home/z/my-project && bun run lint` → **0 errors, 1 pre-existing warning** (`@next/next/no-page-custom-font` in `layout.tsx` — unrelated, present in all prior cycles).
- **TypeScript**: `bunx tsc --noEmit` filtered for `ManufacturingProcess` → no errors.
- **Dev server**: stable (verified latest entries in `dev.log` — `GET / 200` responses; the new component is not yet imported by `page.tsx` so it won't be compiled until the orchestrator wires it, which is per spec).
- **Not wired into page.tsx** — orchestrator will add `<ManufacturingProcessSection />` plus a SectionDivider variant (`dark` or `accent`) at the appropriate position in `src/app/page.tsx`.

## Stage data summary
| # | Title | Tags | Icons |
|---|-------|------|-------|
| 01 | Compound Mixing | Banbury mixer · Auto dosing · Recipe locked | FlaskConical · Layers · Flame |
| 02 | Calendering & Sheeting | 4-roll calender · ±0.1mm · Closed-loop trim | Layers · FlaskConical · Microscope |
| 03 | Moulding & Curing | Low-temp cure · 170°C · Energy recovered | Flame · Layers · Microscope |
| 04 | In-process Testing | Dielectric · Tensile · IS 15652 App A | Microscope · FlaskConical · QrCode |
| 05 | Marking & Traceability | Laser etch · QR code · Batch ledger | QrCode · Microscope · Truck |
| 06 | Packing & Dispatch | Reusable cores · GPS track · 16 states | Truck · QrCode · Layers |
