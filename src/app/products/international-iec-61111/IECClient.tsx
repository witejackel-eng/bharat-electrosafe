'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import {
  Shield,
  Zap,
  Eye,
  Sun,
  Layers,
  Ruler,
  Award,
  Globe,
  ChevronRight,
  Download,
  Phone,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { FeatureList } from '@/components/ui/FeatureList';
import { company } from '@/data/company';

/* ────────────────────────────────────────────
   IEC 61111:2009 Class specification data
   ──────────────────────────────────────────── */

const iecClasses = [
  { class: 'Class 0', maxWorkingVoltage: '500 V', proofTestVoltage: '5 kV', thickness: '2 mm' },
  { class: 'Class 1', maxWorkingVoltage: '1 000 V', proofTestVoltage: '10 kV', thickness: '2 mm' },
  { class: 'Class 2', maxWorkingVoltage: '7 000 V', proofTestVoltage: '20 kV', thickness: '2 mm' },
  { class: 'Class 3', maxWorkingVoltage: '17 000 V', proofTestVoltage: '30 kV', thickness: '2 mm' },
  { class: 'Class 4', maxWorkingVoltage: '36 000 V', proofTestVoltage: '40 kV', thickness: '2 mm' },
];

/* ────────────────────────────────────────────
   Feature icon mapping
   ──────────────────────────────────────────── */

const featureIconMap: Record<string, LucideIcon> = {
  shield: Shield,
  zap: Zap,
  eye: Eye,
  sun: Sun,
  layers: Layers,
  ruler: Ruler,
  award: Award,
  globe: Globe,
};

/* ────────────────────────────────────────────
   Breadcrumb items
   ──────────────────────────────────────────── */

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'International / Global (IEC 61111:2009)' },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function IECClient() {
  /* ── Scroll reveal ── */
  useEffect(() => {
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

        {/* ══════════════════════════════════════
            HERO SECTION
            ══════════════════════════════════════ */}
        <SectionShell variant="productHero" bg="be-page-top-tint" className="product-hero-compact">
          <Breadcrumb items={breadcrumbItems} className="mb-3 lg:mb-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Text side */}
            <div className="min-w-0 lg:col-span-6 xl:col-span-5 flex flex-col">
              {/* Technical badge */}
              <div className="flex flex-wrap gap-2 mb-2.5 lg:mb-3">
                <TechnicalBadge label="IEC 61111:2009" />
                <TechnicalBadge label="International Standard" />
              </div>

              {/* Eyebrow */}
              <Eyebrow className="mb-3">International / Global</Eyebrow>

              {/* H1 */}
              <h1 className="product-hero-h1 text-product-h1 text-be-charcoal-950 mb-3 lg:mb-4">
                Insulating Mats to IEC 61111:2009
              </h1>

              {/* Introduction */}
              <p className="product-hero-intro text-body-large text-be-grey-650 leading-relaxed mb-4 lg:mb-5">
                IEC 61111:2009 specifies insulating mats for live working on electrical
                installations up to 36 000 V. Designed for international markets that
                require IEC-compliant operator protection, these mats are available in
                Classes 0 through 4 — including auto-glow and bi-colour variants for
                enhanced visibility and safety compliance.
              </p>

              {/* Quick facts */}
              <div className="product-hero-facts flex flex-col sm:flex-row gap-3 sm:gap-5 mb-5 lg:mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-8 rounded-md bg-be-yellow-50 shrink-0" aria-hidden="true">
                    <Zap className="size-4 text-be-yellow-text" />
                  </span>
                  <div>
                    <div className="text-metadata text-be-grey-650 font-medium">Classes</div>
                    <div className="text-body font-semibold text-be-charcoal-950">0, 1, 2, 3, 4</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-8 rounded-md bg-be-yellow-50 shrink-0" aria-hidden="true">
                    <Ruler className="size-4 text-be-yellow-text" />
                  </span>
                  <div>
                    <div className="text-metadata text-be-grey-650 font-medium">Max Voltage</div>
                    <div className="text-body font-semibold text-be-charcoal-950">Up to 36 000 V</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-8 rounded-md bg-be-yellow-50 shrink-0" aria-hidden="true">
                    <Globe className="size-4 text-be-yellow-text" />
                  </span>
                  <div>
                    <div className="text-metadata text-be-grey-650 font-medium">Standard</div>
                    <div className="text-body font-semibold text-be-charcoal-950">IEC 61111:2009</div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href="/contact-us" size="lg">
                  Request a Quote
                </PrimaryButton>
                <SecondaryButton href="#specifications">
                  View Specifications
                </SecondaryButton>
              </div>
            </div>

            {/* Media side */}
            <div className="min-w-0 lg:col-span-6 xl:col-span-7">
              <ImageFrame
                src="/media/products/international-iec/iec-61111.webp"
                alt="IEC 61111:2009 insulating mat for live working — Class 2 with moulded IEC marking"
                aspectRatio="landscape"
                fit="contain"
                priority
              />
            </div>
          </div>
        </SectionShell>

        {/* ── Assurance strip ── */}
        <section aria-label="Product assurance" className="border-y border-be-yellow-100 bg-be-yellow-50">
          <div className="container-site page-horizontal-padding py-6 md:py-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              {[
                { icon: Award, text: 'IEC 61111:2009 certified' },
                { icon: Shield, text: 'Type-tested at CPRI / NABL lab' },
                { icon: Layers, text: 'Elastomer compound — 2 mm nominal' },
                { icon: Ruler, text: 'Custom sizes available' },
                { icon: Zap, text: 'Class 0 to Class 4 voltage ratings' },
                { icon: Globe, text: 'Accepted in IEC-member markets worldwide' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-be-white border border-be-yellow-100" aria-hidden="true">
                    <Icon className="h-4 w-4 text-be-yellow-text" />
                  </span>
                  <span className="text-[14px] leading-snug font-medium text-be-charcoal-950">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══════════════════════════════════════
            OVERVIEW SECTION
            ══════════════════════════════════════ */}
        <SectionShell variant="standard" bg="bg-be-white" topRule>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Image */}
            <div className="lg:w-[45%] order-first lg:order-last">
              <ImageFrame
                src="/media/products/international-iec/iec-61111-class-2.webp"
                alt="IEC 61111 Class 2 insulating mat showing moulded marking and anti-skid surface"
                aspectRatio="landscape"
                fit="contain"
              />
            </div>

            {/* Text */}
            <div className="lg:w-[55%] flex flex-col gap-6">
              <SectionHeader
                eyebrow="Standard Overview"
                title="IEC 61111:2009 — Insulating Mats for Live Working"
                supportingText="The IEC 61111:2009 international standard specifies the construction, dimensions, and test requirements for insulating mats used for live working on electrical installations. Unlike the domestic IS 15652:2006, which defines Classes A through D, IEC 61111 defines five classes (0–4) with voltage ratings up to 36 000 V — making these mats suitable for high-voltage applications in IEC-member countries worldwide."
              />
              <FeatureList
                items={[
                  { icon: Shield, text: 'Five distinct voltage classes (Class 0 through Class 4)' },
                  { icon: Zap, text: 'Proof test voltages from 5 kV (Class 0) to 40 kV (Class 4)' },
                  { icon: Globe, text: 'Recognised in all IEC-member country markets' },
                  { icon: Layers, text: 'Minimum 2 mm elastomeric insulating compound' },
                  { icon: Eye, text: 'Moulded IEC marking with class, voltage, and manufacturer' },
                  { icon: Award, text: 'Type-tested at nationally accredited laboratories' },
                ]}
              />
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            SPECIFICATIONS SECTION
            ══════════════════════════════════════ */}
        <SectionShell variant="technical" bg="bg-be-cream" id="specifications" ariaLabel="IEC 61111 Specifications">
          <SectionHeader
            eyebrow="Technical Specifications"
            title="IEC 61111:2009 Classification Table"
            supportingText="Voltage class, maximum working voltage, and proof test voltage per IEC 61111:2009. All five classes share a minimum mat thickness of 2 mm."
          />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-body">
              <thead>
                <tr className="border-b-2 border-be-yellow-500">
                  <th className="text-left py-3 pr-4 font-semibold text-be-charcoal-950">Class</th>
                  <th className="text-left py-3 pr-4 font-semibold text-be-charcoal-950">Maximum Working Voltage</th>
                  <th className="text-left py-3 pr-4 font-semibold text-be-charcoal-950">Proof Test Voltage</th>
                  <th className="text-left py-3 font-semibold text-be-charcoal-950">Min. Thickness</th>
                </tr>
              </thead>
              <tbody>
                {iecClasses.map((row) => (
                  <tr key={row.class} className="border-b border-be-grey-250 hover:bg-be-yellow-50/50 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-be-charcoal-950">{row.class}</td>
                    <td className="py-3 pr-4 text-be-charcoal-800">{row.maxWorkingVoltage}</td>
                    <td className="py-3 pr-4 text-be-charcoal-800">{row.proofTestVoltage}</td>
                    <td className="py-3 text-be-charcoal-800">{row.thickness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 text-metadata text-be-grey-650">
            <Shield className="size-4 shrink-0 mt-0.5 text-be-yellow-text" aria-hidden="true" />
            <p>
              All values per IEC 61111:2009 Table 1. Proof test voltage is the
              withstand voltage applied during routine verification. These are
              IEC classifications — do not confuse with IS 15652:2006 Classes A–D.
            </p>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            SECTION: HV INSULATING MATS
            ══════════════════════════════════════ */}
        <SectionShell variant="standard" bg="bg-be-white" id="hv-insulating-mats" ariaLabel="HV Insulating Mats" topRule>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Text */}
            <div className="lg:w-[55%] flex flex-col gap-6">
              <SectionHeader
                eyebrow="IEC 61111:2009"
                title="HV Insulating Mats"
                supportingText="Standard high-voltage insulating mats manufactured and tested to IEC 61111:2009. Available in all five IEC classes (0–4), these mats provide reliable operator protection at installations up to 36 000 V. Each mat carries a moulded IEC marking showing class, maximum working voltage, and manufacturer identification."
              />
              <FeatureList
                items={[
                  { icon: Shield, text: 'IEC 61111:2009 compliant — Classes 0, 1, 2, 3 and 4' },
                  { icon: Zap, text: 'Proof test voltages from 5 kV to 40 kV' },
                  { icon: Layers, text: 'High-grade elastomeric insulating compound, min. 2 mm' },
                  { icon: Eye, text: 'Moulded IEC marking with class and voltage identification' },
                  { icon: Ruler, text: 'Standard and custom sizes available on request' },
                  { icon: Award, text: 'Type-tested at NABL-accredited laboratory' },
                ]}
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryButton href="/contact-us?type=quote&product=iec-hv-insulating-mats">
                  Request a Quote
                </PrimaryButton>
                <SecondaryButton href="#specifications">
                  View Class Table
                </SecondaryButton>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-[45%]">
              <ImageFrame
                src="/media/products/international-iec/iec-61111-class-0-2-2mm.webp"
                alt="IEC 61111 Class 0 and Class 2 insulating mats — 2 mm thickness with moulded marking"
                aspectRatio="landscape"
                fit="contain"
              />
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            SECTION: AUTO GLOW
            ══════════════════════════════════════ */}
        <SectionShell variant="standard" bg="bg-be-cream" id="auto-glow" ariaLabel="Auto Glow Insulating Mats" topRule>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Image */}
            <div className="lg:w-[45%] order-first lg:order-last">
              <ImageFrame
                src="/media/products/international-iec/iec-61111.webp"
                alt="IEC 61111 auto-glow insulating mat with photoluminescent strip for low-light visibility"
                aspectRatio="landscape"
                fit="contain"
              />
            </div>

            {/* Text */}
            <div className="lg:w-[55%] flex flex-col gap-6">
              <SectionHeader
                eyebrow="IEC 61111:2009 · Visibility Variant"
                title="Auto-Glow Insulating Mats"
                supportingText="IEC 61111:2009 insulating mats enhanced with a photoluminescent (auto-glow) strip that remains visible in darkness or low-light conditions. The glow strip charges under ambient or UV light and emits a visible afterglow, ensuring operators can locate mat boundaries during power outages or in dimly lit substations — without any external power source."
              />
              <FeatureList
                items={[
                  { icon: Sun, text: 'Photoluminescent strip — no power source required' },
                  { icon: Eye, text: 'Afterglow visibility in darkness for emergency orientation' },
                  { icon: Shield, text: 'Full IEC 61111:2009 electrical performance retained' },
                  { icon: Zap, text: 'Available in Classes 0, 1, 2, 3 and 4' },
                  { icon: Layers, text: 'Glow strip integrated into the mat surface during moulding' },
                  { icon: Award, text: 'Ideal for substations, switchgear rooms, and low-light areas' },
                ]}
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryButton href="/contact-us?type=quote&product=iec-auto-glow">
                  Request a Quote
                </PrimaryButton>
                <SecondaryButton href="#specifications">
                  View Class Table
                </SecondaryButton>
              </div>
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            SECTION: BI-COLOUR
            ══════════════════════════════════════ */}
        <SectionShell variant="standard" bg="bg-be-white" id="bi-colour" ariaLabel="Bi-Colour Insulating Mats" topRule>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Text */}
            <div className="lg:w-[55%] flex flex-col gap-6">
              <SectionHeader
                eyebrow="IEC 61111:2009 · Visibility Variant"
                title="Bi-Colour Insulating Mats"
                supportingText="IEC 61111:2009 insulating mats with two distinct colour layers — a dark working surface over a contrasting inner layer. When wear or damage exposes the inner colour, operators and maintenance teams receive an immediate visual signal that the mat's insulating integrity may be compromised and replacement is required. This dual-layer system adds a proactive safety dimension to the standard IEC voltage protection."
              />
              <FeatureList
                items={[
                  { icon: Eye, text: 'Dual-colour layers — inner colour shows through when worn' },
                  { icon: Shield, text: 'Full IEC 61111:2009 electrical performance retained' },
                  { icon: Zap, text: 'Available in Classes 0, 1, 2, 3 and 4' },
                  { icon: Layers, text: 'Dark working surface over contrasting indicator layer' },
                  { icon: Award, text: 'Visual wear indicator — no measuring instruments needed' },
                  { icon: Ruler, text: 'Standard and custom sizes available on request' },
                ]}
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryButton href="/contact-us?type=quote&product=iec-bi-colour">
                  Request a Quote
                </PrimaryButton>
                <SecondaryButton href="#specifications">
                  View Class Table
                </SecondaryButton>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-[45%]">
              <ImageFrame
                src="/media/products/international-iec/iec-61111.webp"
                alt="IEC 61111 bi-colour insulating mat showing two-tone layer construction for visual wear indication"
                aspectRatio="landscape"
                fit="contain"
              />
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            IEC MARKING SECTION
            ══════════════════════════════════════ */}
        <SectionShell variant="compact" bg="bg-be-cream" topRule>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Text */}
            <div className="lg:w-[55%] flex flex-col gap-6">
              <SectionHeader
                eyebrow="Identification & Traceability"
                title="IEC 61111 Moulded Marking"
                supportingText="Every IEC 61111:2009 insulating mat from Bharat Electrosafe carries a permanently moulded marking on the upper surface. This marking — which cannot rub off, fade, or peel — provides the information required by the standard for unambiguous identification, traceability, and safe use."
              />
              <div className="flex flex-col gap-3 text-body text-be-charcoal-800">
                <p>The moulded IEC marking includes:</p>
                <ul className="flex flex-col gap-2 ml-1">
                  {[
                    'Standard reference: IEC 61111:2009',
                    'Class designation (e.g. Class 2)',
                    'Maximum working voltage (e.g. 17 000 V)',
                    'Manufacturer name: Bharat Electrosafe',
                    'Month and year of manufacture',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ChevronRight className="size-4 shrink-0 mt-0.5 text-be-yellow-text" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-[45%]">
              <ImageFrame
                src="/media/products/international-iec/iec-61111-class-2.webp"
                alt="Close-up of moulded IEC 61111:2009 Class 2 marking on insulating mat surface"
                aspectRatio="landscape"
                fit="contain"
              />
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            CTA SECTION
            ══════════════════════════════════════ */}
        <SectionShell variant="conversion" bg="bg-be-yellow-50" yellowAccent>
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <h2 className="text-section-h2 text-be-charcoal-950">
              Request a quote for IEC 61111:2009 insulating mats
            </h2>
            <p className="text-body-large text-be-grey-650">
              Get pricing, custom dimensions, and delivery timelines for your project.
              Our sales team responds within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href="/contact-us?type=quote" size="lg">
                Request a Quote
              </PrimaryButton>
              <SecondaryButton href="/contact-us?type=technical-guidance&product=international-iec-61111">
                Technical Guidance
              </SecondaryButton>
              <SecondaryButton href={`tel:${company.phonePrimaryTel}`}>
                <Phone className="size-4 mr-1.5" />
                Call Sales
              </SecondaryButton>
            </div>
          </div>
        </SectionShell>

      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
    </div>
  );
}
