import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const verifyCookie = req.cookies.get(ACCESS_TOKEN);

  if (pathname.startsWith("/_next")) return NextResponse.next();


  if (!verifyCookie) {
    if (!req.nextUrl.pathname.startsWith("/auth")) {
      req.nextUrl.pathname = "/auth/login";
      return NextResponse.redirect(req.nextUrl);
    }
  } 
  else if (verifyCookie && req.nextUrl.pathname.startsWith("/auth")) {
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }
  
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/forgot-password",
    "/drivers",
    "/fare-prices",
    "/hubs",
    "/inspectors",
    "/riders",
    "/settings",
    "/sharp-cars",
    "/sos",
    "/staffs",
    "/transactions",
    "/trips",
  ],
};
