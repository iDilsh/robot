import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  return NextResponse.json(auth);
}
