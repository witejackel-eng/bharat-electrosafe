import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { RevealObserver } from '@/components/ui/RevealObserver';
import AboutIntro from '@/components/about/AboutIntro';
import CompanyLeadership from '@/components/about/CompanyLeadership';
import BrandsVisionMission from '@/components/about/BrandsVisionMission';
import WhyBharatElectrosafe from '@/components/about/WhyBharatElectrosafe';
import AwardsCertifications from '@/components/about/AwardsCertifications';
import ClientsProjects from '@/components/about/ClientsProjects';
import ActiveParticipation from '@/components/about/ActiveParticipation';
import AboutCTA from '@/components/about/AboutCTA';

/**
 * AboutUsShell — Server Component.
 *
 * Compact 8-section structure:
 *   1. ABOUT / WHO WE ARE              (AboutIntro — warm white bg)
 *   2. LEADERSHIP                       (CompanyLeadership — white bg, flip cards)
 *   3. BRANDS + VISION / MISSION        (BrandsVisionMission — navy band)
 *   4. WHY BHARAT ELECTROSAFE           (WhyBharatElectrosafe — cream bg)
 *   5. RECOGNITION & TRUST              (AwardsCertifications — white bg)
 *   6. CLIENTS & INDUSTRY               (ClientsProjects — warm neutral bg)
 *   7. INDUSTRY PARTICIPATION           (ActiveParticipation — warm white/cream bg)
 *   8. CTA                              (AboutCTA — yellow/navy emphasis)
 *
 * Color rhythm alternates warm-white → white → navy → cream → white → warm-neutral → cream → yellow
 * to create visual separation without monotony.
 *
 * The shared <RevealObserver /> drives `.reveal-up` entrance animations.
 * All page content is server-rendered for SEO, accessibility, and optimal LCP.
 */

export default function AboutUsShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. About / Who We Are — warm white bg */}
        <AboutIntro />

        {/* 2. Leadership — white bg, flip cards */}
        <CompanyLeadership />

        {/* 3. Brands + Vision / Mission — navy band (self-contained) */}
        <BrandsVisionMission />

        {/* 4. Why Bharat Electrosafe — cream bg */}
        <WhyBharatElectrosafe />

        {/* 5. Recognition & Trust — white bg */}
        <AwardsCertifications />

        {/* 6. Clients & Industry — warm neutral bg */}
        <ClientsProjects />

        {/* 7. Industry Participation — cream bg */}
        <ActiveParticipation />

        {/* 8. CTA — yellow/navy emphasis */}
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
