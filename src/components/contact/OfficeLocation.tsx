'use client';

import { company } from '@/data/company';
import { useState } from 'react';
import { MapPin, Mail, Phone, Navigation } from 'lucide-react';
import Image from 'next/image';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import OfficeHours from '@/components/contact/OfficeHours';
import {
  officeMapsDirectionsUrl,
  officeMapsEmbedUrl,
  officeMapPreviewSrc,
} from '@/components/contact/ContactIntro';

/**
 * Chapter 2 — Office and Location.
 *
 * Combines office address, contact links, office hours and the map into one
 * section. Office hours are rendered inline inside the left column.
 *
 * Map initial state: a locally-stored static SVG preview that shows real
 * road geometry, a marker and the address text — no third-party requests
 * before user interaction. Clicking loads the interactive Google Maps
 * embed with the exact encoded destination.
 *
 * Map height is capped at ~440px on desktop (per spec: 420-460px range)
 * to avoid a near-square aspect ratio that unnecessarily lengthens the
 * section. The office column is top-aligned.
 */
export default function OfficeLocation() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[0.4fr_0.6fr] gap-7 lg:gap-12 lg:items-start">
      {/* ───────────── Left column — office info + hours (compact) ───────────── */}
      <div className="reveal-up flex flex-col gap-4 lg:gap-5">
        <h2 className="text-section-h2 text-be-charcoal-950">
          Our Office
        </h2>

        {/* Full address (linked to exact Maps destination) */}
        <a
          href={officeMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-body text-be-charcoal-800 leading-relaxed hover:text-be-yellow-600 transition-colors min-h-[44px] py-1"
        >
          <MapPin className="size-5 text-be-yellow-500 shrink-0 mt-1" aria-hidden />
          <div>
            <p className="font-semibold text-be-charcoal-950">{company.name}</p>
            <p>{company.address.line1}</p>
            <p>{company.address.line2}</p>
            <p>{company.address.city}, {company.address.state} — {company.address.pincode}</p>
            <p>{company.address.country}</p>
          </div>
        </a>

        {/* Quick contact rows — tighter 16-20px within-group spacing */}
        <div className="flex flex-col">
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors py-2 min-h-[44px] border-t border-be-grey-150"
          >
            <Mail className="size-4 text-be-yellow-500" aria-hidden />
            {company.email}
          </a>
          <a
            href={`tel:${company.phonePrimaryTel}`}
            className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors py-2 min-h-[44px] border-t border-be-grey-150"
          >
            <Phone className="size-4 text-be-yellow-500" aria-hidden />
            {company.phonePrimary}
          </a>
        </div>

        {/* Office hours — inline, no longer a separate section */}
        <OfficeHours />

        {/* Response-time note */}
        <p className="text-metadata text-be-grey-650">
          Response within 24 business hours for online enquiries.
        </p>

        {/* Directions CTA */}
        <div>
          <SecondaryButton href={officeMapsDirectionsUrl} target="_blank">
            <Navigation className="size-4 mr-1.5" />
            Get Directions
          </SecondaryButton>
        </div>
      </div>

      {/* ───────────── Right column — map (capped at 440px) ───────────── */}
      <div className="reveal-up rounded-lg overflow-hidden border border-be-grey-250 bg-be-cream h-[280px] lg:h-[440px] flex relative">
        {!mapLoaded ? (
          <button
            type="button"
            className="group relative w-full h-full flex items-center justify-center bg-be-cream hover:bg-be-yellow-50/40 transition-colors cursor-pointer"
            onClick={() => setMapLoaded(true)}
            aria-label="Load interactive map of Bharat Electrosafe office"
          >
            {/* Static SVG preview — locally stored, no third-party request */}
            <Image
              src={officeMapPreviewSrc}
              alt="Map preview showing Bharat Electrosafe office location in Sector 62, Noida"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={false}
            />

            {/* Click overlay + load CTA */}
            <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
              <span className="inline-flex items-center gap-2 rounded-full bg-be-charcoal-950/85 text-be-warm-white px-4 py-2 text-sm font-medium shadow-md group-hover:bg-be-charcoal-950 group-hover:scale-[1.02] transition-all">
                <MapPin className="size-4 text-be-yellow-400" aria-hidden />
                Load interactive map
              </span>
            </div>
          </button>
        ) : (
          <iframe
            title="Bharat Electrosafe office location"
            src={officeMapsEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </div>
  );
}
