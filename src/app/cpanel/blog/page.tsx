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
  FileText,
  ChevronDown,
} from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Branding: 'bg-pink-100 text-pink-700',
  Marketing: 'bg-orange-100 text-orange-700',
  AI: 'bg-violet-100 text-violet-700',
  Design: 'bg-sky-100 text-sky-700',
  Video: 'bg-red-100 text-red-700',
  'Web Design': 'bg-teal-100 text-teal-700',
};

const CATEGORY_OPTIONS = ['All', 'Branding', 'Marketing', 'AI', 'Design', 'Video', 'Web Design'];
const STATUS_OPTIONS = ['All', 'Published', 'Draft'];

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-slate-100 text-slate-600';
}

export default function CpanelBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/blog');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch {
      showToast('Failed to fetch posts', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !currentStatus } : p))
        );
        showToast(!currentStatus ? 'Post published' : 'Post moved to draft');
      }
    } catch {
      showToast('Failed to update post', 'error');
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showToast('Post deleted');
      }
    } catch {
      showToast('Failed to delete post', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || post.category === filterCategory;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Published' && post.published) ||
      (filterStatus === 'Draft' && !post.published);
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
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your blog posts, drafts, and published content.
          </p>
        </div>
        <Link
          href="/cpanel/blog/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-purple-600 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-all hover:shadow-md hover:shadow-purple-200"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts by title..."
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
            <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
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

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Keywords
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <FileText className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-3 text-sm font-medium text-slate-500">No posts found</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {search || filterCategory !== 'All' || filterStatus !== 'All'
                        ? 'Try adjusting your filters'
                        : 'Create your first blog post'}
                    </p>
                    {!search && filterCategory === 'All' && filterStatus === 'All' && (
                      <Link
                        href="/cpanel/blog/new"
                        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-purple-600 rounded-lg px-4 py-2 text-sm font-medium text-white hover:shadow-md transition-all"
                      >
                        <Plus className="h-4 w-4" />
                        Create Post
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="group transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800 max-w-[280px]">
                          {post.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-400 max-w-[280px]">
                          /{post.slug}
                        </p>
                        {post.featured && (
                          <span className="mt-1 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => togglePublished(post.id, post.published)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                      >
                        {post.published ? (
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
                      </button>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.keywords.slice(0, 3).map((kw) => (
                          <span
                            key={kw}
                            className="bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5 text-xs"
                          >
                            {kw}
                          </span>
                        ))}
                        {post.keywords.length > 3 && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-400">
                            +{post.keywords.length - 3}
                          </span>
                        )}
                        {post.keywords.length === 0 && (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/cpanel/blog/${post.id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
            <FileText className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-500">No posts found</p>
            <p className="mt-1 text-xs text-slate-400">
              {search || filterCategory !== 'All' || filterStatus !== 'All'
                ? 'Try adjusting your filters'
                : 'Create your first blog post'}
            </p>
            {!search && filterCategory === 'All' && filterStatus === 'All' && (
              <Link
                href="/cpanel/blog/new"
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-purple-600 rounded-lg px-4 py-2 text-sm font-medium text-white hover:shadow-md transition-all"
              >
                <Plus className="h-4 w-4" />
                Create Post
              </Link>
            )}
          </div>
        ) : (
          filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className="h-1 bg-gradient-to-r from-[#7C3AED] to-purple-600" />
              <div className="p-4">
                {/* Title & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {post.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      /{post.slug}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePublished(post.id, post.published)}
                    className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
                      post.published
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {post.published ? (
                      <><Eye className="h-3 w-3" />Published</>
                    ) : (
                      <><EyeOff className="h-3 w-3" />Draft</>
                    )}
                  </button>
                </div>

                {/* Category, Date, Featured */}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Keywords */}
                {post.keywords.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.keywords.slice(0, 4).map((kw) => (
                      <span
                        key={kw}
                        className="bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5 text-xs"
                      >
                        {kw}
                      </span>
                    ))}
                    {post.keywords.length > 4 && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-400">
                        +{post.keywords.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-3 flex items-center justify-end gap-1 border-t border-slate-100 pt-3">
                  <Link
                    href={`/cpanel/blog/${post.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteId(post.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteId && (
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
                Delete Post?
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                This action cannot be undone. The post will be permanently removed.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-white border border-slate-300 text-slate-700 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deletePost(deleteId)}
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
