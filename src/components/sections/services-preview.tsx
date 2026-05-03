'use client';

import { motion } from 'framer-motion';
import { Palette, Video, Sparkles, Globe, Share2, BookOpen, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import GlassCard from '@/components/ui-extensions/glass-card';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GradientButton from '@/components/ui-extensions/gradient-button';

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
};

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="[ OUR SERVICES ]"
          title="Everything You Need to Grow Online"
          subtitle="Comprehensive digital solutions tailored to elevate your brand and accelerate your growth."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover glow className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <a
                    href={`/services/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors duration-200 hover:text-[#6D28D9]"
                  >
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GradientButton href="/services" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            View All Services
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
