/**
 * Product Route Manifest — Bharat Electrosafe
 *
 * Single source of truth for all canonical product routes.
 * Components MUST consume routes from this file rather than
 * hardcoding path strings independently.
 *
 * This eliminates the class of defect where a route string is
 * updated in one location but not another.
 */

export interface ProductRoute {
  /** Unique key matching product slug or navigation group ID. */
  key: string;
  /** Human-readable display name for navigation. */
  displayName: string;
  /** The one canonical path — never a legacy path. */
  canonicalPath: string;
  /** Legacy paths that must permanently redirect to canonicalPath. */
  legacyPaths: string[];
  /** Parent route key (for breadcrumbs). */
  parentKey?: string;
  /** Fragment anchors available on this page. */
  anchors?: { id: string; label: string }[];
}

export const productRoutes: ProductRoute[] = [
  // ── Products Hub ──
  {
    key: 'products',
    displayName: 'Products',
    canonicalPath: '/products',
    legacyPaths: [],
  },

  // ── Electrical Insulating Mats Family ──
  {
    key: 'electrical-insulating-mats',
    displayName: 'Electrical Insulating Mats',
    canonicalPath: '/products/electrical-insulating-mats',
    legacyPaths: [],
    parentKey: 'products',
  },

  // ── HV Electrical Insulation Mats (Domestic) ──
  {
    key: 'high-voltage-electrical-insulation-mats',
    displayName: 'HV Electrical Insulating Mats',
    canonicalPath: '/products/electrical-insulating-mats/high-voltage-electrical-insulation-mats',
    legacyPaths: ['/products/electrical-insulating-mats/domestic'],
    parentKey: 'electrical-insulating-mats',
  },

  // ── Auto Glow ──
  {
    key: 'auto-glow-reflective-band-insulating-mats',
    displayName: 'Auto Glow',
    canonicalPath: '/products/auto-glow-reflective-band-insulating-mats',
    legacyPaths: [],
    parentKey: 'electrical-insulating-mats',
  },

  // ── Bi-Colour ──
  {
    key: 'bi-color-insulating-mats',
    displayName: 'Bi-Colour',
    canonicalPath: '/products/bi-color-insulating-mats',
    legacyPaths: [],
    parentKey: 'electrical-insulating-mats',
  },

  // ── Coloured Strip ──
  {
    key: 'coloured-strip-insulating-mats',
    displayName: 'Coloured Strip',
    canonicalPath: '/products/coloured-strip-insulating-mats',
    legacyPaths: [],
    parentKey: 'electrical-insulating-mats',
  },

  // ── International / Global (IEC 61111) ──
  {
    key: 'international-iec-61111',
    displayName: 'International / Global (IEC 61111:2009)',
    canonicalPath: '/products/international-iec-61111',
    legacyPaths: [],
    parentKey: 'products',
    anchors: [
      { id: 'hv-insulating-mats', label: 'HV Insulating Mats' },
      { id: 'auto-glow', label: 'Auto Glow' },
      { id: 'bi-colour', label: 'Bi-Colour' },
    ],
  },

  // ── Waterproofing Solutions ──
  {
    key: 'waterproofing-solutions',
    displayName: 'Waterproofing Solutions',
    canonicalPath: '/products/waterproofing-solutions',
    legacyPaths: [],
    parentKey: 'products',
  },

  // ── Geo Membrane ──
  {
    key: 'bharat-membrane',
    displayName: 'Geo Membrane Lining',
    canonicalPath: '/products/bharat-membrane',
    legacyPaths: [],
    parentKey: 'waterproofing-solutions',
  },

  // ── Water Stop Seal ──
  {
    key: 'bharat-hydro-seal',
    displayName: 'Water Stop Seal',
    canonicalPath: '/products/bharat-hydro-seal',
    legacyPaths: [],
    parentKey: 'waterproofing-solutions',
  },

  // ── PVC Flooring ──
  {
    key: 'pvc-flooring-solutions',
    displayName: 'PVC Flooring Solutions',
    canonicalPath: '/products/pvc-flooring-solutions',
    legacyPaths: [],
    parentKey: 'products',
  },

  // ── Other Products ──
  {
    key: 'other-products',
    displayName: 'Other Products',
    canonicalPath: '/products/other-products',
    legacyPaths: [],
    parentKey: 'products',
    anchors: [
      { id: 'rubber-sheet', label: 'Rubber Sheet' },
      { id: 'rubber-hose-pipe', label: 'Rubber Hose Pipe' },
      { id: 'esd-mat', label: 'ESD Mat' },
      { id: 'conveyor-belt', label: 'Conveyor Belt' },
    ],
  },
];

/** Get a route by key. */
export function getRoute(key: string): ProductRoute | undefined {
  return productRoutes.find((r) => r.key === key);
}

/** Get the canonical path for a key. */
export function getCanonicalPath(key: string): string | undefined {
  return getRoute(key)?.canonicalPath;
}

/** Get all legacy paths that must redirect. */
export function getAllLegacyRedirects(): { from: string; to: string }[] {
  const redirects: { from: string; to: string }[] = [];
  for (const route of productRoutes) {
    for (const legacy of route.legacyPaths) {
      redirects.push({ from: legacy, to: route.canonicalPath });
    }
  }
  return redirects;
}

/** Check if a path is a known legacy route. */
export function isLegacyPath(path: string): boolean {
  return productRoutes.some((r) => r.legacyPaths.includes(path));
}
