# Asset Slot Specification

Stable identifiers for every image position on the site.

**How to use this:** when a client asset is approved, drop the derivative into
`public/images/...` and change only the `src` and `alt` for that slot ID. No
layout work is needed — ratios and sizes are already fixed, so swapping an
image cannot shift the page.

Gallery slot IDs live in `src/data/products.ts` on each `galleryImages` entry.

---

## 1. Conventions

- **Desktop ratio** governs the reserved box; the image is cropped to fill.
- Every slot has a **fallback that already exists**, so no slot can render
  broken while awaiting approval.
- Minimum dimensions are the smallest source that still looks sharp at 2×.
- All derivatives must be metadata-stripped (see `ASSET_INTEGRATION_PLAN.md`).

---

## 2. Homepage

| Slot ID | Section | Desktop | Mobile | Min source | Wanted |
|---|---|---|---|---|---|
| `HOME-HERO-01` | Hero | 4:3 | 4:3 | 2400×1800 | Mats in a real electrical environment |
| `HOME-PRODUCT-EIM-01` | Range card 1 | 4:3 | 4:3 | 1600×1200 | Standard insulating mat |
| `HOME-PRODUCT-CSIM-01` | Range card 2 | 4:3 | 4:3 | 1600×1200 | Coloured strip mat |
| `HOME-PRODUCT-BCIM-01` | Range card 3 | 4:3 | 4:3 | 1600×1200 | **Gap — Bi-Color still needed** |
| `HOME-PRODUCT-AGRIM-01` | Range card 4 | 4:3 | 4:3 | 1600×1200 | Auto-glow / reflective band |
| `HOME-PRODUCT-BM-01` | Range card 5 | 4:3 | 4:3 | 1600×1200 | **Gap — membrane application** |

---

## 3. Product pages

### Electrical Insulating Mats
| Slot ID | Position | Ratio | Min source | Wanted |
|---|---|---|---|---|
| `PRODUCT-EIM-GALLERY-01` | Gallery 1 | 4:3 | 2000×1500 | Mat in front of a control panel |
| `PRODUCT-EIM-GALLERY-02` | Gallery 2 | 4:3 | 2000×1500 | Anti-skid surface close-up |
| `PRODUCT-EIM-GALLERY-03` | Gallery 3 | 4:3 | 2000×1500 | Embossed class/voltage marking |
| `PRODUCT-EIM-GALLERY-04` | Gallery 4 | 4:3 | 2000×1500 | Substation working area |

### Coloured Strip
| Slot ID | Position | Ratio | Min source | Wanted |
|---|---|---|---|---|
| `PRODUCT-CSIM-GALLERY-01` | Gallery 1 | 4:3 | 2000×1500 | Mat showing the yellow strip |
| `PRODUCT-CSIM-GALLERY-02` | Gallery 2 | 4:3 | 2000×1500 | Installed in a walkway |
| `PRODUCT-CSIM-GALLERY-03` | Gallery 3 | 4:3 | 2000×1500 | Around an electrical panel |

### Bi-Color — **blocked**
| Slot ID | Position | Ratio | Min source | Wanted |
|---|---|---|---|---|
| `PRODUCT-BCIM-GALLERY-01` | Gallery 1 | 4:3 | 2000×1500 | Full mat, both tones visible |
| `PRODUCT-BCIM-GALLERY-02` | Gallery 2 | 4:3 | 2000×1500 | Surface close-up |
| `PRODUCT-BCIM-GALLERY-03` | Gallery 3 | 4:3 | 2000×1500 | Installed in situ |
| `PRODUCT-BCIM-DIAGRAM-01` | Construction diagram | 16:9 | vector preferred | **Only if** layer construction is confirmed — see `CONTENT_VERIFICATION.md` §3.1 |

### Auto-Glow / Reflective Band
| Slot ID | Position | Ratio | Min source | Wanted |
|---|---|---|---|---|
| `PRODUCT-AGRIM-GALLERY-01` | Gallery 1 | 4:3 | 2000×1500 | Mat with visible band |
| `PRODUCT-AGRIM-LOWLIGHT-01` | Gallery 2 | 4:3 | 2000×1500 | Low-light / glow condition |
| `PRODUCT-AGRIM-GALLERY-02` | Gallery 3 | 4:3 | 2000×1500 | Reflective band under illumination |

Caption the low-light image factually. Do not imply a glow duration that has
no test data behind it.

### BharatMembrane — **thin**
| Slot ID | Position | Ratio | Min source | Wanted |
|---|---|---|---|---|
| `PRODUCT-BM-GALLERY-01` | Gallery 1 | 4:3 | 2000×1500 | Membrane material / roll |
| `PRODUCT-BM-APPLICATION-01` | Gallery 2 | 4:3 | 2000×1500 | Tunnel or containment site |

Membrane imagery must never show insulating mats — different product, different
standard.

---

## 4. About page

| Slot ID | Section | Ratio | Min source | Status |
|---|---|---|---|---|
| `ABOUT-MANUFACTURING-01` | Manufacturing | 16:9 | 2400×1350 | Candidates available |
| `ABOUT-TESTING-01` | Testing / QA | 16:9 | 2400×1350 | Candidates available |
| `ABOUT-CERTIFICATE-01…n` | Certificate cards | 3:4 | 1200×1600 | Blocked on currency check |
| `ABOUT-AWARD-01…n` | Awards | 4:3 | 1600×1200 | Needs claim verification |
| `ABOUT-LEADERSHIP-01…n` | Leadership | 1:1 | 1000×1000 | **Gap — none supplied** |

---

## 5. Brand

| Slot ID | Use | Format | Notes |
|---|---|---|---|
| `BRAND-LOGO-PRIMARY` | Header | SVG | From vector master |
| `BRAND-LOGO-FOOTER` | Footer | SVG | Footer lockup |
| `BRAND-FAVICON` | Tab icon | ICO/PNG | 32/180/512 |
| `BRAND-OG-IMAGE` | Social share | PNG | 1200×630 — **currently missing** |

`BRAND-OG-IMAGE` does not exist. Until it does, shared links have no preview
image. Low effort, high visible impact.

---

## 6. Rules

1. Never point a slot at a file that does not exist — it renders broken.
2. Keep the slot ID stable. Change `src`/`alt` only.
3. Alt text describes what is shown; it must not assert an unverified claim.
4. `priority` belongs on `HOME-HERO-01` and the product hero only.
5. Keep one background treatment across a product's gallery so the set reads
   as a system rather than a folder of photos.
