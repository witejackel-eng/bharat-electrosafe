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
 * Compact section structure:
 *   1. ABOUT / WHO WE ARE + COMPANY PROFILE  (AboutIntro — warm white bg, two-column with images)
 *   2. LEADERSHIP                       (CompanyLeadership — white bg, flip cards)
 *   3. BRANDS + VISION / MISSION        (BrandsVisionMission — navy band)
 *   4. WHY BHARAT ELECTROSAFE           (WhyBharatElectrosafe — cream bg)
 *   5. RECOGNITION & TRUST              (AwardsCertifications — white bg)
 *   6. CLIENTS & INDUSTRY + MEDIA       (ClientsProjects — white bg, includes video carousel)
 *   7. CTA                              (AboutCTA — yellow/navy emphasis)
 *
 * CompanyProfile is merged into AboutIntro for a balanced two-column layout
 * where text content (Who We Are + Company Profile) fills the same height
 * as the stacked images on the right.
 *
 * ActiveParticipation has been merged into ClientsProjects (video carousel).
 */

export default function AboutUsShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. About / Who We Are + Company Profile — warm white bg */}
        <AboutIntro />

        {/* 2. Leadership — white bg, flip cards */}
        <CompanyLeadership />

        {/* 3. Brands + Vision / Mission — navy band (self-contained) */}
        <BrandsVisionMission />

        {/* ── Section divider: deliberate transition between Who We Are area and Why Bharat Electrosafe ── */}
        <div className="py-14 lg:py-16" aria-hidden="true">
          <div className="container-site page-horizontal-padding">
            <div className="be-section-divider" />
          </div>
        </div>

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
