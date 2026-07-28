/**
 * Product Data — Bharat Electrosafe
 *
 * Comprehensive data definitions for all 6 product families.
 *
 * Every technical figure below is transcribed from the client's own product
 * pages on bharatelectrosafe.com. The four insulating-mat families share one
 * published specification table (IS 15652:2006, codes BES1001–BES1003), so
 * that table is defined once and reused rather than re-typed per product —
 * re-typing is how the old 650 V / 1100 V / 3300 V contradiction crept in.
 *
 * Nothing here may be strengthened beyond the source. Where the client
 * publishes no figure, no figure is invented.
 */

export interface QuickFact {
  icon: string;
  label: string;
  value: string;
}

export interface KeyBenefit {
  icon: string;
  text: string;
}

export interface SpecificationTable {
  headers: string[];
  rows: string[][];
}

export interface MaterialProperty {
  label: string;
  value: string;
}

export interface Dimension {
  label: string;
  value: string;
}

export interface Application {
  icon: string;
  name: string;
  description: string;
}

export type DocumentKind =
  | 'test-report'
  | 'certificate'
  | 'licence'
  | 'datasheet';

export interface Document {
  type: string;
  name: string;
  issuer: string;
  available: boolean;
  /** Local path under /public when a genuine document exists. */
  href?: string;
  /** Thumbnail image path for the document card preview. */
  thumbnail?: string;
  /** Discriminator controlling how the card renders its actions. */
  kind: DocumentKind;
}

/**
 * Real, locally-stored imagery for a product.
 *
 * Every path resolves to a file under /public/media/products. Components read
 * images from here rather than picking their own, so a product shows the same
 * photograph on the homepage card, its hero and any related-product tile.
 */
export interface ProductImages {
  /** Homepage card and related-product tile. */
  thumbnail: string;
  /** Main product-page hero. */
  hero: string;
  /** Supporting close-ups and alternate genuine views. */
  details: string[];
  /** Wider context shot used beside the overview copy. */
  overview?: string;
  /** Genuine in-situ installation photograph, where one exists. */
  application?: string;
  /**
   * Photographs taken in a real setting — installed, on the line, in a tunnel.
   * These fill their frame. Every other image is an isolated product shot and
   * is contained on white instead, so a coloured strip, a moulded marking or a
   * cut edge is never cropped away by the frame's aspect ratio.
   */
  contextual?: string[];
  /** Alt text, indexed by image path — never generic. */
  alt: Record<string, string>;
}

/**
 * Short trust statements rendered in the product hero strip.
 *
 * Per-product rather than global: the mat range is made under IS 15652:2006
 * and a BIS licence, the geo-membrane is not. Applying one array to every
 * product is how `IS 15652:2006 Certified` ended up on BharatMembrane.
 */
export const matTrustPoints: string[] = [
  'IS 15652:2006',
  'BIS Licence CM/L:8800129617',
  'ERDA / NTH tested',
  'Technical documentation available',
];

export const membraneTrustPoints: string[] = [
  'IS 15909:2020',
  'PVC geo-membrane',
  'Thermally welded seams',
  'Technical documentation available',
];

export type ProductCategory =
  | 'electrical-insulation'
  | 'waterproofing-civil-protection';

export interface ProductCategoryInfo {
  id: ProductCategory;
  displayName: string;
  selectionPurpose: string;
}

export const productCategories: Record<ProductCategory, ProductCategoryInfo> = {
  'electrical-insulation': {
    id: 'electrical-insulation',
    displayName: 'Electrical Insulation',
    selectionPurpose: 'Operator protection near live electrical equipment',
  },
  'waterproofing-civil-protection': {
    id: 'waterproofing-civil-protection',
    displayName: 'Waterproofing and Civil Protection',
    selectionPurpose: 'Waterproofing, containment and construction-joint sealing',
  },
};

export interface ProductData {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  images: ProductImages;
  /** Statements safe to show for this product specifically. */
  trustPoints: string[];
  description: string;
  introduction: string;
  badges: string[];
  quickFacts: QuickFact[];
  overviewText: string;
  keyBenefits: KeyBenefit[];
  specifications: SpecificationTable;
  materialProperties: MaterialProperty[];
  dimensions: Dimension[];
  colors: string[];
  surfacePatterns: string[];
  installation: string[];
  applications: Application[];
  documents: Document[];
  relatedProducts: string[];
  classType?: 'A' | 'B' | 'C' | 'all' | 'membrane';
  hasDatasheet?: boolean;
}

/* ────────────────────────────────────────────
   Shared insulating-mat technical data

   Published identically on all four mat pages of the source site. Defined
   once so the four products cannot drift apart.
   ──────────────────────────────────────────── */

const matSpecifications: SpecificationTable = {
  headers: [
    'Product Code',
    'Class',
    'Thickness',
    'Working Voltage',
    'AC Proof Voltage',
    'Dielectric Strength',
  ],
  rows: [
    ['BES1001', 'A', '2.0 mm', '3.3 kV', '10.0 kV', '30.0 kV'],
    ['BES1002', 'B', '2.5 mm', '11.0 kV', '22.0 kV', '45.0 kV'],
    ['BES1003', 'C', '3.0 mm', '33.0 kV', '36.0 kV', '65.0 kV'],
  ],
};

const matMaterialProperties: MaterialProperty[] = [
  {
    label: 'Material Composition',
    value:
      'Elastomer free from any insertion — typically a combination of PVC and synthetic rubber polymers',
  },
  { label: 'Anti-skid Design', value: 'Coin, Dot, Hexa' },
  { label: 'Tensile Strength (T.S.)', value: '15 N/mm² (min.)' },
  { label: 'Elongation at Break (E.B.)', value: '250% (min.)' },
  { label: 'Leakage Current', value: '10 mA (max.)' },
  {
    label: 'Insulation Resistance with Water',
    value: '100,000 MΩ (min.) when tested at 500 V',
  },
  { label: 'Flame Retardance', value: 'Extinguishes within 5 seconds (max.)' },
  {
    label: 'Ageing Properties at 70 ± 1 °C for 168 hours',
    value: 'T.S. and E.B. not less than 75% of original value',
  },
  {
    label: 'Acid, Alkali and Oil Resistance',
    value: 'T.S. and E.B. not less than 80% of original value',
  },
  { label: 'Working Temperature', value: '−10 °C to 55 °C' },
];

const matDimensions: Dimension[] = [
  {
    label: 'Standard Size',
    value: '1.0 m wide × 10.0 m or 20 m long, in 2.0 mm, 2.5 mm and 3.0 mm',
  },
  { label: 'Custom Size', value: '1.0 m wide × length as per customer requirement' },
  { label: 'Standard Colour', value: 'Black and blue, without metallic derivatives' },
  {
    label: 'Fixing at Site',
    value: 'Site fixing undertaken along with materials, subject to minimum criteria',
  },
];

const matInstallation: string[] = [
  'Confirm the insulation class required for the working voltage at the installation',
  'Clean and dry the floor before laying the mat',
  'Cut to size from the 1.0 m wide roll — custom lengths are supplied to requirement',
  'Lay flat with no wrinkles or air pockets, butt-joining adjacent sections tightly',
  'Site fixing can be undertaken by Bharat Electrosafe along with the material, subject to minimum criteria',
  'Inspect regularly for cuts, wear or embedded conductive debris',
];

/** Documents published on the source site. `available: false` means the client
 *  has not released a public file for that item — the UI shows the label
 *  without a download control rather than inventing one. */
const matDocuments: Document[] = [
  {
    type: 'Test report',
    name: 'ERDA test report — 2.5 mm insulating mat',
    issuer: 'ERDA',
    available: true,
    href: '/documents/certifications/erda-test-report-2-5mm.pdf',
    thumbnail: '/images/documents/doc-test-report.webp',
    kind: 'test-report',
  },
  {
    type: 'Certificate',
    name: 'ISO 9001:2015 — Quality Management System',
    issuer: 'Certification body',
    available: true,
    href: '/documents/certifications/iso-9001-2015-qms.pdf',
    thumbnail: '/images/documents/doc-certificate.webp',
    kind: 'certificate',
  },
  {
    type: 'Licence',
    name: 'BIS Licence CM/L:8800129617 — IS 15652:2006',
    issuer: 'Bureau of Indian Standards',
    available: false,
    thumbnail: '/images/documents/doc-licence.webp',
    kind: 'licence',
  },
  {
    type: 'Datasheet',
    name: 'Product datasheet — available on request',
    issuer: 'Bharat Electrosafe',
    available: false,
    thumbnail: '/images/documents/doc-datasheet.webp',
    kind: 'datasheet',
  },
];

/* ────────────────────────────────────────────
   Product 1: Electrical Insulating Mats
   ──────────────────────────────────────────── */

const EIM = '/media/products/electrical-insulating-mats';

const electricalInsulatingMats: ProductData = {
  slug: 'electrical-insulating-mats',
  name: 'Electrical Insulating Mats',
  shortName: 'EIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: `${EIM}/product-01.webp`,
    hero: `${EIM}/product-02.webp`,
    details: [
      `${EIM}/product-03.webp`,
      `${EIM}/product-04.webp`,
      `${EIM}/product-05.webp`,
      `${EIM}/product-06.webp`,
      `${EIM}/product-07.webp`,
      `${EIM}/product-08.webp`,
    ],
    overview: `${EIM}/product-01.webp`,
    contextual: [`${EIM}/product-04.webp`, `${EIM}/product-07.webp`],
    alt: {
      [`${EIM}/product-01.webp`]:
        'Electrical insulating mat — Class A showing anti-skid coin pattern surface',
      [`${EIM}/product-02.webp`]:
        'Electrical insulating mat — Class B blue coin-pattern with IS 15652:2006 marking',
      [`${EIM}/product-03.webp`]:
        'Electrical insulating mat roll showing textured anti-skid surface pattern',
      [`${EIM}/product-04.webp`]:
        'Electrical insulating mat in substation installation with control panels',
      [`${EIM}/product-05.webp`]:
        'Electrical insulating mat sample showing coin-pattern anti-skid texture',
      [`${EIM}/product-06.webp`]:
        'Electrical insulating mat with ISI marking and BIS certification details',
      [`${EIM}/product-07.webp`]:
        'Electrical insulating mat installed in front of high-voltage switchgear',
      [`${EIM}/product-08.webp`]:
        'Electrical insulating mat roll with dot-pattern anti-skid surface',
    },
  },
  trustPoints: matTrustPoints,
  description:
    'Class A, B and C electrical insulating mats manufactured for IS 15652:2006 requirements, under BIS Licence CM/L:8800129617, for control panels, substations and industrial floors.',
  introduction:
    'Bharat Electrosafe Electrical Insulating Mats are manufactured for IS 15652:2006 requirements under BIS Licence CM/L:8800129617. Class A, Class B and Class C cover working voltages of 3.3 kV, 11 kV and 33 kV respectively, giving operators an insulating barrier at floor level around AC and DC control panels, substations and switchrooms. Every metre carries the ISI marking, and the range is supported by ERDA / NTH test documentation.',
  badges: ['IS 15652:2006', 'CM/L:8800129617', 'Class A / B / C', 'ISI marked'],
  quickFacts: [
    { icon: 'zap', label: 'Working voltage', value: '3.3 kV – 33 kV' },
    { icon: 'ruler', label: 'Thickness', value: '2.0 – 3.0 mm' },
    { icon: 'award', label: 'Standard', value: 'IS 15652:2006' },
  ],
  overviewText:
    'Engineered to meet IS 15652:2006, these mats create a reliable insulating barrier between the operator and the floor in high-voltage environments. The elastomer compound is free from any insertion and resists water, oil and chemical exposure, while coin, dot and hexa anti-skid surfaces keep footing secure. Mats are supplied 1.0 m wide in 10 m and 20 m rolls, or cut to a length you specify, in black and blue without metallic derivatives.',
  keyBenefits: [
    {
      icon: 'shield',
      text: 'High dielectric strength — 30 kV, 45 kV and 65 kV for Classes A, B and C',
    },
    {
      icon: 'layers',
      text: 'Three thickness options — 2.0 mm, 2.5 mm and 3.0 mm — to suit the working voltage',
    },
    {
      icon: 'grip',
      text: 'Coin, dot and hexa anti-skid surfaces for stable footing',
    },
    {
      icon: 'flame',
      text: 'Flame retardant — extinguishes within 5 seconds — and resistant to water, oil and chemicals',
    },
    {
      icon: 'badge-check',
      text: 'ISI marking on every metre, with ERDA / NTH test documentation',
    },
  ],
  specifications: matSpecifications,
  materialProperties: matMaterialProperties,
  dimensions: matDimensions,
  colors: ['Black', 'Blue'],
  surfacePatterns: ['Coin', 'Dot', 'Hexa'],
  installation: matInstallation,
  applications: [
    {
      icon: 'panel-top',
      name: 'AC & DC Control Panels',
      description: 'Insulation for operators working at live control and switchgear panels',
    },
    {
      icon: 'factory',
      name: 'Substations',
      description: 'Floor-level protection in power generation and distribution substations',
    },
    {
      icon: 'door-open',
      name: 'Switchrooms',
      description: 'Safe operating zones inside electrical switchrooms',
    },
    {
      icon: 'plug',
      name: 'Power Utilities',
      description: 'Protection during utility maintenance and repair work',
    },
    {
      icon: 'hard-hat',
      name: 'Industrial Floors',
      description: 'General floor insulation on plant floors with live equipment',
    },
  ],
  documents: matDocuments,
  relatedProducts: [
    'coloured-strip-insulating-mats',
    'bi-color-insulating-mats',
    'auto-glow-reflective-band-insulating-mats',
  ],
  classType: 'all',
  hasDatasheet: false,
};

/* ────────────────────────────────────────────
   Product 2: Coloured Strip Insulating Mats
   ──────────────────────────────────────────── */

const CSIM = '/media/products/coloured-strip-insulating-mats';

const colouredStripInsulatingMats: ProductData = {
  slug: 'coloured-strip-insulating-mats',
  name: 'Coloured Strip Insulating Mats',
  shortName: 'CSIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: `${CSIM}/product-02.webp`,
    hero: `${CSIM}/product-04.webp`,
    details: [
      `${CSIM}/product-03.webp`,
      `${CSIM}/product-05.webp`,
      `${CSIM}/product-demo.webp`,
    ],
    overview: `${CSIM}/product-02.webp`,
    application: `${CSIM}/product-demo.webp`,
    contextual: [`${CSIM}/product-demo.webp`],
    alt: {
      [`${CSIM}/product-02.webp`]:
        'Coloured strip insulating mat with yellow marking strip on anti-skid surface',
      [`${CSIM}/product-04.webp`]:
        'Coloured strip insulating mat showing yellow strip boundary marking on blue mat',
      [`${CSIM}/product-03.webp`]:
        'Coloured strip insulating mat with yellow strip across the mat surface',
      [`${CSIM}/product-05.webp`]:
        'Coloured strip insulating mat sample with yellow strip detail',
      [`${CSIM}/product-demo.webp`]:
        'Coloured strip insulating mat demonstration showing the yellow strip boundary in a real installation',
    },
  },
  trustPoints: matTrustPoints,
  description:
    'IS 15652:2006 insulating mats with a high-visibility yellow strip that marks safe pathways and hazard-zone boundaries around live electrical installations.',
  introduction:
    'Clear demarcation of hazardous zones is essential in preventing accidents. Coloured Strip Insulating Mats are manufactured for IS 15652:2006 requirements under BIS Licence CM/L:8800129617, with bold coloured markings that act as visual guides — creating safe pathways around high-risk electrical installations while delivering the same Class A, B and C insulation as the standard range.',
  badges: ['IS 15652:2006', 'CM/L:8800129617', 'Boundary marking', 'ISI marked'],
  quickFacts: [
    { icon: 'palette', label: 'Marking', value: 'High-visibility strip' },
    { icon: 'zap', label: 'Working Voltage', value: '3.3 kV – 33 kV' },
    { icon: 'route', label: 'Purpose', value: 'Hazard zone marking' },
  ],
  overviewText:
    'A vivid strip provides immediate visual cues for navigating safely around electrical panels and machinery. The strip is built into the same elastomer body as the standard mat, so demarcation costs nothing in insulation performance: anti-slip texturing keeps footing stable in high-traffic areas, and the compound resists moisture, oil and corrosive chemicals. Thickness is selected to match the working voltage, exactly as for the standard range.',
  keyBenefits: [
    {
      icon: 'eye',
      text: 'High-visibility markings give immediate visual cues around panels and machinery',
    },
    {
      icon: 'layers',
      text: 'Thickness selected to match the voltage application — 2.0 mm, 2.5 mm or 3.0 mm',
    },
    {
      icon: 'grip',
      text: 'Anti-slip texture holds footing in high-traffic industrial areas',
    },
    {
      icon: 'droplets',
      text: 'Elastomeric compound resists moisture, oil and corrosive chemicals',
    },
    {
      icon: 'flame',
      text: 'Flame retardant, adding a further layer of protection',
    },
  ],
  specifications: matSpecifications,
  materialProperties: matMaterialProperties,
  dimensions: matDimensions,
  colors: ['Black with yellow strip', 'Blue with yellow strip'],
  surfacePatterns: ['Coin', 'Dot', 'Hexa'],
  installation: [
    'Plan the strip layout so markings follow the hazard-zone boundary or walkway edge',
    'Cut to length from the 1.0 m wide roll, keeping the strip continuous along the run',
    'Clean and dry the floor before laying',
    'Butt-join adjacent sections so the strip line reads unbroken',
    'Site fixing can be undertaken by Bharat Electrosafe along with the material, subject to minimum criteria',
    'Inspect regularly for wear and for loss of strip visibility',
  ],
  applications: [
    {
      icon: 'triangle-alert',
      name: 'Hazard Zone Marking',
      description: 'Visible boundaries around high-voltage equipment and restricted areas',
    },
    {
      icon: 'footprints',
      name: 'Walkway Boundaries',
      description: 'Marked safe walkway edges in substations and switchrooms',
    },
    {
      icon: 'box',
      name: 'Equipment Perimeter',
      description: 'Perimeter marking around switchgear, transformers and control panels',
    },
    {
      icon: 'route',
      name: 'Substation Pathways',
      description: 'Defined safe routes through substation layouts',
    },
    {
      icon: 'shield-check',
      name: 'Industrial Safety Zones',
      description: 'Zone demarcation on plant floors with live equipment',
    },
  ],
  documents: matDocuments,
  relatedProducts: [
    'electrical-insulating-mats',
    'bi-color-insulating-mats',
    'auto-glow-reflective-band-insulating-mats',
  ],
  classType: 'all',
  hasDatasheet: false,
};

/* ────────────────────────────────────────────
   Product 3: Bi-Color Insulating Mats
   ──────────────────────────────────────────── */

const BCIM = '/media/products/bi-color-insulating-mats';

const biColorInsulatingMats: ProductData = {
  slug: 'bi-color-insulating-mats',
  name: 'Bi-Color Insulating Mats',
  shortName: 'BCIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: `${BCIM}/product-01.webp`,
    hero: `${BCIM}/product-02.webp`,
    details: [`${BCIM}/product-03.webp`, `${BCIM}/product-demo-bi-color.webp`],
    overview: `${BCIM}/product-01.webp`,
    alt: {
      [`${BCIM}/product-01.webp`]:
        'Bi-color insulating mat showing dual-tone design with contrasting colour layers',
      [`${BCIM}/product-02.webp`]:
        'Bi-color insulating mat with two-tone colour scheme providing visual differentiation',
      [`${BCIM}/product-03.webp`]:
        'Bi-color insulating mat sample showing the dual-tone construction detail',
      [`${BCIM}/product-demo-bi-color.webp`]:
        'Bi-color insulating mat demonstration showing the dual-tone design in a real setting',
    },
  },
  trustPoints: matTrustPoints,
  description:
    'IS 15652:2006 insulating mats with a dual-tone colour scheme that serves as a clear indicator of safety boundaries while enhancing visual appeal in the workspace.',
  introduction:
    'Where functionality meets aesthetic innovation, Bi-Color Insulating Mats redefine industrial safety with a striking dual-tone design. A sophisticated two-tone colour scheme not only enhances visual appeal but also serves as a clear indicator of safety boundaries. Manufactured under BIS Licence CM/L:8800129617.',
  badges: ['IS 15652:2006', 'CM/L:8800129617', 'Dual-tone design', 'ISI marked'],
  quickFacts: [
    { icon: 'palette', label: 'Design', value: 'Dual-tone colour scheme' },
    { icon: 'shield', label: 'Purpose', value: 'Safety boundary indicator' },
    { icon: 'zap', label: 'Working Voltage', value: '3.3 kV – 33 kV' },
  ],
  overviewText:
    'A sophisticated two-tone colour scheme not only enhances visual appeal but also serves as a clear indicator of safety boundaries. The contrasting colours make hazard zones and restricted areas immediately visible, supporting safe navigation around electrical installations. Dielectric strength, anti-skid embossing and chemical resistance match the standard insulating mat range.',
  keyBenefits: [
    {
      icon: 'eye',
      text: 'Dual-tone colour scheme enhances visual appeal and serves as a clear indicator of safety boundaries',
    },
    {
      icon: 'shield',
      text: 'High dielectric strength maintained around high-voltage equipment',
    },
    {
      icon: 'grip',
      text: 'Anti-skid embossed surface provides secure footing in demanding environments',
    },
    {
      icon: 'droplets',
      text: 'Advanced elastomer compound resists moisture, oil and chemicals',
    },
  ],
  specifications: matSpecifications,
  materialProperties: [
    {
      label: 'Design Feature',
      value: 'Dual-tone colour scheme — serves as a clear indicator of safety boundaries',
    },
    ...matMaterialProperties,
  ],
  dimensions: matDimensions,
  colors: ['Black & Blue dual-tone', 'Custom combinations to order'],
  surfacePatterns: ['Coin', 'Dot', 'Hexa'],
  installation: [
    'Lay on a clean, dry floor as with standard insulating mats',
    'Cut to length from the 1.0 m wide roll',
    'Butt-join adjacent sections tightly with no gaps',
    'Inspect regularly for cuts, wear or embedded conductive debris',
    'Site fixing can be undertaken by Bharat Electrosafe along with the material, subject to minimum criteria',
  ],
  applications: [
    {
      icon: 'hammer',
      name: 'Heavy-Wear Environments',
      description: 'Areas with high foot traffic or equipment movement that abrades the surface',
    },
    {
      icon: 'shield-alert',
      name: 'Safety-Critical Installations',
      description: 'Substations and switchrooms where mat condition must be verifiable on sight',
    },
    {
      icon: 'clipboard-check',
      name: 'Maintenance Monitoring',
      description: 'Facilities running scheduled inspection regimes',
    },
    {
      icon: 'factory',
      name: 'Substation Flooring',
      description: 'Distribution substations needing ongoing condition assessment',
    },
    {
      icon: 'footprints',
      name: 'Industrial Walkways',
      description: 'Busy walkways where operators need assurance the mat is intact',
    },
  ],
  documents: matDocuments,
  relatedProducts: [
    'electrical-insulating-mats',
    'coloured-strip-insulating-mats',
    'auto-glow-reflective-band-insulating-mats',
  ],
  classType: 'all',
  hasDatasheet: false,
};

/* ────────────────────────────────────────────
   Product 4: Auto-Glow / Reflective Band Mats
   ──────────────────────────────────────────── */

const AGRIM = '/media/products/auto-glow-reflective-band-insulating-mats';

const autoGlowReflectiveBandMats: ProductData = {
  slug: 'auto-glow-reflective-band-insulating-mats',
  name: 'Auto-Glow / Reflective Band Insulating Mats',
  shortName: 'AGRIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: `${AGRIM}/product-01.webp`,
    /* Normal-light product first — the glow is evidenced further down the
       gallery by a real low-light photograph, not by a rendered scene. */
    hero: `${AGRIM}/product-06.webp`,
    details: [
      `${AGRIM}/product-02.webp`,
      `${AGRIM}/product-03.webp`,
      `${AGRIM}/product-04.webp`,
      `${AGRIM}/product-05.webp`,
      `${AGRIM}/product-demo-glowing-dark.webp`,
    ],
    overview: `${AGRIM}/product-01.webp`,
    alt: {
      [`${AGRIM}/product-06.webp`]:
        'Auto-glow reflective band insulating mat in normal light showing the reflective strip',
      [`${AGRIM}/product-01.webp`]:
        'Auto-glow band mat in daylight showing the glow-in-the-dark strip alongside the reflective band',
      [`${AGRIM}/product-02.webp`]:
        'Auto-glow band insulating mat with glow-in-the-dark strip detail',
      [`${AGRIM}/product-03.webp`]:
        'Reflective band insulating mat showing high-visibility reflective strip in normal light',
      [`${AGRIM}/product-04.webp`]:
        'Reflective band insulating mat with the reflective strip visible along the mat surface',
      [`${AGRIM}/product-05.webp`]:
        'Auto-glow and reflective band insulating mat showing both strip features',
      [`${AGRIM}/product-demo-glowing-dark.webp`]:
        'Auto-glow insulating mat demonstration in dark conditions showing the glow-in-the-dark band illuminating',
    },
  },
  trustPoints: matTrustPoints,
  description:
    'IS 15652:2006 insulating mats with auto-glow or reflective bands that keep walkways and hazard zones visible when normal lighting fails.',
  introduction:
    'When the lights go out, safety should never fade. Auto-Glow Band Insulating Mats carry a glow-in-the-dark band that illuminates pathways in emergency situations. Reflective Band Insulating Mats instead integrate high-visibility reflective strips into the same robust insulating platform. Both variants are manufactured for IS 15652:2006 requirements under BIS Licence CM/L:8800129617 and retain full dielectric strength.',
  badges: ['IS 15652:2006', 'CM/L:8800129617', 'Auto-glow', 'Reflective band'],
  quickFacts: [
    { icon: 'sun', label: 'Auto-Glow', value: 'Glow-in-the-dark band' },
    { icon: 'scan-eye', label: 'Reflective', value: 'High-visibility band' },
    { icon: 'zap', label: 'Working Voltage', value: '3.3 kV – 33 kV' },
  ],
  overviewText:
    'A specially engineered glow-in-the-dark band lights the environment, guiding movement and highlighting hazard zones without any power supply. The reflective variant outlines work areas clearly under torchlight or emergency lighting. In both cases the band is built into a mat that retains high dielectric strength, keeps its anti-slip texture, and withstands industrial conditions including moisture and chemical exposure without losing its glow.',
  keyBenefits: [
    {
      icon: 'sun',
      text: 'Luminous glow band lights the environment and highlights hazard zones',
    },
    {
      icon: 'scan-eye',
      text: 'Reflective band outlines work areas clearly in low-light conditions',
    },
    {
      icon: 'shield',
      text: 'Dielectric strength retained alongside the luminous properties',
    },
    {
      icon: 'grip',
      text: 'Anti-slip textured pattern provides a secure base on any surface',
    },
    {
      icon: 'droplets',
      text: 'Withstands moisture and chemical exposure without losing its glow',
    },
  ],
  specifications: matSpecifications,
  materialProperties: matMaterialProperties,
  dimensions: matDimensions,
  colors: [
    'Black with auto-glow band',
    'Black with reflective band',
    'Blue with reflective band',
  ],
  surfacePatterns: ['Coin', 'Dot', 'Hexa'],
  installation: [
    'Position the glow or reflective band along the intended escape or access route',
    'Cut to length from the 1.0 m wide roll, keeping the band continuous across joins',
    'Clean and dry the floor before laying',
    'For the auto-glow variant, allow the band ambient light exposure before relying on it in darkness',
    'For the reflective variant, align the band with the expected torch or emergency-light angle',
    'Site fixing can be undertaken by Bharat Electrosafe along with the material, subject to minimum criteria',
  ],
  applications: [
    {
      icon: 'door-open',
      name: 'Emergency Exit Routes',
      description: 'Glow or reflective guidance towards exits when lighting fails',
    },
    {
      icon: 'moon',
      name: 'Low-Light Substations',
      description: 'Navigation aid in substations on emergency or reduced lighting',
    },
    {
      icon: 'mountain',
      name: 'Underground Facilities',
      description: 'Pathway marking in vaults, tunnels and cable galleries',
    },
    {
      icon: 'train-front',
      name: 'Railways',
      description: 'Guidance on electrified platforms and in railway substations',
    },
    {
      icon: 'route',
      name: 'Industrial Escape Routes',
      description: 'Marked routes through plants with live electrical equipment',
    },
  ],
  documents: matDocuments,
  relatedProducts: [
    'electrical-insulating-mats',
    'coloured-strip-insulating-mats',
    'bi-color-insulating-mats',
  ],
  classType: 'all',
  hasDatasheet: false,
};

/* ────────────────────────────────────────────
   Product 5: BharatMembrane
   ──────────────────────────────────────────── */

const BM = '/media/products/bharat-membrane';

const bharatMembrane: ProductData = {
  slug: 'bharat-membrane',
  name: 'BharatMembrane',
  shortName: 'BM',
  category: 'waterproofing-civil-protection',
  images: {
    thumbnail: `${BM}/product-01.webp`,
    hero: `${BM}/product-06.webp`,
    details: [`${BM}/product-02.webp`, `${BM}/product-03.webp`, `${BM}/product-04.webp`, `${BM}/product-05.webp`, `${BM}/product-logo.webp`],
    overview: `${BM}/product-01.webp`,
    contextual: [
      `${BM}/product-06.webp`,
      `${BM}/product-04.webp`,
      `${BM}/product-05.webp`,
    ],
    alt: {
      [`${BM}/product-01.webp`]:
        'BharatMembrane PVC geo-membrane roll showing the high-grade PVC polymer sheet',
      [`${BM}/product-06.webp`]:
        'BharatMembrane PVC geo-membrane installed in a tunnel waterproofing application',
      [`${BM}/product-02.webp`]:
        'BharatMembrane PVC geo-membrane sheet showing the smooth surface texture',
      [`${BM}/product-03.webp`]:
        'BharatMembrane PVC geo-membrane installation with thermal welding seams',
      [`${BM}/product-04.webp`]:
        'BharatMembrane PVC geo-membrane applied in a civil engineering containment project',
      [`${BM}/product-05.webp`]:
        'BharatMembrane PVC geo-membrane on a water conservation canal lining',
      [`${BM}/product-logo.webp`]:
        'BharatMembrane product logo — PVC geo-membrane by Bharat Electrosafe',
    },
  },
  trustPoints: membraneTrustPoints,
  description:
    'PVC geo-membrane to IS 15909:2020 for tunnel waterproofing, containment and barrier protection in civil and environmental engineering.',
  introduction:
    'BharatMembrane is a premium range of PVC geo-membranes developed by Bharat Electrosafe for tunnel waterproofing, containment and barrier protection in civil and environmental engineering applications. Manufactured using high-grade PVC polymers, it is engineered for chemical resistance, UV stability and mechanical strength, making it suited to projects that demand long-lasting, leak-proof performance.',
  badges: ['IS 15909:2020', 'PVC geo-membrane', 'BIS approved', 'Thermally weldable'],
  quickFacts: [
    { icon: 'droplets', label: 'Function', value: 'Waterproofing and containment' },
    { icon: 'ruler', label: 'Thickness', value: '1 mm – 5 mm' },
    { icon: 'award', label: 'Standard', value: 'IS 15909:2020' },
  ],
  overviewText:
    'BharatMembrane is manufactured under ISO-certified processes at Bharat Electrosafe facilities and backed by both in-house and third-party quality testing. Sheets are seamable by thermal welding, producing continuous joints without adhesives, and custom fabrication is available so roll sizes suit the project rather than the other way round. Whether the application is industrial, environmental or infrastructure, the material provides a robust and cost-effective barrier.',
  keyBenefits: [
    { icon: 'shield', text: 'High-quality PVC geo-membrane for leak-proof barrier performance' },
    { icon: 'hammer', text: 'Excellent puncture and tear resistance' },
    { icon: 'sun', text: 'High resistance to UV radiation, chemicals and weathering' },
    { icon: 'git-merge', text: 'Seamable using thermal welding techniques for secure joints' },
    {
      icon: 'badge-check',
      text: 'BIS approved to IS 15909:2020, with compliance to BS, EN and international standards',
    },
  ],
  specifications: {
    headers: ['Property', 'Specification'],
    rows: [
      ['Material', 'High-grade PVC polymer geo-membrane'],
      ['Standard', 'IS 15909:2020 — BIS approved'],
      ['Further Compliance', 'BS, EN and international standards'],
      ['Available Thicknesses', '1 mm, 1.5 mm, 2 mm, 2.5 mm, 3 mm and up to 5 mm'],
      ['Roll Sizes', 'To suit project requirements'],
      ['Jointing Method', 'Thermal welding'],
      ['Resistance', 'UV radiation, chemicals and weathering'],
      ['Mechanical', 'Puncture and tear resistant'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'High-grade PVC polymers' },
    { label: 'Standard', value: 'IS 15909:2020, BIS approved' },
    { label: 'International Compliance', value: 'BS, EN and international standards' },
    { label: 'UV Resistance', value: 'High' },
    { label: 'Chemical Resistance', value: 'High' },
    { label: 'Weathering Resistance', value: 'High' },
    { label: 'Puncture and Tear Resistance', value: 'Excellent' },
    { label: 'Jointing', value: 'Thermal welding for secure, continuous seams' },
    { label: 'Manufacturing', value: 'Produced under ISO-certified processes' },
    {
      label: 'Quality Testing',
      value: 'In-house and third-party testing',
    },
  ],
  dimensions: [
    { label: 'Thickness Range', value: '1 mm, 1.5 mm, 2 mm, 2.5 mm, 3 mm, up to 5 mm' },
    { label: 'Roll Sizes', value: 'Supplied to suit project needs' },
    { label: 'Custom Fabrication', value: 'Available' },
  ],
  colors: ['Yellow', 'Black'],
  surfacePatterns: ['Smooth sheet'],
  installation: [
    'Prepare and inspect the substrate before the membrane is placed',
    'Position sheets with sufficient overlap at every seam',
    'Weld overlaps thermally to form a continuous, leak-proof joint',
    'Seal around penetrations, corners and terminations',
    'Check completed seams before the membrane is covered or backfilled',
    'Custom fabrication is available where a project needs non-standard sheet sizes',
  ],
  applications: [
    {
      icon: 'mountain',
      name: 'Tunnel & Basement Waterproofing',
      description: 'Continuous waterproof lining for tunnels and below-grade structures',
    },
    {
      icon: 'trash-2',
      name: 'Landfills & Hazardous Waste Containment',
      description: 'Barrier lining for landfill cells and hazardous waste containment',
    },
    {
      icon: 'waves',
      name: 'Reservoirs, Canals & Ponds',
      description: 'Lining for water reservoirs, canals and ponds',
    },
    {
      icon: 'pickaxe',
      name: 'Mining & Ash Dyke Lining',
      description: 'Containment lining for mining operations and ash dykes',
    },
    {
      icon: 'factory',
      name: 'Industrial Effluent Ponds',
      description: 'Chemically resistant lining for effluent containment',
    },
    {
      icon: 'sprout',
      name: 'Aquaculture & Agriculture Lining',
      description: 'Lining for aquaculture ponds and agricultural water storage',
    },
  ],
  documents: [
    {
      type: 'Certificate',
      name: 'ISO 9001:2015 — Quality Management System',
      issuer: 'Certification body',
      available: true,
      href: '/documents/certifications/iso-9001-2015-qms.pdf',
      thumbnail: '/images/documents/doc-certificate.webp',
      kind: 'certificate',
    },
    {
      type: 'Certificate',
      name: 'ISO 14001:2015 — Environmental Management System',
      issuer: 'Certification body',
      available: true,
      href: '/documents/certifications/iso-14001-2015-ems.pdf',
      thumbnail: '/images/documents/doc-certificate.webp',
      kind: 'certificate',
    },
    {
      type: 'Approval',
      name: 'BIS approval — IS 15909:2020',
      issuer: 'Bureau of Indian Standards',
      available: false,
      thumbnail: '/images/documents/doc-approval.webp',
      kind: 'licence',
    },
    {
      type: 'Datasheet',
      name: 'Product datasheet — available on request',
      issuer: 'Bharat Electrosafe',
      available: false,
      thumbnail: '/images/documents/doc-datasheet.webp',
      kind: 'datasheet',
    },
  ],
  relatedProducts: [
    'electrical-insulating-mats',
    'coloured-strip-insulating-mats',
    'auto-glow-reflective-band-insulating-mats',
  ],
  classType: 'membrane',
  hasDatasheet: false,
};

/* ────────────────────────────────────────────
   Product Registry
   ──────────────────────────────────────────── */

const BHS = '/media/products/bharat-hydro-seal';

const bharatHydroSeal: ProductData = {
  slug: 'bharat-hydro-seal',
  name: 'Bharat Hydro Seal',
  shortName: 'Hydro-Seal',
  category: 'waterproofing-civil-protection',
  images: {
    thumbnail: `${BHS}/product-01.webp`,
    hero: `${BHS}/product-02.webp`,
    details: [
      `${BHS}/product-03.webp`,
      `${BHS}/product-04.webp`,
      `${BHS}/product-05.webp`,
      `${BHS}/product-06.webp`,
    ],
    overview: `${BHS}/product-01.webp`,
    contextual: [`${BHS}/product-04.webp`, `${BHS}/product-06.webp`],
    alt: {
      [`${BHS}/product-01.webp`]:
        'BharatHydro Seal PVC water stop — centre bulb type for construction joints',
      [`${BHS}/product-02.webp`]:
        'BharatHydro Seal water stop profile showing bulb and flange design',
      [`${BHS}/product-03.webp`]:
        'BharatHydro Seal PVC water stop installed in concrete construction joint',
      [`${BHS}/product-04.webp`]:
        'BharatHydro Seal water stop embedded in concrete expansion joint',
      [`${BHS}/product-05.webp`]:
        'BharatHydro Seal water stop cross-section showing internal bulb structure',
      [`${BHS}/product-06.webp`]:
        'BharatHydro Seal water stop application in dam and canal construction',
    },
  },
  trustPoints: [
    'IS 15058-2002',
    'PVC water stop',
    'Chemical resistant',
    'High tensile strength',
  ],
  description:
    'PVC water stop seals to IS 15058-2002 for construction and expansion joints in concrete structures — water tanks, dams, basements, tunnels and sewage treatment plants.',
  introduction:
    'BharatHydro Seal, a trusted brand by Bharat Electrosafe Pvt. Ltd., offers high-performance water stop sealing solutions designed to ensure complete protection against water leakage in construction joints. BharatHydro Seal Water Stops are specially designed to prevent the passage of water through construction and expansion joints in concrete structures. Manufactured using high-quality PVC and rubber compounds, these seals provide excellent resistance against water pressure, chemicals and environmental stress.',
  badges: ['IS 15058-2002', 'PVC Water Stop', 'High tensile strength', 'Chemical resistant'],
  quickFacts: [
    { icon: 'droplets', label: 'Function', value: 'Water stop sealing for construction joints' },
    { icon: 'ruler', label: 'Standard', value: 'IS 15058-2002' },
    { icon: 'shield', label: 'Material', value: 'PVC and rubber compounds' },
  ],
  overviewText:
    'BharatHydro Seal Water Stops are manufactured under strict quality controls at Bharat Electrosafe facilities using high-grade PVC and rubber compounds. Every profile is designed to create a reliable, water-tight seal at construction and expansion joints, resisting water pressure, chemical exposure and environmental stress. Profiles are available in centre-bulb, dumbbell and ribbed configurations to suit different joint types and movement requirements, and they can be welded at intersections for continuous, leak-proof protection across the entire structure.',
  keyBenefits: [
    { icon: 'droplets', text: 'Superior water-tight sealing at construction and expansion joints' },
    { icon: 'bolt', text: 'High tensile strength and flexibility to accommodate joint movement' },
    { icon: 'flask-conical', text: 'Resistant to chemicals, corrosion and weather conditions' },
    { icon: 'hammer', text: 'Easy installation and long service life in demanding environments' },
    { icon: 'shield-check', text: 'Suitable for high-pressure water retention structures' },
  ],
  specifications: {
    headers: ['Property', 'Specification'],
    rows: [
      ['Material', 'High-quality PVC and rubber compound water stop'],
      ['Standard', 'IS 15058-2002'],
      ['Profile Types', 'Centre bulb, dumbbell and ribbed configurations'],
      ['Joint Types', 'Construction joints and expansion joints'],
      ['Resistance', 'Water pressure, chemicals, corrosion and weathering'],
      ['Mechanical', 'High tensile strength and flexibility'],
      ['Jointing Method', 'Weldable at intersections for continuous seals'],
      ['Service Life', 'Long-lasting performance in demanding environments'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'High-quality PVC and rubber compounds' },
    { label: 'Standard', value: 'IS 15058-2002' },
    { label: 'Water Resistance', value: 'Superior water-tight sealing' },
    { label: 'Chemical Resistance', value: 'Resistant to chemicals and corrosion' },
    { label: 'Weathering Resistance', value: 'Resistant to environmental stress' },
    { label: 'Tensile Strength', value: 'High' },
    { label: 'Flexibility', value: 'High — accommodates joint movement' },
    { label: 'Profile Types', value: 'Centre bulb, dumbbell and ribbed' },
    { label: 'Jointing', value: 'Weldable at intersections for continuous protection' },
    { label: 'Manufacturing', value: 'Produced under ISO-certified processes' },
  ],
  dimensions: [
    { label: 'Profile Width', value: 'Available in multiple widths to suit joint requirements' },
    { label: 'Thickness', value: 'Range of thicknesses for different pressure classes' },
    { label: 'Custom Fabrication', value: 'Available for project-specific requirements' },
  ],
  colors: ['Black'],
  surfacePatterns: ['Smooth profile', 'Ribbed profile'],
  installation: [
    'Confirm the joint type — construction joint or expansion joint — and select the appropriate profile',
    'Clean the concrete surface at the joint location before positioning the water stop',
    'Place the water stop centrally in the joint with the bulb aligned to the joint plane',
    'Secure the water stop in position before pouring the next concrete lift',
    'Weld intersections and terminations to form a continuous, leak-proof seal',
    'Inspect the installed water stop for proper alignment before covering',
  ],
  applications: [
    {
      icon: 'droplets',
      name: 'Water Tanks & Reservoirs',
      description: 'Water stop sealing for water storage tanks and reservoir construction joints',
    },
    {
      icon: 'waves',
      name: 'Dams & Canals',
      description: 'Sealing expansion and construction joints in dam and canal structures',
    },
    {
      icon: 'trash-2',
      name: 'Sewage Treatment Plants',
      description: 'Chemical-resistant water stops for sewage treatment plant construction',
    },
    {
      icon: 'mountain',
      name: 'Basements & Underground Structures',
      description: 'Water stop protection for basement and underground construction joints',
    },
    {
      icon: 'person-swim',
      name: 'Swimming Pools & Tunnels',
      description: 'Water-tight sealing for swimming pools and tunnel construction',
    },
  ],
  documents: [
    {
      type: 'Certificate',
      name: 'ISO 9001:2015 — Quality Management System',
      issuer: 'Certification body',
      available: true,
      href: '/documents/certifications/iso-9001-2015-qms.pdf',
      thumbnail: '/images/documents/doc-certificate.webp',
      kind: 'certificate',
    },
    {
      type: 'Approval',
      name: 'IS 15058-2002 compliance — Water stop for construction joints',
      issuer: 'Bureau of Indian Standards',
      available: false,
      thumbnail: '/images/documents/doc-approval.webp',
      kind: 'licence',
    },
    {
      type: 'Datasheet',
      name: 'Product datasheet — available on request',
      issuer: 'Bharat Electrosafe',
      available: false,
      thumbnail: '/images/documents/doc-datasheet.webp',
      kind: 'datasheet',
    },
  ],
  relatedProducts: [
    'bharat-membrane',
    'electrical-insulating-mats',
  ],
  classType: 'membrane',
};

export const products: ProductData[] = [
  electricalInsulatingMats,
  colouredStripInsulatingMats,
  biColorInsulatingMats,
  autoGlowReflectiveBandMats,
  bharatMembrane,
  bharatHydroSeal,
];

/** Number of active product families — the single source for any "N families"
 *  claim in company data, copy or metadata. */
export const productFamilyCount = products.length;

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductNames(): string[] {
  return products.map((p) => p.name);
}

/**
 * Alt text for a product image, resolved from the product's own registry.
 * Falls back to the product name so an unmapped path can never render an
 * empty or placeholder-sounding alt attribute.
 */
export function getImageAlt(product: ProductData, src: string): string {
  return product.images.alt[src] ?? product.name;
}

/**
 * How an image should sit in its frame. Real-setting photographs fill it;
 * isolated product shots are contained so nothing is cropped off.
 */
export function getImageFit(product: ProductData, src: string): 'cover' | 'contain' {
  return product.images.contextual?.includes(src) ? 'cover' : 'contain';
}

/** Labels for the contact-form product selector — all six families. */
export const contactProductOptions = products.map((p) => ({
  value: p.slug,
  label: p.name,
}));

/**
 * Lightweight product navigation projection — used by Header, Footer,
 * /products page and any other component that needs product links without
 * shipping the full technical-detail client bundle.
 *
 * Derives everything from the central product registry so adding a product
 * later requires changing only the registry.
 */
export interface ProductNavItem {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  href: string;
  category: ProductCategory;
  categoryDisplayName: string;
}

export const productNavigationItems: ProductNavItem[] = products.map((p) => ({
  name: p.name,
  slug: p.slug,
  description: p.description,
  thumbnail: p.images.thumbnail,
  href: `/products/${p.slug}`,
  category: p.category,
  categoryDisplayName: productCategories[p.category].displayName,
}));

/**
 * Product navigation grouped by category, for use in header dropdowns,
 * mobile menus and the /products page family grid.
 */
export const productNavigationByCategory: Record<ProductCategory, ProductNavItem[]> =
  Object.fromEntries(
    (Object.keys(productCategories) as ProductCategory[]).map((catId) => [
      catId,
      productNavigationItems.filter((p) => p.category === catId),
    ]),
  ) as Record<ProductCategory, ProductNavItem[]>;

/**
 * Comparison data for the /products page comparison table.
 * Uses verified data from the central product registry only.
 */
export interface ProductComparisonRow {
  name: string;
  slug: string;
  primaryPurpose: string;
  distinguishingFeature: string;
  typicalApplication: string;
  applicableStandard: string;
}

export const productComparisonData: ProductComparisonRow[] = [
  {
    name: 'Electrical Insulating Mats',
    slug: 'electrical-insulating-mats',
    primaryPurpose: 'Operator insulation',
    distinguishingFeature: 'Standard anti-skid insulating surface',
    typicalApplication: 'Control panels, substations and switchrooms',
    applicableStandard: 'IS 15652:2006',
  },
  {
    name: 'Coloured Strip Insulating Mats',
    slug: 'coloured-strip-insulating-mats',
    primaryPurpose: 'Insulation with hazard-zone marking',
    distinguishingFeature: 'High-visibility coloured boundary strip',
    typicalApplication: 'Marked safe pathways around electrical installations',
    applicableStandard: 'IS 15652:2006',
  },
  {
    name: 'Bi-Color Insulating Mats',
    slug: 'bi-color-insulating-mats',
    primaryPurpose: 'Insulation with visible dual-layer construction',
    distinguishingFeature: 'Contrasting colour layers',
    typicalApplication: 'Areas requiring visible surface differentiation',
    applicableStandard: 'IS 15652:2006',
  },
  {
    name: 'Auto-Glow / Reflective Band Mats',
    slug: 'auto-glow-reflective-band-insulating-mats',
    primaryPurpose: 'Insulation with low-light guidance',
    distinguishingFeature: 'Glow or reflective visibility feature',
    typicalApplication: 'Emergency routes and low-light electrical areas',
    applicableStandard: 'IS 15652:2006',
  },
  {
    name: 'BharatMembrane',
    slug: 'bharat-membrane',
    primaryPurpose: 'Waterproofing and containment',
    distinguishingFeature: 'Engineered PVC geomembrane',
    typicalApplication: 'Tunnels, civil works and environmental containment',
    applicableStandard: 'IS 15909:2020',
  },
  {
    name: 'Bharat Hydro Seal',
    slug: 'bharat-hydro-seal',
    primaryPurpose: 'Construction-joint water sealing',
    distinguishingFeature: 'PVC water stop profile',
    typicalApplication: 'Concrete joints and water-retaining structures',
    applicableStandard: 'IS 15058-2002',
  },
];
