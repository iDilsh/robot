'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Trash2, Upload, Save, X } from 'lucide-react';

const CATEGORIES = ['Branding', 'Video', 'Web', 'Social Media', 'AI Creations'];

export default function CpanelPortfolioEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('Branding');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/portfolio/${Number(id)}`);
        if (res.ok) {
          const project = await res.json();
          setTitle(project.title || '');
          setClient(project.client || '');
          setCategory(project.category || 'Branding');
          setDescription(project.description || '');
          setImageUrl(project.imageUrl || '');
          setPublished(project.published || false);
        } else {
          showToast('Project not found', 'error');
          setTimeout(() => router.push('/cpanel/portfolio'), 1500);
        }
      } catch {
        showToast('Failed to load project', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, router]);

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
        setImageUrl(data.url);
        showToast('Image uploaded successfully');
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

  const handleSave = async (publish?: boolean) => {
    if (!title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        title: title.trim(),
        client: client.trim(),
        category,
        description,
        imageUrl,
        published: publish !== undefined ? publish : published,
      };

      const res = await fetch(`/api/portfolio/${Number(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        showToast('Project updated successfully!');
        setTimeout(() => router.push('/cpanel/portfolio'), 1000);
      } else {
        showToast('Failed to update project', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async () => {
    try {
      const res = await fetch(`/api/portfolio/${Number(id)}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/cpanel/portfolio');
      } else {
        showToast('Failed to delete project', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
      </div>
    );
  }

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
          href="/cpanel/portfolio"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
          <p className="text-sm text-slate-500">Update your portfolio project details.</p>
        </div>
        <button
          onClick={() => setShowDelete(true)}
          className="flex items-center gap-2 bg-red-500 text-white rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-red-600 transition cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
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
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title..."
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
            />
          </div>

          {/* Client */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Client</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Client name..."
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
            />
          </div>

          {/* Description */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description..."
              rows={4}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full resize-none"
            />
          </div>

          {/* Image Upload */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Image</label>

            {/* Image Preview */}
            {imageUrl && (
              <div className="mb-4 relative overflow-hidden rounded-lg border border-slate-200">
                <img
                  src={imageUrl}
                  alt="Project preview"
                  className="h-48 w-full object-cover"
                />
                <button
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Upload area (when no image) */}
            {!imageUrl && (
              <label className="mb-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-8 transition-colors hover:border-[#7C3AED] hover:bg-[#7C3AED]/5">
                <Upload className="h-8 w-8 text-slate-400" />
                <span className="mt-2 text-sm font-medium text-slate-600">
                  {uploading ? 'Uploading...' : 'Click to upload image'}
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
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
              />
            </div>

            {/* Change image button (when image set) */}
            {imageUrl && (
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

          {/* Published Toggle */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-700">Published</span>
                <p className="mt-0.5 text-xs text-slate-400">
                  Make this project visible on the website
                </p>
              </div>
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

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowDelete(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Delete Project?</h3>
              <p className="mt-2 text-sm text-slate-500">
                This action cannot be undone. The project will be permanently removed.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDelete(false)}
                  className="bg-white border border-slate-300 text-slate-700 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteProject}
                  className="bg-red-500 text-white rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
