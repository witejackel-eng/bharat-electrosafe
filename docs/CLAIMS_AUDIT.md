# Claims Audit — Bharat Electrosafe

This audit classifies every marketing, operational, and certification claim
found in the repository as one of:

- **Verified** — supported by a genuine current document in the repository
- **Company-stated** — sourced from the company's own website, not independently verified
- **Qualified** — reworded to match the available evidence
- **Removed** — deleted because no supporting evidence exists

Client confirmation is still required for any item marked "Client confirmation required".

---

## 1. Electrical insulating mat claims

| Original claim | File / component | Verification source | Status | Final wording | Client confirmation required |
|---|---|---|---|---|---|
| IS 15652:2006 compliance | `src/data/products.ts`, `src/data/trust.ts`, FAQs | BIS Licence CM/L:8800129617 (printed on source product pages) | Verified | Retained as "manufactured to IS 15652:2006 under BIS Licence CM/L:8800129617" | No |
| BIS certified / BIS certified | Homepage FAQ, product FAQs (old) | No BIS *certification* document — only a BIS *licence* | Qualified | Changed to "manufactured to IS 15652:2006 under BIS Licence CM/L:8800129617" | No |
| Tested by CPRI and ERDA | Homepage FAQ (old `page.tsx`), `HomeFAQ.tsx` | No CPRI document in repository; ERDA test report exists | Removed | CPRI removed from all FAQ content; ERDA/NTH retained | No |
| CPRI/ERDA verified | `ManufacturingQuality.tsx` | No CPRI document | Qualified | Changed to "ERDA/NTH tested" | No |
| CPRI (client logo) | `IndustriesClientsCTA.tsx` | No CPRI document | Removed | Replaced with NTH (already in trust.ts) | No |
| ERDA / NTH tested | `src/data/trust.ts` | ERDA test report PDF exists (`/documents/certifications/erda-test-report-2-5mm.pdf`); NTH referenced on source site | Verified / Company-stated | Retained as "ERDA / NTH tested" | No |
| IEC 61111 | `src/data/trust.ts`, `src/data/company.ts` | Source site references IEC 61111 | Company-stated | Retained as "IEC 61111 referenced product range" | No |

---

## 2. Civil product claims (BharatMembrane & Bharat Hydro Seal)

| Original claim | File / component | Verification source | Status | Final wording | Client confirmation required |
|---|---|---|---|---|---|
| "trusted brand" (Hydro Seal intro) | `src/data/products.ts` | No evidence | Removed | Replaced with factual product description | No |
| "high-performance water stop sealing" (Hydro Seal intro) | `src/data/products.ts` | No evidence | Removed | Replaced with "PVC water-stop product intended for construction and expansion joints" | No |
| "complete protection against water leakage" (Hydro Seal intro) | `src/data/products.ts` | No evidence | Removed | Replaced with "designed to reduce water passage through properly designed and installed joints" | No |
| "manufactured under strict quality controls" (Hydro Seal overview) | `src/data/products.ts` | No evidence | Removed | Replaced with "made from PVC and rubber compounds" | No |
| "long service life in demanding environments" (Hydro Seal key benefit) | `src/data/products.ts` | No evidence | Removed | Replaced with "Weldable at intersections to form a continuous system" | No |
| "Long-lasting performance in demanding environments" (Hydro Seal spec table) | `src/data/products.ts` | No evidence | Qualified | Changed to "Service life depends on product selection, installation quality, operating conditions, exposure and maintenance" | No |
| "Superior water-tight sealing" (Hydro Seal material properties) | `src/data/products.ts` | No evidence | Qualified | Changed to "Reduces water passage through properly designed and installed joints" | No |
| "Produced under ISO-certified processes" (Hydro Seal & Membrane material properties) | `src/data/products.ts` | ISO 9001 certificate exists but scope does not prove per-product claim | Qualified | Changed to "Manufactured at Bharat Electrosafe facilities" | No |
| "BIS approved" (Membrane badge) | `src/data/products.ts` | No BIS approval document for IS 15909:2020 | Removed | Changed to "Custom fabrication" | No |
| "BIS approved to IS 15909:2020" (Membrane key benefit) | `src/data/products.ts` | No BIS approval document | Qualified | Changed to "Presented for applications covered by IS 15909:2020" | No |
| "IS 15909:2020 — BIS approved" (Membrane spec table) | `src/data/products.ts` | No BIS approval document | Qualified | Changed to "IS 15909:2020" | No |
| "BS, EN and international standards" (Membrane spec/material) | `src/data/products.ts` | No evidence | Removed | Removed from spec table and material properties | No |
| "long-lasting, leak-proof performance" (Membrane intro) | `src/data/products.ts` | No evidence | Qualified | Changed to "Request the current product documentation for the exact membrane grade" | No |
| "leak-proof joint" (Membrane & Hydro Seal installation steps) | `src/data/products.ts` | No evidence | Qualified | Changed to "continuous joint" / "continuous seal" | No |
| "BIS approval — IS 15909:2020" document card (Membrane) | `src/data/products.ts` | No BIS approval document | Qualified | Changed to "Standards information — IS 15909:2020 product information — available on request" with issuer "Bharat Electrosafe" | No |
| "IS 15058-2002 compliance — Water stop" document card (Hydro Seal, type "Approval", issuer "Bureau of Indian Standards") | `src/data/products.ts` | No BIS approval document | Qualified | Changed to "Standards information — IS 15058:2002 product information — available on request" with issuer "Bharat Electrosafe" | No |
| IS 15652:2006 / BIS mat licence / ERDA-NTH contamination on civil product FAQs | Old `ProductFAQ.tsx` generic answer | N/A — was a bug | Removed | Civil products now have their own product-specific FAQs in `src/data/faqs.ts` | No |

---

## 3. Operational and commercial claims

| Original claim | File / component | Verification source | Status | Final wording | Client confirmation required |
|---|---|---|---|---|---|
| "Full documentation provided" | `ProductHero.tsx`, `ProductTrustIndicators.tsx` | Not verified that every document ships with every order | Qualified | Changed to "Technical documentation available on request" | No |
| "Pan-India delivery" | `ProductHero.tsx`, `ProductTrustIndicators.tsx` | Not verified by client | Qualified | Changed to "Delivery confirmed with each quotation" | **Yes — if client can verify Pan-India coverage, restore the original wording** |
| "Normally respond within one business day" | `ContactIntro.tsx`, `EnquiryQuoteLayout.tsx` | Not verified | Removed | Changed to "Our team will review your enquiry and respond with the next steps" | **Yes — if client confirms a specific response SLA, it can be reinstated** |
| "Respond within 24 business hours" | `EnquiryQuoteLayout.tsx` (×3), `OfficeLocation.tsx` | Not verified | Removed | Changed to "Our team will review your enquiry and respond with the next steps" | **Yes — if client confirms a specific response SLA** |
| "Respond within 24 hours" | `ProductsClient.tsx` | Not verified | Removed | Changed to "our team will respond with the next steps" | **Yes — if client confirms a specific response SLA** |
| "11+ Countries Served" (homepage stats) | `StatsSection.tsx` | Company-stated on source site, not independently verified | Removed | Replaced with "CM/L:8800129617 — BIS Licence Number" (verified) | **Yes — if client can provide export documentation, the countries-served stat can be reinstated** |
| "11+ Countries served" (about page scaleFacts) | `src/data/trust.ts` | Company-stated | Qualified | Label changed to "Countries served (company-stated)" | No |
| "in India and overseas" (company description) | `src/data/company.ts` | Not independently verified | Removed | Removed "in India and overseas" from description | No |
| Office hours: Mon–Fri 9–6, Sat 9–1, Sun closed | `OfficeHours.tsx` (hardcoded) | Shown on original company website, not independently confirmed as current | Qualified | Moved to `company.officeHours` with `verified: false`; `OfficeHours` component returns `null` until verified; no `openingHoursSpecification` emitted in structured data | **Yes — client must confirm current operating schedule before `verified` can be set to `true`** |

---

## 4. ISO claims

| Original claim | File / component | Verification source | Status | Final wording | Client confirmation required |
|---|---|---|---|---|---|
| ISO 9001:2015 certificate | `src/data/trust.ts`, product document cards | PDF exists: `/documents/certifications/iso-9001-2015-qms.pdf` | Verified | Retained as "ISO 9001:2015 — Quality Management System" | No |
| ISO 14001:2015 certificate | `src/data/trust.ts`, product document cards | PDF exists: `/documents/certifications/iso-14001-2015-ems.pdf` | Verified | Retained as "ISO 14001:2015 — Environmental Management System" | No |
| ISO 45001:2018 certificate | `src/data/trust.ts` | PDF exists: `/documents/certifications/iso-45001-2018-ohsms.pdf` | Verified | Retained as "ISO 45001:2018 — Occupational Health and Safety Management System" | No |
| "Produced under ISO-certified processes" (per product) | `src/data/products.ts` (Membrane + Hydro Seal) | ISO 9001 certificate exists but scope does not automatically prove per-product claim | Qualified | Changed to "Manufactured at Bharat Electrosafe facilities" | **Yes — if client confirms the ISO 9001 scope covers the specific product line, the stronger wording can be reinstated** |
| "ISO-certified" (about page description) | `src/app/about-us/page.tsx` metadata | ISO certificates exist at company level | Verified | Retained as "ISO 9001, ISO 14001 and ISO 45001 certified" | No |

---

## 5. Document card audit

| Product | Document name | Original type / issuer | Final type / issuer | Status |
|---|---|---|---|---|
| BharatMembrane | ISO 9001:2015 — QMS | Certificate / Certification body | Certificate / Certification body | Verified (PDF exists) |
| BharatMembrane | ISO 14001:2015 — EMS | Certificate / Certification body | Certificate / Certification body | Verified (PDF exists) |
| BharatMembrane | ~~BIS approval — IS 15909:2020~~ | ~~Approval / Bureau of Indian Standards~~ | Standards information / Bharat Electrosafe | Qualified (no BIS approval document) |
| BharatMembrane | Product datasheet | Datasheet / Bharat Electrosafe | Datasheet / Bharat Electrosafe | Retained (available on request) |
| Bharat Hydro Seal | ISO 9001:2015 — QMS | Certificate / Certification body | Certificate / Certification body | Verified (PDF exists) |
| Bharat Hydro Seal | ~~IS 15058-2002 compliance — Water stop~~ | ~~Approval / Bureau of Indian Standards~~ | Standards information / Bharat Electrosafe | Qualified (no BIS approval document) |
| Bharat Hydro Seal | Product datasheet | Datasheet / Bharat Electrosafe | Datasheet / Bharat Electrosafe | Retained (available on request) |

---

## 6. Items requiring direct client confirmation

1. **Office hours** — Set `company.officeHours.verified = true` only after the client confirms the current operating schedule in writing.
2. **Pan-India delivery** — If the client can verify Pan-India coverage, restore "Pan-India delivery" in `ProductHero.tsx` and `ProductTrustIndicators.tsx`.
3. **Response-time SLA** — If the client confirms a specific response SLA (e.g. "within one business day"), reinstate the specific promise in contact and products pages.
4. **Countries served** — If the client can provide export documentation or a verified list of countries, reinstate the "11+ Countries Served" stat on the homepage.
5. **ISO scope per product** — If the client confirms the ISO 9001 scope explicitly covers the membrane and water-stop product lines, reinstate "Produced under ISO-certified processes" for those products.
6. **CPRI testing** — If the client can provide a genuine CPRI test report for the relevant products, CPRI can be reinstated in the FAQ and client-logo content.
