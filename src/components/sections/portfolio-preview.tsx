'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GradientButton from '@/components/ui-extensions/gradient-button';

const categoryColors: Record<string, string> = {
  Branding: 'bg-white/20 text-white',
  Video: 'bg-white/20 text-white',
  Web: 'bg-white/20 text-white',
  'Social Media': 'bg-white/20 text-white',
  'AI Creations': 'bg-white/20 text-white',
};

export default function PortfolioPreview() {
  const [projects, setProjects] = useState(PORTFOLIO_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/public/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setProjects(data);
          }
        }
      } catch {
        // Keep fallback
      }
    };
    fetchProjects();
  }, []);

  const featuredProjects = projects.slice(0, 6);

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
              {/* Background - Image or Gradient */}
              {project.imageUrl && project.imageUrl.trim() !== '' ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-violet/20 via-brand-cyan/10 to-brand-violet/5 transition-transform duration-500 group-hover:scale-[1.03]" />
              )}

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 transition-all duration-300 group-hover:from-black/75 group-hover:via-black/30">
                {/* Category badge */}
                <span
                  className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${categoryColors[project.category] || 'bg-white/20 text-white'}`}
                >
                  {project.category}
                </span>

                <h3 className="font-heading text-lg font-bold text-white drop-shadow-lg">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70 drop-shadow">{project.client}</p>

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
