import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set to true to enable maintenance mode
const MAINTENANCE_MODE = true;

// Paths that should NOT be redirected to maintenance
const EXCLUDED_PATHS = [
  "/maintenance",
  "/api",
  "/_next",
  "/favicon.ico",
  "/images",
  "/fonts",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for excluded paths
  const isExcluded = EXCLUDED_PATHS.some((path) => pathname.startsWith(path));

  if (MAINTENANCE_MODE && !isExcluded) {
    // Rewrite all routes to maintenance page
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    const response = NextResponse.rewrite(url);
    response.headers.set("x-pathname", "/maintenance");
    return response;
  }

  // Set pathname header for layout to use
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
