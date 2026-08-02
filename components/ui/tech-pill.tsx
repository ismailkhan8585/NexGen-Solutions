import { cn } from '@/lib/utils';

export function TechPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-md',
        'bg-surface-hover border border-surface-border',
        'text-xs font-mono text-ink-secondary',
        className
      )}
    >
      {children}
    </span>
  );
}
