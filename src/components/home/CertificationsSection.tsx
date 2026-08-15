'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { InfiniteLogoRail } from '@/components/ui/InfiniteLogoRail';
import { allTrustMarks } from '@/data/trust';

/**
 * CertificationsSection — homepage certifications, testing and
 * registrations rail.
 *
 * Interaction model: a seamless, continuously moving horizontal logo
 * rail (InfiniteLogoRail) that drifts right → left at a calm, linear
 * speed. The loop is mathematically seamless — no visible jump. The
 * rail pauses on hover and on keyboard focus, and falls back to a
 * static scrollable rail under `prefers-reduced-motion: reduce`.
 *
 * Visual model: a clean corporate certification strip where the LOGOS
 * are the focus — no boxed cards, no tinted backgrounds, no shadows.
 * Each mark sits on plain whitespace with its name. For marks with an
 * attached document, the item itself is an interactive link that opens
 * the PDF. A subtle "Download" pill appears on hover/focus. Items
 * without a document remain static (no pointer cursor, no hover effect).
 *
 * Logo heights (enlarged for prominence):
 *   - Desktop  : ~132px visual height
 *   - Tablet   : ~106-120px
 *   - Mobile   : ~88px
 *
 * Item cell widths are fixed responsively so the rail reserves its
 * layout before images load (no CLS). Inter-logo spacing is tight
 * and dense per the design direction — logos dominate, gaps recede.
 */
export default function CertificationsSection() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule className="reveal-up">
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="CERTIFICATIONS & MEMBERSHIPS"
          title="Industry Certifications, Testing & Registrations"
          supportingText="We are proudly affiliated with several esteemed organizations in the rubber industry. Our up-to-date certifications reflect our ongoing commitment to delivering value to our clients' businesses."
        />
      </div>

      <div className="reveal-up pb-2">
        <InfiniteLogoRail
          ariaLabel="Certifications, testing and registrations"
          duration={42}
          pauseOnHover
          pauseOnFocus
          itemSpacingClassName="pr-2 sm:pr-3 md:pr-4"
        >
          {allTrustMarks.map((mark) => {
            const isDownloadable = !!mark.document;

            const inner = (
              <>
                {/* Logo — large, clean, no box. object-contain never crops.
                    Eager + unoptimized: these are tiny local WebP identity
                    assets drifting through a continuously moving rail, so
                    they must be fetched/decoded immediately and served
                    directly (no Next image-optimization hop). No priority
                    is set so these never compete with hero/above-the-fold
                    resources. */}
                <span className="relative flex h-[88px] sm:h-[106px] md:h-[120px] lg:h-[132px] w-full items-center justify-center">
                  <Image
                    src={mark.logo}
                    alt={mark.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 639px) 105px, (max-width: 767px) 120px, (max-width: 1023px) 130px, 140px"
                    loading="eager"
                    unoptimized
                  />
                </span>
                <span className="text-metadata text-center font-semibold text-be-charcoal-950 leading-tight">
                  {mark.label}
                </span>
                {/* Download hover/focus affordance — only for items with a document.
                    On mobile (no hover), a small persistent download icon indicator
                    is shown instead so touch users can discover the interaction. */}
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
                {/* Mobile touch indicator — small persistent icon for downloadable items.
                    Hidden on sm+ where hover works reliably. */}
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
                  className="group/mark w-[105px] sm:w-[120px] md:w-[130px] lg:w-[135px] xl:w-[140px] flex flex-col items-center gap-2.5 py-1 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
                >
                  {inner}
                </a>
              );
            }

            return (
              <div
                key={mark.label}
                className="w-[105px] sm:w-[120px] md:w-[130px] lg:w-[135px] xl:w-[140px] flex flex-col items-center gap-2.5 py-1"
              >
                {inner}
              </div>
            );
          })}
        </InfiniteLogoRail>
      </div>
    </SectionShell>
  );
}
