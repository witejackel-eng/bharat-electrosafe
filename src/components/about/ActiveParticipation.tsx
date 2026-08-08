'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { YouTubeFacade } from '@/components/media/YouTubeFacade';

/**
 * ActiveParticipation — Active Participation section.
 *
 * Concise section showing industry event participation and
 * company media. Uses existing YouTube videos (via YouTubeFacade)
 * from the original site — no third-party request on page load.
 *
 * Content source: company's own YouTube uploads.
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 reveal-up">
        {videos.map((video) => (
          <YouTubeFacade key={video.videoId} {...video} />
        ))}
      </div>
    </SectionShell>
  );
}
