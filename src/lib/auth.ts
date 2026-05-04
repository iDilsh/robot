import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'iDilshNetwork2026SecretKey!@#$%^&*()'
);

const COOKIE_NAME = 'idilsh_session';

// Credentials from env vars with fallback defaults
const VALID_USERNAME = process.env.ADMIN_USERNAME || 'Thisara2006';
const VALID_PASSWORD = process.env.ADMIN_PASSWORD || 'iDilsh@20060801Cpanel';

export async function signToken(payload: { username: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyAuth(request: NextRequest): Promise<{ authenticated: boolean; username?: string }> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return { authenticated: false };
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { authenticated: true, username: payload.username as string };
  } catch {
    return { authenticated: false };
  }
}

export function validateCredentials(username: string, password: string): boolean {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}

/**
 * Require authentication for admin API routes.
 * Returns null if authenticated, or a NextResponse with 401 if not.
 * Usage: const authError = requireAuth(request); if (authError) return authError;
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const { authenticated } = await verifyAuth(request);
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export { COOKIE_NAME };
