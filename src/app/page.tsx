import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeHero } from '@/components/home/HomeHero';
import { ProductRange } from '@/components/home/ProductRange';
import { StandardsTrust } from '@/components/home/StandardsTrust';
import { CompanyCapability } from '@/components/home/CompanyCapability';
import { IndustriesApplications } from '@/components/home/IndustriesApplications';
import { ContactCTA } from '@/components/home/ContactCTA';

// ── JSON-LD: Organization + WebSite only (Product + FAQPage belong on inner pages) ──
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bharat Electrosafe',
  description:
    'Manufacturer of electrical insulating mats and BharatMembrane geomembranes for industrial, utility and infrastructure protection.',
  url: 'https://bharatelectrosafe.com',
  logo: 'https://bharatelectrosafe.com/logo-bharat.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7617494968',
    email: 'info@bharatelectrosafe.com',
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Bharat Electrosafe',
  url: 'https://bharatelectrosafe.com',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <HomeHero />
        <ProductRange />
        <StandardsTrust />
        <CompanyCapability />
        <IndustriesApplications />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
