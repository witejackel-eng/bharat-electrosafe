import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import HomeHero from '@/components/home/HomeHero';
import StatsSection from '@/components/home/StatsSection';
import ProductRange from '@/components/home/ProductRange';
import HomeProductFinder from '@/components/home/HomeProductFinder';
import ProcessSection from '@/components/home/ProcessSection';
import TrustDocuments from '@/components/home/TrustDocuments';
import InteractiveIndustries from '@/components/home/InteractiveIndustries';
import TechnicalResources from '@/components/home/TechnicalResources';
import HomeFAQCTA from '@/components/home/HomeFAQCTA';

/**
 * HomeShell — Server Component.
 *
 * The homepage layout is server-rendered so all section content (hero, stats,
 * product range, product finder, process, trust marks, capabilities, technical
 * resources, FAQ, CTA) appears in the initial HTML without waiting for
 * hydration. Only the interactive islands (Header, FAQ accordion, BackToTop,
 * ScrollProgress, MobileStickyCTA, RevealObserver, HomeProductFinder wizard +
 * compare tray, InteractiveIndustries chips, TechnicalResources filter) ship
 * client JavaScript.
 *
 * RevealObserver is a progressive-enhancement island that toggles the
 * `revealed` CSS class for entrance animations — it renders nothing visible
 * and does not gate content.
 *
 * Section order:
 *   1. Hero + trust proof badges
 *   2. Stats band (animated count-up on scroll into view)
 *   3. Product range
 *   4. Product finder wizard (compact, with compare)
 *   5. Process — how we work (4-step quality journey)
 *   6. Trust and credibility
 *   7. Interactive industries + recommended products (replaces static chip rail)
 *   8. Technical resources & compliance library (NEW — centralised downloads)
 *   9. FAQ + CTA
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
        {/* 4. Product finder wizard — compact, with add-to-compare */}
        <HomeProductFinder />
        {/* 5. Process — how we work (4-step quality journey) */}
        <ProcessSection />
        {/* 6. Trust and credibility */}
        <TrustDocuments />
        {/* 7. Interactive industries — click an industry to see recommended products */}
        <InteractiveIndustries />
        {/* 8. Technical resources — centralised compliance library with filters */}
        <TechnicalResources />
        {/* 9. FAQ + CTA */}
        <HomeFAQCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
      <RevealObserver />
    </div>
  );
}
