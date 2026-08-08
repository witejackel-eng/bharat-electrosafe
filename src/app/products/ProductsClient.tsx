'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Droplets, Layers, Package } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import { CompareProvider, useCompare } from '@/components/products/CompareContext';
import { CompareToggle } from '@/components/products/CompareToggle';
import { CompareBar } from '@/components/products/CompareBar';
import { CompareModal } from '@/components/products/CompareModal';
import {
  productNavGroups,
  ProductNavGroup,
  ProductNavSubGroup,
  ProductNavLeaf,
  categoryVisuals,
} from '@/data/product-navigation';
import {
  productComparisonData,
  productNavigationItems,
  imageFitClass,
  ProductComparisonRow,
} from '@/data/products';

/* ────────────────────────────────────────────
   Group icon map
   ──────────────────────────────────────────── */

const groupIconMap: Record<string, React.ElementType> = {
  'electrical-insulating-mats': Zap,
  'water-proofing-solutions': Droplets,
  'pvc-flooring-solutions': Layers,
  'other-products': Package,
};

/* ────────────────────────────────────────────
   Thumbnail lookup — maps product slug → ProductNavItem
   for the 6 registry products that have real thumbnails.
   ──────────────────────────────────────────── */

const thumbnailLookup = new Map(
  productNavigationItems.map((p) => [p.slug, p]),
);

/** Extract the base slug from an href like /products/electrical-insulating-mats or /products/other-products#rubber-sheet */
function slugFromHref(href: string): string {
  const path = href.split('#')[0]; // strip anchor
  return path.replace(/^\/products\//, '');
}

/* ────────────────────────────────────────────
   Extended comparison data — includes IEC, PVC, Other
   ──────────────────────────────────────────── */

const extendedComparisonData: ProductComparisonRow[] = [
  ...productComparisonData,
  {
    name: 'International Insulating Mats',
    slug: 'international-iec-61111',
    primaryPurpose: 'Operator insulation for IEC markets',
    distinguishingFeature: 'IEC 61111:2009 Class 0–4 classification',
    typicalApplication: 'Export markets requiring IEC compliance',
    applicableStandard: 'IEC 61111:2009',
  },
  {
    name: 'PVC Flooring Solutions',
    slug: 'pvc-flooring-solutions',
    primaryPurpose: 'Industrial and commercial flooring',
    distinguishingFeature: 'Bharat Smart Floor — PVC flooring system',
    typicalApplication: 'Factories, electrical rooms and commercial spaces',
    applicableStandard: 'IS 3462:1986',
  },
  {
    name: 'Other Products',
    slug: 'other-products',
    primaryPurpose: 'Industrial rubber and ESD products',
    distinguishingFeature: 'Rubber Sheet, Hose Pipe, ESD Mat, Conveyor Belt',
    typicalApplication: 'General industrial and electrostatic-safe environments',
    applicableStandard: 'On request',
  },
];

/* ────────────────────────────────────────────
   CompareBarHost — renders the sticky compare bar + modal.
   Must be a child of CompareProvider so useCompare works.
   ──────────────────────────────────────────── */

function CompareBarHost() {
  const { selected } = useCompare();
  const [modalRequested, setModalRequested] = useState(false);

  // Map of slug → product name for display in the bar/modal.
  // Build from productNavigationItems (registry products) since
  // compare only works for the 6 products with full data.
  const selectedNames = useMemo(() => {
    const map: Record<string, string> = {};
    productNavigationItems.forEach((p) => {
      map[p.slug] = p.name;
    });
    return map;
  }, []);

  // Derive the effective modal open state during render: the modal is open
  // only while the user has requested it AND at least 2 products are
  // selected. This avoids a set-state-in-effect and stays in sync with the
  // compare selection automatically.
  const modalOpen = modalRequested && selected.length >= 2;

  return (
    <>
      <CompareBar selectedNames={selectedNames} onCompare={() => setModalRequested(true)} />
      <CompareModal
        open={modalOpen}
        onClose={() => setModalRequested(false)}
        selectedNames={selectedNames}
      />
    </>
  );
}

/* ────────────────────────────────────────────
   Section 1: Products page hero
   ──────────────────────────────────────────── */

function ProductsHero() {
  return (
    <SectionShell
      variant="hero"
      bg="be-page-top-tint"
      className="pt-10 pb-12 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16"
    >
      <div className="max-w-5xl">
        <div className="mb-4">
          <Eyebrow>PRODUCT RANGE</Eyebrow>
          <div className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in" style={{ width: '80px' }} />
        </div>

        <h1 className="text-products-hero-h1 text-be-charcoal-950 mb-4">
          Electrical safety, waterproofing, PVC flooring and industrial products
        </h1>

        <p className="text-body-large text-be-grey-650 mb-6">
          Four product groups — from domestic insulating mats to waterproofing
          membranes, PVC flooring and industrial rubber products — each built
          around a specific protection or performance requirement.
        </p>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="#product-grid" size="lg">
            Explore Products
          </PrimaryButton>
          <SecondaryButton href="/contact-us?type=technical-guidance">
            Ask for Technical Guidance
          </SecondaryButton>
        </div>
      </div>
    </SectionShell>
  );
}

/* ────────────────────────────────────────────
   Section 2: Product family grid (4-group hierarchy)
   ──────────────────────────────────────────── */

/** Render a single product leaf as a card. */
function ProductLeafCard({ leaf, group }: { leaf: ProductNavLeaf; group: ProductNavGroup }) {
  const slug = slugFromHref(leaf.href);
  const registryItem = thumbnailLookup.get(slug);
  const visual = categoryVisuals.find((v) => v.groupId === group.id);
  const GroupIcon = groupIconMap[group.id] ?? Zap;

  return (
    <div className="group relative flex flex-col rounded-lg border border-be-grey-200 bg-be-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-all duration-300">
      <Link
        href={leaf.href}
        className="flex flex-col flex-1"
        aria-label={`View ${leaf.name}`}
      >
        {/* Subtle top accent line */}
        <div className="h-0.5 bg-be-grey-200 group-hover:bg-be-yellow-500 transition-colors duration-300" />

        {/* Image area — 16:10 ratio, neutral off-white bg */}
        <div className="relative w-full overflow-hidden bg-[#f8f8f6] aspect-[16/10]">
          {registryItem ? (
            <Image
              src={registryItem.thumbnail.src}
              alt={registryItem.thumbnail.alt}
              fill
              className={imageFitClass(registryItem.thumbnail)}
              style={
                registryItem.thumbnail.position
                  ? { objectPosition: registryItem.thumbnail.position }
                  : undefined
              }
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ) : visual && !visual.isPlaceholder ? (
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ) : (
            /* Icon placeholder for groups without real images */
            <div className="absolute inset-0 flex items-center justify-center">
              <GroupIcon className="size-14 text-be-grey-300" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/5 transition-colors duration-300" />
        </div>

        {/* Text content — flex-1 pushes CTA to bottom */}
        <div className="flex flex-col gap-1.5 p-4 pt-3 flex-1">
          <h3 className="text-[0.9rem] font-semibold leading-snug text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
            {leaf.name}
          </h3>
          <p className="text-[0.8rem] text-be-grey-600 leading-relaxed line-clamp-2">
            {leaf.description}
          </p>
          <div className="mt-auto pt-2 text-[0.75rem] font-medium text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors">
            <span className="inline-flex items-center gap-1">View Product <span aria-hidden="true">→</span></span>
          </div>
        </div>
      </Link>

      {/* Compare toggle — compact, only for registry products */}
      {registryItem && (
        <div className="px-3 pb-3 pt-0">
          <CompareToggle slug={registryItem.slug} productName={registryItem.name} />
        </div>
      )}
    </div>
  );
}

function ProductFamilyGrid() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule id="product-grid">
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="PRODUCT FAMILIES"
          title="Our product range"
          supportingText="Four product groups organised by application — choose a category, then a product, then request a quote."
        />
      </div>

      {productNavGroups.map((group) => {
        const GroupIcon = groupIconMap[group.id] ?? Zap;

        return (
          <div key={group.id} className="mb-10 last:mb-0">
            {/* Group heading */}
            <div className="flex items-center gap-3 mb-5 reveal-up">
              <div className="h-1 w-8 bg-be-yellow-500 rounded" aria-hidden="true" />
              <GroupIcon className="size-5 text-be-charcoal-950" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-be-charcoal-950 uppercase tracking-wide">
                {group.name}
              </h2>
              {group.description && (
                <span className="hidden sm:inline text-sm text-be-grey-650 font-normal normal-case tracking-normal">
                  — {group.description}
                </span>
              )}
            </div>

            {group.hasSubGroups ? (
              /* Render sub-groups with their headings */
              (group.children as ProductNavSubGroup[]).map((subGroup) => (
                <div key={subGroup.name} className="mb-6 last:mb-0">
                  {/* Sub-group heading */}
                  <div className="flex items-center gap-2 mb-3 ml-2 reveal-up">
                    <div className="h-0.5 w-5 bg-be-grey-350 rounded" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-be-grey-650 uppercase tracking-wider">
                      {subGroup.name}
                    </h3>
                    {subGroup.href && (
                      <Link
                        href={subGroup.href}
                        className="text-xs font-medium text-be-yellow-text hover:text-be-yellow-text-hover transition-colors"
                      >
                        View all →
                      </Link>
                    )}
                  </div>

                  {/* Leaf cards grid */}
                  <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {subGroup.items.map((leaf) => (
                      <ProductLeafCard key={leaf.href} leaf={leaf} group={group} />
                    ))}
                  </div>
                </div>
              ))
            ) : group.href ? (
              /* Single-link group (e.g. PVC Flooring) — show as one prominent card */
              <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <ProductLeafCard
                  leaf={{ name: group.name, href: group.href, description: group.description ?? '' }}
                  group={group}
                />
              </div>
            ) : (
              /* Direct leaf items (e.g. Other Products) */
              <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {(group.children as ProductNavLeaf[]).map((leaf) => (
                  <ProductLeafCard key={leaf.href} leaf={leaf} group={group} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </SectionShell>
  );
}

/* ────────────────────────────────────────────
   Section 3: Comparison table
   ──────────────────────────────────────────── */

function ComparisonTable() {
  return (
    <SectionShell variant="technical" bg="bg-be-cream" yellowAccent>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="COMPARISON"
          title="Product comparison"
          supportingText="Compare features and applications across all product groups to find the right solution."
        />
      </div>

      {/* Desktop: accessible semantic table */}
      <div className="reveal-up hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">
            Comparison of product families across primary purpose,
            distinguishing feature, typical application and applicable
            standard.
          </caption>
          <thead>
            <tr className="bg-be-yellow-50 border-b-2 border-be-yellow-500">
              <th scope="col" className="text-left px-4 py-3 font-semibold text-be-charcoal-950">
                Product
              </th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-be-charcoal-950">
                Primary Purpose
              </th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-be-charcoal-950">
                Distinguishing Feature
              </th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-be-charcoal-950">
                Typical Application
              </th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-be-charcoal-950">
                Standard
              </th>
            </tr>
          </thead>
          <tbody>
            {extendedComparisonData.map((row, i) => (
              <tr
                key={row.slug}
                className={i % 2 === 0 ? 'bg-be-white' : 'bg-be-cream'}
              >
                <th scope="row" className="text-left px-4 py-3 font-semibold text-be-charcoal-950">
                  <Link
                    href={`/products/${row.slug}`}
                    className="hover:text-be-yellow-text-hover transition-colors underline-offset-2 hover:underline"
                  >
                    {row.name}
                  </Link>
                </th>
                <td className="px-4 py-3 text-be-charcoal-800">
                  {row.primaryPurpose}
                </td>
                <td className="px-4 py-3 text-be-charcoal-800">
                  {row.distinguishingFeature}
                </td>
                <td className="px-4 py-3 text-be-charcoal-800">
                  {row.typicalApplication}
                </td>
                <td className="px-4 py-3 text-be-charcoal-800 font-medium">
                  {row.applicableStandard}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked comparison cards */}
      <div className="md:hidden flex flex-col gap-4 reveal-up">
        {extendedComparisonData.map((row) => (
          <Link
            key={row.slug}
            href={`/products/${row.slug}`}
            className="block rounded-lg border border-be-grey-250 bg-be-white p-4 hover:bg-be-yellow-50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
          >
            <h3 className="text-base font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors mb-3">
              {row.name}
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-2">
                <span className="text-be-grey-650 font-medium min-w-[110px]">Purpose:</span>
                <span className="text-be-charcoal-800">{row.primaryPurpose}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-be-grey-650 font-medium min-w-[110px]">Feature:</span>
                <span className="text-be-charcoal-800">{row.distinguishingFeature}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-be-grey-650 font-medium min-w-[110px]">Application:</span>
                <span className="text-be-charcoal-800">{row.typicalApplication}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-be-grey-650 font-medium min-w-[110px]">Standard:</span>
                <span className="text-be-charcoal-800 font-medium">{row.applicableStandard}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

/* ────────────────────────────────────────────
   Section 4: Selection guidance (4 groups)
   ──────────────────────────────────────────── */

function SelectionGuidance() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="SELECTION GUIDE"
          title="Which product do I need?"
          supportingText="A practical guide to choosing the right product group for your application."
        />
      </div>

      <div className="reveal-up max-w-3xl mx-auto">
        <div className="flex flex-col gap-5">
          {/* 1. Electrical Insulating Mats */}
          <div className="rounded-lg border border-be-grey-250 bg-be-yellow-50/30 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-be-yellow-500 rounded" aria-hidden="true" />
              <h3 className="text-base font-semibold text-be-charcoal-950 uppercase tracking-wide">
                Electrical Insulating Mats
              </h3>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-be-grey-650">
              <li className="flex items-start gap-2">
                <span className="text-be-yellow-text font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Domestic Mats (IS 15652:2006)</strong> for operator protection near live electrical equipment in the Indian market — Class A through Class D.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-be-yellow-text font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose International / Global (IEC 61111:2009)</strong> for IEC-compliant insulating mats required by export or international projects — Class 0 through Class 4.
                </div>
              </li>
            </ul>
          </div>

          {/* 2. Water Proofing Solutions */}
          <div className="rounded-lg border border-be-grey-250 bg-be-cream/50 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-be-charcoal-800 rounded" aria-hidden="true" />
              <h3 className="text-base font-semibold text-be-charcoal-950 uppercase tracking-wide">
                Water Proofing Solutions
              </h3>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-be-grey-650">
              <li className="flex items-start gap-2">
                <span className="text-be-charcoal-800 font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Geo Membrane Lining (BharatMembrane)</strong> when the requirement is waterproofing, lining or containment for tunnels, civil works or environmental projects.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-be-charcoal-800 font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Water Stop Seal (Bharat Hydro Seal)</strong> for PVC water-stop profiles at concrete construction joints in water-retaining structures.
                </div>
              </li>
            </ul>
          </div>

          {/* 3. PVC Flooring Solutions */}
          <div className="rounded-lg border border-be-grey-250 bg-be-yellow-50/20 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-be-yellow-500 rounded" aria-hidden="true" />
              <h3 className="text-base font-semibold text-be-charcoal-950 uppercase tracking-wide">
                PVC Flooring Solutions
              </h3>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-be-grey-650">
              <li className="flex items-start gap-2">
                <span className="text-be-yellow-text font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Bharat Smart Floor</strong> for industrial, electrical-room or commercial PVC flooring conforming to IS 3462:1986.
                </div>
              </li>
            </ul>
          </div>

          {/* 4. Other Products */}
          <div className="rounded-lg border border-be-grey-250 bg-be-cream/30 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-be-charcoal-800 rounded" aria-hidden="true" />
              <h3 className="text-base font-semibold text-be-charcoal-950 uppercase tracking-wide">
                Other Products
              </h3>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-be-grey-650">
              <li className="flex items-start gap-2">
                <span className="text-be-charcoal-800 font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Rubber Sheet, Rubber Hose Pipe, ESD Mat, Conveyor Belt</strong> — industrial rubber and electrostatic-discharge products for general and specialist environments. Request specifications for each.
                </div>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-be-grey-650 mt-4">
            Final product selection should be based on operating conditions, project specifications and applicable standards.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <SecondaryButton href="/contact-us?type=technical-guidance">
              Ask our technical team
            </SecondaryButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ────────────────────────────────────────────
   Section 5: Technical help CTA
   ──────────────────────────────────────────── */

function TechnicalHelpCTA() {
  return (
    <SectionShell variant="conversion" bg="bg-be-yellow-50" yellowAccent>
      <div className="reveal-up flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
        <h2 className="text-section-h2 text-be-charcoal-950">
          Need technical guidance?
        </h2>
        <p className="text-body-large text-be-grey-650">
          Our technical team can help you select the right product for your
          operating voltage, environment and regulatory requirements. Share
          your project details and our team will respond with the next steps.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton href="/contact-us?type=technical-guidance" size="lg">
            Request Technical Guidance
          </PrimaryButton>
          <SecondaryButton href="/contact-us">
            Request a Quote
          </SecondaryButton>
        </div>
      </div>
    </SectionShell>
  );
}

/* ────────────────────────────────────────────
   Main ProductsClient component
   ──────────────────────────────────────────── */

export default function ProductsClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElements = entry.target.querySelectorAll('.reveal-up');
            revealElements.forEach((el) => {
              el.classList.add('revealed');
            });
            const staggerElements = entry.target.querySelectorAll('.stagger-reveal');
            staggerElements.forEach((el) => {
              el.classList.add('revealed');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-40px' },
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <CompareProvider>
      <div className="min-h-screen flex flex-col bg-be-warm-white">
        <Header />
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="container-site page-horizontal-padding pt-5">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Products' },
              ]}
            />
          </div>

          {/* 1. Hero */}
          <ProductsHero />
          {/* 2. Product family grid (4-group hierarchy) */}
          <ProductFamilyGrid />
          {/* 3. Comparison table (expanded) */}
          <ComparisonTable />
          {/* 4. Selection guidance (4 groups) */}
          <SelectionGuidance />
          {/* 5. Technical help CTA */}
          <TechnicalHelpCTA />
        </main>
        <Footer />
        <BackToTop />
        <MobileStickyCTA />
        {/* Interactive comparison tray + modal (uses CompareProvider) */}
        <CompareBarHost />
      </div>
    </CompareProvider>
  );
}
