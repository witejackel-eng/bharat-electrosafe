/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Product Data Model
   ──────────────────────────────────────────────────────────────── */

// ── Product Slug Union Type ──
export type ProductSlug =
  | "electrical-insulating-mats"
  | "coloured-strip-insulating-mats"
  | "bi-colour-insulating-mats"
  | "auto-glow-reflective-band-insulating-mats"
  | "bharatmembrane";

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

  // ── Membrane-specific fields (only for BharatMembrane) ──
  /** Available thickness options — null for mat products */
  membraneThicknessOptions?: MembraneThicknessOption[];
  /** BharatMembrane-specific applications */
  membraneApplications?: string[];
  /** Physical properties for BharatMembrane */
  membranePhysicalProperties?: MaterialProperty[];
  /** Installation / welding notes for BharatMembrane */
  membraneInstallationNotes?: string[];
  /** Downloads and documents for BharatMembrane */
  membraneDownloads?: ProductDownload[];
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
    image: "/images/electrical-insulation.png",
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
      { src: "/images/products/electrical-insulating-mats/hero.jpg", alt: "Electrical insulating mats laid in front of a substation control panel" },
      { src: "/images/products/electrical-insulating-mats/class-a.jpg", alt: "Class A 2.0 mm insulating mat with anti-skid surface" },
      { src: "/images/products/electrical-insulating-mats/class-b.jpg", alt: "Class B 2.5 mm insulating mat with embossed voltage marking" },
      { src: "/images/products/electrical-insulating-mats/class-c.jpg", alt: "Class C 3.0 mm insulating mat in a high-voltage switchyard" },
      { src: "/images/products/electrical-insulating-mats/anti-skid.jpg", alt: "Close-up of coin-pattern anti-skid surface design" },
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
    matDownloads: [
      { label: "Product Datasheet", fileName: "electrical-insulating-mats-datasheet.pdf", type: "datasheet" },
      { label: "BIS Licence — IS 15652", fileName: "bis-licence-is15652.pdf", type: "certificate" },
      { label: "Dielectric Test Report", fileName: "dielectric-test-report.pdf", type: "test-report" },
    ],
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
    image: "/images/visible-safety.png",
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
    variants: [
      "Class A – 3.3 kV (Coloured Strip)",
      "Class B – 11 kV (Coloured Strip)",
      "Class C – 33 kV (Coloured Strip)",
    ],
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
      { src: "/images/products/coloured-strip-insulating-mats/hero.jpg", alt: "Coloured strip insulating mat with yellow hazard band in a control room" },
      { src: "/images/products/coloured-strip-insulating-mats/strip-detail.jpg", alt: "Close-up of coloured strip band integrated into the mat surface" },
      { src: "/images/products/coloured-strip-insulating-mats/installed.jpg", alt: "Coloured strip mat installed in a substation walkway" },
      { src: "/images/products/coloured-strip-insulating-mats/panel-area.jpg", alt: "Coloured strip mat laid around an electrical panel" },
    ],
    insulationClasses: [
      {
        productCode: "BES1001-CS",
        classLetter: "A",
        thickness: "2.0 mm",
        workingVoltage: "3.3 kV",
        proofVoltage: "10.0 kV",
        dielectricStrength: "30.0 kV",
      },
      {
        productCode: "BES1002-CS",
        classLetter: "B",
        thickness: "2.5 mm",
        workingVoltage: "11.0 kV",
        proofVoltage: "22.0 kV",
        dielectricStrength: "45.0 kV",
      },
      {
        productCode: "BES1003-CS",
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
    matDownloads: [
      { label: "Product Datasheet", fileName: "coloured-strip-insulating-mats-datasheet.pdf", type: "datasheet" },
      { label: "BIS Licence — IS 15652", fileName: "bis-licence-is15652.pdf", type: "certificate" },
    ],
  },

  /* ─── 3. Bi-Color Insulating Mats ─── */
  {
    slug: "bi-colour-insulating-mats",
    name: "Bi-Color Insulating Mats",
    shortName: "Bi-Color Mats",
    description:
      "Two-tone insulating mats for clear safety zone delineation in high-traffic areas.",
    detailCopy:
      "Bi-color insulating mats feature two distinct colour zones on the mat surface, providing clear safety zone delineation in high-traffic industrial areas. Each colour zone communicates a different safety message — e.g. safe approach zone versus danger boundary — while the mat maintains full IS 15652 electrical insulation performance for the designated voltage class.",
    image: "/images/visible-safety.png",
    standards: ["IS 15652:2006", "IEC 61111"],
    features: [
      "Two distinct colour zones for clear delineation",
      "Same electrical insulation as standard Class A/B/C mats",
      "Durable rubber base with wear-resistant bi-colour surface",
      "Customisable bi-colour combinations",
      "Suitable for high-traffic industrial floors",
      "Permanent embossed class and voltage marking",
    ],
    systemGroup: "visible-safety",
    systemIndex: "03",
    variants: [
      "Class A – 3.3 kV (Bi-Color)",
      "Class B – 11 kV (Bi-Color)",
      "Class C – 33 kV (Bi-Color)",
    ],
    exploreLink: "/products/bi-color-insulating-mats",
    overviewText:
      "Bi-color insulating mats use a dual-layer surface construction where the contrasting upper layer can help make excessive wear, cuts or surface damage more visible, supporting inspection and replacement decisions. This surface-wear indication is the primary functional advantage over single-colour mats: when the upper colour layer is compromised, the underlying colour is revealed, providing a visual signal that the mat may need replacement. Full electrical insulation performance under IS 15652 is maintained for the designated voltage class.",
    benefits: [
      "Contrasting upper layer makes excessive wear, cuts or surface damage more visible",
      "Surface-wear indication supports inspection and replacement decisions",
      "Dual-layer construction — upper colour reveals underlying colour when worn",
      "Available in multiple colour combinations for different environments",
      "Full IS 15652 dielectric protection maintained",
    ],
    galleryImages: [
      { src: "/images/products/bi-color-insulating-mats/hero.jpg", alt: "Bi-color insulating mat showing two distinct colour zones" },
      { src: "/images/products/bi-color-insulating-mats/dual-layer.jpg", alt: "Close-up showing dual-layer construction and contrasting surface" },
      { src: "/images/products/bi-color-insulating-mats/wear-indication.jpg", alt: "Bi-color mat with visible wear revealing underlying colour layer" },
      { src: "/images/products/bi-color-insulating-mats/installed.jpg", alt: "Bi-color mat installed in an industrial corridor" },
    ],
    insulationClasses: [
      {
        productCode: "BES1001-BC",
        classLetter: "A",
        thickness: "2.0 mm",
        workingVoltage: "3.3 kV",
        proofVoltage: "10.0 kV",
        dielectricStrength: "30.0 kV",
      },
      {
        productCode: "BES1002-BC",
        classLetter: "B",
        thickness: "2.5 mm",
        workingVoltage: "11.0 kV",
        proofVoltage: "22.0 kV",
        dielectricStrength: "45.0 kV",
      },
      {
        productCode: "BES1003-BC",
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
    matDownloads: [
      { label: "Product Datasheet", fileName: "bi-color-insulating-mats-datasheet.pdf", type: "datasheet" },
      { label: "BIS Licence — IS 15652", fileName: "bis-licence-is15652.pdf", type: "certificate" },
    ],
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
    image: "/images/visible-safety.png",
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
    variants: [
      "Class A – 3.3 kV (Auto-Glow)",
      "Class B – 11 kV (Reflective Band)",
      "Class C – 33 kV (Auto-Glow / Reflective)",
    ],
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
      { src: "/images/products/auto-glow-reflective-band-insulating-mats/hero.jpg", alt: "Auto-glow reflective band insulating mat in a substation" },
      { src: "/images/products/auto-glow-reflective-band-insulating-mats/auto-glow.jpg", alt: "Auto-glow variant emitting stored light in a dark environment" },
      { src: "/images/products/auto-glow-reflective-band-insulating-mats/reflective-band.jpg", alt: "Reflective band variant illuminated by torch beam in a switchyard" },
      { src: "/images/products/auto-glow-reflective-band-insulating-mats/comparison.jpg", alt: "Comparison showing Auto-Glow and Reflective Band variants side by side" },
    ],
    insulationClasses: [
      {
        productCode: "BES1001-AG",
        classLetter: "A",
        thickness: "2.0 mm",
        workingVoltage: "3.3 kV",
        proofVoltage: "10.0 kV",
        dielectricStrength: "30.0 kV",
      },
      {
        productCode: "BES1002-RB",
        classLetter: "B",
        thickness: "2.5 mm",
        workingVoltage: "11.0 kV",
        proofVoltage: "22.0 kV",
        dielectricStrength: "45.0 kV",
      },
      {
        productCode: "BES1003-AGR",
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
    matDownloads: [
      { label: "Product Datasheet", fileName: "auto-glow-reflective-band-insulating-mats-datasheet.pdf", type: "datasheet" },
      { label: "BIS Licence — IS 15652", fileName: "bis-licence-is15652.pdf", type: "certificate" },
    ],
  },

  /* ─── 5. BharatMembrane ─── */
  {
    slug: "bharatmembrane",
    name: "BharatMembrane",
    shortName: "BharatMembrane",
    description:
      "HDPE geomembrane for containment, waterproofing and civil infrastructure protection.",
    detailCopy:
      "BharatMembrane is a high-density polyethylene (HDPE) geomembrane designed for containment, waterproofing and civil infrastructure protection. Available in thicknesses from 1 mm to 5 mm, BharatMembrane provides high puncture resistance, UV stabilisation for exposed applications, and chemical resistance for landfill and industrial containment. Manufactured to IS 15909:2020.",
    image: "/images/civil-protection.png",
    standards: ["IS 15909:2020"],
    features: [
      "HDPE geomembrane for containment and landfill lining",
      "High puncture and tear resistance",
      "UV stabilised for exposed applications",
      "Available in 1 mm to 5 mm thicknesses",
      "Chemical resistance for industrial containment",
      "Suitable for tunnel, basement and canal waterproofing",
    ],
    systemGroup: "civil-protection",
    systemIndex: "05",
    variants: [
      "1 mm — Light-duty waterproofing",
      "2 mm — Standard containment",
      "3 mm — Heavy-duty landfill lining",
      "4 mm — Industrial containment",
      "5 mm — Maximum puncture resistance",
    ],
    exploreLink: "/products/bharat-membrane",
    overviewText:
      "BharatMembrane is a high-density polyethylene (HDPE) geomembrane manufactured to IS 15909:2020. It is designed for containment, waterproofing and civil infrastructure protection. Available in thicknesses from 1 mm to 5 mm, BharatMembrane is used in tunnel waterproofing, basement waterproofing, landfill containment, reservoirs, canals, ponds, mining applications and other civil infrastructure projects where reliable barrier performance is required.",
    benefits: [
      "High puncture and tear resistance for demanding site conditions",
      "Available in thicknesses from 1 mm to 5 mm for different project requirements",
      "UV stabilised for exposed applications",
      "Chemical resistance suitable for landfill and industrial containment",
      "Weldable seams for continuous, leak-tight installations",
    ],
    galleryImages: [
      { src: "/images/products/bharat-membrane/hero.jpg", alt: "BharatMembrane HDPE geomembrane roll at a construction site" },
      { src: "/images/products/bharat-membrane/installation.jpg", alt: "BharatMembrane being installed for tunnel waterproofing" },
      { src: "/images/products/bharat-membrane/welding.jpg", alt: "Thermal welding of BharatMembrane seams" },
      { src: "/images/products/bharat-membrane/landfill.jpg", alt: "BharatMembrane laid in a landfill containment area" },
    ],
    // NO insulationClasses, NO workingVoltage, NO proofVoltage, NO dielectricStrength
    membraneThicknessOptions: [
      { thickness: "1 mm", label: "Light-duty waterproofing" },
      { thickness: "1.5 mm", label: "General-purpose waterproofing" },
      { thickness: "2 mm", label: "Standard containment" },
      { thickness: "2.5 mm", label: "Medium-duty containment" },
      { thickness: "3 mm", label: "Heavy-duty landfill lining" },
      { thickness: "5 mm", label: "Maximum puncture resistance" },
    ],
    membraneApplications: [
      "Tunnel waterproofing",
      "Basement waterproofing",
      "Landfill containment",
      "Reservoirs and ponds",
      "Canal lining",
      "Mining applications",
    ],
    membranePhysicalProperties: [
      { label: "Material", value: "High-density polyethylene (HDPE)" },
      { label: "Density", value: "≥ 0.940 g/cm³" },
      { label: "Carbon black content", value: "2–3% for UV stabilisation" },
      { label: "Tensile strength at yield", value: "Per IS 15909:2020 requirements" },
      { label: "Puncture resistance", value: "Per IS 15909:2020 requirements" },
      { label: " Tear resistance", value: "Per IS 15909:2020 requirements" },
    ],
    membraneInstallationNotes: [
      "Thermal welding (hot wedge or extrusion) for seam joining",
      "Seam testing by peel and shear methods per project specification",
      "Substrate preparation — smooth, free of sharp objects and debris",
      "Anchor trench required at perimeter to prevent wind uplift",
      "Overlap minimum 100 mm for welded seams",
    ],
    membraneDownloads: [
      { label: "Product Datasheet", fileName: "bharatmembrane-datasheet.pdf", type: "datasheet" },
      { label: "IS 15909:2020 Compliance", fileName: "is-15909-compliance.pdf", type: "certificate" },
    ],
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

// ── Helper: Is this BharatMembrane (has membrane fields)? ──
export function isMembraneProduct(product: Product): boolean {
  return product.membraneThicknessOptions !== undefined;
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
    shortName: "BharatMembrane",
    description: "Waterproofing and containment for civil infrastructure.",
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
