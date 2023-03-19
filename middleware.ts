import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./constants";
import { MIDDLEWARE_ROUTES } from "./constants";

export function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  const verifyCookie = req.cookies.get(ACCESS_TOKEN);

  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (!verifyCookie) {
    if (!req.nextUrl.pathname.startsWith("/auth")) {
      req.nextUrl.pathname = "/auth/login";
      return NextResponse.redirect(req.nextUrl);
    }
  } else if (
    verifyCookie &&
    (req.nextUrl.pathname.startsWith("/auth/login") ||
      req.nextUrl.pathname === "/")
  ) {
    req.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: [...MIDDLEWARE_ROUTES],
};
