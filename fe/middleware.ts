import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware that restricts access to protected routes based on the presence of an access token cookie.
 *
 * Redirects requests to `/guest` if the `accessToken` cookie is missing; otherwise, allows the request to proceed.
 *
 * @param req - The incoming Next.js request object.
 * @returns A redirect response to `/guest` if unauthorized, or proceeds to the next middleware or route handler.
 */
export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/guest", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/member/:path*", "/protected/:path*"],
};
