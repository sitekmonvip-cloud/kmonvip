import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except API, static files, _next, favicon, etc.
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
