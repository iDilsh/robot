'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, X, Save, Upload } from 'lucide-react';

const CATEGORIES = ['Branding', 'Marketing', 'AI', 'Design', 'Video', 'Web Design'];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export default function CpanelBlogNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Branding');
  const [readTime, setReadTime] = useState('5 min read');
  const [date, setDate] = useState(getTodayDate());
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setSlugManuallyEdited(true);
  };

  const handleKeywordInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeywordsFromInput();
    }
  };

  const addKeywordsFromInput = () => {
    const parts = keywordInput
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k.length > 0);
    const newKeywords = parts.filter((k) => !keywords.includes(k));
    if (newKeywords.length > 0) {
      setKeywords([...keywords, ...newKeywords]);
    }
    setKeywordInput('');
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setFeaturedImage(data.url);
        showToast('Featured image uploaded successfully');
      } else {
        const data = await res.json();
        showToast(data.error || 'Upload failed', 'error');
      }
    } catch {
      showToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug || generateSlug(title),
          excerpt,
          content,
          category,
          readTime,
          date,
          keywords,
          featured,
          featuredImage,
          published: publish,
        }),
      });

      if (res.ok) {
        showToast(publish ? 'Post published successfully!' : 'Draft saved successfully!');
        setTimeout(() => router.push('/cpanel/blog'), 1000);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save post', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${
              toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/cpanel/blog"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create New Post</h1>
          <p className="text-sm text-slate-500">Fill in the details below to create a new blog post.</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title..."
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
            />
          </div>

          {/* Slug */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Slug <span className="text-xs font-normal text-slate-400">(auto-generated from title, editable)</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="post-url-slug"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
            />
          </div>

          {/* Excerpt */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post..."
              rows={3}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full resize-none"
            />
          </div>

          {/* Content */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              rows={12}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full resize-y font-mono"
            />
          </div>

          {/* Featured Image Upload */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Featured Image</label>

            {/* Image Preview */}
            {featuredImage && (
              <div className="mb-4 relative overflow-hidden rounded-lg border border-slate-200">
                <img
                  src={featuredImage}
                  alt="Featured image preview"
                  className="h-48 w-full object-cover"
                />
                <button
                  onClick={() => setFeaturedImage('')}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Upload area */}
            {!featuredImage && (
              <label className="mb-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-8 transition-colors hover:border-[#7C3AED] hover:bg-[#7C3AED]/5">
                <Upload className="h-8 w-8 text-slate-400" />
                <span className="mt-2 text-sm font-medium text-slate-600">
                  {uploading ? 'Uploading...' : 'Click to upload featured image'}
                </span>
                <span className="mt-1 text-xs text-slate-400">
                  PNG, JPG, WEBP up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}

            {/* Or enter URL manually */}
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Or enter image URL manually
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://example.com/image.png"
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
              />
            </div>

            {/* Change image button (when image already set) */}
            {featuredImage && (
              <div className="mt-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                  <Upload className="h-4 w-4" />
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {uploading && (
                  <span className="ml-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Uploading...
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Action Buttons */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-all hover:shadow-md hover:shadow-purple-200 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Publish
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full bg-white border border-slate-300 text-slate-700 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
              >
                Save as Draft
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
            />
          </div>

          {/* Read Time */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Read Time</label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="5 min read"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
            />
          </div>

          {/* Keywords */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Keywords <span className="text-xs font-normal text-slate-400">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordInputKeyDown}
              onBlur={addKeywordsFromInput}
              placeholder="e.g. branding, design, marketing"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
            />
            {keywords.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5 text-xs"
                  >
                    {kw}
                    <button
                      onClick={() => removeKeyword(kw)}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Featured</span>
              <button
                onClick={() => setFeatured(!featured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  featured ? 'bg-[#7C3AED]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm ${
                    featured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Published</span>
              <button
                onClick={() => setPublished(!published)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  published ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm ${
                    published ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
