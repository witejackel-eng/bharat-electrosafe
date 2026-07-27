---
## Task ID: 6
**Agent:** SEO/Structured-Data Agent
**Task:** Build SEO files (sitemap, robots, structured data) for Bharat Electrosafe Next.js 16 site

### Work Log

1. **Read prior context** — `worklog.md` did not exist yet; this is the first entry. Reviewed `src/data/company.ts` (exports `company` with `siteUrl`, `name`, `email`, `phonePrimaryTel`, `address`, `certifications`) and `src/data/products.ts` (6 `ProductFamily` entries with `.slug`, `.name`, `.summary`, `.standard`, `.category`, `.features`, `.applications`). Reviewed existing `src/app/layout.tsx` which already emits an `Organization` JSON-LD block (untouched).

2. **Created `src/app/sitemap.ts`** — Next.js 16 Metadata API `sitemap()` function. Emits 9 URL entries:
   - `/` (priority 1.0)
   - `/#about`, `/#contact` (priority 0.8)
   - 6 product-family anchors `/#<slug>` (priority 0.8): electrical-insulating-mats, coloured-strip-insulating-mats, bi-color-insulating-mats, auto-glow-reflective-band-insulating-mat, bharat-membrane, bharat-hydro-seal
   - All with `lastModified: new Date()` and `changeFrequency: 'monthly'`. URLs built from `company.siteUrl`.

3. **Created `src/app/robots.ts`** — Next.js 16 `robots()` function gated on `NEXT_PUBLIC_ALLOW_INDEXING === 'true'` (default false). Disallow-all rule by default; allow-all rule when enabled. Always includes `sitemap: <siteUrl>/sitemap.xml`. Also sets `host` when indexing is on.

4. **Removed `public/robots.txt`** — the static file was conflicting with the Next.js `robots()` route, returning a 500 ("A conflicting public file and page file was found for path /robots.txt"). The Metadata API route now serves `/robots.txt` instead.

5. **Created `src/components/structured-data.tsx`** — Server component (no `'use client'`). Renders JSON-LD `<script>` tags for:
   - 6 `Product` schemas (one per family) — each with `name`, `description`, `brand`, `manufacturer`, `category`, `url`. No prices / offers / availability / ratings / reviews / SKU / GTIN / invented technical values (per master prompt section 23).
   - 1 `WebSite` schema with name, url, publisher (no SearchAction since the site has no search UI).
   - Descriptions mirror visible copy in `products.ts`. For BharatMembrane, description explicitly mentions "PVC Geo-Membrane" and "IS 15909:2020". For BharatHydro Seal, description explicitly mentions "Water Stop Solutions" and "IS 15058-2002". Verified live at `/`.
   - Exported as named `ProductStructuredData` and as the default export.

6. **Wired `ProductStructuredData` into `src/app/page.tsx`** — added import and rendered the component inside the page root container (server-rendered into initial HTML). Removed `'use client'` directive so structured data is reachable to crawlers without JS.

7. **Lint & runtime verification**
   - `bun run lint` → clean, no errors / warnings.
   - `curl /sitemap.xml` → 9 entries with correct priorities.
   - `curl /robots.txt` → `User-Agent: * Disallow: /` + Sitemap line (default, indexing off).
   - `curl /` → 8 JSON-LD blocks: 1 Organization (from layout), 6 Product, 1 WebSite.
   - Product schema keys verified: `[@context, @type, name, description, brand, manufacturer, category, url]` — no forbidden keys (price / offers / availability / aggregateRating / review / sku / gtin / mpn / priceSpecification).
   - BharatMembrane & BharatHydro Seal description strings verified to mention required standard tokens.

### Stage Summary

- `src/app/sitemap.ts` (new) — Metadata API sitemap with 9 URLs (1 root + 2 section anchors + 6 product-family anchors).
- `src/app/robots.ts` (new) — Metadata API robots; indexing gated by `NEXT_PUBLIC_ALLOW_INDEXING` env var; always references sitemap URL.
- `public/robots.txt` (deleted) — removed to resolve route/file conflict with `robots.ts`.
- `src/components/structured-data.tsx` (new) — server component emitting 6 `Product` JSON-LD + 1 `WebSite` JSON-LD; named + default export `ProductStructuredData`; compliant with master prompt section 23 (no prices / offers / ratings / fake SKUs / invented values; engineered-membrane descriptions mention required standard tokens).
- `src/app/page.tsx` (edited) — removed `'use client'`; imported and rendered `<ProductStructuredData />`.
- Lint clean. Live HTML contains 8 JSON-LD blocks. Sitemap.xml and robots.txt both served correctly by Next.js Metadata API.

---
Task ID: 0 (orchestrator)
Agent: Z.ai Code (main)
Task: Execute the ZAI Bharat Electrosafe Corrective Engineering Master Prompt — build, repair, and verify the complete single-page site in the sandbox.

Work Log:
- Read the master prompt from /home/z/my-project/upload/ZAI_Bharat_Electrosafe_Corrective_Engineering_Master_Prompt.md (29 sections).
- Updated tsconfig.json: restricted include to src/**, excluded examples/skills/mini-services/agent-ctx/upload/logs.
- Updated package.json: renamed to bharat-electrosafe; scripts = dev/build/start/lint/typecheck; removed db:* scripts; added resend.
- Created .env.example with RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_ALLOW_INDEXING=false.
- Created src/data/company.ts: central contact literals (+91 7617494968, +91 9667171444, info@bharatelectrosafe.com, wa.me/917617494968, Noida address, CM/L:8800129617) + generateWhatsAppUrl() with renamed params (no shadowing).
- Created src/data/products.ts: 6 product families with verified Class A/B/C table (BES1001-3, 2.0/2.5/3.0 mm, 3.3/11/33 KV, 10/22/36 KV, 30/45/65 KV), mat properties (15 N/mm², 250%, 10 mA, 100,000 MΩ, 5 s, −10..55 °C), membrane thicknesses 1–5 mm. Corrected Coloured Strip, Bi-Color, Auto-Glow, BharatMembrane (PVC Geo-Membrane IS 15909:2020), BharatHydro (IS 15058-2002) content per sections 8-12.
- Created src/data/team.ts: 3 leaders + 6 values (Vision, Mission, Respect, Trust, Ownership, Integrated Team Work).
- Updated next.config.ts: removed ignoreBuildErrors; added CSP (script-src 'self' 'unsafe-inline', no unsafe-eval, object-src 'none', base-uri 'self', frame-ancestors 'none', form-action 'self'), nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, HSTS; added 9 permanent PHP→anchor redirects.
- Updated layout.tsx: metadataBase, unique title/description, robots from NEXT_PUBLIC_ALLOW_INDEXING, canonical, Organization JSON-LD.
- Updated globals.css: industrial charcoal primary + safety amber accent (no indigo/blue), reduced-motion support, custom scrollbar.
- Built components: site-header (sticky nav + product dropdown + mobile Sheet menu), hero-section (hero + stats bar), products-section (3+3 grid + detail Dialog with Class A/B/C table), about-section (leaders + values + profile Dialog), contact-section (react-hook-form + zod, posts to /api/contact, success/503 states), site-footer (sticky mt-auto, all 6 products, contact details).
- Composed page.tsx as single-page app with min-h-screen flex flex-col + sticky footer + ProductStructuredData.
- Delegated Task 5 (contact API route + origin lib) and Task 6 (sitemap/robots/structured-data) to full-stack-developer subagents — both completed cleanly.
- Verified with Agent Browser: page renders, product detail dialog shows verified electrical data, contact form returns honest 503 fallback with phone/email/WhatsApp, mobile menu lists all 6 products, no horizontal overflow at 320/390px, no console errors.
- Verified SEO: 9 PHP routes → 308, robots.txt noindex, sitemap.xml 9 URLs, 8 JSON-LD blocks (no prices/SKUs).
- Verified security headers via curl: CSP, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy all present.
- Scanned for placeholders (XXXX, 9999999999, [City], Sector XX, etc.) — none found.
- Final gates: lint 0 errors (1 expected warning), typecheck clean.

Stage Summary:
- Complete single-page Bharat Electrosafe site built and verified in sandbox.
- All 10 fix categories from the master prompt addressed (build, TypeScript, content, placeholders, contact security, SEO, security headers, redirects, repo cleanup, readiness).
- 6 product families, verified electrical specs, corrected engineered-product content, secure contact API, full SEO layer.
- No assets added (all placeholders use stable data-asset-slot IDs).
- docs/CORRECTIVE_PASS_REPORT.md written.
- Deployment to Vercel/GitHub deferred to operator (sandbox cannot push).
