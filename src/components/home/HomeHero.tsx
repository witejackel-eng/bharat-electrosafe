import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const proofItems = [
  'IS 15652:2006',
  'BIS licence',
  'Tested documentation',
  'Custom dimensions',
];

export function HomeHero() {
  return (
    <section
      id="hero"
      className="relative bg-warm-white py-16 md:py-24 lg:py-28"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── Text Column ── */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <p className="text-small-meta font-semibold uppercase tracking-[0.14em] text-yellow-600 mb-4">
              Electrical Insulation and Industrial Protection
            </p>

            {/* H1 */}
            <h1 className="text-hero-h1 text-charcoal-950 mb-6">
              Certified protection for critical electrical environments.
            </h1>

            {/* Supporting copy — max 32 words */}
            <p className="text-body-lg text-grey-600 mb-8 max-w-[560px]">
              Electrical insulating mats and engineered protection products for control panels, substations, utilities, industry and infrastructure.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/products/electrical-insulating-mats"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold text-[0.9375rem] px-6 py-3 rounded-md transition-colors min-h-[44px]"
              >
                View Products
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 border border-charcoal-800 hover:border-charcoal-950 text-charcoal-800 hover:text-charcoal-950 font-medium text-[0.9375rem] px-6 py-3 rounded-md transition-colors min-h-[44px]"
              >
                Request a Quote
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            {/* Proof line */}
            <div className="flex flex-wrap items-center gap-3">
              {proofItems.map((item, i) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-small-meta text-grey-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" aria-hidden="true" />
                  {item}
                  {i < proofItems.length - 1 && (
                    <span className="w-px h-3 bg-grey-300" aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* ── Visual Column ── */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-yellow-50">
              <Image
                src="/images/electrical-insulation.png"
                alt="Bharat Electrosafe electrical insulating mats"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
