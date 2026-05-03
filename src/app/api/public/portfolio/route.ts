import { NextResponse } from 'next/server';
import { readData, PortfolioProject } from '@/lib/data';

export async function GET() {
  try {
    const projects = readData<PortfolioProject[]>('portfolio-projects.json');
    // Only return published projects for public
    const published = projects.filter((p) => p.published);
    return NextResponse.json(published);
  } catch (error) {
    console.error('Error reading public portfolio:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}
