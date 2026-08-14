'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import {
  ShieldCheck,
  BadgeCheck,
  FlaskConical,
  Globe2,
  Droplets,
  Shield,
  Layers,
  Pipette,
  LayoutGrid,
  Zap,
  CircleDot,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

/* ────────────────────────────────────────────
   Proof badge type
   ──────────────────────────────────────────── */
interface ProofItem {
  label: string;
  icon: LucideIcon;
}

/* ────────────────────────────────────────────
   Slide data type
   ──────────────────────────────────────────── */
interface HeroSlide {
  eyebrow: string;
  /** Heading level: 'h1' for slide 1, 'h2' for slides 2-4 */
  headingTag: 'h1' | 'h2';
  heading: string;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  proofItems: ProofItem[];
  /** Desktop hero image */
  imageSrc: string;
  imageAlt: string;
  /** Mobile hero image — same as desktop if no separate mobile crop */
  imageSrcMobile?: string;
}

/* ────────────────────────────────────────────
   Slide definitions
   ──────────────────────────────────────────── */
const HERO_SLIDES: HeroSlide[] = [
  /* ── Slide 1: Electrical Insulating Mats (PRESERVED exactly) ── */
  {
    eyebrow: 'ELECTRICAL INSULATING MATS · IS 15652:2006',
    headingTag: 'h1',
    heading:
      'Electrical Insulating Mats for Safer Work Around Switchgear and Electrical Installations',
    lede: 'Bharat Electrosafe manufactures insulating mats for electrical work areas, with IS 15652:2006 domestic configurations and a separate IEC 61111:2009 range for international requirements.',
    primaryCta: { label: 'Explore Products', href: '/products' },
    secondaryCta: { label: 'Request a Quote', href: '/contact-us' },
    proofItems: [
      { label: 'IS 15652:2006 domestic range', icon: ShieldCheck },
      { label: 'BIS Licence CM/L:8800129617', icon: BadgeCheck },
      { label: 'ERDA tested', icon: FlaskConical },
      { label: 'IEC 61111:2009 international range', icon: Globe2 },
    ],
    imageSrc:
      '/media/home/hero/electrical-insulating-mat-switchgear-hero.webp',
    imageSrcMobile:
      '/media/home/hero/electrical-insulating-mat-switchgear-hero-mobile.webp',
    imageAlt:
      'Electrical technician standing on a blue insulating mat while operating switchgear',
  },
  /* ── Slide 2: Waterproofing Solutions ── */
  {
    eyebrow: 'WATERPROOFING SOLUTIONS · IS 15909:2020 / IS 15058:2002',
    headingTag: 'h2',
    heading:
      'Waterproofing Solutions for Tunnels, Containment and Concrete Joints',
    lede: 'Geo Membrane Lining supports tunnel, containment and lining applications, while Water Stop Seal is designed for concrete construction and expansion joints.',
    primaryCta: { label: 'Explore Waterproofing', href: '/products/waterproofing-solutions' },
    secondaryCta: { label: 'Request a Quote', href: '/contact-us?type=quote' },
    proofItems: [
      { label: 'Geo Membrane Lining · IS 15909:2020', icon: Droplets },
      { label: 'Water Stop Seal · IS 15058:2002', icon: Shield },
      { label: 'Tunnel & containment applications', icon: Layers },
      { label: 'Concrete joint sealing', icon: Pipette },
    ],
    imageSrc:
      '/media/products/bharat-membrane/bharatmembrane-tunnel-lining-clean.webp',
    imageAlt:
      'Waterproof membrane lining installed inside an underground tunnel for infrastructure protection',
  },
  /* ── Slide 3: PVC Flooring ── */
  {
    eyebrow: 'PVC FLOORING · IS 3462:1986',
    headingTag: 'h2',
    heading:
      'PVC Flooring for Industrial, Electrical and Commercial Applications',
    lede: 'BharatSmart Floor™ is Bharat Electrosafe\'s PVC flooring range for industrial, electrical and commercial environments, manufactured as per IS 3462:1986.',
    primaryCta: { label: 'Explore PVC Flooring', href: '/products/pvc-flooring-solutions' },
    secondaryCta: { label: 'Request a Quote', href: '/contact-us?type=quote' },
    proofItems: [
      { label: 'IS 3462:1986', icon: ShieldCheck },
      { label: 'BharatSmart Floor™', icon: LayoutGrid },
      { label: 'Industrial flooring', icon: Layers },
      { label: 'Electrical & commercial applications', icon: Zap },
    ],
    imageSrc:
      '/media/products/pvc-flooring-solutions/pvc-flooring-overview-surface-detail.webp',
    imageAlt:
      'PVC flooring material surface detail and flexible edge for industrial and electrical environments',
  },
  /* ── Slide 4: Other Products ── */
  {
    eyebrow: 'OTHER INDUSTRIAL PRODUCTS',
    headingTag: 'h2',
    heading:
      'Industrial Rubber and Safety Products for Project Requirements',
    lede: 'Rubber sheets, rubber hose pipes, ESD mats and conveyor belts for industrial rubber and safety applications.',
    primaryCta: { label: 'Explore Other Products', href: '/products/other-products' },
    secondaryCta: { label: 'Request a Quote', href: '/contact-us?type=quote' },
    proofItems: [
      { label: 'Rubber Sheets', icon: Layers },
      { label: 'Rubber Hose Pipes', icon: Pipette },
      { label: 'ESD Mats', icon: CircleDot },
      { label: 'Conveyor Belts', icon: LayoutGrid },
    ],
    imageSrc: '/media/categories/other-products-category.png',
    imageAlt:
      'Industrial rubber sheet, hose, ESD mat and conveyor belt products',
  },
];

/* ────────────────────────────────────────────
   Single slide renderer
   ──────────────────────────────────────────── */
function HeroSlideContent({ slide }: { slide: HeroSlide }) {
  const HeadingTag = slide.headingTag;

  return (
    <div className="container-site page-horizontal-padding be-split-hero__inner">
      {/* ── Copy block (pre-image): eyebrow + headline ───────── */}
      <div className="be-split-hero__copy-pre">
        <div className="be-split-hero__eyebrow">
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <div
            className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in"
            style={{ width: '80px' }}
          />
        </div>

        <HeadingTag className="be-split-hero__headline text-be-charcoal-950">
          {slide.heading}
        </HeadingTag>
      </div>

      {/* ── Visual column ───────────────────────────────────── */}
      <div className="be-split-hero__visual">
        {/* Desktop visual */}
        <div className="be-split-hero__visual-desktop">
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="be-split-hero__image object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
        {/* Mobile visual — use dedicated mobile crop if provided, else desktop image */}
        <div className="be-split-hero__visual-mobile">
          <Image
            src={slide.imageSrcMobile ?? slide.imageSrc}
            alt={slide.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 25%' }}
          />
        </div>
      </div>

      {/* ── Copy block (post-image): paragraph + CTAs + badges ── */}
      <div className="be-split-hero__copy-post">
        <p className="be-split-hero__lede text-be-grey-650">
          {slide.lede}
        </p>

        <div className="be-split-hero__ctas">
          <PrimaryButton href={slide.primaryCta.href} size="lg" className="be-hero-cta">
            {slide.primaryCta.label}
          </PrimaryButton>
          <SecondaryButton href={slide.secondaryCta.href} className="be-hero-cta">
            {slide.secondaryCta.label}
          </SecondaryButton>
        </div>

        <div className="be-split-hero__proof">
          {slide.proofItems.map((item) => {
            const Icon = item.icon;
            return (
              <span key={item.label} className="be-proof-badge">
                <Icon
                  className="be-proof-badge__icon size-3.5"
                  aria-hidden="true"
                />
                <span className="be-proof-badge__label">{item.label}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   HomeHero — Client Component (Embla Carousel)
   ────────────────────────────────────────────
   4-slide looping carousel with auto-advance,
   pause on hover/focus, manual prev/next arrows,
   swipe/drag, keyboard navigation, and
   prefers-reduced-motion respect. */
export default function HomeHero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef(
    Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayRef.current,
  ]);

  /* ── Reduced-motion detection ── */
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion.current && emblaApi) {
      autoplayRef.current.stop();
    }
  }, [emblaApi]);

  /* ── Slide selection tracking ── */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  /* ── Scroll helpers ── */
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  /* ── Pause on focus-in, resume on focus-out ── */
  const handleFocusIn = useCallback(() => {
    if (!prefersReducedMotion.current) {
      autoplayRef.current.stop();
    }
  }, []);

  const handleFocusOut = useCallback(() => {
    if (!prefersReducedMotion.current) {
      autoplayRef.current.play();
    }
  }, []);

  return (
    <section
      aria-label="Bharat Electrosafe product solutions — homepage introduction"
      className="be-split-hero"
    >
      <div
        ref={rootRef}
        onFocusCapture={handleFocusIn}
        onBlurCapture={handleFocusOut}
      >
        {/* Embla viewport */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className="min-w-0 shrink-0 grow-0 basis-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${HERO_SLIDES.length}`}
              >
                <HeroSlideContent slide={slide} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Carousel controls: prev/next arrows + dot indicators ── */}
        <div className="container-site page-horizontal-padding">
          <div className="flex items-center justify-center gap-3 -mt-2 pb-2 pt-3 sm:pt-4">
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 mr-3" role="tablist">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === selectedIndex}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`size-2.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex
                      ? 'bg-be-yellow-500 scale-125'
                      : 'bg-be-grey-300 hover:bg-be-grey-400'
                  }`}
                  onClick={() => emblaApi?.scrollTo(idx)}
                />
              ))}
            </div>

            {/* Prev arrow */}
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="flex items-center justify-center size-11 rounded-lg border border-be-grey-250 bg-be-white/80 text-be-charcoal-800 shadow-sm hover:bg-be-white hover:border-be-yellow-400 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="flex items-center justify-center size-11 rounded-lg border border-be-grey-250 bg-be-white/80 text-be-charcoal-800 shadow-sm hover:bg-be-white hover:border-be-yellow-400 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
