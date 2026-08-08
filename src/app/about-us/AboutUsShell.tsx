import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { RevealObserver } from '@/components/ui/RevealObserver';
import AboutIntro from '@/components/about/AboutIntro';
import CompanyLeadership from '@/components/about/CompanyLeadership';
import BESBrands from '@/components/about/BESBrands';
import VisionMission from '@/components/about/VisionMission';
import ValuesSection from '@/components/about/ValuesSection';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import ManufacturingValues from '@/components/about/ManufacturingValues';
import AwardsCertifications from '@/components/about/AwardsCertifications';
import ClientsProjects from '@/components/about/ClientsProjects';
import ActiveParticipation from '@/components/about/ActiveParticipation';
import AboutCTA from '@/components/about/AboutCTA';

/**
 * AboutUsShell — Server Component.
 *
 * Section order per client direction:
 *   1. Who We Are        (AboutIntro)
 *   2. Leadership         (CompanyLeadership — flip cards only)
 *   3. BES Brands         (BESBrands)
 *   4. Vision & Mission   (VisionMission — navy band)
 *   5. Values             (ValuesSection — blue/yellow palette)
 *   6. Why Choose Us      (WhyChooseUs — source-supported only)
 *   7. Manufacturing      (ManufacturingValues)
 *   8. Awards / Certs     (AwardsCertifications — no industry participation)
 *   9. Clients & Projects (ClientsProjects)
 *  10. Active Participation (ActiveParticipation — videos)
 *  11. CTA                (AboutCTA)
 *
 * The shared <RevealObserver /> drives `.reveal-up` entrance animations.
 * All page content is server-rendered for SEO, accessibility, and optimal LCP.
 */

export default function AboutUsShell() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* 1. Who We Are */}
        <AboutIntro />
        {/* 2. Leadership */}
        <CompanyLeadership />
        {/* 3. BES Brands */}
        <BESBrands />
        {/* 4. Vision & Mission */}
        <VisionMission />
        {/* 5. Values */}
        <ValuesSection />
        {/* 6. Why Choose Us */}
        <WhyChooseUs />
        {/* 7. Manufacturing / capability */}
        <ManufacturingValues />
        {/* 8. Awards, certifications, memberships */}
        <AwardsCertifications />
        {/* 9. Clients & Projects */}
        <ClientsProjects />
        {/* 10. Active Participation */}
        <ActiveParticipation />
        {/* 11. CTA */}
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
