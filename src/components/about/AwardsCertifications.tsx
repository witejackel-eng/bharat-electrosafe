'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { YouTubeFacade } from '@/components/media/YouTubeFacade';
import { SectionShell } from '@/components/ui/SectionShell';
import { awards, allTrustMarks } from '@/data/trust';

/**
 * About-page recognition section.
 *
 * Every award and every mark below comes from `src/data/trust.ts`, which only
 * carries content the source site actually publishes. Nothing is added here to
 * balance a grid — the layout adapts to however many verified items exist.
 *
 * The two videos are the company's own YouTube uploads, embedded through a
 * click-to-load facade so no third-party request is made on page load.
 */

const videos = [
  {
    videoId: 'e9jF3JYMLco',
    title: 'Plast India 2026 @ Bharat Mandpam - Delhi',
    poster: '/media/videos/e9jF3JYMLco.jpg',
    posterAlt:
      'Insulating mat samples in several colours laid out on an exhibition stand table',
  },
  {
    videoId: 's6PHbPrf-lQ',
    title: 'Interview with Make In India Conclave @ ABP News',
    poster: '/media/videos/s6PHbPrf-lQ.jpg',
    posterAlt:
      'Vishnu Gupta being interviewed on stage at the Make in India Conclave',
  },
];

export default function AwardsCertifications() {
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal-up">
          {awards.map((award) => (
            <article
              key={award.title}
              className="flex flex-col overflow-hidden rounded-lg border border-be-grey-250 bg-be-warm-white hover-card-lift"
            >
              <div className="relative aspect-[4/3] w-full bg-be-cream">
                <Image
                  src={award.image}
                  alt={award.alt}
                  fill
                  className={
                    award.fit === 'contain' ? 'object-contain p-3' : 'object-cover'
                  }
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
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
          ))}
        </div>

        {/* ── Certifications, testing and memberships ── */}
        <div className="reveal-up">
          <SectionHeader
            eyebrow="Certifications and memberships"
            title="Standards, testing and registrations"
            supportingText="Marks the company holds, each labelled for what it actually is."
          />
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 reveal-up">
          {allTrustMarks.map((mark) => (
            <li
              key={mark.label}
              className="flex flex-col items-center gap-3 rounded-lg border border-be-grey-250 bg-be-warm-white p-4 text-center"
            >
              {/* Fixed box so marks of different intrinsic sizes read as one row. */}
              <span className="relative flex h-14 w-full items-center justify-center">
                <Image
                  src={mark.logo}
                  alt={mark.alt}
                  fill
                  className="object-contain"
                  sizes="120px"
                />
              </span>
              <span className="text-body font-semibold text-be-charcoal-950">
                {mark.label}
              </span>
              <span className="text-metadata text-be-grey-650">{mark.note}</span>
              {mark.document && (
                <a
                  href={mark.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-metadata font-semibold text-be-yellow-text underline underline-offset-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
                >
                  View certificate
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* ── Industry participation (compact sub-section, not a new page section) ── */}
        <div className="reveal-up flex flex-col gap-6 rounded-lg border border-be-grey-250 bg-be-warm-white p-6 lg:p-8">
          <div className="flex flex-col gap-2">
            <Eyebrow>Industry Participation</Eyebrow>
            <h3 className="text-card-title text-be-charcoal-950">
              Events and company media
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <YouTubeFacade key={video.videoId} {...video} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
