'use client';

import { clients } from '@/data/clients';
import { qualityDocuments, traceabilityFields, type QualityDocument } from '@/data/quality';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Download, Eye } from 'lucide-react';

const accentBg: Record<QualityDocument['accent'], string> = {
  navy: 'from-navy to-navy-dark',
  orange: 'from-orange to-orange-hover',
  steel: 'from-steel to-navy/80',
};

const accentText: Record<QualityDocument['accent'], string> = {
  navy: 'text-white',
  orange: 'text-white',
  steel: 'text-white',
};

function downloadDoc(doc: QualityDocument) {
  // Generate a small mock PDF on the client so the download feels real.
  const content = `%PDF-1.4
% Bharat Electrosafe — ${doc.name}
% Issuer: ${doc.issuer} | Standard: ${doc.standard} | Reference: ${doc.reference}
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >> endobj
4 0 obj << /Length 200 >>
stream
BT /F1 18 Tf 72 720 Td (${doc.name}) Tj ET
BT /F1 12 Tf 72 690 Td (Issuer: ${doc.issuer}) Tj ET
BT /F1 12 Tf 72 670 Td (Standard: ${doc.standard}) Tj ET
BT /F1 12 Tf 72 650 Td (Reference: ${doc.reference}) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000055 00000 n
0000000100 00000 n
0000000155 00000 n
trailer << /Size 5 /Root 1 0 R >>
startxref
420
%%EOF`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${doc.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function previewDoc(doc: QualityDocument) {
  // Open the same generated PDF in a new tab for "preview".
  const content = `%PDF-1.4
% Bharat Electrosafe — ${doc.name} (Preview)
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >> endobj
4 0 obj << /Length 200 >>
stream
BT /F1 18 Tf 72 720 Td (${doc.name}) Tj ET
BT /F1 12 Tf 72 690 Td (Issuer: ${doc.issuer}) Tj ET
BT /F1 12 Tf 72 670 Td (Standard: ${doc.standard}) Tj ET
BT /F1 12 Tf 72 650 Td (Reference: ${doc.reference}) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000055 00000 n
0000000100 00000 n
0000000155 00000 n
trailer << /Size 5 /Root 1 0 R >>
startxref
420
%%EOF`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener,noreferrer');
  // Revoke after a short delay so the browser can load it.
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

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
                  className="flex items-center gap-3 group px-4 py-3 rounded-xl border border-border/40 bg-white/50 hover:bg-white hover:border-orange/20 transition-all duration-200 hover:-translate-y-1 whitespace-nowrap"
                  style={{ minWidth: '200px' }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy text-white font-bold text-xs shrink-0 group-hover:bg-navy-light transition-colors">
                    {client.abbreviation}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-navy group-hover:text-navy/80 block truncate">{client.name}</span>
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
                <div className="border border-border rounded-2xl p-5 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 group/card relative overflow-hidden">
                  {/* Thumbnail — stylised "document" with accent gradient + stamp */}
                  <div
                    className={`relative w-full aspect-[3/2] rounded-xl overflow-hidden mb-4 bg-gradient-to-br ${accentBg[doc.accent]}`}
                  >
                    {/* Texture overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                      style={{
                        backgroundImage: `url(${doc.thumbnail})`,
                        backgroundSize: '120px',
                        backgroundRepeat: 'repeat',
                      }}
                    />
                    {/* Faux document header bar */}
                    <div className="absolute top-0 left-0 right-0 h-7 bg-black/15 backdrop-blur-[1px] flex items-center px-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      </div>
                      <span
                        className="ml-auto text-[0.6rem] uppercase tracking-wider text-white/70 tabular-nums"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {doc.fileType} · {doc.fileSize}
                      </span>
                    </div>
                    {/* Centered stamp + icon */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${accentText[doc.accent]}`}>
                      <FileText className="size-10 opacity-90" strokeWidth={1.4} />
                      <span
                        className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {doc.stamp}
                      </span>
                    </div>
                    {/* Reference number bottom */}
                    <div className="absolute bottom-2 left-3 right-3">
                      <span
                        className="text-[0.65rem] text-white/90 tabular-nums block truncate font-medium"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {doc.reference}
                      </span>
                    </div>
                    {/* Hover scale overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover/card:bg-white/5 transition-colors duration-300" />
                  </div>

                  <h4 className="text-sm font-semibold text-navy mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{doc.name}</h4>
                  <p className="text-xs text-steel mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{doc.issuer}</p>
                  <div className="flex items-center gap-2 text-xs text-steel mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    <span className="text-spec">{doc.standard}</span>
                    <span>·</span>
                    <span>{doc.fileType}</span>
                    <span>·</span>
                    <span>{doc.fileSize}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => previewDoc(doc)}
                      className="text-xs h-8 gap-1.5 border-border text-navy/70 hover:text-navy hover:border-navy/30 transition-colors"
                    >
                      <Eye className="size-3" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadDoc(doc)}
                      className="text-xs h-8 gap-1.5 border-border text-navy/70 hover:text-orange hover:border-orange/40 transition-colors"
                    >
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
