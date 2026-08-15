'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { InfiniteLogoRail } from '@/components/ui/InfiniteLogoRail';
import { awards, allTrustMarks } from '@/data/trust';

/**
 * About-page recognition section.
 *
 * Awards are presented in a responsive looping carousel using
 * embla-carousel-react with auto-advance.
 *
 * Certifications, testing and memberships use the same InfiniteLogoRail
 * component as the homepage — a seamless, continuously moving horizontal
 * rail that drifts right → left. The loop is mathematically seamless
 * (no visible jump), pauses on hover/focus, and falls back to a static
 * scrollable rail under prefers-reduced-motion.
 *
 * Certification card spacing is tight: logo → title → description
 * with minimal gaps, matching the editorial density of the homepage rail.
 *
 * Reliance is included as a client reference (not a certification) —
 * it appears in the rail with appropriate labelling so the UI never
 * implies an accreditation that does not exist.
 */

const AUTOPLAY_DELAY = 5000;

export default function AwardsCertifications() {
  /* ── reduced motion ── */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPrefersReducedMotion(mq.matches);
    queueMicrotask(sync);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /* ── Embla carousel with Autoplay ── */
  const autoplayRootRef = useRef<ReturnType<typeof Autoplay> | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    prefersReducedMotion
      ? []
      : [Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false })],
  );

  /* Store autoplay plugin ref once emblaApi is available */
  useEffect(() => {
    if (!emblaApi) return;
    const ap = (emblaApi as unknown as Record<string, Record<string, unknown>>).plugin?.autoplay;
    if (ap) autoplayRootRef.current = ap as ReturnType<typeof Autoplay>;
  }, [emblaApi]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const handler = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    handler();
    emblaApi.on('select', handler);
    emblaApi.on('reInit', handler);
    return () => {
      emblaApi.off('select', handler);
      emblaApi.off('reInit', handler);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /* ── Pause on hover/focus ── */
  const handlePointerEnter = useCallback(() => {
    if (autoplayRootRef.current?.stop) autoplayRootRef.current.stop();
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (autoplayRootRef.current?.play) autoplayRootRef.current.play();
  }, []);

  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule id="recognition">
      <div className="flex flex-col gap-12">
        {/* ── Awards ── */}
        <div className="reveal-up">
          <SectionHeader
            eyebrow="Awards and recognition"
            title="Recognition received"
            supportingText="Awards and recognition presented to Bharat Electrosafe and its founders."
          />
        </div>

        {/* ── Awards carousel ── */}
        <div
          className="reveal-up relative"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <div ref={emblaRef} className="overflow-hidden" role="region" aria-label="Awards carousel" aria-roledescription="carousel">
            <div className="flex gap-5">
              {awards.map((award, idx) => (
                <div
                  key={award.title}
                  className="flex-none w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${awards.length}`}
                >
                  <article className="flex flex-col h-full overflow-hidden rounded-lg border border-be-grey-250 bg-be-warm-white hover-card-lift">
                    <div className="relative aspect-[4/3] w-full bg-be-cream">
                      <Image
                        src={award.image}
                        alt={award.alt}
                        fill
                        className={
                          award.fit === 'contain' ? 'object-contain p-3' : 'object-cover'
                        }
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                      <h3 className="text-card-title text-be-charcoal-950">{award.title}</h3>
                      <p className="text-metadata font-semibold uppercase tracking-wide text-be-yellow-text">
                        {award.presenter}
                      </p>
                      <p className="text-body text-be-grey-650">{award.detail}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous award"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-be-grey-250 bg-be-white text-be-charcoal-950 hover:bg-be-cream hover:border-be-yellow-400 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next award"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-be-grey-250 bg-be-white text-be-charcoal-950 hover:bg-be-cream hover:border-be-yellow-400 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Certifications and memberships — infinite logo rail ── */}
        <div className="reveal-up">
          <SectionHeader
            eyebrow="Certifications and memberships"
            title="Standards, testing and registrations"
            supportingText="Marks the company holds, each labelled for what it actually is."
          />
        </div>

        <div className="reveal-up">
          <InfiniteLogoRail
            ariaLabel="Certifications and memberships"
            duration={42}
            pauseOnHover
            pauseOnFocus
            itemSpacingClassName="pr-2 sm:pr-3 md:pr-4"
          >
            {allTrustMarks.map((mark) => {
              const isDownloadable = !!mark.document;

              const inner = (
                <>
                  {/* Logo — object-contain never crops.
                      Eager + unoptimized: these are tiny local WebP identity
                      assets drifting through a continuously moving rail. */}
                  <span className="relative flex h-14 sm:h-16 md:h-[72px] lg:h-[80px] w-full items-center justify-center">
                    <Image
                      src={mark.logo}
                      alt={mark.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 639px) 140px, (max-width: 767px) 160px, (max-width: 1023px) 180px, 200px"
                      loading="eager"
                      unoptimized
                    />
                  </span>
                  {/* Certification name — logo + name only, no description */}
                  <span className="text-sm font-semibold text-be-charcoal-950 text-center leading-tight">
                    {mark.label}
                  </span>
                  {/* Download hover/focus affordance */}
                  {isDownloadable && (
                    <span
                      className="flex items-center gap-1 text-[0.65rem] font-semibold text-be-yellow-text
                                 opacity-0 translate-y-1
                                 group-hover/mark:opacity-100 group-hover/mark:translate-y-0
                                 group-focus-visible/mark:opacity-100 group-focus-visible/mark:translate-y-0
                                 transition-all duration-200 ease-out
                                 sm:opacity-0 sm:translate-y-1"
                      aria-hidden="true"
                    >
                      <Download className="size-3" />
                      Download
                    </span>
                  )}
                  {/* Mobile touch indicator */}
                  {isDownloadable && (
                    <span
                      className="flex items-center justify-center sm:hidden"
                      aria-hidden="true"
                    >
                      <Download className="size-3 text-be-yellow-text/70" />
                    </span>
                  )}
                </>
              );

              if (isDownloadable) {
                return (
                  <a
                    key={mark.label}
                    href={mark.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${mark.label} document`}
                    className="group/mark w-[140px] sm:w-[160px] md:w-[180px] lg:w-[195px] xl:w-[200px] flex flex-col items-center gap-1.5 py-1 text-center cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <div
                  key={mark.label}
                  className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[195px] xl:w-[200px] flex flex-col items-center gap-1.5 py-1 text-center"
                >
                  {inner}
                </div>
              );
            })}

            {/* ── Reliance — client reference (NOT a certification) ──
                No logo asset exists in the project. Rendered as a text-based
                card in the same logo+name format as certification items,
                but using the organisation name as the visual "logo". The
                label clearly identifies it so the UI never implies an
                accreditation that does not exist. */}
            <div
              className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[195px] xl:w-[200px] flex flex-col items-center gap-1.5 py-1 text-center"
            >
              {/* Text-based logo area — same height as certification logos */}
              <span className="relative flex h-14 sm:h-16 md:h-[72px] lg:h-[80px] w-full items-center justify-center">
                <span className="text-base sm:text-lg md:text-xl font-bold text-be-charcoal-950 leading-tight">
                  Reliance
                </span>
              </span>
              {/* Name only — same treatment as certification labels */}
              <span className="text-sm font-semibold text-be-charcoal-950 text-center leading-tight">
                Reliance Industries Limited
              </span>
            </div>
          </InfiniteLogoRail>
        </div>
      </div>
    </SectionShell>
  );
}
