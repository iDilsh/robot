import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    let settings = await db.siteSettings.findUnique({ where: { id: 1 } });

    if (!settings) {
      settings = await db.siteSettings.create({
        data: { id: 1 },
      });
    }

    const { id, ...data } = settings;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading public settings:', error);
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}
