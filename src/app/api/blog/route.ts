import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, generateId, BlogPost } from '@/lib/data';

export async function GET() {
  try {
    const posts = readData<BlogPost[]>('blog-posts.json');
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const posts = readData<BlogPost[]>('blog-posts.json');

    const newPost: BlogPost = {
      id: generateId(),
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: body.title || '',
      excerpt: body.excerpt || '',
      content: body.content || '',
      category: body.category || 'Uncategorized',
      date: body.date || new Date().toISOString().split('T')[0],
      readTime: body.readTime || '5 min read',
      featured: body.featured || false,
      published: body.published || false,
      keywords: body.keywords || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.unshift(newPost);
    writeData('blog-posts.json', posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
