'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import ContactIntro from '@/components/contact/ContactIntro';
import EnquiryQuoteLayout from '@/components/contact/EnquiryQuoteLayout';
import OfficeLocation from '@/components/contact/OfficeLocation';
import OfficeHours from '@/components/contact/OfficeHours';

export default function ContactUsClient() {
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
        {/* 1. Contact intro + form */}
        <ContactIntro />
        <EnquiryQuoteLayout />
        {/* 2. Office address + map + hours */}
        <OfficeLocation />
        <OfficeHours />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
