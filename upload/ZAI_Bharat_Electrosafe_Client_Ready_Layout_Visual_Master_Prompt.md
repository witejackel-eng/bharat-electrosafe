# Z.ai Master Prompt — Bharat Electrosafe Client-Ready Layout and Visual Rebuild

Work directly inside the existing project:

**GitHub repository:**  
https://github.com/witejackel-eng/bharat-electrosafe

**Current preview:**  
https://bharat-electrosafe.vercel.app/

**Original website and factual reference:**  
https://bharatelectrosafe.com/index.php

---

# 1. ROLE

Act as a senior creative director, industrial B2B UX designer, brand-system designer, conversion strategist and production-grade Next.js engineer.

This task is about **layout, visual hierarchy, page composition, responsive art direction and production finishing**.

Do not perform the proprietary `bharatsafe` asset audit in this task.

Claude Code will later inspect, select and allocate the proprietary assets.

Your responsibility now is to make the complete website look polished enough to show the client immediately, using:

1. Assets already present in the public repository
2. Assets already publicly available on the existing Bharat Electrosafe website
3. Carefully designed neutral visual fallback blocks only when no usable public image exists

Do not leave broken image boxes.

Do not wait for future assets before completing the design.

Build stable asset slots so Claude can later replace the temporary public images without changing the layout.

---

# 2. CURRENT WEBSITE ASSESSMENT

The current website has a useful white-and-yellow direction, but it still looks like an unfinished development build.

The current screenshots reveal these problems:

- Broken product-card images on the homepage
- Broken manufacturing image
- Product cards feel like basic bordered boxes
- Homepage sections are visually similar and lack hierarchy
- The header looks generic
- The footer is functional but not premium
- The About Us page is too long, too sparse and visually fragmented
- Leadership cards contain empty or placeholder visuals
- Manufacturing and testing cards feel like placeholders
- Certificate cards are small and repetitive
- Contact page has too much vertical space and weak composition
- Contact form occupies only a narrow portion of the page
- Product-selection guidance is visually detached from the form
- Product page has excessive vertical length
- Product gallery repeats the same large image
- Technical content is broken into too many full-width sections
- Related-product cards are too small and repetitive
- The product-page final CTA uses a dark section that conflicts with the approved calm white-and-yellow theme
- Some table headings are visually heavy
- There is insufficient visual difference between page types
- The site still feels like a wireframe with real text added

Do not apply another small styling pass.

Recompose the pages into clear, premium, editorially controlled experiences.

---

# 3. PROJECT BOUNDARIES

## Keep the approved structure

Main header:

- Home
- Products
- About Us
- Contact Us
- Request a Quote button

Products dropdown:

1. Electrical Insulating Mats
2. Coloured Strip Insulating Mats
3. Bi-Color Insulating Mats
4. Auto-Glow / Reflective Band Insulating Mats
5. BharatMembrane

Approved routes:

```text
/
├── /products/electrical-insulating-mats
├── /products/coloured-strip-insulating-mats
├── /products/bi-color-insulating-mats
├── /products/auto-glow-reflective-band-insulating-mats
├── /products/bharat-membrane
├── /about-us
├── /contact-us
├── /privacy-policy
├── /terms
└── custom 404
```

Do not add more top-level navigation pages.

Do not add more products.

Do not build a CMS.

Do not build an ecommerce checkout.

Do not redesign the business.

---

# 4. DESIGN GOAL

The final website should feel like a custom ₹1 lakh industrial corporate website.

It must communicate:

- Technical competence
- Product confidence
- Manufacturing credibility
- Documentation readiness
- Safety expertise
- Professional enquiry handling

The website should feel expensive because of:

- Strong hierarchy
- Authentic product presentation
- Refined spacing
- Consistent typography
- Controlled yellow usage
- Excellent mobile composition
- Clear page storytelling
- Subtle motion
- Careful component finishing

It should not feel expensive by adding more sections, shadows, animations or decorative elements.

---

# 5. VISUAL SYSTEM

## 5.1 Colour palette

Maintain the original Bharat Electrosafe white-and-yellow character.

Use:

```css
--white: #FFFFFF;
--warm-white: #FFFEF9;
--cream: #FFFDF3;
--yellow-50: #FFFBE8;
--yellow-100: #FFF4BE;
--yellow-400: #FFD43B;
--yellow-500: #FFC400;
--yellow-600: #DFAA00;
--charcoal-950: #242426;
--charcoal-800: #38383A;
--grey-650: #66666A;
--grey-400: #A9A9A5;
--grey-250: #D8D7D1;
--grey-150: #ECEBE5;
```

Sample the final yellow from the existing approved logo.

## 5.2 Colour rules

- White and warm white should dominate
- Pale yellow should define sections gently
- Strong yellow should be used for actions and small accents
- Charcoal should carry all primary text
- Grey should carry metadata and borders
- Avoid large black or navy sections
- Avoid blue footers
- Avoid strong gradients
- Avoid glowing effects
- Avoid glassmorphism
- Avoid multiple competing accent colours

## 5.3 Typography

Use one clean sans-serif family.

Preferred:

- Manrope
- DM Sans
- Inter

Use one family consistently.

Suggested scale:

```css
Hero H1:
clamp(3rem, 6vw, 5.75rem)

Page H1:
clamp(2.6rem, 5vw, 4.75rem)

Section H2:
clamp(2.1rem, 4vw, 3.6rem)

Product H1:
clamp(2.45rem, 4.6vw, 4.3rem)

Card title:
1.05rem to 1.25rem

Body large:
1.125rem

Body:
1rem

Metadata:
0.8rem to 0.875rem
```

Do not make all headings oversized.

Control line lengths.

Hero headings should generally remain under 12 words.

## 5.4 Spacing

Use an 8px spacing system.

Desktop:

- Major section padding: 104–144px
- Supporting section padding: 72–96px
- Container width: 1280–1360px
- Page horizontal padding: 32–56px

Tablet:

- Major section padding: 80–104px
- Horizontal padding: 28–40px

Mobile:

- Major section padding: 64–80px
- Horizontal padding: 20–24px

Do not leave huge blank areas caused by missing images.

---

# 6. GLOBAL COMPONENT SYSTEM

Create or refine these primitives:

```text
src/components/ui/
├── SectionHeader.tsx
├── Eyebrow.tsx
├── PrimaryButton.tsx
├── SecondaryButton.tsx
├── TextLink.tsx
├── ImageFrame.tsx
├── TechnicalBadge.tsx
├── DocumentCard.tsx
├── LogoRail.tsx
├── DataTable.tsx
├── FeatureList.tsx
├── PageIntro.tsx
└── EmptyMediaFallback.tsx
```

Do not wrap every piece of content in a card.

Use cards only for:

- Products
- Documents
- Awards
- Contact methods
- Related products

Use spacing and typography for everything else.

---

# 7. ASSET SLOT SYSTEM

Claude will replace assets later.

Create stable slots now.

Every major visual must use a slot ID.

Examples:

```text
HOME-HERO-01
HOME-PRODUCT-EIM-01
HOME-PRODUCT-CSIM-01
HOME-PRODUCT-BCIM-01
HOME-PRODUCT-AGRIM-01
HOME-PRODUCT-BM-01
HOME-CAPABILITY-01
ABOUT-LEADERSHIP-01
ABOUT-MANUFACTURING-01
ABOUT-TESTING-01
ABOUT-AWARD-01
PRODUCT-EIM-HERO-01
PRODUCT-EIM-GALLERY-01
PRODUCT-CSIM-HERO-01
PRODUCT-BCIM-DIAGRAM-01
PRODUCT-AGRIM-LOWLIGHT-01
PRODUCT-BM-HERO-01
```

Create:

```text
src/data/asset-slots.ts
docs/ASSET_SLOT_SPECIFICATION.md
```

Each slot should define:

- Current public fallback path
- Alt text
- Desktop aspect ratio
- Mobile aspect ratio
- Object position
- Future replacement category

Do not reference the private `bharatsafe` folder.

## Broken-image rule

No `<img>` or `Image` component may render a broken source.

Before rendering an image:

- Confirm the path exists
- Provide a public fallback
- Use a designed `EmptyMediaFallback` only as a final fallback

The fallback should look intentional:

- Pale-yellow field
- Small product/category label
- Subtle technical line pattern
- No word “placeholder”
- No broken-image icon

---

# 8. HEADER REDESIGN

The current header is too generic.

Create a polished two-level header.

## Top contact strip

Height:

- Approximately 28–32px desktop
- Hidden or simplified on mobile

Content:

- Email
- Primary phone
- WhatsApp

Style:

- Warm-white or pale-yellow
- Small charcoal text
- Thin bottom border
- No black background
- No heavy icons

## Main header

Height:

- 72–80px desktop
- 64–72px mobile

Structure:

```text
[ Logo + name ]        Home   Products ▼   About Us   Contact Us        [ Request a Quote ]
```

Visual treatment:

- White background
- Soft bottom border
- Very subtle shadow after scroll
- Sticky
- Compact scroll state
- No floating glass panel
- No large rounded capsule header
- No experimental interaction

## Product dropdown

Create a refined wide dropdown.

Desktop:

- Two or three columns
- Five products
- Small thumbnail
- Product name
- One-line use
- View all products not required

Do not render a plain vertical list with thick borders.

Mobile:

- Accordion
- Clear five product links
- Large touch targets

---

# 9. HOMEPAGE REDESIGN

The homepage must be client-presentable now.

Use exactly six primary sections.

---

## SECTION 1 — HERO

Create a high-quality editorial hero.

Desktop:

- 55% copy
- 45% media
- Minimum height approximately 650–720px
- Vertically centred
- Warm-white background
- Subtle pale-yellow media field

Copy:

Eyebrow:

**ELECTRICAL INSULATION AND INDUSTRIAL PROTECTION**

H1:

**Certified protection for critical electrical environments.**

Supporting text:

**Electrical insulating mats and engineered protection products for control panels, substations, utilities, industry and infrastructure.**

Primary CTA:

**View Products**

Secondary CTA:

**Request a Quote**

Proof line:

- IS 15652:2006
- BIS licence
- Tested documentation
- Custom dimensions

Visual:

- Use current valid public product asset
- Preserve visible product detail
- No broken image
- No generic worker illustration
- No Class A/B/C text floating randomly over the image
- If Class labels are used, align them in a restrained technical legend below the image

Mobile:

- Copy first
- CTA buttons visible before long scroll
- Media immediately after CTA
- Proof line wraps cleanly

---

## SECTION 2 — PRODUCT RANGE

Heading:

**Our product range**

Supporting line:

**Five product families, each designed around a specific protection requirement.**

Use a premium editorial 3+2 layout.

Desktop:

- First row: three cards
- Second row: two wider cards
- Cards have varied but controlled proportions
- Images occupy 58–65% of card height
- Text remains concise

Tablet:

- Two columns
- Fifth card spans two columns only when visually balanced

Mobile:

- One column
- Image ratio approximately 16:10 or 4:3

Every card:

- Real current public image or intentional fallback
- Product name
- One sentence
- View Product
- Subtle yellow line or index
- Gentle hover image scale

Do not show broken image alt text.

Do not use identical repeated images for three products.

---

## SECTION 3 — DOCUMENTATION AND TRUST

Heading:

**Documentation that supports technical decisions**

Supporting text:

**Standards, licences, testing records and company credentials organised for faster technical evaluation.**

Layout:

Desktop:

- Left: three featured document cards
- Right or below: moving institutional logo rail

Document cards:

- Larger than current
- Thumbnail area
- Document type
- Name
- Issuer
- Reference/standard
- Preview
- Download PDF
- Hide unavailable buttons

Logo rail:

- Slow
- Accessible
- Grayscale to colour on hover/focus
- Names visible on mobile
- No public disclaimer paragraph
- Use neutral heading

Do not create a tiny row of acronyms that looks unfinished.

---

## SECTION 4 — CAPABILITY

Heading:

**Built around safety, quality and application support**

Use a balanced split layout.

Left:

- Authentic current public company/manufacturing image or intentional fallback

Right:

- Short company paragraph
- Four proof points
- About Us link

Proof points:

- Certified and tested products
- Classes A, B and C
- Custom dimensions and configurations
- Technical documentation and enquiry support

Do not use four generic icon cards followed by a broken image.

---

## SECTION 5 — INDUSTRIES AND APPLICATIONS

Heading:

**Industries and applications**

Use a visual mosaic or compact editorial list.

Applications:

- Power utilities
- Substations and switchrooms
- Railways and metro
- Oil and gas
- Manufacturing
- Infrastructure and construction

Desktop:

- Three-column visual/list arrangement

Mobile:

- Two columns only if readable
- Otherwise one column

Use very short copy.

Do not make six identical bordered text boxes with tiny icons.

---

## SECTION 6 — FINAL CTA

Use a pale-yellow full-width section.

Heading:

**Need help selecting the correct product?**

Copy:

**Share your operating voltage, dimensions, quantity and delivery location.**

Actions:

- Request a Quote
- Call Sales
- WhatsApp

No dark footer-like CTA.

No section after this except the footer.

---

# 10. ABOUT US PAGE REDESIGN

The current About Us page is too long and fragmented.

Rebuild it into six primary chapters.

---

## CHAPTER 1 — PAGE INTRO

Desktop:

- 55/45 split
- Left: page title and concise introduction
- Right: company/product visual

H1:

**About Bharat Electrosafe**

Supporting paragraph:

Maximum 80–110 words.

Do not begin with a long wall of text.

---

## CHAPTER 2 — WHAT THE COMPANY MANUFACTURES

Show the five approved products in a compact visual overview.

Use:

- One large lead product
- Four smaller product links

Do not repeat the homepage’s exact card layout.

---

## CHAPTER 3 — COMPANY, MISSION AND LEADERSHIP

Combine:

- Short company journey
- Mission and values
- Leadership

Do not create a long vertical timeline unless verified and visually meaningful.

Leadership:

- Three balanced profiles
- Proper image frames
- Consistent crop
- Name
- Role
- Short relevant biography
- No empty circles

Until Claude replaces images:

- Use current public leadership asset if available
- Otherwise use a refined monogram portrait fallback

No broken image.

---

## CHAPTER 4 — MANUFACTURING, TESTING AND QUALITY

Use one major visual composition.

Desktop:

- Large image
- Supporting two smaller image slots
- Short verified copy
- Three technical proof rows

Do not show three pale placeholder cards with icons.

---

## CHAPTER 5 — CERTIFICATES, AWARDS AND MEDIA

Combine related credibility content.

### Certificates

- Responsive document grid
- Three columns desktop
- Two tablet
- One mobile
- Larger thumbnails
- Clear Preview and Download
- No tiny text
- No repeated empty icon panels

### Awards

- Two or three real cards
- Image-led
- Short factual captions

### Industry Participation & Media

Include:

- Plast India 2026 video
- Make in India Conclave interview

Use YouTube facade.

No iframe before interaction.

---

## CHAPTER 6 — INDUSTRIES, CLIENTS AND CTA

Show:

- Industries served
- Client/institutional logo rail
- Contact CTA

Do not add a separate “Sectors we serve” section after “Industries served” if both repeat the same content.

Merge them.

---

# 11. CONTACT US PAGE REDESIGN

The current Contact page is too vertically long and underuses desktop width.

Rebuild into four chapters.

---

## CHAPTER 1 — PAGE INTRO AND CONTACT METHODS

Desktop:

- 45% intro
- 55% contact-method grid

Show:

- Email
- Primary phone
- Secondary phone
- WhatsApp
- Address

Use refined cards with enough whitespace.

Do not use a huge empty hero area.

---

## CHAPTER 2 — ENQUIRY AND QUOTATION

Desktop:

- 7/5 split

Left:

- Form

Right:

- Product-selection guidance
- Class A/B/C compact comparison
- Direct call/WhatsApp help

This is better than placing guidance far below the form.

Form width should not remain narrow on desktop.

Use logical two-column fields:

- Name / Company
- Email / Phone
- Enquiry type / Product

Message full width.

Conditional fields appear only when needed.

Mobile:

- One column
- Guidance below form

---

## CHAPTER 3 — OFFICE LOCATION

Desktop:

- 5/7 split
- Address and directions on left
- Click-to-load map on right

Do not use a tiny map placeholder floating alone.

---

## CHAPTER 4 — FINAL DIRECT CONTACT CTA

Use pale yellow.

Keep actions:

- Call
- Email
- WhatsApp

Do not use a full bright-yellow wall with low contrast.

---

# 12. PRODUCT PAGE REDESIGN

The current product page is too long and repetitive.

Reduce it to eight primary chapters.

---

## CHAPTER 1 — PRODUCT HERO

Desktop:

- 46% content
- 54% media

Content:

- Breadcrumb
- Standard badges
- Product H1
- Short introduction
- Three quick facts
- Request Quote
- Download Datasheet if real

Media:

- Main product image
- Two small supporting thumbnails
- No repeated giant image below

Mobile:

- H1
- Main image
- Quick facts
- CTAs

---

## CHAPTER 2 — PRODUCT OVERVIEW

Use a split layout:

- Application image
- Overview text
- Key functional benefits

Do not make Overview and Key Benefits separate large sections with excessive whitespace.

---

## CHAPTER 3 — SPECIFICATIONS

Use a refined technical table.

Style:

- Pale-yellow table header
- Charcoal text
- White rows
- Soft borders
- No black header
- Sticky first column only when useful
- Mobile scroll affordance

---

## CHAPTER 4 — MATERIAL AND DIMENSIONS

Combine:

- Material properties
- Dimensions
- Colours
- Surface patterns
- Installation

Use:

- Two-column layout desktop
- Accordion or stacked sections mobile

Do not create two separate long full-width tables unless necessary.

---

## CHAPTER 5 — APPLICATIONS

Use:

- One installed-use image
- Five concise applications
- Pale-yellow supporting field

No oversized empty area.

---

## CHAPTER 6 — DOCUMENTS

Show only real documents.

- Datasheet
- Certificate
- Test report
- Installation guide

Hide unavailable items.

---

## CHAPTER 7 — RELATED PRODUCTS

Show three related products, not four tiny cards.

Use larger image-led cards.

Make each visually distinct.

---

## CHAPTER 8 — QUOTE CTA

Use warm-white or pale-yellow.

Do not use a black/dark section.

Heading:

**Request a quote for [Product Name]**

Actions:

- Request a Quote
- Call Sales

---

# 13. PRODUCT-SPECIFIC PAGE DIFFERENTIATION

Do not use exactly the same content composition for all products.

## Electrical Insulating Mats

Emphasise:

- Class A/B/C
- Working voltage
- Thickness
- Surface patterns
- Installed electrical environments

## Coloured Strip Mats

Emphasise:

- Boundary marking
- Strip configuration
- Hazard zoning
- Installed pathways

## Bi-Color Mats

Emphasise:

- Contrasting layer
- Wear visibility
- Colour combinations
- Layer diagram

## Auto-Glow / Reflective Band

Emphasise:

- Two variants
- Daylight and low-light comparison
- Glow versus reflection
- Installed emergency guidance

## BharatMembrane

Use a separate template:

1. Hero
2. Material and thickness
3. Applications
4. Properties
5. Installation/joining
6. Documents
7. Project enquiry

No electrical table.

---

# 14. FOOTER REDESIGN

Use warm-white or pale-yellow.

Desktop:

- Four columns
- Brand
- Navigation
- Products
- Contact

Bottom:

- Copyright
- Privacy
- Terms

No blue footer.

No large location list.

No tiny unreadable text.

Mobile:

- Clear stacked groups
- 16px minimum body text
- Sufficient spacing

---

# 15. MINIMAL MOTION

Use a consistent motion system.

## Reveal

- Opacity 0 → 1
- TranslateY 10–14px → 0
- 500–600ms
- Trigger once

## Hover

- Image scale 1.015
- Card translateY -2px
- Arrow translateX 4px
- Border becomes yellow

## Header

- Compact after scroll
- Smooth 250–350ms

## Logo rail

- Slow continuous CSS movement
- Pause on hover/focus
- Reduced-motion static grid

Do not use:

- Parallax
- Scroll-jacking
- Large staggers
- Animated counters
- 3D
- WebGL
- Autoplay sliders
- Heavy animation library

---

# 16. RESPONSIVE ART DIRECTION

Test all pages.

## Mobile

- 320×568
- 360×800
- 390×844
- 430×932

## Tablet

- 600×960
- 768×1024
- 820×1180
- 1024×1366
- 1180×820

## Desktop

- 1280×800
- 1440×900
- 1920×1080

Requirements:

- No broken images
- No horizontal overflow
- Header never collides
- Product dropdown works
- Mobile drawer works
- Tables remain readable
- Product gallery works with touch
- Form uses 16px inputs
- Hero image crop remains useful
- Certificate cards are one column on mobile
- Footer remains readable
- CTA buttons remain at least 44px high
- No giant empty spaces

---

# 17. SEO AND CONTENT SAFETY

Keep existing factual content unless clearly wrong.

Do not invent new claims.

Ensure:

- Unique metadata
- Correct company name
- Correct contact information
- Correct canonical paths
- Correct product names
- Breadcrumbs
- Sitemap
- Robots
- Legacy redirects
- Favicon
- Open Graph image
- Accurate structured data

Do not expose future proprietary asset names.

Use stable public asset paths.

---

# 18. SECURITY AND PERFORMANCE

Verify:

- No TypeScript build ignoring
- No lint ignoring
- React strict mode
- Server-side validation
- Rate limiting
- Honeypot
- Security headers
- Safe errors
- No private paths
- No missing image requests
- No unnecessary large client bundle

Performance:

- `next/image`
- Correct `sizes`
- Priority only for hero
- Lazy loading
- One font
- No preloaded PDFs
- Click-to-load YouTube
- Click-to-load map
- No duplicate giant images
- Server Components by default

---

# 19. CODE ORGANISATION

Recommended new structure:

```text
src/components/
├── home/
│   ├── HomeHero.tsx
│   ├── ProductRange.tsx
│   ├── TrustDocuments.tsx
│   ├── CapabilitySection.tsx
│   ├── IndustryApplications.tsx
│   └── HomeCTA.tsx
├── about/
│   ├── AboutIntro.tsx
│   ├── ProductOverview.tsx
│   ├── CompanyLeadership.tsx
│   ├── ManufacturingQuality.tsx
│   ├── CertificatesAwardsMedia.tsx
│   └── IndustriesClientsCTA.tsx
├── contact/
│   ├── ContactIntro.tsx
│   ├── ContactMethods.tsx
│   ├── EnquiryQuoteLayout.tsx
│   ├── SelectionGuidance.tsx
│   └── OfficeLocation.tsx
├── products/
│   ├── ProductHero.tsx
│   ├── ProductOverview.tsx
│   ├── ProductSpecifications.tsx
│   ├── ProductMaterialDimensions.tsx
│   ├── ProductApplications.tsx
│   ├── ProductDocuments.tsx
│   ├── RelatedProducts.tsx
│   └── ProductCTA.tsx
├── documents/
├── media/
├── layout/
└── ui/
```

Do not keep old component boundaries if they force the weak layout.

Delete unused old components only after confirming they are no longer referenced.

---

# 20. IMPLEMENTATION WORKFLOW

1. Pull latest repository
2. Run current project
3. Capture baseline screenshots
4. Create branch:

```text
client-ready-layout-rebuild
```

5. Fix broken image paths first
6. Build global visual primitives
7. Rebuild header and footer
8. Rebuild homepage
9. Rebuild About Us
10. Rebuild Contact Us
11. Rebuild reusable product layout
12. Create separate BharatMembrane layout
13. Test mobile and tablet
14. Run lint
15. Run type-check
16. Run production build
17. Capture final screenshots
18. Push branch
19. Open pull request
20. Update Vercel preview if access exists

---

# 21. COMMIT PLAN

Suggested commits:

```text
fix: remove broken media paths and add stable asset fallbacks
design: establish refined white and yellow visual system
feat: rebuild header footer and responsive navigation
feat: rebuild client-ready homepage layout
feat: recompose about us company credibility experience
feat: redesign contact and quotation journey
refactor: simplify and improve product page architecture
feat: create dedicated BharatMembrane page layout
fix: complete tablet mobile and accessibility polish
perf: optimise media loading and remove duplicate payload
seo: verify metadata structured data and redirects
docs: add asset slots and final visual QA report
```

---

# 22. FINAL ACCEPTANCE CRITERIA

The work is complete only when:

- No broken image appears anywhere
- Homepage looks complete without private assets
- Product cards contain visible media
- Manufacturing/capability visual is present
- About page leadership area looks intentional
- Certificate cards look professional
- Media participation section is visually integrated
- Contact form uses desktop width properly
- Product-selection guidance is integrated beside the form
- Product page no longer repeats the same giant image twice
- Product page is significantly shorter
- Technical tables use pale yellow, not black
- Related products are larger and fewer
- Final product CTA is not dark
- Footer matches the white-and-yellow theme
- Mobile and tablet feel separately designed
- All approved routes work
- Lint passes
- Type-check passes
- Build passes
- Vercel preview is ready to show the client

---

# 23. FINAL REPORT

Return:

## Layout transformation

- Homepage
- Header
- Footer
- About Us
- Contact Us
- Product pages
- BharatMembrane

## Broken media fixes

List every broken image path corrected.

## Asset slots

List the slots prepared for Claude’s future proprietary asset integration.

## Responsive QA

List viewports tested and issues fixed.

## Build

- Lint
- Type-check
- Production build

## Git

- Branch
- Commit hashes
- Pull request URL

## Deployment

- Preview URL
- Deployment status

Only report verified results.

---

# FINAL EXECUTION INSTRUCTION

Do not audit or integrate the private `bharatsafe` folder in this task.

Do not wait for Claude.

Use the current public repository assets and safe fallbacks to make the full layout client-presentable now.

Rebuild the visual hierarchy, page composition, responsive layouts and component finishing.

The site must look complete before the final proprietary assets are allocated.
