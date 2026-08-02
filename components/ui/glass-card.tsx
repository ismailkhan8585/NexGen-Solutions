import { cn } from '@/lib/utils';

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}
