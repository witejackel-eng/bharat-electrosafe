import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { company } from '@/data/company';

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: 'Terms of Use | Bharat Electrosafe',
  description:
    'Terms of use for the Bharat Electrosafe website — conditions for use, intellectual property and liability limitations.',
  alternates: { canonical: 'https://bharatelectrosafe.com/terms' },
  openGraph: {
    title: 'Terms of Use | Bharat Electrosafe',
    description:
      'Terms of use for the Bharat Electrosafe website — conditions for use, intellectual property and liability limitations.',
    url: 'https://bharatelectrosafe.com/terms',
    type: 'website',
    siteName: 'Bharat Electrosafe',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Use | Bharat Electrosafe',
    description:
      'Terms of use for the Bharat Electrosafe website.',
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
      name: 'Terms of Use',
      item: 'https://bharatelectrosafe.com/terms',
    },
  ],
};

export default function TermsPage() {
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
            <span className="text-charcoal-950 font-medium">Terms of Use</span>
          </div>
        </nav>

        {/* ── Page Content ── */}
        <section className="bg-warm-white py-16 md:py-24">
          <div className="container-site max-w-[760px]">
            <h1 className="text-page-title text-charcoal-950 mb-8">
              Terms of Use
            </h1>

            <p className="text-body text-grey-600 mb-8">
              These terms of use govern your access to and use of the Bharat Electrosafe
              website. By accessing this website, you agree to these terms.
            </p>

            {/* ── Effective Date ── */}
            <div className="mb-10 p-4 border border-yellow-500/40 rounded-md bg-yellow-50/50">
              <p className="text-small-meta text-charcoal-800">
                <span className="font-medium">Effective date:</span> [Effective date to be confirmed by Bharat Electrosafe]
              </p>
            </div>

            {/* ── Use of Website ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Use of website
              </h2>
              <p className="text-body text-grey-600 mb-4">
                The Bharat Electrosafe website provides information about our products,
                services and company. You may use this website to:
              </p>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2 text-body text-grey-600">
                <li>View product information, specifications and standards compliance</li>
                <li>Submit enquiries or quotation requests through the contact form</li>
                <li>Access downloadable certificates and test reports (when available)</li>
                <li>Read company information and industry application details</li>
              </ul>
              <p className="text-body text-grey-600 mt-4">
                You agree not to use this website for any unlawful purpose, or in any way
                that could damage, disable or impair the website or interfere with any other
                party&apos;s use. You agree not to attempt to gain unauthorised access to any
                part of the website or its systems.
              </p>
            </article>

            {/* ── Intellectual Property ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Intellectual property
              </h2>
              <p className="text-body text-grey-600 mb-4">
                All content on this website — including text, images, product specifications,
                standards references, branding, logos and layout — is the property of Bharat
                Electrosafe or its licensors and is protected by applicable intellectual
                property laws.
              </p>
              <p className="text-body text-grey-600 mb-4">
                You may not reproduce, distribute, modify, create derivative works from,
                publicly display or commercially exploit any content from this website without
                prior written permission from Bharat Electrosafe.
              </p>
              <p className="text-body text-grey-600">
                Product names, standards references (such as IS 15652:2006) and certification
                marks appearing on this website are used for informational purposes to indicate
                compliance with the relevant standards and regulations. Their use does not
                imply endorsement by the issuing authorities beyond the specific licence or
                certification held by Bharat Electrosafe.
              </p>
            </article>

            {/* ── Limitation of Liability ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Limitation of liability
              </h2>
              <p className="text-body text-grey-600 mb-4">
                The information on this website is provided for general informational purposes.
                While Bharat Electrosafe strives to keep the information accurate and
                up-to-date, we make no representations or warranties of any kind, express or
                implied, about the completeness, accuracy, reliability or suitability of the
                information.
              </p>
              <p className="text-body text-grey-600 mb-4">
                Product specifications, dimensions, voltage ratings and compliance details
                presented on this website are subject to the specific terms of the applicable
                standards and the product&apos;s BIS licence. For precise specifications, always
                refer to the current product datasheet and test certificate supplied with the
                product.
              </p>
              <p className="text-body text-grey-600">
                Bharat Electrosafe shall not be liable for any loss or damage, including but
                not limited to indirect or consequential loss or damage, arising from the use
                of information on this website.
              </p>
            </article>

            {/* ── Contact Regarding Terms ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Contact regarding terms
              </h2>
              <p className="text-body text-grey-600 mb-4">
                If you have questions about these terms of use, please contact us:
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

            {/* ── Changes to Terms ── */}
            <article className="mb-10">
              <h2 className="text-section-h2 text-charcoal-950 mb-4 text-[1.75rem]">
                Changes to these terms
              </h2>
              <p className="text-body text-grey-600">
                Bharat Electrosafe may revise these terms of use from time to time. Any
                changes will be posted on this page with an updated effective date. Continued
                use of the website after changes are posted constitutes acceptance of the
                revised terms.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
