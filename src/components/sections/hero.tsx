'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Globe } from 'lucide-react';
import GradientButton from '@/components/ui-extensions/gradient-button';

const typingPhrases = [
  'We build brands',
  'We create content',
  'We grow businesses',
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      {/* Circular arc shapes background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Left arc — large C-shape on left side */}
        <motion.svg
          className="absolute -left-[20%] top-[5%] h-[90%] w-[70%]"
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.path
            d="M 580 50 A 400 400 0 0 0 580 750"
            stroke="url(#leftArcGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 520 120 A 320 320 0 0 0 520 680"
            stroke="url(#leftArcGradient2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.7, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 460 190 A 240 240 0 0 0 460 610"
            stroke="url(#leftArcGradient3)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.9, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="leftArcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="leftArcGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="leftArcGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Right arc — large C-shape on right side */}
        <motion.svg
          className="absolute -right-[20%] top-[5%] h-[90%] w-[70%]"
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.path
            d="M 20 50 A 400 400 0 0 1 20 750"
            stroke="url(#rightArcGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 80 120 A 320 320 0 0 1 80 680"
            stroke="url(#rightArcGradient2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.7, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 140 190 A 240 240 0 0 1 140 610"
            stroke="url(#rightArcGradient3)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.9, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="rightArcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="rightArcGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="rightArcGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Subtle gradient mesh underlays */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-violet/5 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-cyan/4 blur-3xl" />
      </div>

      {/* Floating decorative circles */}
      <motion.div
        className="absolute top-20 left-10 h-3 w-3 rounded-full bg-brand-violet/20"
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-16 h-2 w-2 rounded-full bg-brand-cyan/25"
        animate={{ y: [0, 12, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/5 h-2.5 w-2.5 rounded-full bg-brand-violet/15"
        animate={{ y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Floating badge — top right */}
      <motion.div
        className="absolute right-6 top-24 z-10 hidden sm:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="glass-card flex items-center gap-2.5 px-4 py-2.5">
          <Globe className="h-4 w-4 text-brand-violet" />
          <span className="text-sm font-medium text-slate-700">
            Trusted by <span className="font-semibold text-brand-violet">18+</span> Global Clients
          </span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          className="font-heading text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Ignite Designs.
          <br />
          Illuminate Dreams.
        </motion.h1>

        {/* Typing effect sub-headline */}
        <motion.div
          className="mt-6 flex items-center justify-center text-xl font-medium sm:text-2xl md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-slate-500">→&nbsp;</span>
          <div className="relative h-[1.4em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                className="inline-block text-brand-violet"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {typingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GradientButton href="/quote" variant="primary" size="lg">
            Start Your Project
          </GradientButton>
          <GradientButton href="#portfolio" variant="outline" size="lg" icon={<Play className="h-4 w-4" />}>
            Watch Our Reel
          </GradientButton>
        </motion.div>

        {/* Subtle descriptor */}
        <motion.p
          className="mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Graphic Design &bull; Video Editing &bull; AI Creations &bull; Web Design &bull; Social Media
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
