'use client';

import { ShieldCheck, FileText, Truck, Headphones } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TrustIndicator {
  icon: LucideIcon;
  label: string;
}

const trustIndicators: TrustIndicator[] = [
  { icon: ShieldCheck, label: 'IS 15652:2006 Certified' },
  { icon: FileText, label: 'Full documentation provided' },
  { icon: Truck, label: 'Pan-India delivery' },
  { icon: Headphones, label: 'Technical support available' },
];

export function ProductTrustIndicators() {
  return (
    <section
      aria-label="Product trust indicators"
      className="bg-be-yellow-50 border-y border-be-yellow-100 py-6"
    >
      <div className="container-site page-horizontal-padding">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          {trustIndicators.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-be-white border border-be-yellow-100">
                  <Icon className="h-4 w-4 text-be-yellow-600" />
                </span>
                <span className="text-metadata font-semibold text-be-charcoal-950 uppercase tracking-wide">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
