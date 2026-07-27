import Link from 'next/link';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { accreditationBodies, qualityDocuments } from '@/data/quality';

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
          The standards our products are built to, and the organisations that
          license, test and certify them.
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
              {doc.documentAvailable && doc.fileName ? (
                <a
                  href={`/downloads/${doc.fileName}`}
                  download
                  className="inline-flex items-center gap-1.5 text-[0.8125rem] text-charcoal-800 font-medium hover:text-yellow-600 transition-colors"
                >
                  <FileText className="size-3.5 text-yellow-500" />
                  Download PDF
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-grey-600">
                  <FileText className="size-3.5 text-grey-300" />
                  Copy available on request
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ── Accreditation Rail ──
            Shows the bodies that license, test and certify the products.
            It deliberately does NOT show customer names or logos — those
            require confirmed relationships and written display permission. */}
        <div className="mb-10">
          <p className="text-small-meta font-semibold uppercase tracking-[0.12em] text-grey-600 mb-6">
            Licensed, tested and certified by
          </p>

          {/* CSS-only marquee; pauses on hover and stops under reduced motion */}
          <div
            className="relative overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <ul className="animate-logo-rail flex gap-10 items-center w-max" role="list">
              {/* Duplicated for seamless looping; the copy is hidden from AT */}
              {[...accreditationBodies, ...accreditationBodies].map((body, i) => (
                <li
                  key={`${body.id}-${i}`}
                  className="flex items-center justify-center h-[40px] min-w-[110px] px-4"
                  aria-hidden={i >= accreditationBodies.length ? true : undefined}
                >
                  <span
                    className="text-[0.8125rem] font-semibold text-charcoal-800 tracking-tight whitespace-nowrap"
                    title={body.role}
                  >
                    {body.label}
                  </span>
                </li>
              ))}
            </ul>
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
