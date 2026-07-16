import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { auth } from "@/lib/auth/config";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /crm is an internal admin panel, outside the [locale] tree — every /crm/* path must skip
  // next-intl entirely (it would otherwise try to rewrite to /pt/crm/... and 404, since that
  // page doesn't exist inside [locale]).
  if (pathname.startsWith("/crm")) {
    if (pathname === "/crm/login") {
      return NextResponse.next();
    }
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/crm/login", request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all routes except API, static files, _next, favicon, etc.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
