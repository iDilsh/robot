'use client';

import { motion } from 'framer-motion';
import { Palette, Video, Sparkles, Globe, Share2, BookOpen, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import SectionHeading from '@/components/ui-extensions/section-heading';

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <motion.a
                key={service.slug}
                href={`/services/${service.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative block rounded-2xl bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 p-6 shadow-[0_0_30px_-8px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_-8px_rgba(139,92,246,0.3)]"
              >
                {/* Icon container */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100/80 transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="h-5 w-5 text-violet-600" strokeWidth={1.5} />
                </div>

                {/* Title with gradient highlight bar */}
                <div className="inline-block bg-gradient-to-r from-[#FFFFFF] to-[#D6BDFF] px-2.5 py-[2px]">
                  <h3 className="font-heading text-lg font-bold text-slate-800 transition-colors duration-200 group-hover:text-violet-900">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>

                {/* Explore link */}
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-violet-700">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </motion.a>
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
          <a
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-600 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50 hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.2)]"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
