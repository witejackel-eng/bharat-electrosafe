import { Zap, Building2, TrainFront, Droplets, Factory, HardHat } from 'lucide-react';

const industries = [
  {
    icon: Zap,
    name: 'Power utilities',
    product: 'Insulating Mats',
  },
  {
    icon: Building2,
    name: 'Substations and switchrooms',
    product: 'Insulating Mats',
  },
  {
    icon: TrainFront,
    name: 'Railways and metro',
    product: 'Auto-Glow Mats',
  },
  {
    icon: Droplets,
    name: 'Oil and gas',
    product: 'Insulating Mats',
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    product: 'Coloured Strip Mats',
  },
  {
    icon: HardHat,
    name: 'Infrastructure and construction',
    product: 'BharatMembrane',
  },
];

export function IndustriesApplications() {
  return (
    <section id="industries-applications" className="bg-warm-white py-16 md:py-20">
      <div className="container-site">
        {/* Heading */}
        <h2 className="text-section-h2 text-charcoal-950 mb-4">
          Industries and applications
        </h2>
        <p className="text-body text-grey-600 mb-10">
          Our products serve critical sectors across Indian power, rail, industry and infrastructure.
        </p>

        {/* ── Compact Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-4 p-5 border border-grey-300/50 rounded-md bg-white hover:border-yellow-500/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
                <item.icon className="size-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-charcoal-950 mb-1">
                  {item.name}
                </h3>
                <span className="text-small-meta text-grey-600">
                  {item.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
