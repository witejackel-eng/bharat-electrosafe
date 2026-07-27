import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { company } from '@/data/company';

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: 'Privacy Policy | Bharat Electrosafe',
  description:
    'Privacy policy for Bharat Electrosafe — how we collect, use and protect your personal information.',
  alternates: { canonical: 'https://bharatelectrosafe.com/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | Bharat Electrosafe',
    description:
      'Privacy policy for Bharat Electrosafe — how we collect, use and protect your personal information.',
    url: 'https://bharatelectrosafe.com/privacy-policy',
    type: 'website',
    siteName: 'Bharat Electrosafe',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Bharat Electrosafe',
    description:
      'Privacy policy for Bharat Electrosafe — how we collect, use and protect your personal information.',
  },
};

/* ── BreadcrumbList structured data ── */
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://bharatelectrosafe.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Privacy Policy',
      item: 'https://bharatelectrosafe.com/privacy-policy',
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Header />

      <main id="main-content" className="flex-1">
        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="bg-yellow-50/50 border-b border-grey-300/30">
          <div className="container-site py-3 flex items-center gap-2 text-small-meta text-grey-600">
            <Link href="/" className="hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-grey-300" />
            <span className="text-charcoal-950 font-medium">Privacy Policy</span>
          </div>
        </nav>

        {/* ── Page Content ── */}
        <section className="bg-warm-white py-16 md:py-24">
          <div className="container-site max-w-[760px]">
            <h1 className="text-page-title text-charcoal-950 mb-8">
              Privacy Policy
            </h1>

            <p className="text-body text-grey-600 mb-8">
              This privacy policy describes how Bharat Electrosafe collects, uses and protects
              personal information when you visit our website or submit an enquiry.
            </p>

            {/* ── Effective Date ── */}
            <div className="mb-10 p-4 border border-yellow-500/40 rounded-md bg-yellow-50/50">
              <p className="text-small-meta text-charcoal-800">
                <span className="font-medium">Effective date:</span> [Effective date to be confirmed by Bharat Electrosafe]
              </p>
            </div>

            {/* ── Information Collection ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Information we collect
              </h2>
              <p className="text-body text-grey-600 mb-4">
                When you submit an enquiry or quotation request through our contact form, we
                collect the following information:
              </p>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2 text-body text-grey-600">
                <li>Your name and company or organisation name</li>
                <li>Your email address and phone number</li>
                <li>The product and enquiry type you select</li>
                <li>Any specification details you provide (voltage class, thickness, dimensions, quantity, delivery location)</li>
                <li>Your message or enquiry content</li>
              </ul>
              <p className="text-body text-grey-600 mt-4">
                We do not collect information through cookies beyond what is necessary for
                website functionality. We do not use third-party tracking or analytics services
                that collect personal data without your consent.
              </p>
            </article>

            {/* ── Use of Information ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                How we use your information
              </h2>
              <p className="text-body text-grey-600 mb-4">
                We use the information you provide solely for the following purposes:
              </p>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2 text-body text-grey-600">
                <li>To respond to your enquiry or quotation request</li>
                <li>To provide product recommendations, technical documentation or pricing</li>
                <li>To follow up on your enquiry if further information is needed</li>
                <li>To process and fulfil product orders, if applicable</li>
              </ul>
              <p className="text-body text-grey-600 mt-4">
                We do not sell, rent, share or distribute your personal information to third
                parties for marketing purposes. Your data is used only by Bharat Electrosafe
                staff to respond to your specific enquiry.
              </p>
            </article>

            {/* ── Information Protection ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Information protection
              </h2>
              <p className="text-body text-grey-600 mb-4">
                We take reasonable measures to protect your personal information:
              </p>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2 text-body text-grey-600">
                <li>Enquiry data is transmitted through encrypted connections (HTTPS)</li>
                <li>Personal information is stored on secured servers with access controls</li>
                <li>Only authorised Bharat Electrosafe staff have access to enquiry data</li>
                <li>We do not retain personal information beyond what is necessary to fulfil your enquiry</li>
              </ul>
              <p className="text-body text-grey-600 mt-4">
                While we implement reasonable security measures, no method of electronic
                transmission or storage is completely secure. We cannot guarantee absolute
                security of your information.
              </p>
            </article>

            {/* ── Contact Regarding Privacy ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Contact regarding privacy
              </h2>
              <p className="text-body text-grey-600 mb-4">
                If you have questions or concerns about this privacy policy or how your
                personal information is handled, please contact us:
              </p>
              <div className="p-4 border border-grey-300/50 rounded-md bg-white">
                <p className="text-body text-charcoal-800 mb-2">
                  <span className="font-medium">Bharat Electrosafe</span>
                </p>
                <p className="text-small-meta text-grey-600 mb-1">
                  Email: <a href={`mailto:${company.email}`} className="text-yellow-600 hover:text-yellow-500 underline underline-offset-2">{company.email}</a>
                </p>
                <p className="text-small-meta text-grey-600 mb-1">
                  Phone: <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-yellow-600 hover:text-yellow-500 underline underline-offset-2">{company.phone}</a>
                </p>
                <p className="text-small-meta text-grey-600">
                  Address: {company.address.line1}, {company.address.line2}, {company.address.city}-{company.address.pincode}, {company.address.state}, {company.address.country}
                </p>
              </div>
            </article>

            {/* ── Changes to Policy ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Changes to this policy
              </h2>
              <p className="text-body text-grey-600">
                Bharat Electrosafe may update this privacy policy from time to time. Any
                changes will be posted on this page with an updated effective date. We
                encourage you to review this policy periodically.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
