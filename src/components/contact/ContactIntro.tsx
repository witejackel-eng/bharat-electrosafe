'use client';

import { company } from '@/data/company';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { cn } from '@/lib/utils';

interface ContactMethodCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  bg: string;
}

const contactMethods: ContactMethodCard[] = [
  {
    icon: <Mail className="size-5 text-be-yellow-500" />,
    label: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
    bg: 'bg-be-yellow-50',
  },
  {
    icon: <Phone className="size-5 text-be-yellow-500" />,
    label: 'Primary Phone',
    value: company.phonePrimary,
    href: `tel:${company.phonePrimaryTel}`,
    bg: 'bg-be-white',
  },
  {
    icon: <Phone className="size-5 text-be-yellow-500" />,
    label: 'Secondary Phone',
    value: company.phoneSecondary,
    href: `tel:${company.phoneSecondaryTel}`,
    bg: 'bg-be-white',
  },
  {
    icon: <MessageCircle className="size-5 text-be-yellow-500" />,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: company.whatsapp.href,
    bg: 'bg-be-yellow-50',
  },
  {
    icon: <MapPin className="size-5 text-be-yellow-500" />,
    label: 'Address',
    value: `${company.address.line1}, ${company.address.line2}, ${company.address.city}-${company.address.pincode}, ${company.address.country}`,
    bg: 'bg-be-white',
  },
];

export default function ContactIntro() {
  return (
    <SectionShell variant="hero" bg="bg-be-warm-white">
      {/* Breadcrumb */}
      <div className="reveal-up mb-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
      </div>

      {/* Desktop: 45% intro / 55% cards */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Left — Intro */}
        <div className="reveal-up lg:w-[45%] flex flex-col gap-6">
          <h1 className="text-page-h1 text-be-charcoal-950">
            Contact Bharat Electrosafe
          </h1>
          <p className="text-body-large text-be-grey-650">
            Reach our team for product enquiries, technical support, quotations or application guidance.
          </p>
        </div>

        {/* Right — Contact Methods Grid */}
        <div className="reveal-up lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactMethods.map((method) => (
            <div
              key={method.label}
              className={cn(
                'rounded-lg border border-be-grey-250 p-5 flex flex-col gap-3 hover-card-lift',
                method.bg
              )}
            >
              <div className="flex items-center gap-2">
                {method.icon}
                <span className="text-metadata font-semibold text-be-grey-650 uppercase tracking-wide">
                  {method.label}
                </span>
              </div>
              {method.href ? (
                <a
                  href={method.href}
                  target={method.href.startsWith('https') ? '_blank' : undefined}
                  rel={method.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                  className="text-body font-medium text-be-charcoal-950 hover:text-be-yellow-600 transition-colors"
                >
                  {method.value}
                </a>
              ) : (
                <span className="text-body font-medium text-be-charcoal-800">
                  {method.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
