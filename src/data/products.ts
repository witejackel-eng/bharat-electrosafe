/**
 * Product catalogue — six families.
 *
 * Electrical insulating mat data is verified against IS 15652:2006 and the
 * official Bharat Electrosafe source pages. Engineered-product content has
 * been corrected to remove unsupported numeric claims and invented values.
 */

import { company } from './company';

/* ------------------------------------------------------------------ */
/* Shared electrical class table (IS 15652:2006)                       */
/* ------------------------------------------------------------------ */

export interface InsulationClass {
  class: 'A' | 'B' | 'C';
  productCode: string;
  thickness: string;
  workingVoltage: string;
  acProofVoltage: string;
  dielectricStrength: string;
}

export const insulationClasses: InsulationClass[] = [
  {
    class: 'A',
    productCode: 'BES1001',
    thickness: '2.0 mm',
    workingVoltage: '3.3 KV',
    acProofVoltage: '10.0 KV',
    dielectricStrength: '30.0 KV',
  },
  {
    class: 'B',
    productCode: 'BES1002',
    thickness: '2.5 mm',
    workingVoltage: '11.0 KV',
    acProofVoltage: '22.0 KV',
    dielectricStrength: '45.0 KV',
  },
  {
    class: 'C',
    productCode: 'BES1003',
    thickness: '3.0 mm',
    workingVoltage: '33.0 KV',
    acProofVoltage: '36.0 KV',
    dielectricStrength: '65.0 KV',
  },
];

/* ------------------------------------------------------------------ */
/* Shared mat properties (IS 15652:2006)                               */
/* ------------------------------------------------------------------ */

export const matProperties = [
  { label: 'Tensile strength (min)', value: '15 N/mm²' },
  { label: 'Elongation at break (min)', value: '250 %' },
  { label: 'Leakage current (max)', value: '10 mA' },
  { label: 'Insulation resistance @ 500 V (min)', value: '100,000 MΩ' },
  { label: 'Flame extinguishing (max)', value: '5 seconds' },
  { label: 'Working temperature', value: '−10 °C to 55 °C' },
  { label: 'Standard colours', value: 'Black, Blue' },
  { label: 'Width', value: '1 metre' },
  { label: 'Lengths', value: '10 m and 20 m rolls' },
];

export const matPatterns = ['Coin', 'Dot', 'Hexa'] as const;

/* ------------------------------------------------------------------ */
/* Product families                                                    */
/* ------------------------------------------------------------------ */

export interface ProductFamily {
  slug: string;
  name: string;
  shortName: string;
  category: 'Insulating Mats' | 'Engineered Membranes';
  tagline: string;
  summary: string;
  standard: string;
  features: string[];
  applications: string[];
  // Asset slot IDs — placeholders only, no images added
  assetSlots: {
    hero: string;
    gallery: string[];
  };
}

export const products: ProductFamily[] = [
  /* 1 --------------------------------------------------------------- */
  {
    slug: 'electrical-insulating-mats',
    name: 'Electrical Insulating Mats',
    shortName: 'Insulating Mats',
    category: 'Insulating Mats',
    tagline: 'IS 15652:2006 certified electrical safety flooring',
    summary:
      'Rubber-electrical insulating mats engineered to protect personnel working near live electrical equipment. Manufactured and tested to IS 15652:2006 and conforming to IEC 61111, available in three voltage classes.',
    standard: company.certifications.isiStandard,
    features: [
      'Three insulation classes — A, B and C',
      'Coin, Dot and Hexa surface patterns',
      'Anti-skid textured surface',
      'High dielectric strength',
      'Flame self-extinguishing within 5 seconds',
      'Resistant to moisture, oils and acids',
      'Working temperature −10 °C to 55 °C',
    ],
    applications: [
      'Electrical sub-stations',
      'Power generation plants',
      'Switchgear and control rooms',
      'Transformer yards',
      'Industrial maintenance floors',
      'High-voltage laboratories',
    ],
    assetSlots: {
      hero: 'asset-slot-eim-hero',
      gallery: [
        'asset-slot-eim-gallery-1',
        'asset-slot-eim-gallery-2',
        'asset-slot-eim-gallery-3',
      ],
    },
  },

  /* 2 --------------------------------------------------------------- */
  {
    slug: 'coloured-strip-insulating-mats',
    name: 'Coloured Strip Insulating Mats',
    shortName: 'Coloured Strip Mats',
    category: 'Insulating Mats',
    tagline: 'High-visibility hazard-zone demarcation',
    summary:
      'Insulating mats featuring a yellow strip for high-visibility hazard-zone demarcation. Combines the dielectric protection of IS 15652:2006 mats with enhanced visual safety in industrial environments.',
    standard: company.certifications.isiStandard,
    features: [
      'Yellow-strip visual guidance',
      'Hazard-zone demarcation',
      'High visibility in low-light conditions',
      'Anti-slip traction surface',
      'Moisture, oil and chemical resistance',
      'Fire and heat resistance',
      'Full electrical insulation',
      'Industrial safety use',
    ],
    applications: [
      'Live-equipment work zones',
      'Switchyard safety boundaries',
      'High-voltage maintenance areas',
      'Industrial floor marking',
      'Sub-station access points',
    ],
    assetSlots: {
      hero: 'asset-slot-cs-hero',
      gallery: [
        'asset-slot-cs-gallery-1',
        'asset-slot-cs-gallery-2',
        'asset-slot-cs-gallery-3',
      ],
    },
  },

  /* 3 --------------------------------------------------------------- */
  {
    slug: 'bi-color-insulating-mats',
    name: 'Bi-Color Insulating Mats',
    shortName: 'Bi-Color Mats',
    category: 'Insulating Mats',
    tagline: 'Dual-tone visual safety flooring',
    summary:
      'Dual-tone insulating mats providing clear safety-zone differentiation while delivering the full dielectric protection required by IS 15652:2006. The anti-skid embossed surface ensures operator safety in industrial and commercial settings.',
    standard: company.certifications.isiStandard,
    features: [
      'Dual-tone design',
      'Visual differentiation of safety zones',
      'Safety-zone clarity',
      'High dielectric strength',
      'Anti-skid embossed surface',
      'Moisture, oil and chemical resistance',
      'Industrial and commercial use',
    ],
    applications: [
      'Safety-zone marking',
      'Industrial work floors',
      'Commercial electrical rooms',
      'Switchgear enclosures',
      'Maintenance bays',
    ],
    assetSlots: {
      hero: 'asset-slot-bc-hero',
      gallery: [
        'asset-slot-bc-gallery-1',
        'asset-slot-bc-gallery-2',
        'asset-slot-bc-gallery-3',
      ],
    },
  },

  /* 4 --------------------------------------------------------------- */
  {
    slug: 'auto-glow-reflective-band-insulating-mat',
    name: 'Auto-Glow / Reflective Band Insulating Mats',
    shortName: 'Auto-Glow Mats',
    category: 'Insulating Mats',
    tagline: 'Improved visibility for low-light conditions',
    summary:
      'Insulating mats fitted with an auto-glow / reflective band to improve visibility in low-light and emergency conditions. The mat retains full electrical insulation and anti-slip properties for industrial electrical use.',
    standard: company.certifications.isiStandard,
    features: [
      'Auto-glow band',
      'Reflective band',
      'Improved visibility in low light',
      'Emergency-condition visibility',
      'Full electrical insulation',
      'Anti-slip surface',
      'Moisture, oil and chemical resistance',
      'Industrial electrical use',
    ],
    applications: [
      'Emergency egress paths',
      'Low-light sub-station areas',
      'Night-shift maintenance zones',
      'Industrial electrical safety floors',
      'Hazard-zone visibility enhancement',
    ],
    assetSlots: {
      hero: 'asset-slot-ag-hero',
      gallery: [
        'asset-slot-ag-gallery-1',
        'asset-slot-ag-gallery-2',
        'asset-slot-ag-gallery-3',
      ],
    },
  },

  /* 5 --------------------------------------------------------------- */
  {
    slug: 'bharat-membrane',
    name: 'BharatMembrane — PVC Geo-Membrane',
    shortName: 'BharatMembrane',
    category: 'Engineered Membranes',
    tagline: 'PVC geo-membrane for civil and environmental engineering',
    summary:
      'High-grade PVC geo-membrane engineered for tunnel waterproofing, containment lining and barrier protection in civil and environmental engineering applications. Manufactured from premium PVC polymers with chemical resistance, UV stability and mechanical strength for leak-proof performance.',
    standard: company.certifications.membraneStandard,
    features: [
      'PVC Geo-Membrane construction',
      'Tunnel waterproofing',
      'Containment lining',
      'Barrier protection',
      'Civil and environmental engineering grade',
      'High-grade PVC polymers',
      'Chemical resistance',
      'UV stability',
      'Mechanical strength',
      'Leak-proof performance',
    ],
    applications: [
      'Tunnel waterproofing',
      'Basement waterproofing where supported',
      'Landfills',
      'Hazardous-waste containment',
      'Reservoirs',
      'Canals',
      'Ponds',
      'Mining',
      'Ash-dyke lining',
      'Industrial effluent ponds',
      'Aquaculture',
      'Agricultural lining',
    ],
    assetSlots: {
      hero: 'asset-slot-bm-hero',
      gallery: [
        'asset-slot-bm-gallery-1',
        'asset-slot-bm-gallery-2',
        'asset-slot-bm-gallery-3',
      ],
    },
  },

  /* 6 --------------------------------------------------------------- */
  {
    slug: 'bharat-hydro-seal',
    name: 'BharatHydro Seal — Water Stop Solutions',
    shortName: 'BharatHydro Seal',
    category: 'Engineered Membranes',
    tagline: 'Premium water stop solutions for construction joints',
    summary:
      'Premium water stop solutions for construction and expansion joints. Formulated from PVC and rubber compounds to prevent water leakage while offering water-pressure, chemical and environmental resistance, flexibility and long service life.',
    standard: company.certifications.hydroStandard,
    features: [
      'Construction and expansion joint sealing',
      'Water leakage prevention',
      'PVC and rubber compound formulation',
      'Water pressure resistance',
      'Chemical and environmental resistance',
      'Flexibility',
      'Long service life',
    ],
    applications: [
      'Water tanks',
      'Reservoirs',
      'Dams',
      'Canals',
      'Sewage treatment plants',
      'Basements',
      'Underground structures',
      'Swimming pools',
      'Tunnels',
    ],
    assetSlots: {
      hero: 'asset-slot-bh-hero',
      gallery: [
        'asset-slot-bh-gallery-1',
        'asset-slot-bh-gallery-2',
        'asset-slot-bh-gallery-3',
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* BharatMembrane thicknesses                                          */
/* ------------------------------------------------------------------ */

export const membraneThicknesses = [
  '1 mm',
  '1.5 mm',
  '2 mm',
  '2.5 mm',
  '3 mm',
  'Up to 5 mm',
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getProductBySlug(slug: string): ProductFamily | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductNames(): string[] {
  return products.map((p) => p.name);
}

/** Labels for the contact-form product selector — all six families. */
export const contactProductOptions = products.map((p) => ({
  value: p.slug,
  label: p.name,
}));
