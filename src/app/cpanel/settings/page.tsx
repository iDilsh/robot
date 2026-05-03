'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Image as ImageIcon,
  Save,
  Upload,
  ArrowLeft,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Link,
  X,
} from 'lucide-react';

interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteUrl: string;
  contactEmail: string;
  whatsappLink: string;
  navLogoUrl: string;
  heroLogoUrl: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'iDilsh Network',
  siteTagline: 'Ignite Designs. Illuminate Dreams.',
  siteUrl: 'https://idilsh.top',
  contactEmail: 'hello@idilsh.top',
  whatsappLink: 'https://wa.me/94773226376',
  navLogoUrl: '/logo.svg',
  heroLogoUrl: '/hero-logo.png',
};

const EMPTY_SETTINGS: SiteSettings = {
  siteName: '',
  siteTagline: '',
  siteUrl: '',
  contactEmail: '',
  whatsappLink: '',
  navLogoUrl: '',
  heroLogoUrl: '',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

export default function CpanelSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(EMPTY_SETTINGS);
  const [initialSettings, setInitialSettings] = useState<SiteSettings>(EMPTY_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<'nav' | 'hero' | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const navFileRef = useRef<HTMLInputElement>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);

  // ─── Toast ─────────────────────────────────────────────
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── Fetch settings on mount ──────────────────────────
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data: SiteSettings = await res.json();
          setSettings(data);
          setInitialSettings(data);
        } else {
          showToast('Failed to load settings', 'error');
        }
      } catch {
        showToast('Network error while loading settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // ─── Track changes ────────────────────────────────────
  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(initialSettings));
  }, [settings, initialSettings]);

  // ─── Field change handler ─────────────────────────────
  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Image upload handler ─────────────────────────────
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'nav' | 'hero'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be less than 5MB', 'error');
      return;
    }

    setUploading(type);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const field = type === 'nav' ? 'navLogoUrl' : 'heroLogoUrl';
        handleChange(field, data.url);
        showToast(`${type === 'nav' ? 'Navbar' : 'Hero'} logo uploaded successfully`);
      } else {
        showToast('Upload failed. Please try again.', 'error');
      }
    } catch {
      showToast('Network error during upload', 'error');
    } finally {
      setUploading(null);
      // Reset file input so same file can be re-selected
      if (type === 'nav' && navFileRef.current) navFileRef.current.value = '';
      if (type === 'hero' && heroFileRef.current) heroFileRef.current.value = '';
    }
  };

  // ─── Save handler ─────────────────────────────────────
  const handleSave = async () => {
    if (!settings.siteName.trim()) {
      showToast('Site Name is required', 'error');
      return;
    }
    if (!settings.siteUrl.trim()) {
      showToast('Site URL is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const data: SiteSettings = await res.json();
        setSettings(data);
        setInitialSettings(data);
        showToast('Settings saved successfully!');
      } else {
        showToast('Failed to save settings', 'error');
      }
    } catch {
      showToast('Network error while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ─── Reset handler ────────────────────────────────────
  const handleReset = () => {
    setSettings({ ...DEFAULT_SETTINGS });
    setConfirmReset(false);
    showToast('Settings reset to defaults. Save to apply.');
  };

  // ─── Loading skeleton ─────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#7C3AED] border-t-transparent" />
          <p className="text-sm text-slate-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── Toast Notification ─────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${
              toast.type === 'success'
                ? 'bg-emerald-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            {toast.message}
            <button
              onClick={() => setToast(null)}
              className="ml-1 rounded p-0.5 transition-colors hover:bg-white/20 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Page Header ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <a
              href="/cpanel"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-[#7C3AED] hover:border-[#7C3AED]/30"
            >
              <ArrowLeft className="h-4 w-4" />
            </a>
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900">
                Site Settings
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                Manage your site information, branding, and contact details.
              </p>
            </div>
          </div>
        </div>

        {/* Unsaved indicator */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-medium text-amber-700"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Unsaved changes
          </motion.div>
        )}
      </motion.div>

      {/* ─── Section 1: General Settings ───────────────── */}
      <motion.div
        custom={0.1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7C3AED]/10">
            <Globe className="h-5 w-5 text-[#7C3AED]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              General Settings
            </h2>
            <p className="text-xs text-slate-500">
              Core site information and contact details
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Site Name */}
            <div>
              <label
                htmlFor="siteName"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Site Name <span className="text-red-400">*</span>
              </label>
              <input
                id="siteName"
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                placeholder="Your site name"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
              />
              <p className="mt-1 text-xs text-slate-400">
                Displayed in the browser tab and across the site
              </p>
            </div>

            {/* Site Tagline */}
            <div>
              <label
                htmlFor="siteTagline"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Site Tagline
              </label>
              <input
                id="siteTagline"
                type="text"
                value={settings.siteTagline}
                onChange={(e) => handleChange('siteTagline', e.target.value)}
                placeholder="A short catchphrase"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
              />
              <p className="mt-1 text-xs text-slate-400">
                Your brand&apos;s tagline or motto
              </p>
            </div>

            {/* Site URL */}
            <div>
              <label
                htmlFor="siteUrl"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Site URL <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="siteUrl"
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => handleChange('siteUrl', e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Your full website URL including https://
              </p>
            </div>

            {/* Contact Email */}
            <div>
              <label
                htmlFor="contactEmail"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Contact Email
              </label>
              <input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                placeholder="hello@yoursite.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
              />
              <p className="mt-1 text-xs text-slate-400">
                Primary contact email for inquiries
              </p>
            </div>

            {/* WhatsApp Link - Full width */}
            <div className="sm:col-span-2">
              <label
                htmlFor="whatsappLink"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                WhatsApp Link
              </label>
              <input
                id="whatsappLink"
                type="url"
                value={settings.whatsappLink}
                onChange={(e) => handleChange('whatsappLink', e.target.value)}
                placeholder="https://wa.me/1234567890"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
              />
              <p className="mt-1 text-xs text-slate-400">
                Direct WhatsApp chat link (e.g. https://wa.me/94773226376)
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Section 2: Branding & Logos ───────────────── */}
      <motion.div
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7C3AED]/10">
            <ImageIcon className="h-5 w-5 text-[#7C3AED]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Branding &amp; Logos
            </h2>
            <p className="text-xs text-slate-500">
              Upload or link your site logos for navbar and hero sections
            </p>
          </div>
        </div>

        {/* Logo Cards */}
        <div className="grid grid-cols-1 gap-0 divide-y divide-slate-100 p-6 sm:grid-cols-2 sm:divide-y-0 sm:divide-x sm:gap-0">
          {/* ─ Navbar Logo ─ */}
          <div className="pb-6 sm:pb-0 sm:pr-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Navbar Logo
            </h3>

            {/* Preview */}
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-3">
              {settings.navLogoUrl ? (
                <img
                  src={settings.navLogoUrl}
                  alt="Navbar logo preview"
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (
                      e.target as HTMLImageElement
                    ).parentElement!.innerHTML = `<div class="flex flex-col items-center gap-1 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span class="text-xs">Image not found</span></div>`;
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">No logo set</span>
                </div>
              )}
            </div>

            {/* Current path */}
            {settings.navLogoUrl && (
              <div className="mb-3 flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2">
                <span className="text-xs font-medium text-slate-500">Current:</span>
                <code className="text-xs text-[#7C3AED] break-all">
                  {settings.navLogoUrl}
                </code>
              </div>
            )}

            {/* Upload button */}
            <div className="mb-3">
              <input
                ref={navFileRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'nav')}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => navFileRef.current?.click()}
                disabled={uploading === 'nav'}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-[#7C3AED]/30 hover:text-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {uploading === 'nav' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading === 'nav' ? 'Uploading...' : 'Upload New'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-slate-400">or enter URL</span>
              </div>
            </div>

            {/* URL input */}
            <div className="relative">
              <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={settings.navLogoUrl}
                onChange={(e) => handleChange('navLogoUrl', e.target.value)}
                placeholder="/logo.svg or https://..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
              />
            </div>
          </div>

          {/* ─ Hero Logo ─ */}
          <div className="pt-6 sm:pt-0 sm:pl-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Hero Logo
            </h3>

            {/* Preview */}
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-3">
              {settings.heroLogoUrl ? (
                <img
                  src={settings.heroLogoUrl}
                  alt="Hero logo preview"
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (
                      e.target as HTMLImageElement
                    ).parentElement!.innerHTML = `<div class="flex flex-col items-center gap-1 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span class="text-xs">Image not found</span></div>`;
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">No logo set</span>
                </div>
              )}
            </div>

            {/* Current path */}
            {settings.heroLogoUrl && (
              <div className="mb-3 flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2">
                <span className="text-xs font-medium text-slate-500">Current:</span>
                <code className="text-xs text-[#7C3AED] break-all">
                  {settings.heroLogoUrl}
                </code>
              </div>
            )}

            {/* Upload button */}
            <div className="mb-3">
              <input
                ref={heroFileRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'hero')}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => heroFileRef.current?.click()}
                disabled={uploading === 'hero'}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-[#7C3AED]/30 hover:text-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {uploading === 'hero' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading === 'hero' ? 'Uploading...' : 'Upload New'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-slate-400">or enter URL</span>
              </div>
            </div>

            {/* URL input */}
            <div className="relative">
              <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={settings.heroLogoUrl}
                onChange={(e) => handleChange('heroLogoUrl', e.target.value)}
                placeholder="/hero-logo.png or https://..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Section 3: Actions ─────────────────────────── */}
      <motion.div
        custom={0.3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
              <Save className="h-5 w-5 text-slate-500" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-slate-900">
                Actions
              </h2>
              <p className="text-xs text-slate-500">
                Save your changes or reset to default values
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Reset to Defaults */}
            <div className="relative">
              <button
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-red-200 hover:text-red-600 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </button>

              {/* Reset Confirmation Popover */}
              <AnimatePresence>
                {confirmReset && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute bottom-full left-0 z-30 mb-2 w-64 rounded-lg border border-slate-200 bg-white p-4 shadow-lg"
                  >
                    <p className="text-sm font-medium text-slate-800">
                      Reset all settings?
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      This will revert all fields to their default values. You still
                      need to save to apply.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={handleReset}
                        className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600 cursor-pointer"
                      >
                        Yes, Reset
                      </button>
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Changes */}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-all hover:shadow-md hover:shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ─── Reset Confirmation Overlay (click outside to close) ── */}
      <AnimatePresence>
        {confirmReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20"
            onClick={() => setConfirmReset(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
