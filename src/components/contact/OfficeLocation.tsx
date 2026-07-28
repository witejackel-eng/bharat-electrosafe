'use client';

import { company } from '@/data/company';
import { useState } from 'react';
import { MapPin, Mail, Phone, Navigation } from 'lucide-react';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import OfficeHours from '@/components/contact/OfficeHours';
import { officeMapsDirectionsUrl, officeMapsEmbedUrl } from '@/components/contact/ContactIntro';

/**
 * Chapter 2 — Office and Location.
 *
 * Combines office address, contact links, office hours and the map into one
 * section. Office hours are rendered inline inside the left column as a
 * bordered card — no longer a separate full-width section.
 *
 * The map uses a real privacy-conscious click-to-load Google Maps embed
 * with an exact encoded destination built from the canonical company
 * address (imported from ContactIntro so footer + directions stay in sync).
 */
export default function OfficeLocation() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[0.4fr_0.6fr] gap-8 lg:gap-12">
      {/* ───────────── Left column — office info + hours ───────────── */}
      <div className="reveal-up flex flex-col gap-6">
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
            className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors py-2.5 min-h-[44px] border-t border-be-grey-150"
          >
            <Mail className="size-4 text-be-yellow-500" aria-hidden />
            {company.email}
          </a>
          <a
            href={`tel:${company.phonePrimaryTel}`}
            className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors py-2.5 min-h-[44px] border-t border-be-grey-150"
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

      {/* ───────────── Right column — map ───────────── */}
      <div className="reveal-up rounded-lg overflow-hidden border border-be-grey-250 bg-be-cream min-h-[300px] lg:min-h-[420px] flex">
        {!mapLoaded ? (
          <button
            type="button"
            className="w-full h-full min-h-[300px] lg:min-h-[420px] flex items-center justify-center bg-be-cream hover:bg-be-yellow-50 transition-colors"
            onClick={() => setMapLoaded(true)}
            aria-label="Load interactive map of Bharat Electrosafe office"
          >
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <MapPin className="size-8 text-be-yellow-500" aria-hidden />
              <span className="text-body font-medium text-be-charcoal-800">
                Click to load map
              </span>
              <span className="text-metadata text-be-grey-650 max-w-xs">
                {company.address.line1}, {company.address.line2}, {company.address.city} — {company.address.pincode}
              </span>
            </div>
          </button>
        ) : (
          <iframe
            title="Bharat Electrosafe office location"
            src={officeMapsEmbedUrl}
            className="w-full h-full min-h-[300px] lg:min-h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </div>
  );
}
