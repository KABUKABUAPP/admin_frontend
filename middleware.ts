import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN, USER_TOKEN, routePermissionsMapping } from "./constants";
import { User } from "./models/User";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const verifyCookie = req.cookies.get(ACCESS_TOKEN);
  const userCookie = req.cookies.get(USER_TOKEN);
  let parsedCookie!: User;
  const userRequiresNewPasswordRoute = "/auth/create-password";
  const loggedOutRoutes = ["/auth/login"];

  function generateUserAccessibleRoutes(): string[] {
    const user = req.cookies.get(USER_TOKEN);
    if (user) {
      const parsedUser = JSON.parse(user);

      let userAccessibleRoutes = routePermissionsMapping.map((rp) => {
        if (parsedUser.permissions[`${rp.permissionLabel}`].read === true || parsedUser.permissions[`${rp.permissionLabel}`].write === true) {
          return rp.route;
        }
      });

      userAccessibleRoutes = userAccessibleRoutes.filter(
        (route) => route !== undefined
      );

      return userAccessibleRoutes as string[];
    } else return [] as string[];
  }

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
    const userAccessibleRoutes = generateUserAccessibleRoutes();
    req.nextUrl.pathname =
      userAccessibleRoutes[0] === "/drivers"
        ? "/drivers/active"
        : userAccessibleRoutes[0];
    return NextResponse.redirect(req.nextUrl);
  }

  if (
    verifyCookie &&
    parsedCookie.hasResetDefaultPassword &&
    req.nextUrl.pathname === userRequiresNewPasswordRoute
  ) {
    const userAccessibleRoutes = generateUserAccessibleRoutes();
    req.nextUrl.pathname =
      userAccessibleRoutes[0] === "/drivers"
        ? "/drivers/active"
        : userAccessibleRoutes[0];
    return NextResponse.redirect(req.nextUrl);
  }

  if (
    verifyCookie &&
    parsedCookie.hasResetDefaultPassword &&
    req.nextUrl.pathname !== userRequiresNewPasswordRoute
  ) {
    const userAccessibleRoutes = generateUserAccessibleRoutes();

    const canAccesssRoute = Boolean(
      userAccessibleRoutes.filter((route) => {
        if (req.nextUrl.pathname.startsWith(route)) return true;
        else return false;
      }).length
    );

    if (canAccesssRoute) {
      return NextResponse.next();
    } else {
      req.nextUrl.pathname =
        userAccessibleRoutes[0] === "/drivers"
          ? "/drivers/active"
          : userAccessibleRoutes[0];
      return NextResponse.redirect(req.nextUrl);
    }
  }

  if (
    verifyCookie &&
    !parsedCookie.hasResetDefaultPassword &&
    req.nextUrl.pathname !== userRequiresNewPasswordRoute
  ) {
    req.nextUrl.pathname = "/auth/create-password";
    return NextResponse.redirect(req.nextUrl);
  }

  if (req.nextUrl.pathname === "/") {
    req.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/auth/login",
    "/auth/create-password",
    "/auth/forgot-password",
    "/drivers/:path*",
    "/fare-prices/:path*",
    "/hubs/:path*",
    "/inspectors/:path*",
    "/riders/:path*",
    "/settings/:path*",
    "/sharp-cars/:path*",
    "/sos/:path*",
    "/staffs/:path*",
    "/transactions/:path*",
    "/trips/:path*",
  ],
};
