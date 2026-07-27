import Link from 'next/link';
import { company, contactWhatsApp } from '@/data/company';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

export function ContactCTA() {
  return (
    <section id="contact-cta" className="bg-yellow-50 py-16 md:py-20">
      <div className="container-site text-center">
        {/* Heading */}
        <h2 className="text-section-h2 text-charcoal-950 mb-4">
          Need help selecting the correct product?
        </h2>

        {/* Supporting copy */}
        <p className="text-body text-grey-600 mb-8 max-w-[560px] mx-auto">
          Share your operating voltage, product requirement, dimensions, quantity and delivery location.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold text-[0.9375rem] px-6 py-3 rounded-md transition-colors min-h-[44px]"
          >
            Request a Quote
            <ArrowRight className="size-4" />
          </Link>

          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-2 border border-charcoal-800 hover:border-charcoal-950 text-charcoal-800 hover:text-charcoal-950 font-medium text-[0.9375rem] px-6 py-3 rounded-md transition-colors min-h-[44px]"
          >
            <Phone className="size-4" />
            Call Sales
          </a>

          <a
            href={contactWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-charcoal-800 hover:border-charcoal-950 text-charcoal-800 hover:text-charcoal-950 font-medium text-[0.9375rem] px-6 py-3 rounded-md transition-colors min-h-[44px]"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
