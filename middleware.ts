import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN, USER_TOKEN } from "./constants";
import { User } from "./models/User";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const verifyCookie = req.cookies.get(ACCESS_TOKEN);
  const userCookie = req.cookies.get(USER_TOKEN);
  let parsedCookie!: User;
  const userRequiresNewPasswordRoute = "/auth/create-password";
  const loggedOutRoutes = ["/auth/login"];

  if (userCookie) {
    parsedCookie = JSON.parse(userCookie);
  }

  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (!verifyCookie) {
    if (loggedOutRoutes.indexOf(req.nextUrl.pathname) === -1) {
      req.nextUrl.pathname = "/auth/login";
      return NextResponse.redirect(req.nextUrl);
    }
  }

  if (verifyCookie && loggedOutRoutes.indexOf(req.nextUrl.pathname) !== -1) {
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }

  if (
    verifyCookie &&
    parsedCookie.hasResetDefaultPassword &&
    req.nextUrl.pathname === userRequiresNewPasswordRoute
  ) {
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }

  if (
    verifyCookie &&
    !parsedCookie.hasResetDefaultPassword &&
    req.nextUrl.pathname !== userRequiresNewPasswordRoute
  ) {
    req.nextUrl.pathname = "/auth/create-password";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/create-password",
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
