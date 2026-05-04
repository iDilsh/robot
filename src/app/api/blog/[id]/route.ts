import { NextRequest, NextResponse } from 'next/server';
import { db, serializePost } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await db.blogPost.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(serializePost(post));
  } catch (error) {
    console.error('Error reading blog post:', error);
    return NextResponse.json({ error: 'Failed to read post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if post exists
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // If slug is being changed, check for duplicates
    if (body.slug && body.slug !== existing.slug) {
      const duplicate = await db.blogPost.findUnique({ where: { slug: body.slug } });
      if (duplicate) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
      }
    }

    const updated = await db.blogPost.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.date !== undefined && { date: body.date }),
        ...(body.readTime !== undefined && { readTime: body.readTime }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.published !== undefined && { published: body.published }),
        ...(body.keywords !== undefined && { keywords: body.keywords }),
        ...(body.featuredImage !== undefined && { featuredImage: body.featuredImage }),
      },
    });

    return NextResponse.json(serializePost(updated));
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await db.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
