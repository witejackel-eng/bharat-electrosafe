# Z.ai Corrective Engineering Master Prompt — Bharat Electrosafe

## Project

Repository: https://github.com/witejackel-eng/bharat-electrosafe  
Current deployment: https://bharat-electrosafe.vercel.app/  
Official factual source: https://bharatelectrosafe.com/index.php

Supporting sources:
- https://bharatelectrosafe.com/about-us.php
- https://bharatelectrosafe.com/contact-us.php
- https://bharatelectrosafe.com/electrical-insulating-mats.php
- https://bharatelectrosafe.com/coloured-strip-insulating-mats.php
- https://bharatelectrosafe.com/bi-color-insulating-mats.php
- https://bharatelectrosafe.com/auto-glow-reflective-band-insulating-mat.php
- https://bharatelectrosafe.com/bharat-membrane.php
- https://bharatelectrosafe.com/BharatHydro-Seal.php

Latest corrective commit to inspect first:
`5d0c5c9621e8db16cc3d198c4209313d562ad04d`

---

# 1. Objective

Repair the latest implementation and deploy it successfully.

This is a strict corrective engineering pass.

The current design is approved. Do not redesign it.

Do not change:
- Colour palette
- Typography
- Header or navigation structure
- Product dropdown design
- Buttons, cards or section order
- Homepage composition
- Product-page layout
- About or Contact layouts
- Footer design
- Motion style
- Spacing system
- Asset slots
- Empty media fallbacks
- Image ratios

Claude Code will place final assets later.

Fix only:
1. Build failures
2. TypeScript errors
3. Incorrect product content
4. Remaining placeholders
5. Contact-form security and delivery
6. SEO
7. Security headers
8. Redirects
9. Repository cleanup
10. Vercel deployment

---

# 2. Verify the current state

Before editing:

1. Pull latest `main`.
2. Confirm commit SHA.
3. Run:
   ```bash
   npm install
   npm run lint
   npm run typecheck
   npm run build
   ```
4. Add `typecheck` if missing.
5. Record all failures.
6. Check Vercel deployment status.
7. Confirm whether the public alias serves the latest commit.
8. Do not report success until Vercel is `READY`.

Create:

```text
docs/CORRECTIVE_PASS_REPORT.md
```

Include starting commit, failures, fixes, final tests, final deployed commit, deployment URL and remaining verification items.

---

# 3. Fix the build first

The latest build compiles unrelated files such as:

```text
examples/websocket/frontend.tsx
```

and fails because `socket.io-client` is missing.

Do not install `socket.io-client`.

Restrict `tsconfig.json` to the actual app:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "noImplicitAny": false,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "examples",
    "skills",
    "mini-services",
    "agent-ctx",
    "upload",
    "dev.log",
    "server.log"
  ]
}
```

Delete unrelated example folders only when clearly unused.

Do not fix the build by:
- Installing unused packages
- Restoring `ignoreBuildErrors`
- Adding `@ts-ignore`
- Adding broad `any`
- Disabling strict mode

Rerun type-check and fix every newly exposed error properly.

---

# 4. Fix the WhatsApp helper

In `src/data/company.ts`, rename the function parameter that shadows the imported `company` object.

Use:

```ts
export function generateWhatsAppUrl(
  name?: string,
  companyName?: string,
  product?: string,
  message?: string,
): string {
  const parts: string[] = [];

  if (name) parts.push(`Hi, I'm ${name}`);
  if (companyName) parts.push(`from ${companyName}`);
  if (product) parts.push(`I'm interested in ${product}`);
  if (message) parts.push(message);

  const text = parts.length > 0 ? `${parts.join('. ')}.` : '';
  const base = company.whatsapp.href;

  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
```

Verify empty, partial and full-message calls.

---

# 5. Remove all remaining placeholders

Search for:

```text
XXXX
XXXXXXXXXX
9999999999
[City]
[State]
Sector XX
XXXXXX
CM/L-XXXXXX
tel:+91XXXXXXXXXX
wa.me/91XXXXXXXXXX
Industrial Area
© 2025
```

Use the central values from `src/data/company.ts`:

- +91 7617494968
- +91 9667171444
- https://wa.me/917617494968
- info@bharatelectrosafe.com
- 704, 7th Floor, I-thum, Tower A, Plot No. A-40, Sector-62, Noida-201309, Uttar Pradesh, India
- CM/L:8800129617

Audit header, footer, mobile menu, homepage, contact page, product CTAs, email templates, schema, map and metadata.

Do not duplicate contact literals across components.

---

# 6. Keep the six current product families

Keep:

1. Electrical Insulating Mats
2. Coloured Strip Insulating Mats
3. Bi-Color Insulating Mats
4. Auto-Glow / Reflective Band Insulating Mats
5. BharatMembrane
6. BharatHydro Seal

Keep the current 3+3 homepage grid and present dropdown design.

Ensure all six appear consistently in navigation, footer, contact selector, sitemap, related products and schema.

---

# 7. Preserve the verified electrical data

Keep:

| Property | Class A | Class B | Class C |
|---|---|---|---|
| Product code | BES1001 | BES1002 | BES1003 |
| Thickness | 2.0 mm | 2.5 mm | 3.0 mm |
| Working voltage | 3.3 KV | 11.0 KV | 33.0 KV |
| AC proof voltage | 10.0 KV | 22.0 KV | 36.0 KV |
| Di-electric strength | 30.0 KV | 45.0 KV | 65.0 KV |

Also keep:
- Coin, Dot and Hexa
- 15 N/mm² tensile strength minimum
- 250% elongation minimum
- 10 mA leakage current maximum
- 100,000 MΩ insulation resistance minimum at 500 V
- Flame extinguishing within 5 seconds maximum
- −10°C to 55°C working temperature
- Black and Blue
- 1 metre width
- 10 and 20 metre lengths
- IS 15652:2006
- CM/L:8800129617
- Conforming to IEC 61111

---

# 8. Correct Coloured Strip content

Source:
https://bharatelectrosafe.com/coloured-strip-insulating-mats.php

Remove unsupported:
- Red and green options unless source-confirmed
- 100–300 mm widths
- UV-stable pigment claims
- Colour-fastness claims
- Custom width values
- Overlay-construction claims
- Insulating-tape instructions

Retain:
- Yellow-strip visual guidance
- Hazard-zone demarcation
- High visibility
- Anti-slip traction
- Moisture, oil and chemical resistance
- Fire and heat resistance
- Electrical insulation
- Industrial safety use

Keep the shared Class A/B/C table and current page design.

---

# 9. Correct Bi-Color content

Source:
https://bharatelectrosafe.com/bi-color-insulating-mats.php

Remove:
- Wear threshold
- Wear-monitoring system
- Replacement indicator
- Exposed contrasting under-layer after wear
- Vulcanised layer bond
- No-delamination claim
- Lifecycle logging
- Exact upper/lower layer colours
- Replacement procedures based on layer visibility

Use:
- Dual-tone design
- Visual differentiation
- Safety-zone clarity
- High dielectric strength
- Anti-skid embossed surface
- Moisture, oil and chemical resistance
- Industrial and commercial use

Keep the existing page layout, table, CTA and asset placeholders.

---

# 10. Correct Auto-Glow / Reflective content

Source:
https://bharatelectrosafe.com/auto-glow-reflective-band-insulating-mat.php

Remove:
- Eight-hour glow duration
- Thirty-minute charge time
- 200 cd/lx/m² reflective index
- 50 mm band width
- Strontium aluminate
- Glass-bead reflective material
- Exact charging and placement rules
- Exact performance measurements

Use:
- Auto-glow band
- Reflective band
- Improved visibility
- Low-light and emergency use
- Electrical insulation
- Anti-slip surface
- Moisture, oil and chemical resistance
- Industrial electrical use

Do not publish numeric performance without approved documents.

---

# 11. Replace BharatMembrane content completely

Source:
https://bharatelectrosafe.com/bharat-membrane.php

Keep the current visual page structure but replace all technical content.

Correct identity:
**BharatMembrane – PVC Geo-Membrane**

Correct standard:
**IS 15909:2020**

Use:
- PVC Geo-Membrane
- Tunnel waterproofing
- Containment lining
- Barrier protection
- Civil and environmental engineering
- High-grade PVC polymers
- Chemical resistance
- UV stability
- Mechanical strength
- Leak-proof performance

Thicknesses:
- 1 mm
- 1.5 mm
- 2 mm
- 2.5 mm
- 3 mm
- Up to 5 mm

Applications:
- Tunnel waterproofing
- Basement waterproofing where supported
- Landfills
- Hazardous-waste containment
- Reservoirs
- Canals
- Ponds
- Mining
- Ash-dyke lining
- Industrial effluent ponds
- Aquaculture
- Agricultural lining

Remove:
- Modified bitumen
- Polyester mesh
- Glass fibre
- Torch-applied roofing membrane
- Self-adhesive roofing membrane
- Mineral granules
- Sand finish
- Root resistance
- Roof-led positioning
- BM-1200, BM-1500 and BM-2000
- Invented tensile values
- Invented puncture values
- Invented roll sizes
- Invented overlap values
- Invented temperatures

Do not invent replacement test values.

Update metadata, schema, hero, quick facts, overview, benefits, specifications, properties, dimensions, applications, FAQs and document names without changing layout.

---

# 12. Verify BharatHydro

Source:
https://bharatelectrosafe.com/BharatHydro-Seal.php

Keep:
- BharatHydro Seal – Premium Water Stop Solutions
- IS 15058-2002
- Construction and expansion joints
- Water leakage prevention
- PVC and rubber compounds
- Water pressure, chemical and environmental resistance
- Flexibility
- Long service life

Applications:
- Water tanks
- Reservoirs
- Dams
- Canals
- Sewage treatment plants
- Basements
- Underground structures
- Swimming pools
- Tunnels

Remove numeric widths, codes, tensile values, elongation, hardness, pressure ratings and installation depths unless source-confirmed.

---

# 13. Clean homepage claims

Do not change layout.

Remove unsupported:
- 25+ company years
- 1000+ installations
- Five certified product families
- CPRI tested without verification
- “ERDA verified” when source says tested
- ISO without verified certificate
- Unsupported delivery/export claims

Use only:
- Six product families
- Classes A, B and C
- IS 15652:2006
- CM/L:8800129617
- ERDA/NTH tested
- Conforming to IEC 61111
- 11+ countries only when accurately qualified
- 1,000+ satisfied customers only when accurately qualified

Do not turn customers into installations or an individual’s experience into company age.

---

# 14. Clean About-page biographies

Keep:
- Vishnu Gupta
- Krishan Kumar Khandelwal
- Priyanka Garg
- Vision
- Mission
- Respect
- Trust
- Ownership
- Integrated Team Work

Match biographies against:
https://bharatelectrosafe.com/about-us.php

Remove unsupported generic language, invented employers, awards, responsibilities and outcomes.

Keep concise card copy and source-derived full-profile dialogs.

Do not add a founding year or timeline.

---

# 15. Escape HTML email input

In `src/app/api/contact/route.ts`, add:

```ts
function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
```

Escape all user-controlled values in the HTML email:
- Name
- Company
- Email
- Phone
- Enquiry type
- Product
- Message
- Voltage
- Dimensions
- Quantity
- Delivery location
- Source page
- User agent

Do not escape the plain-text version.

---

# 16. Fix origin validation

Do not use `startsWith()`.

Use exact parsed-origin comparison:

```ts
function parseOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}
```

Build the allow-list from:
- `NEXT_PUBLIC_SITE_URL`
- Current `VERCEL_URL`
- `http://localhost:3000` in development

Compare exact origins.

Do not break local, preview or production forms.

---

# 17. Fix the contact response

Replace:

```text
Our team will respond within 24 business hours.
```

with:

```text
Thank you for your enquiry. Your message has been delivered to Bharat Electrosafe.
```

Only return success after Resend confirms delivery.

Keep an honest 503 fallback with phone, email and WhatsApp.

Do not log full PII.

---

# 18. Environment configuration

Ensure `.env.example` contains:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=info@bharatelectrosafe.com
NEXT_PUBLIC_SITE_URL=https://bharatelectrosafe.com
NEXT_PUBLIC_ALLOW_INDEXING=false
```

Ensure Git ignores `.env*` files.

The site must build without Resend configuration; the form should then return 503, not false success.

---

# 19. Fix CSP

The current `script-src 'self'` may block Next.js inline bootstrap scripts.

Preferred:
- Implement nonce-based CSP compatible with Next.js 16.

Acceptable interim:
```text
script-src 'self' 'unsafe-inline'
```

Never add:
```text
'unsafe-eval'
```

Keep:
- `object-src 'none'`
- `base-uri 'self'`
- `frame-ancestors 'none'`
- `form-action 'self'`
- `nosniff`
- Referrer Policy
- Permissions Policy
- HSTS in production

Allow YouTube only when actually embedded.

Do not include Resend in browser `connect-src`.

Test every interactive component and eliminate browser CSP errors.

---

# 20. Migrate deprecated middleware

The current build warns that middleware is deprecated in Next.js 16.

Migrate to the supported proxy convention while preserving:
- PHP redirects
- Query parameters
- Security headers
- Matcher behaviour
- Preview and production support

Test redirects for:
- `/index.php`
- `/about-us.php`
- `/contact-us.php`
- `/electrical-insulating-mats.php`
- `/coloured-strip-insulating-mats.php`
- `/bi-color-insulating-mats.php`
- `/auto-glow-reflective-band-insulating-mat.php`
- `/bharat-membrane.php`
- `/BharatHydro-Seal.php`

All must be permanent redirects to the correct new routes.

---

# 21. Fix indexing

Use:

```env
NEXT_PUBLIC_ALLOW_INDEXING=false
```

Set root metadata robots from this value.

The public Vercel URL must stay `noindex, nofollow`.

Do not rely only on `VERCEL_ENV`, because a Vercel alias can be a production deployment while still unfinished.

Enable indexing only for the final approved custom-domain launch.

---

# 22. Complete metadata

Add:

```ts
metadataBase: new URL(SITE_URL)
```

Ensure unique metadata for:
- Home
- About
- Contact
- Six product pages

Add canonical URLs and Open Graph URLs.

Do not reference an OG image until a real file exists.

Make sitemap, robots and root metadata agree.

---

# 23. Correct structured data

Do not include:
- Prices
- Offers
- Availability
- Ratings
- Reviews
- Fake SKUs
- Fake GTINs
- Invented technical values

BharatMembrane schema must say PVC Geo-Membrane and IS 15909:2020.

BharatHydro schema must say Water Stop Solutions and IS 15058-2002.

Visible copy and schema must match.

---

# 24. Clean package configuration

Change package name to:

```json
"name": "bharat-electrosafe"
```

Use scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit"
}
```

Remove unused database scripts when Prisma is unused.

Audit before removing dependencies.

Potential unused packages include Prisma, NextAuth, React Query, Recharts, MDX editor, DnD libraries, syntax highlighter, next-intl, next-themes, Z.ai SDK and unused Radix components.

Remove only packages with zero imports.

Regenerate the lockfile and rerun all checks.

---

# 25. No asset placement

Do not:
- Add proprietary images
- Scrape old-site images
- Generate images
- Add stock images
- Add leadership photos
- Add certificates
- Add client logos
- Add videos
- Change asset-slot IDs
- Change ratios
- Redesign placeholders

Claude Code will do this later.

---

# 26. Accessibility and responsive regression

Verify:
- Keyboard dropdown
- Escape closing
- Mobile focus trap
- Leadership dialog focus trap and restoration
- Visible focus
- Form error associations
- Proper table headers and captions
- 44px targets
- Reduced motion
- Content visible when animation is disabled

Test:
- 320×568
- 360×800
- 390×844
- 430×932
- 768×1024
- 820×1180
- 1024×1366
- 1280×800
- 1440×900
- 1920×1080

Check six-product dropdown, long titles, tables, footer, contact details and horizontal overflow.

---

# 27. Quality gates

Run:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

All must pass.

Verify:
- No build suppression
- No new broad `any`
- No `@ts-ignore`
- No console errors
- No hydration warnings
- No CSP errors
- No broken links
- No fake downloads
- No placeholder contacts
- No unsupported Bi-Color wear system
- No invented Auto-Glow measurements
- No bitumen-based BharatMembrane content
- No response-time promise
- No HTML injection
- No unsafe origin prefix match
- No Vercel indexing
- No broken PHP redirects
- No assets added

---

# 28. Deployment

After all checks pass:

1. Commit.
2. Push.
3. Wait for Vercel.
4. Confirm state is `READY`.
5. Open the deployed URL.
6. Test homepage, About, Contact, all six products, redirects, robots, sitemap and contact fallback.
7. Confirm the public alias serves the new commit.

Do not report success based only on Git push.

---

# 29. Final report

Return:

## Build repair
- Initial failure
- Root cause
- Fix
- Final result

## Content corrections
- Coloured Strip
- Bi-Color
- Auto-Glow / Reflective
- BharatMembrane
- BharatHydro
- Homepage
- About

## Security
- HTML escaping
- Origin validation
- CSP
- Headers
- Form messages

## SEO
- Metadata
- Indexing
- Sitemap
- Robots
- Schema
- Redirects

## Repository cleanup
- Scripts
- Packages
- Deleted unrelated files
- TypeScript scope

## QA
- Lint
- Type-check
- Build
- Responsive tests
- Console and CSP checks
- Routes

## Deployment
- Commit
- URL
- Vercel state
- Public alias status

## Deferred to Claude
- Images
- Certificates
- Leadership photos
- Client logos
- Videos
- Final media optimisation

Only report verified actions.

---

# Definition of done

Complete only when:
- The visual design is unchanged
- The repository builds
- Vercel is `READY`
- Public alias serves the latest commit
- WhatsApp helper is fixed
- No placeholder contacts remain
- Electrical specifications remain correct
- Unsupported variant details are removed
- BharatMembrane is correctly PVC Geo-Membrane
- BharatHydro has no invented numeric data
- HTML email is escaped
- Origin checks are exact
- Contact success has no response-time promise
- CSP works with Next.js
- Middleware warning is resolved
- Preview indexing is disabled
- Metadata, sitemap and robots are aligned
- Scripts are production-appropriate
- Lint passes
- Type-check passes
- Build passes
- No assets are added
