'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function PrivacyPolicyPage() {
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
                { label: 'Privacy Policy' },
              ]}
            />
          </div>
          <div className="mt-8 reveal-up">
            <SectionHeader
              eyebrow="Legal"
              title="Privacy Policy"
              supportingText="Privacy Policy for Bharat Electrosafe — Last updated: January 2025"
            />
          </div>
        </section>

        {/* Content Sections */}
        <section className="section-padding-supporting page-horizontal-padding container-site">
          <div className="max-w-3xl flex flex-col gap-10">

            {/* 1. Information We Collect */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                1. Information We Collect
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                When you submit enquiry forms on our website, we collect personal details including your name, email address, phone number, and company name. This information is provided voluntarily and is used solely for the purposes described in this policy.
              </p>
              <p className="text-body text-be-grey-650 mb-4">
                We also collect certain browsing data automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data is collected through standard server logs and analytics tools to help us understand how visitors use our site.
              </p>
              <p className="text-body text-be-grey-650">
                Cookies and similar tracking technologies are used to enhance your browsing experience and collect usage data. For detailed information on our use of cookies, please refer to Section 5 below.
              </p>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                The personal information we collect is used for the following purposes:
              </p>
              <ul className="text-body text-be-grey-650 list-disc pl-6 flex flex-col gap-2">
                <li>To respond to your enquiries and provide quotations for our products and services</li>
                <li>To improve our products, services, and website functionality based on user feedback and usage patterns</li>
                <li>To communicate with you regarding order status, delivery schedules, and product updates when you have engaged our services</li>
                <li>To comply with applicable legal and regulatory requirements, including those related to product safety and certification standards</li>
                <li>To maintain the security and integrity of our website and business operations</li>
              </ul>
            </div>

            {/* 3. Data Storage and Security */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                3. Data Storage and Security
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                Your personal data is stored securely on servers located within India. We employ industry-standard security measures including encryption, access controls, and regular security audits to protect your information from unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="text-body text-be-grey-650">
                We do not share your personal information with unauthorized third parties. Access to personal data within our organisation is restricted to authorised personnel who require such access for the purposes outlined in this policy. All staff members with data access responsibilities are trained on data protection practices.
              </p>
            </div>

            {/* 4. Sharing of Information */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                4. Sharing of Information
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                Bharat Electrosafe does not sell, rent, or trade your personal information to any third party for commercial purposes.
              </p>
              <p className="text-body text-be-grey-650 mb-4">
                We may share certain information with testing and certification bodies (such as BIS, CPRI, and ERDA) as required by regulatory and compliance obligations related to our product certification processes. Such sharing is limited to what is strictly necessary for compliance purposes.
              </p>
              <p className="text-body text-be-grey-650">
                Analytics providers may receive anonymized, aggregated data that cannot be traced back to individual users. No personally identifiable information is shared with analytics services in a way that would allow individual identification.
              </p>
            </div>

            {/* 5. Cookies */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                5. Cookies
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                Our website uses the following types of cookies:
              </p>
              <ul className="text-body text-be-grey-650 list-disc pl-6 flex flex-col gap-2 mb-4">
                <li>
                  <strong>Essential cookies:</strong> These are necessary for the basic functioning of our website, including session management and form submission integrity. Essential cookies cannot be disabled as the website would not function properly without them.
                </li>
                <li>
                  <strong>Analytics cookies:</strong> These help us understand how visitors interact with our website by collecting aggregated usage data. Analytics cookies can be disabled through your browser settings. Disabling these cookies will not affect the core functionality of the website but may limit our ability to improve the user experience.
                </li>
              </ul>
              <p className="text-body text-be-grey-650">
                We do not use advertising cookies or third-party tracking cookies for marketing or retargeting purposes. Our cookie usage is strictly limited to essential site operations and privacy-respecting analytics.
              </p>
            </div>

            {/* 6. Your Rights */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                6. Your Rights
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="text-body text-be-grey-650 list-disc pl-6 flex flex-col gap-2 mb-4">
                <li>
                  <strong>Right to access:</strong> You may request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong>Right to correction:</strong> You may request correction of any inaccurate or incomplete personal data.
                </li>
                <li>
                  <strong>Right to deletion:</strong> You may request deletion of your personal data, subject to any legal or regulatory obligations that require us to retain certain records.
                </li>
                <li>
                  <strong>Right to withdraw consent:</strong> Where processing is based on your consent, you may withdraw that consent at any time. Withdrawal of consent does not affect the legality of processing carried out prior to withdrawal.
                </li>
                <li>
                  <strong>Right to lodge a complaint:</strong> If you believe that our processing of your personal data infringes applicable data protection laws, you have the right to lodge a complaint with the relevant data protection authority.
                </li>
              </ul>
              <p className="text-body text-be-grey-650">
                To exercise any of these rights, please contact us using the details provided in Section 8 below. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
              </p>
            </div>

            {/* 7. Third-Party Links */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                7. Third-Party Links
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                Our website may contain links to external websites, including YouTube for product demonstration videos, and certification bodies such as BIS, CPRI, and ERDA for reference and verification purposes. These links are provided for your convenience and information only.
              </p>
              <p className="text-body text-be-grey-650">
                We are not responsible for the privacy practices, content, or data protection policies of any third-party websites. We encourage you to read the privacy policies of any external sites you visit through links on our website. The inclusion of a link does not imply endorsement of the linked site or its operators.
              </p>
            </div>

            {/* 8. Contact for Privacy Concerns */}
            <div className="reveal-up">
              <h2 className="text-card-title text-be-charcoal-800 mb-3">
                8. Contact for Privacy Concerns
              </h2>
              <p className="text-body text-be-grey-650 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our handling of your personal data, please contact us at:
              </p>
              <div className="text-body text-be-grey-650 flex flex-col gap-2">
                <p>
                  <strong>Email:</strong> info@bharatelectrosafe.com
                </p>
                <p>
                  <strong>Address:</strong> Bharat Electrosafe, Industrial Area, India
                </p>
              </div>
              <p className="text-body text-be-grey-650 mt-4">
                We are committed to addressing your privacy concerns promptly and transparently.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
