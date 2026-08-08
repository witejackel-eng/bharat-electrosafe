# Content Verification — Bharat Electrosafe

This document records every important public-facing claim made on the
redesigned website, the route it travelled to publication, the file it
lives in, the public wording used, the evidence source, the current
verification status, and whether client confirmation is still required.

It is the companion to `docs/CLIENT_CONTENT_CONFIRMATION.md`. Where the
client-confirmation document asks the questions, this document records
how each claim is currently worded on the public site and what evidence
supports it.

## Statuses

- **Document verified** — supported by a genuine current document in the
  repository (BIS licence, test report PDF, ISO certificate PDF, MSME
  registration, etc.).
- **Original-site sourced** — sourced from the original Bharat
  Electrosafe company website (`bharatelectrosafe.com`) when no
  stronger document is available.
- **Client confirmed** — confirmed in writing by the client.
- **Confirmation required** — kept on the site in conservative wording,
  but client confirmation is still required before any stronger claim
  can be made.
- **Removed** — deleted because no supporting evidence exists.

## Columns

| Column | Meaning |
|---|---|
| Claim | The public-facing statement, abbreviated for the table. |
| Route | Where the claim is published (file or component path). |
| Source file | The central data file the claim is rendered from. |
| Public wording | The exact wording shown on the website. |
| Evidence source | The document or original-site URL the wording is based on. |
| Verification status | One of the statuses above. |
| Client confirmation required | Yes / No. |
| Notes | Caveats, follow-ups, internal context. |

---

## 1. Company identity

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Brand name | Whole site | `src/data/company.ts` | "Bharat Electrosafe" | Original company website | Original-site sourced | No | Used as public brand name. |
| Legal entity name | Structured data only | `src/data/company.ts` | "Bharat Electrosafe" (not "Pvt. Ltd.") | No registration document in repo | Confirmation required | Yes | Spec section 4 forbids "Bharat Electrosafe Pvt. Ltd." until a registration document confirms the exact legal name. The PlastIndia 2026 plaque photographed on the original site is engraved "Bharatelectrosafe Pvt. Ltd." — kept only as a quoted plaque caption, not as the public legal-name claim. |
| Registered-office address | Footer, contact page, structured data | `src/data/company.ts` | "814, 8th Floor, I-thum, Tower A, Plot No. A-40, Sector 62, Noida 201309, Uttar Pradesh, India" | Original company website | Original-site sourced | Yes | Spec section 28 lists the address; the layout in the public wording matches the spec. |
| Manufacturing-facility location | Not stated publicly | N/A | Not stated | N/A | Confirmation required | Yes | Spec section 4 forbids stating the manufacturing facility is in Noida unless directly confirmed. |
| Office hours | Not rendered (OfficeHours component returns null) | `src/data/company.ts` (`verified: false`) | Not displayed | Original company website | Confirmation required | Yes | `company.officeHours.verified` is `false`. No `openingHoursSpecification` is emitted in structured data. |
| Phone numbers | Footer, contact page | `src/data/company.ts` | "+91 7617494968" and "+91 9667171444" | Original company website | Original-site sourced | Yes | Confirm before launch. |
| Email | Footer, contact page | `src/data/company.ts` | "info@bharatelectrosafe.com" | Original company website | Original-site sourced | Yes | Confirm before launch. |

## 2. Standards and licences

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| IS 15652:2006 | Homepage hero, insulating-mat product pages, structured data, footer | `src/data/trust.ts`, `src/data/products.ts` | "IS 15652:2006" (colon format, no other variants) | BIS licence CM/L:8800129617 printed on source product pages | Document verified | No | Spec section 5 mandates the colon format. |
| BIS Licence CM/L:8800129617 | Homepage hero, insulating-mat product pages, structured data, footer | `src/data/trust.ts`, `src/data/company.ts` | "BIS Licence CM/L:8800129617" | BIS licence number printed on source product pages | Document verified | No | |
| ERDA / NTH tested | Homepage hero, insulating-mat product pages | `src/data/trust.ts` | "ERDA / NTH tested" | ERDA test report PDF in `/public/documents/certifications/erda-test-report-2-5mm.pdf`; NTH referenced on source site | Document verified | No | Never "ERDA approved" — no approval document. |
| IEC 61111 | Homepage hero proof badge | `src/components/home/HomeHero.tsx` | "IEC 61111 information available on request" | Source product page mentions IEC 61111 | Original-site sourced | Yes | Never "Conforming to IEC 61111" — no certification document. Spec section 6 mandates the conservative wording. |
| IS 15909:2020 (BharatMembrane) | BharatMembrane product page, structured data | `src/data/products.ts`, `src/data/trust.ts` | "IS 15909:2020" / "Referenced standard: IS 15909:2020" | Original company website | Original-site sourced | Yes | No BIS approval document for the geo-membrane. Spec section 18 mandates "referenced" wording. |
| IS 15058:2002 (Bharat Hydro Seal) | Bharat Hydro Seal product page, structured data | `src/data/products.ts` | "IS 15058:2002" / "Referenced standard: IS 15058:2002" | Original company website | Original-site sourced | Yes | No BIS approval document for the water-stop range. Spec section 19 mandates "referenced" wording. |
| CPRI | Not used anywhere | N/A | Not displayed | N/A | Removed | No | No CPRI document exists in the repository. |

## 3. ISO management-system certificates

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| ISO 9001:2015 | About page trust rail, product document cards | `src/data/trust.ts`, `src/data/products.ts` | "ISO 9001:2015 — Quality Management System" | PDF: `/documents/certifications/iso-9001-2015-qms.pdf` | Document verified | Yes | Confirm certificate holder name matches the legal entity. Never imply ISO 9001 proves product electrical performance (spec section 8). |
| ISO 14001:2015 | About page trust rail | `src/data/trust.ts` | "ISO 14001:2015 — Environmental Management System" | PDF: `/documents/certifications/iso-14001-2015-ems.pdf` | Document verified | Yes | Confirm certificate holder name. |
| ISO 45001:2018 | About page trust rail | `src/data/trust.ts` | "ISO 45001:2018 — Occupational Health and Safety Management System" | PDF: `/documents/certifications/iso-45001-2018-ohsms.pdf` | Document verified | Yes | Confirm certificate holder name. |

## 4. Registrations and memberships

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| MSME registration | About page trust rail | `src/data/trust.ts` | "MSME registration" | Original company website | Original-site sourced | Yes | |
| Startup India recognition | About page trust rail | `src/data/trust.ts` | "Startup India recognition" | PDF: `/documents/certifications/startup-india-recognition.pdf` | Document verified | No | |
| AIRIA membership | About page trust rail | `src/data/trust.ts` | "AIRIA membership" | Original company website | Original-site sourced | Yes | |
| CE mark | About page trust rail, insulating-mat product document cards | `src/data/trust.ts`, `src/data/products.ts` | "CE mark" | PDF: `/documents/certifications/ce-marking-certificate.pdf` | Document verified | Yes | Confirm CE-document scope. |

## 5. Company statistics

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| 11+ countries served | Homepage stats | `src/data/trust.ts` (`scaleFacts`) | "11+ Countries served*" with footnote "*Figures stated by the company." | Original company website | Original-site sourced | Yes | Footnote qualifier always rendered alongside the stat. |
| 1,000+ customers | Homepage stats | `src/data/trust.ts` (`scaleFacts`) | "1,000+ Customers*" with footnote "*Figures stated by the company." | Original company website | Original-site sourced | Yes | Footnote qualifier always rendered alongside the stat. |
| 6 product families | Homepage stats | `src/data/trust.ts` (`scaleFacts`) | "6 Product families" | Derived from `productFamilyCount` in `src/data/products.ts` | Document verified | No | No qualifier needed. |
| Years in business | Not stated | N/A | Not displayed | N/A | Removed | Yes | Spec section 11 forbids inventing this figure. |
| Factory capacity | Not stated | N/A | Not displayed | N/A | Removed | Yes | Spec section 11 forbids inventing this figure. |
| Turnover / employees / export percentage / market share | Not stated | N/A | Not displayed | N/A | Removed | Yes | Spec section 11 forbids inventing these. |

## 6. Industry references

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Organisation logos | Homepage reference rail, About page | `src/data/trust.ts` (`organisationReferences`) | "Organisations represented on the original company website" + supporting copy explaining the nature and current status of each relationship should be confirmed directly with the company | Original company website | Original-site sourced | Yes | Spec section 10 forbids "Trusted by", "Our clients", "Customers", "Partners", "Projects delivered", "Chosen by industry leaders". |
| Tata Precision relationship | Not rendered publicly | `src/data/trust.ts` (`manufacturingCollaboration`) | Internal-only conservative wording | Original company website | Confirmation required | Yes | Spec section 26 mandates no strengthening of the relationship and no public display of the qualification until client approval. |

## 7. Leadership biographies

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Vishnu Gupta — Co-Founder & Director | About page leadership grid | `src/data/team.ts` | Short biography: "Chartered Accountant and co-founder of Bharat Electrosafe. His professional background spans finance, manufacturing and infrastructure businesses…" | Original company website | Original-site sourced | Yes | Years of experience (18+), ICAI qualification year, prior employers (Universal Cables, GHCL, Cavendish Industries), Samridhi Test House affiliation, ISO/IEC 17025 and BIS recognition — all moved to `docs/CLIENT_CONTENT_CONFIRMATION.md` and not asserted publicly until client approval. |
| Krishan Kumar Khandelwal — Co-Founder & Director | About page leadership grid | `src/data/team.ts` | Short biography: "Co-founder and director of Bharat Electrosafe. He supports production coordination, vendor development, partner engagement and after-sales execution." | Original company website | Original-site sourced | Yes | 25+ years experience, family-business history (70+ years in tobacco/supari), real-estate project history — moved to confirmation document. |
| Priyanka Garg — Co-Founder & Director | About page leadership grid | `src/data/team.ts` | Short biography: "Co-founder and director of Bharat Electrosafe with experience in rubber, polymer and industrial-product businesses…" | Original company website | Original-site sourced | Yes | 20+ years experience, M.Com institution, business certification institution, presence in 11+ countries — moved to confirmation document. |

## 8. Awards

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Emerging Business in India | About page awards | `src/data/trust.ts` (`awards`) | "Emerging Business in India — Recognition presented at the Make in India Conclave. Verify the exact award title, organiser, recipient and date against the event photograph before publication." | Event photograph | Document verified | Yes | Verify exact title, organiser, recipient, date. Never use "prestigious". |
| Young Entrepreneur with Emerging Start-Up | About page awards | `src/data/trust.ts` (`awards`) | "Recognition presented through Times Power Icons. Verify the exact title, recipient and year against the available source." | Event photograph | Document verified | Yes | Verify exact title, recipient, year. |
| Exhibitor Appreciation — PlastIndia 2026 | About page awards | `src/data/trust.ts` (`awards`) | "Participation or exhibitor recognition associated with PlastIndia 2026. Do not describe it as a competitive industry award." | Plaque photograph | Document verified | Yes | Not described as a competitive award. The plaque's engraved recipient ("Bharatelectrosafe Pvt. Ltd.") is quoted as the plaque caption only — it is not used as the public legal-name claim. |

## 9. Civil-product correctness (BharatMembrane and Bharat Hydro Seal)

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Civil products do not carry IS 15652:2006 | BharatMembrane + Bharat Hydro Seal product pages, structured data, FAQ | `src/data/products.ts`, `src/data/faqs.ts`, `src/lib/structured-data.ts` | No IS 15652:2006 mention on civil product pages; no BIS insulating-mat licence; no ERDA/NTH insulating-mat testing | Spec section 20 | Document verified | No | Guarded by regression tests in `tests/a11y/product-assurance.spec.ts`. |
| No "leak-proof", "guaranteed waterproof", "complete protection", "long-lasting performance" | All civil-product copy | `src/data/products.ts` | None of these phrases appear | Spec sections 18, 19 | Document verified | No | Guarded by `tests/a11y/banned-phrases.spec.ts`. |
| Bharat Hydro Seal described as water-stop, not electrical insulation | Bharat Hydro Seal product page | `src/data/products.ts` | "PVC and rubber water-stop profiles for construction and expansion joints in concrete structures." | Spec section 19 | Document verified | No | |

## 10. Contact details

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Phone (primary) | Footer, contact page | `src/data/company.ts` | "+91 7617494968" | Original company website | Original-site sourced | Yes | Confirm before launch. |
| Phone (secondary) | Footer, contact page | `src/data/company.ts` | "+91 9667171444" | Original company website | Original-site sourced | Yes | Confirm before launch. |
| Email | Footer, contact page | `src/data/company.ts` | "info@bharatelectrosafe.com" | Original company website | Original-site sourced | Yes | Confirm before launch. |
| Address | Footer, contact page, structured data | `src/data/company.ts` | "814, 8th Floor, I-thum, Tower A, Plot No. A-40, Sector 62, Noida 201309, Uttar Pradesh, India" | Original company website | Original-site sourced | Yes | Confirm before launch. |
| Response time SLA | Not stated | N/A | Not displayed | N/A | Removed | Yes | Spec section 28 forbids promising a response time unless operationally confirmed. |

## 11. Auto-glow / reflective band performance

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Auto-glow band | Auto-glow product page | `src/data/products.ts` | "Auto-glow band for low-light visibility" | Spec section 17 | Original-site sourced | Yes | No glow duration stated unless a test document provides it. No claim of emergency lighting. No claim of indefinite brightness. |

## 12. Structured data (JSON-LD)

| Claim | Route | Source file | Public wording | Evidence source | Verification status | Client confirmation required | Notes |
|---|---|---|---|---|---|---|---|
| Organisation schema | All pages (root layout) | `src/lib/structured-data.ts` | Name, legal name (as brand), url, email, telephone, description, logo, address | `src/data/company.ts` | Document verified | Yes | No fake sameAs, foundingDate, numberOfEmployees, or unverified claims. |
| LocalBusiness schema | All pages (root layout) | `src/lib/structured-data.ts` | Name, url, telephone, email, logo, address | `src/data/company.ts` | Document verified | Yes | No `openingHoursSpecification` until `company.officeHours.verified === true`. |
| Product schema | Each product page | `src/lib/structured-data.ts` | Product name, description, url, brand, manufacturer, category, image, additionalProperty | `src/data/products.ts` | Document verified | No | No aggregateRating, review, SKU, GTIN, MPN, price, offer, or stock. Civil products do not inherit insulating-mat standards. |
| FAQ schema | Homepage + each product page | `src/lib/structured-data.ts` | FAQPage with Question/Answer pairs sourced from `src/data/faqs.ts` | `src/data/faqs.ts` | Document verified | No | Schema and visible content consume the same `homeFaqs` / `productFaqsBySlug` arrays — they cannot drift apart. |
