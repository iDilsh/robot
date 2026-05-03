import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, SiteSettings } from '@/lib/data';

export async function GET() {
  try {
    const settings = readData<SiteSettings>('site-settings.json');
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const current = readData<SiteSettings>('site-settings.json');

    const updated: SiteSettings = {
      ...current,
      ...body,
    };

    writeData('site-settings.json', updated);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
