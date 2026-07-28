'use client';

import { useEffect, useMemo, useState } from 'react';
import { SectionShell } from '@/components/ui/SectionShell';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CompareProvider, useCompare } from '@/components/products/CompareContext';
import { CompareBar } from '@/components/products/CompareBar';
import { CompareModal } from '@/components/products/CompareModal';
import { ProductFinderWizard } from '@/components/products/ProductFinderWizard';
import { productNavigationByCategory } from '@/data/products';

/**
 * HomeProductFinder — homepage section that surfaces the Product Finder
 * Wizard in a compact variant so visitors can find the right product
 * family without navigating to /products.
 *
 * Because the wizard's "Add to compare" button needs a CompareProvider,
 * this section mounts its own provider scope and renders the CompareBar
 * + CompareModal so visitors can build and view a comparison directly
 * from the homepage. The selection is synced to the ?compare= URL param
 * (see CompareContext), so a visitor who adds a product here and then
 * navigates to /products sees the same selection.
 *
 * Layout:
 *   • Two-column on lg: left = intro copy + "browse all products" CTA,
 *     right = compact wizard card. On smaller screens the wizard stacks
 *     below the intro.
 *   • Premium styling: navy left panel with yellow accents, hairline
 *     divider, be-pulse-attention on first load to draw the eye.
 */
export default function HomeProductFinder() {
  return (
    <CompareProvider>
      <SectionShell variant="standard" bg="bg-be-white" topRule>
        <div className="reveal-up grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-10 items-start">
          {/* ── Left: intro copy ── */}
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="PRODUCT FINDER"
              title="Not sure which mat you need?"
              supportingText="Answer a few questions about your application and we'll recommend the right product family. Add it to a comparison, or send the result straight to our technical team."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="/products">
                Browse all products
              </PrimaryButton>
              <a
                href="/contact-us?type=technical-guidance"
                className="inline-flex items-center gap-1.5 rounded-md border border-be-grey-250 px-4 py-2.5 text-sm font-semibold text-be-charcoal-800 hover:border-be-yellow-400 hover:text-be-charcoal-950 transition-colors focus-ring"
              >
                Talk to our team
              </a>
            </div>
            {/* Trust microcopy */}
            <p className="mt-5 text-metadata text-be-grey-550 leading-relaxed">
              Recommendations are based on your operating voltage, environment and primary
              safety requirement. Final selection should be confirmed against your project
              specification and applicable standards.
            </p>
          </div>

          {/* ── Right: compact wizard ── */}
          <div className="be-pulse-attention">
            <ProductFinderWizard variant="compact" />
          </div>
        </div>
      </SectionShell>
      <CompareHost />
    </CompareProvider>
  );
}

/**
 * CompareHost — renders the sticky CompareBar + CompareModal for the
 * homepage wizard scope. Mirrors the CompareBarHost pattern used on the
 * /products route so the UX is consistent.
 */
function CompareHost() {
  const { selected } = useCompare();
  const [modalRequested, setModalRequested] = useState(false);

  const selectedNames = useMemo(() => {
    const map: Record<string, string> = {};
    Object.values(productNavigationByCategory).forEach((items) => {
      items.forEach((p) => {
        map[p.slug] = p.name;
      });
    });
    return map;
  }, []);

  const modalOpen = modalRequested && selected.length >= 2;

  // Reset modal request when selection drops below 2 (e.g. user clears).
  // rAF-deferred so no synchronous set-state in effect body.
  useEffect(() => {
    if (selected.length < 2 && modalRequested) {
      const raf = requestAnimationFrame(() => setModalRequested(false));
      return () => cancelAnimationFrame(raf);
    }
  }, [selected.length, modalRequested]);

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
