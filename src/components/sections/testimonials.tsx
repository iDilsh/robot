'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import SectionHeading from '@/components/ui-extensions/section-heading';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the people we've worked with."
        />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Cards - Show current + adjacent on desktop */}
          <div className="flex items-center justify-center gap-6">
            {/* Prev Button */}
            <button
              onClick={prev}
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-brand-violet hover:text-brand-violet hover:shadow-md sm:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Cards Container */}
            <div className="relative w-full max-w-3xl overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${current * 100}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <div
                    key={testimonial.name}
                    className="w-full shrink-0 px-2"
                  >
                    <div className="rounded-2xl border border-border/50 bg-white p-8 shadow-sm">
                      {/* Star Rating */}
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? 'fill-brand-gold text-brand-gold'
                                : 'fill-slate-200 text-slate-200'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="mt-4 text-base leading-relaxed text-slate-700 italic md:text-lg">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Client Info */}
                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-violet/10 text-sm font-bold text-brand-violet">
                          {getInitials(testimonial.name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role} &bull; {testimonial.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next Button */}
            <button
              onClick={next}
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-brand-violet hover:text-brand-violet hover:shadow-md sm:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Nav Buttons */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
            <button
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-brand-violet hover:text-brand-violet"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-brand-violet hover:text-brand-violet"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'w-6 bg-brand-violet'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
