'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  ArrowRight,
  Mail,
  Clock,
  Calendar,
  Bookmark,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import GradientButton from '@/components/ui-extensions/gradient-button';
import { BLOG_POSTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/* ────────────────────────── Data ────────────────────────── */

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  keywords: string[];
  featuredImage: string;
}

const CATEGORIES = [
  'All',
  'Design',
  'Marketing',
  'Social Media',
  'SEO',
  'Branding',
  'Tutorials',
  'AI',
  'Video',
  'Web Design',
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  Branding: 'bg-violet-100 text-violet-700',
  Marketing: 'bg-cyan-100 text-cyan-700',
  AI: 'bg-purple-100 text-purple-700',
  Design: 'bg-pink-100 text-pink-700',
  Video: 'bg-amber-100 text-amber-700',
  'Web Design': 'bg-emerald-100 text-emerald-700',
  'Social Media': 'bg-sky-100 text-sky-700',
  SEO: 'bg-orange-100 text-orange-700',
  Tutorials: 'bg-teal-100 text-teal-700',
};

const POST_GRADIENTS: Record<string, string> = {
  '10-branding-mistakes-killing-your-business': 'from-violet-500 to-purple-600',
  'complete-guide-social-media-2026': 'from-cyan-500 to-blue-600',
  'ai-graphic-design-what-you-need-to-know': 'from-purple-500 to-violet-600',
  'how-to-choose-logo-designer-red-flags': 'from-pink-500 to-rose-600',
  'video-marketing-statistics-2026': 'from-amber-500 to-orange-600',
  'why-every-small-business-needs-website': 'from-emerald-500 to-teal-600',
};

/* ────────────────────── Animation helpers ────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

/* ──────────────────────── Sections ──────────────────────── */

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-violet-light/60 via-brand-violet-light/20 to-white pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-violet/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-brand-cyan/5 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand-violet">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-brand-violet">Blog</li>
          </ol>
        </nav>

        <motion.h1
          className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Insights, Guides &{' '}
          <span className="text-brand-violet">Digital Marketing Tips</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          Stay ahead of the curve with expert insights on design, marketing, and building a powerful digital presence.
        </motion.p>
      </div>
    </section>
  );
}

function FeaturedPost({ posts }: { posts: BlogPost[] }) {
  const featured = posts.find((p) => p.featured);
  if (!featured) return null;

  const colorClass = CATEGORY_COLORS[featured.category] || 'bg-slate-100 text-slate-700';
  const hasFeaturedImage = featured.featuredImage && featured.featuredImage.trim() !== '';

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group block overflow-hidden rounded-2xl"
          >
            {/* Large banner */}
            <div className={cn(
              'relative',
              hasFeaturedImage ? '' : 'bg-gradient-to-br from-violet-600 via-brand-violet to-cyan-500'
            )}>
              {hasFeaturedImage && (
                <img
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="w-full aspect-[2/1] sm:aspect-[3/1] object-cover"
                />
              )}

              {/* Decorative shapes (only when no image) */}
              {!hasFeaturedImage && (
                <>
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-sm" />
                    <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/8 blur-sm" />
                    <div className="absolute right-1/3 top-1/4 h-32 w-32 rounded-full bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                    <div className="flex items-center justify-center p-10 md:p-12">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm sm:h-32 sm:w-32">
                        <Bookmark className="h-12 w-12 text-white sm:h-16 sm:w-16" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-6 pb-10 md:p-10 md:pb-10">
                      <span className={cn('inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold', 'bg-white/20 text-white backdrop-blur-sm')}>
                        {featured.category}
                      </span>
                      <h2 className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl group-hover:underline decoration-white/40 underline-offset-4">
                        {featured.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base sm:leading-relaxed line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-cyan-200">
                        Read Full Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Content overlay when there IS an image */}
              {hasFeaturedImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <span className={cn('inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold mb-4', 'bg-white/20 text-white backdrop-blur-sm')}>
                    {featured.category}
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl group-hover:underline decoration-white/40 underline-offset-4 drop-shadow-lg">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-relaxed line-clamp-2 drop-shadow">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-cyan-200">
                    Read Full Article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryFilter({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: Category;
  onFilterChange: (category: Category) => void;
}) {
  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:pb-0">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category}
              onClick={() => onFilterChange(category)}
              className={cn(
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer',
                activeFilter === category
                  ? 'bg-brand-violet text-white shadow-md shadow-brand-violet/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-brand-violet/10 hover:text-brand-violet'
              )}
              whileHover={activeFilter !== category ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.97 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  const gradient = POST_GRADIENTS[post.slug] || 'from-violet-500 to-purple-600';
  const colorClass = CATEGORY_COLORS[post.category] || 'bg-slate-100 text-slate-700';
  const hasFeaturedImage = post.featuredImage && post.featuredImage.trim() !== '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.06,
      }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-violet/20">
          {/* Thumbnail */}
          {hasFeaturedImage ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Category tag on image */}
              <span className={cn('absolute left-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold', colorClass)}>
                {post.category}
              </span>
            </div>
          ) : (
            <div className={cn('relative aspect-[16/10] w-full bg-gradient-to-br', gradient)}>
              {/* Decorative shapes */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-sm" />
                <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/8 blur-sm" />
              </div>
              {/* Category tag on image */}
              <span className={cn('absolute left-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold', colorClass)}>
                {post.category}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="font-heading text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-brand-violet transition-colors duration-200">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta + Read More */}
            <div className="mt-auto pt-4 border-t border-border/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <span className="text-sm font-medium text-brand-violet transition-colors group-hover:text-[#6D28D9]">
                  Read More →
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function PostGrid({ activeFilter, posts }: { activeFilter: Category; posts: BlogPost[] }) {
  const featured = posts.find((p) => p.featured);
  const nonFeatured = posts.filter((p) => !p.featured);

  const filteredPosts =
    activeFilter === 'All'
      ? nonFeatured
      : nonFeatured.filter((p) => p.category === activeFilter);

  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
          >
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <p className="text-lg text-muted-foreground">
              No posts found in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-violet via-[#6D28D9] to-brand-violet py-20 md:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-cyan-400/10 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Subscribe to Our Newsletter
          </h2>

          <p className="mt-4 text-lg text-white/80">
            Get the latest insights, tips, and resources delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="h-12 flex-1 rounded-xl border-0 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 sm:rounded-r-none sm:rounded-l-xl sm:max-w-xs"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-white px-8 text-sm font-semibold text-brand-violet transition-all duration-200 hover:bg-white/90 hover:shadow-lg cursor-pointer sm:rounded-l-none sm:rounded-r-xl"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-4 text-xs text-white/50">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Page ──────────────────────── */

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/public/blog');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPosts(data);
          } else {
            // Fallback to constants
            setPosts(BLOG_POSTS as unknown as BlogPost[]);
          }
        } else {
          setPosts(BLOG_POSTS as unknown as BlogPost[]);
        }
      } catch {
        setPosts(BLOG_POSTS as unknown as BlogPost[]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero />
      <FeaturedPost posts={posts} />
      <CategoryFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <PostGrid activeFilter={activeFilter} posts={posts} />
      <NewsletterCTA />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
