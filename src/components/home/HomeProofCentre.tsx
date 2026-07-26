'use client';

import { clients } from '@/data/clients';
import { qualityDocuments, traceabilityFields } from '@/data/quality';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Download, Eye } from 'lucide-react';

export function HomeProofCentre() {
  // Duplicate clients for seamless marquee loop
  const doubledClients = [...clients, ...clients];

  return (
    <section id="proof" className="bg-background py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <Reveal delay={0}>
          <span className="text-eyebrow">Proof Centre</span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-3 max-w-[640px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Proof that supports procurement.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-base text-steel mt-3 max-w-[560px]" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Client experience, testing documentation, quality certificates and product traceability—organised for faster technical decisions.
          </p>
        </Reveal>

        {/* Part A: Moving institutional logos */}
        <div className="mt-12 md:mt-16">
          <Reveal delay={200}>
            <p className="text-sm text-steel mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Experience across critical industrial environments
            </p>
          </Reveal>

          <div className="relative overflow-hidden py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex gap-6 md:gap-10" style={{ width: 'max-content' }}>
              {doubledClients.map((client, i) => (
                <div
                  key={`${client.id}-${i}`}
                  className="flex items-center gap-3 group px-4 py-3 rounded-xl border border-border/40 bg-white/50 hover:bg-white hover:border-orange/20 transition-all duration-200 hover:-translate-y-1"
                  style={{ minWidth: '160px' }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy text-white font-bold text-sm shrink-0 group-hover:bg-navy-light transition-colors">
                    {client.abbreviation}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-navy group-hover:text-navy/80">{client.name}</span>
                    <span className="text-xs text-steel block">{client.sector}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part B: Featured documents */}
        <div className="mt-14 md:mt-20">
          <Reveal delay={100}>
            <h3 className="text-lg font-semibold text-navy mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Featured documents
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {qualityDocuments.slice(0, 3).map((doc, i) => (
              <Reveal key={doc.id} delay={i * 80} translateY={16}>
                <div className="border border-border rounded-2xl p-5 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 group/card">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-muted mb-4">
                    <Image
                      src={doc.thumbnail}
                      alt={doc.name}
                      fill
                      className="object-cover group-hover/card:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-navy/20 flex items-center justify-center group-hover/card:bg-navy/10 transition-colors">
                      <FileText className="size-8 text-white/80" />
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-navy mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{doc.name}</h4>
                  <p className="text-xs text-steel mb-1">{doc.issuer}</p>
                  <div className="flex items-center gap-2 text-xs text-steel mb-4">
                    <span className="text-spec" style={{ fontFamily: "'Manrope', sans-serif" }}>{doc.standard}</span>
                    <span>·</span>
                    <span>{doc.fileType}</span>
                    <span>·</span>
                    <span>{doc.fileSize}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs h-8 gap-1 border-border text-navy/70 hover:text-navy hover:border-navy/30 transition-colors">
                      <Eye className="size-3" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-8 gap-1 border-border text-navy/70 hover:text-navy hover:border-navy/30 transition-colors">
                      <Download className="size-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Part C: Traceability */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Product marking image */}
          <div className="md:col-span-5">
            <Reveal delay={0} translateY={16}>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted">
                {/* Orange safety line */}
                <div className="absolute top-4 left-0 w-[3px] h-[60%] bg-orange rounded-full" />
                <Image
                  src="/images/product-marking.png"
                  alt="Product traceability marking on insulating mat"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </Reveal>
          </div>

          {/* Traceability copy */}
          <div className="md:col-span-7">
            <Reveal delay={80}>
              <span className="text-eyebrow">Traceability</span>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="text-xl md:text-2xl font-bold text-navy mt-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Every mat carries permanent identification.
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-sm text-steel mt-3 mb-5" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Product class, thickness, code, standard and licence reference—marked for full procurement traceability.
              </p>
            </Reveal>

            <div className="flex flex-col gap-2">
              {traceabilityFields.map((field, i) => (
                <Reveal key={field.label} delay={200 + i * 60}>
                  <div className="flex items-start gap-3 py-1.5 border-b border-border/40 last:border-0">
                    <span className="text-spec text-orange shrink-0" style={{ fontFamily: "'Manrope', sans-serif" }}>{field.label}</span>
                    <span className="text-sm text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>{field.description}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={500}>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Button
                  className="bg-orange hover:bg-orange-hover text-white font-medium px-5 h-10 rounded-lg text-sm"
                  asChild
                >
                  <Link href="#proof">View all quality documents</Link>
                </Button>
                <Link
                  href="#resources"
                  className="inline-flex items-center gap-2 text-sm text-steel hover:text-orange transition-colors"
                >
                  Open technical resources
                  <span className="transition-transform duration-200 hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
