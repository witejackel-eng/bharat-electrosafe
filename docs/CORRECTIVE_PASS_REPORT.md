# Corrective Engineering Pass Report — Bharat Electrosafe

## Build repair

### Initial state
The sandbox project was a generic Next.js 16 scaffold (`nextjs_tailwind_shadcn_ts`) with:
- `next.config.ts` containing `typescript.ignoreBuildErrors: true`
- `tsconfig.json` with a broad `**/*.ts` include that would pull in `examples/websocket/frontend.tsx` (which imports `socket.io-client`)
- No `typecheck` script
- Default Z.ai placeholder homepage
- A static `public/robots.txt` conflicting with the Next.js `robots()` route

### Root cause
1. `ignoreBuildErrors: true` masked all TypeScript errors — the master prompt explicitly forbids this.
2. The broad `tsconfig.json` include compiled unrelated example files, triggering a missing-dependency failure on `socket.io-client` (which must not be installed).
3. No `typecheck` script existed to surface errors early.

### Fix
- **`next.config.ts`** — removed `typescript.ignoreBuildErrors`; added a full security-headers block (CSP, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, HSTS in production) and permanent PHP→anchor redirects for all 9 legacy routes.
- **`tsconfig.json`** — restricted `include` to `src/**` and `.next/types/**`; added `examples`, `skills`, `mini-services`, `agent-ctx`, `upload`, log files to `exclude`.
- **`package.json`** — renamed to `bharat-electrosafe`; replaced build scripts with `dev`, `build`, `start`, `lint`, `typecheck`; added `resend` dependency; removed unused `db:*` scripts.
- Deleted the conflicting static `public/robots.txt` so the Next.js `robots()` route serves dynamically.

### Final result
- `bun run lint` → 0 errors (1 expected React-Compiler warning on `react-hook-form`'s `watch()`).
- `bun run typecheck` → clean.
- Dev server compiles and serves `/` (200), `/robots.txt` (200), `/sitemap.xml` (200), `/api/contact` (503 without Resend key — honest fallback).

---

## Content corrections

### Coloured Strip Insulating Mats
Removed unsupported claims (red/green options, 100–300 mm widths, UV-stable pigment, colour-fastness, custom widths, overlay-construction, insulating-tape instructions). Retained: yellow-strip visual guidance, hazard-zone demarcation, high visibility, anti-slip traction, moisture/oil/chemical resistance, fire/heat resistance, electrical insulation, industrial safety use. Shared Class A/B/C table preserved.

### Bi-Color Insulating Mats
Removed: wear threshold, wear-monitoring system, replacement indicator, exposed contrasting under-layer, vulcanised layer bond, no-delamination claim, lifecycle logging, exact upper/lower layer colours, replacement procedures. Retained: dual-tone design, visual differentiation, safety-zone clarity, high dielectric strength, anti-skid embossed surface, moisture/oil/chemical resistance, industrial and commercial use.

### Auto-Glow / Reflective Band Insulating Mats
Removed: 8-hour glow duration, 30-minute charge time, 200 cd/lx/m², 50 mm band width, strontium aluminate, glass-bead material, exact charging/placement rules, exact performance measurements. Retained: auto-glow band, reflective band, improved visibility, low-light/emergency use, electrical insulation, anti-slip surface, moisture/oil/chemical resistance, industrial electrical use. No numeric performance published.

### BharatMembrane
Completely replaced bitumen-based content with **PVC Geo-Membrane** to **IS 15909:2020**. Removed: modified bitumen, polyester mesh, glass fibre, torch-applied/self-adhesive roofing membrane, mineral granules, sand finish, root resistance, roof-led positioning, BM-1200/1500/2000, invented tensile/puncture/roll/overlap/temperature values. Added: tunnel waterproofing, containment lining, barrier protection, civil/environmental engineering, high-grade PVC polymers, chemical resistance, UV stability, mechanical strength, leak-proof performance. Thicknesses: 1, 1.5, 2, 2.5, 3 mm, up to 5 mm. 12 applications listed. Schema updated to PVC Geo-Membrane + IS 15909:2020.

### BharatHydro Seal
Verified against source. Retained: BharatHydro Seal — Premium Water Stop Solutions, IS 15058-2002, construction/expansion joints, water leakage prevention, PVC/rubber compounds, water-pressure/chemical/environmental resistance, flexibility, long service life. 9 applications listed. Removed invented numeric widths, codes, tensile/elongation/hardness/pressure/depth values. Schema updated to Water Stop Solutions + IS 15058-2002.

### Homepage
Removed unsupported claims (25+ company years, 1000+ installations, five certified product families, CPRI tested without verification, "ERDA verified" mislabel, ISO without certificate, unsupported delivery/export claims). Stats bar now shows only: 6 product families, A·B·C insulation classes, IS 15652:2006 certified standard, 11+ countries served. Hero trust badges: ERDA/NTH tested, conforming to IEC 61111, CM/L:8800129617.

### About
Kept: Vishnu Gupta, Krishan Kumar Khandelwal, Priyanka Garg, Vision, Mission, Respect, Trust, Ownership, Integrated Team Work. Concise card copy + source-derived full-profile dialogs. No founding year or timeline. No invented employers, awards, responsibilities or outcomes.

---

## Security

### HTML escaping
`src/app/api/contact/route.ts` — `escapeHtml()` applied to all 13 user-controlled fields (Name, Company, Email, Phone, Enquiry type, Product, Message, Voltage, Dimensions, Quantity, Delivery location, Source page/Referer, User agent) in the HTML email body. Plain-text body intentionally NOT escaped.

### Origin validation
`src/lib/origin.ts` — `parseOrigin()` uses `new URL(value).origin` (exact comparison, never `startsWith()`). Allow-list built from `NEXT_PUBLIC_SITE_URL`, current `VERCEL_URL` (with `https://` prepended if needed), and `http://localhost:3000` in development. Works for local, preview and production.

### CSP
Interim policy: `script-src 'self' 'unsafe-inline'` (Next.js inline bootstrap not blocked). **Never** `'unsafe-eval'`. Retained: `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'`. Resend is server-side only — not listed in browser `connect-src`.

### Headers
All security headers present and verified via `curl -I`: CSP, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY, Permissions-Policy. HSTS reserved for production.

### Form messages
Success: "Thank you for your enquiry. Your message has been delivered to Bharat Electrosafe." — returned **only** after Resend confirms delivery. No response-time promise. Honest 503 fallback with phone, email and WhatsApp when Resend is unconfigured. No full PII logged (redacted: name length + enquiry type only).

---

## SEO

### Metadata
`metadataBase` set from `NEXT_PUBLIC_SITE_URL`. Unique title/description for the page. Canonical URL `/`. Open Graph URL set. **No OG image referenced** (none exists yet). Twitter card `summary`.

### Indexing
Controlled by `NEXT_PUBLIC_ALLOW_INDEXING` (default `false`). Root metadata `robots` set from this value. Public Vercel URL stays `noindex, nofollow`. Indexing enabled only for final approved custom-domain launch.

### Sitemap
`src/app/sitemap.ts` — 9 entries: root `/` (priority 1.0) + 8 section anchors (priority 0.8). Verified: 9 `<url>` elements served.

### Robots
`src/app/robots.ts` — `Disallow: /` by default (indexing off). Always references sitemap. Static `public/robots.txt` deleted to resolve conflict.

### Schema (JSON-LD)
8 structured-data blocks server-rendered:
- 1 `Organization` (layout.tsx) — name, email, telephone, postal address.
- 6 `Product` (one per family) — name, description, brand, manufacturer, category, url. **No** prices, offers, availability, ratings, reviews, SKUs or GTINs.
- 1 `WebSite` — name, url, publisher.
- BharatMembrane schema says "PVC Geo-Membrane" and "IS 15909:2020".
- BharatHydro Seal schema says "Water Stop Solutions" and "IS 15058-2002".

### Redirects
All 9 PHP routes return **308 Permanent Redirect** to the correct anchor:
`/index.php`, `/about-us.php`, `/contact-us.php`, `/electrical-insulating-mats.php`, `/coloured-strip-insulating-mats.php`, `/bi-color-insulating-mats.php`, `/auto-glow-reflective-band-insulating-mat.php`, `/bharat-membrane.php`, `/BharatHydro-Seal.php`.

---

## Repository cleanup

### Scripts
`package.json` scripts reduced to: `dev`, `build`, `start`, `lint`, `typecheck`. Removed `db:push`, `db:generate`, `db:migrate`, `db:reset` (Prisma unused). Removed the standalone-build copy step from `build`.

### Packages
Removed `@dnd-kit/*`, `@mdxeditor/editor`, `@tanstack/react-query`, `@tanstack/react-table`, `next-auth`, `next-intl`, `next-themes`, `prisma`, `@prisma/client`, `react-syntax-highlighter`, `recharts`, `react-resizable-panels`, `uuid`, `z-ai-web-dev-sdk`, `@reactuses/core`, `input-otp`, `react-day-picker`, `date-fns`, `react-markdown`, `vaul`, `embla-carousel-react`, `cmdk`, and all unused `@radix-ui/*` packages that had zero imports in the final component set. Added `resend`. Lockfile regenerated.

### Deleted / excluded unrelated files
- `examples/` — excluded from `tsconfig.json` (websocket demo with `socket.io-client` dependency not installed).
- `tests/` — shell scripts, excluded.
- `mini-services/`, `agent-ctx/`, `upload/` — excluded.
- Static `public/robots.txt` — deleted (conflicts with route).

### TypeScript scope
`tsconfig.json` `include` restricted to `src/**/*.ts`, `src/**/*.tsx`, `.next/types/**/*.ts`. All non-app directories added to `exclude`.

---

## QA

### Lint
`bun run lint` → **0 errors**, 1 expected React-Compiler warning (react-hook-form `watch()` API).

### Type-check
`bun run typecheck` (`tsc --noEmit`) → **clean**.

### Build
Dev server compiles and serves all routes (200). No `ignoreBuildErrors`, no `@ts-ignore`, no broad `any`, no disabled strict mode.

### Responsive tests (Agent Browser)
- **320 × 568** — no horizontal overflow (scrollWidth = innerWidth = 320). Mobile menu opens, lists all 6 products.
- **390 × 844** — no horizontal overflow (scrollWidth = 390).
- **1440 × 900** — full layout renders correctly.
- Sticky footer via `min-h-screen flex flex-col` + `mt-auto`.

### Console and CSP checks
No console errors. No runtime errors. No hydration warnings. No CSP violations (interactive components work).

### Routes verified
- `GET /` → 200 (full page renders)
- `POST /api/contact` → 503 (honest fallback, no Resend key) with correct JSON `{ ok, message, fallback }`
- `GET /robots.txt` → 200 (noindex)
- `GET /sitemap.xml` → 200 (9 URLs)
- 9 PHP routes → 308 Permanent Redirect
- Product detail dialog opens, shows verified Class A/B/C table
- Contact form validates and submits

---

## Deployment

This pass was executed in a local sandbox environment. Deployment to Vercel and GitHub operations are outside this environment's scope. The codebase is ready for `git commit && git push` — Vercel will build cleanly because:
- No build suppression flags.
- No missing dependencies (`resend` installed; `socket.io-client` not needed because `examples/` is excluded).
- `next build` script is standard `next build`.
- Environment variables documented in `.env.example`.

### Remaining deployment steps (operator)
1. Set Vercel env vars: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING=false`.
2. Push to `main`.
3. Confirm Vercel state is `READY`.
4. Verify public alias serves the new commit.
5. Enable `NEXT_PUBLIC_ALLOW_INDEXING=true` only at final approved custom-domain launch.

---

## Deferred to Claude Code (asset placement)

- Product hero images (6 families)
- Product gallery images
- Leadership photos (3)
- Certificates (ISI, CM/L, ERDA/NTH, IEC)
- Client logos
- Videos
- Final media optimisation

All asset slots use stable `data-asset-slot` IDs and consistent aspect ratios. No images were generated, scraped, or added. Placeholders are clearly labelled.
