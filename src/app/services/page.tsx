'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
  Search,
  Target,
  Wand2,
  Send,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Home,
  Check,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GlassCard from '@/components/ui-extensions/glass-card';
import GradientButton from '@/components/ui-extensions/gradient-button';
import { SERVICES } from '@/lib/constants';

/* ────────────────────────── Data ────────────────────────── */

const serviceIconMap: Record<string, React.ElementType> = {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
};

const SERVICE_CARDS = [
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    icon: 'Palette',
    description:
      'Transform your brand with stunning visuals that capture attention and communicate your unique story. Our design team crafts every pixel with purpose, ensuring your brand stands out in a crowded marketplace.',
    features: ['Logo Design & Brand Identity', 'Business Cards & Stationery', 'Marketing Collateral', 'Social Media Graphics', 'Print & Digital Banners'],
  },
  {
    slug: 'video-animation',
    title: 'Video & Animation',
    icon: 'Video',
    description:
      'Bring your stories to life with dynamic video content and captivating animations. From promotional videos to explainer animations, we create visual narratives that engage, inform, and inspire action.',
    features: ['Promotional Videos', 'Motion Graphics', 'Explainer Animations', 'Social Media Reels', 'Product Demos'],
  },
  {
    slug: 'ai-creations',
    title: 'AI-Powered Creations',
    icon: 'Sparkles',
    description:
      'Harness the power of artificial intelligence to create unique, innovative digital content at unprecedented speed and scale. Our AI-enhanced workflow delivers creative solutions that push the boundaries of what\'s possible.',
    features: ['AI-Generated Artwork', 'AI-Enhanced Photo Editing', 'Content Generation', 'Style Transfer & Variations', 'Rapid Prototyping'],
  },
  {
    slug: 'web-design',
    title: 'Web Design',
    icon: 'Globe',
    description:
      'Build beautiful, high-performance websites that convert visitors into loyal customers. We design and develop responsive, SEO-optimized web experiences that reflect your brand and drive measurable business results.',
    features: ['Responsive Web Design', 'E-commerce Solutions', 'Landing Page Design', 'UI/UX Design', 'Website Redesign'],
  },
  {
    slug: 'social-media',
    title: 'Social Media Management',
    icon: 'Share2',
    description:
      'Grow your audience and engagement with strategic social media management. We handle content creation, scheduling, community engagement, and analytics — so you can focus on running your business.',
    features: ['Content Strategy & Planning', 'Post Creation & Scheduling', 'Community Management', 'Analytics & Reporting', 'Paid Campaign Management'],
  },
  {
    slug: 'guides',
    title: 'Free Guides',
    icon: 'BookOpen',
    description:
      'Access expert resources, tutorials, and guides designed to help you navigate the digital landscape. Knowledge is power, and we believe in sharing ours to help your brand thrive independently.',
    features: ['Brand Strategy Guides', 'Social Media Playbooks', 'Design Tutorials', 'Marketing Checklists', 'Industry Reports'],
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discover',
    icon: Search,
    description:
      'We dive deep into your brand, goals, audience, and competitive landscape to understand exactly what you need.',
  },
  {
    step: 2,
    title: 'Strategize',
    icon: Target,
    description:
      'Based on our research, we develop a tailored strategy that aligns creativity with your business objectives.',
  },
  {
    step: 3,
    title: 'Create',
    icon: Wand2,
    description:
      'Our team brings the strategy to life with meticulous attention to detail and creative excellence.',
  },
  {
    step: 4,
    title: 'Deliver',
    icon: Send,
    description:
      'We deliver polished, production-ready assets on time and on brand — every single time.',
  },
  {
    step: 5,
    title: 'Grow',
    icon: TrendingUp,
    description:
      'We measure results, gather feedback, and iterate to ensure continuous growth and improvement.',
  },
];

const TOOLS = [
  { name: 'Adobe Photoshop', color: '#31A8FF' },
  { name: 'Adobe Illustrator', color: '#FF9A00' },
  { name: 'Figma', color: '#A259FF' },
  { name: 'Canva', color: '#00C4CC' },
  { name: 'After Effects', color: '#9999FF' },
  { name: 'DaVinci Resolve', color: '#E44C30' },
  { name: 'Premiere Pro', color: '#9999FF' },
  { name: 'WordPress', color: '#21759B' },
  { name: 'Next.js', color: '#1e293b' },
  { name: 'ChatGPT', color: '#10A37F' },
  { name: 'Midjourney', color: '#0F172A' },
];

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
            <li className="font-medium text-brand-violet">Services</li>
          </ol>
        </nav>

        <motion.h1
          className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Full-Stack Digital Solutions{' '}
          <span className="text-brand-violet">for Modern Brands</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          From brand identity to AI-powered content — we&apos;ve got every angle of your digital presence covered.
        </motion.p>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="What We Do"
          title="Our Services"
          subtitle="Comprehensive digital solutions tailored to elevate your brand and drive real results."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {SERVICE_CARDS.map((service, index) => {
            const IconComponent = serviceIconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={index * 0.1}
                variants={fadeUp}
              >
                <GlassCard glow className="h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-violet/10 text-brand-violet transition-colors duration-300 group-hover:bg-brand-violet group-hover:text-white">
                    <IconComponent className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-5 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check className="h-4 w-4 shrink-0 text-brand-violet" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors duration-200 hover:text-[#6D28D9] group/link"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="How We Work"
          title="Our Process"
          subtitle="A proven methodology that transforms ideas into impactful results."
        />

        {/* Desktop: Horizontal layout */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting dotted line */}
            <div className="absolute left-0 right-0 top-10 h-0.5 border-t-2 border-dashed border-brand-violet/25" />

            <div className="grid grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: index * 0.12,
                    }}
                  >
                    {/* Step circle */}
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-brand-violet/10 transition-all duration-300 hover:shadow-lg hover:ring-brand-violet/25">
                      <IconComponent className="h-8 w-8 text-brand-violet" />
                    </div>

                    {/* Step number */}
                    <span className="mt-3 inline-block rounded-md bg-brand-violet/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-brand-violet">
                      Step {step.step}
                    </span>

                    {/* Title */}
                    <h4 className="mt-2 font-heading text-lg font-bold text-slate-900">
                      {step.title}
                    </h4>

                    {/* Description */}
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="relative md:hidden">
          {/* Vertical connecting line */}
          <div className="absolute left-10 top-0 h-full w-0.5 bg-gradient-to-b from-brand-violet/40 via-brand-violet/25 to-brand-violet/10" />

          <div className="space-y-8">
            {PROCESS_STEPS.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="relative flex gap-5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.1,
                  }}
                >
                  {/* Step circle */}
                  <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-brand-violet/10">
                    <IconComponent className="h-8 w-8 text-brand-violet" />
                  </div>

                  <div className="pt-2">
                    <span className="inline-block rounded-md bg-brand-violet/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-brand-violet">
                      Step {step.step}
                    </span>
                    <h4 className="mt-1.5 font-heading text-lg font-bold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Our Toolkit"
          title="Tools We Trust"
          subtitle="We leverage the best tools in the industry to deliver exceptional results."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-6">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.05,
              }}
            >
              <div className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-violet/20">
                <div
                  className="h-4 w-4 rounded-full shadow-sm"
                  style={{ backgroundColor: tool.color }}
                />
                <span className="text-sm font-medium text-slate-700">{tool.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-brand-violet-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Not sure what you need?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          We&apos;ll help you figure it out. Get a free consultation and let our experts guide you to the right solution.
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
            Get a Free Consultation
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Page ──────────────────────── */

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero />
      <ServicesGrid />
      <ProcessSection />
      <ToolsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
