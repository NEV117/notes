import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export const config = {
  matcher: [
    '/auth/:path*',
    '/'
  ]
}

  export function middleware(request: NextRequest) {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;   
  
    if (accessToken && request.nextUrl.pathname === '/auth') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  
    if (!accessToken && request.nextUrl.pathname !== '/auth') {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }