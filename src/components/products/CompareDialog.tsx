'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Check, Minus } from 'lucide-react';
import { productSystems } from '@/data/products';

interface CompareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Build comparison rows. Each row: { label, values: string[] (one per system), highlight?: boolean }
const rows: Array<{ label: string; values: string[]; highlight?: boolean }> = [
  {
    label: 'Primary function',
    values: productSystems.map((s) => s.description),
  },
  {
    label: 'Variants',
    values: productSystems.map((s) => s.variants.join(' · ')),
  },
  {
    label: 'Applicable standards',
    values: productSystems.map((s) => s.standards.join(', ')),
    highlight: true,
  },
  {
    label: 'Voltage selection (insulation)',
    values: productSystems.map((s) =>
      s.id === 'electrical-insulation' ? 'Class A 3.3kV · B 11kV · C 33kV' : '—'
    ),
  },
  {
    label: 'Typical applications',
    values: [
      'Substations · control rooms · panels',
      'Railway platforms · manufacturing floors',
      'Landfill lining · water-stop joints',
    ],
  },
  {
    label: 'Traceability marking',
    values: productSystems.map((s) =>
      s.id === 'electrical-insulation' ? 'Class · voltage · batch · BIS lic.' : 'Batch · product code'
    ),
  },
];

const features: Array<{ label: string; matches: boolean[] }> = [
  {
    label: 'Tested to Indian Standard',
    matches: [true, true, true],
  },
  {
    label: 'Suitable for outdoor use',
    matches: [false, true, true],
  },
  {
    label: 'Custom dimensions available',
    matches: [true, true, true],
  },
  {
    label: 'On-site installation support',
    matches: [false, false, true],
  },
];

export function CompareDialog({ open, onOpenChange }: CompareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl max-h-[92vh] overflow-y-auto bg-ivory-light">
        <DialogHeader>
          <span className="text-eyebrow">Comparison</span>
          <DialogTitle className="text-navy text-2xl mt-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Compare product systems side-by-side.
          </DialogTitle>
          <DialogDescription className="text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Use this overview to identify which system matches your project requirement. For full specifications, open the individual product detail.
          </DialogDescription>
        </DialogHeader>

        {/* Comparison grid */}
        <div className="overflow-x-auto -mx-2 px-2 pb-2">
          <table className="w-full border-separate border-spacing-0 min-w-[820px]">
            <colgroup>
              <col className="w-44" />
              <col className="w-1/4" />
              <col className="w-1/4" />
              <col className="w-1/4" />
            </colgroup>
            {/* Header row with product cards */}
            <thead>
              <tr>
                <th className="sticky left-0 bg-ivory-light z-10 align-bottom text-left p-3" aria-label="Property" />
                {productSystems.map((s) => (
                  <th key={s.id} className="align-top p-3">
                    <div className="rounded-2xl overflow-hidden border border-border bg-white">
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          src={s.image}
                          alt={s.name}
                          fill
                          className="object-cover"
                          sizes="240px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3">
                          <span
                            className="text-[0.7rem] font-semibold text-white block leading-tight"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                          >
                            {s.index} · {s.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx % 2 === 0 ? 'bg-white/60' : 'bg-transparent'}
                >
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 text-left align-top p-3 text-xs font-semibold uppercase tracking-wider text-navy border-t border-border/60 ${
                      row.highlight ? 'bg-orange-soft' : 'bg-inherit'
                    }`}
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {row.label}
                  </th>
                  {row.values.map((val, i) => (
                    <td
                      key={i}
                      className={`align-top p-3 text-sm text-steel border-t border-border/60 break-words ${
                        row.highlight ? 'bg-orange-soft/40' : ''
                      }`}
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      <span className="block whitespace-normal">{val}</span>
                    </td>
                  ))}
                </tr>
              ))}

              {/* Features checklist section */}
              <tr>
                <th
                  scope="row"
                  colSpan={4}
                  className="text-left p-3 pt-6 text-xs font-semibold uppercase tracking-wider text-navy"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Capabilities
                </th>
              </tr>
              {features.map((feat, idx) => (
                <tr key={feat.label} className={idx % 2 === 0 ? 'bg-white/60' : 'bg-transparent'}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 text-left align-middle p-3 text-sm font-medium text-navy border-t border-border/60 bg-inherit"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {feat.label}
                  </th>
                  {feat.matches.map((m, i) => (
                    <td
                      key={i}
                      className="align-middle p-3 border-t border-border/60"
                    >
                      {m ? (
                        <span className="inline-flex items-center gap-1.5 text-sm text-navy" style={{ fontFamily: "'Manrope', sans-serif" }}>
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-soft">
                            <Check className="size-3 text-orange" />
                          </span>
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted">
                            <Minus className="size-3 text-steel" />
                          </span>
                          N/A
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          className="text-xs text-steel mt-4 pt-4 border-t border-border"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Need help choosing? <span className="text-orange font-medium">Request a technical quote</span> and our team will recommend a system based on your operating voltage and installation environment.
        </p>
      </DialogContent>
    </Dialog>
  );
}
