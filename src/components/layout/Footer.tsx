import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { company, contactWhatsApp } from '@/data/company';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-yellow-500 bg-warm-white">
      <div className="container-site py-10 md:py-14">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand + Intro */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-[32px] h-[32px]">
                <Image
                  src="/logo-bharat.png"
                  alt="Bharat Electrosafe logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-semibold text-charcoal-950 text-[0.95rem] tracking-tight">
                Bharat Electrosafe
              </span>
            </div>
            <p className="text-small-meta text-grey-600 leading-relaxed max-w-[280px]">
              {company.tagline}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-charcoal-950 mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-charcoal-950 mb-4">
              Products
            </h3>
            <ul className="flex flex-col gap-2.5">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-charcoal-950 mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors"
                >
                  <Phone className="size-4 text-yellow-500" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors"
                >
                  <Mail className="size-4 text-yellow-500" />
                  {company.email}
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2 text-[0.875rem] text-charcoal-800">
                  <MapPin className="size-4 text-yellow-500 shrink-0 mt-0.5" />
                  <span>
                    {company.address.line1}, {company.address.line2}, {company.address.city}-{company.address.pincode}, {company.address.state}, {company.address.country}
                  </span>
                </span>
              </li>
              <li>
                <a
                  href={contactWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors"
                >
                  <MessageCircle className="size-4 text-yellow-500" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-10 pt-6 border-t border-grey-300/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-grey-600">
            &copy; 2024 Bharat Electrosafe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-grey-600 hover:text-yellow-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
