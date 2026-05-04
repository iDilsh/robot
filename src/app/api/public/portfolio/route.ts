import { NextResponse } from 'next/server';
import { db, serializeProject } from '@/lib/db';

export async function GET() {
  try {
    const projects = await db.portfolioProject.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(projects.map(serializeProject));
  } catch (error) {
    console.error('Error reading public portfolio:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}
