import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { LOCALES, DEFAULT_LOCALE } from './lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const nextWithLocale = (locale: 'ar' | 'en') => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-site-locale', locale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  };

  const localizedAdminMatch = pathname.match(/^\/(en|ar)\/admin(?=\/|$)(.*)$/);
  if (localizedAdminMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/admin${localizedAdminMatch[2]}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/admin')) {
    if (pathname.startsWith('/admin/login')) {
      return nextWithLocale('en');
    }

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return nextWithLocale('en');
  }

  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return nextWithLocale('en');
  }

  const pathnameLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    return nextWithLocale(pathnameLocale);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
