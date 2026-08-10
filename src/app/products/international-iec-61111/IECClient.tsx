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
  Phone,
  Check,
  ArrowRight,
  Sparkles,
  Palette,
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
import { hvVisuals, autoGlowVisuals, biColourVisuals } from '@/data/product-visuals';

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
            1. HERO — Products first, not marking
            ══════════════════════════════════════ */}
        <SectionShell variant="productHero" bg="be-page-top-tint" className="product-hero-compact">
          <Breadcrumb items={breadcrumbItems} className="mb-3 lg:mb-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Text side */}
            <div className="min-w-0 lg:col-span-6 xl:col-span-5 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-2.5 lg:mb-3">
                <TechnicalBadge label="IEC 61111:2009" />
                <TechnicalBadge label="International Standard" />
              </div>

              <Eyebrow className="mb-3">International / Global</Eyebrow>

              <h1 className="product-hero-h1 text-product-h1 text-be-charcoal-950 mb-3 lg:mb-4">
                Insulating Mats to IEC 61111:2009
              </h1>

              <p className="product-hero-intro text-body-large text-be-grey-650 leading-relaxed mb-4 lg:mb-5">
                IEC 61111:2009 insulating mats for live working up to 36 000 V.
                Available in three variants — HV, Auto Glow, and Bi-Colour —
                across Classes 0 through 4 for IEC-member markets worldwide.
              </p>

              <div className="flex flex-wrap gap-3">
                <PrimaryButton href="/contact-us" size="lg">
                  Request a Quote
                </PrimaryButton>
                <SecondaryButton href="#specifications">
                  View Class Table
                </SecondaryButton>
              </div>
            </div>

            {/* Media side — 3-product visual with IEC reference chip */}
            <div className="min-w-0 lg:col-span-6 xl:col-span-7 flex flex-col gap-3">
              {/* Three product thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                <div className="relative">
                  <ImageFrame
                    src={hvVisuals.card.src}
                    alt={hvVisuals.card.alt}
                    aspectRatio="landscape"
                    fit="contain"
                    priority
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-be-charcoal-950/80 text-be-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    HV
                  </span>
                </div>
                <div className="relative">
                  <ImageFrame
                    src={autoGlowVisuals.card.src}
                    alt={autoGlowVisuals.card.alt}
                    aspectRatio="landscape"
                    fit="contain"
                    priority
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-be-charcoal-950/80 text-be-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    Auto Glow
                  </span>
                </div>
                <div className="relative">
                  <ImageFrame
                    src={biColourVisuals.card.src}
                    alt={biColourVisuals.card.alt}
                    aspectRatio="landscape"
                    fit="contain"
                    priority
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-be-charcoal-950/80 text-be-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    Bi-Colour
                  </span>
                </div>
              </div>
              {/* Small IEC reference chip */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-be-cream border border-be-grey-250">
                <div className="relative w-12 h-8 shrink-0 overflow-hidden rounded">
                  <Image
                    src="/media/products/international-iec/iec-61111.webp"
                    alt="IEC 61111 marking reference"
                    fill
                    className="object-contain p-0.5"
                    sizes="48px"
                  />
                </div>
                <span className="text-metadata text-be-grey-650">
                  IEC 61111:2009 moulded marking — Class&nbsp;0 through Class&nbsp;4
                </span>
              </div>
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            2. QUICK FACTS — concise strip
            ══════════════════════════════════════ */}
        <section aria-label="Product assurance" className="border-y border-be-yellow-100 bg-be-yellow-50">
          <div className="container-site page-horizontal-padding py-6 md:py-7">
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4">
              {[
                { icon: Award, label: 'Standard', value: 'IEC 61111:2009' },
                { icon: Zap, label: 'Classes', value: '0, 1, 2, 3, 4' },
                { icon: Ruler, label: 'Max Voltage', value: '36 000 V' },
                { icon: Layers, label: 'Min. Thickness', value: '2 mm' },
                { icon: Shield, label: 'Testing', value: 'CPRI / NABL' },
                { icon: Globe, label: 'Markets', value: 'IEC-member' },
              ].map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex flex-col items-center sm:items-start gap-1">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-be-white border border-be-yellow-100" aria-hidden="true">
                    <Icon className="h-3.5 w-3.5 text-be-yellow-text" />
                  </span>
                  <div className="text-metadata text-be-grey-650">{label}</div>
                  <div className="text-[14px] leading-snug font-semibold text-be-charcoal-950">{value}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. AVAILABLE PRODUCT VARIANTS
            ══════════════════════════════════════ */}
        <SectionShell variant="standard" bg="bg-be-white" topRule>
          <SectionHeader
            eyebrow="Product Variants"
            title="Available IEC 61111:2009 Variants"
            supportingText="Three insulating mat variants — each fully compliant with IEC 61111:2009 across all five voltage classes, with distinct safety enhancements."
            align="center"
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* HV Card */}
            <div className="group flex flex-col rounded-xl border border-be-grey-250 bg-be-white overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden bg-be-cream">
                <Image
                  src={hvVisuals.card.src}
                  alt={hvVisuals.card.alt}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center gap-2">
                  <Zap className="size-5 text-be-yellow-text" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-be-charcoal-950">HV Insulating Mats</h3>
                </div>
                <p className="text-body text-be-grey-650 flex-1">
                  Standard high-voltage insulating mats. All five IEC classes with moulded
                  voltage identification marking. Reliable operator protection at installations
                  up to 36 000 V.
                </p>
                <PrimaryButton href="/contact-us?type=quote&product=iec-hv-insulating-mats" className="mt-1 self-start">
                  Get Quote
                  <ArrowRight className="size-4 ml-1.5" />
                </PrimaryButton>
              </div>
            </div>

            {/* Auto Glow Card */}
            <div className="group flex flex-col rounded-xl border border-be-grey-250 bg-be-white overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden bg-be-cream">
                <Image
                  src={autoGlowVisuals.card.src}
                  alt={autoGlowVisuals.card.alt}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-be-yellow-text" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-be-charcoal-950">Auto-Glow Mats</h3>
                </div>
                <p className="text-body text-be-grey-650 flex-1">
                  Enhanced with a photoluminescent strip that remains visible in darkness.
                  Operators can locate mat boundaries during power outages — no external
                  power source needed.
                </p>
                <PrimaryButton href="/contact-us?type=quote&product=iec-auto-glow" className="mt-1 self-start">
                  Get Quote
                  <ArrowRight className="size-4 ml-1.5" />
                </PrimaryButton>
              </div>
            </div>

            {/* Bi-Colour Card */}
            <div className="group flex flex-col rounded-xl border border-be-grey-250 bg-be-white overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden bg-be-cream">
                <Image
                  src={biColourVisuals.card.src}
                  alt={biColourVisuals.card.alt}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center gap-2">
                  <Palette className="size-5 text-be-yellow-text" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-be-charcoal-950">Bi-Colour Mats</h3>
                </div>
                <p className="text-body text-be-grey-650 flex-1">
                  Dual-colour layers — dark working surface over a contrasting inner layer.
                  When wear exposes the inner colour, it signals the mat needs replacement.
                  No measuring instruments needed.
                </p>
                <PrimaryButton href="/contact-us?type=quote&product=iec-bi-colour" className="mt-1 self-start">
                  Get Quote
                  <ArrowRight className="size-4 ml-1.5" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            4. IEC CLASS / VOLTAGE TABLE
            ══════════════════════════════════════ */}
        <SectionShell variant="technical" bg="bg-be-cream" id="specifications" ariaLabel="IEC 61111 Classifications">
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
            5. PRODUCT CONSTRUCTION & REQUIREMENTS
            ══════════════════════════════════════ */}
        <SectionShell variant="standard" bg="bg-be-white" topRule>
          <SectionHeader
            eyebrow="Construction & Requirements"
            title="Product Construction & Requirements"
            supportingText="Shared requirements for all IEC 61111:2009 insulating mats, plus variant-specific enhancements."
          />

          <div className="mt-6 flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Shared requirements */}
            <div className="lg:w-[55%] flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-be-charcoal-950 border-b border-be-grey-250 pb-2">
                All IEC 61111:2009 Variants
              </h3>
              <FeatureList
                items={[
                  { icon: Shield, text: 'Elastomeric insulating compound, minimum 2 mm thickness' },
                  { icon: Zap, text: 'Type-tested at NABL-accredited laboratory (CPRI)' },
                  { icon: Eye, text: 'Permanently moulded IEC marking: standard, class, voltage, manufacturer, date' },
                  { icon: Globe, text: 'Recognised in all IEC-member country markets' },
                  { icon: Ruler, text: 'Available in Classes 0, 1, 2, 3 and 4 (500 V to 36 000 V)' },
                  { icon: Award, text: 'Custom sizes available on request' },
                ]}
              />
            </div>

            {/* Variant-specific differences */}
            <div className="lg:w-[45%] flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="size-4 text-be-yellow-text" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-be-charcoal-950">HV — Standard</h3>
                </div>
                <p className="text-body text-be-grey-650">
                  Standard elastomeric compound with moulded IEC marking. Suitable for
                  all indoor and covered switchgear installations.
                </p>
              </div>

              <div className="border-t border-be-grey-250 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="size-4 text-be-yellow-text" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-be-charcoal-950">Auto Glow — Photoluminescent</h3>
                </div>
                <p className="text-body text-be-grey-650">
                  Adds a photoluminescent strip integrated during moulding. Charges under
                  ambient/UV light; emits afterglow in darkness. Ideal for substations,
                  low-light switchgear rooms, and emergency egress routes.
                </p>
              </div>

              <div className="border-t border-be-grey-250 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="size-4 text-be-yellow-text" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-be-charcoal-950">Bi-Colour — Visual Wear Indicator</h3>
                </div>
                <p className="text-body text-be-grey-650">
                  Dark working surface over a contrasting inner layer. When abrasion or
                  damage exposes the inner colour, operators receive an immediate visual
                  signal that replacement is required — no instruments needed.
                </p>
              </div>
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            6. MARKING / TRACEABILITY
            ══════════════════════════════════════ */}
        <SectionShell variant="compact" bg="bg-be-cream" topRule ariaLabel="IEC Marking and Traceability">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Text */}
            <div className="lg:w-[55%] flex flex-col gap-5">
              <SectionHeader
                eyebrow="Identification & Traceability"
                title="IEC 61111 Moulded Marking"
                supportingText="Every mat carries a permanently moulded marking on the upper surface — it cannot rub off, fade, or peel — providing the information required by the standard for unambiguous identification and safe use."
              />
              <div className="flex flex-col gap-2 text-body text-be-charcoal-800">
                <p className="font-medium">The moulded IEC marking includes:</p>
                <ul className="flex flex-col gap-1.5 ml-1">
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

            {/* Marking image gallery — small, contained */}
            <div className="lg:w-[45%] grid grid-cols-2 gap-3">
              <ImageFrame
                src="/media/products/international-iec/iec-61111.webp"
                alt="IEC 61111:2009 insulating mat marking — Class designation and voltage"
                aspectRatio="landscape"
                fit="contain"
              />
              <ImageFrame
                src="/media/products/international-iec/iec-61111-class-0-2-2mm.webp"
                alt="IEC 61111 Class 0 and Class 2 insulating mats — 2 mm with moulded marking"
                aspectRatio="landscape"
                fit="contain"
              />
              <ImageFrame
                src="/media/products/international-iec/iec-61111-class-2.webp"
                alt="Close-up of IEC 61111:2009 Class 2 moulded marking detail"
                aspectRatio="landscape"
                fit="contain"
                className="col-span-2"
              />
            </div>
          </div>
        </SectionShell>

        {/* ══════════════════════════════════════
            7. QUOTE CTA
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
