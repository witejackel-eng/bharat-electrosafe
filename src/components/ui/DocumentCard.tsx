'use client';

import { Eye, Download } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TechnicalBadge } from './TechnicalBadge';
import { EmptyMediaFallback } from './EmptyMediaFallback';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

interface DocumentCardProps {
  type?: string;
  name: string;
  issuer?: string;
  reference?: string;
  previewUrl?: string;
  downloadUrl?: string;
  thumbnail?: string;
  className?: string;
}

export function DocumentCard({
  type,
  name,
  issuer,
  reference,
  previewUrl,
  downloadUrl,
  thumbnail,
  className,
}: DocumentCardProps) {
  return (
    <div
      className={cn(
        'hover-card-lift flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden',
        className
      )}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${type} — ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <EmptyMediaFallback label={name} slotId={`doc-${name}`} />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        {type && <TechnicalBadge label={type} />}

        <h3 className="text-card-title text-be-charcoal-950">{name}</h3>

        {issuer && (
          <p className="text-metadata text-be-grey-650">{issuer}</p>
        )}

        {reference && (
          <p className="text-metadata text-be-grey-400">{reference}</p>
        )}

        {/* Action buttons */}
        {(previewUrl || downloadUrl) && (
          <div className="flex flex-wrap gap-2 mt-1">
            {previewUrl && (
              <SecondaryButton
                href={previewUrl}
                className="text-sm px-4 py-2 min-h-[40px]"
              >
                <Eye className="h-4 w-4 mr-1.5" />
                Preview
              </SecondaryButton>
            )}
            {downloadUrl && (
              <PrimaryButton
                href={downloadUrl}
                className="text-sm px-4 py-2 min-h-[40px]"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Download PDF
              </PrimaryButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
