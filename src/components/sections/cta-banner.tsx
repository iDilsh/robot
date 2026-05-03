'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui-extensions/gradient-button';

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-violet to-[#6D28D9] py-20 md:py-28">
      {/* Floating decorative circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <motion.div
          className="absolute right-10 top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl"
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-white/[0.03] blur-2xl" />
        <motion.div
          className="absolute left-10 bottom-10 h-32 w-32 rounded-full bg-white/[0.04] blur-xl"
          animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Elevate Your Brand?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-white/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Let&apos;s turn your vision into stunning digital reality
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
            variant="outline"
            size="lg"
            className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-violet hover:border-white hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)]"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Start Your Free Consultation
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
