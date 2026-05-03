'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Target,
  Eye,
  Lightbulb,
  Coins,
  Rocket,
  Shield,
  Twitter,
  Linkedin,
  ArrowRight,
  ChevronRight,
  Home,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GlassCard from '@/components/ui-extensions/glass-card';
import GradientButton from '@/components/ui-extensions/gradient-button';
import AnimatedCounter from '@/components/ui-extensions/animated-counter';
import { TEAM_MEMBERS } from '@/lib/constants';

/* ────────────────────────── Data ────────────────────────── */

const MILESTONES = [
  {
    year: '2021',
    title: 'The Beginning',
    description:
      'iDilsh Network founded with a passion for design and a dream to make premium digital services accessible to all.',
  },
  {
    year: '2022',
    title: 'First International Client',
    description:
      'Expanded beyond Sri Lanka, securing our first client from the United States. Our global journey had begun.',
  },
  {
    year: '2023',
    title: 'Service Expansion',
    description:
      'Added video editing and AI-powered design services to our portfolio, becoming a truly full-service digital agency.',
  },
  {
    year: '2024',
    title: 'Growing Team & Client Base',
    description:
      'Team expanded to include specialists in every discipline. Client count surpassed 15+ projects across 5+ countries.',
  },
  {
    year: '2025',
    title: 'Digital Transformation',
    description:
      'Launched comprehensive web design and social media management services, helping brands build complete digital ecosystems.',
  },
  {
    year: '2026',
    title: 'The Next Chapter',
    description:
      'Introducing our new website, AI-powered tools, and an expanded service suite designed for the future of digital.',
  },
];

const CORE_VALUES = [
  {
    title: 'Creativity',
    icon: Lightbulb,
    description:
      'We approach every project with fresh eyes and original thinking. No templates, no recycled ideas — just pure, purposeful creativity that sets your brand apart.',
  },
  {
    title: 'Affordability',
    icon: Coins,
    description:
      "Premium quality should be accessible to all. We've built our pricing model to deliver exceptional value without the premium agency price tag, making world-class design available to businesses of every size.",
  },
  {
    title: 'Innovation',
    icon: Rocket,
    description:
      "We stay ahead of the curve, leveraging the latest technologies — including AI — to deliver solutions that are not just current but future-ready. Innovation isn't a buzzword for us; it's a practice.",
  },
  {
    title: 'Integrity',
    icon: Shield,
    description:
      "Transparency, honesty, and reliability are the cornerstones of our relationships. We deliver what we promise, communicate openly, and always prioritize our clients' best interests.",
  },
];

const ABOUT_STATS = [
  { value: 5, suffix: '+', label: 'Years' },
  { value: 18, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Countries' },
  { value: 100, suffix: '%', label: 'Dedication' },
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
            <li className="font-medium text-brand-violet">About</li>
          </ol>
        </nav>

        <motion.h1
          className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          The Story Behind{' '}
          <span className="text-brand-violet">iDilsh</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          From a passion project to a global digital agency — here&apos;s our journey
        </motion.p>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionHeading
              tag="Our Story"
              title="How It All Started"
              align="left"
            />

            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Founded with a simple yet powerful belief — that exceptional digital design shouldn&apos;t come with an exceptional price tag. iDilsh Network was born from the creative vision of a team that recognized a glaring gap in the market: businesses around the world deserved access to premium, agency-quality design without the premium agency price tag.
            </p>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              What started as a small freelance operation has grown into a full-service digital agency serving clients across multiple continents. Our journey has been fueled by an unwavering commitment to quality, a passion for creative excellence, and a deep understanding of what brands need to thrive in the digital landscape.
            </p>

            {/* Pull quote */}
            <blockquote className="mt-8 border-l-4 border-brand-violet pl-6">
              <p className="text-lg font-medium italic leading-relaxed text-slate-800 md:text-xl">
                Every pixel we place, every frame we edit, and every strategy we craft is driven by one goal: to help our clients stand out, connect with their audiences, and achieve measurable growth. We don&apos;t just create deliverables — we build digital legacies.
              </p>
            </blockquote>
          </motion.div>

          {/* Right: Decorative element */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <div className="relative h-80 w-full sm:h-96 lg:h-[28rem]">
              {/* Abstract gradient circles */}
              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-violet/20 to-brand-cyan/20 blur-sm" />
              <div className="absolute left-1/3 top-1/3 h-40 w-40 rounded-full bg-gradient-to-tr from-brand-violet/30 to-brand-violet-light/60" />
              <div className="absolute right-1/4 bottom-1/4 h-32 w-32 rounded-full bg-gradient-to-bl from-brand-cyan/30 to-brand-cyan-light/60" />
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/4 -translate-y-1/4 rounded-full bg-brand-violet/15 backdrop-blur-sm" />

              {/* Decorative ring */}
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-brand-violet/15" />
              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-violet/10" />

              {/* Floating dots */}
              <motion.div
                className="absolute left-[20%] top-[15%] h-3 w-3 rounded-full bg-brand-violet/40"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute right-[25%] top-[25%] h-2 w-2 rounded-full bg-brand-cyan/50"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
              <motion.div
                className="absolute bottom-[20%] left-[30%] h-2.5 w-2.5 rounded-full bg-brand-violet/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-[30%] right-[20%] h-2 w-2 rounded-full bg-brand-cyan/40"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Purpose"
          title="Mission & Vision"
          subtitle="The driving force behind everything we do"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <GlassCard glow className="h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                To provide unique, high-quality digital products at the most affordable prices, empowering brands of all sizes to compete and win in the digital space. We believe that every business — from a local startup to a global enterprise — deserves access to world-class design and digital marketing services.
              </p>
            </GlassCard>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <GlassCard glow className="h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                To become the most trusted and accessible digital agency worldwide, known for transforming brands through creativity, innovation, and strategic thinking. We envision a future where geography and budget are no longer barriers to exceptional digital experiences.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Journey"
          title="Our Milestones"
          subtitle="A timeline of growth, innovation, and impact"
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-violet/60 via-brand-violet/30 to-brand-violet/10 md:left-1/2 md:-translate-x-0.5" />

          {MILESTONES.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={milestone.year}
                className="relative mb-10 last:mb-0 md:mb-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.1,
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-violet bg-white shadow-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-violet" />
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                  }`}
                >
                  <div className="rounded-xl border border-border/50 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <span className="inline-block rounded-md bg-brand-violet/10 px-2.5 py-0.5 font-mono text-sm font-semibold text-brand-violet">
                      {milestone.year}
                    </span>
                    <h4 className="mt-2 font-heading text-lg font-bold text-slate-900">
                      {milestone.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Principles"
          title="Our Core Values"
          subtitle="The foundation that guides every decision we make"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {CORE_VALUES.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                custom={index * 0.1}
                variants={fadeUp}
              >
                <GlassCard glow className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function TeamSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Our People"
          title="Meet the Minds Behind the Magic"
          subtitle="A passionate team dedicated to bringing your vision to life"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.1,
              }}
            >
              <GlassCard className="text-center">
                {/* Avatar with initials */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-[#6D28D9] text-2xl font-bold text-white shadow-lg shadow-brand-violet/20">
                  {getInitials(member.name)}
                </div>

                <h4 className="mt-4 font-heading text-lg font-bold text-slate-900">
                  {member.name}
                </h4>
                <p className="mt-0.5 text-sm font-medium text-brand-violet">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

                {/* Social links */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
                    aria-label={`${member.name} on Twitter`}
                  >
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section className="bg-brand-violet-light/40 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-0 sm:divide-x sm:divide-brand-violet/15">
          {ABOUT_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center px-8 py-2 sm:first:pl-0 sm:last:pr-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="text-3xl font-bold text-brand-violet sm:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Want to work with us?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Let&apos;s turn your ideas into reality. Get in touch and let&apos;s start building something amazing together.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GradientButton
            href="/contact"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Let&apos;s Talk
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Page ──────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero />
      <OurStory />
      <MissionVision />
      <Timeline />
      <CoreValues />
      <TeamSection />
      <StatsBanner />
      <CTASection />
      <Footer />
    </main>
  );
}
