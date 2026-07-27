'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { EmptyMediaFallback } from './EmptyMediaFallback';

interface ImageFrameProps {
  src?: string;
  alt: string;
  slotId?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  className?: string;
  objectPosition?: string;
}

const aspectRatioClasses = {
  landscape: 'aspect-[16/10]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

export function ImageFrame({
  src,
  alt,
  slotId,
  aspectRatio = 'landscape',
  className,
  objectPosition = 'center',
}: ImageFrameProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = src && !hasError;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-be-grey-250',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            'hover-image-scale object-cover',
          )}
          style={{ objectPosition }}
          onError={() => setHasError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1360px) 50vw, 680px"
        />
      ) : (
        <EmptyMediaFallback
          label={alt}
          slotId={slotId}
        />
      )}
    </div>
  );
}
