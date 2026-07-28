'use client';

import { company } from '@/data/company';
import { useState } from 'react';
import { MapPin, Mail, Phone, Navigation } from 'lucide-react';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import { cn } from '@/lib/utils';

export default function OfficeLocation() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <SectionShell variant="standard" bg="bg-be-warm-white" topRule ariaLabel="Office location">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left — Address and directions (5/12) */}
        <div className="reveal-up lg:w-5/12 flex flex-col gap-6">
          <h2 className="text-section-h2 text-be-charcoal-950">
            Our Office
          </h2>

          {/* Full address */}
          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-be-yellow-500 shrink-0 mt-1" />
            <div className="text-body text-be-charcoal-800 leading-relaxed">
              <p className="font-semibold text-be-charcoal-950">{company.name}</p>
              <p>{company.address.line1}</p>
              <p>{company.address.line2}</p>
              <p>{company.address.city}, {company.address.state} — {company.address.pincode}</p>
              <p>{company.address.country}</p>
            </div>
          </div>

          {/* Quick contact */}
          <div className="flex flex-col gap-3">
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors">
              <Mail className="size-4 text-be-yellow-500" />
              {company.email}
            </a>
            <a href={`tel:${company.phonePrimaryTel}`} className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors">
              <Phone className="size-4 text-be-yellow-500" />
              {company.phonePrimary}
            </a>
          </div>

          {/* Directions CTA */}
          <SecondaryButton href="https://maps.google.com/?q=Bharat+Electrosafe+Noida">
            <Navigation className="size-4 mr-1.5" />
            Get Directions
          </SecondaryButton>
        </div>

        {/* Right — Embedded map (7/12) */}
        <div className="reveal-up lg:w-7/12 rounded-lg overflow-hidden border border-be-grey-250 bg-be-cream min-h-[300px] lg:min-h-[400px]">
          {!mapLoaded ? (
            <button
              type="button"
              className="w-full h-full min-h-[300px] lg:min-h-[400px] flex items-center justify-center bg-be-cream hover:bg-be-yellow-50 transition-colors"
              onClick={() => setMapLoaded(true)}
              aria-label="Load interactive map"
            >
              <div className="flex flex-col items-center gap-3">
                <MapPin className="size-8 text-be-yellow-500" />
                <span className="text-body font-medium text-be-charcoal-800">Click to load map</span>
              </div>
            </button>
          ) : (
            <iframe
              title="Bharat Electrosafe office location"
              src="https://maps.google.com/maps?q=Bharat+Electrosafe+Sector+63+Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[300px] lg:min-h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </SectionShell>
  );
}
