import { NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/bookings", "/orders", "/profile"];

// function getRequiredPermission(pathname: string): string | null {
//   if (!pathname.startsWith("/admin") && !pathname.startsWith("/pos"))
//     return null;

//   const segments = pathname.split("/").filter(Boolean);
//   // if (pathname.startsWith("/admin")) {
//   if (segments.length === 1) return "admin.access";
//   if (segments.length > 1 && segments[1] == "dashboard")
//     return `${segments[0]}.access`;

//   if (segments[1] === "settings" && segments.length > 2) {
//     const subModule = segments[2].replace(/-/g, "_");
//     return `${subModule}.view`;
//   }

//   const moduleName = segments[1].replace(/-/g, "_");
//   return `${moduleName}.view`;
//   // }
// }

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userPermissions = req.auth?.user?.permissions || [];
  const pathname = req.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // const requiredPermission = getRequiredPermission(pathname);
  // if (requiredPermission) {
  //   if (!isLoggedIn) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  //   if (!userPermissions.includes(requiredPermission)) {
  //     return NextResponse.redirect(new URL("/forbidden", req.url));
  //   }
  // }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/pos/:path*",
    "/bookings/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
