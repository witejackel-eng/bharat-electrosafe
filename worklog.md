---
Task ID: 1
Agent: Super Z (main)
Task: Bharat Electrosafe — Rapid Final Client-Ready Upgrade

Work Log:
- Cloned repository from https://github.com/witejackel-eng/bharat-electrosafe
- Inspected entire codebase: all page files, components, data files, public assets
- Copied real logo (pasted_image_1785155228201.png) to public/images/brand/bharat-electrosafe-logo.png
- Created webp version of logo at public/images/brand/bharat-electrosafe-logo.webp using Sharp
- Delegated comprehensive implementation to full-stack developer agent
- Fixed ProductOverview.tsx and ProductApplications.tsx to use real images (next/image) instead of ImageFrame placeholders
- Ran final validation: lint (3 pre-existing warnings), typecheck (clean), build (14 routes, successful)
- Ran final codebase searches: No Hydro references (except deliberate redirect in next.config.ts), No "6 Product Families", No logo.svg, No placeholder labels

Stage Summary:
- Logo replaced everywhere: /logo.svg → /images/brand/bharat-electrosafe-logo.webp in Header, Footer, layout.tsx, site.webmanifest
- BharatHydro Seal completely removed: products.ts (5 products), company.ts (no hydroStandard), team.ts (no "six families"), asset-slots.ts (no BHS slots), next.config.ts (redirects to /contact-us), Header/Footer/ProductRange (5 items), hydro-seal route directory deleted, public assets deleted
- Real product images: ProductData.images property added with thumbnail, hero, details, overview, application paths for all 5 products
- Homepage shortened: 5 sections (HomeHero, ProductRange, TrustDocuments, CapabilityIndustries, HomeFAQCTA) — removed Marquee and StatsSection
- About page shortened: 5 sections (AboutIntro, CompanyLeadership, ManufacturingValues, AwardsCertifications, AboutCTA)
- Product pages shortened: 5 sections each (Hero+trust, Overview+Applications, Specifications+Material, Documents+FAQ, Related+CTA)
- Contact page shortened: 3 sections (ContactIntro+Enquiry, OfficeLocation+OfficeHours) — removed DirectContactCTA
- Trust content: Created src/data/trust.ts with verified BIS/MSME/ISI/NTH/CE/ISO marks, 2 awards, 8 organisation refs
- TrustDocuments updated with genuine certification images and conservative wording
- Voltage FAQ removed (contradicted spec table), kept 4 FAQs
- SEO updated: keywords without Hydro, sitemap/structured-data auto-updated via products array
- Build: successful, 14 routes, no type errors
