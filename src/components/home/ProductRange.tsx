import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import {
  hvVisuals,
  membraneVisuals,
  pvcFlooringVisuals,
  otherProductsVisuals,
  type ProductVisualRole,
} from '@/data/product-visuals';

/* ────────────────────────────────────────────
   4-Group Homepage Product Cards
   ────────────────────────────────────────────
   Four primary product groups with IEC as a
   subsection of Electrical Insulating Mats.
   Uses centralized product-visuals.ts as the
   single source of truth for all imagery. */

interface ProductGroupCardData {
  slug: string;
  name: string;
  description: string;
  visual: ProductVisualRole;
  /** Optional standards/range metadata shown as compact secondary line */
  standardsLine?: string;
  /** Per-image object-position for deliberate cropping */
  objectPosition?: string;
}

const productGroups: ProductGroupCardData[] = [
  {
    slug: 'electrical-insulating-mats',
    name: 'Electrical Insulating Mats',
    description:
      'IS 15652 and IEC 61111 insulating mat solutions for electrical safety around switchgear and substations.',
    visual: hvVisuals.homePreview,
    standardsLine: 'Domestic · IS 15652:2006  ·  International · IEC 61111',
    objectPosition: 'center 30%',
  },
  {
    slug: 'bharat-membrane',
    name: 'Waterproofing Solutions',
    description:
      'BharatMembrane and Bharat Hydro Seal systems for tunnels, containment and industrial waterproofing.',
    visual: membraneVisuals.homePreview,
    objectPosition: 'center 40%',
  },
  {
    slug: 'pvc-flooring-solutions',
    name: 'PVC Flooring Solutions',
    description:
      'Industrial PVC flooring for electrical, technical and commercial environments.',
    visual: pvcFlooringVisuals.homePreview,
    objectPosition: 'center 35%',
  },
  {
    slug: 'other-products',
    name: 'Other Products',
    description:
      'Rubber sheets, hose pipes, ESD mats and conveyor belts for industrial applications.',
    visual: otherProductsVisuals.homePreview,
    objectPosition: 'center center',
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

      {/* Image area — tall dominant image region (≈55–62% card height) */}
      <div className="relative w-full overflow-hidden bg-be-cream aspect-[4/3] md:aspect-[16/10]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          style={group.objectPosition ? { objectPosition: group.objectPosition } : undefined}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
        />
        <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/10 transition-colors duration-300" aria-hidden="true" />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1.5 p-5 flex-1">
        {/* Index + label row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-metadata text-be-grey-650 font-medium">Product Group</span>
          <span className="text-[0.65rem] text-be-grey-400 font-mono" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-card-title text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
          {group.name}
        </h3>

        {/* Standards/range metadata line — compact, non-interactive secondary text */}
        {group.standardsLine && (
          <p className="text-[0.7rem] leading-tight text-be-grey-500">
            {group.standardsLine}
          </p>
        )}

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
          supportingText="Four product groups covering electrical insulation, tunnel and containment lining, construction-joint sealing, and industrial flooring."
        />
      </div>

      {/* Responsive grid — 2×2 desktop, 2-col tablet, 1-col mobile */}
      <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 gap-5" data-stagger="true">
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
