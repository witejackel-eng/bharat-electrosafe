import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { StatsBar } from '@/components/home/StatsBar';
import { VoltageCalculator } from '@/components/home/VoltageCalculator';
import { HomeProductSystems } from '@/components/home/HomeProductSystems';
import { ProductSelection } from '@/components/home/ProductSelection';
import { HomeProofCentre } from '@/components/home/HomeProofCentre';
import { HomeApplications } from '@/components/home/HomeApplications';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ResourcesSection } from '@/components/home/ResourcesSection';
import { ContactSection } from '@/components/home/ContactSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { FAQSection } from '@/components/home/FAQSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import { ProjectGallery } from '@/components/home/ProjectGallery';
import { SustainabilitySection } from '@/components/home/SustainabilitySection';
import { ManufacturingProcessSection } from '@/components/home/ManufacturingProcessSection';
import { ThicknessComparator } from '@/components/home/ThicknessComparator';
import { DistributorSection } from '@/components/home/DistributorSection';
import { QuoteProvider } from '@/components/quote/QuoteProvider';
import { QuoteAdminProvider } from '@/components/quote/QuoteAdminProvider';
import { ProductDetailProvider } from '@/components/products/ProductDetailProvider';
import { SearchProvider } from '@/components/search/SearchProvider';
import { ApplicationDetailProvider } from '@/components/applications/ApplicationDetailProvider';
import { ScrollToTop } from '@/components/ui-custom/ScrollToTop';
import { CookieConsent } from '@/components/ui-custom/CookieConsent';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { ScrollProgressBar } from '@/components/ui-custom/ScrollProgressBar';
import { StickyCTABar } from '@/components/ui-custom/StickyCTABar';
import { QuickNav } from '@/components/ui-custom/QuickNav';
import { SectionProgressIndicator } from '@/components/ui-custom/SectionProgressIndicator';

function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'dark' | 'accent' | 'dotted' }) {
  if (variant === 'dark') {
    return (
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    );
  }
  if (variant === 'accent') {
    return (
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
        {/* Subtle texture strip */}
        <div
          className="mx-auto h-4 max-w-[1440px] opacity-[0.04]"
          style={{
            backgroundImage: 'url(/images/mat-texture.png)',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat-x',
          }}
        />
      </div>
    );
  }
  if (variant === 'dotted') {
    return (
      <div className="relative flex items-center justify-center py-2">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-1 w-1 rounded-full bg-orange/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-orange/70" />
          <span className="h-2 w-2 rounded-full bg-orange" />
          <span className="h-1.5 w-1.5 rounded-full bg-orange/70" />
          <span className="h-1 w-1 rounded-full bg-orange/50" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div
        className="mx-auto h-3 max-w-[1440px] opacity-[0.03]"
        style={{
          backgroundImage: 'url(/images/mat-texture.png)',
          backgroundSize: '150px',
          backgroundRepeat: 'repeat-x',
        }}
      />
    </div>
  );
}

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bharat Electrosafe',
  description:
    'Electrical insulating mats, visible-safety variants, geomembranes and water-stop solutions for industrial, utility and infrastructure projects.',
  url: 'https://bharatelectrosafe.com',
  logo: 'https://bharatelectrosafe.com/logo-bharat.png',
  foundingDate: '1989',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 12, Sector 7, IMT Manesar',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122050',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-123-456-7890',
    email: 'info@bharatelectrosafe.com',
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  knowsAbout: [
    'IS 15652 insulating mats',
    'Class A, B, C electrical insulation',
    'Geomembrane lining systems',
    'PVC water-stop profiles',
    'Visible safety matting',
    'Sustainable rubber manufacturing',
    'Solar-assisted production',
  ],
  award: [
    'BIS Licence — IS 15652',
    'ISO 9001:2015',
    'ISO 14001:2015',
    'RoHS Compliant',
    'REACH Compliant',
  ],
};

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Bharat Electrosafe Insulating Mats',
  category: 'Electrical Insulation',
  description:
    'Rubber insulating mats engineered for electrical panels, substations, switchrooms and industrial control areas. Selected by operating voltage to IS 15652.',
  brand: { '@type': 'Brand', name: 'Bharat Electrosafe' },
  manufacturer: {
    '@type': 'Organization',
    name: 'Bharat Electrosafe',
  },
  certifies: [
    { '@type': 'Thing', name: 'BIS Licence — IS 15652' },
    { '@type': 'Thing', name: 'ISO 9001:2015' },
  ],
};

// FAQ structured data for rich results in search engines
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is IS 15652 and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IS 15652 is the Bureau of Indian Standards specification for insulating mats for electrical purposes. It replaced IS 5424 and covers Class A (3.3 kV), Class B (11 kV) and Class C (33 kV) mats. All Bharat Electrosafe mats carry a valid BIS licence against this standard.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I select the correct insulation class?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Select the class whose rated voltage exceeds the highest operating voltage at your installation. For example, a 6.6 kV panel requires Class B (rated 11 kV). Never use Class A mats above 3.3 kV installations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What thickness do I need for each class?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Class A requires >= 2.0 mm, Class B >= 2.5 mm, and Class C >= 3.0 mm as per IS 15652. Bharat Electrosafe manufactures each class at or above the minimum specified thickness.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the mats tested by an independent lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every batch is tested by an NABL-accredited independent laboratory for dielectric strength, leakage current, tensile properties and flame resistance. Test reports are available for download from our Proof Centre.',
      },
    },
  ],
};

export default function Home() {
  return (
    <QuoteProvider>
      <QuoteAdminProvider>
        <ProductDetailProvider>
          <SearchProvider>
            <ApplicationDetailProvider>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
              />
              <main className="min-h-screen flex flex-col bg-background">
                <Header />
                <div className="flex-1">
                  <Hero />
                  <StatsBar />
                  <VoltageCalculator />
                  <SectionDivider variant="accent" />
                  <WhyChooseUs />
                  <SectionDivider variant="default" />
                  <HomeProductSystems />
                  <SectionDivider variant="default" />
                  <ProductSelection />
                  <ThicknessComparator />
                  <SectionDivider variant="dark" />
                  <ManufacturingProcessSection />
                  <SectionDivider variant="accent" />
                  <HomeProofCentre />
                  <SectionDivider variant="accent" />
                  <HomeApplications />
                  <SectionDivider variant="default" />
                  <CaseStudiesSection />
                  <SectionDivider variant="accent" />
                  <ProjectGallery />
                  <SectionDivider variant="default" />
                  <SustainabilitySection />
                  <SectionDivider variant="default" />
                  <TestimonialsSection />
                  <SectionDivider variant="default" />
                  <InsightsSection />
                  <SectionDivider variant="accent" />
                  <ResourcesSection />
                  <SectionDivider variant="default" />
                  <DistributorSection />
                  <SectionDivider variant="default" />
                  <ContactSection />
                  <SectionDivider variant="accent" />
                  <FAQSection />
                  <SectionDivider variant="default" />
                  <FinalCTA />
                </div>
                <Footer />
                <ScrollProgressBar />
                <SectionProgressIndicator />
                <QuickNav />
                <ScrollToTop />
                <StickyCTABar />
                <CookieConsent />
                <ChatWidget />
              </main>
            </ApplicationDetailProvider>
          </SearchProvider>
        </ProductDetailProvider>
      </QuoteAdminProvider>
    </QuoteProvider>
  );
}
