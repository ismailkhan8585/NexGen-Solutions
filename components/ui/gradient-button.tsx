import { cn } from '@/lib/utils';

export function GradientButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'min-h-[44px] rounded-xl bg-white text-surface font-semibold',
        'px-6 py-3 transition duration-200',
        'hover:bg-cyan-50 hover:shadow-[0_16px_35px_-20px_rgba(34,211,238,.55)]',
        'active:translate-y-px',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
}
