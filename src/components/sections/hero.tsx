'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
        {/* Left arc — soft elegant C-shape */}
        <motion.svg
          className="absolute -left-[15%] top-0 h-full w-[70%]"
          viewBox="0 0 500 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: 'easeOut' }}
        >
          <defs>
            {/* Soft blur filter for the elegant diffused look */}
            <filter id="leftSoftGlow" x="-40%" y="-10%" width="180%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            </filter>
            <filter id="leftMedGlow" x="-40%" y="-10%" width="180%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            </filter>
            <filter id="leftFineGlow" x="-40%" y="-10%" width="180%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            </filter>
            <linearGradient id="leftArcGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.10" />
              <stop offset="25%" stopColor="#7C3AED" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.14" />
              <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="leftArcGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.07" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="leftArcGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          {/* Outer arc — wide soft glow */}
          <motion.path
            d="M 480 60 A 360 360 0 0 0 480 840"
            stroke="url(#leftArcGrad1)"
            strokeWidth="42"
            strokeLinecap="round"
            fill="none"
            filter="url(#leftSoftGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Middle arc — medium glow */}
          <motion.path
            d="M 410 150 A 260 260 0 0 0 410 750"
            stroke="url(#leftArcGrad2)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            filter="url(#leftMedGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Inner arc — delicate fine glow */}
          <motion.path
            d="M 340 240 A 170 170 0 0 0 340 660"
            stroke="url(#leftArcGrad3)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            filter="url(#leftFineGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.svg>

        {/* Right arc — soft elegant C-shape (mirrored) */}
        <motion.svg
          className="absolute -right-[15%] top-0 h-full w-[70%]"
          viewBox="0 0 500 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: 'easeOut' }}
        >
          <defs>
            <filter id="rightSoftGlow" x="-40%" y="-10%" width="180%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            </filter>
            <filter id="rightMedGlow" x="-40%" y="-10%" width="180%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            </filter>
            <filter id="rightFineGlow" x="-40%" y="-10%" width="180%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            </filter>
            <linearGradient id="rightArcGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.10" />
              <stop offset="25%" stopColor="#7C3AED" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.14" />
              <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="rightArcGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.07" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="rightArcGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          {/* Outer arc — wide soft glow */}
          <motion.path
            d="M 20 60 A 360 360 0 0 1 20 840"
            stroke="url(#rightArcGrad1)"
            strokeWidth="42"
            strokeLinecap="round"
            fill="none"
            filter="url(#rightSoftGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Middle arc — medium glow */}
          <motion.path
            d="M 90 150 A 260 260 0 0 1 90 750"
            stroke="url(#rightArcGrad2)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            filter="url(#rightMedGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Inner arc — delicate fine glow */}
          <motion.path
            d="M 160 240 A 170 170 0 0 1 160 660"
            stroke="url(#rightArcGrad3)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            filter="url(#rightFineGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.svg>
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
        {/* Hero logo */}
        <motion.div
          className="mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mx-auto inline-block overflow-hidden rounded-2xl border border-brand-violet/20 bg-white/60 p-1.5 shadow-lg shadow-brand-violet/10 backdrop-blur-sm">
            <Image
              src="/hero-logo.png"
              alt="iDilsh Network Logo"
              width={120}
              height={120}
              className="rounded-xl object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          className="font-heading text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Ignite Designs.
          <br />
          Illuminate <span className="highlight-pill">Dreams.</span>
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
