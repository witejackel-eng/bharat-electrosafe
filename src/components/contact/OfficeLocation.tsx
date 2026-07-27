'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone, Navigation } from 'lucide-react';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { cn } from '@/lib/utils';

export default function OfficeLocation() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="section-padding-major page-horizontal-padding bg-be-warm-white">
      <div className="container-site">
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
                <p className="font-semibold text-be-charcoal-950">Bharat Electrosafe Pvt. Ltd.</p>
                <p>Industrial Area, Sector XX</p>
                <p>[City], [State] — XXXXXX</p>
                <p>India</p>
              </div>
            </div>

            {/* Directions */}
            <p className="text-body text-be-grey-650">
              Located in the central industrial zone, easily accessible via main arterial roads. Approximately 15 minutes from the railway station and 30 minutes from the airport.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@bharatelectrosafe.com"
                className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors"
              >
                <Mail className="size-4 shrink-0" />
                <span>info@bharatelectrosafe.com</span>
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 text-body text-be-charcoal-800 hover:text-be-yellow-600 transition-colors"
              >
                <Phone className="size-4 shrink-0" />
                <span>+91-XXXX-XXXXXX</span>
              </a>
            </div>

            <SecondaryButton href="https://maps.google.com" target="_blank">
              <Navigation className="size-4 mr-1.5" />
              Get Directions
            </SecondaryButton>
          </div>

          {/* Right — Map placeholder (7/12) */}
          <div className="reveal-up lg:w-7/12">
            {!mapLoaded ? (
              <button
                type="button"
                onClick={() => setMapLoaded(true)}
                className={cn(
                  'w-full aspect-[4/3] rounded-lg border border-be-grey-250 bg-be-yellow-50',
                  'flex flex-col items-center justify-center gap-4',
                  'hover:bg-be-yellow-100 hover:border-be-yellow-400 transition-colors cursor-pointer',
                  'group'
                )}
                aria-label="Click to load map"
              >
                <div className="size-16 rounded-full bg-be-yellow-100 flex items-center justify-center group-hover:bg-be-yellow-400 transition-colors">
                  <MapPin className="size-8 text-be-yellow-600 group-hover:text-be-charcoal-950 transition-colors" />
                </div>
                <span className="text-card-title text-be-charcoal-800 group-hover:text-be-charcoal-950 transition-colors">
                  Click to load map
                </span>
                <span className="text-metadata text-be-grey-650">
                  View our office location on the map
                </span>
              </button>
            ) : (
              <div
                className={cn(
                  'w-full aspect-[4/3] rounded-lg border border-be-grey-250 bg-be-cream',
                  'flex flex-col items-center justify-center gap-3',
                  'overflow-hidden'
                )}
              >
                {/* Fallback map placeholder since we don't have a real embed */}
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-be-cream">
                  {/* Decorative grid pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(var(--be-grey-250) 1px, transparent 1px), linear-gradient(90deg, var(--be-grey-250) 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="size-14 rounded-full bg-be-yellow-500 flex items-center justify-center shadow-lg">
                      <MapPin className="size-7 text-be-charcoal-950" />
                    </div>
                    <div className="text-center">
                      <p className="text-card-title text-be-charcoal-950 font-semibold">
                        Bharat Electrosafe Pvt. Ltd.
                      </p>
                      <p className="text-body text-be-grey-650 mt-1">
                        Industrial Area, Sector XX, [City], India
                      </p>
                    </div>
                    <SecondaryButton
                      href="https://maps.google.com"
                      className="mt-2"
                    >
                      <Navigation className="size-4 mr-1.5" />
                      Open in Google Maps
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
