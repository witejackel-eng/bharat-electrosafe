import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import AboutIntro from '@/components/about/AboutIntro';
import CompanyLeadership from '@/components/about/CompanyLeadership';
import BrandsVisionMission from '@/components/about/BrandsVisionMission';
import WhyBharatElectrosafe from '@/components/about/WhyBharatElectrosafe';
import AwardsCertifications from '@/components/about/AwardsCertifications';
import ClientsProjects from '@/components/about/ClientsProjects';
import AboutCTA from '@/components/about/AboutCTA';

/**
 * AboutUsShell — Server Component.
 *
 * Section structure:
 *   1. WHO WE ARE + COMPANY PROFILE  (AboutIntro — two separate sections with full-width divider)
 *   2. LEADERSHIP                    (CompanyLeadership — warm-white bg, flip cards)
 *   3. BRANDS + VISION / MISSION     (BrandsVisionMission — navy band)
 *   4. WHY BHARAT ELECTROSAFE        (WhyBharatElectrosafe — cream bg)
 *   5. RECOGNITION & TRUST           (AwardsCertifications — white bg)
 *   6. CLIENTS & INDUSTRY + MEDIA    (ClientsProjects — white bg, includes video carousel)
 *   7. CTA                           (AboutCTA — yellow/navy emphasis)
 *
 * AboutIntro renders Who We Are and Company Profile as two independent
 * sections separated by a full-viewport-width 1px divider.
 */

export default function AboutUsShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. Who We Are + Company Profile — two sections with full-width divider */}
        <AboutIntro />

        {/* 2. Leadership — white bg, flip cards */}
        <CompanyLeadership />

        {/* 3. Brands + Vision / Mission — navy band (self-contained) */}
        <BrandsVisionMission />

        {/* ── Full-width section divider ── */}
        <div
          className="w-full h-px bg-be-grey-250"
          aria-hidden="true"
        />

        {/* 4. Why Bharat Electrosafe — cream bg */}
        <WhyBharatElectrosafe />

        {/* 5. Recognition & Trust — white bg */}
        <AwardsCertifications />

        {/* 6. Clients & Industry + Media — white bg (includes video carousel) */}
        <ClientsProjects />

        {/* 7. CTA — yellow/navy emphasis */}
        <AboutCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
    </div>
  );
}
