'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function TermsPage() {
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
        {/* Breadcrumb + Heading */}
        <section className="section-padding-major page-horizontal-padding container-site">
          <div className="reveal-up">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Terms' },
              ]}
            />
          </div>
          <div className="mt-8 reveal-up">
            <SectionHeader
              eyebrow="Legal"
              title="Terms of Use"
              supportingText="Terms of Use for Bharat Electrosafe — Last updated: January 2025"
            />
          </div>
        </section>

        {/* Content Sections */}
        <section className="section-padding-supporting page-horizontal-padding container-site">
          <div className="max-w-3xl flex flex-col gap-10">

            {/* 1. Acceptance of Terms */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-body text-be-grey-650">
                By accessing and using the Bharat Electrosafe website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you should not continue to use this website. These terms apply to all visitors, users, and others who access or use the website.
              </p>
            </div>

            {/* 2. Website Purpose */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                2. Website Purpose
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                This website provides information about Bharat Electrosafe&apos;s range of electrical insulating mats and protection products, including product specifications, certification details, and application guidance. The content is intended for informational purposes to assist potential customers in understanding our product offerings.
              </p>
              <p className="text-body text-be-grey-650">
                The information presented on this website is not a substitute for professional engineering advice. Decisions regarding the selection, installation, and application of electrical insulating products should be made in consultation with qualified electrical engineers and in compliance with applicable Indian standards and regulations.
              </p>
            </div>

            {/* 3. Product Information */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                3. Product Information
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                While we strive to provide accurate and up-to-date product specifications, technical data, and certification information on our website, all specifications are subject to change without prior notice. We recommend verifying current specifications with our sales team before placing any order.
              </p>
              <p className="text-body text-be-grey-650">
                Product images displayed on this website are representative and may not depict the exact product variant, colour, or surface pattern you will receive. Actual product appearance may vary based on manufacturing批次 and the specific variant ordered.
              </p>
            </div>

            {/* 4. Intellectual Property */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                4. Intellectual Property
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                All content on this website — including but not limited to text, graphics, logos, images, product data, certification documents, and the overall design and layout — is the intellectual property of Bharat Electrosafe and is protected by applicable Indian copyright and trademark laws.
              </p>
              <p className="text-body text-be-grey-650">
                No part of this website&apos;s content may be reproduced, distributed, transmitted, displayed, or used in any manner without the prior written permission of Bharat Electrosafe. Unauthorized reproduction or use of our intellectual property may result in legal action.
              </p>
            </div>

            {/* 5. Enquiries and Quotations */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                5. Enquiries and Quotations
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                Submission of an enquiry form through this website constitutes a request for information or quotation only. It does not constitute a binding order, contract, or commitment to purchase. All enquiries are subject to review and confirmation by our sales team.
              </p>
              <p className="text-body text-be-grey-650">
                Quotations provided in response to enquiries are subject to confirmation, availability, and applicable terms and conditions at the time of order placement. Prices, specifications, and delivery timelines quoted are indicative and may be revised based on order specifics and current market conditions.
              </p>
            </div>

            {/* 6. Limitation of Liability */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                6. Limitation of Liability
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                The information provided on this website is offered on an &quot;as-is&quot; and &quot;as-available&quot; basis. While we make reasonable efforts to ensure the accuracy and completeness of the information presented, Bharat Electrosafe does not warrant or guarantee the accuracy, reliability, completeness, or timeliness of any content on this website.
              </p>
              <p className="text-body text-be-grey-650">
                Under no circumstances shall Bharat Electrosafe be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of or reliance on information provided on this website. Users are strongly advised to consult qualified professionals for specific application decisions and to verify all product specifications before use.
              </p>
            </div>

            {/* 7. External Links */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                7. External Links
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                This website may contain links to third-party websites, including certification bodies, regulatory authorities, and reference resources. These links are provided solely for reference and informational convenience.
              </p>
              <p className="text-body text-be-grey-650">
                The inclusion of external links does not constitute an endorsement, recommendation, or approval of the linked websites, their content, their operators, or their products. Bharat Electrosafe has no control over the content or availability of external sites and is not responsible for any damage or loss arising from your use of such websites.
              </p>
            </div>

            {/* 8. Modifications */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                8. Modifications
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                Bharat Electrosafe reserves the right to modify, update, or replace these Terms of Use at any time without prior notice. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
              </p>
              <p className="text-body text-be-grey-650">
                Your continued use of the website following the posting of any changes constitutes acceptance of the revised Terms of Use. We recommend reviewing these terms periodically to stay informed of any updates.
              </p>
            </div>

            {/* 9. Governing Law */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                9. Governing Law
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                These Terms of Use are governed by and construed in accordance with the laws of India. Any disputes arising from or relating to the use of this website shall be subject to the exclusive jurisdiction of the appropriate courts in India.
              </p>
              <p className="text-body text-be-grey-650">
                Both parties agree to attempt to resolve any disputes through good-faith negotiation before resorting to legal proceedings. Bharat Electrosafe reserves all rights to seek legal remedies for any violation of these terms.
              </p>
            </div>

            {/* 10. Contact */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                10. Contact
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                If you have any questions or concerns regarding these Terms of Use, please contact us at:
              </p>
              <div className="text-body text-be-grey-650 flex flex-col gap-2">
                <p>
                  <strong>Email:</strong> info@bharatelectrosafe.com
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
