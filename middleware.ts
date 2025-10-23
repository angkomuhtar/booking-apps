import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                     req.nextUrl.pathname.startsWith("/register");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isVenueAdminPage = req.nextUrl.pathname.startsWith("/venue-admin");
  
  const userRole = req.auth?.user?.role;

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && !isAuthPage && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminPage && userRole !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isVenueAdminPage && userRole !== "VENUE_ADMIN" && userRole !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
