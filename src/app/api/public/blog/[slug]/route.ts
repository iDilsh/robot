import { NextResponse } from 'next/server';
import { db, serializePost } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await db.blogPost.findFirst({
      where: { slug, published: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(serializePost(post));
  } catch {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}
