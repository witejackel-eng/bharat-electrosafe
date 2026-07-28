'use client';

import { Clock } from 'lucide-react';
import { SectionShell } from '@/components/ui/SectionShell';

interface HourRow {
  day: string;
  hours: string;
  closed?: boolean;
}

const hours: HourRow[] = [
  { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 1:00 PM' },
  { day: 'Sunday', hours: 'Closed', closed: true },
];

export default function OfficeHours() {
  return (
    <SectionShell variant="compact" bg="bg-be-cream" ariaLabel="Office hours">
      <div className="reveal-up rounded-lg bg-be-yellow-50 p-5 flex flex-col gap-4 max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-be-white border border-be-yellow-100">
            <Clock className="h-5 w-5 text-be-yellow-600" />
          </span>
          <h2 className="text-card-title text-be-charcoal-950">Office Hours</h2>
        </div>

        {/* Hours list */}
        <ul className="flex flex-col divide-y divide-be-yellow-100">
          {hours.map((row) => (
            <li
              key={row.day}
              className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
            >
              <span className="text-body font-medium text-be-charcoal-950">
                {row.day}
              </span>
              <span
                className={
                  row.closed
                    ? 'text-body text-be-grey-650 italic'
                    : 'text-body text-be-charcoal-800 tabular-nums'
                }
              >
                {row.hours}
              </span>
            </li>
          ))}
        </ul>

        {/* Note */}
        <p className="text-metadata text-be-grey-650 border-t border-be-yellow-100 pt-3">
          Response within 24 business hours for online enquiries.
        </p>
      </div>
    </SectionShell>
  );
}
