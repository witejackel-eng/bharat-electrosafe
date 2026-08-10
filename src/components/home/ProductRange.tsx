import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import {
  hvVisuals,
  iecVisuals,
  membraneVisuals,
  hydroSealVisuals,
  pvcFlooringVisuals,
  otherProductsVisuals,
  type ProductVisualRole,
} from '@/data/product-visuals';

/* ────────────────────────────────────────────
   5-Group Homepage Product Cards
   ────────────────────────────────────────────
   Uses centralized product-visuals.ts as the single
   source of truth for all imagery. No hardcoded
   image paths. 5-group taxonomy (not 6-card). */

interface ProductGroupCardData {
  slug: string;
  name: string;
  description: string;
  visual: ProductVisualRole;
  /** Optional secondary preview for sub-products (shown as small inset). */
  subVisual?: ProductVisualRole;
  subLabel?: string;
}

const productGroups: ProductGroupCardData[] = [
  {
    slug: 'electrical-insulating-mats',
    name: 'Electrical Insulating Mats',
    description:
      'Class A, B and C insulating mats to IS 15652:2006 for operator protection near live switchgear and control panels.',
    visual: hvVisuals.homePreview,
  },
  {
    slug: 'international-iec-61111',
    name: 'International / Global — IEC 61111:2009',
    description:
      'Insulating mats meeting IEC 61111:2009 for global markets — HV, Auto Glow and Bi-Colour variants across Classes 0–4.',
    visual: iecVisuals.homePreview,
  },
  {
    slug: 'bharat-membrane',
    name: 'Water Proofing Solutions',
    description:
      'BharatMembrane PVC geo-membranes for tunnel and containment lining, plus Bharat Hydro Seal PVC water stops for construction joints.',
    visual: membraneVisuals.homePreview,
    subVisual: hydroSealVisuals.homePreview,
    subLabel: 'Hydro Seal',
  },
  {
    slug: 'pvc-flooring-solutions',
    name: 'PVC Flooring Solutions',
    description:
      'Bharat Smart Floor — industrial, electrical and commercial PVC flooring manufactured to IS 3462:1986.',
    visual: pvcFlooringVisuals.menuPreview,
  },
  {
    slug: 'other-products',
    name: 'Other Products',
    description:
      'Rubber Sheet, Rubber Hose Pipe, ESD Mats and Conveyor Belts for diverse industrial applications.',
    visual: otherProductsVisuals.menuPreview,
  },
];

function ProductGroupCard({ group, index }: { group: ProductGroupCardData; index: number }) {
  const { visual } = group;

  return (
    <Link
      href={`/products/${group.slug}`}
      aria-label={`View ${group.name} product page`}
      className="hover-card-lift group relative flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
    >
      {/* Yellow accent line */}
      <div className="h-1 bg-be-yellow-500 group-hover:h-1.5 transition-all duration-300" aria-hidden="true" />

      {/* Image area — 16:10 on desktop, 4:3 on mobile */}
      <div className="relative w-full overflow-hidden bg-be-cream aspect-[4/3] md:aspect-[16/10]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          className={`${visual.fit === 'contain' ? 'object-contain p-3 md:p-2' : 'object-cover'} ${
            visual.fit === 'cover'
              ? 'group-hover:scale-105 transition-transform duration-300'
              : ''
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/10 transition-colors duration-300" aria-hidden="true" />

        {/* Sub-product inset badge (e.g. Hydro Seal within Waterproofing) */}
        {group.subVisual && (
          <div className="absolute bottom-2 right-2 w-14 h-14 rounded-lg overflow-hidden border-2 border-white shadow-md bg-be-cream">
            <Image
              src={group.subVisual.src}
              alt={group.subLabel ?? 'Sub-product'}
              fill
              className={group.subVisual.fit === 'contain' ? 'object-contain p-1' : 'object-cover'}
              sizes="56px"
            />
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        {/* Index */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-metadata text-be-grey-650 font-medium">Product Group</span>
          <span className="text-[0.65rem] text-be-grey-400 font-mono" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-card-title text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
          {group.name}
        </h3>
        <p className="text-body text-be-grey-650 text-sm leading-relaxed line-clamp-2">
          {group.description}
        </p>
        <div className="mt-auto pt-2">
          <span className="text-sm font-medium text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors">
            View Products →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductRange() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="PRODUCT RANGE"
          title="Products for electrical safety and civil protection"
          supportingText="Five product groups covering electrical insulation, visible hazard demarcation, tunnel and containment lining, construction-joint sealing, and industrial flooring."
        />
      </div>

      {/* Responsive grid — 3-col desktop, 2-col tablet, 1-col mobile */}
      <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-stagger="true">
        {productGroups.map((group, i) => (
          <ProductGroupCard key={group.slug} group={group} index={i} />
        ))}
      </div>

      {/* View all products CTA */}
      <div className="mt-8 flex justify-center reveal-up">
        <PrimaryButton href="/products">
          View All Products
        </PrimaryButton>
      </div>
    </SectionShell>
  );
}
