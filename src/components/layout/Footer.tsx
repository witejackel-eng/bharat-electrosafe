'use client';

import Link from 'next/link';
import Image from 'next/image';
import { productSystems } from '@/data/products';
import { applications } from '@/data/applications';

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
    links: applications.map((a) => ({ name: a.name, href: `#${a.id}` })),
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
      { name: 'Factory', href: '#about' },
      { name: 'Contact', href: '#contact' },
      { name: 'Request a Quote', href: '#quote' },
    ],
  },
};

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white/90">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
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
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Electrical insulating mats, visible-safety variants, geomembranes and water-stop solutions.
            </p>
            <div className="flex flex-col gap-1 text-sm text-white/60">
              <span>Plot No. 12, Sector 7, IMT Manesar</span>
              <span>Gurugram, Haryana 122050, India</span>
              <a href="tel:+911234567890" className="hover:text-white transition-colors">+91 123 456 7890</a>
              <a href="mailto:info@bharatelectrosafe.com" className="hover:text-white transition-colors">info@bharatelectrosafe.com</a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Bharat Electrosafe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
