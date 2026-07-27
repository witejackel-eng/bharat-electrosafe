import { cn } from '@/lib/utils';

interface EmptyMediaFallbackProps {
  label?: string;
  slotId?: string;
  className?: string;
}

export function EmptyMediaFallback({
  label,
  slotId,
  className,
}: EmptyMediaFallbackProps) {
  return (
    <div
      data-slot-id={slotId}
      className={cn(
        'relative flex flex-col items-center justify-center w-full h-full overflow-hidden',
        className
      )}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-be-cream via-be-yellow-50 to-be-cream" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--be-grey-650) 1px, transparent 1px), linear-gradient(90deg, var(--be-grey-650) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Slow pulse animation on grid */}
      <div
        className="absolute inset-0 opacity-[0.04] animate-pulse-slow"
        style={{
          backgroundImage:
            'linear-gradient(45deg, var(--be-yellow-400) 0, transparent 40%, transparent 60%, var(--be-yellow-400) 100%)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Inner shadow */}
      <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)]" />

      {/* Center content */}
      {label && (
        <div className="relative flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-be-charcoal-800 text-center px-6">
            {label}
          </span>
          {slotId && (
            <span className="text-[0.7rem] text-be-grey-400 tracking-wider uppercase">
              BE-{slotId}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
