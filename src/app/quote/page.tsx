'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  ChevronLeft,
  ArrowRight,
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  PhoneCall,
  Send,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import GradientButton from '@/components/ui-extensions/gradient-button';
import { SERVICES } from '@/lib/constants';
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

/* ────────────────────── Data ────────────────────── */

const STEPS = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Your Info' },
  { id: 4, label: 'Confirm' },
];

const serviceIconMap: Record<string, React.ElementType> = {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
};

const TIMELINE_OPTIONS = [
  'ASAP',
  'Within 1 week',
  'Within 2 weeks',
  'Within 1 month',
  'Flexible',
];

const BUDGET_OPTIONS = [
  'Under $100',
  '$100 - $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500+',
  'Not sure yet',
];

interface FormData {
  selectedServices: string[];
  projectDescription: string;
  timeline: string;
  budget: string;
  requirements: string;
  fullName: string;
  email: string;
  company: string;
  country: string;
  phone: string;
}

const INITIAL_FORM_DATA: FormData = {
  selectedServices: [],
  projectDescription: '',
  timeline: '',
  budget: '',
  requirements: '',
  fullName: '',
  email: '',
  company: '',
  country: '',
  phone: '',
};

/* ────────────────────── Animation helpers ────────────────────── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

/* ────────────────────── Sub-components ────────────────────── */

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-violet-light/60 via-brand-violet-light/20 to-white pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-violet/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-brand-cyan/5 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <li className="font-medium text-brand-violet">Get a Quote</li>
          </ol>
        </nav>

        <motion.h1
          className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Get a <span className="text-brand-violet">Free Quote</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          Tell us about your project and we&apos;ll get back to you within 24 hours with a personalized quote.
        </motion.p>
      </div>
    </section>
  );
}

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                  currentStep > step.id
                    ? 'border-brand-violet bg-brand-violet text-white'
                    : currentStep === step.id
                    ? 'border-brand-violet bg-white text-brand-violet shadow-[0_0_0_4px_rgba(124,58,237,0.15)]'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  currentStep >= step.id ? 'text-brand-violet' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-12 sm:w-20 md:w-32 transition-colors duration-300 ${
                  currentStep > step.id ? 'bg-brand-violet' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Step1Service({
  selectedServices,
  onToggleService,
}: {
  selectedServices: string[];
  onToggleService: (slug: string) => void;
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-slate-900">
        What services do you need?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Select one or more services that match your project needs.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SERVICES.map((service) => {
          const IconComponent = serviceIconMap[service.icon] || Sparkles;
          const isSelected = selectedServices.includes(service.slug);

          return (
            <button
              key={service.slug}
              type="button"
              onClick={() => onToggleService(service.slug)}
              className={`group flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-brand-violet bg-brand-violet/5 shadow-[0_0_0_2px_rgba(124,58,237,0.1)]'
                  : 'border-slate-200 bg-white hover:border-brand-violet/30 hover:bg-brand-violet/5'
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 ${
                  isSelected
                    ? 'bg-brand-violet text-white'
                    : 'bg-brand-violet/10 text-brand-violet group-hover:bg-brand-violet group-hover:text-white'
                }`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              <span
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isSelected ? 'text-brand-violet' : 'text-slate-700'
                }`}
              >
                {service.title}
              </span>
            </button>
          );
        })}
      </div>

      {selectedServices.length === 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Please select at least one service to continue.
        </p>
      )}
    </div>
  );
}

function Step2Details({
  formData,
  onChange,
  onSelectChange,
}: {
  formData: FormData;
  onChange: (field: string, value: string) => void;
  onSelectChange: (field: string, value: string) => void;
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-slate-900">
        Project Details
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell us more about what you&apos;re looking for.
      </p>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="project-desc">
            Project Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="project-desc"
            placeholder="Describe your project in detail..."
            required
            rows={5}
            value={formData.projectDescription}
            onChange={(e) => onChange('projectDescription', e.target.value)}
            className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline / Deadline <span className="text-red-500">*</span></Label>
            <Select
              value={formData.timeline}
              onValueChange={(val) => onSelectChange('timeline', val)}
              required
            >
              <SelectTrigger className="w-full focus-visible:border-brand-violet focus-visible:ring-brand-violet/30">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {TIMELINE_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select
              value={formData.budget}
              onValueChange={(val) => onSelectChange('budget', val)}
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

        <div className="space-y-2">
          <Label htmlFor="requirements">Any specific requirements?</Label>
          <Textarea
            id="requirements"
            placeholder="List any special requirements, preferences, or references..."
            rows={4}
            value={formData.requirements}
            onChange={(e) => onChange('requirements', e.target.value)}
            className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function Step3Info({
  formData,
  onChange,
}: {
  formData: FormData;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-slate-900">
        Your Details
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        So we can get back to you with your personalized quote.
      </p>

      <div className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="full-name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="full-name"
              type="text"
              placeholder="John Doe"
              required
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote-email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="quote-email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name (optional)</Label>
            <Input
              id="company"
              type="text"
              placeholder="Your company"
              value={formData.company}
              onChange={(e) => onChange('company', e.target.value)}
              className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              type="text"
              placeholder="United States"
              required
              value={formData.country}
              onChange={(e) => onChange('country', e.target.value)}
              className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quote-phone">Phone Number (optional)</Label>
          <Input
            id="quote-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="focus-visible:border-brand-violet focus-visible:ring-brand-violet/30"
          />
        </div>
      </div>
    </div>
  );
}

function Step4Confirm({ formData }: { formData: FormData }) {
  const selectedServiceNames = SERVICES.filter((s) =>
    formData.selectedServices.includes(s.slug)
  ).map((s) => s.title);

  const summaryItems = [
    { label: 'Selected Services', value: selectedServiceNames.join(', ') || 'None' },
    { label: 'Project Description', value: formData.projectDescription || 'Not provided' },
    { label: 'Timeline', value: formData.timeline || 'Not specified' },
    { label: 'Budget Range', value: formData.budget || 'Not specified' },
    { label: 'Specific Requirements', value: formData.requirements || 'None' },
    { label: 'Full Name', value: formData.fullName || 'Not provided' },
    { label: 'Email', value: formData.email || 'Not provided' },
    { label: 'Company', value: formData.company || 'Not provided' },
    { label: 'Country', value: formData.country || 'Not provided' },
    { label: 'Phone', value: formData.phone || 'Not provided' },
  ];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-slate-900">
        Review Your Quote Request
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Please review your details before submitting.
      </p>

      <div className="mt-6 rounded-xl border border-border/50 bg-slate-50/50 p-5">
        <dl className="space-y-4">
          {summaryItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col gap-1 sm:flex-row sm:gap-4 ${
                index < summaryItems.length - 1 ? 'pb-4 border-b border-border/30' : ''
              }`}
            >
              <dt className="text-sm font-medium text-slate-500 sm:w-44 shrink-0">
                {item.label}
              </dt>
              <dd className="text-sm text-slate-800 whitespace-pre-wrap">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function ThankYouSection() {
  const nextSteps = [
    {
      icon: FileSearch,
      title: 'We review your request',
      description: 'Our team carefully reviews your project requirements and details.',
    },
    {
      icon: ClipboardList,
      title: 'We prepare a custom quote',
      description: 'We craft a tailored proposal with transparent pricing and timeline.',
    },
    {
      icon: PhoneCall,
      title: 'We reach out to discuss',
      description: 'We connect with you to discuss next steps and answer any questions.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
      </div>

      <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
        Thank You!
      </h2>
      <p className="mt-3 text-lg text-muted-foreground">
        We&apos;ve received your quote request and will get back to you within 24 hours.
      </p>

      {/* What happens next */}
      <div className="mt-12 text-left">
        <h3 className="font-heading text-xl font-bold text-slate-900 text-center">
          What happens next?
        </h3>

        <div className="mt-6 space-y-5">
          {nextSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="flex items-start gap-4 rounded-xl border border-border/50 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <GradientButton
          href="/"
          variant="primary"
          size="lg"
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Back to Home
        </GradientButton>
      </div>
    </motion.div>
  );
}

/* ────────────────────── Page ────────────────────── */

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(slug)
        ? prev.selectedServices.filter((s) => s !== slug)
        : [...prev.selectedServices, slug],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedServices.length > 0;
      case 2:
        return formData.projectDescription.trim().length > 0 && formData.timeline !== '';
      case 3:
        return (
          formData.fullName.trim().length > 0 &&
          formData.email.trim().length > 0 &&
          formData.country.trim().length > 0
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      setSubmitted(true);
      return;
    }
    if (canProceed() && currentStep < 4) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-1 py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ThankYouSection />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} />

          {/* Form Card */}
          <div className="rounded-2xl border border-border/50 bg-white/80 p-6 backdrop-blur-md shadow-sm sm:p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {currentStep === 1 && (
                  <Step1Service
                    selectedServices={formData.selectedServices}
                    onToggleService={toggleService}
                  />
                )}
                {currentStep === 2 && (
                  <Step2Details
                    formData={formData}
                    onChange={handleChange}
                    onSelectChange={handleSelectChange}
                  />
                )}
                {currentStep === 3 && (
                  <Step3Info formData={formData} onChange={handleChange} />
                )}
                {currentStep === 4 && <Step4Confirm formData={formData} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-brand-violet hover:text-brand-violet hover:shadow-[0_4px_12px_rgba(124,58,237,0.1)] cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                  canProceed()
                    ? 'bg-gradient-to-r from-brand-violet to-[#6D28D9] text-white hover:from-[#8B5CF6] hover:to-brand-violet hover:scale-[1.03] hover:shadow-[0_10px_25px_rgba(124,58,237,0.25),0_4px_10px_rgba(124,58,237,0.15)] active:scale-[1.01]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {currentStep === 4 ? (
                  <>
                    Submit Quote Request
                    <Send className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
