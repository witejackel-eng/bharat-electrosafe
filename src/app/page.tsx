'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import HomeHero from '@/components/home/HomeHero';
import ProductRange from '@/components/home/ProductRange';
import TrustDocuments from '@/components/home/TrustDocuments';
import CapabilitySection from '@/components/home/CapabilitySection';
import IndustryApplications from '@/components/home/IndustryApplications';
import HomeCTA from '@/components/home/HomeCTA';

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
        <HomeHero />
        <ProductRange />
        <TrustDocuments />
        <CapabilitySection />
        <IndustryApplications />
        <HomeCTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
