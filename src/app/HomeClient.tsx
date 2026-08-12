import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import HomeHero from '@/components/home/HomeHero';
import StatisticsStrip from '@/components/home/StatisticsStrip';
import ProductRange from '@/components/home/ProductRange';
import TrustDocuments from '@/components/home/TrustDocuments';
import CapabilityIndustries from '@/components/home/CapabilityIndustries';
import HomeFAQCTA from '@/components/home/HomeFAQCTA';

/**
 * HomeShell — Server Component.
 *
 * The homepage layout is server-rendered so all section content (hero, product
 * range, trust marks, capabilities, FAQ, CTA) appears in the initial HTML
 * without waiting for hydration. Interactive islands ship client JavaScript
 * only where needed. RevealObserver is mounted globally from the root layout
 * so the same visibility behavior applies to every route.
 *
 * Section order: Hero → Statistics → Capability/Industries → Product Range →
 * Trust → FAQ/CTA → Footer
 */
export default function HomeShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero + trust proof */}
        <HomeHero />
        {/* 2. Statistics strip — company credibility */}
        <StatisticsStrip />
        {/* 3. Capability + industries (replaces About) */}
        <CapabilityIndustries />
        {/* 4. Product range */}
        <ProductRange />
        {/* 5. Trust and credibility */}
        <TrustDocuments />
        {/* 6. FAQ + CTA */}
        <HomeFAQCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
    </div>
  );
}
