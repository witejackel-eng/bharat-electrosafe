/**
 * Product Visual Mapping — Bharat Electrosafe
 *
 * Central source-of-truth for all product imagery used across the site.
 * Every component that renders a product image MUST reference this file
 * instead of hardcoding paths independently.
 *
 * Image roles:
 *   card         — product card on /products overview
 *   hero         — product detail page hero image
 *   gallery      — product detail page gallery images
 *   application  — contextual installation/application photo
 *   technicalDetail — diagrams, cross-sections, markings
 *   menuPreview  — mega-menu hover preview
 *   homePreview  — homepage product range section
 */

export interface ProductVisualRole {
  src: string;
  alt: string;
  /** 'contain' for isolated product, 'cover' for contextual photography */
  fit: 'contain' | 'cover';
}

export interface ProductVisuals {
  card: ProductVisualRole;
  hero: ProductVisualRole;
  gallery: ProductVisualRole[];
  application?: ProductVisualRole;
  technicalDetail?: ProductVisualRole;
  menuPreview: ProductVisualRole;
  homePreview: ProductVisualRole;
}

/* ────────────────────────────────────────────
   Base paths
   ──────────────────────────────────────────── */

const ORIG = '/media/products/original-site';
const PROD = '/media/products';
const BRAND = '/brand';

/* ────────────────────────────────────────────
   HV Insulating Mats
   ──────────────────────────────────────────── */

export const hvVisuals: ProductVisuals = {
  card: {
    src: `${ORIG}/hv/card.webp`,
    alt: 'High-voltage insulating mat — finished blue coined-pattern surface',
    fit: 'contain',
  },
  hero: {
    src: `${ORIG}/hv/product-01.png`,
    alt: 'HV insulating mat surface detail — IS 15652:2006 compliant',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${ORIG}/hv/gallery-01.webp`,
      alt: 'HV insulating mat — product view',
      fit: 'contain',
    },
    {
      src: `${ORIG}/hv/gallery-02.webp`,
      alt: 'HV insulating mat — IS marking detail',
      fit: 'contain',
    },
    {
      src: `${PROD}/electrical-insulating-mats/gallery/01-blue-coin-mat.webp`,
      alt: 'Blue coined-pattern insulating mat roll',
      fit: 'cover',
    },
    {
      src: `${PROD}/electrical-insulating-mats/gallery/02-coin-surface-detail.webp`,
      alt: 'Coin surface pattern detail',
      fit: 'cover',
    },
  ],
  application: {
    src: `${PROD}/electrical-insulating-mats/gallery/06-colour-and-pattern-range.webp`,
    alt: 'Insulating mats installed in switchroom environment',
    fit: 'cover',
  },
  menuPreview: {
    src: `${ORIG}/hv/card.webp`,
    alt: 'HV insulating mat preview',
    fit: 'contain',
  },
  homePreview: {
    src: '/media/home/product-groups/electrical-insulating-mats.webp',
    alt: 'Blue electrical insulating mat installed beside switchgear — IS 15652 and IEC 61111 compliant',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Auto Glow / Reflective Band
   ──────────────────────────────────────────── */

export const autoGlowVisuals: ProductVisuals = {
  card: {
    src: `${ORIG}/auto-glow/card.webp`,
    alt: 'Auto Glow insulating mat with reflective band — clean product view',
    fit: 'contain',
  },
  hero: {
    src: `${ORIG}/auto-glow/product-03.png`,
    alt: 'Auto Glow insulating mat showing reflective boundary treatment',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${ORIG}/auto-glow/gallery-01.webp`,
      alt: 'Auto Glow reflective band detail',
      fit: 'contain',
    },
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/product-demo-glowing-dark.webp`,
      alt: 'Auto Glow mat in low-light conditions showing glow visibility',
      fit: 'cover',
    },
    {
      src: `${ORIG}/auto-glow/gallery-02.webp`,
      alt: 'Auto Glow reflective band — low-light application',
      fit: 'cover',
    },
  ],
  application: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/gallery/01-reflective-bands-daylight.webp`,
    alt: 'Auto Glow reflective bands in daylight application',
    fit: 'cover',
  },
  menuPreview: {
    src: `${ORIG}/auto-glow/card.webp`,
    alt: 'Auto Glow mat preview',
    fit: 'contain',
  },
  homePreview: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/product-demo-glowing-dark.webp`,
    alt: 'Auto Glow reflective band in low light',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Bi-Colour
   ──────────────────────────────────────────── */

export const biColourVisuals: ProductVisuals = {
  card: {
    src: `${ORIG}/bi-color/card.webp`,
    alt: 'Bi-Colour insulating mat — clean dual-layer product view',
    fit: 'contain',
  },
  hero: {
    src: `${ORIG}/bi-color/product-01.png`,
    alt: 'Bi-Colour insulating mat showing contrasting dual layers',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${ORIG}/bi-color/gallery-01.webp`,
      alt: 'Bi-Colour insulating mat alternate view',
      fit: 'contain',
    },
    {
      src: `${PROD}/bi-color-insulating-mats/gallery/01-dual-layer-roll.webp`,
      alt: 'Bi-Colour dual-layer mat roll',
      fit: 'cover',
    },
    {
      src: `${PROD}/bi-color-insulating-mats/gallery/04-layer-cross-section.webp`,
      alt: 'Bi-Colour layer cross-section showing construction',
      fit: 'contain',
    },
  ],
  technicalDetail: {
    src: `${PROD}/bi-color-insulating-mats/product-demo-bi-color.webp`,
    alt: 'Bi-Colour layer identification diagram — cross-section',
    fit: 'contain',
  },
  menuPreview: {
    src: `${ORIG}/bi-color/card.webp`,
    alt: 'Bi-Colour mat preview',
    fit: 'contain',
  },
  homePreview: {
    src: `${ORIG}/bi-color/card.webp`,
    alt: 'Bi-Colour insulating mats',
    fit: 'contain',
  },
};

/* ────────────────────────────────────────────
   Colored Strip
   ──────────────────────────────────────────── */

export const coloredStripVisuals: ProductVisuals = {
  card: {
    src: `${ORIG}/colored-strip/card.webp`,
    alt: 'Colored Strip insulating mat — visible safety boundary strip',
    fit: 'contain',
  },
  hero: {
    src: `${ORIG}/colored-strip/product-03.png`,
    alt: 'Colored Strip insulating mat with high-visibility boundary',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${ORIG}/colored-strip/gallery-01.webp`,
      alt: 'Colored Strip mat application view',
      fit: 'cover',
    },
    {
      src: `${PROD}/coloured-strip-insulating-mats/gallery/01-yellow-strip-hexa-mat.webp`,
      alt: 'Yellow strip on hexa-pattern mat',
      fit: 'cover',
    },
    {
      src: `${PROD}/coloured-strip-insulating-mats/gallery/05-switchroom-boundary.webp`,
      alt: 'Colored strip boundary in switchroom installation',
      fit: 'cover',
    },
  ],
  application: {
    src: `${PROD}/coloured-strip-insulating-mats/gallery/05-switchroom-boundary.webp`,
    alt: 'Colored strip insulating mat installed as safety pathway boundary',
    fit: 'cover',
  },
  menuPreview: {
    src: `${ORIG}/colored-strip/card.webp`,
    alt: 'Colored Strip mat preview',
    fit: 'contain',
  },
  homePreview: {
    src: `${ORIG}/colored-strip/card.webp`,
    alt: 'Colored Strip insulating mats',
    fit: 'contain',
  },
};

/* ────────────────────────────────────────────
   IEC 61111:2009 International
   ──────────────────────────────────────────── */

export const iecVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/international-iec/iec-61111.webp`,
    alt: 'IEC 61111:2009 compliant insulating mat',
    fit: 'contain',
  },
  hero: {
    src: `${PROD}/international-iec/iec-61111.webp`,
    alt: 'Insulating mats to IEC 61111:2009',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${PROD}/international-iec/iec-61111-class-0-2-2mm.webp`,
      alt: 'IEC 61111 Class 0–2, 2mm insulating mat',
      fit: 'contain',
    },
    {
      src: `${PROD}/international-iec/iec-61111-class-2.webp`,
      alt: 'IEC 61111 Class 2 insulating mat marking',
      fit: 'contain',
    },
  ],
  menuPreview: {
    src: `${PROD}/international-iec/iec-61111.webp`,
    alt: 'IEC 61111 mat preview',
    fit: 'contain',
  },
  homePreview: {
    src: '/media/home/product-groups/electrical-insulating-mats.webp',
    alt: 'International IEC 61111 insulating mats',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Geo Membrane (BharatMembrane)
   ──────────────────────────────────────────── */

export const membraneVisuals: ProductVisuals = {
  card: {
    src: `${ORIG}/membrane/card.webp`,
    alt: 'BharatMembrane PVC geo-membrane',
    fit: 'contain',
  },
  hero: {
    src: `${PROD}/bharat-membrane/gallery/01-tunnel-membrane-lining.webp`,
    alt: 'BharatMembrane geo-membrane installed in tunnel lining',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/bharat-membrane/gallery/02-yellow-membrane-tunnel.webp`,
      alt: 'Yellow membrane in tunnel installation',
      fit: 'cover',
    },
    {
      src: `${PROD}/bharat-membrane/gallery/03-membrane-seam-welding.webp`,
      alt: 'Membrane seam welding detail',
      fit: 'cover',
    },
    {
      src: `${PROD}/bharat-membrane/gallery/06-containment-basin-lining.webp`,
      alt: 'Containment basin lining application',
      fit: 'cover',
    },
  ],
  application: {
    src: `${PROD}/bharat-membrane/gallery/01-tunnel-membrane-lining.webp`,
    alt: 'Geo-membrane tunnel lining application',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/bharat-membrane/gallery/01-tunnel-membrane-lining.webp`,
    alt: 'Geo Membrane tunnel preview',
    fit: 'cover',
  },
  homePreview: {
    src: '/media/home/product-groups/waterproofing-solutions.webp',
    alt: 'BharatMembrane geo-membrane tunnel lining — waterproofing containment structure',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Bharat Hydro Seal (Water Stop) — WHITE ONLY
   ──────────────────────────────────────────── */

export const hydroSealVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/bharat-hydro-seal/gallery/02-centre-bulb-profile.webp`,
    alt: 'Bharat Hydro Seal PVC water stop profile — centre bulb white profile',
    fit: 'contain',
  },
  hero: {
    src: `${PROD}/bharat-hydro-seal/gallery/02-centre-bulb-profile.webp`,
    alt: 'Bharat Hydro Seal PVC water stop profile for construction joints',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${PROD}/bharat-hydro-seal/gallery/03-flat-flange-profile.webp`,
      alt: 'Flat flange water stop profile',
      fit: 'contain',
    },
    {
      src: `${PROD}/bharat-hydro-seal/product-03.webp`,
      alt: 'PVC water stop profile detail',
      fit: 'contain',
    },
    {
      src: `${PROD}/bharat-hydro-seal/product-04.webp`,
      alt: 'Water stop seal product view',
      fit: 'contain',
    },
  ],
  menuPreview: {
    src: `${PROD}/bharat-hydro-seal/gallery/02-centre-bulb-profile.webp`,
    alt: 'Water Stop Seal preview',
    fit: 'contain',
  },
  homePreview: {
    src: `${PROD}/bharat-hydro-seal/gallery/02-centre-bulb-profile.webp`,
    alt: 'Water Stop Seal',
    fit: 'contain',
  },
};

/* ────────────────────────────────────────────
   PVC Flooring (Bharat Smart Floor)
   ──────────────────────────────────────────── */

export const pvcFlooringVisuals: ProductVisuals = {
  card: {
    src: `${BRAND}/bharat-smart-floor-graphic.webp`,
    alt: 'Bharat Smart Floor PVC flooring solutions',
    fit: 'contain',
  },
  hero: {
    src: `${BRAND}/bharat-smart-floor-graphic.webp`,
    alt: 'Bharat Smart Floor PVC flooring',
    fit: 'contain',
  },
  gallery: [],
  menuPreview: {
    src: `${BRAND}/bharat-smart-floor-graphic.webp`,
    alt: 'PVC Flooring preview',
    fit: 'contain',
  },
  homePreview: {
    src: '/media/home/product-groups/pvc-flooring-solutions.webp',
    alt: 'PVC flooring roll and installed flooring in industrial control room',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Other Products
   ──────────────────────────────────────────── */

export const otherProductsVisuals: ProductVisuals = {
  card: {
    src: `${BRAND}/other-products-graphic.webp`,
    alt: 'Other industrial products from Bharat Electrosafe',
    fit: 'contain',
  },
  hero: {
    src: `${BRAND}/other-products-graphic.webp`,
    alt: 'Other industrial products',
    fit: 'contain',
  },
  gallery: [],
  menuPreview: {
    src: `${BRAND}/other-products-graphic.webp`,
    alt: 'Other products preview',
    fit: 'contain',
  },
  homePreview: {
    src: '/media/home/product-groups/other-products.webp',
    alt: 'Rubber sheet, hose pipe, ESD mat and conveyor belt — industrial products',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Aggregate export
   ──────────────────────────────────────────── */

export const productVisuals = {
  'electrical-insulating-mats': hvVisuals,
  'auto-glow-reflective-band-insulating-mats': autoGlowVisuals,
  'bi-color-insulating-mats': biColourVisuals,
  'coloured-strip-insulating-mats': coloredStripVisuals,
  'international-iec-61111': iecVisuals,
  'bharat-membrane': membraneVisuals,
  'bharat-hydro-seal': hydroSealVisuals,
  'pvc-flooring-solutions': pvcFlooringVisuals,
  'other-products': otherProductsVisuals,
} as const;

export type ProductVisualKey = keyof typeof productVisuals;

/** Get visuals for a product by slug. */
export function getProductVisuals(slug: string): ProductVisuals | undefined {
  return productVisuals[slug as ProductVisualKey];
}
