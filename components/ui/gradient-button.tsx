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
        'bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl font-semibold',
        'px-6 py-3 transition-all duration-200',
        'hover:shadow-lg hover:shadow-brand-purple-500/30 hover:scale-[1.02]',
        'active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        className
      )}
    >
      {children}
    </button>
  );
}
