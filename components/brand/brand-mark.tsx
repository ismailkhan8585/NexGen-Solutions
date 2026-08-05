import { cn } from '@/lib/utils';

type BrandMarkProps = {
  className?: string;
  label: string;
  size?: 'sm' | 'md';
  tone?: 'light' | 'dark';
};

/** Replace this component with the approved brand asset when one is supplied. */
export function BrandMark({ className, label, size = 'md', tone = 'light' }: BrandMarkProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[28%] border font-display font-black leading-none tracking-[-0.12em] shadow-sm',
        size === 'sm' ? 'h-9 w-9 text-[13px]' : 'h-11 w-11 text-base',
        tone === 'light' ? 'border-white/80 bg-white text-[#090b0d]' : 'border-white/15 bg-[#0b0e10] text-white',
        className,
      )}
    >
      <span aria-hidden="true" className="relative z-10 -translate-x-[0.04em]">NG</span>
      <span aria-hidden="true" className="absolute inset-x-1.5 bottom-1 h-px bg-gradient-to-r from-brand-cyan-400 to-emerald-400" />
    </span>
  );
}
