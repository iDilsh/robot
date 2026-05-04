import { NextResponse } from 'next/server';
import { readData, BlogPost } from '@/lib/data';

export async function GET() {
  try {
    const posts = readData<BlogPost[]>('blog-posts.json');
    // Only return published posts for public
    const published = posts.filter((p) => p.published);
    return NextResponse.json(published);
  } catch (error) {
    console.error('Error reading public blog posts:', error);
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
  }
}
