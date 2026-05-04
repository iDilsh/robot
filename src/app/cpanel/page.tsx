'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  Briefcase,
  Eye,
  CheckCircle2,
  Plus,
  Settings,
  ArrowRight,
  Clock,
  Newspaper,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  published: boolean;
  updatedAt: string;
  category: string;
}

interface PortfolioProject {
  id: number;
  title: string;
  published: boolean;
  updatedAt: string;
  category: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

export default function CpanelDashboard() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [publishedPosts, setPublishedPosts] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [publishedProjects, setPublishedProjects] = useState(0);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, projectsRes] = await Promise.all([
          fetch('/api/blog'),
          fetch('/api/portfolio'),
        ]);

        if (postsRes.ok) {
          const posts: BlogPost[] = await postsRes.json();
          setTotalPosts(posts.length);
          setPublishedPosts(posts.filter((p) => p.published).length);
          setRecentPosts(posts.slice(0, 5));
        }

        if (projectsRes.ok) {
          const projects: PortfolioProject[] = await projectsRes.json();
          setTotalProjects(projects.length);
          setPublishedProjects(projects.filter((p) => p.published).length);
        }
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: 'Total Blog Posts',
      value: totalPosts,
      icon: FileText,
      bgColor: 'bg-brand-violet/10',
      textColor: 'text-brand-violet',
    },
    {
      label: 'Published Posts',
      value: publishedPosts,
      icon: CheckCircle2,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Portfolio Projects',
      value: totalProjects,
      icon: Briefcase,
      bgColor: 'bg-brand-cyan/10',
      textColor: 'text-brand-cyan',
    },
    {
      label: 'Published Projects',
      value: publishedProjects,
      icon: Eye,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-violet border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Welcome back, <span className="text-brand-violet">Thisara</span>! 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your site today.
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              custom={index * 0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.textColor}`} />
                </div>
                <span className="font-heading text-3xl font-bold text-slate-900">
                  {card.value}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                {card.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="mb-3 font-heading text-base font-semibold text-slate-800">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/cpanel/blog/new"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-violet px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-violet/90 hover:shadow-md hover:shadow-brand-violet/20"
          >
            <Plus className="h-4 w-4" />
            New Blog Post
          </Link>
          <Link
            href="/cpanel/portfolio/new"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-brand-violet hover:border-brand-violet/30"
          >
            <Plus className="h-4 w-4" />
            Add Portfolio Project
          </Link>
          <Link
            href="/cpanel/settings"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-brand-violet hover:border-brand-violet/30"
          >
            <Settings className="h-4 w-4" />
            Site Settings
          </Link>
        </div>
      </motion.div>

      {/* Recent blog posts table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5">
          <h3 className="flex items-center gap-2 font-heading text-base font-semibold text-slate-900">
            <Newspaper className="h-4 w-4 text-brand-violet" />
            Recent Blog Posts
          </h3>
          <Link
            href="/cpanel/blog"
            className="flex items-center gap-1 text-xs font-medium text-brand-violet hover:text-[#6D28D9] transition-colors"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-2 text-sm text-muted-foreground">No blog posts yet</p>
            <Link
              href="/cpanel/blog/new"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-violet hover:text-[#6D28D9] transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-4 sm:px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Title
                  </th>
                  <th className="px-4 sm:px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-4 sm:px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-4 sm:px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-4 sm:px-5 py-3">
                      <p className="truncate max-w-[200px] sm:max-w-xs text-sm font-medium text-slate-800">
                        {post.title}
                      </p>
                    </td>
                    <td className="px-4 sm:px-5 py-3 hidden sm:table-cell">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          post.published
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 hidden md:table-cell">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
