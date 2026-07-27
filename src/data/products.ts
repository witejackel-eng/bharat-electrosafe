/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Product Data Model
   ──────────────────────────────────────────────────────────────── */

// ── Product Slug Union Type ──
export type ProductSlug =
  | "electrical-insulating-mats"
  | "coloured-strip-insulating-mats"
  | "bi-color-insulating-mats"
  | "auto-glow-reflective-band-insulating-mats"
  | "bharat-membrane"
  | "bharat-hydro-seal";

/** Runtime list of every valid slug. Used to validate enquiry payloads so the
 *  API allow-list can never drift from the catalogue. */
export const productSlugs = [
  "electrical-insulating-mats",
  "coloured-strip-insulating-mats",
  "bi-color-insulating-mats",
  "auto-glow-reflective-band-insulating-mats",
  "bharat-membrane",
  "bharat-hydro-seal",
] as const satisfies readonly ProductSlug[];

// ── Insulation Class Specification ──
export interface InsulationClassSpec {
  /** Product code, e.g. BES1001 */
  productCode: string;
  /** IS 15652 class letter */
  classLetter: "A" | "B" | "C";
  /** Nominal mat thickness */
  thickness: string;
  /** Maximum working voltage */
  workingVoltage: string;
  /** Proof test voltage */
  proofVoltage: string;
  /** Dielectric strength (breakdown voltage) */
  dielectricStrength: string;
}

// ── Membrane Thickness Option ──
export interface MembraneThicknessOption {
  thickness: string;
  label: string;
}

// ── Material Property (for mat and membrane detail pages) ──
export interface MaterialProperty {
  label: string;
  value: string;
}

// ── Dimensions Info (for insulating mat products) ──
export interface MatDimensionsInfo {
  standardWidth: string;
  standardLengths: string[];
  thicknesses: string[];
  customLength: string;
  standardColours: string[];
}

// ── Gallery Image (for product detail pages) ──
export interface ProductGalleryImage {
  /** Stable slot identifier — see docs/ASSET_SLOT_SPECIFICATION.md.
   *  `src` currently points at an approved provisional image; when a client
   *  asset is approved for this slot, only `src` and `alt` change. */
  slotId?: string;
  src: string;
  alt: string;
}

// ── Download Item ──
export interface ProductDownload {
  label: string;
  fileName: string;
  type: "datasheet" | "certificate" | "test-report";
}

// ── Core Product Interface ──
export interface Product {
  /** URL-safe slug */
  slug: ProductSlug;
  /** Human-readable product name */
  name: string;
  /** Short name for navigation/cards */
  shortName: string;
  /** 1-line description for cards */
  description: string;
  /** Longer copy for product page hero */
  detailCopy: string;
  /** Hero/product page image path */
  image: string;
  /** Applicable Indian Standards */
  standards: string[];
  /** Key features */
  features: string[];
  /** Which product system group this belongs to */
  systemGroup: "electrical-insulation" | "visible-safety" | "civil-protection";
  /** Display index within system group */
  systemIndex: string;
  /** Available variants/sub-products */
  variants: string[];
  /** Internal link path */
  exploreLink: string;

  // ── Detail-page content (populated for product detail pages) ──
  /** Overview section text for the detail page */
  overviewText?: string;
  /** Key functional benefits (≤5 verified points) */
  benefits?: string[];
  /** Gallery images for product page */
  galleryImages?: ProductGalleryImage[];

  // ── Electrical insulation fields (only for mat products) ──
  /** Voltage class specifications — null for BharatMembrane */
  insulationClasses?: InsulationClassSpec[];
  /** Nominal thickness range — null for BharatMembrane */
  thicknessRange?: string;
  /** Typical applications for insulating mats */
  matApplications?: string[];
  /** Material properties for insulating mats */
  matMaterialProperties?: MaterialProperty[];
  /** Dimensions and installation info for insulating mats */
  matDimensions?: MatDimensionsInfo;
  /** Downloads and certificates for insulating mats */
  matDownloads?: ProductDownload[];

  /* ── Engineered-product fields ──
     Used by products that are not rated to IS 15652 voltage classes
     (BharatMembrane, BharatHydro Seal). These render through
     EngineeredProductLayout, which is driven entirely by this data so a
     new engineered product needs no new component. */
  /** Thickness / size options offered. Omit when sizing is project-specific. */
  variantOptions?: MembraneThicknessOption[];
  /** Heading above the variant table. */
  variantOptionsTitle?: string;
  /** Typical applications. */
  engineeredApplications?: string[];
  /** Material and physical properties. */
  engineeredProperties?: MaterialProperty[];
  /** Caption shown under the properties heading. */
  propertiesCaption?: string;
  /** Accessible summary for the properties table. */
  propertiesTableSummary?: string;
  /** Installation / jointing notes. */
  engineeredNotes?: string[];
  /** Heading above the notes list. */
  engineeredNotesTitle?: string;
  /** Downloads and documents. */
  engineeredDownloads?: ProductDownload[];
  /** Prose for the standards/compliance block. */
  standardsNarrative?: string;
  /** Alt text for the hero image. */
  heroImageAlt?: string;
  /** Supporting line in the closing enquiry CTA. */
  enquiryBlurb?: string;
}

// ── Product Data ──
export const products: Product[] = [
  /* ─── 1. Electrical Insulating Mats ─── */
  {
    slug: "electrical-insulating-mats",
    name: "Electrical Insulating Mats",
    shortName: "Insulating Mats",
    description:
      "Rubber insulating mats selected by operating voltage — IS 15652 Class A, B and C.",
    detailCopy:
      "Rubber insulating mats engineered for electrical panels, substations, switchrooms and industrial control areas. Selected by operating voltage to IS 15652:2006, each class is proof-tested and dielectric-tested at voltages well above the rated working voltage. Permanent embossed class and voltage marking, diamond-pattern anti-skid surface on both sides.",
    image: "/media/products/electrical-insulating-mats/photo-coin-01.webp",
    standards: ["IS 15652:2006", "IEC 61111"],
    features: [
      "Tested to IS 15652:2006 for electrical insulation",
      "Permanent embossed class and voltage marking",
      "Diamond-pattern anti-skid surface on both sides",
      "Oil, acid and alkali resistant rubber compound",
      "Available in standard rolls and cut sizes",
      "Suitable for indoor and covered outdoor use",
    ],
    systemGroup: "electrical-insulation",
    systemIndex: "01",
    variants: ["Class A – 3.3 kV", "Class B – 11 kV", "Class C – 33 kV"],
    exploreLink: "/products/electrical-insulating-mats",
    overviewText:
      "Electrical insulating mats provide personal protection against electrical shock for operators working on or near live electrical equipment. Manufactured from elastomer free from insertion, these mats are classified by operating voltage into Class A (3.3 kV), Class B (11 kV) and Class C (33 kV) under IS 15652:2006. Each class is tested for dielectric strength, leakage current and flame retardance before release.",
    benefits: [
      "Proof-tested and dielectric-tested above rated working voltage",
      "Elastomer construction free from insertion — no hidden layers",
      "Coin, dot and hexa anti-skid designs for secure footing",
      "Flame retardant — extinguishes within 5 seconds maximum",
      "Insulation resistance of 100,000 MΩ minimum at 500 V with water",
    ],
    galleryImages: [
      { slotId: "PRODUCT-EIM-GALLERY-01", src: "/media/products/electrical-insulating-mats/photo-coin-01.webp", alt: "Blue electrical insulating mat with a raised coin-pattern anti-skid surface" },
      { slotId: "PRODUCT-EIM-GALLERY-02", src: "/media/products/electrical-insulating-mats/photo-coin-03.webp", alt: "Close-up of the raised circular studs forming the coin anti-skid pattern" },
      { slotId: "PRODUCT-EIM-GALLERY-03", src: "/media/products/electrical-insulating-mats/photo-hexa-01.webp", alt: "Insulating mat with a hexagonal anti-skid surface pattern" },
      { slotId: "PRODUCT-EIM-GALLERY-04", src: "/media/products/electrical-insulating-mats/photo-dot-01.webp", alt: "Insulating mat with a fine dot anti-skid surface pattern" },
      { slotId: "PRODUCT-EIM-GALLERY-05", src: "/media/products/electrical-insulating-mats/photo-surface-01.webp", alt: "Black insulating mat sheet showing its diamond-textured working surface" },
      { slotId: "PRODUCT-EIM-GALLERY-06", src: "/media/products/electrical-insulating-mats/photo-iec-01.webp", alt: "Insulating mat carrying its IEC 61111 class marking" },
    ],
    insulationClasses: [
      {
        productCode: "BES1001",
        classLetter: "A",
        thickness: "2.0 mm",
        workingVoltage: "3.3 kV",
        proofVoltage: "10.0 kV",
        dielectricStrength: "30.0 kV",
      },
      {
        productCode: "BES1002",
        classLetter: "B",
        thickness: "2.5 mm",
        workingVoltage: "11.0 kV",
        proofVoltage: "22.0 kV",
        dielectricStrength: "45.0 kV",
      },
      {
        productCode: "BES1003",
        classLetter: "C",
        thickness: "3.0 mm",
        workingVoltage: "33.0 kV",
        proofVoltage: "36.0 kV",
        dielectricStrength: "65.0 kV",
      },
    ],
    thicknessRange: "2.0 – 3.0 mm",
    matApplications: [
      "AC/DC control panels",
      "Substations",
      "Switchrooms",
      "Industrial electrical equipment",
      "Electrical maintenance areas",
    ],
    matMaterialProperties: [
      { label: "Material", value: "Elastomer free from insertion" },
      { label: "Anti-skid designs", value: "Coin, dot and hexa patterns" },
      { label: "Tensile strength", value: "15 N/mm² minimum" },
      { label: "Elongation at break", value: "250% minimum" },
      { label: "Leakage current", value: "10 mA maximum" },
      { label: "Insulation resistance with water", value: "100,000 MΩ minimum at 500 V" },
      { label: "Flame retardance", value: "Extinguishes within 5 seconds maximum" },
      { label: "Working temperature", value: "−10 °C to 55 °C" },
    ],
    matDimensions: {
      standardWidth: "1 metre",
      standardLengths: ["10 metres", "20 metres"],
      thicknesses: ["2 mm", "2.5 mm", "3 mm"],
      customLength: "Custom length as approved",
      standardColours: ["Black", "Blue"],
    },
    // Documents are intentionally empty until real, client-approved files are
    // published to /public/downloads. The UI hides the section when empty —
    // never link to a document that does not exist. See docs/ASSET_INTEGRATION_PLAN.md.
    matDownloads: [],
  },

  /* ─── 2. Coloured Strip Insulating Mats ─── */
  {
    slug: "coloured-strip-insulating-mats",
    name: "Coloured Strip Insulating Mats",
    shortName: "Coloured Strip Mats",
    description:
      "Insulating mats with coloured strip for hazard demarcation and safety zoning.",
    detailCopy:
      "Coloured strip insulating mats combine the full electrical insulation performance of IS 15652 with integrated coloured strip bands for hazard demarcation and safety zoning. The coloured strip provides clear visual guidance in industrial environments — marking safe approach zones, danger boundaries, and equipment perimeters — while maintaining the same proof-tested dielectric protection.",
    image: "/media/products/coloured-strip-insulating-mats/photo-strip-05.webp",
    standards: ["IS 15652:2006", "IEC 61111"],
    features: [
      "High-visibility colour coding for safety zoning",
      "Same electrical insulation as standard Class A/B/C mats",
      "Durable rubber base with wear-resistant coloured strip",
      "Customisable strip widths and colour combinations",
      "Suitable for industrial floors and walkways",
      "Permanent embossed class and voltage marking",
    ],
    systemGroup: "visible-safety",
    systemIndex: "02",
    variants: ["Class A – 3.3 kV", "Class B – 11 kV", "Class C – 33 kV"],
    exploreLink: "/products/coloured-strip-insulating-mats",
    overviewText:
      "Coloured strip insulating mats integrate high-visibility coloured bands into the standard IS 15652 insulating mat. These bands serve as visual hazard-zone demarcation, providing clear boundary marking and safety-path identification around electrical panels and control-room equipment. The coloured strip does not compromise the mat's electrical insulation performance, which remains fully compliant with IS 15652 for the designated voltage class.",
    benefits: [
      "Visual hazard-zone demarcation around electrical equipment",
      "Clear boundary marking for safe approach zones",
      "Safety-path identification in industrial walkways",
      "Custom strip configuration available where applicable",
      "Full IS 15652 dielectric protection maintained",
    ],
    galleryImages: [
      { slotId: "PRODUCT-CSIM-GALLERY-01", src: "/media/products/coloured-strip-insulating-mats/photo-strip-05.webp", alt: "Insulating mat with a contrasting coloured guidance strip along its edge" },
      { slotId: "PRODUCT-CSIM-GALLERY-02", src: "/media/products/coloured-strip-insulating-mats/photo-strip-01.webp", alt: "Coloured strip insulating mat showing the boundary strip against the mat body" },
      { slotId: "PRODUCT-CSIM-GALLERY-03", src: "/media/products/coloured-strip-insulating-mats/photo-strip-02.webp", alt: "Coloured strip insulating mat, alternative view of the strip edge" },
      { slotId: "PRODUCT-CSIM-GALLERY-04", src: "/media/products/coloured-strip-insulating-mats/photo-strip-03.webp", alt: "Anti-skid surface of a coloured strip insulating mat" },
    ],
    insulationClasses: [
      {
        productCode: "BES1001",
        classLetter: "A",
        thickness: "2.0 mm",
        workingVoltage: "3.3 kV",
        proofVoltage: "10.0 kV",
        dielectricStrength: "30.0 kV",
      },
      {
        productCode: "BES1002",
        classLetter: "B",
        thickness: "2.5 mm",
        workingVoltage: "11.0 kV",
        proofVoltage: "22.0 kV",
        dielectricStrength: "45.0 kV",
      },
      {
        productCode: "BES1003",
        classLetter: "C",
        thickness: "3.0 mm",
        workingVoltage: "33.0 kV",
        proofVoltage: "36.0 kV",
        dielectricStrength: "65.0 kV",
      },
    ],
    thicknessRange: "2.0 – 3.0 mm",
    matApplications: [
      "Electrical panels requiring hazard demarcation",
      "Substations with clear boundary marking needs",
      "Control rooms with safety-path identification",
      "Industrial walkways near energised equipment",
      "Power utility areas with safety zoning requirements",
    ],
    matMaterialProperties: [
      { label: "Material", value: "Elastomer free from insertion" },
      { label: "Anti-skid designs", value: "Coin, dot and hexa patterns" },
      { label: "Tensile strength", value: "15 N/mm² minimum" },
      { label: "Elongation at break", value: "250% minimum" },
      { label: "Leakage current", value: "10 mA maximum" },
      { label: "Insulation resistance with water", value: "100,000 MΩ minimum at 500 V" },
      { label: "Flame retardance", value: "Extinguishes within 5 seconds maximum" },
      { label: "Working temperature", value: "−10 °C to 55 °C" },
    ],
    matDimensions: {
      standardWidth: "1 metre",
      standardLengths: ["10 metres", "20 metres"],
      thicknesses: ["2 mm", "2.5 mm", "3 mm"],
      customLength: "Custom length as approved",
      standardColours: ["Black", "Blue"],
    },
    matDownloads: [],
  },

  /* ─── 3. Bi-Color Insulating Mats ─── */
  {
    slug: "bi-color-insulating-mats",
    name: "Bi-Color Insulating Mats",
    shortName: "Bi-Color Mats",
    description:
      "Two-tone insulating mats for clear safety zone delineation in high-traffic areas.",
    detailCopy:
      "Bi-color insulating mats feature two distinct colour zones on the mat surface, providing clear safety zone delineation in high-traffic industrial areas. Each colour zone communicates a different safety message — e.g. safe approach zone versus danger boundary — while the mat maintains full IS 15652 electrical insulation performance for the designated voltage class.",
    image: "/media/products/bi-color-insulating-mats/hero.webp",
    standards: ["IS 15652:2006", "IEC 61111"],
    features: [
      "Two distinct colour zones for clear delineation",
      "Manufactured to IS 15652:2006 for the designated voltage class",
      "Durable elastomer base with anti-skid embossed surface",
      "Colour combinations available on request",
      "Suitable for high-traffic industrial floors",
      "Resistant to moisture, oil and chemicals",
    ],
    systemGroup: "visible-safety",
    systemIndex: "03",
    variants: ["Class A – 3.3 kV", "Class B – 11 kV", "Class C – 33 kV"],
    exploreLink: "/products/bi-color-insulating-mats",
    overviewText:
      "Bi-Color insulating mats carry a two-tone surface finish that makes safety boundaries easy to read at a glance. The contrasting tones mark approach zones and equipment perimeters clearly in busy industrial areas, while the mat itself is manufactured to the same IS 15652:2006 construction as our standard insulating mats for the designated voltage class.",
    benefits: [
      "Two-tone surface gives an immediate visual cue for safety boundaries",
      "Clear demarcation around panels and equipment in high-traffic areas",
      "Anti-skid embossed surface for secure footing",
      "Elastomer compound resistant to moisture, oil and chemicals",
      "Manufactured to IS 15652:2006 for the designated voltage class",
    ],
    galleryImages: [
      { slotId: "PRODUCT-BCIM-GALLERY-01", src: "/media/products/bi-color-insulating-mats/gallery-01.webp", alt: "Bi-colour insulating mat showing two contrasting surface tones" },
      { slotId: "PRODUCT-BCIM-GALLERY-02", src: "/media/products/bi-color-insulating-mats/gallery-02.webp", alt: "Bi-colour insulating mat, alternative view of the dual-tone surface" },
      { slotId: "PRODUCT-BCIM-GALLERY-03", src: "/media/products/bi-color-insulating-mats/gallery-03.webp", alt: "Bi-colour insulating mat roll" },
    ],
    insulationClasses: [
      {
        productCode: "BES1001",
        classLetter: "A",
        thickness: "2.0 mm",
        workingVoltage: "3.3 kV",
        proofVoltage: "10.0 kV",
        dielectricStrength: "30.0 kV",
      },
      {
        productCode: "BES1002",
        classLetter: "B",
        thickness: "2.5 mm",
        workingVoltage: "11.0 kV",
        proofVoltage: "22.0 kV",
        dielectricStrength: "45.0 kV",
      },
      {
        productCode: "BES1003",
        classLetter: "C",
        thickness: "3.0 mm",
        workingVoltage: "33.0 kV",
        proofVoltage: "36.0 kV",
        dielectricStrength: "65.0 kV",
      },
    ],
    thicknessRange: "2.0 – 3.0 mm",
    matApplications: [
      "High-traffic industrial floors requiring wear indication",
      "Substations where mat condition must be visually monitored",
      "Control rooms and corridors with regular personnel movement",
      "Manufacturing plant walkways with heavy foot traffic",
      "Power utility areas needing clear safety zone delineation",
    ],
    matMaterialProperties: [
      { label: "Material", value: "Elastomer free from insertion" },
      { label: "Anti-skid designs", value: "Coin, dot and hexa patterns" },
      { label: "Tensile strength", value: "15 N/mm² minimum" },
      { label: "Elongation at break", value: "250% minimum" },
      { label: "Leakage current", value: "10 mA maximum" },
      { label: "Insulation resistance with water", value: "100,000 MΩ minimum at 500 V" },
      { label: "Flame retardance", value: "Extinguishes within 5 seconds maximum" },
      { label: "Working temperature", value: "−10 °C to 55 °C" },
    ],
    matDimensions: {
      standardWidth: "1 metre",
      standardLengths: ["10 metres", "20 metres"],
      thicknesses: ["2 mm", "2.5 mm", "3 mm"],
      customLength: "Custom length as approved",
      standardColours: ["Black", "Blue"],
    },
    matDownloads: [],
  },

  /* ─── 4. Auto-Glow / Reflective Band Insulating Mats ─── */
  {
    slug: "auto-glow-reflective-band-insulating-mats",
    name: "Auto-Glow / Reflective Band Insulating Mats",
    shortName: "Auto-Glow Mats",
    description:
      "Insulating mats with auto-glow or reflective band for low-light and emergency visibility.",
    detailCopy:
      "Auto-glow / reflective band insulating mats integrate photoluminescent or reflective strip bands into the IS 15652 insulating mat surface. In normal lighting the reflective band provides high-visibility demarcation; in low-light or emergency power-loss conditions the auto-glow strip emits stored light, guiding personnel toward safe zones and away from energised equipment. Full electrical insulation performance is maintained for the designated voltage class.",
    image: "/media/products/auto-glow-reflective-band/photo-05.webp",
    standards: ["IS 15652:2006", "IEC 61111"],
    features: [
      "Auto-glow strip emits stored light in power-loss conditions",
      "Reflective band for high-visibility in normal lighting",
      "Same electrical insulation as standard Class A/B/C mats",
      "Durable rubber base with wear-resistant strip surface",
      "Critical for substations and emergency-egress areas",
      "Permanent embossed class and voltage marking",
    ],
    systemGroup: "visible-safety",
    systemIndex: "04",
    variants: ["Class A – 3.3 kV", "Class B – 11 kV", "Class C – 33 kV"],
    exploreLink: "/products/auto-glow-reflective-band-insulating-mats",
    overviewText:
      "Auto-Glow and Reflective Band insulating mats are two distinct variants that enhance visibility around electrical equipment in different lighting conditions. The Auto-Glow variant uses a photoluminescent strip that stores ambient light and emits it during low-light or power-loss conditions, guiding personnel toward safe zones. The Reflective Band variant uses a reflective strip that returns light from external sources (torch beams, emergency lighting) to clearly define the mat boundary when illuminated. Both variants maintain full IS 15652 electrical insulation performance. Note: the reflective band does not glow independently — it only becomes visible when light is directed at it.",
    benefits: [
      "Auto-Glow: photoluminescent boundary visible during power-loss and low-light conditions",
      "Reflective Band: reflective boundary visible when illuminated by torches or emergency lighting",
      "Auto-Glow provides safety-zone guidance without external light source",
      "Reflective Band provides clear area definition under normal and emergency lighting",
      "Full IS 15652 dielectric protection maintained in both variants",
    ],
    galleryImages: [
      { slotId: "PRODUCT-AGRIM-GALLERY-01", src: "/media/products/auto-glow-reflective-band/photo-05.webp", alt: "Auto-glow / reflective band insulating mat photographed in normal lighting" },
      { slotId: "PRODUCT-AGRIM-LOWLIGHT-01", src: "/media/products/auto-glow-reflective-band/photo-02.webp", alt: "The same mat photographed in low light, with the auto-glow band emitting green light and the IS 15652 class marking visible" },
      { slotId: "PRODUCT-AGRIM-GALLERY-02", src: "/media/products/auto-glow-reflective-band/photo-06.webp", alt: "Auto-glow / reflective band insulating mat, alternative view" },
      { slotId: "PRODUCT-AGRIM-GALLERY-03", src: "/media/products/auto-glow-reflective-band/photo-03.webp", alt: "Close view of the auto-glow band against the mat surface" },
    ],
    insulationClasses: [
      {
        productCode: "BES1001",
        classLetter: "A",
        thickness: "2.0 mm",
        workingVoltage: "3.3 kV",
        proofVoltage: "10.0 kV",
        dielectricStrength: "30.0 kV",
      },
      {
        productCode: "BES1002",
        classLetter: "B",
        thickness: "2.5 mm",
        workingVoltage: "11.0 kV",
        proofVoltage: "22.0 kV",
        dielectricStrength: "45.0 kV",
      },
      {
        productCode: "BES1003",
        classLetter: "C",
        thickness: "3.0 mm",
        workingVoltage: "33.0 kV",
        proofVoltage: "36.0 kV",
        dielectricStrength: "65.0 kV",
      },
    ],
    thicknessRange: "2.0 – 3.0 mm",
    matApplications: [
      "Substations with emergency-egress requirements",
      "Low-light industrial environments",
      "Power utility switchyards with visibility needs",
      "Transformer rooms requiring emergency guidance",
      "Industrial control areas where safety zone visibility is critical",
    ],
    matMaterialProperties: [
      { label: "Material", value: "Elastomer free from insertion" },
      { label: "Anti-skid designs", value: "Coin, dot and hexa patterns" },
      { label: "Tensile strength", value: "15 N/mm² minimum" },
      { label: "Elongation at break", value: "250% minimum" },
      { label: "Leakage current", value: "10 mA maximum" },
      { label: "Insulation resistance with water", value: "100,000 MΩ minimum at 500 V" },
      { label: "Flame retardance", value: "Extinguishes within 5 seconds maximum" },
      { label: "Working temperature", value: "−10 °C to 55 °C" },
    ],
    matDimensions: {
      standardWidth: "1 metre",
      standardLengths: ["10 metres", "20 metres"],
      thicknesses: ["2 mm", "2.5 mm", "3 mm"],
      customLength: "Custom length as approved",
      standardColours: ["Black", "Blue"],
    },
    matDownloads: [],
  },

  /* ─── 5. BharatMembrane ─── */
  {
    slug: "bharat-membrane",
    name: "BharatMembrane",
    shortName: "BharatMembrane",
    description:
      "PVC geo-membrane for tunnel waterproofing, containment and barrier protection.",
    detailCopy:
      "BharatMembrane is a premium range of PVC geo-membranes developed by Bharat Electrosafe for tunnel waterproofing, containment and barrier protection in civil and environmental engineering applications. Manufactured using high-grade PVC polymers, it is engineered for chemical resistance, UV stability and mechanical strength, and is seamable by thermal welding for leak-proof joints. BIS approved to IS 15909:2020.",
    image: "/media/products/bharat-membrane/hero.webp",
    standards: ["IS 15909:2020"],
    features: [
      "High-quality PVC geo-membrane",
      "Excellent puncture and tear resistance",
      "High resistance to UV radiation, chemicals and weathering",
      "Seamable using thermal welding techniques for secure joints",
      "Available in 1 mm to 5 mm thicknesses and project-specific roll sizes",
      "BIS approved (IS 15909:2020), with compliance to BS, EN and international standards",
    ],
    systemGroup: "civil-protection",
    systemIndex: "05",
    variants: ["1 mm", "1.5 mm", "2 mm", "2.5 mm", "3 mm", "Up to 5 mm"],
    exploreLink: "/products/bharat-membrane",
    overviewText:
      "BharatMembrane is a PVC geo-membrane manufactured to IS 15909:2020, developed for tunnel waterproofing, containment and barrier protection in civil and environmental engineering. Manufactured from high-grade PVC polymers, it is used in tunnel and basement waterproofing, landfill and hazardous-waste containment, water reservoirs, canals and ponds, mining and ash-dyke lining, industrial effluent ponds, and aquaculture and agricultural lining. Roll sizes and thicknesses are supplied to suit project requirements.",
    benefits: [
      "Excellent puncture and tear resistance for demanding site conditions",
      "Available in thicknesses from 1 mm to 5 mm to suit project requirements",
      "High resistance to UV radiation, chemicals and weathering",
      "Thermally weldable seams for continuous, leak-proof installation",
      "Manufactured under ISO-certified processes at Bharat Electrosafe facilities",
    ],
    galleryImages: [
      { slotId: "PRODUCT-BM-GALLERY-01", src: "/media/products/bharat-membrane/gallery-01.webp", alt: "BharatMembrane PVC geo-membrane material" },
      { slotId: "PRODUCT-BM-GALLERY-02", src: "/media/products/bharat-membrane/gallery-02.webp", alt: "BharatMembrane PVC geo-membrane, surface view" },
      { slotId: "PRODUCT-BM-GALLERY-03", src: "/media/products/bharat-membrane/gallery-03.webp", alt: "BharatMembrane PVC geo-membrane roll" },
      { slotId: "PRODUCT-BM-GALLERY-04", src: "/media/products/bharat-membrane/gallery-04.webp", alt: "BharatMembrane PVC geo-membrane, alternative view" },
    ],
    // NO insulationClasses, NO workingVoltage, NO proofVoltage, NO dielectricStrength
    heroImageAlt: "BharatMembrane PVC geo-membrane product image",
    standardsNarrative:
      "BharatMembrane is BIS approved to IS 15909:2020 and manufactured from high-grade PVC polymers, with compliance to BS, EN and international standards. It is produced under ISO-certified processes at Bharat Electrosafe facilities and backed by in-house and third-party quality testing.",
    propertiesCaption:
      "Material characteristics as published for BharatMembrane PVC geo-membrane.",
    propertiesTableSummary:
      "Material and physical properties for BharatMembrane per IS 15909:2020",
    variantOptionsTitle: "Available thicknesses",
    engineeredNotesTitle: "Installation",
    enquiryBlurb:
      "Contact our technical team for project-specific guidance, thickness recommendations and delivery information for BharatMembrane.",
    // Thicknesses as published by the client. Application labels are
    // deliberately not asserted per thickness — selection is project-specific.
    variantOptions: [
      { thickness: "1 mm", label: "Available" },
      { thickness: "1.5 mm", label: "Available" },
      { thickness: "2 mm", label: "Available" },
      { thickness: "2.5 mm", label: "Available" },
      { thickness: "3 mm", label: "Available" },
      { thickness: "Up to 5 mm", label: "Available" },
    ],
    engineeredApplications: [
      "Tunnel and basement waterproofing",
      "Landfills and hazardous waste containment",
      "Water reservoirs, canals and ponds",
      "Mining and ash dyke lining",
      "Industrial effluent ponds",
      "Aquaculture and agriculture lining",
    ],
    // Only properties confirmed by the client's published product page are listed.
    // Numeric values (density, tensile, puncture) require the BharatMembrane
    // technical datasheet before publication — see docs/CONTENT_VERIFICATION.md.
    engineeredProperties: [
      { label: "Material", value: "High-grade PVC polymer" },
      { label: "Standard", value: "IS 15909:2020 (BIS approved)" },
      { label: "Thickness range", value: "1 mm to 5 mm" },
      { label: "Chemical resistance", value: "High resistance to chemicals and weathering" },
      { label: "UV resistance", value: "High resistance to UV radiation" },
      { label: "Jointing", value: "Seamable by thermal welding" },
    ],
    engineeredNotes: [
      "Seams joined using thermal welding techniques for secure, leak-proof joints",
      "Roll sizes and thicknesses supplied to suit project requirements",
      "Custom fabrication available",
      "Backed by in-house and third-party quality testing",
    ],
    engineeredDownloads: [],
  },

  /* ─── 6. BharatHydro Seal ───
     Content transcribed from the client's published BharatHydro-Seal.php
     page. No profile dimensions, tensile figures or pressure ratings are
     stated there, and no datasheet was supplied in the asset archive, so
     none are published here. See docs/CLIENT_VERIFICATION_REQUIRED.md. */
  {
    slug: "bharat-hydro-seal",
    name: "BharatHydro Seal",
    shortName: "BharatHydro Seal",
    description:
      "PVC and rubber water stop seals that block water passage through construction and expansion joints.",
    detailCopy:
      "BharatHydro Seal is a range of water stop sealing solutions engineered to prevent the passage of water through construction and expansion joints in concrete structures. Manufactured from high-quality PVC and rubber compounds, it offers resistance to water pressure, chemicals and environmental stress. Conforming to IS 15058-2002.",
    image: "/media/products/bharat-hydro-seal/hero.webp",
    standards: ["IS 15058-2002"],
    features: [
      "Superior water-tight sealing",
      "High tensile strength and flexibility",
      "Resistant to chemicals, corrosion and weather conditions",
      "Easy installation and long service life",
      "Suitable for high-pressure water retention structures",
    ],
    systemGroup: "civil-protection",
    systemIndex: "06",
    variants: ["Construction joints", "Expansion joints"],
    exploreLink: "/products/bharat-hydro-seal",
    overviewText:
      "BharatHydro Seal is a range of water stop solutions manufactured to IS 15058-2002, designed to ensure protection against water leakage at construction joints. The seals are engineered to prevent the passage of water through construction and expansion joints in concrete structures, and are manufactured from high-quality PVC and rubber compounds that resist water pressure, chemicals and environmental stress.",
    benefits: [
      "Prevents water passage through construction and expansion joints",
      "High tensile strength combined with the flexibility joints require",
      "Resistant to chemicals, corrosion and weather exposure",
      "Straightforward installation and long service life",
      "Suitable for high-pressure water retention structures",
    ],
    galleryImages: [
      { slotId: "PRODUCT-BHS-GALLERY-01", src: "/media/products/bharat-hydro-seal/hero.webp", alt: "BharatHydro Seal water stop, showing the ribbed profile and central bulb" },
      { slotId: "PRODUCT-BHS-GALLERY-02", src: "/media/products/bharat-hydro-seal/gallery-01.webp", alt: "BharatHydro Seal water stop profile, alternative view" },
    ],
    heroImageAlt: "BharatHydro Seal water stop, showing the ribbed profile and central bulb",
    standardsNarrative:
      "BharatHydro Seal conforms to IS 15058-2002 and is manufactured from high-quality PVC and rubber compounds under Bharat Electrosafe's ISO 9001:2015 certified quality management system.",
    propertiesCaption:
      "Material characteristics as published for BharatHydro Seal water stops.",
    propertiesTableSummary: "Material properties for BharatHydro Seal per IS 15058-2002",
    engineeredProperties: [
      { label: "Material", value: "High-quality PVC and rubber compounds" },
      { label: "Standard", value: "IS 15058-2002" },
      { label: "Sealing", value: "Water-tight at construction and expansion joints" },
      { label: "Mechanical", value: "High tensile strength and flexibility" },
      { label: "Chemical resistance", value: "Resistant to chemicals and corrosion" },
      { label: "Weathering", value: "Resistant to environmental and weather exposure" },
    ],
    engineeredApplications: [
      "Water tanks and reservoirs",
      "Dams and canals",
      "Sewage treatment plants",
      "Basements and underground structures",
      "Swimming pools and tunnels",
    ],
    engineeredNotesTitle: "Selection and installation",
    engineeredNotes: [
      "Supplied for both construction joints and expansion joints",
      "Profile and size selected to suit the joint detail and project requirement",
      "Designed for straightforward on-site installation",
    ],
    engineeredDownloads: [],
    enquiryBlurb:
      "Contact our technical team for joint details, profile selection and delivery information for BharatHydro Seal.",
  },
];

// ── Helper: Get product by slug ──
export function getProductBySlug(slug: ProductSlug): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// ── Helper: Get products by system group ──
export function getProductsBySystem(
  system: "electrical-insulation" | "visible-safety" | "civil-protection"
): Product[] {
  return products.filter((p) => p.systemGroup === system);
}

// ── Helper: Is this a mat product (has insulation classes)? ──
export function isMatProduct(product: Product): boolean {
  return product.insulationClasses !== undefined;
}

/** True for products rendered by EngineeredProductLayout rather than the
 *  voltage-class mat layout — i.e. anything without IS 15652 classes. */
export function isEngineeredProduct(product: Product): boolean {
  return product.insulationClasses === undefined;
}

// ── Helper: Get other products (for related products section) ──
export function getOtherProducts(currentSlug: ProductSlug): Product[] {
  return products.filter((p) => p.slug !== currentSlug);
}

// ── Insulation class summary table (for ProductSelection / Class cards) ──
export interface ClassCardData {
  classLetter: "A" | "B" | "C";
  workingVoltage: string;
  thickness: string;
  description: string;
}

export const classCardData: ClassCardData[] = [
  {
    classLetter: "A",
    workingVoltage: "3.3 kV",
    thickness: "2.0 mm",
    description: "Low-voltage distribution panels and switchgear.",
  },
  {
    classLetter: "B",
    workingVoltage: "11 kV",
    thickness: "2.5 mm",
    description: "Medium-voltage substations and transformer rooms.",
  },
  {
    classLetter: "C",
    workingVoltage: "33 kV",
    thickness: "3.0 mm",
    description: "High-voltage switchyards and generating stations.",
  },
];

// ── System Groups ──
export interface SystemGroup {
  id: string;
  name: string;
  shortName: string;
  description: string;
}

export const systemGroups: SystemGroup[] = [
  {
    id: "electrical-insulation",
    name: "Electrical Insulation",
    shortName: "Insulating Mats",
    description: "Insulating mats selected by operating voltage.",
  },
  {
    id: "visible-safety",
    name: "Visible Safety",
    shortName: "Safety Variants",
    description:
      "Electrical protection with clearer visual guidance — coloured strip, bi-colour and auto-glow / reflective.",
  },
  {
    id: "civil-protection",
    name: "Civil Protection",
    shortName: "Waterproofing & Sealing",
    description:
      "Engineered waterproofing, containment and joint sealing for civil infrastructure.",
  },
];

/* ────────────────────────────────────────────────────────────────
   Backward-Compatible Exports
   Existing components import `productSystems`, `insulationClasses`,
   `ProductSystem`, and `InsulationClass` — these aliases bridge
   the old API to the new data model until components are updated
   in later phases.
   ──────────────────────────────────────────────────────────────── */

// ── Old ProductSystem interface (backward compat) ──
export interface ProductSystem {
  id: string;
  index: string;
  name: string;
  shortName: string;
  description: string;
  detailCopy: string;
  image: string;
  variants: string[];
  exploreLink: string;
  features: string[];
  standards: string[];
}

// ── Map 3 system groups → old ProductSystem shape ──
export const productSystems: ProductSystem[] = systemGroups.map((g, i) => {
  const groupProducts = getProductsBySystem(
    g.id as "electrical-insulation" | "visible-safety" | "civil-protection"
  );
  const primary = groupProducts[0];
  return {
    id: g.id,
    index: `${i + 1}`.padStart(2, "0"),
    name: g.name,
    shortName: g.shortName,
    description: g.description,
    detailCopy: primary?.detailCopy ?? g.description,
    image: primary?.image ?? "/images/electrical-insulation.png",
    variants: groupProducts.map((p) => p.shortName),
    exploreLink: `#${g.id}`,
    features: primary?.features ?? [],
    standards: primary?.standards ?? [],
  };
});

// ── Old InsulationClass interface (backward compat) ──
export interface InsulationClass {
  className: string;
  voltage: string;
  voltageUnit: string;
  thickness: string;
  thicknessUnit: string;
  description: string;
}

// ── Map classCardData → old InsulationClass shape ──
export const insulationClasses: InsulationClass[] = classCardData.map((c) => ({
  className: c.classLetter,
  voltage: c.workingVoltage.replace(" kV", ""),
  voltageUnit: "kV",
  thickness: c.thickness.replace(" mm", ""),
  thicknessUnit: "mm",
  description: c.description,
}));
