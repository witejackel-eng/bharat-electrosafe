import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Layers, SlidersHorizontal, Headphones } from 'lucide-react';

const proofPoints = [
  {
    icon: ShieldCheck,
    text: 'Certified and tested products per IS 15652:2006',
  },
  {
    icon: Layers,
    text: 'Class A, B, C voltage ratings and standard dimensions',
  },
  {
    icon: SlidersHorizontal,
    text: 'Custom configurations for specific site requirements',
  },
  {
    icon: Headphones,
    text: 'Technical documentation and enquiry support',
  },
];

const companyIntro =
  'Bharat Electrosafe manufactures electrical insulating mats, visible-safety variants and BharatMembrane PVC geo-membranes, with an integrated setup running from compound manufacturing through to the finished product.';

export function CompanyCapability() {
  return (
    <section id="company-capability" className="bg-white py-16 md:py-20">
      <div className="container-site">
        {/* Heading */}
        <h2 className="text-section-h2 text-charcoal-950 mb-4">
          Built around safety, quality and application support
        </h2>
        <p className="text-body text-grey-600 mb-10">
          {companyIntro}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ── Proof Points ── */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {proofPoints.map((point) => (
                <div
                  key={point.text}
                  className="flex items-start gap-3 p-5 border border-grey-300/50 rounded-md bg-warm-white hover:border-yellow-500/60 transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                    <point.icon className="size-5 text-yellow-500" />
                  </div>
                  <p className="text-[0.9375rem] text-charcoal-800 leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-charcoal-800 hover:text-yellow-600 transition-colors"
              >
                Learn more about us
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* ── Company / Factory Image ── */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-yellow-50">
              <Image
                src="/images/company-factory.jpg"
                alt="Bharat Electrosafe manufacturing facility"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              {/* Fallback background */}
              <div className="absolute inset-0 -z-10 bg-yellow-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
