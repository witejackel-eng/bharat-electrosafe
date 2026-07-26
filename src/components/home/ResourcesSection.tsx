'use client';

import { useState } from 'react';
import { resources, type Resource } from '@/data/resources';
import { Reveal } from '@/components/motion/Reveal';
import { FileText, Download, File } from 'lucide-react';

const categoryFilters: Array<{ value: Resource['category'] | 'All'; label: string }> = [
  { value: 'All', label: 'All resources' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Civil', label: 'Civil' },
  { value: 'Quality', label: 'Quality' },
];

const typeAccent: Record<Resource['type'], string> = {
  'Technical Brief': 'text-orange',
  Datasheet: 'text-navy',
  'Selection Guide': 'text-orange',
  'Case Study': 'text-navy',
  'Standard Reference': 'text-orange',
};

function downloadResource(res: Resource) {
  const header = `%PDF-1.4
% Bharat Electrosafe — ${res.title}
% Type: ${res.type} | Category: ${res.category}
% Pages: ${res.pages} | Size: ${res.fileSize}
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >> endobj
4 0 obj << /Length 120 >>
stream
BT /F1 18 Tf 72 720 Td (${res.title}) Tj ET
BT /F1 12 Tf 72 690 Td (${res.type} - ${res.category}) Tj ET
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
350
%%EOF`;

  const blob = new Blob([header], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${res.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ResourcesSection() {
  const [filter, setFilter] = useState<Resource['category'] | 'All'>('All');

  const filtered =
    filter === 'All' ? resources : resources.filter((r) => r.category === filter);

  return (
    <section id="resources" className="bg-background py-20 md:py-28 scroll-mt-32 relative overflow-hidden grain-overlay">
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="floating-shape absolute top-[12%] right-[20%] w-56 h-56 rounded-full bg-orange/[0.06] blur-3xl" />
        <div className="floating-shape absolute bottom-[8%] left-[15%] w-44 h-44 bg-navy/[0.04] blur-3xl" style={{ transform: 'rotate(45deg)' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Reveal delay={0}>
              <span className="text-eyebrow gradient-text">Technical resources</span>
              <div className="accent-bar animate-underline-reveal" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-3 max-w-[560px] gradient-text"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Documents your engineering and procurement teams will actually use.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p
                className="text-base text-steel mt-3 max-w-[560px]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Selection guides, datasheets, case studies and standard summaries. Download what you need for your specification or audit.
              </p>
            </Reveal>
          </div>

          {/* Filters */}
          <Reveal delay={180}>
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter resources by category">
              {categoryFilters.map((f) => {
                const active = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.value)}
                    className={`px-4 h-9 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
                      active
                        ? 'bg-navy text-white border border-navy'
                        : 'bg-white text-navy/70 border border-border hover:border-orange/40 hover:text-navy'
                    }`}
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Resource list */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((res, i) => (
            <Reveal key={res.id} delay={i * 70} translateY={16}>
              <article className="group relative h-full flex flex-col p-6 rounded-2xl border border-border bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden card-tilt diagonal-line corner-accent">
                {/* Animated gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-orange)/30, transparent 40%, var(--color-orange)/30)',
                    backgroundSize: '200% 200%',
                  }}
                  aria-hidden="true"
                />
                {/* Inner bg to create border effect */}
                <div className="absolute inset-[2px] rounded-[14px] bg-white pointer-events-none group-hover:bg-white transition-colors" aria-hidden="true" />

                {/* Subtle floating FileText watermark */}
                <FileText
                  className="absolute -bottom-4 -right-4 size-28 text-navy/[0.02] pointer-events-none rotate-[-8deg]"
                  aria-hidden="true"
                />

                {/* Top row: type + pages */}
                <div className="flex items-center justify-between mb-4 relative">
                  {/* Type badge with animated underline */}
                  <span className="relative">
                    <span
                      className={`text-spec ${typeAccent[res.type]}`}
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {res.type}
                    </span>
                    {/* Animated underline that expands on hover */}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] bg-orange/0 group-hover:bg-orange/40 rounded-full transition-all duration-300"
                      style={{ width: '0%' }}
                    />
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] bg-orange/40 rounded-full group-hover:w-full transition-all duration-300"
                      style={{ width: '0%', maxWidth: '100%' }}
                    />
                  </span>
                  <span
                    className="text-xs text-steel tabular-nums"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {res.pages} pp · {res.fileSize}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-semibold text-navy leading-snug mb-2 relative"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {res.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm text-steel leading-relaxed flex-1 relative"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {res.description}
                </p>

                {/* Footer: file tag + download button */}
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between relative">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs text-steel"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    <File className="size-3.5" />
                    {res.fileType}
                  </span>
                  <button
                    type="button"
                    onClick={() => downloadResource(res)}
                    className="group/dl inline-flex items-center gap-1.5 text-xs font-medium text-navy hover:text-orange transition-all px-2.5 py-1.5 rounded-md hover:bg-orange-soft hover:scale-[1.05] duration-200 animate-breathing-glow"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                    aria-label={`Download ${res.title}`}
                  >
                    <Download className="size-3.5 transition-transform group-hover/dl:translate-y-0.5" />
                    Download
                  </button>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-px h-8 bg-orange" />
                  <div className="absolute top-0 right-0 h-px w-8 bg-orange" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Note */}
        <Reveal delay={200}>
          <p
            className="mt-8 text-xs text-steel"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Need a document tailored to your project? <span className="text-orange font-medium">Ask technical sales</span> for a specification pack.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
