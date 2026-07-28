import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { RevealObserver } from '@/components/ui/RevealObserver';
import AboutIntro from '@/components/about/AboutIntro';
import CompanyLeadership from '@/components/about/CompanyLeadership';
import ManufacturingValues from '@/components/about/ManufacturingValues';
import AwardsCertifications from '@/components/about/AwardsCertifications';
import AboutCTA from '@/components/about/AboutCTA';

/**
 * AboutUsShell — Server Component.
 *
 * Previously this was a Client Component (`AboutUsClient`) that created its
 * own IntersectionObserver to drive `.reveal-up` entrance animations. That
 * duplicated the shared `RevealObserver` infrastructure already used on the
 * homepage and added unnecessary client JS to the About route.
 *
 * Now it is a Server Component that renders the page shell (Header, main,
 * Footer, BackToTop) and mounts a single `<RevealObserver />` — the same
 * progressive-enhancement island the homepage uses. The RevealObserver is a
 * tiny Client Component that toggles the `revealed` CSS class on `.reveal-up`
 * elements as they scroll into view. If JS is disabled, the content remains
 * visible (the reduced-motion CSS fallback sets opacity:1 on `.reveal-up`).
 *
 * All page content (AboutIntro, CompanyLeadership, ManufacturingValues,
 * AwardsCertifications, AboutCTA) is server-rendered for SEO, accessibility,
 * and optimal LCP.
 */

export default function AboutUsShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. Company intro + key facts */}
        <AboutIntro />
        {/* 2. Leadership */}
        <CompanyLeadership />
        {/* 3. Manufacturing, values, capability */}
        <ManufacturingValues />
        {/* 4. Awards, certifications, org references */}
        <AwardsCertifications />
        {/* 5. CTA */}
        <AboutCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
      {/* Shared reveal-animation observer — same island as the homepage.
          Progressive enhancement only; content is visible without JS. */}
      <RevealObserver />
    </div>
  );
}
