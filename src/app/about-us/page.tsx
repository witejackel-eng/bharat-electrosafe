'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AboutIntro from '@/components/about/AboutIntro';
import ProductOverview from '@/components/about/ProductOverview';
import CompanyLeadership from '@/components/about/CompanyLeadership';
import ManufacturingQuality from '@/components/about/ManufacturingQuality';
import CertificatesAwardsMedia from '@/components/about/CertificatesAwardsMedia';
import IndustriesClientsCTA from '@/components/about/IndustriesClientsCTA';

export default function AboutUsPage() {
  const revealRef = useRef<boolean>(false);

  useEffect(() => {
    if (revealRef.current) return;
    revealRef.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElements = entry.target.querySelectorAll('.reveal-up');
            revealElements.forEach((el) => {
              el.classList.add('revealed');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        <AboutIntro />
        <ProductOverview />
        <CompanyLeadership />
        <ManufacturingQuality />
        <CertificatesAwardsMedia />
        <IndustriesClientsCTA />
      </main>
      <Footer />
    </div>
  );
}
