import Link from 'next/link';
import { ArrowRight, Home, Phone } from 'lucide-react';
import { company } from '@/data/company';

export default function NotFound() {
  return (
    <main id="main-content" className="flex-1 min-h-screen flex items-center justify-center bg-warm-white">
      <div className="container-site text-center py-20">
        {/* ── 404 heading ── */}
        <div className="mb-8">
          <p className="text-[6rem] font-bold text-yellow-500 leading-none mb-4">404</p>
          <h1 className="text-page-title text-charcoal-950 mb-4">
            Page not found
          </h1>
          <p className="text-body-lg text-grey-600 max-w-[540px] mx-auto">
            The page you are looking for does not exist or has been moved. Please return to
            the homepage or contact us for assistance.
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold text-[0.9375rem] px-7 py-3 rounded-md transition-colors min-h-[44px]"
          >
            <Home className="size-4 mr-2" />
            Return to homepage
          </Link>
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center bg-white hover:bg-warm-white text-charcoal-950 font-medium text-[0.9375rem] px-7 py-3 rounded-md border border-grey-300 transition-colors min-h-[44px]"
          >
            <Phone className="size-4 mr-2" />
            Contact us
          </a>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center bg-charcoal-950 hover:bg-charcoal-800 text-white font-medium text-[0.9375rem] px-7 py-3 rounded-md transition-colors min-h-[44px]"
          >
            Contact page
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </div>

        {/* ── Helpful links ── */}
        <div className="mt-10 pt-8 border-t border-grey-300/30">
          <p className="text-small-meta text-grey-600 mb-4">You might find what you are looking for here:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="text-[0.9375rem] font-medium text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]">
              Homepage
            </Link>
            <Link href="/about-us" className="text-[0.9375rem] font-medium text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]">
              About Us
            </Link>
            <Link href="/contact-us" className="text-[0.9375rem] font-medium text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]">
              Contact Us
            </Link>
            <Link href="/products/electrical-insulating-mats" className="text-[0.9375rem] font-medium text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]">
              Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
