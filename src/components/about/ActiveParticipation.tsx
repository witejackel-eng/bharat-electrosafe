'use client';

import Image from 'next/image';
import { Play, ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { HorizontalCarousel } from '@/components/ui/HorizontalCarousel';

/**
 * ActiveParticipation — Active Participation section.
 *
 * Concise section showing industry event participation and
 * company media. Uses YouTube thumbnails (loaded from YouTube's
 * CDN) — no iframe is embedded on page load. Clicking a card
 * opens the video on YouTube in a new tab.
 *
 * Content source: company's own YouTube uploads.
 */

const videos = [
  {
    videoId: 'e9jF3JYMLco',
    title: 'Plast India 2026 @ Bharat Mandapam - Delhi',
    alt: 'Insulating mat samples in several colours laid out on an exhibition stand table',
  },
  {
    videoId: 's6PHbPrf-lQ',
    title: 'Interview with Make In India Conclave @ ABP News',
    alt: 'Vishnu Gupta being interviewed on stage at the Make in India Conclave',
  },
];

/**
 * Build a YouTube thumbnail URL. Prefers maxresdefault (720p);
 * falls back to mqdefault (320p) via next/image unoptimized
 * handling if the high-res version isn't available.
 */
function youTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export default function ActiveParticipation() {
  return (
    <SectionShell variant="compact" bg="bg-be-cream" topRule>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="Active Participation"
          title="Engaged with the industry"
          supportingText="Bharat Electrosafe actively participates in industry exhibitions, conferences and national initiatives."
        />
      </div>

      <div className="reveal-up">
        <HorizontalCarousel label="Active participation videos" autoAdvanceMs={5000}>
          {videos.map((video) => (
            <div
              key={video.videoId}
              className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] flex flex-col gap-3"
            >
              {/* Thumbnail with play overlay — opens YouTube in new tab */}
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch on YouTube: ${video.title}`}
                className="group relative aspect-video w-full overflow-hidden rounded-lg border border-be-grey-250 bg-be-charcoal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
              >
                <Image
                  src={youTubeThumbnail(video.videoId)}
                  alt={video.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                  unoptimized
                />
                {/* Scrim overlay */}
                <span
                  className="absolute inset-0 bg-be-charcoal-950/25 transition-colors duration-200 group-hover:bg-be-charcoal-950/40"
                  aria-hidden="true"
                />
                {/* Play icon */}
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-be-yellow-500 shadow-lg transition-transform duration-200 group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7 fill-be-charcoal-950 text-be-charcoal-950" />
                  </span>
                </span>
              </a>

              {/* Title and link */}
              <div className="flex flex-col gap-1">
                <span className="text-body font-semibold text-be-charcoal-950">
                  {video.title}
                </span>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${video.title} on YouTube`}
                  className="inline-flex items-center gap-1 text-metadata text-be-grey-650 underline underline-offset-2 hover:text-be-yellow-text-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 rounded-sm w-fit"
                >
                  Watch on YouTube
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </HorizontalCarousel>
      </div>
    </SectionShell>
  );
}
