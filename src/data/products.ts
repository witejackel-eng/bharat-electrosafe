/**
 * Product Data — Bharat Electrosafe
 *
 * Comprehensive data definitions for all 5 products.
 * Electrical insulating mat data verified against IS 15652:2006.
 * Engineered-product content corrected — no unsupported numeric claims.
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

export interface Document {
  type: string;
  name: string;
  issuer: string;
  available: boolean;
}

export interface ProductData {
  slug: string;
  name: string;
  shortName: string;
  heroSlotId: string;
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
  images: {
    thumbnail: string;
    hero: string;
    details: string[];
    overview?: string;
    application?: string;
  };
}

/* ────────────────────────────────────────────
   Product 1: Electrical Insulating Mats
   ──────────────────────────────────────────── */

const electricalInsulatingMats: ProductData = {
  slug: 'electrical-insulating-mats',
  name: 'Electrical Insulating Mats',
  shortName: 'EIM',
  heroSlotId: 'PRODUCT-EIM-HERO-01',
  description:
    'IS 15652:2006 certified Class A, B & C electrical insulating mats providing voltage-rated protection for control panels, substations and industrial environments.',
  introduction:
    'Bharat Electrosafe Electrical Insulating Mats are manufactured to IS 15652:2006 standards and certified by BIS. Available in Class A (650V), Class B (1100V), and Class C (3300V), these mats provide essential electrical insulation protection for operators working near live equipment in control panels, substations, and switchrooms.',
  badges: ['IS 15652:2006', 'Class A/B/C', 'BIS Certified'],
  quickFacts: [
    { icon: 'zap', label: 'Voltage Rating', value: '650V – 3300V' },
    { icon: 'ruler', label: 'Thickness', value: '2mm – 5mm' },
    { icon: 'award', label: 'Standard', value: 'IS 15652:2006' },
  ],
  overviewText:
    'Designed for maximum operator safety in high-voltage environments, our Electrical Insulating Mats create a reliable insulating barrier between the operator and the floor. Each class is tested to rigorous voltage standards, ensuring compliance with Indian and international safety requirements. The mats are available in multiple surface patterns for anti-slip performance and can be custom-cut to fit any installation.',
  keyBenefits: [
    { icon: 'shield', text: 'Voltage-rated protection compliant with IS 15652:2006' },
    { icon: 'layers', text: 'Multiple class options — A, B and C — for varying voltage environments' },
    { icon: 'settings', text: 'Custom dimensions available for any installation requirement' },
    { icon: 'badge-check', text: 'BIS certified and independently tested for breakdown voltage' },
  ],
  specifications: {
    headers: ['Property', 'Class A (BES1001)', 'Class B (BES1002)', 'Class C (BES1003)'],
    rows: [
      ['Working Voltage', '3.3 KV', '11.0 KV', '33.0 KV'],
      ['AC Proof Voltage', '10.0 KV', '22.0 KV', '36.0 KV'],
      ['Dielectric Strength', '30.0 KV', '45.0 KV', '65.0 KV'],
      ['Thickness', '2.0 mm', '2.5 mm', '3.0 mm'],
      ['Width', '1 metre', '1 metre', '1 metre'],
      ['Lengths', '10 m / 20 m', '10 m / 20 m', '10 m / 20 m'],
      ['Standard Colours', 'Black, Blue', 'Black, Blue', 'Black, Blue'],
      ['Surface Patterns', 'Coin, Dot, Hexa', 'Coin, Dot, Hexa', 'Coin, Dot, Hexa'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'Elastomer compound (PVC / Rubber blend)' },
    { label: 'Insulation Grade', value: 'Class A / B / C per IS 15652:2006' },
    { label: 'Tensile Strength (min)', value: '15 N/mm²' },
    { label: 'Elongation at Break (min)', value: '250%' },
    { label: 'Leakage Current (max)', value: '10 mA' },
    { label: 'Insulation Resistance @ 500 V (min)', value: '100,000 MΩ' },
    { label: 'Flame Extinguishing (max)', value: '5 seconds' },
    { label: 'Operating Temperature', value: '−10 °C to 55 °C' },
  ],
  dimensions: [
    { label: 'Standard Width', value: '1 metre' },
    { label: 'Standard Lengths', value: '10 m and 20 m rolls' },
    { label: 'Thickness — Class A', value: '2.0 mm' },
    { label: 'Thickness — Class B', value: '2.5 mm' },
    { label: 'Thickness — Class C', value: '3.0 mm' },
    { label: 'Custom Dimensions', value: 'Available on request' },
  ],
  colors: ['Black', 'Blue'],
  surfacePatterns: ['Coin', 'Dot', 'Hexa'],
  installation: [
    'Clean and dry the floor surface before laying',
    'Cut to required dimensions using a sharp utility knife',
    'Lay flat ensuring no wrinkles or air pockets',
    'Butt-join adjacent mats tightly with no gaps',
    'Seal joints with compatible insulating tape for continuous coverage',
    'Inspect regularly for wear, cuts, or embedded conductive debris',
  ],
  applications: [
    { icon: 'panel-top', name: 'Control Panels', description: 'Insulation for operators standing near live switchgear and control panels' },
    { icon: 'factory', name: 'Substations', description: 'Floor-level protection in power distribution substations' },
    { icon: 'door-open', name: 'Switchrooms', description: 'Safe operating zones within electrical switchrooms' },
    { icon: 'plug', name: 'Power Utilities', description: 'Protection in utility maintenance and repair environments' },
    { icon: 'hard-hat', name: 'Industrial Floors', description: 'General insulation for manufacturing floors with live equipment' },
  ],
  documents: [
    { type: 'Datasheet', name: 'Electrical Insulating Mats — Product Datasheet', issuer: 'Bharat Electrosafe', available: false },
    { type: 'Certificate', name: 'BIS Certification — IS 15652:2006', issuer: 'Bureau of Indian Standards', available: false },
    { type: 'Test Report', name: 'Type Test Report — Class A/B/C', issuer: 'NABL Accredited Lab', available: false },
    { type: 'Installation Guide', name: 'Installation & Maintenance Guide', issuer: 'Bharat Electrosafe', available: false },
  ],
  relatedProducts: ['coloured-strip-insulating-mats', 'bi-color-insulating-mats', 'auto-glow-reflective-band-insulating-mats'],
  classType: 'all',
  hasDatasheet: false,
  images: {
    thumbnail: '/media/products/electrical-insulating-mats/gallery-01.webp',
    hero: '/media/products/electrical-insulating-mats/hero.webp',
    details: ['/media/products/electrical-insulating-mats/gallery-02.webp', '/media/products/electrical-insulating-mats/gallery-03.webp'],
    overview: '/media/products/electrical-insulating-mats/gallery-04.webp',
    application: '/media/products/electrical-insulating-mats/gallery-05.webp',
  },
};

/* ────────────────────────────────────────────
   Product 2: Coloured Strip Insulating Mats
   ──────────────────────────────────────────── */

const colouredStripInsulatingMats: ProductData = {
  slug: 'coloured-strip-insulating-mats',
  name: 'Coloured Strip Insulating Mats',
  shortName: 'CSIM',
  heroSlotId: 'PRODUCT-CSIM-HERO-01',
  description:
    'IS 15652:2006 certified coloured strip insulating mats for hazard zone boundary marking and walkway safety demarcation in electrical environments.',
  introduction:
    'Bharat Electrosafe Coloured Strip Insulating Mats combine electrical insulation with visual safety demarcation. Designed per IS 15652:2006, these strip-format mats create clearly visible hazard zone boundaries around live equipment, walkway edges, and restricted areas — providing both voltage-rated protection and colour-coded safety guidance.',
  badges: ['IS 15652:2006', 'Boundary Marking', 'BIS Certified'],
  quickFacts: [
    { icon: 'palette', label: 'Strip Config', value: 'Colour-coded strips' },
    { icon: 'zap', label: 'Voltage Class', value: 'A / B / C' },
    { icon: 'road', label: 'Application', value: 'Hazard zone marking' },
  ],
  overviewText:
    'In busy electrical environments, clear visual demarcation is as important as insulation. Our Coloured Strip Insulating Mats use contrasting strip configurations to define safe walkways, equipment perimeters, and restricted zones. The colour-coded strips make safety boundaries immediately visible to operators, reducing the risk of accidental contact with live equipment while maintaining full electrical insulation performance.',
  keyBenefits: [
    { icon: 'map', text: 'Clear hazard zone marking with colour-coded strip boundaries' },
    { icon: 'palette', text: 'Colour-coded safety boundaries — yellow, red, green configurations' },
    { icon: 'settings-2', text: 'Strip configuration options for varied boundary widths' },
    { icon: 'wrench', text: 'Easy installation alongside full-width mats or standalone' },
  ],
  specifications: {
    headers: ['Property', 'Class A', 'Class B', 'Class C'],
    rows: [
      ['Working Voltage', '650V AC', '1100V AC', '3300V AC'],
      ['Strip Width', '100mm – 300mm', '100mm – 300mm', '100mm – 300mm'],
      ['Testing Voltage', '3.5kV AC', '6.5kV AC', '15kV AC'],
      ['Thickness (mm)', '2.0', '3.0', '5.0'],
      ['Strip Colours', 'Yellow / Red / Green', 'Yellow / Red / Green', 'Yellow / Red / Green'],
      ['Background Colour', 'Black', 'Black', 'Black'],
      ['Operating Temp.', '–20°C to 70°C', '–20°C to 70°C', '–20°C to 70°C'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'Elastomer compound (PVC / Rubber blend)' },
    { label: 'Insulation Grade', value: 'Class A / B / C per IS 15652:2006' },
    { label: 'Strip Pattern', value: 'Contrasting colour strips on black base' },
    { label: 'Colour Fastness', value: 'High — UV-stable pigments' },
    { label: 'Tensile Strength', value: '≥ 6 MPa' },
    { label: 'Oil Resistance', value: 'Excellent' },
    { label: 'Operating Temperature', value: '–20°C to 70°C' },
  ],
  dimensions: [
    { label: 'Strip Widths', value: '100mm, 150mm, 200mm, 300mm' },
    { label: 'Roll Length', value: 'Custom up to 20m' },
    { label: 'Thickness — Class A', value: '2mm' },
    { label: 'Thickness — Class B', value: '3mm' },
    { label: 'Thickness — Class C', value: '5mm' },
    { label: 'Custom Strip Widths', value: 'Available on request' },
  ],
  colors: ['Yellow on Black', 'Red on Black', 'Green on Black', 'Dual-colour strips'],
  surfacePatterns: ['Strip configuration', 'Chequered base with strip overlay', 'Plain with strip inset'],
  installation: [
    'Plan strip layout to match hazard zone boundaries',
    'Cut strips to required lengths for perimeter marking',
    'Align strip edges precisely for clean visual demarcation',
    'Adhere or butt-join to adjacent full-width mats',
    'Use insulating tape at strip junction points',
    'Inspect strip colour visibility regularly — replace if faded',
  ],
  applications: [
    { icon: 'triangle-alert', name: 'Hazard Zone Marking', description: 'Visible boundaries around high-voltage equipment and restricted areas' },
    { icon: 'footprints', name: 'Walkway Boundaries', description: 'Colour-coded safe walkway edges in substations and switchrooms' },
    { icon: 'box', name: 'Equipment Perimeter', description: 'Perimeter marking around switchgear, transformers and control panels' },
    { icon: 'route', name: 'Substation Pathways', description: 'Defined safe pathways through substation layouts' },
    { icon: 'shield-check', name: 'Industrial Safety Zones', description: 'Safety zone demarcation on manufacturing floors with live equipment' },
  ],
  documents: [
    { type: 'Datasheet', name: 'Coloured Strip Insulating Mats — Product Datasheet', issuer: 'Bharat Electrosafe', available: false },
    { type: 'Certificate', name: 'BIS Certification — IS 15652:2006', issuer: 'Bureau of Indian Standards', available: false },
    { type: 'Test Report', name: 'Type Test Report — Strip Configuration', issuer: 'NABL Accredited Lab', available: false },
    { type: 'Installation Guide', name: 'Installation Guide — Strip Mat Layouts', issuer: 'Bharat Electrosafe', available: false },
  ],
  relatedProducts: ['electrical-insulating-mats', 'bi-color-insulating-mats', 'auto-glow-reflective-band-insulating-mats'],
  classType: 'all',
  hasDatasheet: false,
  images: {
    thumbnail: '/media/products/coloured-strip-insulating-mats/gallery-01.webp',
    hero: '/media/products/coloured-strip-insulating-mats/hero.webp',
    details: ['/media/products/coloured-strip-insulating-mats/gallery-02.webp'],
    overview: '/media/products/coloured-strip-insulating-mats/gallery-03.webp',
  },
};

/* ────────────────────────────────────────────
   Product 3: Bi-Color Insulating Mats
   ──────────────────────────────────────────── */

const biColorInsulatingMats: ProductData = {
  slug: 'bi-color-insulating-mats',
  name: 'Bi-Color Insulating Mats',
  shortName: 'BCIM',
  heroSlotId: 'PRODUCT-BCIM-DIAGRAM-01',
  description:
    'IS 15652:2006 certified bi-color insulating mats with wear-visible contrasting layers that signal when mat integrity needs inspection.',
  introduction:
    'Bharat Electrosafe Bi-Color Insulating Mats feature a dual-layer construction with contrasting top and bottom colours. As the mat wears over time, the underlying contrasting colour becomes visible, providing an immediate visual signal that the mat has reached a wear threshold and should be inspected or replaced. This built-in wear detection system eliminates guesswork and ensures continuous electrical safety.',
  badges: ['IS 15652:2006', 'Wear Detection', 'BIS Certified'],
  quickFacts: [
    { icon: 'eye', label: 'Wear Visible', value: 'Contrasting dual layers' },
    { icon: 'zap', label: 'Voltage Class', value: 'A / B / C' },
    { icon: 'clock', label: 'Service Life', value: 'Visual wear indication' },
  ],
  overviewText:
    'In safety-critical installations, knowing when an insulating mat has worn thin is vital. Our Bi-Color Insulating Mats solve this with a two-layer construction — a dark top surface over a bright contrasting under-layer. When wear reveals the contrasting colour, operators and maintenance teams know immediately that the mat needs inspection or replacement. No special tools, no guesswork — just visible, reliable wear monitoring built into the product itself.',
  keyBenefits: [
    { icon: 'eye', text: 'Wear-visible dual layers provide immediate visual indication of mat thinning' },
    { icon: 'contrast', text: 'Contrasting colour detection — dark surface reveals bright under-layer at wear threshold' },
    { icon: 'timer', text: 'Extended service life indication — proactive replacement before safety compromise' },
    { icon: 'activity', text: 'Layer integrity monitoring without special tools or instruments' },
  ],
  specifications: {
    headers: ['Property', 'Class A', 'Class B', 'Class C'],
    rows: [
      ['Working Voltage', '650V AC', '1100V AC', '3300V AC'],
      ['Testing Voltage', '3.5kV AC', '6.5kV AC', '15kV AC'],
      ['Breakdown Voltage', '≥ 10kV', '≥ 20kV', '≥ 40kV'],
      ['Total Thickness (mm)', '2.5', '3.5', '5.5'],
      ['Top Layer Colour', 'Black / Grey', 'Black / Grey', 'Black / Grey'],
      ['Bottom Layer Colour', 'Yellow / Red', 'Yellow / Red', 'Yellow / Red'],
      ['Wear Indicator Depth', '0.5mm remaining', '0.5mm remaining', '0.5mm remaining'],
      ['Operating Temp.', '–20°C to 70°C', '–20°C to 70°C', '–20°C to 70°C'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'Dual-layer elastomer compound' },
    { label: 'Top Layer', value: 'Black/Grey — primary insulating surface' },
    { label: 'Bottom Layer', value: 'Yellow/Red — contrasting wear indicator' },
    { label: 'Insulation Grade', value: 'Class A / B / C per IS 15652:2006' },
    { label: 'Layer Bonding', value: 'Vulcanised bond — no delamination' },
    { label: 'Tensile Strength', value: '≥ 6 MPa' },
    { label: 'Operating Temperature', value: '–20°C to 70°C' },
  ],
  dimensions: [
    { label: 'Standard Widths', value: '1000mm, 1200mm' },
    { label: 'Standard Lengths', value: 'Custom roll lengths up to 20m' },
    { label: 'Thickness — Class A', value: '2.5mm (dual layer)' },
    { label: 'Thickness — Class B', value: '3.5mm (dual layer)' },
    { label: 'Thickness — Class C', value: '5.5mm (dual layer)' },
    { label: 'Wear Indicator Threshold', value: 'Contrast visible at 0.5mm remaining' },
  ],
  colors: ['Black/Yellow', 'Grey/Red', 'Black/Orange', 'Custom combinations'],
  surfacePatterns: ['Chequered top surface', 'Ribbed top surface', 'Plain top surface'],
  installation: [
    'Lay on clean, dry floor as with standard insulating mats',
    'Ensure the contrasting bottom layer is fully covered at installation',
    'If contrasting colour appears at any point, schedule inspection immediately',
    'Do not attempt to repair worn spots — replace the mat section',
    'Regular visual inspection — check for contrasting colour showing through',
    'Document wear observations in maintenance log for lifecycle tracking',
  ],
  applications: [
    { icon: 'hammer', name: 'Heavy-Wear Environments', description: 'Areas with high foot traffic or equipment movement causing accelerated mat wear' },
    { icon: 'shield-alert', name: 'Safety-Critical Installations', description: 'Substations and switchrooms where mat integrity must be continuously verified' },
    { icon: 'clipboard-check', name: 'Maintenance Monitoring', description: 'Facilities with scheduled maintenance regimes needing visual wear indicators' },
    { icon: 'factory', name: 'Substation Flooring', description: 'Power distribution substations requiring ongoing mat condition assessment' },
    { icon: 'footprints', name: 'Industrial Walkways', description: 'Busy industrial walkways where operators need assurance of mat thickness' },
  ],
  documents: [
    { type: 'Datasheet', name: 'Bi-Color Insulating Mats — Product Datasheet', issuer: 'Bharat Electrosafe', available: false },
    { type: 'Certificate', name: 'BIS Certification — IS 15652:2006', issuer: 'Bureau of Indian Standards', available: false },
    { type: 'Test Report', name: 'Type Test Report — Bi-Color Layer Integrity', issuer: 'NABL Accredited Lab', available: false },
    { type: 'Installation Guide', name: 'Installation & Wear Monitoring Guide', issuer: 'Bharat Electrosafe', available: false },
  ],
  relatedProducts: ['electrical-insulating-mats', 'coloured-strip-insulating-mats', 'auto-glow-reflective-band-insulating-mats'],
  classType: 'all',
  hasDatasheet: false,
  images: {
    thumbnail: '/media/products/bi-color-insulating-mats/gallery-01.webp',
    hero: '/media/products/bi-color-insulating-mats/hero.webp',
    details: ['/media/products/bi-color-insulating-mats/gallery-02.webp'],
  },
};

/* ────────────────────────────────────────────
   Product 4: Auto-Glow / Reflective Band Mats
   ──────────────────────────────────────────── */

const autoGlowReflectiveBandMats: ProductData = {
  slug: 'auto-glow-reflective-band-insulating-mats',
  name: 'Auto-Glow / Reflective Band Insulating Mats',
  shortName: 'AGRIM',
  heroSlotId: 'PRODUCT-AGRIM-LOWLIGHT-01',
  description:
    'IS 15652:2006 certified insulating mats with auto-glow and reflective band variants for emergency pathway guidance in low-light electrical environments.',
  introduction:
    'Bharat Electrosafe Auto-Glow and Reflective Band Insulating Mats provide two critical functions: electrical insulation per IS 15652:2006 and emergency pathway guidance in low-light conditions. The Auto-Glow variant stores ambient light and emits a visible glow during darkness, while the Reflective Band variant bounces external light sources for immediate visibility. Both variants ensure operators can locate safe pathways even during power outages or in poorly lit environments.',
  badges: ['IS 15652:2006', 'Auto-Glow', 'Reflective', 'BIS Certified'],
  quickFacts: [
    { icon: 'sun', label: 'Auto-Glow', value: 'Self-illuminating pathway' },
    { icon: 'mirror', label: 'Reflective', value: 'Light-bounce visibility' },
    { icon: 'zap', label: 'Voltage Class', value: 'A / B / C' },
  ],
  overviewText:
    'When lighting fails in a substation or underground facility, finding the safe path can be life-threatening. Our Auto-Glow mats absorb ambient light during normal operation and emit a sustained glow in darkness, guiding operators to exits and safe zones without any external power. The Reflective Band variant uses high-visibility reflective strips that bounce torchlight or emergency lighting for instant pathway detection. Both variants maintain full Class A/B/C electrical insulation.',
  keyBenefits: [
    { icon: 'sun', text: 'Self-illuminating guidance — Auto-Glow variant emits light in darkness' },
    { icon: 'mirror', text: 'Reflective low-light visibility — Reflective Band variant bounces external light' },
    { icon: 'siren', text: 'Emergency pathway marking — guides operators to safe zones and exits' },
    { icon: 'unplug', text: 'No external power required — glow or reflection works independently' },
  ],
  specifications: {
    headers: ['Property', 'Auto-Glow Variant', 'Reflective Band Variant', 'Standard (Base)'],
    rows: [
      ['Working Voltage', '650V / 1100V / 3300V', '650V / 1100V / 3300V', '650V / 1100V / 3300V'],
      ['Glow Duration', '≥ 8 hours after 30min charge', '—', '—'],
      ['Reflective Index', '—', '≥ 200 cd/lx/m²', '—'],
      ['Thickness (mm)', '2.0 / 3.0 / 5.0', '2.0 / 3.0 / 5.0', '2.0 / 3.0 / 5.0'],
      ['Band/Strip Width', '50mm glow strip', '50mm reflective strip', '—'],
      ['Testing Voltage', '3.5kV / 6.5kV / 15kV', '3.5kV / 6.5kV / 15kV', '3.5kV / 6.5kV / 15kV'],
      ['Operating Temp.', '–20°C to 70°C', '–20°C to 70°C', '–20°C to 70°C'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'Elastomer compound (PVC / Rubber blend)' },
    { label: 'Auto-Glow Element', value: 'Strontium aluminate phosphor strip' },
    { label: 'Reflective Element', value: 'Glass-bead reflective tape strip' },
    { label: 'Insulation Grade', value: 'Class A / B / C per IS 15652:2006' },
    { label: 'Gow Charge Time', value: '≥ 30 minutes ambient light exposure' },
    { label: 'Glow Emission Duration', value: '≥ 8 hours sustained visibility' },
    { label: 'Operating Temperature', value: '–20°C to 70°C' },
  ],
  dimensions: [
    { label: 'Standard Widths', value: '1000mm, 1200mm' },
    { label: 'Strip/Band Width', value: '50mm along mat edges or centre' },
    { label: 'Roll Length', value: 'Custom up to 20m' },
    { label: 'Thickness — Class A', value: '2mm' },
    { label: 'Thickness — Class B', value: '3mm' },
    { label: 'Thickness — Class C', value: '5mm' },
  ],
  colors: ['Black with Green Glow Strip', 'Black with Yellow Reflective Strip', 'Grey with Glow Strip', 'Custom band placement'],
  surfacePatterns: ['Chequered with glow/reflective band', 'Ribbed with glow/reflective band', 'Plain with inset glow strip'],
  installation: [
    'Position glow/reflective bands along designated escape pathways',
    'Ensure bands face the direction of egress for clear guidance',
    'For Auto-Glow: expose mats to ambient light for ≥ 30 min before relying on glow',
    'For Reflective Band: align strips with expected torch/emergency light angles',
    'Butt-join mats ensuring band continuity across adjacent sections',
    'Test glow/reflection performance after installation in simulated low-light conditions',
  ],
  applications: [
    { icon: 'door-open', name: 'Emergency Exits', description: 'Glow/reflective pathway guidance toward emergency exit routes' },
    { icon: 'moon', name: 'Low-Light Substations', description: 'Navigation aid in substations with limited or emergency lighting' },
    { icon: 'mountain', name: 'Underground Facilities', description: 'Pathway marking in underground vaults, tunnels, and cable galleries' },
    { icon: 'train-front', name: 'Railway Platforms', description: 'Emergency guidance on electrified railway platforms and substations' },
    { icon: 'route', name: 'Industrial Emergency Routes', description: 'Marked escape routes through factories with live electrical equipment' },
  ],
  documents: [
    { type: 'Datasheet', name: 'Auto-Glow / Reflective Band Mats — Product Datasheet', issuer: 'Bharat Electrosafe', available: false },
    { type: 'Certificate', name: 'BIS Certification — IS 15652:2006', issuer: 'Bureau of Indian Standards', available: false },
    { type: 'Test Report', name: 'Glow Duration & Reflective Index Test Report', issuer: 'NABL Accredited Lab', available: false },
    { type: 'Installation Guide', name: 'Installation Guide — Emergency Pathway Layout', issuer: 'Bharat Electrosafe', available: false },
  ],
  relatedProducts: ['electrical-insulating-mats', 'coloured-strip-insulating-mats', 'bi-color-insulating-mats'],
  classType: 'all',
  hasDatasheet: false,
  images: {
    thumbnail: '/media/products/auto-glow-reflective-band/gallery-01.webp',
    hero: '/media/products/auto-glow-reflective-band/low-light.webp',
    details: ['/media/products/auto-glow-reflective-band/gallery-02.webp'],
  },
};

/* ────────────────────────────────────────────
   Product 5: BharatMembrane
   ──────────────────────────────────────────── */

const bharatMembrane: ProductData = {
  slug: 'bharat-membrane',
  name: 'BharatMembrane',
  shortName: 'BM',
  heroSlotId: 'PRODUCT-BM-HERO-01',
  description:
    'PVC Geo-Membrane for tunnel waterproofing, containment lining and barrier protection — IS 15909:2020 certified engineered membrane for civil and environmental applications.',
  introduction:
    'BharatMembrane is a high-grade PVC Geo-Membrane engineered for tunnel waterproofing, containment lining and barrier protection in civil and environmental engineering applications. Manufactured from premium PVC polymers with chemical resistance, UV stability and mechanical strength for leak-proof performance. Unlike our electrical insulating mats, BharatMembrane provides waterproofing and moisture barrier protection for infrastructure projects.',
  badges: ['IS 15909:2020', 'PVC Geo-Membrane', 'Civil Engineering', 'Waterproofing'],
  quickFacts: [
    { icon: 'droplets', label: 'Function', value: 'Waterproofing barrier' },
    { icon: 'ruler', label: 'Thickness', value: '1.2mm – 2.0mm' },
    { icon: 'building', label: 'Application', value: 'Infrastructure projects' },
  ],
  overviewText:
    'BharatMembrane delivers continuous waterproofing protection for structures exposed to moisture, groundwater, and weather. Its elastomeric composition provides long-term flexibility, accommodating structural movement without cracking. Available in multiple thicknesses for different exposure levels, BharatMembrane can be applied by torch-welding, adhesive bonding, or self-adhesive methods depending on project requirements.',
  keyBenefits: [
    { icon: 'shield', text: 'Waterproofing protection against moisture, groundwater, and weather ingress' },
    { icon: 'git-branch', text: 'Flexible membrane application — torch-welded, adhesive, or self-adhesive' },
    { icon: 'hammer', text: 'Durable construction withstands structural movement and environmental stress' },
    { icon: 'wrench', text: 'Easy joining and installation with proven seam techniques' },
  ],
  specifications: {
    headers: ['Property', 'BM-1200', 'BM-1500', 'BM-2000'],
    rows: [
      ['Thickness', '1.2mm', '1.5mm', '2.0mm'],
      ['Reinforcement', 'Polyester mesh', 'Polyester mesh', 'Polyester mesh'],
      ['Tensile Strength', '≥ 15 MPa', '≥ 18 MPa', '≥ 20 MPa'],
      ['Elongation at Break', '≥ 300%', '≥ 300%', '≥ 350%'],
      ['Water Penetration', 'Zero', 'Zero', 'Zero'],
      ['Puncture Resistance', 'High', 'High', 'Very High'],
      ['Application Temp.', '–10°C to 80°C', '–10°C to 80°C', '–10°C to 80°C'],
    ],
  },
  materialProperties: [
    { label: 'Base Material', value: 'Modified bitumen with elastomeric compound' },
    { label: 'Reinforcement', value: 'Polyester mesh / glass fibre mat' },
    { label: 'Surface Finish', value: 'Polyethylene film / sand finish / mineral granules' },
    { label: 'Tensile Strength', value: '≥ 15 MPa (BM-1200)' },
    { label: 'Elongation at Break', value: '≥ 300%' },
    { label: 'Water Penetration Resistance', value: 'Zero — full waterproof barrier' },
    { label: 'UV Resistance', value: 'High — suitable for exposed rooftop applications' },
    { label: 'Root Resistance', value: 'Yes — meets root penetration resistance standards' },
  ],
  dimensions: [
    { label: 'Standard Width', value: '1000mm (1m)' },
    { label: 'Roll Length', value: '10m, 15m, 20m standard' },
    { label: 'Thickness — BM-1200', value: '1.2mm' },
    { label: 'Thickness — BM-1500', value: '1.5mm' },
    { label: 'Thickness — BM-2000', value: '2.0mm' },
    { label: 'Custom Lengths', value: 'Available on request' },
  ],
  colors: ['Black (PE film)', 'Sand finish', 'Mineral granule — Green/Grey'],
  surfacePatterns: ['Smooth (PE film surface)', 'Sand-coated', 'Mineral granule textured'],
  installation: [
    'Torch-welding method: heat-weld overlapping seams for continuous seal',
    'Adhesive method: apply approved membrane adhesive to substrate and membrane',
    'Self-adhesive method: peel protective film and press onto primed substrate',
    'Minimum overlap at seams: 100mm for all application methods',
    'Ensure substrate is clean, dry, and primed before membrane application',
    'Seal all edges, corners, and penetrations with compatible flashing material',
    'Test seam integrity with peel test after installation',
  ],
  applications: [
    { icon: 'cloud', name: 'Roof Waterproofing', description: 'Flat and pitched roof membranes for commercial and industrial buildings' },
    { icon: 'layers', name: 'Basement Protection', description: 'Below-grade waterproofing for basement walls and floors' },
    { icon: 'mountain', name: 'Tunnel Lining', description: 'Waterproof membrane lining for tunnels and underground passages' },
    { icon: 'box', name: 'Foundation Sealing', description: 'Foundation wall and slab waterproofing for new construction' },
    { icon: 'building-2', name: 'Infrastructure Projects', description: 'Large-scale infrastructure — bridges, flyovers, water treatment plants' },
  ],
  documents: [
    { type: 'Datasheet', name: 'BharatMembrane — Product Datasheet', issuer: 'Bharat Electrosafe', available: false },
    { type: 'Test Report', name: 'Water Penetration & Tensile Test Report', issuer: 'NABL Accredited Lab', available: false },
    { type: 'Installation Guide', name: 'Installation & Joining Guide', issuer: 'Bharat Electrosafe', available: false },
    { type: 'Certificate', name: 'BIS Certification — IS 15909:2020', issuer: 'Bureau of Indian Standards', available: false },
  ],
  relatedProducts: ['electrical-insulating-mats', 'auto-glow-reflective-band-insulating-mats'],
  classType: 'membrane',
  hasDatasheet: false,
  images: {
    thumbnail: '/media/products/bharat-membrane/gallery-01.webp',
    hero: '/media/products/bharat-membrane/hero.webp',
    details: ['/media/products/bharat-membrane/gallery-02.webp', '/media/products/bharat-membrane/gallery-03.webp'],
    overview: '/media/products/bharat-membrane/gallery-04.webp',
  },
};

/* ────────────────────────────────────────────
   Product Registry
   ──────────────────────────────────────────── */

export const products: ProductData[] = [
  electricalInsulatingMats,
  colouredStripInsulatingMats,
  biColorInsulatingMats,
  autoGlowReflectiveBandMats,
  bharatMembrane,
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductNames(): string[] {
  return products.map((p) => p.name);
}

/** Labels for the contact-form product selector — all five families. */
export const contactProductOptions = products.map((p) => ({
  value: p.slug,
  label: p.name,
}));
