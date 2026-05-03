'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Check,
  X,
  ArrowRight,
  ChevronRight,
  Home,
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  Package,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GlassCard from '@/components/ui-extensions/glass-card';
import GradientButton from '@/components/ui-extensions/gradient-button';
import { PRICING_TIERS, FAQ_ITEMS } from '@/lib/constants';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

/* ────────────────────────── Data ────────────────────────── */

const PROJECT_PRICING = [
  {
    name: 'Logo Design',
    price: '$49',
    description: 'Custom logo concepts with revisions and source files included.',
    icon: Palette,
  },
  {
    name: 'Video Editing',
    price: '$99',
    description: 'Professional video editing with transitions, effects, and color grading.',
    icon: Video,
  },
  {
    name: 'AI Creations',
    price: '$39',
    description: 'AI-powered content generation for unique digital assets.',
    icon: Sparkles,
  },
  {
    name: 'Website Design',
    price: '$199',
    description: 'Responsive website design with modern UI/UX and SEO optimization.',
    icon: Globe,
  },
  {
    name: 'Social Media Setup',
    price: '$149',
    description: 'Complete social media profile setup with branded templates.',
    icon: Share2,
  },
  {
    name: 'Brand Identity Package',
    price: '$99',
    description: 'Full brand identity including logo, colors, typography, and style guide.',
    icon: Package,
  },
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
            <li className="font-medium text-brand-violet">Pricing</li>
          </ol>
        </nav>

        <motion.h1
          className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Transparent Pricing.{' '}
          <span className="text-brand-violet">Real Value.</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          No hidden fees, no surprises. Choose the plan that fits your goals and let&apos;s get started.
        </motion.p>
      </div>
    </section>
  );
}

function PricingToggle({
  isProjectBased,
  onToggle,
}: {
  isProjectBased: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          !isProjectBased ? 'text-brand-violet' : 'text-muted-foreground'
        }`}
      >
        Monthly
      </span>
      <button
        role="switch"
        aria-checked={isProjectBased}
        aria-label="Toggle between monthly and project-based pricing"
        onClick={() => onToggle(!isProjectBased)}
        className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 ${
          isProjectBased ? 'bg-brand-violet' : 'bg-slate-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
            isProjectBased ? 'translate-x-7' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          isProjectBased ? 'text-brand-violet' : 'text-muted-foreground'
        }`}
      >
        Project-Based
      </span>
    </div>
  );
}

function MonthlyTiers() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {PRICING_TIERS.map((tier, index) => (
        <motion.div
          key={tier.name}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={index * 0.12}
          variants={fadeUp}
          className={`relative ${tier.popular ? 'md:-mt-4 md:mb-[-1rem]' : ''}`}
        >
          <GlassCard
            hover={!tier.popular && !(tier as { isProjectTier?: boolean }).isProjectTier}
            glow={tier.popular || (tier as { isProjectTier?: boolean }).isProjectTier}
            className={`h-full flex flex-col ${
              tier.popular
                ? 'border-brand-violet/30 shadow-[0_0_20px_rgba(124,58,237,0.12),0_0_40px_rgba(124,58,237,0.06)] md:py-8'
                : (tier as { isProjectTier?: boolean }).isProjectTier
                  ? 'border-brand-cyan/30 shadow-[0_0_20px_rgba(6,182,212,0.12),0_0_40px_rgba(6,182,212,0.06)]'
                  : ''
            }`}
          >
            {/* Popular badge */}
            {tier.popular && (
              <div className="mb-4 flex justify-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </span>
              </div>
            )}

            {/* Project tier badge */}
            {(tier as { isProjectTier?: boolean }).isProjectTier && (
              <div className="mb-4 flex justify-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-cyan px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                  Per Project
                </span>
              </div>
            )}

            {/* Plan name */}
            <h3
              className={`font-heading text-xl font-bold ${
                tier.popular ? 'text-brand-violet' : (tier as { isProjectTier?: boolean }).isProjectTier ? 'text-brand-cyan' : 'text-slate-900'
              }`}
            >
              {tier.name}
            </h3>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-slate-900 lg:text-5xl">
                {tier.price}
              </span>
              <span className="text-sm font-medium text-muted-foreground">{tier.period}</span>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>

            {/* Divider */}
            <div className="my-5 h-px bg-border/60" />

            {/* Features */}
            <ul className="space-y-3 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    (tier as { isProjectTier?: boolean }).isProjectTier ? 'bg-cyan-100' : 'bg-emerald-100'
                  }`}>
                    <Check className={`h-3 w-3 ${
                      (tier as { isProjectTier?: boolean }).isProjectTier ? 'text-cyan-600' : 'text-emerald-600'
                    }`} />
                  </span>
                  <span className="text-sm text-slate-700">{feature}</span>
                </li>
              ))}
              {tier.notIncluded.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <X className="h-3 w-3 text-slate-500" />
                  </span>
                  <span className="text-sm text-muted-foreground/70 line-through">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-6">
              <GradientButton
                href="/quote"
                variant={tier.popular ? 'primary' : 'secondary'}
                size="md"
                className="w-full"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Get Started
              </GradientButton>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectBasedPricing() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECT_PRICING.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={item.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={index * 0.08}
            variants={fadeUp}
          >
            <GlassCard glow className="h-full flex flex-col">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                <IconComponent className="h-5 w-5" />
              </div>

              <h3 className="font-heading text-lg font-bold text-slate-900">{item.name}</h3>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-xs text-muted-foreground">Starting from</span>
                <span className="font-heading text-2xl font-bold text-brand-violet">{item.price}</span>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <Link
                href="/quote"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors duration-200 hover:text-[#6D28D9]"
              >
                Get Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}

function CustomQuoteCTA() {
  return (
    <section className="bg-brand-violet-light/30 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-violet/10">
            <MessageCircle className="h-7 w-7 text-brand-violet" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            Need something custom?
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Every project is unique. Tell us what you need and we&apos;ll craft a tailored solution just for you.
          </p>
          <div className="mt-6">
            <GradientButton
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Let&apos;s Talk
            </GradientButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our pricing and services"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50 data-[state=open]:border-brand-violet/20 transition-colors duration-200"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-800 hover:text-brand-violet hover:no-underline data-[state=open]:text-brand-violet transition-colors duration-200">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground data-[state=open]:text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function GuaranteeBadge() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl rounded-2xl bg-brand-violet-light/40 border border-brand-violet/10 p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-900">
            Revision Guarantee
          </h3>
          <p className="mt-2 text-base text-muted-foreground">
            Revision guarantee on all projects — we&apos;re not done until you&apos;re delighted.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Page ──────────────────────── */

export default function PricingPage() {
  const [isProjectBased, setIsProjectBased] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero />

      {/* Pricing Toggle + Tiers Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <PricingToggle
              isProjectBased={isProjectBased}
              onToggle={setIsProjectBased}
            />
          </motion.div>

          {/* Pricing content with animation */}
          <AnimatePresence mode="wait">
            {!isProjectBased ? (
              <motion.div
                key="monthly"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <MonthlyTiers />
              </motion.div>
            ) : (
              <motion.div
                key="project"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ProjectBasedPricing />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CustomQuoteCTA />
      <FAQSection />
      <GuaranteeBadge />
      <Footer />
    </main>
  );
}
