'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GradientButton from '@/components/ui-extensions/gradient-button';

const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 6);

const categoryColors: Record<string, string> = {
  Branding: 'bg-brand-violet/10 text-brand-violet',
  Video: 'bg-brand-cyan/10 text-brand-cyan',
  Web: 'bg-emerald-500/10 text-emerald-600',
  'Social Media': 'bg-amber-500/10 text-amber-600',
  'AI Creations': 'bg-pink-500/10 text-pink-600',
};

export default function PortfolioPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="[ SELECTED WORK ]"
          gold
          title="Projects That Speak Louder Than Words"
          subtitle="A curated showcase of our finest work across branding, video, web, and social media."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Gradient placeholder background */}
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-violet/20 via-brand-cyan/10 to-brand-violet/5 transition-transform duration-500 group-hover:scale-[1.03]" />

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 transition-all duration-300 group-hover:from-black/75 group-hover:via-black/30">
                {/* Category badge */}
                <span
                  className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium ${categoryColors[project.category] || 'bg-slate-500/10 text-slate-600'}`}
                >
                  {project.category}
                </span>

                <h3 className="font-heading text-lg font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70">{project.client}</p>

                {/* Hidden details that show on hover */}
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/60 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GradientButton href="/portfolio" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            View Full Portfolio
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
