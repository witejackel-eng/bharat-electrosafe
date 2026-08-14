# Task 6 — Phase 6 Audit Agent

## Summary
Completed all 9 audit checks for the Bharat Electrosafe Phase 6 canonical route, metadata, standards, and naming audit.

## Changes Made
3 files modified:
1. `src/app/manifest.ts` — Replaced "civil-protection applications" with "infrastructure applications" in PWA manifest description
2. `src/app/products/waterproofing-solutions/WaterproofingHubClient.tsx` — Replaced "waterproofing and civil-protection systems" with "waterproofing systems" in visible UI text
3. `src/data/faqs.ts` — Replaced "waterproofing and civil-protection products" with "waterproofing products" in FAQ answer text

## Verification Results
- Sitemap: Canonical routes present, legacy routes absent
- Structured data: Canonical URLs in JSON-LD, correct breadcrumb trails
- Product metadata: Canonical URLs and OG match, display names correct
- Page-level metadata: No old product names or old canonical URLs
- OG images: Media folder paths (allowed), canonical domain used
- Standards audit: All 6 standard mappings correct, ISO/IEC 17025 preserved
- Robots: Environment-gated, not hardcoded
- Navigation links: All use canonical paths
- Naming audit: All BharatMembrane/Bharat Hydro Seal/Bharat Smart Floor/civil protection occurrences classified; 3 violations fixed

## Typecheck
PASS (only pre-existing Prisma db.ts error, unrelated to changes)
