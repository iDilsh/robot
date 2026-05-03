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
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-violet/8 blur-3xl" />
        <motion.div
          className="absolute top-1/4 right-0 h-80 w-80 rounded-full bg-brand-cyan/8 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-brand-violet/6 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-cyan/5 blur-3xl" />
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
