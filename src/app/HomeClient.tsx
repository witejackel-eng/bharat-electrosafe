import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import HomeHero from '@/components/home/HomeHero';
import StatsSection from '@/components/home/StatsSection';
import ProductRange from '@/components/home/ProductRange';
import TrustDocuments from '@/components/home/TrustDocuments';
import CapabilityIndustries from '@/components/home/CapabilityIndustries';
import HomeFAQCTA from '@/components/home/HomeFAQCTA';

/**
 * HomeShell — Server Component.
 *
 * The homepage layout is server-rendered so all section content (hero, stats,
 * product range, trust marks, capabilities, FAQ, CTA) appears in the initial
 * HTML without waiting for hydration. Only the interactive islands (Header,
 * FAQ accordion, BackToTop, ScrollProgress, MobileStickyCTA, RevealObserver)
 * ship client JavaScript.
 *
 * RevealObserver is a progressive-enhancement island that toggles the
 * `revealed` CSS class for entrance animations — it renders nothing visible
 * and does not gate content.
 *
 * Section order (preserved from the established homepage):
 *   1. Hero + trust proof badges
 *   2. Stats band (animated count-up on scroll into view)
 *   3. Product range
 *   4. Trust and credibility
 *   5. Capability + industries
 *   6. FAQ + CTA
 */
export default function HomeShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero + trust proof */}
        <HomeHero />
        {/* 2. Stats band — animated count-up, surfaces key numbers early */}
        <StatsSection />
        {/* 3. Product range */}
        <ProductRange />
        {/* 4. Trust and credibility */}
        <TrustDocuments />
        {/* 5. Capability + industries */}
        <CapabilityIndustries />
        {/* 6. FAQ + CTA */}
        <HomeFAQCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
      <RevealObserver />
    </div>
  );
}
