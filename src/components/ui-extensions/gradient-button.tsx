'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export default function GradientButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  icon,
}: GradientButtonProps) {
  const baseClasses =
    'magnetic-btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-brand-violet to-[#6D28D9] text-white hover:from-[#8B5CF6] hover:to-brand-violet hover:scale-[1.03] hover:shadow-[0_10px_25px_rgba(124,58,237,0.25),0_4px_10px_rgba(124,58,237,0.15)] active:scale-[1.01] active:shadow-[0_4px_12px_rgba(124,58,237,0.2)]',
    secondary:
      'bg-white text-brand-violet border border-brand-violet/30 hover:bg-brand-violet hover:text-white hover:border-brand-violet hover:shadow-[0_8px_20px_rgba(124,58,237,0.2)] active:bg-[#6D28D9]',
    outline:
      'bg-transparent text-slate-600 border border-slate-300 hover:border-brand-violet hover:text-brand-violet hover:shadow-[0_4px_12px_rgba(124,58,237,0.1)]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  const content = (
    <>
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} type="button">
      {content}
    </button>
  );
}
