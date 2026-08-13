/**
 * Product Visual Mapping — Bharat Electrosafe
 *
 * Central source-of-truth for all product imagery used across the site.
 * Every component that renders a product image MUST reference this file
 * instead of hardcoding paths independently.
 *
 * Image roles:
 *   card         — product card on /products overview
 *   hero         — product detail page hero image (first in carousel)
 *   gallery      — product detail page carousel images (after hero)
 *   application  — contextual installation/application photo
 *   technicalDetail — diagrams, cross-sections, markings
 *   menuPreview  — mega-menu hover preview
 *   homePreview  — homepage product range section
 *
 * Provenance:
 *   CLIENT_SOURCE   — image from client-supplied ZIP assets (v3 WEBSITE_READY or zai-assets)
 *   ORIGINAL_SITE   — image from client's original website (original-site-product-refresh-assets)
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

const PROD = '/media/products';

/* ────────────────────────────────────────────
   HV Insulating Mats
   CLIENT_SOURCE — v3 WEBSITE_READY/01_domestic_hv_insulating_mats
   Plus client-hv/ direct camera uploads
   ──────────────────────────────────────────── */

export const hvVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-card.webp`,
    alt: 'High voltage insulating mat — coined surface pattern with yellow safety strip',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-clean-product.webp`,
    alt: 'High voltage insulating mat — clean product view',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-detail.webp`,
      alt: 'HV insulating mat — surface detail view',
      fit: 'contain',
    },
    {
      src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-range.webp`,
      alt: 'HV insulating mat — product range view',
      fit: 'contain',
    },
    {
      src: `${PROD}/electrical-insulating-mats/client-hv/coined-insulating-mat-11.png`,
      alt: 'Coined pattern insulating mat — alternate view',
      fit: 'contain',
    },
    {
      src: `${PROD}/electrical-insulating-mats/client-hv/coined-insulating-mat-3.png`,
      alt: 'Coined pattern insulating mat — close-up',
      fit: 'contain',
    },
    {
      src: `${PROD}/electrical-insulating-mats/client-hv/dotted-insulating-mat-7.jpg`,
      alt: 'Dotted pattern insulating mat — product view',
      fit: 'contain',
    },
    {
      src: `${PROD}/electrical-insulating-mats/client-hv/dotted-mat-with-guided-strip-2.png`,
      alt: 'Dotted insulating mat with guided strip — hexagon pattern detail',
      fit: 'contain',
    },
  ],
  /* application: removed — no approved client application photograph available.
     eim-application-switchgear-floor.webp was a synthetic scene (UNVERIFIED). */
  menuPreview: {
    src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-card.webp`,
    alt: 'HV insulating mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-card.webp`,
    alt: 'HV electrical insulating mat — coined surface with yellow guided center strip',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Auto Glow / Reflective Band
   CLIENT_SOURCE — v3 WEBSITE_READY/02_auto_glow
   ──────────────────────────────────────────── */

export const autoGlowVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-card-dark.webp`,
    alt: 'Auto Glow insulating mat with photoluminescent visibility band in low light',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-clean-product.webp`,
    alt: 'Auto Glow insulating mat — clean product view',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-card-dark.webp`,
      alt: 'Auto Glow mat — visibility band in low-light conditions',
      fit: 'cover',
    },
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-application-dark.webp`,
      alt: 'Auto Glow mat application in dark conditions showing glow visibility',
      fit: 'cover',
    },
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/product-demo-glowing-dark.png`,
      alt: 'Auto Glow reflective band — glowing in darkness',
      fit: 'cover',
    },
  ],
  application: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-application-dark.webp`,
    alt: 'Auto Glow mat in dark switchgear application showing glow visibility',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-card-dark.webp`,
    alt: 'Auto Glow mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-card-dark.webp`,
    alt: 'Auto Glow reflective band insulating mat',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Bi-Colour
   CLIENT_SOURCE — v3 WEBSITE_READY/03_bi_colour + zai-assets bi-colour
   ──────────────────────────────────────────── */

export const biColourVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/bi-color-insulating-mats/client-approved/bi-colour-card-cross-section.webp`,
    alt: 'Bi-Colour insulating mat — dual-layer cross-section showing contrasting layers',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/bi-color-insulating-mats/client-approved/bi-colour-clean-product.webp`,
    alt: 'Bi-Colour dual-layer insulating mat — clean product view',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${PROD}/bi-color-insulating-mats/client-bi-colour/product-02.png`,
      alt: 'Bi-Colour insulating mat — alternate view showing dual-layer construction',
      fit: 'contain',
    },
    {
      src: `${PROD}/bi-color-insulating-mats/client-bi-colour/product-03.png`,
      alt: 'Bi-Colour insulating mat — close-up detail',
      fit: 'contain',
    },
    {
      src: `${PROD}/bi-color-insulating-mats/client-approved/bi-colour-layer-detail.webp`,
      alt: 'Bi-Colour mat — layer detail showing wear indicator',
      fit: 'cover',
    },
  ],
  technicalDetail: {
    src: `${PROD}/bi-color-insulating-mats/product-demo-bi-color.webp`,
    alt: 'Bi-Colour layer identification diagram — cross-section',
    fit: 'contain',
  },
  menuPreview: {
    src: `${PROD}/bi-color-insulating-mats/client-approved/bi-colour-card-cross-section.webp`,
    alt: 'Bi-Colour mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/bi-color-insulating-mats/client-approved/bi-colour-card-cross-section.webp`,
    alt: 'Bi-Colour insulating mats — dual-layer wear indicator',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Coloured Strip
   CLIENT_SOURCE — v3 WEBSITE_READY/04_colored_strip
   ──────────────────────────────────────────── */

export const coloredStripVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-card-installation.webp`,
    alt: 'Coloured strip insulating mat installed as safety pathway boundary',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-clean-product.webp`,
    alt: 'Coloured strip insulating mat — clean product view with yellow safety boundary',
    fit: 'contain',
  },
  gallery: [
    {
      src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-production.webp`,
      alt: 'Coloured strip mat — production view',
      fit: 'cover',
    },
    {
      src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-card-installation.webp`,
      alt: 'Coloured strip mat — installed in switchgear pathway',
      fit: 'cover',
    },
    {
      src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-clean-product.webp`,
      alt: 'Coloured strip insulating mat — product detail',
      fit: 'contain',
    },
  ],
  application: {
    src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-card-installation.webp`,
    alt: 'Coloured strip insulating mat installed as safety pathway boundary',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-card-installation.webp`,
    alt: 'Coloured Strip mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/coloured-strip-insulating-mats/client-approved/colored-strip-card-installation.webp`,
    alt: 'Coloured Strip insulating mats',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   IEC 61111:2009 International
   Uses client-approved HV, Auto Glow, Bi-Colour card images + IEC marking photos
   ──────────────────────────────────────────── */

export const iecVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-card.webp`,
    alt: 'IEC 61111:2009 compliant insulating mat',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-card.webp`,
    alt: 'Insulating mats to IEC 61111:2009',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/client-approved/auto-glow-card-dark.webp`,
      alt: 'IEC Auto Glow variant — reflective boundary band',
      fit: 'cover',
    },
    {
      src: `${PROD}/bi-color-insulating-mats/client-approved/bi-colour-card-cross-section.webp`,
      alt: 'IEC Bi-Colour variant — dual-layer insulating mat',
      fit: 'cover',
    },
    {
      src: `${PROD}/international-iec/iec-61111-class-0-2-2mm.webp`,
      alt: 'IEC 61111 Class 0-2, 2mm insulating mat',
      fit: 'contain',
    },
    {
      src: `${PROD}/international-iec/iec-61111-class-2.webp`,
      alt: 'IEC 61111 Class 2 insulating mat marking',
      fit: 'contain',
    },
  ],
  menuPreview: {
    src: `${PROD}/electrical-insulating-mats/client-hv-approved/domestic-hv-card.webp`,
    alt: 'IEC 61111 mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: '/media/categories/electrical-insulating-mats-category.png',
    alt: 'International IEC 61111 insulating mats',
    fit: 'contain',
  },
};

/* ────────────────────────────────────────────
   Geo Membrane (BharatMembrane)
   CLIENT_SOURCE — v3 WEBSITE_READY/06_geo_membrane
   ──────────────────────────────────────────── */

export const membraneVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/bharat-membrane/client-approved/geo-membrane-card-tunnel.webp`,
    alt: 'PVC waterproof membrane lining inside an underground tunnel',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/bharat-membrane/client-approved/geo-membrane-card-tunnel.webp`,
    alt: 'Geo membrane tunnel lining installation',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/bharat-membrane/client-approved/geo-membrane-installation-worker.webp`,
      alt: 'Geo membrane installation with worker for scale',
      fit: 'cover',
    },
    {
      src: `${PROD}/bharat-membrane/client-approved/geo-membrane-large-scale.webp`,
      alt: 'Large-scale geo membrane containment installation',
      fit: 'cover',
    },
    {
      src: `${PROD}/bharat-membrane/gallery/01-tunnel-membrane-lining.webp`,
      alt: 'BharatMembrane tunnel membrane lining installation',
      fit: 'cover',
    },
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
  ],
  application: {
    src: `${PROD}/bharat-membrane/client-approved/geo-membrane-installation-worker.webp`,
    alt: 'Geo-membrane installation application',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/bharat-membrane/client-approved/geo-membrane-card-tunnel.webp`,
    alt: 'Geo Membrane tunnel preview',
    fit: 'cover',
  },
  homePreview: {
    src: '/media/categories/waterproofing-solutions-category.png',
    alt: 'Waterproofing membrane being installed inside an infrastructure tunnel',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Bharat Hydro Seal (Water Stop)
   CLIENT_SOURCE — v3 WEBSITE_READY/07_water_stop_seal
   ──────────────────────────────────────────── */

export const hydroSealVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/bharat-hydro-seal/client-approved/water-stop-card-black.webp`,
    alt: 'PVC water-stop profile with central bulb and ribbed wings',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/bharat-hydro-seal/client-approved/water-stop-card-black.webp`,
    alt: 'PVC water-stop profile — product view',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/bharat-hydro-seal/client-approved/water-stop-light-profile.webp`,
      alt: 'Water stop seal — light profile view',
      fit: 'contain',
    },
    {
      src: `${PROD}/bharat-hydro-seal/client-approved/water-stop-black-alternate.webp`,
      alt: 'Water stop seal — black alternate view',
      fit: 'contain',
    },
    {
      src: `${PROD}/bharat-hydro-seal/gallery/02-centre-bulb-profile.webp`,
      alt: 'Centre bulb water stop profile — alternate view',
      fit: 'contain',
    },
    {
      src: `${PROD}/bharat-hydro-seal/gallery/03-flat-flange-profile.webp`,
      alt: 'Flat flange water stop profile',
      fit: 'contain',
    },
  ],
  menuPreview: {
    src: `${PROD}/bharat-hydro-seal/client-approved/water-stop-card-black.webp`,
    alt: 'Water Stop Seal preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/bharat-hydro-seal/client-approved/water-stop-card-black.webp`,
    alt: 'Water Stop Seal',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   PVC Flooring (Bharat Smart Floor)
   ──────────────────────────────────────────── */

export const pvcFlooringVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/pvc-flooring-solutions/pvc-flooring-hero-roll-to-installation.webp`,
    alt: 'Industrial PVC flooring roll inside an electrical control room',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/pvc-flooring-solutions/pvc-flooring-hero-roll-to-installation.webp`,
    alt: 'Industrial PVC flooring roll transitioning to installed flooring',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/pvc-flooring-solutions/pvc-flooring-overview-surface-detail.webp`,
      alt: 'PVC flooring material surface detail and flexible edge',
      fit: 'cover',
    },
    {
      src: `${PROD}/pvc-flooring-solutions/pvc-flooring-application-electrical-room.webp`,
      alt: 'PVC flooring installed in electrical control room',
      fit: 'cover',
    },
  ],
  application: {
    src: `${PROD}/pvc-flooring-solutions/pvc-flooring-application-electrical-room.webp`,
    alt: 'PVC flooring installed in electrical control room application',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/pvc-flooring-solutions/pvc-flooring-hero-roll-to-installation.webp`,
    alt: 'PVC Flooring preview',
    fit: 'cover',
  },
  homePreview: {
    src: '/media/categories/pvc-flooring-solutions-category.png',
    alt: 'Industrial PVC flooring being installed in an electrical equipment room',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Other Products
   ──────────────────────────────────────────── */

export const otherProductsVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/other-products/other-products-hero-industrial-range.webp`,
    alt: 'Industrial rubber sheet, hose, ESD mat and conveyor products',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/other-products/other-products-hero-industrial-range.webp`,
    alt: 'Industrial rubber sheet, hose, ESD mat and conveyor products',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/other-products/rubber-sheet-product-angle-01.webp`,
      alt: 'Rubber sheet product — industrial grade',
      fit: 'cover',
    },
    {
      src: `${PROD}/other-products/rubber-sheet-product-angle-02.webp`,
      alt: 'Rubber sheet product — alternate angle',
      fit: 'cover',
    },
    {
      src: `${PROD}/other-products/rubber-hose-derived-from-other-products.webp`,
      alt: 'Rubber hose pipe coil from industrial product range',
      fit: 'cover',
    },
    {
      src: `${PROD}/other-products/esd-mat-electronics-workbench.webp`,
      alt: 'ESD protective work mat on an electronics workbench',
      fit: 'cover',
    },
    {
      src: `${PROD}/other-products/conveyor-belt-industrial-application.webp`,
      alt: 'Industrial rubber conveyor belt installed on conveyor rollers',
      fit: 'cover',
    },
  ],
  menuPreview: {
    src: `${PROD}/other-products/other-products-hero-industrial-range.webp`,
    alt: 'Other products preview',
    fit: 'cover',
  },
  homePreview: {
    src: '/media/categories/other-products-category.png',
    alt: 'Industrial rubber sheet, hose, ESD mat and conveyor belt products',
    fit: 'contain',
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
