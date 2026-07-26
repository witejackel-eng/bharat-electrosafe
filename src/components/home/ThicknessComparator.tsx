'use client';

import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { QuoteButton } from '@/components/quote/QuoteButton';

interface BarData {
  className: string;
  voltageLabel: string;
  thickness: number;
  thicknessLabel: string;
  application: string;
  widthPercent: number;
  fillDelay: number;
}

const bars: BarData[] = [
  {
    className: 'A',
    voltageLabel: 'Class A — 3.3 kV',
    thickness: 2.0,
    thicknessLabel: '≥ 2.0 mm',
    application: 'Low-voltage panels',
    widthPercent: 40,
    fillDelay: 0,
  },
  {
    className: 'B',
    voltageLabel: 'Class B — 11 kV',
    thickness: 2.5,
    thicknessLabel: '≥ 2.5 mm',
    application: 'Medium-voltage substations',
    widthPercent: 50,
    fillDelay: 150,
  },
  {
    className: 'C',
    voltageLabel: 'Class C — 33 kV',
    thickness: 3.0,
    thicknessLabel: '≥ 3.0 mm',
    application: 'High-voltage switchyards',
    widthPercent: 60,
    fillDelay: 300,
  },
];

// Grid markers: 0.5mm increments up to 3.5mm
// Each 0.5mm increment maps to 10% width (3.0mm = 60%, 3.5mm = 70%)
const gridMarkers = [
  { mm: 0.5, pct: 10 },
  { mm: 1.0, pct: 20 },
  { mm: 1.5, pct: 30 },
  { mm: 2.0, pct: 40 },
  { mm: 2.5, pct: 50 },
  { mm: 3.0, pct: 60 },
  { mm: 3.5, pct: 70 },
];

export function ThicknessComparator() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  return (
    <section
      id="thickness-comparator"
      className="bg-navy py-20 md:py-28 scroll-mt-32 relative overflow-hidden"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url(/images/mat-texture.png)',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left column: header */}
          <div className="lg:col-span-5">
            <Reveal delay={0}>
              <span className="text-eyebrow" style={{ color: '#F07830' }}>
                Thickness comparison
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 leading-tight">
                See the difference in millimetres.
              </h2>
            </Reveal>
            {/* Decorative accent bar */}
            <Reveal delay={120}>
              <div
                className="accent-bar animate-underline-reveal"
                style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}
                aria-hidden="true"
              />
            </Reveal>
            <Reveal delay={200}>
              <p className="text-white/80 leading-relaxed max-w-[440px]">
                As operating voltage rises, IS 15652 mandates thicker insulation.
                Each class adds half a millimetre — a small number that carries
                the weight of personnel safety behind every panel door.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-[440px]">
                IS 15652 specifies minimum thickness for each rated voltage class.
                Bharat Electrosafe manufactures each class at or above the minimum.
              </p>
            </Reveal>
          </div>

          {/* Right column: comparator panel */}
          <div className="lg:col-span-7">
            <Reveal delay={100} translateY={20}>
              <div
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
                role="figure"
                aria-label="Thickness comparison chart showing Class A, B, and C insulation mat thicknesses"
              >
                {/* Grid header with mm markers */}
                <div className="relative ml-[140px] md:ml-[180px] mr-[80px] md:mr-[100px] h-6 mb-2">
                  {gridMarkers.map((marker) => (
                    <span
                      key={marker.mm}
                      className="absolute text-[0.65rem] text-white/40 font-medium"
                      style={{
                        left: `${(marker.pct / 70) * 100}%`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {marker.mm.toFixed(1)}mm
                    </span>
                  ))}
                </div>

                {/* Grid lines container */}
                <div className="relative">
                  {/* Vertical grid lines behind bars */}
                  <div
                    className="absolute top-0 bottom-0 ml-[140px] md:ml-[180px] mr-[80px] md:mr-[100px]"
                    aria-hidden="true"
                  >
                    {gridMarkers.map((marker) => (
                      <div
                        key={marker.mm}
                        className="absolute top-0 bottom-0 w-px bg-white/[0.08]"
                        style={{
                          left: `${(marker.pct / 70) * 100}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Stacked bars */}
                  <div className="flex flex-col gap-6 md:gap-8">
                    {bars.map((bar) => {
                      const isSelected = selectedClass === bar.className;
                      return (
                        <Reveal key={bar.className} delay={bar.fillDelay + 200} translateY={12}>
                          <div
                            className={`group/bar cursor-pointer transition-all duration-200 ${
                              isSelected ? 'ring-2 ring-orange ring-offset-2 ring-offset-navy rounded-lg' : ''
                            }`}
                            onClick={() => setSelectedClass(bar.className)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Select Class ${bar.className} — ${bar.voltageLabel}, thickness ${bar.thicknessLabel}`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedClass(bar.className);
                              }
                            }}
                          >
                            {/* Label + bar row */}
                            <div className="flex items-center gap-3 md:gap-4">
                              {/* Left label */}
                              <span className="shrink-0 w-[130px] md:w-[170px] text-sm md:text-base font-semibold text-white text-right">
                                {bar.voltageLabel}
                              </span>

                              {/* Visual bar */}
                              <div className="relative flex-1 min-w-0">
                                {/* Background track */}
                                <div className="h-10 md:h-12 rounded-lg bg-white/[0.06] overflow-hidden relative">
                                  {/* IS 15652 minimum dashed line */}
                                  <div
                                    className="absolute top-0 bottom-0 border-l-2 border-dashed border-orange/40 z-10"
                                    style={{
                                      left: `${(bar.widthPercent / 70) * 100}%`,
                                    }}
                                    aria-hidden="true"
                                  />
                                  {/* Animated fill bar */}
                                  <div
                                    className="h-full rounded-lg animate-bar-fill"
                                    style={{
                                      width: `${(bar.widthPercent / 70) * 100}%`,
                                      background: 'linear-gradient(90deg, var(--color-orange), var(--color-orange-hover))',
                                      animationDelay: `${bar.fillDelay}ms`,
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Right annotation */}
                              <span className="shrink-0 w-[65px] md:w-[80px] text-sm font-medium text-orange/80 text-right">
                                {bar.thicknessLabel}
                              </span>
                            </div>

                            {/* Application sub-label */}
                            <div className="ml-[140px] md:ml-[180px] mt-1">
                              <span className="text-xs text-white/50">
                                {bar.application}
                              </span>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>

                {/* Quote button for selected class */}
                {selectedClass && (
                  <Reveal delay={0}>
                    <div className="mt-8 flex items-center gap-4">
                      <QuoteButton
                        productSystem="electrical-insulation"
                        productClass={selectedClass}
                        className="bg-orange hover:bg-orange-hover text-white font-semibold px-6 h-11 rounded-lg"
                        showArrow
                      >
                        Request quote for Class {selectedClass}
                      </QuoteButton>
                      <button
                        type="button"
                        onClick={() => setSelectedClass(null)}
                        className="text-xs text-white/60 hover:text-white underline underline-offset-2 transition-colors"
                        aria-label="Clear class selection"
                      >
                        Clear selection
                      </button>
                    </div>
                  </Reveal>
                )}

                {/* Safety note */}
                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <p className="text-xs text-white/60 leading-relaxed">
                    IS 15652 specifies minimum thickness for each rated voltage class.
                    Bharat Electrosafe manufactures each class at or above the minimum.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
