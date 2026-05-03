'use client';

import { use, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Home,
  ExternalLink,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SectionHeading from '@/components/ui-extensions/section-heading';
import GlassCard from '@/components/ui-extensions/glass-card';
import GradientButton from '@/components/ui-extensions/gradient-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SERVICES, PORTFOLIO_PROJECTS } from '@/lib/constants';

/* ────────────────────────── Types ────────────────────────── */

interface Feature {
  title: string;
  desc: string;
}

interface ProcessStep {
  step: number;
  title: string;
  desc: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface ServiceDetail {
  heroDescription: string;
  features: Feature[];
  process: ProcessStep[];
  startingPrice: string;
  faqs: FAQ[];
}

/* ────────────────────────── Data ────────────────────────── */

const serviceIconMap: Record<string, React.ElementType> = {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
};

const portfolioCategoryMap: Record<string, string[]> = {
  'graphic-design': ['Branding'],
  'video-animation': ['Video'],
  'ai-creations': ['AI Creations'],
  'web-design': ['Web'],
  'social-media': ['Social Media'],
  'guides': [],
};

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'graphic-design': {
    heroDescription: 'Transform your brand with stunning visuals that capture attention and communicate your unique story.',
    features: [
      { title: 'Logo Design & Brand Identity', desc: 'Custom-crafted logos and complete brand identity systems that make your business instantly recognizable and memorable.' },
      { title: 'Business Cards & Stationery', desc: 'Professional stationery designs that leave a lasting impression on every client and partner you meet.' },
      { title: 'Marketing Collateral', desc: 'Brochures, flyers, banners, and promotional materials designed to drive engagement and conversions.' },
      { title: 'Social Media Graphics', desc: 'Scroll-stopping social media visuals optimized for every platform to maximize your reach and engagement.' },
      { title: 'Print & Digital Banners', desc: 'High-impact banner designs for both print and digital advertising campaigns.' },
    ],
    process: [
      { step: 1, title: 'Brand Discovery', desc: 'We learn about your brand values, target audience, and competitive landscape.' },
      { step: 2, title: 'Concept Development', desc: 'We create multiple unique design concepts for your review and feedback.' },
      { step: 3, title: 'Refinement', desc: 'Based on your feedback, we refine the chosen concept to perfection.' },
      { step: 4, title: 'Final Delivery', desc: 'We deliver all files in every format you\'ll need, along with a brand style guide.' },
    ],
    startingPrice: '$49',
    faqs: [
      { q: 'How many logo concepts do you provide?', a: 'We typically provide 3 unique logo concepts for you to choose from. Each concept is developed from scratch based on your brand brief and research — never from templates.' },
      { q: 'What file formats will I receive?', a: 'You\'ll receive your designs in all major formats including AI, EPS, SVG, PNG, JPG, and PDF. We also provide a brand style guide with color codes and typography specifications.' },
      { q: 'Do you offer revisions?', a: 'Yes! Our packages include revision rounds. We work collaboratively with you to ensure the final design exceeds your expectations.' },
      { q: 'Can you redesign my existing brand?', a: 'Absolutely! Brand refreshes and redesigns are one of our specialties. We can evolve your existing identity or create a completely new direction.' },
    ],
  },
  'video-animation': {
    heroDescription: 'Bring your stories to life with dynamic video content and captivating animations that engage, inform, and inspire.',
    features: [
      { title: 'Promotional Videos', desc: 'High-impact promotional content that showcases your products, services, or brand story with cinematic quality.' },
      { title: 'Motion Graphics', desc: 'Dynamic animated graphics that simplify complex ideas and add visual energy to your content.' },
      { title: 'Explainer Animations', desc: 'Clear, engaging animated explanations that help your audience understand your product or service in seconds.' },
      { title: 'Social Media Reels', desc: 'Short-form video content optimized for Instagram, TikTok, and other social platforms to maximize engagement.' },
      { title: 'Product Demos', desc: 'Professional product demonstration videos that highlight features and benefits in an engaging way.' },
    ],
    process: [
      { step: 1, title: 'Script & Storyboard', desc: 'We develop the script and visual storyboard that will guide the entire production.' },
      { step: 2, title: 'Production', desc: 'Our team brings the storyboard to life with professional filming, animation, or motion graphics.' },
      { step: 3, title: 'Post-Production', desc: 'We edit, color-grade, add effects, and polish the video to cinematic standards.' },
      { step: 4, title: 'Delivery', desc: 'Final video delivered in all required formats, optimized for your intended platforms.' },
    ],
    startingPrice: '$99',
    faqs: [
      { q: 'What\'s the typical video production timeline?', a: 'Most video projects take 1-2 weeks from concept to final delivery, depending on complexity. Rush delivery is available for urgent projects.' },
      { q: 'Do you provide scripts or do I need to write them?', a: 'We handle scriptwriting as part of our service. We\'ll work with you to understand your message and craft a compelling script.' },
      { q: 'Can you add voiceover and music?', a: 'Yes! We can add professional voiceover and licensed background music to enhance your video content.' },
      { q: 'What video formats do you deliver?', a: 'We deliver in MP4, MOV, and WebM formats, optimized for web, social media, or presentation use.' },
    ],
  },
  'ai-creations': {
    heroDescription: 'Harness the power of AI to create unique, innovative digital content at unprecedented speed and scale.',
    features: [
      { title: 'AI-Generated Artwork', desc: 'Unique AI-crafted artwork and illustrations that push creative boundaries while maintaining brand consistency.' },
      { title: 'AI-Enhanced Photo Editing', desc: 'Advanced AI-powered photo editing and enhancement that achieves results impossible with traditional tools.' },
      { title: 'Content Generation', desc: 'AI-assisted content creation for marketing copy, product descriptions, and social media captions.' },
      { title: 'Style Transfer & Variations', desc: 'Transform existing designs into new styles or generate multiple variations instantly using AI technology.' },
      { title: 'Rapid Prototyping', desc: 'Quickly generate design prototypes and concepts using AI, then refine them with human expertise.' },
    ],
    process: [
      { step: 1, title: 'Requirement Analysis', desc: 'We define the creative parameters and train the AI models to understand your brand style.' },
      { step: 2, title: 'AI Generation', desc: 'Our AI tools generate multiple creative options based on your brief and brand guidelines.' },
      { step: 3, title: 'Human Refinement', desc: 'Our designers review, select, and refine the best AI outputs to meet professional standards.' },
      { step: 4, title: 'Final Delivery', desc: 'Polished, production-ready assets delivered with all necessary files and formats.' },
    ],
    startingPrice: '$39',
    faqs: [
      { q: 'Is AI-generated content truly unique?', a: 'Yes! Our AI workflow generates unique content based on your specific brief. We then refine and customize the output with human expertise, ensuring originality and quality.' },
      { q: 'Will my AI content look generic?', a: 'Not at all. We use advanced prompting techniques and human post-processing to ensure every piece of AI content is distinctive and aligned with your brand.' },
      { q: 'How does AI pricing compare to traditional design?', a: 'AI-powered services are typically 40-60% more affordable than traditional design while maintaining high quality. The speed of AI also means faster delivery times.' },
      { q: 'Can I combine AI and traditional design?', a: 'Absolutely! Our most popular approach combines AI-generated foundations with traditional design refinement — giving you the best of both worlds.' },
    ],
  },
  'web-design': {
    heroDescription: 'Build beautiful, high-performance websites that convert visitors into loyal customers and drive measurable business results.',
    features: [
      { title: 'Responsive Web Design', desc: 'Websites that look stunning and perform flawlessly on every device — from mobile phones to ultra-wide monitors.' },
      { title: 'E-commerce Solutions', desc: 'Full-featured online stores with secure payment processing, inventory management, and conversion-optimized design.' },
      { title: 'Landing Page Design', desc: 'High-converting landing pages designed to capture leads, drive sales, and achieve your campaign goals.' },
      { title: 'UI/UX Design', desc: 'User-centered interface design that prioritizes usability, accessibility, and delightful user experiences.' },
      { title: 'Website Redesign', desc: 'Transform your existing website with a modern redesign that improves performance, usability, and conversions.' },
    ],
    process: [
      { step: 1, title: 'Discovery & Planning', desc: 'We analyze your goals, audience, and competition to create a strategic website plan.' },
      { step: 2, title: 'Wireframing & Design', desc: 'We create wireframes and high-fidelity designs that align with your brand and user needs.' },
      { step: 3, title: 'Development', desc: 'Our developers build your site with clean code, fast performance, and SEO best practices.' },
      { step: 4, title: 'Testing & Launch', desc: 'Rigorous testing across devices and browsers, followed by a smooth launch and handover.' },
    ],
    startingPrice: '$199',
    faqs: [
      { q: 'How long does it take to build a website?', a: 'A standard website takes 2-4 weeks from kickoff to launch. E-commerce sites and complex web applications may take longer depending on features.' },
      { q: 'Will my website be mobile-friendly?', a: 'Absolutely! Every website we build is mobile-first and responsive, ensuring a perfect experience on all devices.' },
      { q: 'Do you handle domain and hosting?', a: 'We can guide you through domain registration and hosting setup. We recommend reliable hosting providers and handle the technical configuration.' },
      { q: 'Can I update the website myself?', a: 'Yes! We build websites with user-friendly content management systems, and we provide training so you can make updates independently.' },
    ],
  },
  'social-media': {
    heroDescription: 'Grow your audience and engagement with strategic social media management that delivers real, measurable results.',
    features: [
      { title: 'Content Strategy & Planning', desc: 'Data-driven content strategies tailored to your brand, audience, and business goals.' },
      { title: 'Post Creation & Scheduling', desc: 'Professional content creation and strategic scheduling optimized for maximum reach and engagement.' },
      { title: 'Community Management', desc: 'Active community engagement that builds relationships, trust, and brand loyalty with your audience.' },
      { title: 'Analytics & Reporting', desc: 'Comprehensive performance analytics and actionable insights to continuously optimize your social presence.' },
      { title: 'Paid Campaign Management', desc: 'Targeted advertising campaigns that maximize ROI and drive qualified traffic to your business.' },
    ],
    process: [
      { step: 1, title: 'Audit & Strategy', desc: 'We audit your current social presence and develop a customized strategy for growth.' },
      { step: 2, title: 'Content Calendar', desc: 'We create a detailed content calendar aligned with your brand voice and marketing goals.' },
      { step: 3, title: 'Execution', desc: 'Our team creates, schedules, and publishes content across all agreed-upon platforms.' },
      { step: 4, title: 'Optimize & Grow', desc: 'We analyze performance data and continuously refine the strategy for maximum growth.' },
    ],
    startingPrice: '$199',
    faqs: [
      { q: 'Which social media platforms do you manage?', a: 'We manage all major platforms including Instagram, Facebook, LinkedIn, Twitter/X, TikTok, Pinterest, and YouTube. We recommend the best platforms based on your target audience.' },
      { q: 'How often will you post?', a: 'Posting frequency depends on your chosen plan — from 8 posts/month (Startup) to unlimited (Enterprise). We optimize posting times for maximum engagement.' },
      { q: 'Do you create the content or do I need to provide it?', a: 'We handle all content creation — graphics, captions, and hashtags. You can provide brand assets and product photos, but it\'s not required.' },
      { q: 'How do you measure success?', a: 'We track key metrics including reach, engagement rate, follower growth, and website clicks. You\'ll receive regular reports with actionable insights.' },
    ],
  },
  'guides': {
    heroDescription: 'Access expert resources, tutorials, and guides designed to help you navigate the digital landscape and grow your brand.',
    features: [
      { title: 'Brand Strategy Guides', desc: 'Comprehensive guides to help you define, build, and evolve a powerful brand identity from the ground up.' },
      { title: 'Social Media Playbooks', desc: 'Step-by-step playbooks for mastering each social media platform and growing your organic presence.' },
      { title: 'Design Tutorials', desc: 'Practical design tutorials for beginners and intermediate creators looking to improve their visual content skills.' },
      { title: 'Marketing Checklists', desc: 'Actionable checklists that ensure you never miss a step in your marketing campaigns and launches.' },
      { title: 'Industry Reports', desc: 'Curated insights and trend reports to keep you informed about the latest developments in digital marketing.' },
    ],
    process: [
      { step: 1, title: 'Browse & Select', desc: 'Explore our library of free guides and select the resources most relevant to your needs.' },
      { step: 2, title: 'Download & Learn', desc: 'Download your chosen guides and learn at your own pace with our structured, easy-to-follow content.' },
      { step: 3, title: 'Implement & Grow', desc: 'Apply the strategies and techniques to your brand and watch your digital presence grow.' },
      { step: 4, title: 'Get Expert Help', desc: 'Need personalized guidance? Our team is ready to help you implement these strategies with professional support.' },
    ],
    startingPrice: 'Free',
    faqs: [
      { q: 'Are the guides really free?', a: 'Yes! All our guides are completely free to download and use. We believe in sharing knowledge to help businesses of all sizes succeed.' },
      { q: 'How often are new guides published?', a: 'We publish new guides and resources monthly, covering the latest trends and strategies in digital marketing and design.' },
      { q: 'Can I share these guides with my team?', a: 'Absolutely! We encourage you to share our guides with your team. The more people who benefit, the better.' },
      { q: 'Do you offer personalized consultations?', a: 'Yes, if you need help implementing the strategies in our guides, we offer free initial consultations. Book one through our Contact page.' },
    ],
  },
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

function PageHero({ title, description, icon }: { title: string; description: string; icon: React.ElementType }) {
  const IconComponent = icon;
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
            <li>
              <Link href="/services" className="transition-colors hover:text-brand-violet">Services</Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-brand-violet">{title}</li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="flex-1">
            <motion.h1
              className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-brand-violet">{title}</span>
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Decorative icon */}
          <motion.div
            className="mt-8 flex items-center justify-center md:mt-0 md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          >
            <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
              <div className="absolute inset-0 rounded-full bg-brand-violet/10" />
              <div className="absolute inset-2 rounded-full bg-brand-violet/5" />
              <IconComponent className="h-16 w-16 text-brand-violet sm:h-20 sm:w-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatsIncluded({ features }: { features: Feature[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="What's Included"
          title="Everything You Get"
          subtitle="A comprehensive suite of deliverables designed to elevate your brand."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={index * 0.08}
              variants={fadeUp}
            >
              <GlassCard glow className="h-full">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceProcess({ process, serviceTitle }: { process: ProcessStep[]; serviceTitle: string }) {
  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Our Approach"
          title={`Our Process for ${serviceTitle}`}
          subtitle="A clear, proven methodology that delivers consistent results."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-brand-violet/50 via-brand-violet/30 to-brand-violet/10" />

          <div className="space-y-8 sm:space-y-10">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative flex gap-5 sm:gap-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.12,
                }}
              >
                {/* Step indicator */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-violet text-white shadow-lg shadow-brand-violet/20 sm:h-14 sm:w-14">
                    <span className="font-heading text-lg font-bold">{step.step}</span>
                  </div>
                </div>

                {/* Step content */}
                <div className="pb-2 pt-1 sm:pt-2">
                  <h4 className="font-heading text-xl font-bold text-slate-900">{step.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioExamples({ slug }: { slug: string }) {
  const categories = portfolioCategoryMap[slug] || [];
  const projects = PORTFOLIO_PROJECTS.filter((p) => categories.includes(p.category)).slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Our Work"
          title="Portfolio Examples"
          subtitle="See how we've delivered results for clients like you."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={index * 0.1}
              variants={fadeUp}
            >
              <GlassCard glow className="h-full flex flex-col">
                {/* Category badge */}
                <span className="inline-block w-fit rounded-md bg-brand-violet/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-brand-violet">
                  {project.category}
                </span>

                <h3 className="mt-3 font-heading text-lg font-bold text-slate-900">{project.title}</h3>
                <p className="mt-0.5 text-sm font-medium text-brand-violet">{project.client}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="mt-4 pt-3 border-t border-border/50">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors duration-200 hover:text-[#6D28D9]"
                  >
                    View Project
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ startingPrice }: { startingPrice: string }) {
  const isFree = startingPrice.toLowerCase() === 'free';

  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Pricing"
          title="Transparent Pricing"
          subtitle="Quality doesn't have to break the bank."
        />

        <motion.div
          className="mx-auto max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <GlassCard glow className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-violet/10 text-brand-violet">
              {isFree ? (
                <BookOpen className="h-8 w-8" />
              ) : (
                <Sparkles className="h-8 w-8" />
              )}
            </div>

            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {isFree ? 'No Cost' : 'Starting from'}
            </p>

            <p className="mt-2 font-heading text-5xl font-bold text-brand-violet">
              {startingPrice}
            </p>

            {!isFree && (
              <p className="mt-2 text-sm text-muted-foreground">
                per project — custom quotes available
              </p>
            )}

            <div className="mt-6">
              <GradientButton
                href="/pricing"
                variant={isFree ? 'secondary' : 'primary'}
                size="md"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {isFree ? 'Browse Guides' : 'View Full Pricing'}
              </GradientButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="FAQ"
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium text-slate-800 hover:text-brand-violet hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection({ serviceTitle }: { serviceTitle: string }) {
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
          Ready to start your{' '}
          <span className="text-brand-violet">{serviceTitle}</span>{' '}
          project?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Let&apos;s bring your vision to life. Get a free quote and let our team craft something amazing for you.
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

/* ──────────────────────── Client Component ──────────────────────── */

export default function ServiceDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const service = useMemo(() => SERVICES.find((s) => s.slug === slug), [slug]);
  const details = SERVICE_DETAILS[slug];

  // Fallback if slug not found
  if (!service || !details) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex flex-1 items-center justify-center pt-28">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-slate-900">Service Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">The service you&apos;re looking for doesn&apos;t exist.</p>
            <div className="mt-6">
              <GradientButton href="/services" variant="primary" size="md">
                Back to Services
              </GradientButton>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const IconComponent = serviceIconMap[service.icon] || Sparkles;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        title={service.title}
        description={details.heroDescription}
        icon={IconComponent}
      />
      <WhatsIncluded features={details.features} />
      <ServiceProcess process={details.process} serviceTitle={service.title} />
      <PortfolioExamples slug={slug} />
      <PricingSection startingPrice={details.startingPrice} />
      <FAQSection faqs={details.faqs} />
      <CTASection serviceTitle={service.title} />
      <Footer />
    </main>
  );
}
