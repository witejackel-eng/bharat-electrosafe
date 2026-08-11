import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import HomeHero from '@/components/home/HomeHero';
import StatisticsStrip from '@/components/home/StatisticsStrip';
import HomeAbout from '@/components/home/HomeAbout';
import ProductRange from '@/components/home/ProductRange';
import TrustDocuments from '@/components/home/TrustDocuments';
import CapabilityIndustries from '@/components/home/CapabilityIndustries';
import HomeFAQCTA from '@/components/home/HomeFAQCTA';
import NewsletterCTA from '@/components/home/NewsletterCTA';
import RecentlyViewed from '@/components/home/RecentlyViewed';

/**
 * HomeShell — Server Component.
 *
 * The homepage layout is server-rendered so all section content (hero, product
 * range, trust marks, capabilities, FAQ, CTA) appears in the initial HTML
 * without waiting for hydration. Only the interactive islands (Header, FAQ
 * accordion, BackToTop, RevealObserver) ship client JavaScript.
 *
 * RevealObserver is a progressive-enhancement island that toggles the
 * `revealed` CSS class for entrance animations — it renders nothing visible
 * and does not gate content.
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
        {/* 3. About Bharat Electrosafe */}
        <HomeAbout />
        {/* 4. Product range */}
        <ProductRange />
        {/* 5. Trust and credibility */}
        <TrustDocuments />
        {/* 6. Capability + industries */}
        <CapabilityIndustries />
        {/* 7. FAQ + CTA */}
        <HomeFAQCTA />
        {/* 8. Recently viewed — client-only, renders null if empty */}
        <RecentlyViewed />
        {/* 9. Newsletter signup */}
        <NewsletterCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
      <RevealObserver />
    </div>
  );
}
