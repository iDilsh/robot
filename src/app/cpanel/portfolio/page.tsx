'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Briefcase,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react';

interface PortfolioProject {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Branding: 'bg-pink-100 text-pink-700',
  Video: 'bg-red-100 text-red-700',
  Web: 'bg-teal-100 text-teal-700',
  'Social Media': 'bg-orange-100 text-orange-700',
  'AI Creations': 'bg-violet-100 text-violet-700',
};

const CATEGORY_OPTIONS = ['All', 'Branding', 'Video', 'Web', 'Social Media', 'AI Creations'];
const STATUS_OPTIONS = ['All', 'Published', 'Draft'];

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-slate-100 text-slate-600';
}

export default function CpanelPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {
      showToast('Failed to fetch projects', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = () => {
      setCategoryOpen(false);
      setStatusOpen(false);
    };
    if (categoryOpen || statusOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [categoryOpen, statusOpen]);

  const togglePublished = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !currentStatus } : p))
        );
        showToast(!currentStatus ? 'Project published' : 'Project moved to draft');
      }
    } catch {
      showToast('Failed to update project', 'error');
    }
  };

  const deleteProject = async (id: number) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast('Project deleted');
      }
    } catch {
      showToast('Failed to delete project', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Published' && project.published) ||
      (filterStatus === 'Draft' && !project.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
              toast.type === 'success'
                ? 'bg-emerald-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio Projects</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your portfolio projects and showcase your work.
          </p>
        </div>
        <Link
          href="/cpanel/portfolio/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-purple-600 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-all hover:shadow-md hover:shadow-purple-200"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition w-full"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCategoryOpen(!categoryOpen);
              setStatusOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            {filterCategory === 'All' ? 'All Categories' : filterCategory}
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
          </button>
          {categoryOpen && (
            <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilterCategory(cat);
                    setCategoryOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-sm transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#7C3AED]/10 text-[#7C3AED] font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setStatusOpen(!statusOpen);
              setCategoryOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            {filterStatus === 'All' ? 'All Status' : filterStatus}
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${statusOpen ? 'rotate-180' : ''}`} />
          </button>
          {statusOpen && (
            <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setStatusOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-sm transition-colors cursor-pointer ${
                    filterStatus === status
                      ? 'bg-[#7C3AED]/10 text-[#7C3AED] font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {status === 'All' ? 'All Status' : status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
          <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-500">No projects found</p>
          <p className="mt-1 text-xs text-slate-400">
            {search || filterCategory !== 'All' || filterStatus !== 'All'
              ? 'Try adjusting your filters'
              : 'Create your first portfolio project'}
          </p>
          {!search && filterCategory === 'All' && filterStatus === 'All' && (
            <Link
              href="/cpanel/portfolio/new"
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-purple-600 rounded-lg px-4 py-2 text-sm font-medium text-white hover:shadow-md transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative h-44 w-full bg-slate-100">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-slate-300" />
                  </div>
                )}
                {/* Status badge overlay */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${
                      project.published
                        ? 'bg-emerald-100/90 text-emerald-700'
                        : 'bg-amber-100/90 text-amber-700'
                    }`}
                  >
                    {project.published ? (
                      <>
                        <Eye className="h-3 w-3" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3" />
                        Draft
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {/* Title & Client */}
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-800">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {project.client || 'No client'}
                  </p>
                </div>

                {/* Category Badge & Date */}
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(project.category)}`}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(project.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <button
                    onClick={() => togglePublished(project.id, project.published)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      project.published
                        ? 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    {project.published ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        Publish
                      </>
                    )}
                  </button>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/cpanel/portfolio/${project.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(project.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setDeleteId(null)}
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
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Delete Project?
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                This action cannot be undone. The project will be permanently removed.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-white border border-slate-300 text-slate-700 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteProject(deleteId)}
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
