import Link from 'next/link';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { clients } from '@/data/clients';
import { qualityDocuments } from '@/data/quality';

const featuredDocuments = qualityDocuments.slice(0, 3);

export function StandardsTrust() {
  return (
    <section id="standards-trust" className="bg-warm-white py-16 md:py-20">
      <div className="container-site">
        {/* Heading */}
        <h2 className="text-section-h2 text-charcoal-950 mb-4">
          Documentation that supports technical decisions
        </h2>
        <p className="text-body text-grey-600 mb-10 max-w-[560px]">
          Verified standard references, testing and certification organisations, downloadable evidence and institutional clients.
        </p>

        {/* ── Featured Document Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {featuredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col border border-grey-300/50 rounded-md p-5 bg-white hover:border-yellow-500/60 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-[0.9375rem] font-semibold text-charcoal-950">
                    {doc.name}
                  </h3>
                  <p className="text-small-meta text-grey-600">
                    {doc.issuer} &middot; {doc.standard}
                  </p>
                </div>
              </div>
              <p className="text-[0.875rem] text-grey-600 mb-4">
                {doc.stamp} — {doc.reference}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-charcoal-800 font-medium">
                <FileText className="size-3.5 text-yellow-500" />
                {doc.fileType} &middot; {doc.fileSize}
              </span>
            </div>
          ))}
        </div>

        {/* ── Client Logo Rail ── */}
        <div className="mb-10">
          <p className="text-small-meta font-semibold uppercase tracking-[0.12em] text-grey-600 mb-6">
            Trusted by leading institutions
          </p>

          {/* CSS-only infinite scroll rail, ~45s cycle */}
          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div
              className="animate-logo-rail flex gap-10 items-center w-max"
            >
              {/* Double the list for seamless looping */}
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={`${client.id}-${i}`}
                  className="flex items-center justify-center h-[40px] min-w-[100px] px-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <span className="text-[0.75rem] font-semibold text-charcoal-800 tracking-tight">
                    {client.abbreviation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Link to About Us certification section ── */}
        <div className="text-center">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-charcoal-800 hover:text-yellow-600 transition-colors"
          >
            View full certification details
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
