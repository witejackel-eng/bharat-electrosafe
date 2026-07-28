'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import ContactIntro, { ImmediateAssistance } from '@/components/contact/ContactIntro';
import EnquiryQuoteLayout from '@/components/contact/EnquiryQuoteLayout';
import OfficeLocation from '@/components/contact/OfficeLocation';

/**
 * Contact Us page — two chapters only:
 *
 *   Chapter 1 — Contact and Enquiry
 *   Chapter 2 — Office and Location
 *
 * Desktop chapter 1 layout:
 *   ┌──────────────────────┬─────────────────────────────┐
 *   │ Left (38–40%)        │ Right (60–62%) — the form    │
 *   │  • Breadcrumb        │  Spans both rows in column 2 │
 *   │  • H1                │                              │
 *   │  • Supporting text   │                              │
 *   │  • Contact rows      │                              │
 *   │  • Response time     │                              │
 *   │ ───────────────────  │  Send Us an Enquiry          │
 *   │ Immediate assist.    │  (form + submit + note)      │
 *   └──────────────────────┴─────────────────────────────┘
 *
 * Mobile source order (per spec):
 *   1. Breadcrumb            6. Immediate-assistance panel
 *   2. Contact page title    7. Office information
 *   3. Supporting text       8. Office hours
 *   4. Contact rows          9. Map or directions card
 *   5. Enquiry form
 *
 * The mobile order is achieved purely by source order — items flow into
 * the grid in DOM order, and on desktop the form is given row-span-2 so
 * it occupies both rows of column 2 while the assistance panel sits in
 * column 1 / row 2.
 */
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
        {/* ───────── Chapter 1 — Contact and Enquiry ───────── */}
        <section
          aria-label="Contact and Enquiry"
          className="bg-be-warm-white pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16"
        >
          <div className="container-site page-horizontal-padding">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[0.4fr_0.6fr] lg:gap-14">
              {/* Top of left column — breadcrumb, H1, contact rows, response time */}
              <ContactIntro />

              {/* Right column — enquiry form. On desktop, spans both rows
                  of column 2 so it visually balances the entire left column. */}
              <div className="lg:row-span-2">
                <EnquiryQuoteLayout />
              </div>

              {/* Bottom of left column — immediate-assistance panel.
                  On mobile this renders AFTER the form (per spec order). */}
              <ImmediateAssistance />
            </div>
          </div>
        </section>

        {/* ───────── Chapter 2 — Office and Location ───────── */}
        <section
          aria-label="Office and Location"
          className="bg-be-white border-t border-be-grey-250 pt-9 pb-9 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
        >
          <div className="container-site page-horizontal-padding">
            <OfficeLocation />
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
