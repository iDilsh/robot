import { NextResponse } from 'next/server';
import { readData, SiteSettings } from '@/lib/data';

export async function GET() {
  try {
    const settings = readData<SiteSettings>('site-settings.json');
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error reading public settings:', error);
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}
