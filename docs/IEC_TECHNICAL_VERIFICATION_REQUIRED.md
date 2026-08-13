# IEC 61111 Technical Verification Required

> **Status:** PENDING CLIENT / TECHNICAL VERIFICATION
> **Created:** During final trust/FAQ/footer/contact production pass
> **Source document:** *Global IEC-61111 (Bharat Electrosafe).pdf* (client-supplied brochure)

---

## Purpose

This document records technical discrepancies between the current production
website and a client-supplied IEC 61111 brochure, plus commercial/operational
claims from the brochure that must **not** be published on the website until
independently confirmed.

**No technical figures were changed from memory or inferred from the standard.
All conflicting values are left unchanged on the production site pending
authoritative resolution.**

---

## 1. IEC 61111:2009 Classification Table — Voltage Discrepancy

### Current production website values
(src/app/products/international-iec-61111/IECClient.tsx — `iecClasses` array)

| Class  | Maximum Working Voltage | Proof Test Voltage | Thickness |
| ------ | ----------------------- | ------------------ | --------- |
| Class 0 | 500 V   | 5 kV  | 2 mm |
| Class 1 | 1 000 V | 10 kV | 2 mm |
| Class 2 | 7 000 V | 20 kV | 2 mm |
| Class 3 | 17 000 V| 30 kV | 2 mm |
| Class 4 | 36 000 V| 40 kV | 2 mm |

### Brochure values (PDF page 8)

| Class  | Maximum Working Voltage (AC) | Recommended Thickness |
| ------ | ---------------------------- | --------------------- |
| Class 0 | 1 000 V    | 2.0 mm |
| Class 1 | 7 500 V    | 2.0 mm |
| Class 2 | 17 000 V   | 3.0 mm |
| Class 3 | 26 500 V   | 4.0 mm |
| Class 4 | 36 000 V   | 5.0 mm |

### Discrepancy

- **Class 0 voltage:** Website 500 V vs brochure 1 000 V
- **Class 1 voltage:** Website 1 000 V vs brochure 7 500 V
- **Class 2 voltage:** Website 7 000 V vs brochure 17 000 V
- **Class 3 voltage:** Website 17 000 V vs brochure 26 500 V
- **Class 4 voltage:** Website 36 000 V vs brochure 36 000 V (matches)
- **Thickness:** Website shows 2 mm for all classes; brochure recommends
  2.0 / 2.0 / 3.0 / 4.0 / 5.0 mm by class.

### Additional note

The brochure's own technical material contains internal inconsistencies
between different pages. This makes it impossible to treat the brochure as
a self-consistent authoritative source.

### Action required

1. Client/technical team to confirm which voltage-class table is correct
   against the official IEC 61111:2009 standard text.
2. Client/technical team to confirm the correct thickness-per-class
   recommendation.
3. Once resolved, update `iecClasses` in `IECClient.tsx` and the supporting
   copy ("All five classes share a minimum mat thickness of 2 mm") in a
   separate dedicated commit.

**Until resolved: the current production figures remain unchanged.**

---

## 2. Commercial / Operational Claims Requiring Confirmation

The brochure advertises the following claims. These are **NOT** published on
the website unless they are already independently approved elsewhere in the
current repository or client content.

| Claim | Source | Status |
| ----- | ------ | ------ |
| Test Certificate With Every Supply | Brochure | NOT published — requires confirmation |
| 1 Year Warranty | Brochure | NOT published — requires confirmation |
| Largest Ready Stock Near You | Brochure | NOT published — requires confirmation |
| Customization on Bulk Orders | Brochure | NOT published — requires confirmation |

### Action required

Each claim must be confirmed by the client before it can be promoted on the
website. Do not add these claims to product pages, the homepage, or any
marketing surface until written confirmation is obtained.

---

## 3. Brochure Contact Details — Do NOT Use

The brochure contains an older phone number. The current centralized contact
details in `src/data/company.ts` remain authoritative:

- Email: info@bharatelectrosafe.com
- Phone: +91 76174 94968 / +91 96671 71444 / +91 98703 94721
- Address: 814, 8th Floor, I-thum, Tower A, Plot No. A-40, Sector-62, Noida — 201309

**The brochure's older phone number was NOT added to the site.**

---

## 4. Brochure Content Already Incorporated (Safe, Non-Conflicting)

The following factual, non-controversial guidance from the brochure was
integrated into the IEC product page
(`/products/international-iec-61111/IECClient.tsx`):

- **Applications grid** — substations, power plants, HV rooms, switchgear
  rooms, control panels, data centers, battery rooms, transformer stations,
  electrical laboratories, railway electrification systems.
- **Material / resistance considerations** — conservative wording referencing
  flame, mild acid/alkali, oil/water and moisture (presented as "resistance
  considerations", not performance guarantees).
- **Use & Safety** — regular visual inspection, remove damaged mats, correct
  voltage-class selection, complete work-area coverage, avoid overlapping,
  keep surface clean, avoid sharp objects, use appropriate PPE, follow
  manufacturer instructions, personnel training.
- **Installation** — clean area, place mats in required work locations,
  ensure complete coverage, mats rely on weight/surface friction.
- **IEC FAQ** — what IEC 61111 covers, mat classes, thickness and class,
  IEC 61111 vs ASTM D178, certified vs non-certified mats.

None of this content depends on the conflicting voltage/thickness figures.
