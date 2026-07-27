# Content Source Map

Where each significant claim lives in code, where it came from, and its
verification state.

**Sources**
- **PUB** — the client's own published website (the site this project replaces)
- **DOC** — a certificate, test report or catalogue supplied by the client
- **NONE** — no source found; the claim was invented

---

## Product data

| Claim | Code location | Source | State | Action taken |
|---|---|---|---|---|
| IS 15652:2006 + BIS licence `CM/L: 8800129617` | `src/data/quality.ts`, product pages | PUB | ✅ Verified | Retained; replaced a fake licence number |
| BES1001 / A / 2.0 mm / 3.3 / 10 / 30 kV | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| BES1002 / B / 2.5 mm / 11 / 22 / 45 kV | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| BES1003 / C / 3.0 mm / 33 / 36 / 65 kV | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Suffixed codes `-CS`, `-BC`, `-AG`, `-RB`, `-AGR` | `src/data/products.ts` | NONE | ❌ Invented | **Removed** |
| Material: elastomer free from insertion; PVC + synthetic rubber | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Tensile 15 N/mm², elongation 250%, leakage 10 mA | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Insulation resistance 100,000 MΩ at 500 V | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Flame retardance ≤ 5 s | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Working temp −10 °C to 55 °C | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Anti-skid: coin, dot, hexa | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| 1 m × 10/20 m; black & blue | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| IEC 61111 | `src/data/products.ts` | PUB + DOC | ✅ Verified | Retained |

## BharatMembrane

| Claim | Code location | Source | State | Action taken |
|---|---|---|---|---|
| **HDPE** geomembrane | `src/data/products.ts`, `MembranePageLayout.tsx`, `layout.tsx`, `about-us`, `company.ts` | NONE | ❌ **Wrong material** | **Corrected to PVC everywhere** |
| Density ≥ 0.940 g/cm³ | `src/data/products.ts` | NONE | ❌ Invented (HDPE-specific) | **Removed** |
| Carbon black 2–3% | `src/data/products.ts` | NONE | ❌ Invented (HDPE-specific) | **Removed** |
| PVC geo-membrane, IS 15909:2020, BIS approved | `src/data/products.ts` | PUB | ✅ Verified | Added |
| Thicknesses 1–5 mm | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Thermal welding for seams | `src/data/products.ts` | PUB | ✅ Verified | Retained |
| Applications (tunnel, landfill, reservoir, canal, mining, effluent, aquaculture) | `src/data/products.ts` | PUB | ✅ Verified | Aligned to published list |
| Per-thickness application labels | `src/data/products.ts` | NONE | ❌ Invented | **Neutralised** |
| Anchor trench, 100 mm overlap, peel/shear testing | `src/data/products.ts` | NONE | ❌ Invented | **Removed** |

## Customers and trust

| Claim | Code location | Source | State | Action taken |
|---|---|---|---|---|
| 15 named organisations as clients | `src/data/clients.ts` | NONE | ❌ Invented | **Removed; list emptied** |
| "Trusted by leading institutions" rail | `StandardsTrust.tsx`, `about-us` | NONE | ❌ Invented | **Replaced with accreditation bodies** |
| "Trusted by Indian Railways, NTPC, PGCIL, BHEL" | `layout.tsx` metadata | NONE | ❌ Invented | **Removed** |
| `Lic. No. BIS-15652-IND` | `src/data/quality.ts` | NONE | ❌ Invented | **Replaced with real CM/L** |
| `Report No. CPRI-2024-118` | `src/data/quality.ts` | NONE | ❌ Invented | **Removed** |
| ISO issuer "TÜV / BSI" | `src/data/quality.ts` | NONE | ❌ Wrong body | **Generalised** |
| File sizes for non-existent PDFs | `src/data/quality.ts` | NONE | ❌ Invented | **Removed** |
| ISO 9001 / 14001 / 45001 held | `src/data/quality.ts` | DOC | ⚠️ Held, currency unconfirmed | Kept, no expiry asserted |

## Company

| Claim | Code location | Source | State | Action taken |
|---|---|---|---|---|
| Phone, email, Noida address | `src/data/company.ts` | PUB | ✅ Verified | Retained |
| Five-stage company timeline | `about-us/page.tsx` | NONE | ❌ Invented | **Replaced with published capability statements** |
| "Supplied to Indian Railways, NTPC…" | `about-us/page.tsx` | NONE | ❌ Invented | **Removed** |
| "across India and South Asia" | `about-us`, `company.ts` | NONE | ❌ Unverified | **Reduced to India** |
| "Antistatic surface prevents static build-up" | `about-us/page.tsx` | NONE | ❌ Invented | **Removed** |
| Integrated compound-to-mat setup; in-house HV testing lab | `about-us/page.tsx` | PUB | ✅ Verified | Added from published source |
| Sectors served | `src/data/company.ts` | PUB | ✅ Verified | Added |
| Tata Precision Industries relationship | `about-us/page.tsx` | PUB | ⚠️ Published by client | Reproduced; confirm wording |
| "Responds within 1–2 business days" | `contact-us`, `ContactForm.tsx` | NONE | ❌ Unapproved | **Removed** |

## Assets

| Claim | Code location | Source | State | Action taken |
|---|---|---|---|---|
| 21 gallery images under `/images/products/…` | `src/data/products.ts` | NONE | ❌ Files absent | **Repointed to existing images + slot IDs** |
| 8 PDFs under `/downloads/` | `src/data/products.ts`, `quality.ts` | NONE | ❌ Files absent | **Removed; sections hide when empty** |
| `/images/clients/placeholder.svg` | `src/data/clients.ts` | NONE | ❌ File absent | **Removed** |

---

## Summary

| State | Count |
|---|---|
| ✅ Verified and retained | 22 |
| ❌ Invented / wrong — corrected | 21 |
| ⚠️ Plausible but needs client confirmation | 3 |

Open items are tracked in `CONTENT_VERIFICATION.md` §3.
