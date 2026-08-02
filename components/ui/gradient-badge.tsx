import { cn } from '@/lib/utils';

export function GradientBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-4 py-1.5 rounded-full',
        'bg-surface-card border border-brand-purple-500/30',
        'text-sm font-medium text-ink-secondary',
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500" />
      {children}
    </span>
  );
}
