import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import AboutIntro from '@/components/about/AboutIntro';
import CompanyProfile from '@/components/about/CompanyProfile';
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
 *   1. ABOUT / WHO WE ARE              (AboutIntro — warm white bg)
 *   2. COMPANY PROFILE                 (CompanyProfile — warm white bg)
 *   3. LEADERSHIP                       (CompanyLeadership — white bg, flip cards)
 *   4. BRANDS + VISION / MISSION        (BrandsVisionMission — navy band)
 *   5. WHY BHARAT ELECTROSAFE           (WhyBharatElectrosafe — cream bg)
 *   6. RECOGNITION & TRUST              (AwardsCertifications — white bg)
 *   7. CLIENTS & INDUSTRY + MEDIA       (ClientsProjects — white bg, includes video carousel)
 *   8. CTA                              (AboutCTA — yellow/navy emphasis)
 *
 * ActiveParticipation has been merged into ClientsProjects (video carousel).
 */

export default function AboutUsShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. About / Who We Are — warm white bg */}
        <AboutIntro />

        {/* 2. Company Profile — warm white bg */}
        <CompanyProfile />

        {/* 3. Leadership — white bg, flip cards */}
        <CompanyLeadership />

        {/* 4. Brands + Vision / Mission — navy band (self-contained) */}
        <BrandsVisionMission />

        {/* 5. Why Bharat Electrosafe — cream bg */}
        <WhyBharatElectrosafe />

        {/* 6. Recognition & Trust — white bg */}
        <AwardsCertifications />

        {/* 7. Clients & Industry + Media — white bg (includes video carousel) */}
        <ClientsProjects />

        {/* 8. CTA — yellow/navy emphasis */}
        <AboutCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
    </div>
  );
}
