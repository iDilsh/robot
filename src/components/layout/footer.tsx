'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  ArrowUp,
  Mail,
  Globe,
  MapPin,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  CONTACT_EMAIL,
  NAV_LINKS,
  SERVICES,
} from '@/lib/constants';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="relative bg-white">
      {/* Gradient top border */}
      <div className="h-0.5 bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-violet" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="font-heading text-xl font-bold text-brand-violet">
                iDilsh
              </span>
              <span className="font-heading text-xl font-medium text-slate-800">
                Network
              </span>
            </Link>
            <p className="mt-2 text-sm font-medium italic text-brand-violet/80">
              {SITE_TAGLINE}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Premium digital agency offering graphic design, video editing, AI creations, web design, and social media management. Affordable excellence from Sri Lanka to the world.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-brand-violet hover:text-white hover:shadow-md"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Made with 💜 in Sri Lanka 🇱🇰
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-800">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-brand-violet"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-800">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-brand-violet"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-800">
              Contact & Newsletter
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-brand-violet" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors duration-200 hover:text-brand-violet"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0 text-brand-violet" />
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-brand-violet"
                >
                  idilsh.top
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-brand-violet" />
                <span>Sri Lanka</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-slate-700">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubscribe} className="mt-2 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="h-10 flex-1 rounded-lg border border-border bg-white px-3 text-sm text-slate-700 placeholder:text-muted-foreground focus:border-brand-violet focus:outline-none focus:ring-1 focus:ring-brand-violet transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-violet text-white transition-all duration-200 hover:bg-[#6D28D9] hover:shadow-md"
                  aria-label="Subscribe"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors duration-200 hover:text-brand-violet"
            >
              Privacy Policy
            </Link>
            <span className="text-xs text-border">|</span>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors duration-200 hover:text-brand-violet"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className={cn(
              'fixed right-6 bottom-6 z-40 flex h-10 w-10 items-center justify-center rounded-full',
              'bg-brand-violet text-white shadow-lg transition-all duration-200',
              'hover:bg-[#6D28D9] hover:shadow-xl hover:scale-110',
              'focus:outline-none focus:ring-2 focus:ring-brand-violet focus:ring-offset-2'
            )}
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
