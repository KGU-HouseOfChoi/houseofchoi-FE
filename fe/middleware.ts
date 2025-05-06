import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/gest", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/member/:path*", "/protected/:path*"],
};
