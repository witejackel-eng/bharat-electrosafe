/**
 * Asset Slot System
 *
 * Each slot defines where an image or media asset is used across the site.
 * Slots that have no current public asset use an empty `currentFallbackPath`,
 * which signals the `EmptyMediaFallback` component to render the intentional
 * diagonal-line pattern placeholder.
 */

export interface AssetSlot {
  /** Unique identifier for the slot, e.g. "HOME-HERO-01" */
  slotId: string;
  /** Path to the current fallback image (empty string → EmptyMediaFallback) */
  currentFallbackPath: string;
  /** Alt text for accessibility */
  altText: string;
  /** CSS aspect ratio for desktop viewport, e.g. "16/10" */
  desktopAspectRatio: string;
  /** CSS aspect ratio for mobile viewport, e.g. "4/3" */
  mobileAspectRatio: string;
  /** CSS object-position value, e.g. "center" or "top center" */
  objectPosition: string;
  /** Category grouping for replacement management */
  replacementCategory: string;
}

export const assetSlots: AssetSlot[] = [
  /* ── Home page ── */
  {
    slotId: 'HOME-HERO-01',
    currentFallbackPath: '',
    altText: 'Hero image — electrical insulating mats in substation environment',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'top center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'HOME-PRODUCT-EIM-01',
    currentFallbackPath: '',
    altText: 'Electrical Insulating Mats — product showcase',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'HOME-PRODUCT-CSIM-01',
    currentFallbackPath: '',
    altText: 'Coloured Strip Insulating Mats — product showcase',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'HOME-PRODUCT-BCIM-01',
    currentFallbackPath: '',
    altText: 'Bi-Color Insulating Mats — product showcase',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'HOME-PRODUCT-AGRIM-01',
    currentFallbackPath: '',
    altText: 'Auto-Glow / Reflective Band Mats — product showcase',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'HOME-PRODUCT-BM-01',
    currentFallbackPath: '',
    altText: 'BharatMembrane — product showcase',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'HOME-CAPABILITY-01',
    currentFallbackPath: '',
    altText: 'Manufacturing capability and production facility',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'manufacturing',
  },

  /* ── About page ── */
  {
    slotId: 'ABOUT-LEADERSHIP-01',
    currentFallbackPath: '',
    altText: 'Company leadership and management team',
    desktopAspectRatio: '4/3',
    mobileAspectRatio: '1/1',
    objectPosition: 'top center',
    replacementCategory: 'leadership',
  },
  {
    slotId: 'ABOUT-MANUFACTURING-01',
    currentFallbackPath: '',
    altText: 'Manufacturing plant and production lines',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'manufacturing',
  },
  {
    slotId: 'ABOUT-TESTING-01',
    currentFallbackPath: '',
    altText: 'Quality testing and certification lab',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'manufacturing',
  },
  {
    slotId: 'ABOUT-AWARD-01',
    currentFallbackPath: '',
    altText: 'Awards, certifications and industry recognition',
    desktopAspectRatio: '4/3',
    mobileAspectRatio: '1/1',
    objectPosition: 'center',
    replacementCategory: 'leadership',
  },

  /* ── Product pages ── */
  {
    slotId: 'PRODUCT-EIM-HERO-01',
    currentFallbackPath: '',
    altText: 'Electrical Insulating Mats hero — installed in substation',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'top center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'PRODUCT-EIM-GALLERY-01',
    currentFallbackPath: '',
    altText: 'Electrical Insulating Mats gallery — multiple angles',
    desktopAspectRatio: '4/3',
    mobileAspectRatio: '1/1',
    objectPosition: 'center',
    replacementCategory: 'product-gallery',
  },
  {
    slotId: 'PRODUCT-CSIM-HERO-01',
    currentFallbackPath: '',
    altText: 'Coloured Strip Insulating Mats hero — boundary marking',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'top center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'PRODUCT-BCIM-DIAGRAM-01',
    currentFallbackPath: '',
    altText: 'Bi-Color Insulating Mats — wear-visible layer diagram',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-diagram',
  },
  {
    slotId: 'PRODUCT-AGRIM-LOWLIGHT-01',
    currentFallbackPath: '',
    altText: 'Auto-Glow Mats in low-light emergency environment',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'PRODUCT-BM-HERO-01',
    currentFallbackPath: '',
    altText: 'BharatMembrane hero — waterproofing application',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'top center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'PRODUCT-BHS-HERO-01',
    currentFallbackPath: '',
    altText: 'BharatHydro Seal hero — water stop application',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'top center',
    replacementCategory: 'product-hero',
  },
  {
    slotId: 'HOME-PRODUCT-BHS-01',
    currentFallbackPath: '',
    altText: 'BharatHydro Seal — product showcase',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'product-hero',
  },

  /* ── Contact page ── */
  {
    slotId: 'CONTACT-OFFICE-01',
    currentFallbackPath: '',
    altText: 'Bharat Electrosafe office and headquarters exterior',
    desktopAspectRatio: '16/10',
    mobileAspectRatio: '4/3',
    objectPosition: 'center',
    replacementCategory: 'office',
  },
];

/**
 * Helper: find a slot by its ID.
 */
export function getSlotById(slotId: string): AssetSlot | undefined {
  return assetSlots.find((s) => s.slotId === slotId);
}

/**
 * Helper: get all slots in a given category.
 */
export function getSlotsByCategory(category: string): AssetSlot[] {
  return assetSlots.filter((s) => s.replacementCategory === category);
}
