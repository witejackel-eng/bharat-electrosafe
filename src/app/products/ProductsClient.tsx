'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import { ProductFinderWizard } from '@/components/products/ProductFinderWizard';
import {
  productNavigationByCategory,
  productComparisonData,
  productCategories,
  productFamilyCount,
  imageFitClass,
  ProductCategory,
} from '@/data/products';

/* ────────────────────────────────────────────
   CompareBarHost — renders the sticky compare bar + modal.
   Must be a child of CompareProvider so useCompare works.
   ──────────────────────────────────────────── */

function CompareBarHost() {
  const { selected } = useCompare();
  const [modalRequested, setModalRequested] = useState(false);

  // Map of slug → product name for display in the bar/modal
  const selectedNames = useMemo(() => {
    const map: Record<string, string> = {};
    // Build from the navigation items so we don't need a full product lookup
    Object.values(productNavigationByCategory).forEach((items) => {
      items.forEach((p) => {
        map[p.slug] = p.name;
      });
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
          Electrical insulation and engineered protection products
        </h1>

        <p className="text-body-large text-be-grey-650 mb-6">
          Explore {productFamilyCount} product families for electrical safety, hazard
          demarcation, waterproofing and construction-joint protection.
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
   Section 2: Product family grid
   ──────────────────────────────────────────── */

function ProductFamilyGrid() {
  const categoryOrder: ProductCategory[] = [
    'electrical-insulation',
    'waterproofing-civil-protection',
  ];

  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule id="product-grid">
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="PRODUCT FAMILIES"
          title="Our product range"
          supportingText="Six product families across two categories, each designed around a specific protection requirement."
        />
      </div>

      {categoryOrder.map((catId) => {
        const catInfo = productCategories[catId];
        const items = productNavigationByCategory[catId];
        return (
          <div key={catId} className="mb-10 last:mb-0">
            {/* Category heading */}
            <div className="flex items-center gap-3 mb-5 reveal-up">
              <div className="h-1 w-8 bg-be-yellow-500 rounded" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-be-charcoal-950 uppercase tracking-wide">
                {catInfo.displayName}
              </h2>
            </div>

            {/* Product cards grid */}
            <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((product) => (
                <div
                  key={product.slug}
                  className="be-card-glow hover-card-lift group relative flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <Link
                    href={product.href}
                    className="flex flex-col flex-1"
                    aria-label={`View ${product.name}`}
                  >
                    {/* Yellow accent line */}
                    <div className="h-1 bg-be-yellow-500 group-hover:h-1.5 transition-all duration-300" />

                    {/* Category label */}
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-be-yellow-500/90 text-be-charcoal-950 text-[0.65rem] font-bold tracking-wide shadow-sm">
                      {catInfo.displayName}
                    </div>

                    {/* Image area */}
                    <div className="relative w-full overflow-hidden bg-be-cream aspect-[4/3]">
                      <Image
                        src={product.thumbnail.src}
                        alt={product.thumbnail.alt}
                        fill
                        className={imageFitClass(product.thumbnail)}
                        style={
                          product.thumbnail.position
                            ? { objectPosition: product.thumbnail.position }
                            : undefined
                        }
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/10 transition-colors duration-300" />
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col gap-2 p-4 flex-1">
                      <h3 className="text-card-title text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-be-grey-650 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-2 text-sm font-medium text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors">
                        <span className="be-underline-grow inline-block">View Product</span>
                      </div>
                    </div>
                  </Link>

                  {/* Compare toggle — outside the link so clicks don't navigate */}
                  <div className="px-4 pb-4 -mt-1">
                    <CompareToggle slug={product.slug} productName={product.name} />
                  </div>
                </div>
              ))}
            </div>
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
          supportingText="Compare features and applications across all six product families to find the right solution."
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
            {productComparisonData.map((row, i) => (
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
        {productComparisonData.map((row) => (
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
   Section 3.5: Interactive Product Finder Wizard
   ──────────────────────────────────────────── */

function ProductFinderSection() {
  return (
    <SectionShell variant="standard" bg="bg-be-cream" topRule>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="PRODUCT FINDER"
          title="Not sure which product you need?"
          supportingText="Answer a few questions and we'll recommend the right product family for your application."
        />
      </div>
      <div className="reveal-up max-w-3xl mx-auto">
        <ProductFinderWizard />
      </div>
    </SectionShell>
  );
}

/* ────────────────────────────────────────────
   Section 4: Selection guidance
   ──────────────────────────────────────────── */

function SelectionGuidance() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="SELECTION GUIDE"
          title="Which product do I need?"
          supportingText="A practical guide to choosing the right product family for your application."
        />
      </div>

      <div className="reveal-up max-w-3xl mx-auto">
        <div className="flex flex-col gap-5">
          {/* Electrical Insulation products */}
          <div className="rounded-lg border border-be-grey-250 bg-be-yellow-50/30 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-be-yellow-500 rounded" aria-hidden="true" />
              <h3 className="text-base font-semibold text-be-charcoal-950 uppercase tracking-wide">
                Electrical Insulation
              </h3>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-be-grey-650">
              <li className="flex items-start gap-2">
                <span className="text-be-yellow-text font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Electrical Insulating Mats</strong> when the requirement is operator protection near live electrical equipment.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-be-yellow-text font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Coloured Strip Mats</strong> when electrical insulation and visible hazard-zone demarcation are both required.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-be-yellow-text font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Bi-Color Mats</strong> when a dual-colour surface or visible layer differentiation is required.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-be-yellow-text font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose Auto-Glow / Reflective Band Mats</strong> when guidance must remain visible in low-light or emergency conditions.
                </div>
              </li>
            </ul>
          </div>

          {/* Waterproofing products */}
          <div className="rounded-lg border border-be-grey-250 bg-be-cream/50 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-be-charcoal-800 rounded" aria-hidden="true" />
              <h3 className="text-base font-semibold text-be-charcoal-950 uppercase tracking-wide">
                Waterproofing and Civil Protection
              </h3>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-be-grey-650">
              <li className="flex items-start gap-2">
                <span className="text-be-charcoal-800 font-bold mt-0.5" aria-hidden="true">&#x2022;</span>
                <div>
                  <strong className="text-be-charcoal-950">Choose BharatMembrane</strong> when the requirement is waterproofing, lining or containment.
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
          {/* 2. Product family grid */}
          <ProductFamilyGrid />
          {/* 3. Interactive product finder wizard */}
          <ProductFinderSection />
          {/* 4. Comparison table */}
          <ComparisonTable />
          {/* 5. Selection guidance (static reference) */}
          <SelectionGuidance />
          {/* 6. Technical help CTA */}
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
