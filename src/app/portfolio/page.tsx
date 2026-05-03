'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import GradientButton from '@/components/ui-extensions/gradient-button';
import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/* ────────────────────────── Data ────────────────────────── */

interface PortfolioProject {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  published: boolean;
}

const CATEGORIES = [
  'All',
  'Branding',
  'Video',
  'Web',
  'Social Media',
  'AI Creations',
] as const;

type Category = (typeof CATEGORIES)[number];

const PROJECT_GRADIENTS: Record<number, string> = {
  1: 'from-violet-500 to-purple-600',
  2: 'from-cyan-500 to-blue-600',
  3: 'from-violet-600 to-cyan-500',
  4: 'from-amber-500 to-orange-600',
  5: 'from-emerald-500 to-teal-600',
  6: 'from-rose-500 to-pink-600',
  7: 'from-indigo-500 to-violet-600',
  8: 'from-cyan-600 to-emerald-500',
};

/* ────────────────────── Animation helpers ────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

/* ──────────────────────── Sections ──────────────────────── */

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-violet-light/60 via-brand-violet-light/20 to-white pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-violet/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-brand-cyan/5 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand-violet">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-brand-violet">Portfolio</li>
          </ol>
        </nav>

        <motion.h1
          className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Work That We&apos;re{' '}
          <span className="text-brand-violet">Proud Of</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          Every project is a story of creativity, strategy, and results. Explore our latest work.
        </motion.p>
      </div>
    </section>
  );
}

function FilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: Category;
  onFilterChange: (category: Category) => void;
}) {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:pb-0">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category}
              onClick={() => onFilterChange(category)}
              className={cn(
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer',
                activeFilter === category
                  ? 'bg-brand-violet text-white shadow-md shadow-brand-violet/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-brand-violet/10 hover:text-brand-violet'
              )}
              whileHover={activeFilter !== category ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.97 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const gradient = PROJECT_GRADIENTS[project.id] || 'from-violet-500 to-purple-600';
  const hasImage = project.imageUrl && project.imageUrl.trim() !== '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.06,
      }}
      className="group relative overflow-hidden rounded-2xl"
    >
      <div
        className={cn(
          'relative aspect-[4/3] w-full',
          hasImage ? '' : 'bg-gradient-to-br ' + gradient
        )}
      >
        {/* Uploaded Image */}
        {hasImage && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Decorative shapes (only for gradient fallback) */}
        {!hasImage && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-sm" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/8 blur-sm" />
            <div className="absolute right-1/4 top-1/3 h-16 w-16 rounded-full bg-white/5" />
          </div>
        )}

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          {/* Category Badge */}
          <span className={cn(
            'mb-auto inline-flex self-start rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm',
            hasImage ? 'bg-black/40 text-white' : 'bg-white/20 text-white'
          )}>
            {project.category}
          </span>

          {/* Project Name */}
          <h3 className={cn(
            'font-heading text-xl font-bold sm:text-2xl',
            hasImage ? 'text-white drop-shadow-lg' : 'text-white'
          )}>
            {project.title}
          </h3>

          {/* Client Name */}
          <p className={cn(
            'mt-1 text-sm',
            hasImage ? 'text-white/90 drop-shadow' : 'text-white/80'
          )}>
            {project.client}
          </p>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
        >
          <motion.div
            className="px-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm leading-relaxed text-white/90">
              {project.description}
            </p>
            <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {project.category}
            </span>
          </motion.div>
        </motion.div>

        {/* Hover Scale (only for gradient cards) */}
        {!hasImage && (
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        )}
      </div>
    </motion.div>
  );
}

function PortfolioGrid({ activeFilter, projects }: { activeFilter: Category; projects: PortfolioProject[] }) {
  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <p className="text-lg text-muted-foreground">
              No projects found in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Love what you see?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Let&apos;s build something just as amazing for your brand.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GradientButton
            href="/quote"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Get a Free Quote
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Page ──────────────────────── */

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/public/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setProjects(data);
          } else {
            setProjects(PORTFOLIO_PROJECTS as unknown as PortfolioProject[]);
          }
        } else {
          setProjects(PORTFOLIO_PROJECTS as unknown as PortfolioProject[]);
        }
      } catch {
        setProjects(PORTFOLIO_PROJECTS as unknown as PortfolioProject[]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <PortfolioGrid activeFilter={activeFilter} projects={projects} />
      <CTASection />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
