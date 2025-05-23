import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Skip middleware for login, register pages and API routes
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated via cookie
  const authCookie = request.cookies.get("hr-dashboard-auth")

  // If no auth cookie, redirect to login
  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const authState = JSON.parse(authCookie.value)
    if (!authState.state.isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } catch (error) {
    // If parsing fails, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login|register).*)"],
}
