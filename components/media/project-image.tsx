'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { isSupportedImageUrl } from '@/lib/images';
import { cn } from '@/lib/utils';

export function ProjectImage({ src, alt, sizes, priority = false, className }: { src: string | null | undefined; alt: string; sizes: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!isSupportedImageUrl(src) || failed) {
    return <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.12),transparent_45%),linear-gradient(145deg,rgba(124,58,237,.12),rgba(15,23,42,.9))] p-5 text-center" role="img" aria-label={alt}><ImageIcon className="h-8 w-8 text-ink-muted" aria-hidden="true"/><span className="mt-3 max-w-xs text-xs leading-5 text-ink-muted">{alt}</span></div>;
  }
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} quality={82} onError={() => setFailed(true)} className={cn('object-cover', className)} />;
}
