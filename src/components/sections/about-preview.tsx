'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { STATS } from '@/lib/constants';
import AnimatedCounter from '@/components/ui-extensions/animated-counter';
import GradientButton from '@/components/ui-extensions/gradient-button';

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="absolute -left-4 top-0 h-full w-1 rounded-full bg-brand-violet md:-left-6" />
            <h2 className="font-heading text-3xl font-bold leading-snug text-slate-900 sm:text-4xl lg:text-5xl">
              We don&apos;t just design.
              <br />
              <span className="text-brand-violet">We build digital legacies.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every pixel has purpose. Every strategy has intent.
            </p>
          </motion.div>

          {/* Right: Description + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              iDilsh Network is a premium digital agency rooted in creativity and driven by results.
              From brand identity to web design, social media management to AI-powered content —
              we craft digital experiences that resonate, engage, and convert. Based in Sri Lanka,
              serving clients across the globe with affordable excellence and unwavering commitment
              to quality.
            </p>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl border border-border/50 bg-white p-4 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="text-2xl font-bold text-brand-violet sm:text-3xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <GradientButton href="/about" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
                Learn Our Story
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
