'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Globe,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Briefcase,
  Handshake,
  PenTool,
  ChevronRight,
  Home,
  Upload,
  CheckCircle2,
  Send,
  Palette,
  Video,
  Sparkles,
  Share2,
  BookOpen,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import GlassCard from '@/components/ui-extensions/glass-card';
import GradientButton from '@/components/ui-extensions/gradient-button';
import { CONTACT_EMAIL, SERVICES, SITE_URL } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ────────────────────── Animation helpers ────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

/* ────────────────────── Data ────────────────────── */

const BUDGET_OPTIONS = [
  'Under $100',
  '$100 - $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500+',
];

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'idilsh.top',
    href: SITE_URL,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sri Lanka',
    href: null,
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon-Fri, 9:00 AM - 6:00 PM (IST)',
    href: null,
  },
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
];

const QUICK_INQUIRY_CARDS = [
  {
    icon: Briefcase,
    title: 'New Project',
    description: 'Start a new project with our expert team',
    href: '/quote',
    linkLabel: 'Get a Quote',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'Explore collaboration opportunities',
    href: `mailto:${CONTACT_EMAIL}?subject=Partnership Inquiry`,
    linkLabel: 'Email Us',
  },
  {
    icon: PenTool,
    title: 'Blog Collab',
    description: 'Guest posts and content partnerships',
    href: `mailto:${CONTACT_EMAIL}?subject=Blog Collaboration`,
    linkLabel: 'Reach Out',
  },
];

const serviceIconMap: Record<string, React.ElementType> = {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
};

/* ────────────────────── Sections ────────────────────── */

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
            <li className="font-medium text-brand-violet">Contact</li>
          </ol>
        </nav>

        <motion.h1
          className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Let&apos;s Build Something{' '}
          <span className="text-brand-violet">Amazing Together</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s start a conversation.
        </motion.p>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-white/80 p-10 text-center backdrop-blur-md shadow-sm"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-slate-900">
          Message Sent!
        </h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
            setFileName('');
          }}
          className="mt-6 text-sm font-medium text-brand-violet hover:text-[#6D28D9] transition-colors duration-200"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border/50 bg-white/80 p-6 backdrop-blur-md shadow-sm sm:p-8"
    >
      <h2 className="font-heading text-2xl font-bold text-slate-900">
        Send Us a Message
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill out the form and we&apos;ll respond within 24 hours.
      </p>

      <div className="mt-6 space-y-5">
        {/* Name & Email row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-name"
              type="text"
              placeholder="Your full name"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
          />
        </div>

        {/* Service & Budget row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-service">
              Service Needed <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.service}
              onValueChange={(val) => handleChange('service', val)}
              required
            >
              <SelectTrigger className="w-full focus-visible:border-brand-violet focus-visible:ring-brand-violet/30">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.title}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-budget">Budget Range</Label>
            <Select
              value={formData.budget}
              onValueChange={(val) => handleChange('budget', val)}
            >
              <SelectTrigger className="w-full focus-visible:border-brand-violet focus-visible:ring-brand-violet/30">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="contact-message">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="contact-message"
            placeholder="Tell us about your project..."
            required
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30 resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label>Attach files (optional)</Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-3 transition-colors duration-200 hover:border-brand-violet/40 hover:bg-brand-violet/5"
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {fileName || 'Click to upload files (images, PDFs, docs)'}
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-violet to-[#6D28D9] px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:from-[#8B5CF6] hover:to-brand-violet hover:scale-[1.03] hover:shadow-[0_10px_25px_rgba(124,58,237,0.25),0_4px_10px_rgba(124,58,237,0.15)] active:scale-[1.01] active:shadow-[0_4px_12px_rgba(124,58,237,0.2)] cursor-pointer"
        >
          Send Message
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function ContactInfoColumn() {
  return (
    <div className="space-y-6">
      {/* Contact Details */}
      <div className="rounded-2xl border border-border/50 bg-white/80 p-6 backdrop-blur-md shadow-sm sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-slate-900">
          Contact Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Reach us directly through any of these channels.
        </p>

        <ul className="mt-6 space-y-4">
          {CONTACT_DETAILS.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.label} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-violet/10 text-brand-violet">
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.label === 'Website' ? '_blank' : undefined}
                      rel={item.label === 'Website' ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium text-slate-800 transition-colors duration-200 hover:text-brand-violet"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-slate-800">{item.value}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl border border-border/50 bg-white/80 p-6 backdrop-blur-md shadow-sm sm:p-8">
        <h3 className="font-heading text-lg font-bold text-slate-900">
          Follow Us
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Stay connected on social media.
        </p>

        <div className="mt-4 flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
                aria-label={social.label}
              >
                <IconComponent className="h-4.5 w-4.5" />
              </a>
            );
          })}
          {/* Behance */}
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
            aria-label="Behance"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
            >
              <path d="M1 12.5h8c1.5 0 3-1 3-3s-1.5-3-3-3H1v10h8.5c1.5 0 3-1 3-3s-1.5-3-3-3" />
              <path d="M15 7h6" />
              <path d="M15 12.5c0-2.5 2-4.5 4.5-4.5S24 10 24 12.5 22 17 19.5 17 15 15 15 12.5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function QuickInquiryCards() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_INQUIRY_CARDS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={index * 0.1}
                variants={fadeUp}
              >
                <Link href={card.href} className="block h-full">
                  <div className="group h-full rounded-2xl border border-brand-violet/10 bg-brand-violet-light/30 p-6 transition-all duration-300 hover:bg-brand-violet-light/50 hover:shadow-md hover:-translate-y-1">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet transition-colors duration-300 group-hover:bg-brand-violet group-hover:text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {card.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors duration-200 group-hover:text-[#6D28D9]">
                      {card.linkLabel}
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── Page ────────────────────── */

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero />

      {/* Contact Form + Info */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Left: Form (3 cols) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactFormSection />
            </motion.div>

            {/* Right: Info (2 cols) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ContactInfoColumn />
            </motion.div>
          </div>
        </div>
      </section>

      <QuickInquiryCards />
      <Footer />
    </main>
  );
}
