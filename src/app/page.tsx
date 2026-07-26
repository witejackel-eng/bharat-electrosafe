import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { HomeProductSystems } from '@/components/home/HomeProductSystems';
import { ProductSelection } from '@/components/home/ProductSelection';
import { HomeProofCentre } from '@/components/home/HomeProofCentre';
import { HomeApplications } from '@/components/home/HomeApplications';
import { FinalCTA } from '@/components/home/FinalCTA';

function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'dark' | 'accent' }) {
  if (variant === 'dark') {
    return (
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    );
  }
  if (variant === 'accent') {
    return (
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
        {/* Subtle texture strip */}
        <div
          className="mx-auto h-4 max-w-[1440px] opacity-[0.04]"
          style={{
            backgroundImage: 'url(/images/mat-texture.png)',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat-x',
          }}
        />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div
        className="mx-auto h-3 max-w-[1440px] opacity-[0.03]"
        style={{
          backgroundImage: 'url(/images/mat-texture.png)',
          backgroundSize: '150px',
          backgroundRepeat: 'repeat-x',
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Hero />
        <SectionDivider variant="accent" />
        <HomeProductSystems />
        <SectionDivider variant="default" />
        <ProductSelection />
        <SectionDivider variant="dark" />
        <HomeProofCentre />
        <SectionDivider variant="accent" />
        <HomeApplications />
        <SectionDivider variant="default" />
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
}
