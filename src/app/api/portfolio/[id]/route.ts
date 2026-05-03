import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, PortfolioProject } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projects = readData<PortfolioProject[]>('portfolio-projects.json');
    const project = projects.find((p) => p.id === Number(id));

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error reading project:', error);
    return NextResponse.json({ error: 'Failed to read project' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const projects = readData<PortfolioProject[]>('portfolio-projects.json');
    const index = projects.findIndex((p) => p.id === Number(id));

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    projects[index] = {
      ...projects[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    writeData('portfolio-projects.json', projects);
    return NextResponse.json(projects[index]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projects = readData<PortfolioProject[]>('portfolio-projects.json');
    const index = projects.findIndex((p) => p.id === Number(id));

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    projects.splice(index, 1);
    writeData('portfolio-projects.json', projects);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
