'use client';

import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { VirtualTourModal } from '@/components/home/VirtualTourModal';
import {
  FlaskConical,
  Layers,
  Flame,
  Microscope,
  QrCode,
  Truck,
  Video,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  icons: LucideIcon[];
}

const stages: Stage[] = [
  {
    id: 'compound-mixing',
    number: 'Stage 01',
    title: 'Compound Mixing',
    description:
      'Pharmaceutical-grade banbury mixes natural and synthetic rubber with non-toxic accelerators, fillers, and pigments per IS 15652 recipe card.',
    tags: ['Banbury mixer', 'Auto dosing', 'Recipe locked'],
    icons: [FlaskConical, Layers, Flame],
  },
  {
    id: 'calendering-sheeting',
    number: 'Stage 02',
    title: 'Calendering & Sheeting',
    description:
      'Multi-roll calenders form continuous sheets at controlled thickness (±0.1mm tolerance) with edge trim recycled back to the mixing line.',
    tags: ['4-roll calender', '±0.1mm', 'Closed-loop trim'],
    icons: [Layers, FlaskConical, Microscope],
  },
  {
    id: 'moulding-curing',
    number: 'Stage 03',
    title: 'Moulding & Curing',
    description:
      'Hydraulic presses vulcanise sheets under temperature-controlled platens, locking in dimensional stability and electrical properties.',
    tags: ['Low-temp cure', '170°C', 'Energy recovered'],
    icons: [Flame, Layers, Microscope],
  },
  {
    id: 'in-process-testing',
    number: 'Stage 04',
    title: 'In-process Testing',
    description:
      'Every 25th mat is sampled for dielectric strength, tensile, and elongation per IS 15652 Appendix A. Results logged to the QA ledger.',
    tags: ['Dielectric', 'Tensile', 'IS 15652 App A'],
    icons: [Microscope, FlaskConical, QrCode],
  },
  {
    id: 'marking-traceability',
    number: 'Stage 05',
    title: 'Marking & Traceability',
    description:
      'Laser-etched batch numbers, manufacturing date, class designation, and BIS licence number on each mat. QR code links to digital test report.',
    tags: ['Laser etch', 'QR code', 'Batch ledger'],
    icons: [QrCode, Microscope, Truck],
  },
  {
    id: 'packing-dispatch',
    number: 'Stage 06',
    title: 'Packing & Dispatch',
    description:
      'Rolls wound on reusable cores, wrapped in recycled LDPE, labelled with destination project code. GPS-tracked dispatch to 16 states.',
    tags: ['Reusable cores', 'GPS track', '16 states'],
    icons: [Truck, QrCode, Layers],
  },
];

export function ManufacturingProcessSection() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <section
      id="manufacturing"
      className="bg-navy text-white py-20 md:py-28 scroll-mt-32 relative overflow-hidden"
      style={{ fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* Subtle radial gradient backdrop (orange glow top-right) */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal delay={0}>
            <span className="inline-block text-orange text-xs font-semibold uppercase tracking-[0.2em]">
              Inside the Manesar Plant
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">
              From raw rubber to certified mat — six stages.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-white/80 max-w-2xl leading-relaxed mt-4">
              Every Bharat Electrosafe mat is traceable from compound mixing
              through to dispatch, with IS 15652 checkpoints logged at each
              stage. The Manesar plant runs a closed-loop process — trim
              returns to the mixer, energy is recovered from cure presses, and
              every 25th mat is sampled to the QA ledger.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <ol
          aria-label="Manufacturing process stages"
          className="relative mt-16 max-w-5xl mx-auto"
        >
          {/* Desktop vertical center line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/40 to-transparent"
            aria-hidden="true"
          />
          {/* Mobile left line */}
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-white/15"
            aria-hidden="true"
          />

          {stages.map((stage, i) => {
            const isOdd = i % 2 === 1;
            return (
              <li key={stage.id} className="relative mb-12 md:mb-16 last:mb-0">
                <Reveal delay={i * 120} translateY={20}>
                  <article className="relative grid md:grid-cols-2 gap-8 items-start">
                    {/* Stage node — positioned on the center line */}
                    <span
                      className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-orange ring-4 ring-orange/20 z-10"
                      aria-hidden="true"
                    />

                    {/* Content column — alternating side on desktop */}
                    <div
                      className={`pl-10 md:pl-0 ${
                        isOdd ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'
                      }`}
                    >
                      <span className="text-xs font-bold text-orange uppercase tracking-wider">
                        {stage.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                        {stage.title}
                      </h3>
                      <p className="text-white/75 leading-relaxed mt-3">
                        {stage.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {stage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/5 text-white/70 text-xs px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        {stage.icons.map((Icon, idx) => (
                          <span
                            key={idx}
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-orange/80"
                            aria-hidden="true"
                          >
                            <Icon className="size-4" strokeWidth={1.75} />
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Spacer column — required for the alternating layout on desktop */}
                    <div
                      className={`hidden md:block ${
                        isOdd ? 'md:order-1' : 'md:order-2'
                      }`}
                      aria-hidden="true"
                    />
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Footer CTA strip */}
        <Reveal delay={120}>
          <div className="mt-12 text-center">
            <p className="text-white/60 text-sm">Schedule a virtual plant tour</p>
            <button
              onClick={() => setTourOpen(true)}
              aria-label="Book a virtual plant tour"
              className="inline-flex items-center gap-2 mt-3 bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              <Video className="size-4" />
              Book a tour
              <ArrowRight className="size-4" />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTourModal open={tourOpen} onClose={() => setTourOpen(false)} />
    </section>
  );
}
