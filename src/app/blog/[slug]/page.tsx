import { BLOG_POSTS } from '@/lib/constants';
import BlogPostClient from './blog-post-client';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostClient params={params} />;
}
