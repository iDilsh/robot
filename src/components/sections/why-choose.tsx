'use client';

import { motion } from 'framer-motion';
import { Lightbulb, DollarSign, Zap, Globe } from 'lucide-react';
import SectionHeading from '@/components/ui-extensions/section-heading';

const differentiators = [
  {
    icon: Lightbulb,
    title: 'Creative First',
    description:
      'Unique, original designs crafted specifically for your brand. No templates, no shortcuts — every project is a masterpiece.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description:
      'Premium quality doesn\'t require premium prices. We deliver exceptional work at prices that make sense for growing businesses.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description:
      'Efficient workflows and dedicated teams mean your projects are delivered on time, every time — without sacrificing quality.',
  },
  {
    icon: Globe,
    title: 'Global Experience',
    description:
      'Clients across multiple countries and industries. We understand diverse markets and deliver designs that resonate universally.',
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-brand-violet/[0.03] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose iDilsh?"
          subtitle="What sets us apart from every other digital agency out there."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {differentiators.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-violet/15"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
