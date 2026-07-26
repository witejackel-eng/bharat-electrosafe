import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { StatsBar } from '@/components/home/StatsBar';
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
import { QuoteProvider } from '@/components/quote/QuoteProvider';
import { QuoteAdminProvider } from '@/components/quote/QuoteAdminProvider';
import { ProductDetailProvider } from '@/components/products/ProductDetailProvider';
import { SearchProvider } from '@/components/search/SearchProvider';
import { ApplicationDetailProvider } from '@/components/applications/ApplicationDetailProvider';
import { ScrollToTop } from '@/components/ui-custom/ScrollToTop';
import { CookieConsent } from '@/components/ui-custom/CookieConsent';
import { ChatWidget } from '@/components/chat/ChatWidget';

function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'dark' | 'accent' }) {
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
              <main className="min-h-screen flex flex-col bg-background">
                <Header />
                <div className="flex-1">
                  <Hero />
                  <StatsBar />
                  <SectionDivider variant="accent" />
                  <WhyChooseUs />
                  <SectionDivider variant="default" />
                  <HomeProductSystems />
                  <SectionDivider variant="default" />
                  <ProductSelection />
                  <SectionDivider variant="dark" />
                  <HomeProofCentre />
                  <SectionDivider variant="accent" />
                  <HomeApplications />
                  <SectionDivider variant="default" />
                  <TestimonialsSection />
                  <SectionDivider variant="accent" />
                  <ResourcesSection />
                  <SectionDivider variant="default" />
                  <ContactSection />
                  <SectionDivider variant="accent" />
                  <FAQSection />
                  <SectionDivider variant="default" />
                  <FinalCTA />
                </div>
                <Footer />
                <ScrollToTop />
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
