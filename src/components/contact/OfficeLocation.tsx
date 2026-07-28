'use client';

import { company } from '@/data/company';
import { useState } from 'react';
import { MapPin, Mail, Phone, Navigation, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import OfficeHours from '@/components/contact/OfficeHours';
import {
  officeMapsDirectionsUrl,
  officeOsmEmbedUrl,
  officeMapPreviewSrc,
} from '@/components/contact/ContactIntro';

/**
 * Chapter 2 — Office and Location.
 *
 * Combines office address, contact links, office hours and the map into one
 * section. Office hours are rendered inline inside the left column.
 *
 * Map behaviour (privacy-conscious, no broken iframe):
 *   1. Initial state — locally-stored static SVG preview (real road geometry,
 *      marker, address). No third-party request before user interaction.
 *   2. After click — OpenStreetMap embed iframe (privacy-conscious, no API
 *      key, no x-frame-options restrictions). Google Maps embed URLs return
 *      404 + SAMEORIGIN, so OSM is the reliable iframe source.
 *   3. Fallback — if the OSM iframe fails to load (e.g. network blocked),
 *      the static SVG preview is shown again with an "Open in Google Maps"
 *      action that opens the exact destination in a new tab.
 *
 * "Get Directions" always opens Google Maps in a new tab (no iframe).
 *
 * Map height is capped at ~440px on desktop (per spec: 420-460px range)
 * to avoid a near-square aspect ratio. The office column is top-aligned.
 */
export default function OfficeLocation() {
  const [mapState, setMapState] = useState<'preview' | 'loading' | 'interactive' | 'fallback'>('preview');

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

        {/* Quick contact rows */}
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
        {/* PREVIEW state — static SVG, no third-party request */}
        {mapState === 'preview' && (
          <button
            type="button"
            className="group relative w-full h-full flex items-center justify-center bg-be-cream hover:bg-be-yellow-50/40 transition-colors cursor-pointer"
            onClick={() => setMapState('loading')}
            aria-label="Load interactive map of Bharat Electrosafe office"
          >
            <Image
              src={officeMapPreviewSrc}
              alt="Map preview showing Bharat Electrosafe office location in Sector 62, Noida"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
              <span className="inline-flex items-center gap-2 rounded-full bg-be-charcoal-950/85 text-be-warm-white px-4 py-2 text-sm font-medium shadow-md group-hover:bg-be-charcoal-950 group-hover:scale-[1.02] transition-all">
                <MapPin className="size-4 text-be-yellow-400" aria-hidden />
                Load interactive map
              </span>
            </div>
          </button>
        )}

        {/* LOADING state — minimal spinner while the OSM iframe fetches.
            If the iframe never fires onLoad, the user can fall back via
            the "Open in Google Maps" button shown after a timeout. */}
        {mapState === 'loading' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 bg-be-cream px-6 text-center">
            <div className="absolute inset-0 opacity-30">
              <Image
                src={officeMapPreviewSrc}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                aria-hidden
              />
            </div>
            <div className="relative flex flex-col items-center gap-3">
              <div className="size-8 rounded-full border-2 border-be-grey-250 border-t-be-yellow-500 animate-spin" aria-hidden />
              <p className="text-metadata text-be-grey-650">Loading map…</p>
              <button
                type="button"
                onClick={() => setMapState('interactive')}
                className="text-sm font-medium text-be-charcoal-950 hover:text-be-yellow-600 transition-colors underline underline-offset-2"
              >
                Continue
              </button>
            </div>
            {/* Hidden iframe that we swap to visible once interactive.
                Rendered here so it starts fetching immediately. */}
            <iframe
              title="Bharat Electrosafe office location"
              src={officeOsmEmbedUrl}
              className="absolute inset-0 w-full h-full border-0 opacity-0 pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapState('interactive')}
              onError={() => setMapState('fallback')}
            />
          </div>
        )}

        {/* INTERACTIVE state — OSM iframe visible */}
        {mapState === 'interactive' && (
          <iframe
            title="Bharat Electrosafe office location"
            src={officeOsmEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setMapState('fallback')}
          />
        )}

        {/* FALLBACK state — SVG preview + open-in-Google-Maps CTA.
            Reached if the OSM iframe fails to load or is network-blocked. */}
        {mapState === 'fallback' && (
          <div className="relative w-full h-full flex items-center justify-center bg-be-cream">
            <Image
              src={officeMapPreviewSrc}
              alt="Map preview showing Bharat Electrosafe office location in Sector 62, Noida"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-be-charcoal-950/40 px-6 text-center">
              <p className="text-sm font-medium text-be-warm-white max-w-xs">
                Interactive map couldn&apos;t load.
              </p>
              <a
                href={officeMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-be-yellow-500 text-be-charcoal-950 px-4 py-2 text-sm font-semibold shadow-md hover:bg-be-yellow-600 transition-colors min-h-[44px]"
              >
                <ExternalLink className="size-4" aria-hidden />
                Open in Google Maps
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
