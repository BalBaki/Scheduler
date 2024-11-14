import { NextResponse } from 'next/server';
import { auth } from './auth';
import { hasPermission } from './lib/permissions';

export default auth((request) => {
    const { pathname } = request.nextUrl;

    if (
        request.auth?.user &&
        (pathname.startsWith('/login') || pathname.startsWith('/register'))
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (
        (!request.auth?.user && pathname.startsWith('/profile')) ||
        (pathname.startsWith('/dashboard') &&
            (!request.auth ||
                !hasPermission(request.auth.user, 'dashboard', 'view')))
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
