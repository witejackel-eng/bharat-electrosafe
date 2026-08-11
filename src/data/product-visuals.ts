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
   Carousel: 01 → 02 → 03 → existing gallery
   ──────────────────────────────────────────── */

export const hvVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/electrical-insulating-mats/eim-hero-electrical-insulating-mat.webp`,
    alt: 'Blue electrical insulating mat partially rolled in a switchgear room',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/electrical-insulating-mats/eim-hero-electrical-insulating-mat.webp`,
    alt: 'Blue electrical insulating mat partially rolled in a switchgear room',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/electrical-insulating-mats/eim-overview-material-range.webp`,
      alt: 'Electrical insulating mat material and surface range',
      fit: 'cover',
    },
    {
      src: `${PROD}/electrical-insulating-mats/eim-application-switchgear-floor.webp`,
      alt: 'Blue insulating mat installed along electrical switchgear',
      fit: 'cover',
    },
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
  ],
  application: {
    src: `${PROD}/electrical-insulating-mats/eim-application-switchgear-floor.webp`,
    alt: 'Blue insulating mat installed along electrical switchgear',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/electrical-insulating-mats/eim-hero-electrical-insulating-mat.webp`,
    alt: 'HV insulating mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: '/media/home/product-groups/electrical-insulating-mats.webp',
    alt: 'Blue electrical insulating mat installed beside switchgear — IS 15652 and IEC 61111 compliant',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Auto Glow / Reflective Band
   Carousel: 10 → 11 → 12 → existing gallery
   ──────────────────────────────────────────── */

export const autoGlowVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-hero-auto-glow-mat.webp`,
    alt: 'Black insulating mat with green visibility boundary band',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-hero-auto-glow-mat.webp`,
    alt: 'Black insulating mat with green visibility boundary band',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-overview-visibility-band.webp`,
      alt: 'Auto Glow reflective visibility band detail',
      fit: 'cover',
    },
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-application-low-light-switchgear.webp`,
      alt: 'Auto Glow mat in low-light conditions showing glow visibility',
      fit: 'cover',
    },
    {
      src: `${ORIG}/auto-glow/gallery-01.webp`,
      alt: 'Auto Glow reflective band detail',
      fit: 'contain',
    },
    {
      src: `${ORIG}/auto-glow/gallery-02.webp`,
      alt: 'Auto Glow reflective band — low-light application',
      fit: 'cover',
    },
  ],
  application: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-application-low-light-switchgear.webp`,
    alt: 'Auto Glow mat in low-light switchgear application',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-hero-auto-glow-mat.webp`,
    alt: 'Auto Glow mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-hero-auto-glow-mat.webp`,
    alt: 'Auto Glow reflective band in low light',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Bi-Colour
   Carousel: 07 → 08 → 09 → existing gallery
   ──────────────────────────────────────────── */

export const biColourVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/bi-color-insulating-mats/bcim-hero-dual-layer-insulating-mat.webp`,
    alt: 'Blue dual-layer insulating mat with contrasting red lower layer',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/bi-color-insulating-mats/bcim-hero-dual-layer-insulating-mat.webp`,
    alt: 'Blue dual-layer insulating mat with contrasting red lower layer',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/bi-color-insulating-mats/bcim-overview-dual-layer-closeup.webp`,
      alt: 'Bi-Colour dual-layer closeup showing material construction',
      fit: 'cover',
    },
    {
      src: `${PROD}/bi-color-insulating-mats/bcim-application-visible-wear-indicator.webp`,
      alt: 'Bi-Colour mat with contrasting lower layer becoming visible as wear indicator',
      fit: 'cover',
    },
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
  ],
  technicalDetail: {
    src: `${PROD}/bi-color-insulating-mats/product-demo-bi-color.webp`,
    alt: 'Bi-Colour layer identification diagram — cross-section',
    fit: 'contain',
  },
  menuPreview: {
    src: `${PROD}/bi-color-insulating-mats/bcim-hero-dual-layer-insulating-mat.webp`,
    alt: 'Bi-Colour mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/bi-color-insulating-mats/bcim-hero-dual-layer-insulating-mat.webp`,
    alt: 'Bi-Colour insulating mats',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Colored Strip
   Carousel: 04 → 05 → 06 → existing gallery
   ──────────────────────────────────────────── */

export const coloredStripVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/coloured-strip-insulating-mats/csim-hero-coloured-strip-insulating-mat.webp`,
    alt: 'Blue insulating mat with yellow safety boundary strips',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/coloured-strip-insulating-mats/csim-hero-coloured-strip-insulating-mat.webp`,
    alt: 'Blue insulating mat with yellow safety boundary strips',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/coloured-strip-insulating-mats/csim-overview-strip-construction.webp`,
      alt: 'Coloured strip construction showing yellow safety boundary detail',
      fit: 'cover',
    },
    {
      src: `${PROD}/coloured-strip-insulating-mats/csim-application-switchgear-pathway.webp`,
      alt: 'Coloured strip mat installed beside switchgear as safety pathway',
      fit: 'cover',
    },
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
  ],
  application: {
    src: `${PROD}/coloured-strip-insulating-mats/csim-application-switchgear-pathway.webp`,
    alt: 'Colored strip insulating mat installed as safety pathway boundary',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/coloured-strip-insulating-mats/csim-hero-coloured-strip-insulating-mat.webp`,
    alt: 'Colored Strip mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/coloured-strip-insulating-mats/csim-hero-coloured-strip-insulating-mat.webp`,
    alt: 'Colored Strip insulating mats',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   IEC 61111:2009 International
   Reuses: 01 (HV), 10 (Auto Glow), 07 (Bi-Colour)
   ──────────────────────────────────────────── */

export const iecVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/electrical-insulating-mats/eim-hero-electrical-insulating-mat.webp`,
    alt: 'IEC 61111:2009 compliant insulating mat',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/electrical-insulating-mats/eim-hero-electrical-insulating-mat.webp`,
    alt: 'Insulating mats to IEC 61111:2009',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/auto-glow-reflective-band-insulating-mats/agrim-hero-auto-glow-mat.webp`,
      alt: 'IEC Auto Glow variant — reflective boundary band',
      fit: 'cover',
    },
    {
      src: `${PROD}/bi-color-insulating-mats/bcim-hero-dual-layer-insulating-mat.webp`,
      alt: 'IEC Bi-Colour variant — dual-layer insulating mat',
      fit: 'cover',
    },
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
    src: `${PROD}/electrical-insulating-mats/eim-hero-electrical-insulating-mat.webp`,
    alt: 'IEC 61111 mat preview',
    fit: 'cover',
  },
  homePreview: {
    src: '/media/home/product-groups/electrical-insulating-mats.webp',
    alt: 'International IEC 61111 insulating mats',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Geo Membrane (BharatMembrane)
   Carousel: 13 (white tunnel) → 14 (seam) → 15 (containment) → existing orange tunnel
   ──────────────────────────────────────────── */

export const membraneVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/bharat-membrane/bharatmembrane-hero-white-tunnel-lining.webp`,
    alt: 'PVC waterproof membrane lining inside an underground tunnel',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/bharat-membrane/bharatmembrane-hero-white-tunnel-lining.webp`,
    alt: 'PVC waterproof membrane lining inside an underground tunnel',
    fit: 'cover',
  },
  gallery: [
    {
      src: `${PROD}/bharat-membrane/bharatmembrane-overview-thermal-seam.webp`,
      alt: 'BharatMembrane thermal seam welding detail',
      fit: 'cover',
    },
    {
      src: `${PROD}/bharat-membrane/bharatmembrane-application-containment.webp`,
      alt: 'Large containment basin lined with geomembrane',
      fit: 'cover',
    },
    {
      src: `${PROD}/bharat-membrane/gallery/01-tunnel-membrane-lining.webp`,
      alt: 'Original BharatMembrane tunnel membrane lining installation',
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
    src: `${PROD}/bharat-membrane/bharatmembrane-application-containment.webp`,
    alt: 'Geo-membrane containment basin lining application',
    fit: 'cover',
  },
  menuPreview: {
    src: `${PROD}/bharat-membrane/bharatmembrane-hero-white-tunnel-lining.webp`,
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
   Bharat Hydro Seal (Water Stop)
   Carousel: 16 → existing profile → existing application
   ──────────────────────────────────────────── */

export const hydroSealVisuals: ProductVisuals = {
  card: {
    src: `${PROD}/bharat-hydro-seal/hydroseal-hero-waterstop-profile.webp`,
    alt: 'PVC water-stop profile with central bulb and ribbed wings',
    fit: 'cover',
  },
  hero: {
    src: `${PROD}/bharat-hydro-seal/hydroseal-hero-waterstop-profile.webp`,
    alt: 'PVC water-stop profile with central bulb and ribbed wings',
    fit: 'cover',
  },
  gallery: [
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
    src: `${PROD}/bharat-hydro-seal/hydroseal-hero-waterstop-profile.webp`,
    alt: 'Water Stop Seal preview',
    fit: 'cover',
  },
  homePreview: {
    src: `${PROD}/bharat-hydro-seal/hydroseal-hero-waterstop-profile.webp`,
    alt: 'Water Stop Seal',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   PVC Flooring (Bharat Smart Floor)
   Carousel: 17 → 18 → 19
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
    src: '/media/home/product-groups/pvc-flooring-solutions.webp',
    alt: 'PVC flooring roll and installed flooring in industrial control room',
    fit: 'cover',
  },
};

/* ────────────────────────────────────────────
   Other Products
   Carousel: 20 → 21 → 22 → hose crop → 24 → 23
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
