'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl border border-border/50 bg-white/80 p-6 backdrop-blur-md transition-all duration-300',
        'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.03)]',
        hover && 'hover:-translate-y-1 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-4px_rgba(0,0,0,0.04)]',
        hover && glow && 'hover:border-brand-violet/25 hover:shadow-[0_0_15px_rgba(124,58,237,0.1),0_0_30px_rgba(124,58,237,0.05),0_10px_15px_-3px_rgba(0,0,0,0.07)]',
        !hover && glow && 'border-brand-violet/20 shadow-[0_0_15px_rgba(124,58,237,0.1),0_0_30px_rgba(124,58,237,0.05)]',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
