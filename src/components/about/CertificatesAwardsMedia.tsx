'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DocumentCard } from '@/components/ui/DocumentCard';
import { EmptyMediaFallback } from '@/components/ui/EmptyMediaFallback';
import { Play } from 'lucide-react';

/* ────────────────────────────────────────────
   Certificate data
   ──────────────────────────────────────────── */

const certificates = [
  {
    type: 'Standard',
    name: 'IS 15652:2006 Standard',
    issuer: 'Bureau of Indian Standards',
  },
  {
    type: 'Licence',
    name: 'BIS Certification Licence',
    issuer: 'BIS',
  },
  {
    type: 'Test Report',
    name: 'CPRI Type Test Report',
    issuer: 'CPRI',
  },
  {
    type: 'Test Report',
    name: 'ERDA Test Report',
    issuer: 'ERDA',
  },
  {
    type: 'Certification',
    name: 'ISO 9001:2015',
    issuer: 'ISO',
  },
];

/* ────────────────────────────────────────────
   Award data
   ──────────────────────────────────────────── */

const awards = [
  {
    title: 'Make in India Excellence Award',
    caption: 'Recognised for domestic manufacturing excellence in electrical safety products.',
    slotId: 'ABOUT-AWARD-01',
  },
  {
    title: 'Industry Innovation Award',
    caption: 'Awarded for advancement in insulating mat technology and application support.',
    slotId: 'ABOUT-AWARD-02',
  },
  {
    title: 'Safety Product Certification',
    caption: 'Certified for meeting national safety standards in electrical insulation.',
    slotId: 'ABOUT-AWARD-03',
  },
];

/* ────────────────────────────────────────────
   YouTube facade data
   ──────────────────────────────────────────── */

interface YouTubeVideo {
  title: string;
  videoId: string;
  slotId: string;
}

const youtubeVideos: YouTubeVideo[] = [
  {
    title: 'Plast India 2026 — Exhibition Preview',
    videoId: 'dQw4w9WgXcQ', // placeholder videoId
    slotId: 'ABOUT-YT-01',
  },
  {
    title: 'Make in India Conclave — Company Interview',
    videoId: 'dQw4w9WgXcQ', // placeholder videoId
    slotId: 'ABOUT-YT-02',
  },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function CertificatesAwardsMedia() {
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

  const handleVideoClick = (videoId: string) => {
    setLoadedVideos((prev) => {
      const next = new Set(prev);
      next.add(videoId);
      return next;
    });
  };

  return (
    <section className="bg-be-white section-padding-major page-horizontal-padding">
      <div className="container-site">
        {/* ── Certificates ── */}
        <div className="reveal-up mb-12">
          <SectionHeader
            eyebrow="Certificates & Standards"
            title="Certified Compliance"
            supportingText="Our products and processes are verified by national standards bodies and third-party testing authorities."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certificates.map((cert) => (
            <div key={cert.name} className="reveal-up">
              <DocumentCard
                type={cert.type}
                name={cert.name}
                issuer={cert.issuer}
              />
            </div>
          ))}
        </div>

        {/* ── Awards ── */}
        <div className="reveal-up mb-10">
          <SectionHeader
            eyebrow="Awards & Recognition"
            title="Industry Recognition"
            supportingText="Awards and certifications that validate our commitment to quality and innovation."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {awards.map((award, index) => (
            <div key={award.title} className="reveal-up hover-card-lift rounded-lg border border-be-grey-250 bg-be-warm-white overflow-hidden">
              {/* Image-led card */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <EmptyMediaFallback
                  label={award.title}
                  slotId={award.slotId}
                />
                {/* Award year or number overlay */}
                <div className="absolute top-3 right-3 bg-be-yellow-50 border border-be-yellow-400 rounded-md px-2 py-1">
                  <span className="text-metadata text-be-charcoal-950 font-semibold">
                    #{index + 1}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-card-title text-be-charcoal-950">{award.title}</h3>
                <p className="text-body text-be-grey-650">{award.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Industry Participation & Media ── */}
        <div className="reveal-up mb-10">
          <SectionHeader
            eyebrow="Industry Participation & Media"
            title="Exhibition & Media"
            supportingText="See us at industry events and exhibitions across India."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {youtubeVideos.map((video) => (
            <div key={video.slotId} className="reveal-up hover-card-lift rounded-lg border border-be-grey-250 bg-be-warm-white overflow-hidden">
              {/* YouTube facade — click to load */}
              <div className="relative aspect-video overflow-hidden">
                {loadedVideos.has(video.videoId) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleVideoClick(video.videoId)}
                    className="absolute inset-0 w-full h-full cursor-pointer group"
                    aria-label={`Play video: ${video.title}`}
                  >
                    <EmptyMediaFallback
                      label={video.title}
                      slotId={video.slotId}
                      className="!bg-be-cream"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-be-yellow-500 shadow-lg group-hover:bg-be-yellow-600 transition-colors">
                        <Play className="h-6 w-6 text-be-charcoal-950 fill-be-charcoal-950" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-card-title text-be-charcoal-950">{video.title}</h3>
                <p className="text-metadata text-be-grey-650">Click to play video</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
