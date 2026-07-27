# Content Verification

How every factual claim on this site is sourced, and what is still unverified.

**Sources of truth**
1. The client's own published website (the live site this project replaces).
2. Certificates, test reports and catalogues supplied by the client.
3. The client directly — for anything not covered by 1 or 2.

**Rule:** if a claim cannot be traced to one of those three, it does not ship.
"It sounds plausible for this industry" is not a source.

---

## 1. Corrections applied

These were live in the repository and have been fixed.

### 1.1 BharatMembrane was described as HDPE — it is PVC
| | |
|---|---|
| **Was** | "high-density polyethylene (HDPE) geomembrane", density ≥ 0.940 g/cm³, carbon black 2–3% |
| **Is** | **PVC geo-membrane**, BIS approved to **IS 15909:2020** |
| **Source** | Client's published membrane page and product documentation |
| **Severity** | High — wrong polymer family on a civil-engineering containment product |

The density and carbon-black figures were HDPE-specific and had no source. They
are removed, not reworded. Remaining properties are limited to what the client
publishes. Numeric values (tensile, puncture, tear) are **not** stated because
no datasheet confirms them.

### 1.2 Invented product codes
Variant pages used `BES1001-CS`, `-BC`, `-AG`, `-RB`, `-AGR`. The client uses
**BES1001 / BES1002 / BES1003** across all mat variants, with no suffixes.
All suffixes removed.

### 1.3 Fabricated customer list
Fifteen organisations (a national railway operator, several state power
utilities, and large private industrial groups) were hard-coded as clients and
rendered on the homepage under "Trusted by leading institutions", plus a second
rail on the About page.

**None were verified.** Naming an organisation as a customer without evidence
and permission is both a factual and a legal risk. The list is now empty, and
the homepage rail shows **accreditation and certification bodies** instead —
which the client can actually evidence.

### 1.4 Fabricated document references
| Was | Problem |
|---|---|
| `Lic. No. BIS-15652-IND` | Not a real licence number |
| `Report No. CPRI-2024-118` | Not a real report number |
| Issuer "TÜV / BSI" | Not the actual certifying body |
| `Reg. No. TUV-9001-IND` | Not a real registration |
| File sizes "2.4 MB", "1.8 MB" | Describing files that do not exist |

Replaced with the **real, already-public** BIS licence reference
**CM/L: 8800129617**, and "available on request" everywhere else.

### 1.5 Eight non-existent PDF downloads
Every product page linked to datasheets, BIS licences and test reports under
`/downloads/`. **None of those files exist.** Every link was dead.
All removed; document sections now hide when there is nothing real to serve.

### 1.6 Twenty-one broken gallery images
All product galleries pointed at `/images/products/...` — a directory that does
not exist. Every product page rendered broken images. Galleries now use
existing approved imagery and carry stable slot IDs for later replacement.

### 1.7 Unverified promises and claims
| Claim | Action |
|---|---|
| "We respond within 1–2 business days" | Removed — no confirmed SLA |
| "across India and South Asia" | Reduced to India — export unverified |
| Invented five-stage company timeline | Replaced with the client's own published capability statements |
| "Antistatic surface prevents static build-up" | Removed — unsupported |
| Bi-Color "wear indicator" / dual-layer construction | Softened to two-tone visual demarcation (see §3) |

---

## 2. Verified and retained

| Claim | Source |
|---|---|
| IS 15652:2006, BIS licence CM/L: 8800129617 | Client's published product pages |
| BES1001 / A / 2.0 mm / 3.3 kV / 10 kV / 30 kV | Client's published spec table |
| BES1002 / B / 2.5 mm / 11 kV / 22 kV / 45 kV | Client's published spec table |
| BES1003 / C / 3.0 mm / 33 kV / 36 kV / 65 kV | Client's published spec table |
| Material: elastomer free from insertion; PVC + synthetic rubber polymers | Client's published material table |
| Tensile 15 N/mm² min; elongation 250% min; leakage 10 mA max | Client's published material table |
| Insulation resistance 100,000 MΩ min at 500 V | Client's published material table |
| Flame retardance: extinguishes within 5 s max | Client's published material table |
| Ageing 70±1 °C/168 h ≥75%; acid/alkali/oil ≥80% | Client's published material table |
| Working temperature −10 °C to 55 °C | Client's published material table |
| Anti-skid: coin, dot, hexa | Client's published material table |
| Standard size 1 m × 10 m or 20 m; colours black & blue | Client's published dimensions table |
| BharatMembrane PVC, IS 15909:2020, 1–5 mm, thermal welding | Client's published membrane page |
| Applications (tunnel, landfill, reservoir, canal, mining, effluent, aquaculture) | Client's published membrane page |
| IEC 61111 alongside IS 15652 | Client's About page and product catalogue |
| Integrated compound-to-mat manufacturing; in-house HV testing lab | Client's published "Why Choose Us" |
| Sectors: power utilities, railways, oil & gas, construction, infrastructure, heavy industries | Client's published About page |
| Phone, email and Noida office address | Client's published Contact page |
| ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 held | Client-supplied certificates |

---

## 3. Open questions — client confirmation required

Ordered by how much they affect the site.

1. **Bi-Color construction.** Is the two-tone surface a genuine **layered
   wear indicator** (worn top layer reveals a contrasting layer), or purely
   visual demarcation? Client documentation implies a layer construction but
   does not state a wear-indication function. Current copy claims only visual
   demarcation — the safe reading. If the wear-indication is real and
   documented, it is a genuine selling point worth restoring.

2. **Certificate currency and scope.** Issue and expiry dates were not
   established for the ISO certificates, the conformity certificate, the award
   and the recognition certificate. **Confirm validity before publishing or
   referencing any of them as current.**

3. **Which documents may be downloaded publicly?** All document sections
   currently say "available on request". Confirm which PDFs may be served, and
   supply approved (metadata-stripped, redacted) versions.

4. **"Test certificate with every supply."** The client's own catalogue states
   this. Confirm it still holds before putting it back on the site — it is a
   strong commercial promise.

5. **Customer references.** Written endorsements exist from two commercial
   customers. Publishing either name or logo needs **that customer's** written
   permission, not just the client's.

6. **Tata Precision Industries (India) Limited.** The client's About page
   states mats are manufactured under their standards and legacy. This is
   currently reproduced on the About page. Confirm the relationship and the
   exact permitted wording — naming another company carries risk.

7. **Response-time SLA.** If the client wants a published commitment, supply
   the real figure.

8. **Auto-Glow performance.** No glow duration, charging time or reflectivity
   figures are published anywhere. Supply test data or the page stays
   qualitative.

9. **Leadership.** The previous site had a leadership section. No leadership
   photography or biography was supplied. Provide content or the section
   stays out.

---

## 4. Standing rules

- Never state a certificate is current without a checked expiry date.
- Never name a customer without that customer's written permission.
- Never link a document that does not exist — hide the control instead.
- Never publish a numeric performance value without a test report behind it.
- Keep BharatMembrane as **PVC**. Do not reintroduce HDPE wording.
- Keep mat product codes unsuffixed.
