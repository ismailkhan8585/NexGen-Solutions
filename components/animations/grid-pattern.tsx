import { cn } from '@/lib/utils';

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute inset-0 grid-pattern opacity-50 pointer-events-none',
        className
      )}
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 70%)',
      }}
    />
  );
}
