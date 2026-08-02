import { cn } from '@/lib/utils';

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-brand-purple-400 to-brand-cyan-400 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}
