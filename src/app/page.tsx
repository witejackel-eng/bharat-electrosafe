'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { Marquee } from '@/components/ui/Marquee';
import HomeHero from '@/components/home/HomeHero';
import StatsSection from '@/components/home/StatsSection';
import ProductRange from '@/components/home/ProductRange';
import TrustDocuments from '@/components/home/TrustDocuments';
import CapabilitySection from '@/components/home/CapabilitySection';
import IndustryApplications from '@/components/home/IndustryApplications';
import HomeFAQ from '@/components/home/HomeFAQ';
import HomeCTA from '@/components/home/HomeCTA';

const trustMarqueeItems = [
  'IS 15652:2006 Certified',
  'BIS Licence CM/L:8800129617',
  'ERDA / NTH Tested',
  'Conforming to IEC 61111',
  'Classes A, B & C',
  'Custom Dimensions Available',
];

export default function Home() {
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
            const staggerElements = entry.target.querySelectorAll('.stagger-reveal');
            staggerElements.forEach((el) => {
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
        <Marquee items={trustMarqueeItems} speed="normal" />
        <HomeHero />
        <StatsSection />
        <ProductRange />
        <TrustDocuments />
        <CapabilitySection />
        <IndustryApplications />
        <HomeFAQ />
        <HomeCTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
