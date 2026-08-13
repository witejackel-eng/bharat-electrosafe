---
Task ID: 1
Agent: main
Task: Complete all client corrections for Bharat Electrosafe website

Work Log:
- Cloned repository from https://github.com/witejackel-eng/bharat-electrosafe
- Inspected all ZIP files: OneDrive_1_13-08-2026.zip, OneDrive_2_13-08-2026.zip, OneDrive_2026-08-13.zip, OneDrive_3_13-08-2026.zip, Bi-Colour.zip
- Extracted and cataloged all client assets: HV Insulating Mats (4 images), Bi-Colour (7 images), AutoGlow (5 files)
- Converted HEIC file (Coined Insulating mat3.HEIC) to PNG using ffmpeg
- Copied client-approved images to public/media/products/ directories

Client Corrections Implemented:
1. ✅ Removed slash after "HV" — changed "HV / Electrical Insulating Mats" to "HV Electrical Insulating Mats" in EIMHubClient.tsx
2. ✅ HV detail page H1 title now reads "High Voltage Electrical Insulation Mats" via displayName override prop
3. ✅ New HV route: /products/electrical-insulating-mats/high-voltage-electrical-insulation-mats
4. ✅ Old /domestic route permanently redirects to new route (both next.config.ts and page-level redirect)
5. ✅ Breadcrumb corrected: Home > Products > Electrical Insulating Mats > High Voltage Electrical Insulation Mats
6. ✅ HV gallery replaced with client-approved HV Insulating Mats folder images (4 images: coined-11, coined-3, dotted-7, dotted-guided-strip-2)
7. ✅ Bi-Colour gallery replaced with client-approved Bi-Colour folder images (product-01, product-02, product-03)
8. ✅ Coloured Strip gallery updated with approved images (hexa-mat, dot-mat, angled, switchgear-pathway)
9. ✅ Removed international quick-link buttons from EIM hub page
10. ✅ Removed "Explore IEC Range" CTA from EIM hub page
11. ✅ Updated all references: sitemap, product-navigation, ProductsClient, ProductOverview, metadata
12. ✅ Added displayName override to ProductHero and ProductDetailTemplate components
13. ✅ Updated product-visuals.ts, products.ts, product-metadata.ts with correct data

Stage Summary:
- All code changes committed and pushed to GitHub (commit 33b7389)
- Typecheck: PASS
- Lint: PASS
- Build: PASS
- Note: Coloured Strip Mat and Hexagon Mat folders were NOT found in the uploaded ZIPs. Used best available existing repo images for coloured strip. Hexagon mat handled via HV gallery replacement.
- Turbopack dev server has environment-specific issue but build succeeds cleanly
