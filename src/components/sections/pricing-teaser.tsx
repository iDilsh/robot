'use client';

import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import { PRICING_TIERS } from '@/lib/constants';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GradientButton from '@/components/ui-extensions/gradient-button';

export default function PricingTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Plans Made for Every Stage of Growth"
          subtitle="Flexible pricing that scales with your ambitions. No hidden fees, no surprises."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {PRICING_TIERS.map((tier, index) => {
            const isProjectTier = (tier as { isProjectTier?: boolean }).isProjectTier;
            return (
            <motion.div
              key={tier.name}
              className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                tier.popular
                  ? 'border-brand-violet bg-white shadow-[0_0_20px_rgba(124,58,237,0.12),0_10px_30px_rgba(0,0,0,0.08)] md:-mt-4 md:mb-0 md:pb-10 md:pt-10'
                  : isProjectTier
                    ? 'border-brand-cyan/40 bg-white shadow-[0_0_20px_rgba(6,182,212,0.10),0_10px_30px_rgba(0,0,0,0.06)]'
                    : 'border-border/50 bg-white shadow-sm'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-brand-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Project Tier Badge */}
              {isProjectTier && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-brand-cyan px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    Per Project
                  </span>
                </div>
              )}

              {/* Tier Name & Price */}
              <div className="text-center">
                <h3 className={`font-heading text-lg font-bold ${
                  isProjectTier ? 'text-brand-cyan' : 'text-slate-900'
                }`}>
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="font-heading text-4xl font-bold text-slate-900">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isProjectTier ? 'text-cyan-500' : 'text-emerald-500'
                    }`} />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
                {tier.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <span className="text-sm text-muted-foreground/70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <GradientButton
                  href="/quote"
                  variant={tier.popular ? 'primary' : 'secondary'}
                  className="w-full"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get Started
                </GradientButton>
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors duration-200 hover:text-[#6D28D9]"
          >
            See Full Pricing
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
