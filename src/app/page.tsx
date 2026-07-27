import { SiteHeader } from '@/components/site-header';
import { HeroSection, StatsBar } from '@/components/hero-section';
import { ProductsSection } from '@/components/products-section';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { SiteFooter } from '@/components/site-footer';
import ProductStructuredData from '@/components/structured-data';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
      {/* JSON-LD structured data — server-rendered for crawlers */}
      <ProductStructuredData />
    </div>
  );
}
