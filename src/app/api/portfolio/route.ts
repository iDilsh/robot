import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, generateNumericId, PortfolioProject } from '@/lib/data';

export async function GET() {
  try {
    const projects = readData<PortfolioProject[]>('portfolio-projects.json');
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading portfolio:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projects = readData<PortfolioProject[]>('portfolio-projects.json');

    const newProject: PortfolioProject = {
      id: generateNumericId(),
      title: body.title || '',
      client: body.client || '',
      category: body.category || 'Branding',
      description: body.description || '',
      imageUrl: body.imageUrl || '',
      published: body.published || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.unshift(newProject);
    writeData('portfolio-projects.json', projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
