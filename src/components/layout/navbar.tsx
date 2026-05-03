'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SERVICES, SITE_NAME } from '@/lib/constants';
import GradientButton from '@/components/ui-extensions/gradient-button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const serviceIconMap: Record<string, React.ElementType> = {
  Palette,
  Video,
  Sparkles,
  Globe,
  Share2,
  BookOpen,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileOpen(false);
      setServicesOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/50 bg-white/80 backdrop-blur-lg shadow-sm'
            : 'bg-white/50 backdrop-blur-sm'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="font-heading text-xl font-bold text-brand-violet">
              iDilsh
            </span>
            <span className="font-heading text-xl font-medium text-slate-800">
              Network
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              link.label === 'Services' ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                      isActive(link.href)
                        ? 'text-brand-violet'
                        : 'text-slate-600 hover:text-brand-violet'
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-200',
                        servicesOpen && 'rotate-180'
                      )}
                    />
                    {isActive(link.href) && (
                      <motion.div
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-violet"
                        layoutId="activeNav"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Services Mega Menu */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute top-full left-1/2 z-50 mt-2 w-[520px] -translate-x-1/2 rounded-2xl border border-border/50 bg-white/95 p-4 shadow-xl backdrop-blur-lg"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {SERVICES.map((service) => {
                            const IconComponent =
                              serviceIconMap[service.icon] || Sparkles;
                            return (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-brand-violet/5"
                                onClick={() => setServicesOpen(false)}
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-violet/10 text-brand-violet transition-colors duration-200 group-hover:bg-brand-violet group-hover:text-white">
                                  <IconComponent className="h-4.5 w-4.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-violet">
                                    {service.title}
                                  </p>
                                  <p className="mt-0.5 text-xs leading-snug text-muted-foreground line-clamp-2">
                                    {service.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-3 border-t border-border/50 pt-3">
                          <Link
                            href="/services"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet hover:text-[#6D28D9] transition-colors duration-200"
                            onClick={() => setServicesOpen(false)}
                          >
                            View all services
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                    isActive(link.href)
                      ? 'text-brand-violet'
                      : 'text-slate-600 hover:text-brand-violet'
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-violet"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <GradientButton
              href="/quote"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get a Quote
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors duration-200 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Sheet Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-1">
              <span className="font-heading text-lg font-bold text-brand-violet">
                iDilsh
              </span>
              <span className="font-heading text-lg font-medium text-slate-800">
                Network
              </span>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-1 px-4">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200',
                    isActive(link.href)
                      ? 'bg-brand-violet/10 text-brand-violet'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-brand-violet'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-6 px-4">
            <GradientButton
              href="/quote"
              variant="primary"
              size="md"
              className="w-full"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get a Quote
            </GradientButton>
          </div>

          {/* Mobile Services Quick Links */}
          <div className="mt-6 px-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Our Services
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map((service) => {
                const IconComponent = serviceIconMap[service.icon] || Sparkles;
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors duration-200 hover:bg-brand-violet/5 hover:text-brand-violet"
                    onClick={() => setMobileOpen(false)}
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-auto px-4 pb-6">
            <div className="border-t border-border/50 pt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors duration-200 hover:bg-brand-violet hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors duration-200 hover:bg-brand-violet hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors duration-200 hover:bg-brand-violet hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors duration-200 hover:bg-brand-violet hover:text-white"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
