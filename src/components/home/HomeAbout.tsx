import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * HomeAbout — compact About section between stats strip and Product Range.
 * Provides company context before the product range.
 * Split layout: ~40% image, ~60% copy on desktop.
 */

const ABOUT_IMAGE = '/media/products/electrical-insulating-mats/eim-application-switchgear-floor.webp';
const ABOUT_IMAGE_ALT = 'Electrical insulating mats installed in a switchgear room floor for operator protection';

export default function HomeAbout() {
  return (
    <section
      aria-label="About Bharat Electrosafe"
      className="w-full bg-be-warm-white"
    >
      <div className="container-site page-horizontal-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
          {/* Image column */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-be-cream order-2 lg:order-1">
            <Image
              src={ABOUT_IMAGE}
              alt={ABOUT_IMAGE_ALT}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>

          {/* Copy column */}
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            <Eyebrow>ABOUT BHARAT ELECTROSAFE</Eyebrow>

            <h2 className="text-2xl lg:text-3xl font-bold text-be-charcoal-950 leading-tight">
              Engineering protection for electrical and industrial environments
            </h2>

            <p className="text-base text-be-grey-650 leading-relaxed max-w-xl">
              Bharat Electrosafe manufactures and supplies electrical insulating mats and industrial protection products for switchgear rooms, substations, infrastructure projects and other demanding applications. The range includes IS 15652:2006 domestic insulating mats, a separate IEC 61111:2009 international range, waterproofing solutions, PVC flooring and supporting industrial rubber products.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-be-charcoal-950 hover:text-be-yellow-text-hover transition-colors group"
              >
                About Bharat Electrosafe
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-be-grey-650 hover:text-be-yellow-text-hover transition-colors group"
              >
                Explore Products
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
