import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Layers,
  SlidersHorizontal,
  Headphones,
  Award,
  Factory,
  FileText,
  Eye,
  Download,
  ArrowRight,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/data/products';
import { company } from '@/data/company';
import { certificates, certificateCategoryLabels } from '@/data/certificates';
import { clients } from '@/data/clients';

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: 'About Bharat Electrosafe | Company, Quality and Certifications',
  description:
    'Learn about Bharat Electrosafe — manufacturer of electrical insulating mats (IS 15652:2006), visible-safety mat variants, and BharatMembrane PVC geo-membranes (IS 15909:2020). Our commitment to safety, quality and application support.',
  alternates: { canonical: 'https://bharatelectrosafe.com/about-us' },
  openGraph: {
    title: 'About Bharat Electrosafe | Company, Quality and Certifications',
    description:
      'Learn about Bharat Electrosafe — manufacturer of electrical insulating mats, visible-safety mat variants, and BharatMembrane geomembranes.',
    url: 'https://bharatelectrosafe.com/about-us',
    type: 'website',
    siteName: 'Bharat Electrosafe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Bharat Electrosafe | Company, Quality and Certifications',
    description:
      'Learn about Bharat Electrosafe — manufacturer of electrical insulating mats, visible-safety mat variants, and BharatMembrane geomembranes.',
  },
};

/* ── Organization structured data (accurate only — no fake founding date) ── */
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bharat Electrosafe',
  description:
    'Manufacturer of electrical insulating mats and BharatMembrane geomembranes for industrial, utility and infrastructure protection.',
  url: 'https://bharatelectrosafe.com',
  logo: 'https://bharatelectrosafe.com/logo-bharat.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '704, 7th Floor, I-thum, Tower A, Plot No. A-40, Sector-62',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201309',
    addressCountry: 'IN',
  },
  email: 'info@bharatelectrosafe.com',
  telephone: '+91-7617494968',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7617494968',
    email: 'info@bharatelectrosafe.com',
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
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
      name: 'About Us',
      item: 'https://bharatelectrosafe.com/about-us',
    },
  ],
};

/* ── Mission & Values ── */
const missionValues = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description:
      'Every product is designed, tested and documented to protect operators in live electrical environments. Compliance with IS 15652:2006 and IEC 61111 is non-negotiable.',
  },
  {
    icon: Layers,
    title: 'Quality Assurance',
    description:
      'From raw-material selection to final dielectric testing, each production stage is controlled under documented quality procedures aligned with ISO 9001:2015.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Application Support',
    description:
      'We assist engineers in selecting the correct voltage class, dimensions and surface pattern for their specific installation — substation, control room, railway depot or industrial floor.',
  },
  {
    icon: Headphones,
    title: 'Technical Documentation',
    description:
      'Every batch ships with test certificates, BIS licence references and traceability data — supporting annual safety audits and asset-register compliance.',
  },
];

/* ── Capability statements ──
   Sourced from the client's published "Why Choose Us" content. No founding
   year, no supply history and no customer names are asserted — those remain
   unverified. See docs/CONTENT_VERIFICATION.md. */
const timeline = [
  {
    phase: 'Integrated manufacturing',
    description:
      'An integrated setup, commencing from compound manufacturing through to the finished insulating mat.',
  },
  {
    phase: 'Modern plant',
    description:
      'Manufacturing facility equipped with modern machinery for consistent, repeatable production.',
  },
  {
    phase: 'In-house testing',
    description:
      'A full-fledged testing lab facility, including high-voltage testing.',
  },
  {
    phase: 'Technical team',
    description:
      'Qualified and experienced technical and production staff supporting specification and application questions.',
  },
  {
    phase: 'Customisation',
    description:
      'Products customised for rate contracts and project-specific requirements.',
  },
];

/* ── Industries (same 6 as homepage, with more detail) ── */
const industriesDetail = [
  {
    name: 'Substations',
    description:
      'Insulating mats deployed across HV/MV switchyards, transformer bays and control rooms to protect operators from step-and-touch potential during switching, isolation and inspection.',
    link: '/products/electrical-insulating-mats',
  },
  {
    name: 'Power Utilities',
    description:
      'Full utility value chain — from generating-station turbine halls through 400 kV switchyards to 11 kV distribution substations. Single-supplier consistency ensures uniform class marking and QA documentation.',
    link: '/products/electrical-insulating-mats',
  },
  {
    name: 'Railways & Metro',
    description:
      'Traction substations (25 kV AC), OHE maintenance vehicles, depot earthing bays and metro rolling-stock depots. Class B/C matting with high-visibility strip variants for depot safety zoning.',
    link: '/products/coloured-strip-insulating-mats',
  },
  {
    name: 'Manufacturing',
    description:
      'HT/LT motor control centres, captive power-house panels, process-industry switchrooms and crane gantry cab floors. Oil-resistant compounds and visible-safety coloured-strip demarcation.',
    link: '/products/bi-color-insulating-mats',
  },
  {
    name: 'Control Rooms',
    description:
      'Insulating mats in front of control panels, mimic panels and SCADA consoles, protecting personnel working at AC and DC control panels.',
    link: '/products/electrical-insulating-mats',
  },
  {
    name: 'Tunnels & Water',
    description:
      'BharatMembrane PVC geo-membranes for tunnel and basement waterproofing, water reservoirs, canal lining, landfill and hazardous-waste containment, and industrial effluent ponds.',
    link: '/products/bharat-membrane',
  },
];

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
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
            <span className="text-charcoal-950 font-medium">About Us</span>
          </div>
        </nav>

        {/* ════════════════════════════════════════════
            Section 1: Company Introduction
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-24">
          <div className="container-site">
            <h1 className="text-page-title text-charcoal-950 mb-6">
              About Bharat Electrosafe
            </h1>
            <p className="text-body-lg text-grey-600 max-w-[680px] mb-8">
              {company.tagline}
            </p>
            <p className="text-body text-charcoal-800 max-w-[800px]">
              Bharat Electrosafe is a manufacturer of electrical insulating mats conforming to
              IS 15652:2006, visible-safety mat variants (coloured strip, Bi-Color and auto-glow
              / reflective band), and BharatMembrane PVC geo-membranes to IS 15909:2020 for civil
              infrastructure protection. Our insulating mats are manufactured under the standards
              and legacy of Tata Precision Industries (India) Limited, and the company operates
              under the Make in India initiative.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 2: What Bharat Electrosafe Manufactures
           ════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              What Bharat Electrosafe manufactures
            </h2>
            <p className="text-body text-grey-600 mb-10 max-w-[680px]">
              Five product families spanning electrical insulation, visible safety and civil
              protection — each designed, tested and documented for its specific operating
              environment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group block p-6 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 hover:bg-yellow-50/30 transition-colors"
                >
                  <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-yellow-50 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-[1.0625rem] font-semibold text-charcoal-950 mb-2 group-hover:text-yellow-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-small-meta text-grey-600 leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 text-small-meta font-medium text-charcoal-800 group-hover:text-yellow-600 transition-colors">
                    Explore product
                    <ArrowRight className="size-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 3: Company Journey (Timeline)
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Company journey
            </h2>
            <p className="text-body text-grey-600 mb-10 max-w-[680px]">
              Key milestones in Bharat Electrosafe&apos;s development — from establishment to
              current product portfolio.
            </p>

            <div className="relative max-w-[680px]">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-yellow-400/50 hidden sm:block" />

              <div className="flex flex-col gap-8">
                {timeline.map((entry, i) => (
                  <div key={entry.phase} className="relative flex items-start gap-6 sm:pl-8">
                    {/* Circle marker */}
                    <div className="hidden sm:flex absolute left-[7px] top-2 w-[18px] h-[18px] rounded-full bg-yellow-500 border-[3px] border-warm-white items-center justify-center">
                      <span className="text-[0.5rem] font-bold text-charcoal-950">{i + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="sm:min-w-0">
                      <h3 className="text-[1.0625rem] font-semibold text-charcoal-950 mb-2">
                        {entry.phase}
                      </h3>
                      <p className="text-body text-grey-600">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 4: Mission and Values
           ════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Mission and values
            </h2>
            <p className="text-body text-grey-600 mb-10 max-w-[680px]">
              Safety, quality and application support are the three pillars that guide every
              decision at Bharat Electrosafe.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {missionValues.map((value) => (
                <div
                  key={value.title}
                  className="flex items-start gap-4 p-6 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                    <value.icon className="size-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold text-charcoal-950 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-small-meta text-grey-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 5: Leadership (Placeholder)
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Leadership
            </h2>
            <p className="text-body text-grey-600 mb-10 max-w-[680px]">
              The leadership team at Bharat Electrosafe brings expertise in electrical safety
              engineering, manufacturing operations and customer support.
            </p>

            {/* Placeholder — awaiting client-approved photos and roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className="p-6 border border-grey-300/50 rounded-md bg-white text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-grey-150 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-small-meta text-grey-600">Photo</span>
                  </div>
                  <p className="text-[0.9375rem] font-medium text-charcoal-800">
                    [Leadership information pending client approval]
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 6: Manufacturing and Testing (Placeholder images)
           ════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Manufacturing and testing
            </h2>
            <p className="text-body text-grey-600 mb-6 max-w-[680px]">
              Bharat Electrosafe products are manufactured under controlled quality procedures and
              tested for compliance with applicable Indian Standards. Each batch undergoes
              dielectric testing, leakage-current measurement and visual inspection before release.
            </p>
            <p className="text-small-meta text-grey-600 mb-10 italic">
              Authentic manufacturing and testing photographs will be added once approved by the
              client.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Production area', alt: 'Manufacturing production area' },
                { label: 'Testing station', alt: 'Product testing station' },
                { label: 'Quality inspection', alt: 'Quality inspection process' },
              ].map((img) => (
                <div
                  key={img.label}
                  className="relative aspect-[4/3] rounded-md overflow-hidden bg-yellow-50 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Factory className="size-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-small-meta text-grey-600">{img.label}</p>
                    <p className="text-xs text-grey-600 italic mt-1">[Image pending client approval]</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 7: Quality and Certifications Overview
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Quality and certifications
            </h2>
            <p className="text-body text-grey-600 mb-6 max-w-[680px]">
              Bharat Electrosafe follows a documented quality management system aligned with
              ISO 9001:2015. Products are manufactured under a Bureau of Indian Standards (BIS)
              licence and independently tested by ERDA and NTH for dielectric compliance with
              IS 15652:2006.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-start gap-3 p-4 border border-yellow-500/40 rounded-md bg-yellow-50/50">
                <ShieldCheck className="size-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[0.9375rem] font-medium text-charcoal-950">
                    BIS Licensed
                  </p>
                  <p className="text-small-meta text-grey-600">
                    Manufacturing under IS 15652:2006 BIS licence
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 border border-yellow-500/40 rounded-md bg-yellow-50/50">
                <Eye className="size-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[0.9375rem] font-medium text-charcoal-950">
                    Independently Tested
                  </p>
                  <p className="text-small-meta text-grey-600">
                    Dielectric testing by ERDA and NTH
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 border border-yellow-500/40 rounded-md bg-yellow-50/50">
                <Award className="size-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[0.9375rem] font-medium text-charcoal-950">
                    ISO Certified
                  </p>
                  <p className="text-small-meta text-grey-600">
                    Quality management per ISO 9001:2015
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 8: Downloadable Certificates and Reports
           ════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Certificates and reports
            </h2>
            <p className="text-body text-grey-600 mb-6 max-w-[680px]">
              Download certificates, licences and test reports for Bharat Electrosafe products.
              Each document includes the applicable standard, issuing authority and reference
              details.
            </p>

            {/* Verification notice */}
            <div className="mb-8 p-4 border border-yellow-400/40 rounded-md bg-yellow-50/50 flex items-start gap-3">
              <Eye className="size-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-small-meta text-charcoal-800">
                Document verification pending — all certificates and reports listed below are
                placeholders. Actual documents, reference numbers and issue dates will be
                published once verified and approved by the issuing authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-yellow-50 mb-4 flex items-center justify-center">
                    <FileText className="size-8 text-yellow-500/60" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 rounded text-[0.6rem] font-bold text-charcoal-950 uppercase">
                      {cert.stamp}
                    </div>
                  </div>

                  {/* Document info */}
                  <h3 className="text-[0.9375rem] font-semibold text-charcoal-950 mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-small-meta text-grey-600 mb-1">
                    Standard: <span className="text-charcoal-800">{cert.standard}</span>
                  </p>
                  <p className="text-small-meta text-grey-600 mb-1">
                    Issuing body: <span className="text-charcoal-800">{cert.issuer}</span>
                  </p>
                  {cert.referenceNumber && (
                    <p className="text-small-meta text-grey-600 mb-1">
                      Certificate no: <span className="text-charcoal-800">{cert.referenceNumber}</span>
                    </p>
                  )}
                  {cert.issueDate && (
                    <p className="text-small-meta text-grey-600 mb-1">
                      Issue date: <span className="text-charcoal-800">{cert.issueDate}</span>
                    </p>
                  )}
                  <p className="text-small-meta text-grey-600 mb-3">
                    File type: <span className="text-charcoal-800">{cert.fileType}</span>
                    {cert.fileSize && (
                      <> &middot; Size: <span className="text-charcoal-800">{cert.fileSize}</span></>
                    )}
                  </p>

                  {/* Category badge */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-yellow-50 border border-yellow-200/50 rounded text-[0.65rem] font-medium text-charcoal-800">
                      {certificateCategoryLabels[cert.category]}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={!cert.verified}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-grey-150 text-grey-600 rounded text-small-meta font-medium min-h-[36px] disabled:cursor-not-allowed"
                      aria-label={`Preview ${cert.name}`}
                    >
                      <Eye className="size-3.5" />
                      Preview
                    </button>
                    <button
                      type="button"
                      disabled={!cert.verified}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-yellow-500 text-charcoal-950 rounded text-small-meta font-semibold min-h-[36px] hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Download ${cert.name} PDF`}
                    >
                      <Download className="size-3.5" />
                      Download PDF
                    </button>
                  </div>

                  {!cert.verified && (
                    <p className="text-xs text-grey-600 italic mt-2">
                      Pending verification
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 9: Industries Served (Detailed)
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Industries served
            </h2>
            <p className="text-body text-grey-600 mb-10 max-w-[680px]">
              Bharat Electrosafe products protect operators, assets and infrastructure across
              six critical industry sectors — from substations and power utilities to railway
              depots and tunnel waterproofing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industriesDetail.map((industry) => (
                <div
                  key={industry.name}
                  className="p-6 border border-grey-300/50 rounded-md bg-white hover:border-yellow-500/60 transition-colors"
                >
                  <h3 className="text-[1.0625rem] font-semibold text-charcoal-950 mb-3">
                    {industry.name}
                  </h3>
                  <p className="text-small-meta text-grey-600 leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  <Link
                    href={industry.link}
                    className="inline-flex items-center gap-1.5 text-small-meta font-medium text-charcoal-800 hover:text-yellow-600 transition-colors"
                  >
                    View related products
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 10: Awards and Recognition (Placeholder)
           ════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Awards and recognition
            </h2>
            <p className="text-body text-grey-600 mb-6 max-w-[680px]">
              Bharat Electrosafe has been recognised under various government and industry
              frameworks for manufacturing quality and innovation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className="p-6 border border-grey-300/50 rounded-md bg-warm-white text-center"
                >
                  <div className="w-12 h-12 rounded-md bg-yellow-50 mx-auto mb-4 flex items-center justify-center">
                    <Award className="size-6 text-yellow-500" />
                  </div>
                  <p className="text-[0.9375rem] font-medium text-charcoal-800">
                    [Award details pending client approval]
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 11: Client Logo Rail (CSS-only)
           ════════════════════════════════════════════ */}
        <section className="bg-warm-white py-16 md:py-20 border-t border-grey-300/30">
          <div className="container-site">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Sectors we serve
            </h2>
            <p className="text-body text-grey-600 mb-8 max-w-[680px]">
              Bharat Electrosafe supplies electrical safety and containment products to power
              utilities, railways, oil &amp; gas, construction, infrastructure and heavy industry.
            </p>

            <ul className="flex flex-wrap gap-2.5" role="list">
              {company.industries.map((industry) => (
                <li
                  key={industry}
                  className="inline-flex items-center rounded-full border border-grey-300/60 bg-white px-4 py-2 text-[0.875rem] font-medium text-charcoal-800"
                >
                  {industry}
                </li>
              ))}
            </ul>

            {/* Customer names and logos are deliberately not shown. They require a
                confirmed relationship plus written permission — see
                src/data/clients.ts and docs/CONTENT_VERIFICATION.md. */}
            <p className="text-xs text-grey-600 italic mt-6 max-w-[680px]">
              Customer references and project case studies are available on request.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Section 12: Contact CTA
           ════════════════════════════════════════════ */}
        <section className="bg-yellow-500 py-16 md:py-20">
          <div className="container-site text-center">
            <h2 className="text-section-h2 text-charcoal-950 mb-4">
              Get in touch
            </h2>
            <p className="text-body-lg text-charcoal-800 mb-8 max-w-[540px] mx-auto">
              Contact Bharat Electrosafe for product enquiries, quotations, technical
              documentation or application support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center bg-charcoal-950 hover:bg-charcoal-800 text-white font-semibold text-[0.9375rem] px-7 py-3 rounded-md transition-colors min-h-[44px]"
              >
                Contact us
                <ArrowRight className="size-4 ml-2" />
              </Link>
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center bg-white hover:bg-warm-white text-charcoal-950 font-semibold text-[0.9375rem] px-7 py-3 rounded-md border border-charcoal-950/20 transition-colors min-h-[44px]"
              >
                <Phone className="size-4 mr-2" />
                {company.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
