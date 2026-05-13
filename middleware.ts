import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest & { auth?: { user?: { role?: string } } | null }) {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  // Proteggi /admin — solo ADMIN
  if (pathname.startsWith("/admin")) {
    if (!session || role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Proteggi /dashboard — solo utenti autenticati
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
