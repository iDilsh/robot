'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui-extensions/gradient-button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-violet/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-cyan/5 blur-3xl" />
        <motion.div
          className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-brand-violet/3 blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-brand-cyan/3 blur-2xl"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="font-heading text-[8rem] font-bold leading-none tracking-tighter text-brand-violet/15 sm:text-[12rem]">
            404
          </h1>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="mx-auto -mt-16 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-violet/10 sm:-mt-24 sm:h-32 sm:w-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-5xl sm:text-6xl">🔍</span>
        </motion.div>

        {/* Message */}
        <motion.h2
          className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-md text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Oops! The page you&apos;re looking for seems to have wandered off. It might have been moved, deleted, or never existed in the first place.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GradientButton
            href="/"
            variant="primary"
            size="lg"
            icon={<Home className="h-4 w-4" />}
          >
            Back to Home
          </GradientButton>
          <GradientButton
            href="/contact"
            variant="outline"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Contact Us
          </GradientButton>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-sm text-muted-foreground mb-4">Or try one of these helpful links:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Services', href: '/services' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Blog', href: '/blog' },
              { label: 'Get a Quote', href: '/quote' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border/50 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-brand-violet/30 hover:text-brand-violet hover:shadow-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
