import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    let settings = await db.siteSettings.findUnique({ where: { id: 1 } });

    // If no settings exist yet, create default ones
    if (!settings) {
      settings = await db.siteSettings.create({
        data: { id: 1 },
      });
    }

    // Return without the id field for API compatibility
    const { id, ...data } = settings;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Upsert: create if doesn't exist, update if it does
    const updated = await db.siteSettings.upsert({
      where: { id: 1 },
      update: {
        ...(body.siteName !== undefined && { siteName: body.siteName }),
        ...(body.siteTagline !== undefined && { siteTagline: body.siteTagline }),
        ...(body.siteUrl !== undefined && { siteUrl: body.siteUrl }),
        ...(body.contactEmail !== undefined && { contactEmail: body.contactEmail }),
        ...(body.whatsappLink !== undefined && { whatsappLink: body.whatsappLink }),
        ...(body.navLogoUrl !== undefined && { navLogoUrl: body.navLogoUrl }),
        ...(body.heroLogoUrl !== undefined && { heroLogoUrl: body.heroLogoUrl }),
      },
      create: {
        id: 1,
        siteName: body.siteName || 'iDilsh Network',
        siteTagline: body.siteTagline || 'Ignite Designs. Illuminate Dreams.',
        siteUrl: body.siteUrl || 'https://idilsh.top',
        contactEmail: body.contactEmail || 'hello@idilsh.top',
        whatsappLink: body.whatsappLink || 'https://wa.me/94773226376',
        navLogoUrl: body.navLogoUrl || '/logo.svg',
        heroLogoUrl: body.heroLogoUrl || '/hero-logo.png',
      },
    });

    const { id, ...data } = updated;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
