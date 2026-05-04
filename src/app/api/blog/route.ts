import { NextRequest, NextResponse } from 'next/server';
import { db, serializePost } from '@/lib/db';
import { generateSlug } from '@/lib/data';

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts.map(serializePost));
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const slug = body.slug || generateSlug(body.title || '');

    // Check for duplicate slug
    const existing = await db.blogPost.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug;

    const newPost = await db.blogPost.create({
      data: {
        slug: finalSlug,
        title: body.title || '',
        excerpt: body.excerpt || '',
        content: body.content || '',
        category: body.category || 'Uncategorized',
        date: body.date || new Date().toISOString().split('T')[0],
        readTime: body.readTime || '5 min read',
        featured: body.featured || false,
        published: body.published || false,
        keywords: body.keywords || [],
        featuredImage: body.featuredImage || '',
      },
    });

    return NextResponse.json(serializePost(newPost), { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
