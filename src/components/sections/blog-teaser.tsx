'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';
import SectionHeading from '@/components/ui-extensions/section-heading';

const categoryColors: Record<string, string> = {
  Branding: 'bg-brand-violet/10 text-brand-violet',
  Marketing: 'bg-brand-cyan/10 text-brand-cyan',
  AI: 'bg-pink-500/10 text-pink-600',
  Design: 'bg-amber-500/10 text-amber-600',
  Video: 'bg-emerald-500/10 text-emerald-600',
  'Web Design': 'bg-brand-violet/10 text-brand-violet',
};

const gradientColors: Record<string, string> = {
  Branding: 'from-brand-violet/15 to-brand-violet/5',
  Marketing: 'from-brand-cyan/15 to-brand-cyan/5',
  AI: 'from-pink-500/15 to-pink-500/5',
  Design: 'from-amber-500/15 to-amber-500/5',
  Video: 'from-emerald-500/15 to-emerald-500/5',
  'Web Design': 'from-brand-violet/15 to-brand-cyan/5',
};

export default function BlogTeaser() {
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/public/blog');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPosts(data);
          }
        }
      } catch {
        // Keep fallback
      }
    };
    fetchPosts();
  }, []);

  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="[ LATEST FROM THE BLOG ]"
          title="Insights, Tips & Industry Trends"
          subtitle="Stay ahead of the curve with our latest articles on design, marketing, and digital growth."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-violet/15"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Thumbnail */}
              {post.featuredImage && post.featuredImage.trim() !== '' ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div
                  className={`aspect-[16/9] bg-gradient-to-br ${gradientColors[post.category] || 'from-slate-100 to-slate-50'} transition-transform duration-500 group-hover:scale-[1.02]`}
                />
              )}

              <div className="p-5">
                {/* Category Tag */}
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category] || 'bg-slate-100 text-slate-600'}`}
                >
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="mt-3 font-heading text-base font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-brand-violet">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Read More */}
                <a
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors duration-200 hover:text-[#6D28D9]"
                >
                  Read More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
