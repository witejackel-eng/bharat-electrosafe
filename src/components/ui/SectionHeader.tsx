import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  supportingText?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  supportingText,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={cn('flex flex-col gap-4', alignment, className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-section-h2 text-be-charcoal-950">{title}</h2>
      {supportingText && (
        <p className="text-body-large text-be-grey-650 max-w-2xl">{supportingText}</p>
      )}
    </div>
  );
}
