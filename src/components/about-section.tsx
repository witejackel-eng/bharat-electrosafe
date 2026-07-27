'use client';

import { useState } from 'react';
import { Users, Target, Eye, HandHeart, Award, Handshake, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { leaders, companyValues, type Leader } from '@/data/team';
import { company } from '@/data/company';

const valueIcons = [Eye, Target, HandHeart, Award, Handshake, Users];

function LeaderCard({ leader, onOpen }: { leader: Leader; onOpen: () => void }) {
  const initials = leader.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <article className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
      {/* Avatar placeholder — asset slot */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-lg font-semibold text-stone-500"
        data-asset-slot={`asset-slot-leader-${leader.name.split(' ')[0].toLowerCase()}`}
        aria-label={`${leader.name} photo placeholder`}
      >
        {initials}
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{leader.name}</h3>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-amber-600">
        {leader.role}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {leader.shortBio}
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpen}
        className="mt-3 h-8 text-xs"
      >
        View full profile
      </Button>
    </article>
  );
}

function LeaderDialog({ leader, open, onOpenChange }: {
  leader: Leader | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!leader) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{leader.name}</DialogTitle>
          <DialogDescription className="font-medium uppercase tracking-wider text-amber-600">
            {leader.role}
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {leader.fullProfile}
        </p>
        <DialogClose asChild>
          <Button variant="outline" size="sm">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function AboutSection() {
  const [selected, setSelected] = useState<Leader | null>(null);

  return (
    <section id="about" className="scroll-mt-16 bg-stone-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            About Us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Engineering safety, building trust
          </h2>
          <p className="mt-4 text-muted-foreground">
            {company.name} is a manufacturer of electrical insulating mats and
            engineered PVC membranes, serving industrial, civil and
            environmental sectors across India and overseas. Our products carry
            the certifications we publish — {company.certifications.isiStandard},{' '}
            {company.certifications.cmL}, and conform to {company.certifications.iec}.
          </p>
        </div>

        {/* Leadership */}
        <div className="mt-12">
          <h3 className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Users className="h-4 w-4 text-amber-600" aria-hidden="true" />
            Leadership
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l) => (
              <LeaderCard key={l.name} leader={l} onOpen={() => setSelected(l)} />
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h3 className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Building2 className="h-4 w-4 text-amber-600" aria-hidden="true" />
            Our Values
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companyValues.map((v, i) => {
              const Icon = valueIcons[i] ?? Target;
              return (
                <div
                  key={v.title}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-100 text-amber-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h4 className="text-sm font-semibold text-foreground">{v.title}</h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <LeaderDialog
        leader={selected}
        open={selected !== null}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </section>
  );
}
