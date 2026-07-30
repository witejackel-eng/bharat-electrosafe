'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';

const stats = [
  { value: '6', label: 'Product families' },
  { value: 'A · B · C', label: 'Insulation classes' },
  { value: 'IS 15652:2006', label: 'Manufacturing standard' },
];

export default function AboutIntro() {
  return (
    <SectionShell variant="hero" bg="be-page-top-tint">
      {/* Breadcrumb */}
      <div className="reveal-up mb-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      </div>

      {/* 55/45 split layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
        {/* Left — page title + introduction */}
        <div className="lg:w-[55%] reveal-up">
          <h1 className="text-page-h1 text-be-charcoal-950 mb-6">
            About Bharat Electrosafe
          </h1>
          <p className="text-body-large text-be-grey-650 max-w-xl mb-8">
            Bharat Electrosafe manufactures electrical insulating mats and engineered PVC
            products for electrical-safety and civil-protection applications. The product
            portfolio includes standard insulating mats, visible-safety variants, PVC
            geo-membranes and water-stop profiles.
          </p>

          {/* Key facts (merged from AboutStats) */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start gap-2">
                <span className="text-3xl font-bold text-be-charcoal-950 tabular-nums">
                  {stat.value}
                </span>
                <div className="h-1 w-10 bg-be-yellow-500 rounded-full" />
                <span className="text-metadata text-be-grey-650 uppercase tracking-wider leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — company/product visual */}
        <div className="lg:w-[45%] reveal-up">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/media/home/about-overview.webp"
              alt="Bharat Electrosafe — Manufacturing and electrical safety"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
