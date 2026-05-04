import { NextResponse } from 'next/server';
import { db, serializePost } from '@/lib/db';

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts.map(serializePost));
  } catch (error) {
    console.error('Error reading public blog posts:', error);
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
  }
}
