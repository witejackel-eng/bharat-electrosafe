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
  | 'datasheet'
  | 'standards-information';

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
 * What a product image is *for*. Recorded per image so no component has to
 * infer a role from a filename or from which array an image happens to sit in.
 */
export type ProductImageType =
  | 'product'
  | 'alternate'
  | 'surface'
  | 'marking'
  | 'profile'
  | 'installation'
  | 'application';

/**
 * One placed image.
 *
 * `fit` is data, not a guess. An isolated product shot is `contain`, so a
 * moulded marking, a coloured strip or a cut edge is never cropped off by the
 * frame's aspect ratio; a photograph taken in a real setting is `cover`, so it
 * fills the frame instead of floating on a letterbox. `position` moves the
 * crop's focal point when the subject is not centred.
 */
export interface ProductImage {
  src: string;
  /** Describes what is visible. Never a keyword list, never "product image". */
  alt: string;
  fit: 'contain' | 'cover';
  /** CSS object-position, e.g. 'center 30%'. Only meaningful with `cover`. */
  position?: string;
}

export interface ProductGalleryImage extends ProductImage {
  type: ProductImageType;
  /** Short line explaining what the buyer is looking at. Not a repeat of alt. */
  caption?: string;
}

/**
 * Real, locally-stored imagery for a product.
 *
 * Every path resolves to a file under /public/media/products, written by
 * scripts/build-product-gallery.mjs from a genuine client-owned source.
 * Components read images from here rather than assembling their own arrays,
 * so a product shows the same approved photograph everywhere it appears.
 *
 * `gallery` is the ordered story: best complete view first, then alternates,
 * surface detail, markings and finally the product in context. `gallery[0]`
 * *is* the product-page hero — it is not stored twice.
 *
 * `overview` and `application` point at entries already in `gallery`, so a
 * caption or a correction is written once.
 */
export interface ProductImages {
  /** Homepage card, /products tile, related-product tile, mega-menu. */
  thumbnail: ProductImage;
  gallery: ProductGalleryImage[];
  /** Wider or contextual view shown beside the overview copy. */
  overview?: ProductGalleryImage;
  /** Genuine in-situ photograph, where one exists. */
  application?: ProductGalleryImage;
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

/* Ordered gallery — complete product, then surface, then the alternate
   colour/pattern, then the moulded marking, then the supplied range.
   Declared as a const so `overview` can point at a member instead of
   repeating its path and alt text. */
const eimGallery: ProductGalleryImage[] = [
  {
    src: `${EIM}/gallery/01-blue-coin-mat.webp`,
    alt: 'Blue electrical insulating mat sheet with a raised coin-pattern anti-skid surface',
    caption: 'Coin-pattern anti-skid surface',
    type: 'product',
    fit: 'contain',
  },
  {
    src: `${EIM}/gallery/02-coin-surface-detail.webp`,
    alt: 'Close view of the raised coin pattern moulded into a blue insulating mat',
    caption: 'Raised coin detail',
    type: 'surface',
    fit: 'cover',
  },
  {
    src: `${EIM}/gallery/03-black-hexa-mat.webp`,
    alt: 'Black electrical insulating mat sheet with a hexa-pattern anti-skid surface',
    caption: 'Black mat, hexa anti-skid pattern',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${EIM}/gallery/04-hexa-surface-detail.webp`,
    alt: 'Close view of the hexa anti-skid pattern on a black insulating mat',
    caption: 'Hexa surface texture',
    type: 'surface',
    fit: 'cover',
  },
  {
    /* Describes only what the photograph shows. The published specification
       table on this page is IS 15652:2006; this mat carries an IEC 61111
       marking. Neither figure is restated as the other. */
    src: `${EIM}/gallery/05-iec-61111-marking.webp`,
    alt: 'Marking moulded into an insulating mat reading Bharat Electrosafe, insulating mat, IEC 61111/2009 Class 2, maximum use voltage 17000 V',
    caption: 'Moulded IEC 61111 Class 2 marking',
    type: 'marking',
    fit: 'contain',
  },
  {
    src: `${EIM}/gallery/06-colour-and-pattern-range.webp`,
    alt: 'Fanned insulating mat samples in several colours showing coin and hexa anti-skid patterns',
    caption: 'Colour and surface-pattern options',
    type: 'alternate',
    fit: 'cover',
  },
];

const electricalInsulatingMats: ProductData = {
  slug: 'electrical-insulating-mats',
  name: 'Electrical Insulating Mats',
  shortName: 'EIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: {
      src: `${EIM}/card.webp`,
      alt: 'Blue electrical insulating mat with a coin-pattern anti-skid surface',
      fit: 'contain',
    },
    gallery: eimGallery,
    overview: eimGallery[5],
    /* No genuine photograph of a mat installed in front of switchgear exists
       in the client archive. Rather than dress a studio shot as an
       installation, the slot stays empty and the shot is requested in
       docs/PRODUCT-PHOTOGRAPHY-GAPS.md. */
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

/* The yellow strip is this product's whole reason to exist, so it is
   unmistakable in every slide. The previous hero was a coin-mat marking
   close-up with no strip in frame at all. */
const csimGallery: ProductGalleryImage[] = [
  {
    src: `${CSIM}/gallery/01-yellow-strip-hexa-mat.webp`,
    alt: 'Black hexa-pattern insulating mat with a high-visibility yellow strip running across it',
    caption: 'Yellow strip on a hexa-pattern mat',
    type: 'product',
    fit: 'contain',
  },
  {
    src: `${CSIM}/gallery/02-yellow-strip-dot-mat.webp`,
    alt: 'Black dot-pattern insulating mat with a high-visibility yellow strip running across it',
    caption: 'Yellow strip on a dot-pattern mat',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${CSIM}/gallery/03-yellow-strip-angled.webp`,
    alt: 'Coloured strip insulating mat at an angle, showing the yellow strip against the black anti-skid surface',
    caption: 'Strip and anti-skid surface together',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${CSIM}/gallery/04-edge-strip-production.webp`,
    alt: 'Blue insulating mat with yellow edge strips down both sides, on the production line',
    caption: 'Yellow edge strips on a blue mat',
    type: 'installation',
    fit: 'cover',
    position: 'center',
  },
  {
    src: `${CSIM}/gallery/05-switchroom-boundary.webp`,
    alt: 'Blue insulating mat with a yellow boundary strip laid along a row of switchgear panels',
    caption: 'Marked walkway in front of switchgear',
    type: 'application',
    fit: 'cover',
    position: 'center',
  },
];

const colouredStripInsulatingMats: ProductData = {
  slug: 'coloured-strip-insulating-mats',
  name: 'Coloured Strip Insulating Mats',
  shortName: 'CSIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: {
      src: `${CSIM}/card.webp`,
      alt: 'Black insulating mat with a high-visibility yellow boundary strip',
      fit: 'contain',
    },
    gallery: csimGallery,
    overview: csimGallery[2],
    application: csimGallery[4],
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

/* The only imagery the client holds for this family is their own published
   illustration set — there is no photograph of a bi-colour mat anywhere in the
   archive, and the product videos top out at 1024x576 with motion blur. The
   illustrations are kept because they show the two-layer construction
   truthfully; the first caption says plainly what they are, and the
   photography is requested in docs/PRODUCT-PHOTOGRAPHY-GAPS.md. */
const bcimGallery: ProductGalleryImage[] = [
  {
    src: `${BCIM}/gallery/01-dual-layer-roll.webp`,
    alt: 'Bi-color insulating mat part-rolled, showing a blue coin-pattern top layer over a red base layer',
    caption: 'Two-layer construction (manufacturer illustration)',
    type: 'product',
    fit: 'contain',
  },
  {
    src: `${BCIM}/gallery/02-layer-edge-detail.webp`,
    alt: 'Cut edge of a bi-color insulating mat with detail callouts showing the blue and red layers bonded together',
    caption: 'Layer boundary at the cut edge',
    type: 'profile',
    fit: 'contain',
  },
  {
    src: `${BCIM}/gallery/03-contrasting-layers.webp`,
    alt: 'Blue coin-pattern top layer of a bi-color insulating mat shown separated from its red base layer',
    caption: 'The two layers separated',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${BCIM}/gallery/04-layer-cross-section.webp`,
    alt: 'Cross-section diagram of a bi-color insulating mat, a 0.5 mm top layer bonded to a PVC bottom layer, with a probe showing how wear exposes the contrasting colour',
    caption: 'Why two colours: wear exposes the layer beneath',
    type: 'profile',
    fit: 'contain',
  },
];

const biColorInsulatingMats: ProductData = {
  slug: 'bi-color-insulating-mats',
  name: 'Bi-Color Insulating Mats',
  shortName: 'BCIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: {
      src: `${BCIM}/card.webp`,
      alt: 'Bi-color insulating mat showing a blue top layer above a contrasting red base layer',
      fit: 'contain',
    },
    gallery: bcimGallery,
    overview: bcimGallery[1],
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

/* Slides 1 and 2 are the same mat photographed in daylight and then in low
   light. That pair is the honest evidence for the glow claim, so the client's
   rendered "glowing switchroom" scene is not used at all — no glow here is
   produced in software. */
const agrimGallery: ProductGalleryImage[] = [
  {
    src: `${AGRIM}/gallery/01-reflective-bands-daylight.webp`,
    alt: 'Auto-glow insulating mat in daylight, with green and orange sections either side of a pale glow band',
    caption: 'Daylight appearance',
    type: 'product',
    fit: 'contain',
  },
  {
    src: `${AGRIM}/gallery/02-reflective-bands-low-light.webp`,
    alt: 'The same auto-glow insulating mat photographed in low light, the band glowing green',
    caption: 'The same mat in low light',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${AGRIM}/gallery/03-band-surface-detail.webp`,
    alt: 'Close view of the glow band running beside the dot-pattern anti-skid surface of an auto-glow mat',
    caption: 'Band against the anti-skid surface',
    type: 'surface',
    fit: 'cover',
  },
  {
    src: `${AGRIM}/gallery/04-is-15652-class-c-marking.webp`,
    alt: 'Marking printed on an auto-glow insulating mat reading IS 15652-2006, Class C, voltage up to 33 kV',
    caption: 'IS 15652:2006 Class C marking',
    type: 'marking',
    fit: 'contain',
  },
  {
    src: `${AGRIM}/gallery/05-auto-glow-product-label.webp`,
    alt: 'Blue auto-glow insulating mat with white and yellow bands and a label reading Bharat Electrosafe electrical insulating mat 3 mm auto glow',
    caption: 'Labelled 3 mm auto-glow mat',
    type: 'marking',
    fit: 'contain',
  },
  {
    src: `${AGRIM}/gallery/06-supplied-in-rolls.webp`,
    alt: 'Auto-glow insulating mat supplied as rolls',
    caption: 'Supplied in rolls',
    type: 'product',
    fit: 'cover',
  },
];

const autoGlowReflectiveBandMats: ProductData = {
  slug: 'auto-glow-reflective-band-insulating-mats',
  name: 'Auto-Glow / Reflective Band Insulating Mats',
  shortName: 'AGRIM',
  category: 'electrical-insulation',
  images: {
    thumbnail: {
      src: `${AGRIM}/card.webp`,
      alt: 'Auto-glow insulating mat with green and orange sections either side of a glow band',
      fit: 'contain',
    },
    gallery: agrimGallery,
    overview: agrimGallery[2],
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

/* All genuine site photography. The previous hero was an office-interior
   render with the BharatMembrane logo on the wall, and the brand logo file
   itself sat in the gallery — neither shows the product, so both are dropped. */
const bmGallery: ProductGalleryImage[] = [
  {
    src: `${BM}/gallery/01-tunnel-membrane-lining.webp`,
    alt: 'PVC geomembrane panels lining the arch of a tunnel during waterproofing',
    caption: 'Tunnel waterproofing lining',
    type: 'installation',
    fit: 'cover',
  },
  {
    src: `${BM}/gallery/02-yellow-membrane-tunnel.webp`,
    alt: 'Yellow PVC geomembrane fixed across a tunnel bore ahead of the concrete lining',
    caption: 'Membrane fixed ahead of concreting',
    type: 'installation',
    fit: 'cover',
  },
  {
    src: `${BM}/gallery/03-membrane-seam-welding.webp`,
    alt: 'Operative in high-visibility clothing welding a seam in yellow PVC geomembrane inside a tunnel',
    caption: 'Seam welding on site',
    type: 'installation',
    fit: 'cover',
  },
  {
    src: `${BM}/gallery/04-hot-air-weld-detail.webp`,
    alt: 'Hand-held hot-air welding tool joining two overlapping sheets of yellow PVC geomembrane',
    caption: 'Thermally welded seam, no adhesives',
    type: 'surface',
    fit: 'cover',
  },
  {
    src: `${BM}/gallery/05-tunnel-portal-lining.webp`,
    alt: 'PVC geomembrane installed across a tunnel portal with reinforcement in place',
    caption: 'Portal lining before concreting',
    type: 'installation',
    fit: 'cover',
  },
  {
    src: `${BM}/gallery/06-containment-basin-lining.webp`,
    alt: 'Black PVC geomembrane lining the slopes and floor of a large containment basin',
    caption: 'Containment basin lining',
    type: 'application',
    fit: 'cover',
  },
];

const bharatMembrane: ProductData = {
  slug: 'bharat-membrane',
  name: 'BharatMembrane',
  shortName: 'BM',
  category: 'waterproofing-civil-protection',
  images: {
    thumbnail: {
      src: `${BM}/card.webp`,
      alt: 'Yellow PVC geomembrane lining the inside of a tunnel',
      fit: 'cover',
    },
    gallery: bmGallery,
    overview: bmGallery[4],
    application: bmGallery[5],
  },
  trustPoints: membraneTrustPoints,
  description:
    'PVC geo-membrane to IS 15909:2020 for tunnel waterproofing, containment and barrier protection in civil and environmental engineering.',
  introduction:
    'BharatMembrane is a range of PVC geo-membranes developed by Bharat Electrosafe for tunnel waterproofing, containment and barrier protection in civil and environmental engineering applications. The material is engineered for chemical resistance, UV stability and mechanical strength. Request the current product documentation for the exact membrane grade and project approval requirements.',
  badges: ['IS 15909:2020', 'PVC geo-membrane', 'Thermally weldable', 'Custom fabrication'],
  quickFacts: [
    { icon: 'droplets', label: 'Function', value: 'Waterproofing and containment' },
    { icon: 'ruler', label: 'Thickness', value: '1 mm – 5 mm' },
    { icon: 'award', label: 'Standard', value: 'IS 15909:2020' },
  ],
  overviewText:
    'BharatMembrane is a PVC geo-membrane for civil and environmental engineering applications. Sheets are seamable by thermal welding, producing continuous joints without adhesives, and custom fabrication is available so roll sizes suit the project. Request the current product documentation for the exact membrane grade and project approval requirements.',
  keyBenefits: [
    { icon: 'shield', text: 'PVC geo-membrane for barrier and containment applications' },
    { icon: 'hammer', text: 'Puncture and tear resistance' },
    { icon: 'sun', text: 'Resistance to UV radiation, chemicals and weathering' },
    { icon: 'git-merge', text: 'Seamable using thermal welding techniques for secure joints' },
    {
      icon: 'badge-check',
      text: 'Presented for applications covered by IS 15909:2020',
    },
  ],
  specifications: {
    headers: ['Property', 'Specification'],
    rows: [
      ['Material', 'PVC polymer geo-membrane'],
      ['Standard', 'IS 15909:2020'],
      ['Available Thicknesses', '1 mm, 1.5 mm, 2 mm, 2.5 mm, 3 mm and up to 5 mm'],
      ['Roll Sizes', 'To suit project requirements'],
      ['Jointing Method', 'Thermal welding'],
      ['Resistance', 'UV radiation, chemicals and weathering'],
      ['Mechanical', 'Puncture and tear resistant'],
      ['Service Life', 'Service life depends on product selection, installation quality, operating conditions, exposure and maintenance'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'PVC polymers' },
    { label: 'Standard', value: 'IS 15909:2020' },
    { label: 'UV Resistance', value: 'High' },
    { label: 'Chemical Resistance', value: 'High' },
    { label: 'Weathering Resistance', value: 'High' },
    { label: 'Puncture and Tear Resistance', value: 'High' },
    { label: 'Jointing', value: 'Thermal welding for secure, continuous seams' },
    { label: 'Manufacturing', value: 'Manufactured at Bharat Electrosafe facilities' },
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
    'Weld overlaps thermally to form a continuous joint',
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
      type: 'Standards information',
      name: 'IS 15909:2020 product information — available on request',
      issuer: 'Bharat Electrosafe',
      available: false,
      thumbnail: '/images/documents/doc-approval.webp',
      kind: 'standards-information',
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

/* Rebuilt from the client's own 4032x3024 profile photographs, which were
   not in the repository at all. The page had been running on 500 px website
   renders plus a marketing flyer and a scanned application drawing — the last
   two are collateral, not product imagery, and are dropped. */
const bhsGallery: ProductGalleryImage[] = [
  {
    src: `${BHS}/gallery/01-ribbed-water-stop-profile.webp`,
    alt: 'Black ribbed PVC water stop profile with a hollow centre bulb, for concrete construction joints',
    caption: 'Ribbed profile with centre bulb',
    type: 'product',
    fit: 'contain',
  },
  {
    src: `${BHS}/gallery/02-centre-bulb-profile.webp`,
    alt: 'Grey PVC water stop profile showing the centre bulb between ribbed flanges',
    caption: 'Centre bulb between ribbed flanges',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${BHS}/gallery/03-flat-flange-profile.webp`,
    alt: 'White PVC water stop profile with flat flanges either side of a centre bulb',
    caption: 'Flat-flange profile',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${BHS}/gallery/04-translucent-pvc-profile.webp`,
    alt: 'Translucent PVC water stop profile with the ribs and centre bulb visible through the material',
    caption: 'Translucent PVC variant',
    type: 'alternate',
    fit: 'contain',
  },
  {
    src: `${BHS}/gallery/05-rib-detail.webp`,
    alt: 'Close view of the moulded ribs along a black PVC water stop profile',
    caption: 'Rib detail',
    type: 'profile',
    fit: 'cover',
  },
];

const bharatHydroSeal: ProductData = {
  slug: 'bharat-hydro-seal',
  name: 'Bharat Hydro Seal',
  shortName: 'Hydro-Seal',
  category: 'waterproofing-civil-protection',
  images: {
    thumbnail: {
      src: `${BHS}/card.webp`,
      alt: 'Black ribbed PVC water stop profile with a centre bulb',
      fit: 'contain',
    },
    gallery: bhsGallery,
    overview: bhsGallery[1],
    /* No photograph exists of a water stop cast into a concrete joint. The
       slot stays empty rather than showing a bare concrete structure in which
       the product cannot be found. */
  },
  trustPoints: [
    'IS 15058-2002',
    'PVC water stop',
    'Multiple profiles',
    'Weldable at intersections',
  ],
  description:
    'PVC water stop seals to IS 15058-2002 for construction and expansion joints in concrete structures — water tanks, dams, basements, tunnels and sewage treatment plants.',
  introduction:
    'Bharat Hydro Seal is a PVC water-stop product intended for construction and expansion joints in concrete structures. The profiles are designed to reduce water passage through properly designed and installed joints. Product profile, dimensions, joining method and suitability must be selected according to the project conditions.',
  badges: ['IS 15058-2002', 'PVC Water Stop', 'Multiple profiles', 'Weldable at intersections'],
  quickFacts: [
    { icon: 'droplets', label: 'Function', value: 'Water stop sealing for construction joints' },
    { icon: 'ruler', label: 'Standard', value: 'IS 15058-2002' },
    { icon: 'shield', label: 'Material', value: 'PVC and rubber compounds' },
  ],
  overviewText:
    'Bharat Hydro Seal profiles are made from PVC and rubber compounds and are available in centre-bulb, dumbbell and ribbed configurations. Profile selection depends on the joint type, expected movement, water pressure and project specification. Intersections and terminations require an appropriate joining method to form a continuous system. Request the current product and compliance documents required for your project.',
  keyBenefits: [
    { icon: 'droplets', text: 'PVC water-stop profiles for construction and expansion joints' },
    { icon: 'bolt', text: 'Available in centre-bulb, dumbbell and ribbed configurations' },
    { icon: 'flask-conical', text: 'Made from PVC and rubber compounds' },
    { icon: 'hammer', text: 'Weldable at intersections to form a continuous system' },
    { icon: 'shield-check', text: 'Profile selection depends on joint type and project conditions' },
  ],
  specifications: {
    headers: ['Property', 'Specification'],
    rows: [
      ['Material', 'PVC and rubber compound water stop'],
      ['Standard', 'IS 15058-2002'],
      ['Profile Types', 'Centre bulb, dumbbell and ribbed configurations'],
      ['Joint Types', 'Construction joints and expansion joints'],
      ['Resistance', 'Designed to resist water pressure, chemicals and weathering'],
      ['Mechanical', 'Tensile strength and flexibility to accommodate joint movement'],
      ['Jointing Method', 'Weldable at intersections for continuous seals'],
      ['Service Life', 'Service life depends on product selection, installation quality, operating conditions, exposure and maintenance'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'PVC and rubber compounds' },
    { label: 'Standard', value: 'IS 15058-2002' },
    { label: 'Function', value: 'Reduces water passage through properly designed and installed joints' },
    { label: 'Chemical Resistance', value: 'Designed to resist chemicals and corrosion' },
    { label: 'Weathering Resistance', value: 'Designed to resist environmental stress' },
    { label: 'Tensile Strength', value: 'Selected to accommodate joint movement' },
    { label: 'Flexibility', value: 'Selected to accommodate joint movement' },
    { label: 'Profile Types', value: 'Centre bulb, dumbbell and ribbed' },
    { label: 'Jointing', value: 'Weldable at intersections for a continuous system' },
    { label: 'Manufacturing', value: 'Manufactured at Bharat Electrosafe facilities' },
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
    'Weld intersections and terminations to form a continuous seal',
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
      type: 'Standards information',
      name: 'IS 15058:2002 product information — available on request',
      issuer: 'Bharat Electrosafe',
      available: false,
      thumbnail: '/images/documents/doc-approval.webp',
      kind: 'standards-information',
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
 * The product-page hero — the first gallery slide.
 *
 * Stored once rather than as its own field, so the hero and the opening
 * carousel slide can never drift apart or download the same bytes twice.
 */
export function getHeroImage(product: ProductData): ProductGalleryImage {
  return product.images.gallery[0];
}

/**
 * Tailwind classes positioning an image inside its frame.
 *
 * Isolated product shots are contained and given a little breathing room so a
 * moulded marking or a cut edge is never clipped; photographs taken in a real
 * setting fill the frame.
 */
export function imageFitClass(image: ProductImage, containPadding = 'p-3'): string {
  return image.fit === 'contain' ? `object-contain ${containPadding}` : 'object-cover';
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
  /** The one approved card image, carried with its alt and fit mode. */
  thumbnail: ProductImage;
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
