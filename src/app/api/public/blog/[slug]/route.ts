import { NextResponse } from 'next/server';
import { readData } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const posts = readData<any[]>('blog-posts.json');
    const post = posts.find((p) => p.slug === slug && p.published);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}
