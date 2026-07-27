# Asset Integration Plan

Plan for introducing client-supplied photography, documents and brand assets
into the site.

**Status: nothing has been integrated.** The client's asset library was audited
locally. No proprietary file has been copied into this repository, committed,
or deployed. This document is deliberately sanitised — it contains no
filenames, paths, certificate numbers or customer names.

---

## 1. Why nothing is integrated yet

Three blockers, all of which need a decision from the client.

1. **This repository is public.** Certificates, factory photography and
   customer endorsements should not be published to a public repo before the
   client confirms each file is cleared for public use.
2. **Every candidate photograph carries embedded location metadata.** A large
   share of the image library contains GPS coordinates and camera
   identifiers. Publishing as-is would disclose the precise location of the
   manufacturing site. All derivatives must be metadata-stripped first.
3. **Certificate currency is unconfirmed.** Certificates exist, but issue and
   expiry dates were not established. Publishing a lapsed certificate as
   current would be a misrepresentation.

The code is ready. Slots, fallbacks and data structures are in place, so
integration is a content swap rather than a rebuild.

---

## 2. Candidate pool

Audited from the client's asset library and a supplementary archive.

| Category | Usable candidates | Approval status |
|---|---|---|
| Own-brand marks and logos | 12 | Ready — lowest risk, approve first |
| Product photography — insulating mats | 16 | Needs edit + approval |
| Product photography — auto-glow / reflective | 14 | Needs edit + approval |
| Product photography — coloured strip | 5 | Needs edit + approval |
| Product photography — Bi-Color | **0** | **Gap — no stills exist** |
| Product/application photography — membrane | **1** | **Gap — insufficient** |
| Certificates and test reports | 12 | Blocked on currency + redaction |
| Awards and recognition | 5 | Needs claim verification |
| Event and recognition video | 7 | Needs edit, consent, licence check |
| Company copy sources | 3 | Editorial rewrite required |
| Leadership photography | **0** | **Gap — none supplied** |

**Realistic publishable pool: ~104 files**, of which only 12 need no editing.
The rest of the library is duplication, legacy website code, third-party marks
with their own usage rules, or products outside the approved five.

---

## 3. Three content gaps

These cannot be solved by better selection — the material does not exist.

| Gap | Impact | Recommended action |
|---|---|---|
| **Bi-Color stills** | Product page runs entirely on provisional imagery | Short product shoot: full mat, surface close-up showing both tones, in-situ |
| **Membrane application photography** | A containment/waterproofing page with no site photography | Site photography from any installed project, or supplier-approved imagery |
| **Leadership** | Section cannot be built | Commission portraits, or drop the section — do not use stock people |

Do not fill these with stock photography. On an industrial B2B site, generic
stock actively reduces credibility.

---

## 4. Integration sequence

**Phase 1 — Brand marks (no rights or privacy risk)**
Convert the brand vector master to a clean SVG; replace the current logo in
header, footer, favicon and OG image. Highest visual return for the least risk.

**Phase 2 — Product photography for mats and auto-glow (30 images)**
Fills the majority of gallery slots. Requires: metadata strip, HEIC → AVIF/WebP,
crop to slot ratios, white-balance normalisation so the set reads as one system.

**Phase 3 — Certificates**
Only after currency and scope are confirmed and personal data is redacted.
Publish as thumbnail plus download; until then the UI shows
"available on request", which is already implemented.

**Phase 4 — Video and remaining gaps**
Do not self-host raw video — the library runs to hundreds of megabytes. Host
externally with a click-to-load poster frame.

---

## 5. Derivative specification

Generated locally from originals. Originals are never modified.

| Output | Format | Target size |
|---|---|---|
| Hero | AVIF + WebP | ≤ 250 KB |
| Gallery image | AVIF + WebP | ≤ 180 KB |
| Thumbnail | WebP | ≤ 50 KB |
| Logo | SVG (or PNG fallback) | ≤ 30 KB |
| Certificate thumbnail | WebP | ≤ 80 KB |

**Mandatory for every derivative:** strip all EXIF/XMP/IPTC metadata — GPS,
camera identifiers and document author names.

---

## 6. Publication gate

No asset ships unless all five are true:

1. Metadata stripped.
2. No personal name, signature, account or order reference visible.
3. Rights confirmed — company-owned, or written permission held.
4. Any associated claim confirmed current and correctly scoped.
5. Client has explicitly approved that specific file for public use.

---

## 7. Handling rules

- The asset library is ignored by git (`.gitignore`) and the audit workspace
  lives outside the repository entirely.
- Never upload client assets to third-party compression, conversion or OCR
  services.
- Never reference a local or cloud path to the library in application code.
- Do not publish material for products outside the approved five.
- Third-party accreditation marks have their own usage rules — prefer naming
  the standard in text, which is what the site does today.
