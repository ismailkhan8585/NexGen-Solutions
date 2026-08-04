import type { ReactNode } from 'react';

export function StaggerList({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={className} data-stagger={stagger}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <div className={className} data-offset={y}>
      {children}
    </div>
  );
}
