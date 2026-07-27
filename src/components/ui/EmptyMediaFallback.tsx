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
        'relative flex items-center justify-center w-full h-full bg-be-cream overflow-hidden',
        className
      )}
    >
      {/* Diagonal line pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--be-grey-650) 0, var(--be-grey-650) 1px, transparent 0, transparent 12px)',
        }}
      />
      {/* Center label */}
      {label && (
        <span className="relative text-metadata text-be-grey-650 font-medium text-center px-4">
          {label}
        </span>
      )}
    </div>
  );
}
