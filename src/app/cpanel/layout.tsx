'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/cpanel', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/cpanel/blog', icon: FileText },
  { label: 'Portfolio', href: '/cpanel/portfolio', icon: Briefcase },
  { label: 'Settings', href: '/cpanel/settings', icon: Settings },
];

function Sidebar({
  isOpen,
  onClose,
  pathname,
  username,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  username: string;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue to redirect even on error
    }
    router.push('/cpanel/login');
  };

  const isActive = (href: string) => {
    if (href === '/cpanel') return pathname === '/cpanel';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-screen w-[260px] flex-col bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <Link href="/cpanel" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-violet shadow-md shadow-brand-violet/30">
              <span className="text-sm font-bold text-white">iD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold leading-tight">
                <span className="text-brand-violet">iDilsh</span>{' '}
                <span className="text-slate-300">Network</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Control Panel
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Navigation
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      active
                        ? 'bg-brand-violet/15 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {/* Active left border indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-brand-violet"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Visit Site link */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Quick Links
            </p>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-5 w-5 shrink-0" />
              <span>Visit Site</span>
            </Link>
          </div>
        </nav>

        {/* Footer / User info + Logout */}
        <div className="border-t border-white/10 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-violet/20">
              <User className="h-4 w-4 text-brand-violet" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{username}</p>
              <p className="text-[11px] text-slate-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default function CpanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        setUsername(data.username || 'Admin');
      } else {
        router.push('/cpanel/login');
      }
    } catch {
      router.push('/cpanel/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // Don't check auth on login page — it handles its own flow
    if (pathname === '/cpanel/login') {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [pathname, checkAuth]);

  // Login page gets no sidebar/layout chrome
  if (pathname === '/cpanel/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-violet border-t-transparent" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pathname={pathname}
        username={username}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-slate-800">
                {navItems.find((item) => {
                  if (item.href === '/cpanel') return pathname === '/cpanel';
                  return pathname.startsWith(item.href);
                })?.label || 'Control Panel'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-violet"
            >
              View Site
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <div className="hidden sm:block h-5 w-px bg-slate-200" />

            <div className="hidden sm:flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-violet/10">
                <User className="h-4 w-4 text-brand-violet" />
              </div>
              <span className="text-sm font-medium text-slate-700">
                Hello, {username}
              </span>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
