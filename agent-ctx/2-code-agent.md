# Task 2: Global UI Primitive Components

**Agent:** code-agent
**Status:** ✅ Completed

## Summary

Created all 14 global UI primitive components for the Bharat Electrosafe brand system in `src/components/ui/`.

## Files Created

1. `Eyebrow.tsx` — Uppercase label with yellow left border
2. `SectionHeader.tsx` — Section header with eyebrow, h2, supporting text
3. `PrimaryButton.tsx` — Yellow-filled action button (link/button)
4. `SecondaryButton.tsx` — Outlined ghost button with yellow hover
5. `TextLink.tsx` — Inline link with arrow shift on hover
6. `EmptyMediaFallback.tsx` — Intentional fallback with diagonal pattern
7. `ImageFrame.tsx` — Image container with aspect ratio and fallback
8. `TechnicalBadge.tsx` — Small certification badge pill
9. `DocumentCard.tsx` — Card for certificates with preview/download
10. `LogoRail.tsx` — Slow scrolling logo rail with grayscale→color
11. `DataTable.tsx` — Technical data table with pale-yellow header
12. `FeatureList.tsx` — Feature list with yellow icon accents
13. `PageIntro.tsx` — Page intro block with title and description
14. `Breadcrumb.tsx` — Navigation breadcrumb with chevrons

## Key Patterns

- All components use `be-*` brand color CSS variables via Tailwind
- Typography uses custom utility classes from globals.css
- Animations use CSS classes defined in globals.css (hover-image-scale, hover-card-lift, etc.)
- 'use client' on interactive components (buttons, links, ImageFrame, LogoRail, DataTable, Breadcrumb)
- TypeScript with proper prop interfaces
- 44px min-height for touch targets
- framer-motion not used in these primitives — CSS animations are preferred for performance

## Verification

- `bun run lint` — passed with zero errors
