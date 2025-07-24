import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const basicAuth = Buffer.from(
  `${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASS}`
).toString('base64');

export function middleware(req: NextRequest) {
  // Allow Next.js internals and static files
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.startsWith('/favicon.ico') ||
    req.nextUrl.pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization');
  if (auth === `Basic ${basicAuth}`) {
    return NextResponse.next();
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/((?!_next|api|favicon.ico|public).*)',
};