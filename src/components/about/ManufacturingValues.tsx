'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';

export default function ManufacturingValues() {
  return (
    <section className="bg-be-cream section-padding-major page-horizontal-padding">
      <div className="container-site">
        <div className="reveal-up mb-10">
          <SectionHeader
            eyebrow="Manufacturing & Quality"
            title="Certified Production Process"
            supportingText="Our manufacturing facility produces certified insulating mats under controlled conditions, with in-process quality checks and third-party testing at every production stage."
          />
        </div>

        {/* Visual composition — 60/40 split */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-12">
          {/* Large image — left (60%) */}
          <div className="lg:w-[60%] reveal-up">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/media/manufacturing/production-line.webp"
                alt="Manufacturing facility — production line"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </div>

          {/* Two smaller images stacked — right (40%) */}
          <div className="lg:w-[40%] flex flex-col gap-6">
            <div className="reveal-up rounded-lg overflow-hidden">
              <Image
                src="/media/home/hero.webp"
                alt="Testing and quality verification"
                width={600}
                height={375}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="reveal-up rounded-lg overflow-hidden">
              <Image
                src="/media/home/who-we-are.webp"
                alt="Manufacturing detail — quality inspection"
                width={600}
                height={375}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Technical proof rows */}
        <div className="reveal-up">
          <DataTable
            headers={['Stage 1', 'Stage 2', 'Stage 3']}
            rows={[
              ['Raw material inspection', 'In-process testing', 'Final product certification'],
              ['IS 15652:2006 compliance', 'BIS licensed production', 'ERDA/NTH verified'],
              ['Thickness verification', 'Voltage class testing', 'Dimensional accuracy checks'],
            ]}
          />
        </div>
      </div>
    </section>
  );
}
