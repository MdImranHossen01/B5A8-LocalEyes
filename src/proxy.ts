import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Admin-specific routes that require authentication
const adminRoutes = [
  '/admin',
  '/admin/users',
  '/api/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's an admin route
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Check for authorization header (for API routes)
  const authHeader = request.headers.get('authorization');
  let token: string | null = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    // Check cookies for web routes
    const cookieToken = request.cookies.get('token')?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { 
        status: 401,
        headers: { 'content-type': 'application/json' }
      }
    );
  }

  try {
    // Verify token
    const decoded = verifyToken(token);
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Admin access required' }),
        { 
          status: 403,
          headers: { 'content-type': 'application/json' }
        }
      );
    }

    // Add user info to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Invalid token' }),
      { 
        status: 401,
        headers: { 'content-type': 'application/json' }
      }
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all admin request paths
     */
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};