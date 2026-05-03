import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  gold?: boolean;
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  className,
  gold = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {tag && (
        <span
          className={cn(
            'mb-3 inline-block font-mono text-sm font-medium uppercase tracking-wider',
            gold ? 'text-brand-gold' : 'text-brand-violet'
          )}
        >
          {tag}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl',
          align === 'center' && 'mx-auto'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-lg text-muted-foreground',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
