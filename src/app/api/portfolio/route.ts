import { NextRequest, NextResponse } from 'next/server';
import { db, serializeProject } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const projects = await db.portfolioProject.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(projects.map(serializeProject));
  } catch (error) {
    console.error('Error reading portfolio:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    const newProject = await db.portfolioProject.create({
      data: {
        title: body.title || '',
        client: body.client || '',
        category: body.category || 'Branding',
        description: body.description || '',
        imageUrl: body.imageUrl || '',
        published: body.published || false,
      },
    });

    return NextResponse.json(serializeProject(newProject), { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
