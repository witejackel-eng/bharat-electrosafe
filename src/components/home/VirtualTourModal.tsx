'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { QuoteButton } from '@/components/quote/QuoteButton';
import {
  FlaskConical,
  Layers,
  Flame,
  Microscope,
  QrCode,
  Truck,
  Play,
  Download,
  X,
  type LucideIcon,
} from 'lucide-react';

interface TourStage {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
}

const tourStages: TourStage[] = [
  {
    id: 'compound-mixing',
    icon: FlaskConical,
    name: 'Compound Mixing',
    description: 'Pharmaceutical-grade banbury mixes rubber with non-toxic accelerators per IS 15652 recipe card.',
  },
  {
    id: 'calendering-sheeting',
    icon: Layers,
    name: 'Calendering & Sheeting',
    description: 'Multi-roll calenders form continuous sheets at ±0.1mm tolerance with closed-loop trim recycling.',
  },
  {
    id: 'moulding-curing',
    icon: Flame,
    name: 'Moulding & Curing',
    description: 'Hydraulic presses vulcanise sheets under temperature-controlled platens, locking in dimensional stability.',
  },
  {
    id: 'in-process-testing',
    icon: Microscope,
    name: 'In-process Testing',
    description: 'Every 25th mat is sampled for dielectric strength, tensile, and elongation per IS 15652 Appendix A.',
  },
  {
    id: 'marking-traceability',
    icon: QrCode,
    name: 'Marking & Traceability',
    description: 'Laser-etched batch numbers, class designation, and BIS licence number. QR code links to digital test report.',
  },
  {
    id: 'packing-dispatch',
    icon: Truck,
    name: 'Packing & Dispatch',
    description: 'Rolls wound on reusable cores, wrapped in recycled LDPE, GPS-tracked dispatch to 16 states.',
  },
];

interface VirtualTourModalProps {
  open: boolean;
  onClose: () => void;
}

export function VirtualTourModal({ open, onClose }: VirtualTourModalProps) {
  const [activeStage, setActiveStage] = useState<string>(tourStages[0].id);

  const currentStage = tourStages.find((s) => s.id === activeStage) ?? tourStages[0];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent
        className="max-w-3xl rounded-2xl bg-white dark:bg-card p-0 overflow-hidden [&>button]:hidden"
        style={{ fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif' }}
      >
        {/* Header */}
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-start justify-between gap-4">
          <DialogHeader className="text-left space-y-1">
            <DialogTitle
              asChild
            >
              <span className="text-orange text-xs font-semibold uppercase tracking-[0.2em]">
                Plant tour
              </span>
            </DialogTitle>
            <DialogDescription asChild>
              <span className="text-xl md:text-2xl font-bold text-navy dark:text-foreground">
                Walk through our Manesar facility
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogClose
            asChild
          >
            <button
              aria-label="Close plant tour modal"
              className="shrink-0 rounded-lg p-2 text-steel dark:text-white/50 hover:bg-navy/5 dark:hover:bg-white/5 hover:text-navy dark:hover:text-white transition-colors"
            >
              <X className="size-5" />
            </button>
          </DialogClose>
        </div>

        {/* Tour stages — horizontal scrollable strip */}
        <div className="px-6 md:px-8 pb-4">
          <div
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
            role="tablist"
            aria-label="Tour stages"
          >
            {tourStages.map((stage) => {
              const Icon = stage.icon;
              const isActive = stage.id === activeStage;
              return (
                <button
                  key={stage.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View ${stage.name} stage`}
                  onClick={() => setActiveStage(stage.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all shrink-0 ${
                    isActive
                      ? 'border-orange bg-orange-soft text-orange'
                      : 'border-border bg-ivory-light/50 dark:bg-navy-dark/30 text-steel dark:text-white/60 hover:border-orange/30 hover:text-navy dark:hover:text-white'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  <span className="hidden sm:inline">{stage.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central area — Video placeholder */}
        <div className="px-6 md:px-8 pb-4">
          <div
            className="relative rounded-xl aspect-video overflow-hidden bg-navy-dark"
          >
            <Image
              src="/images/factory.png"
              alt="Bharat Electrosafe Manesar manufacturing facility"
              fill
              className="object-cover"
              priority={false}
            />
            {/* Play button overlay */}
            <button
              aria-label="Play plant tour video"
              className="absolute inset-0 flex items-center justify-center group"
              onClick={() => {
                // Video placeholder — no actual video yet
              }}
            >
              <span className="w-16 h-16 rounded-full bg-white/90 dark:bg-white/80 shadow-lg flex items-center justify-center group-hover:scale-105 group-hover:bg-white transition-transform duration-200">
                <Play className="size-7 text-navy dark:text-navy fill-navy dark:fill-navy" />
              </span>
            </button>
          </div>

          {/* Stage description below video */}
          <p
            className="text-sm text-[#374151] dark:text-white/75 mt-3 leading-relaxed"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <span className="font-semibold text-navy dark:text-foreground">{currentStage.name}:</span>{' '}
            {currentStage.description}
          </p>
        </div>

        {/* CTA area */}
        <div className="px-6 md:px-8 pb-4 flex items-center gap-4">
          <QuoteButton
            productSystem="Plant Tour"
            variant="default"
            size="default"
            showArrow
            className="bg-orange hover:bg-orange-hover text-white font-semibold"
          >
            Request a guided tour
          </QuoteButton>
          <a
            href="/images/factory.png"
            download
            aria-label="Download facility brochure"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-steel dark:text-white/60 hover:text-navy dark:hover:text-white link-underline"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <Download className="size-4" />
            Download facility brochure
          </a>
        </div>

        {/* Footer — plant description */}
        <div className="px-6 md:px-8 py-4 bg-ivory-light/50 dark:bg-navy-dark/30 border-t border-border/40">
          <p
            className="text-xs text-steel dark:text-white/50 leading-relaxed"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Our Manesar plant spans 25,000 sq. m with solar-assisted curing and in-house NABL lab.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
