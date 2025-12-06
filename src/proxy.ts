import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

type UserRole = "admin" | "tourist" | "guide";

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = [
  "/login",
  "/register"
];

const commonProtectedRoutes: RouteConfig = {
  exact: ["/dashboard"],
  patterns: [/^\/dashboard($|\/)/],
};

const adminProtectedRoutes: RouteConfig = {
  exact: ["/admin"],
  patterns: [/^\/admin($|\/)/, /^\/dashboard\/admin($|\/)/],
};

const guideProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/listings($|\/)/, /^\/dashboard\/earnings($|\/)/],
  exact: [],
};

const touristProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/my-bookings($|\/)/],
  exact: [],
};

const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

const getRouteOwner = (
  pathname: string
): "admin" | "guide" | "tourist" | "common" | "null" => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "admin";
  }
  if (isRouteMatches(pathname, guideProtectedRoutes)) {
    return "guide";
  }
  if (isRouteMatches(pathname, touristProtectedRoutes)) {
    return "tourist";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "common";
  }
  return "null";
};

const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "admin") {
    return "/admin";
  }
  return "/dashboard";
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get the session token using NextAuth
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === 'production' 
      ? '__Secure-next-auth.session-token' 
      : 'next-auth.session-token'
  });

  const isAuthenticated = !!token;
  const userRole = token?.role as UserRole || null;

  // Debug logging (remove in production)
  console.log('Middleware:', {
    pathname,
    isAuthenticated,
    userRole,
    hasToken: !!token
  });

  // If user is on auth route but already logged in, redirect to dashboard
  if (isAuthRoute(pathname) && isAuthenticated && userRole) {
    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
  }

  // Check if route requires authentication
  const routeOwner = getRouteOwner(pathname);
  
  // If route is protected and user is not authenticated, redirect to login
  if (routeOwner !== "null" && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  if (isAuthenticated && userRole) {
    if (routeOwner === "admin" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    
    if (routeOwner === "guide" && userRole !== "guide") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    
    if (routeOwner === "tourist" && userRole !== "tourist") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};