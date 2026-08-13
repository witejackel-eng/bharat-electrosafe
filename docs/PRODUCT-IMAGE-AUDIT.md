# Product image audit

Full visual audit of every product image asset in the repository and in the
client archive, the selection made for each placement, and the reason for every
rejection.

- Audited: 2026-07-28
- Assets inspected: 276 image files under `public/` plus 61 unreferenced
  originals in the client archive
- Method: numbered contact sheets, one per product family, each tile labelled
  with filename, pixel dimensions and file size. Every image was looked at.
  Nothing was judged from its filename. Contact sheets were generated outside
  `public/` and are not shipped.
- Near-duplicate detection: 16×16 greyscale mean-hash, Hamming distance over
  all 142 product images, threshold 12/256.

---

## 1. Headline findings

The client's report that "the current product images are not the best available
images" is correct, and the cause is specific: **the best images were already in
the repository and were not being used.**

| # | Finding | Evidence |
|---|---------|----------|
| 1 | The images on every mat page were **CGI renders, not photographs** | `electrical-insulating-mats/product-01…09.webp` are studio renders of rolls in orange, red and grey — colours the published specification does not list (standard colour is "Black and blue"). |
| 2 | **Genuine 12 MP client photography sat unused** | `photo-coin-*`, `photo-hexa-*`, `photo-strip-*`, `photo-surface-*` (1600×1200 and larger) were built by `scripts/build-assets.mjs` but never referenced by `src/data/products.ts`. |
| 3 | **Alt text described scenes that are not in the images** | `product-04.webp` was labelled "in substation installation with control panels" — it is an orange render on a seamless backdrop. `product-07.webp` was labelled "installed in front of high-voltage switchgear" — it is a black render on a dark backdrop. Neither contains a substation or switchgear. |
| 4 | **The BharatMembrane hero was an office interior** | `bharat-membrane/product-06.webp` is an interior render with the BharatMembrane logo on a meeting-room wall. It was the product-page hero. The brand logo file `product-logo.webp` was also in the gallery. |
| 5 | **The Coloured Strip hero had no strip in it** | `coloured-strip-insulating-mats/product-04.webp` is a blue coin-mat marking close-up. The yellow strip — the entire point of the product — is absent. |
| 6 | **Bharat Hydro Seal shipped collateral as product imagery** | `product-04.webp` is a marketing flyer with heading text and certification logos; `product-06.webp` is a scanned applications drawing with unreadable text. Both were in the gallery, and both were flagged `contextual`, which forced `object-cover` and cropped them further. |
| 7 | **`fit` was inferred, and inferred wrongly** | `getImageFit()` returned `cover` for anything listed in `contextual`. That array contained two CGI renders on EIM and a scanned drawing on BHS, so studio and document images were being cropped to fill their frames. |
| 8 | **Every product image existed twice on disk** | `gallery-NN.webp` and `product-NN.webp` are byte-identical pairs, and `auto-glow-reflective-band/` duplicates `auto-glow-reflective-band-insulating-mats/`. `photo-surface-01.webp` and `photo-surface-02.webp` are the same photograph (Hamming 0). |
| 9 | **One image was filed under the wrong product** | `electrical-insulating-mats/photo-surface-04.webp` is a black hexa mat with a bold yellow strip — a Coloured Strip product, in the Electrical Insulating Mats directory. |
| 10 | **The archive itself contains duplicate filenames** | `IMG_6049.JPG` and `IMG_6023.JPG` are byte-identical (MD5 `1c68c0d1…`), as are `IMG_6026`/`IMG_6035` and `IMG_6029`/`IMG_6034`. Selecting on filename alone would have shipped identical consecutive slides. |

### Resolution gap

The images actually being served were 500×500. The product-page hero viewport
is roughly 780 CSS px wide, so every hero was being upscaled ~1.6×.

| Family | Was serving | Now serving | Source available |
|--------|-------------|-------------|------------------|
| Electrical Insulating Mats | 500×500 render | 1600×900 photograph | 4000×2250 |
| Coloured Strip | 500×500 photo crop | 1600×900 photograph | 4000×2250 |
| Bi-Color | 500×500 render | 500×500 render (no photography exists) | 500×500 |
| Auto-Glow | 500×500 render | 1600×1200 photograph | 4000×2250 |
| BharatMembrane | 500×500 office render | 1200×800 photograph | 1200×800 |
| Bharat Hydro Seal | 414×414 render | 1600×900 photograph | 4032×3024 |

---

## 2. Accepted assets

All output written by `scripts/build-product-gallery.mjs` from the sources
named below. Orientation is normalised from EXIF and all metadata is stripped.

### 2A. Electrical Insulating Mats

| Output | Source | Res | Size | Orient. | Distinguishing feature | Background | Sharp | Text? | Role |
|--------|--------|-----|------|---------|------------------------|------------|-------|-------|------|
| `card.webp` | `Coined Insulating mat10.JPG` | 900×506 | 16 KB | Landscape | Complete blue coin mat, isolated | Clean white | Yes | No | Card thumbnail |
| `gallery/01-blue-coin-mat.webp` | `IMG_6049.JPG` | 1600×900 | 57 KB | Landscape | Full sheet, raised coin pattern | Plain, neutral | Yes | No | Product hero |
| `gallery/02-coin-surface-detail.webp` | `IMG_6048.JPG` | 1600×1200 | 34 KB | Landscape | Coin embossing, macro | Fills frame | Yes | No | Surface close-up |
| `gallery/03-black-hexa-mat.webp` | `IMG_6030.JPG` | 1600×900 | 295 KB | Landscape | Black sheet, hexa pattern | Plain, neutral | Yes | No | Alternate view |
| `gallery/04-hexa-surface-detail.webp` | `photo-hexa-02.webp` | 1600×1200 | 445 KB | Landscape | Hexa embossing, macro | Fills frame | Yes | No | Surface close-up |
| `gallery/05-iec-61111-marking.webp` | `IEC 61111 Class 2.jpeg` | 1179×611 | 48 KB | Landscape | Moulded class marking, legible | Product fills frame | Yes | Moulded product marking (intended) | Marking detail |
| `gallery/06-colour-and-pattern-range.webp` | `Normal Mat.jpeg` | 1179×939 | 99 KB | Landscape | Colour and pattern options fanned | Busy but relevant | Yes | No | Alternate / overview |

Overview image: slide 06. Application image: **none** — see gaps document.

### 2B. Coloured Strip Insulating Mats

| Output | Source | Res | Size | Orient. | Distinguishing feature | Background | Sharp | Text? | Role |
|--------|--------|-----|------|---------|------------------------|------------|-------|-------|------|
| `card.webp` | `IMG_6026.JPG` | 900×506 | 44 KB | Landscape | Yellow strip on black dot mat | Clean white | Yes | No | Card thumbnail |
| `gallery/01-yellow-strip-hexa-mat.webp` | `IMG_6029.JPG` | 1600×900 | 243 KB | Landscape | Yellow strip fills frame, hexa | Clean white | Yes | No | Product hero |
| `gallery/02-yellow-strip-dot-mat.webp` | `IMG_6026.JPG` | 1600×900 | 102 KB | Landscape | Yellow strip, dot pattern | Clean white | Yes | No | Alternate view |
| `gallery/03-yellow-strip-angled.webp` | `photo-strip-03.webp` | 1600×1200 | 81 KB | Landscape | Strip plus surface texture | Clean white | Yes | No | Alternate / overview |
| `gallery/04-edge-strip-production.webp` | `Coloured Strip1.jpeg` | 1097×1280 | 176 KB | Portrait | Yellow edge strips, blue mat, on line | Real production floor | Yes | No | Installation |
| `gallery/05-switchroom-boundary.webp` | `product-demo.webp` | 1024×1536 | 285 KB | Portrait | Yellow boundary beside switchgear | Real switchroom | Yes | No | Application |

Overview image: slide 03. Application image: slide 05.

Note: slide 05 is the client's own published composition — a photographed
switchroom with the mat laid in. It is kept because the client published it and
it communicates the boundary-marking use clearly; it is not presented as
unretouched site photography.

### 2C. Bi-Color Insulating Mats

No photograph of a bi-colour mat exists anywhere in the repository or the client
archive. The client's own published illustrations are retained because they
depict the two-layer construction truthfully and are the only assets available.

| Output | Source | Res | Size | Orient. | Distinguishing feature | Background | Sharp | Text? | Role |
|--------|--------|-----|------|---------|------------------------|------------|-------|-------|------|
| `card.webp` | `product-03.webp` | 500×500 | 13 KB | Square | Blue layer above red layer, separated | Studio, plain | Yes | No | Card thumbnail |
| `gallery/01-dual-layer-roll.webp` | `product-01.webp` | 500×500 | 19 KB | Square | Blue top, red base at cut edge | Studio, plain | Yes | No | Product hero |
| `gallery/02-layer-edge-detail.webp` | `product-02.webp` | 500×500 | 24 KB | Square | Callouts on the layer boundary | Studio, plain | Yes | No | Profile detail |
| `gallery/03-contrasting-layers.webp` | `product-03.webp` | 500×500 | 13 KB | Square | Both layers, fully separated | Studio, plain | Yes | No | Alternate view |
| `gallery/04-layer-cross-section.webp` | `product-demo-bi-color.webp` | 805×564 | 17 KB | Landscape | 0.5 mm top layer over PVC base | Diagram | Yes | Labelled diagram (intended) | Profile detail |

Overview image: slide 02. Application image: **none**.

The first caption states plainly that these are manufacturer illustrations.

### 2D. Auto-Glow / Reflective Band Insulating Mats

| Output | Source | Res | Size | Orient. | Distinguishing feature | Background | Sharp | Text? | Role |
|--------|--------|-----|------|---------|------------------------|------------|-------|-------|------|
| `card.webp` | `photo-03.webp` | 900×675 | 41 KB | Landscape | Complete mat, bands visible | Plain, neutral | Yes | Small handwritten sample note | Card thumbnail |
| `gallery/01-reflective-bands-daylight.webp` | `photo-01.webp` | 1600×1200 | 153 KB | Landscape | Bands in daylight | Plain, neutral | Yes | Small handwritten sample note | Product hero |
| `gallery/02-reflective-bands-low-light.webp` | `photo-02.webp` | 1600×1200 | 106 KB | Landscape | **Same mat, band glowing in low light** | Plain, neutral | Yes | Small handwritten sample note | Alternate view |
| `gallery/03-band-surface-detail.webp` | `AutoGlow17.JPG` | 1600×900 | 48 KB | Landscape | Band beside dot anti-skid surface | Fills frame | Yes | No | Surface close-up |
| `gallery/04-is-15652-class-c-marking.webp` | `AutoGlow19.png` | 1600×900 | 85 KB | Landscape | "IS 15652-2006 CLASS-C, UP TO 33 KV" | Plain, neutral | Yes | Printed product marking (intended) | Marking detail |
| `gallery/05-auto-glow-product-label.webp` | `AutoGlow3.jpeg` | 1280×960 | 138 KB | Landscape | Product label, 3 mm auto-glow | Product fills frame | Yes | Product label (intended) | Marking detail |
| `gallery/06-supplied-in-rolls.webp` | `AutoGlow12.jpeg` | 1280×853 | 46 KB | Landscape | Supplied form — rolls | Clean white | Yes | No | Alternate view |

Overview image: slide 03. Application image: **none**.

Slides 01 and 02 are the same mat photographed in daylight and then in low
light. That pair is the honest evidence for the glow claim, which is why the
client's rendered "glowing switchroom" scene is not used at all.

### 2E. BharatMembrane

| Output | Source | Res | Size | Orient. | Distinguishing feature | Background | Sharp | Text? | Role |
|--------|--------|-----|------|---------|------------------------|------------|-------|-------|------|
| `card.webp` | `product-01.webp` | 500×500 | 29 KB | Square | Yellow membrane lining a tunnel | Real tunnel | Adequate | No | Card thumbnail |
| `gallery/01-tunnel-membrane-lining.webp` | `hero.webp` | 1200×800 | 122 KB | Landscape | Membrane panels along tunnel arch | Real tunnel | Yes | No | Product hero |
| `gallery/02-yellow-membrane-tunnel.webp` | `product-01.webp` | 500×500 | 29 KB | Square | Membrane fixed across the bore | Real tunnel | Adequate | No | Installation |
| `gallery/03-membrane-seam-welding.webp` | `product-02.webp` | 500×500 | 18 KB | Square | Operative welding a seam | Real tunnel | Adequate | No | Installation |
| `gallery/04-hot-air-weld-detail.webp` | `product-03.webp` | 500×500 | 16 KB | Square | Hot-air tool on a lap seam | Fills frame | Adequate | No | Surface close-up |
| `gallery/05-tunnel-portal-lining.webp` | `product-04.webp` | 500×500 | 61 KB | Square | Portal lined before concreting | Real site | Adequate | No | Installation / overview |
| `gallery/06-containment-basin-lining.webp` | `product-05.webp` | 500×500 | 42 KB | Square | Black membrane lining a basin | Real site | Adequate | No | Application |

Overview image: slide 05. Application image: slide 06.

All BharatMembrane photography is 500 px square at source — the client published
nothing larger. Logged as a gap.

### 2F. Bharat Hydro Seal

Rebuilt entirely from client photographs that were **not in the repository**.

| Output | Source | Res | Size | Orient. | Distinguishing feature | Background | Sharp | Text? | Role |
|--------|--------|-----|------|---------|------------------------|------------|-------|-------|------|
| `card.webp` | `Water Stop Seal1.png` (1516×907) | 900×538 | 10 KB | Landscape | Black ribbed profile, centre bulb | Clean white | Yes | No | Card thumbnail |
| `gallery/01-ribbed-water-stop-profile.webp` | `Water Stop Seal6.png` (4000×2250) | 1600×900 | 50 KB | Landscape | Ribs and hollow centre bulb | Clean, plain | Yes | Small moulded marking | Product hero |
| `gallery/02-centre-bulb-profile.webp` | `IMG_6038.JPG` (4000×2250) | 1600×900 | 43 KB | Landscape | Grey profile, bulb between flanges | Clean, plain | Yes | No | Alternate / overview |
| `gallery/03-flat-flange-profile.webp` | `IMG_6040.JPG` (4000×2250) | 1600×900 | 21 KB | Landscape | Flat-flange variant | Clean, plain | Yes | No | Alternate view |
| `gallery/04-translucent-pvc-profile.webp` | `Water Stop Seal2.png` (4032×3024) | 1600×1200 | 115 KB | Landscape | Translucent PVC, ribs visible through | Clean, plain | Yes | Small moulded marking | Alternate view |
| `gallery/05-rib-detail.webp` | `Water Stop Seal8.jpeg` (1086×1448) | 1086×1448 | 219 KB | Portrait | Rib profile, macro | Clean, plain | Yes | No | Profile detail |

Overview image: slide 02. Application image: **none**.

---

## 3. Rejected assets

| Asset | Product shown | Why rejected |
|-------|---------------|--------------|
| `electrical-insulating-mats/product-01…09.webp` (+ `.png` twins) | Rendered mats, incl. orange/red/grey | CGI renders, not photographs. Colours not in the published range. Superseded by genuine photography. |
| `electrical-insulating-mats/gallery-01…09.webp` | Same as above | Byte-identical duplicates of `product-NN.webp`. |
| `electrical-insulating-mats/photo-surface-02.webp` | Black hexa mat | Exact duplicate of `photo-surface-01.webp` (Hamming 0). |
| `electrical-insulating-mats/photo-surface-04.webp` | **Coloured strip mat** | Wrong product family — belongs to Coloured Strip, not EIM. Superseded by higher-resolution `IMG_6029`. |
| `electrical-insulating-mats/photo-dot-01.webp`, `photo-surface-03.webp` | Green dot-pattern mat | Genuine product, but green conflicts with the published standard colour ("black and blue"). Held back rather than imply a colour the specification does not list. Requested as a black/blue dot photograph instead. |
| `electrical-insulating-mats/photo-iec-03.webp` | Stacked labelled samples | Portrait 594×1280, label text too small to read at any rendered size. |
| `electrical-insulating-mats/photo-hexa-04.webp` | Hexa mat | Near-duplicate of `photo-hexa-03.webp` (Hamming 2). |
| `coloured-strip-insulating-mats/product-04.webp` | Blue coin mat marking | Was the hero. No yellow strip anywhere in frame; it is an EIM marking image. |
| `coloured-strip-insulating-mats/product-02.webp` | Rendered blue mat, yellow edge | CGI render, superseded. |
| `coloured-strip-insulating-mats/photo-strip-01/04.webp` | Strip mats | Near-duplicates of each other; portrait 1600×2133 letterboxes badly in a 4:3 viewport. |
| `auto-glow…/product-01…06.webp`, `product-demo-glowing-dark.webp` | Rendered mats and a rendered glowing switchroom | CGI. The glow is evidenced by a genuine low-light photograph instead; a rendered glow would be exactly the "faked glow" the brief forbids. |
| `bharat-membrane/product-06.webp` | **Office interior with logo on the wall** | Was the product-page hero. Shows no product. |
| `bharat-membrane/product-logo.webp` | BharatMembrane wordmark | A logo, not product imagery. Was in the gallery and was the Open Graph image. |
| `bharat-hydro-seal/product-04.webp` | Marketing flyer | Collateral: heading text, four inset photos, certification logos, `#startupindia`. Not product imagery. |
| `bharat-hydro-seal/product-06.webp` | Scanned "Waterstop Applications" drawing | Document scan, text illegible at rendered size. |
| `bharat-hydro-seal/product-05.webp` | Profile-type diagram | Useful subject, but the source is cropped — "KICKER TYPE" is cut off at the bottom edge. Multiple profile types are instead shown with real photographs. |
| `bharat-hydro-seal/product-01/02/03.webp` | Rendered profiles | Renders at 414–500 px, superseded by 4032×3024 photographs. |
| `Bi-Colour*.mp4` (5 client videos) | Genuine bi-colour mat on the line | Only genuine bi-colour footage that exists, but maximum frame is 1024×576 with motion blur — below the quality bar for a card or hero. Requested as stills instead. |
| `Water Stop Seal3/4/5/7/9`, `IMG_6016/17/19/37/39/41/43` | Water stop profiles | Genuine and usable, but near-duplicates of the five selected profiles. Held in reserve. |
| All `product-thumb-*.png` | Various | 100×100 sources; Next.js generates responsive thumbnails from the full-size asset. |
| Certificates, award photos, leadership portraits, client and certification logos | — | Not product imagery; excluded from product galleries by definition. |

---

## 4. Final mapping table

| Product | Card | Hero | Gallery slides | Overview | Application | Notes |
|---------|------|------|----------------|----------|-------------|-------|
| Electrical Insulating Mats | `card.webp` | `gallery/01-blue-coin-mat` | 01 blue coin → 02 coin macro → 03 black hexa → 04 hexa macro → 05 IEC marking → 06 colour range | slide 06 | — | 6 slides. All genuine photography. No installation shot exists. |
| Coloured Strip Insulating Mats | `card.webp` | `gallery/01-yellow-strip-hexa-mat` | 01 hexa+strip → 02 dot+strip → 03 angled → 04 edge strips on line → 05 switchroom boundary | slide 03 | slide 05 | 5 slides. Strip visible in every one. |
| Bi-Color Insulating Mats | `card.webp` | `gallery/01-dual-layer-roll` | 01 dual-layer roll → 02 layer edge → 03 layers separated → 04 cross-section | slide 02 | — | 4 slides. Manufacturer illustrations — no photography exists. Highest-priority gap. |
| Auto-Glow / Reflective Band | `card.webp` | `gallery/01-reflective-bands-daylight` | 01 daylight → 02 low-light glow → 03 band macro → 04 IS 15652 Class C marking → 05 product label → 06 rolls | slide 03 | — | 6 slides. Daylight/low-light pair is genuine. |
| BharatMembrane | `card.webp` | `gallery/01-tunnel-membrane-lining` | 01 tunnel lining → 02 membrane fixed → 03 seam welding → 04 weld detail → 05 portal → 06 containment basin | slide 05 | slide 06 | 6 slides. All genuine site photography, but 500 px at source. |
| Bharat Hydro Seal | `card.webp` | `gallery/01-ribbed-water-stop-profile` | 01 ribbed+bulb → 02 centre bulb → 03 flat flange → 04 translucent → 05 rib macro | slide 02 | — | 5 slides. Rebuilt from 4032×3024 photographs new to the repo. |

Every product: 4–6 slides, no duplicate or near-duplicate consecutive slides, no
image belonging to another family, no certificate or document in any gallery.

---

## 5. Asset weight

38 images written, 3.4 MB total, from 33.9 MB of originals.

Largest slide is 445 KB (`electrical-insulating-mats/gallery/04-hexa-surface-detail.webp`)
— an all-over fine embossed texture, which is genuinely expensive to encode and
is a lazy-loaded slide, not the LCP image. Every hero is between 13 KB and
243 KB.

## 6. Reproducing this

```bash
node scripts/build-product-gallery.mjs --source "<path to client archive>"
```

Selections live in that script; alt text, captions, fit modes and focal
positions live in `src/data/products.ts`. No component chooses its own image.
