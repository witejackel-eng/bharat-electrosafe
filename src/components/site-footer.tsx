import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { company } from '@/data/company';
import { products } from '@/data/products';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-foreground/10">
                <Shield className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-semibold tracking-tight">
                Bharat<span className="text-amber-400">Electrosafe</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              {company.description}
            </p>
            <p className="mt-3 text-xs text-primary-foreground/60">
              {company.certifications.isiStandard} · {company.certifications.cmL}
            </p>
          </div>

          {/* Products */}
          <nav aria-label="Footer products">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
              Products
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`#${p.slug}`}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground hover:underline"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
              Company
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link
                  href="#about"
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground hover:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#home"
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground hover:underline"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div>
                  <a
                    href={`tel:${company.phonePrimaryTel}`}
                    className="block text-primary-foreground/70 hover:text-primary-foreground hover:underline"
                  >
                    {company.phonePrimary}
                  </a>
                  <a
                    href={`tel:${company.phoneSecondaryTel}`}
                    className="block text-primary-foreground/70 hover:text-primary-foreground hover:underline"
                  >
                    {company.phoneSecondary}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:underline"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <a
                  href={company.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:underline"
                >
                  {company.whatsapp.label}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <span className="text-primary-foreground/70">
                  {company.address.full}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs text-primary-foreground/60">
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/60">
            Certified to {company.certifications.isiStandard} · Conforming to {company.certifications.iec}
          </p>
        </div>
      </div>
    </footer>
  );
}
