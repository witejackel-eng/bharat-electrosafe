'use client';

import Link from 'next/link';
import Image from 'next/image';
import { productSystems } from '@/data/products';
import { applications } from '@/data/applications';
import { NewsletterSubscribe } from '@/components/ui-custom/NewsletterSubscribe';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      ...productSystems.flatMap((s) => [
        { name: s.name, href: s.exploreLink },
        ...s.variants.map((v) => ({ name: v, href: s.exploreLink })),
      ]),
    ],
  },
  applications: {
    title: 'Applications',
    links: applications.map((a) => ({ name: a.name, href: `#applications-grid` })),
  },
  quality: {
    title: 'Quality',
    links: [
      { name: 'BIS Licence', href: '#proof' },
      { name: 'Test Reports', href: '#proof' },
      { name: 'ISO Certificate', href: '#proof' },
      { name: 'IS 15652', href: '#proof' },
      { name: 'Product Traceability', href: '#proof' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Applications', href: '#applications' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Resources', href: '#resources' },
      { name: 'Contact', href: '#contact' },
    ],
  },
};

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white/90">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo-bharat.png"
                  alt="Bharat Electrosafe"
                  fill
                  sizes="32px"
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="font-semibold text-white text-base">Bharat Electrosafe</span>
            </div>
            <p
              className="text-sm text-white/75 leading-relaxed mb-4 max-w-[320px]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Electrical insulating mats, visible-safety variants, geomembranes and water-stop solutions.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-orange" />
                Plot No. 12, Sector 7, IMT Manesar
              </span>
              <span className="pl-5 text-white/70">Gurugram, Haryana 122050, India</span>
              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="size-3.5 text-orange" />
                +91 123 456 7890
              </a>
              <a
                href="mailto:info@bharatelectrosafe.com"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="size-3.5 text-orange" />
                info@bharatelectrosafe.com
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 hover:text-white hover:translate-x-0.5 transition-all inline-flex items-center gap-1.5 group"
                    >
                      <span
                        className="w-0 group-hover:w-2 h-px bg-orange transition-all duration-200"
                        aria-hidden="true"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter band */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5">
            <h3 className="text-base font-semibold text-white mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Stay ahead of specification changes.
            </h3>
            <p
              className="text-sm text-white/70 leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Standard updates, new datasheets and case studies — sent quarterly.
            </p>
          </div>
          <div className="md:col-span-7 lg:col-span-5 lg:col-start-8">
            <NewsletterSubscribe />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-white/60"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            © {new Date().getFullYear()} Bharat Electrosafe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Terms of Use
            </Link>
            <span
              className="text-xs text-white/60 inline-flex items-center gap-1.5"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange" aria-hidden="true" />
              Made in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
