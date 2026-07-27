import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import { company, contactWhatsApp } from '@/data/company';

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: 'Contact Bharat Electrosafe | Product and Quotation Enquiries',
  description:
    'Contact Bharat Electrosafe for product enquiries, quotations for electrical insulating mats, visible-safety mat variants and BharatMembrane geomembranes. Phone, email, WhatsApp and office address.',
  alternates: { canonical: 'https://bharatelectrosafe.com/contact-us' },
  openGraph: {
    title: 'Contact Bharat Electrosafe | Product and Quotation Enquiries',
    description:
      'Contact Bharat Electrosafe for product enquiries and quotations. Phone, email, WhatsApp and office address.',
    url: 'https://bharatelectrosafe.com/contact-us',
    type: 'website',
    siteName: 'Bharat Electrosafe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Bharat Electrosafe | Product and Quotation Enquiries',
    description:
      'Contact Bharat Electrosafe for product enquiries and quotations.',
  },
};

/* ── ContactPoint structured data (verified info only) ── */
const contactPointLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Bharat Electrosafe',
  url: 'https://bharatelectrosafe.com/contact-us',
  mainEntity: {
    '@type': 'Organization',
    name: 'Bharat Electrosafe',
    telephone: ['+91-7617494968', '+91-9667171444'],
    email: 'info@bharatelectrosafe.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '704, 7th Floor, I-thum, Tower A, Plot No. A-40, Sector-62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201309',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7617494968',
      email: 'info@bharatelectrosafe.com',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
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
      name: 'Contact Us',
      item: 'https://bharatelectrosafe.com/contact-us',
    },
  ],
};

/* ── Product class selection guidance ── */
const classGuidance = [
  {
    class: 'Class A',
    voltage: '3.3 kV',
    thickness: '2.0 mm',
    use: 'Low-tension (LT) panels, motor control centres, distribution boards',
  },
  {
    class: 'Class B',
    voltage: '11 kV',
    thickness: '2.5 mm',
    use: '11 kV switchgear, metering panels, substation auxiliary bays',
  },
  {
    class: 'Class C',
    voltage: '33 kV',
    thickness: '3.0 mm',
    use: '33 kV switchyards, HV transformer bays, traction substations',
  },
];

/* ── Google Maps link ── */
const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=I-thum+Tower+A+Sector+62+Noida+201309';

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointLd) }}
      />
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
            <span className="text-charcoal-950 font-medium">Contact Us</span>
          </div>
        </nav>

        {/* ════════════════════════════════════════════
            Section 1: Contact Hero
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-24">
          <div className="container-site">
            <h1 className="text-page-title text-charcoal-950 mb-6">
              Contact Bharat Electrosafe
            </h1>
            <p className="text-body-lg text-grey-600 max-w-[680px]">
              Get in touch for product enquiries, quotations, technical documentation or
              application support.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 2: Contact Details
           ════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-10">
              Contact details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* ── Email ── */}
              <a
                href={`mailto:${company.email}`}
                className="flex items-start gap-4 p-6 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 transition-colors min-h-[44px]"
              >
                <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                  <Mail className="size-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-small-meta text-grey-600 mb-1">Email</p>
                  <p className="text-[1.0625rem] font-medium text-charcoal-950">{company.email}</p>
                </div>
              </a>

              {/* ── Primary Phone ── */}
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="flex items-start gap-4 p-6 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 transition-colors min-h-[44px]"
              >
                <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                  <Phone className="size-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-small-meta text-grey-600 mb-1">Phone (primary)</p>
                  <p className="text-[1.0625rem] font-medium text-charcoal-950">{company.phone}</p>
                </div>
              </a>

              {/* ── Secondary Phone ── */}
              <a
                href={`tel:${company.phoneSecondary.replace(/\s/g, '')}`}
                className="flex items-start gap-4 p-6 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 transition-colors min-h-[44px]"
              >
                <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                  <Phone className="size-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-small-meta text-grey-600 mb-1">Phone (secondary)</p>
                  <p className="text-[1.0625rem] font-medium text-charcoal-950">{company.phoneSecondary}</p>
                </div>
              </a>

              {/* ── WhatsApp ── */}
              <a
                href={contactWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 transition-colors min-h-[44px]"
              >
                <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                  <MessageCircle className="size-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-small-meta text-grey-600 mb-1">WhatsApp</p>
                  <p className="text-[1.0625rem] font-medium text-charcoal-950">+91 7617494968</p>
                </div>
              </a>

              {/* ── Address ── */}
              <div
                className="flex items-start gap-4 p-6 border border-grey-300/50 rounded-md bg-warm-white sm:col-span-2"
              >
                <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                  <MapPin className="size-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-small-meta text-grey-600 mb-1">Registered office</p>
                  <p className="text-[1.0625rem] font-medium text-charcoal-950">
                    {company.address.line1}, {company.address.line2},{' '}
                    {company.address.city}-{company.address.pincode},{' '}
                    {company.address.state}, {company.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 3: General Enquiry and Quotation Form
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              General enquiry and quotation form
            </h2>
            <p className="text-body text-grey-600 mb-8 max-w-[680px]">
              Submit a general enquiry or request a product quotation. For quotation requests,
              please provide specification details to help us prepare an accurate proposal.
            </p>

            <div className="max-w-[680px]">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 4: Product Selection Guidance
           ════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Product selection guidance
            </h2>
            <p className="text-body text-grey-600 mb-6 max-w-[680px]">
              Electrical insulating mats are selected by operating voltage. Use the table below
              to identify the correct class for your installation. If you need assistance,
              include your operating voltage in the enquiry form and our team will recommend the
              appropriate class, thickness and dimensions.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border border-grey-300/50 rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-yellow-50">
                    <th className="text-left px-5 py-3 text-[0.875rem] font-semibold text-charcoal-950">Class</th>
                    <th className="text-left px-5 py-3 text-[0.875rem] font-semibold text-charcoal-950">Max. working voltage</th>
                    <th className="text-left px-5 py-3 text-[0.875rem] font-semibold text-charcoal-950">Nominal thickness</th>
                    <th className="text-left px-5 py-3 text-[0.875rem] font-semibold text-charcoal-950">Typical application</th>
                  </tr>
                </thead>
                <tbody>
                  {classGuidance.map((row) => (
                    <tr key={row.class} className="border-t border-grey-300/30 bg-warm-white">
                      <td className="px-5 py-3 text-[0.9375rem] font-medium text-charcoal-950">{row.class}</td>
                      <td className="px-5 py-3 text-[0.9375rem] text-charcoal-800">{row.voltage}</td>
                      <td className="px-5 py-3 text-[0.9375rem] text-charcoal-800">{row.thickness}</td>
                      <td className="px-5 py-3 text-small-meta text-grey-600">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 border border-yellow-500/40 rounded-md bg-yellow-50/50">
              <ShieldCheck className="size-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-small-meta text-charcoal-800">
                Always select a mat class rated at or above the maximum operating voltage of
                the equipment in front of which the mat will be placed. The proof-test voltage
                for each class is significantly above the rated working voltage to provide an
                adequate safety margin.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 5: Click-to-load Map
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Office location
            </h2>
            <p className="text-body text-grey-600 mb-8 max-w-[680px]">
              Bharat Electrosafe is located at I-thum, Tower A in Sector-62, Noida, Uttar
              Pradesh.
            </p>

            {/* ── Static map placeholder ── */}
            <div className="relative aspect-[16/9] max-h-[400px] rounded-md overflow-hidden bg-grey-150 mb-6 flex items-center justify-center border border-grey-300/50">
              {/* Placeholder static map image */}
              <div className="text-center">
                <MapPin className="size-12 text-yellow-500 mx-auto mb-3" />
                <p className="text-[0.9375rem] font-medium text-charcoal-950 mb-1">
                  I-thum, Tower A, Sector-62, Noida
                </p>
                <p className="text-small-meta text-grey-600">
                  704, 7th Floor, Noida-201309, Uttar Pradesh, India
                </p>
              </div>
            </div>

            {/* ── Map action buttons ── */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold text-[0.9375rem] px-6 py-3 rounded-md transition-colors min-h-[44px]"
              >
                <ExternalLink className="size-4" />
                Open in Google Maps
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-warm-white text-charcoal-800 font-medium text-[0.9375rem] px-6 py-3 rounded-md border border-grey-300 transition-colors min-h-[44px]"
              >
                <MapPin className="size-4" />
                Get directions
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 6: Alternative Contact Actions
           ════════════════════════════════════════════ */}
        <section className="bg-yellow-500 py-16 md:py-20">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4 text-center">
              Reach us directly
            </h2>
            <p className="text-body-lg text-charcoal-800 mb-8 max-w-[540px] mx-auto text-center">
              For urgent enquiries or immediate assistance, contact us directly via phone,
              email or WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center bg-charcoal-950 hover:bg-charcoal-800 text-white font-semibold text-[0.9375rem] px-7 py-3 rounded-md transition-colors min-h-[44px]"
              >
                <Phone className="size-4 mr-2" />
                Call {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center justify-center bg-white hover:bg-warm-white text-charcoal-950 font-semibold text-[0.9375rem] px-7 py-3 rounded-md border border-charcoal-950/20 transition-colors min-h-[44px]"
              >
                <Mail className="size-4 mr-2" />
                Email us
              </a>
              <a
                href={contactWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white hover:bg-warm-white text-charcoal-950 font-semibold text-[0.9375rem] px-7 py-3 rounded-md border border-charcoal-950/20 transition-colors min-h-[44px]"
              >
                <MessageCircle className="size-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
