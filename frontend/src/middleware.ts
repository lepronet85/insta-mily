// middleware.ts
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Récupère le cookie 'jwt'
  const url = req.nextUrl.clone();

  if (!token) {
    if (
      url.pathname === "/" ||
      url.pathname === "/family/join" ||
      url.pathname === "/family/create"
    ) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname === "/auth/login" || url.pathname === "/auth/register") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Laisse passer si le token est présent
}

export const config = {
  matcher: ["/((?!api|static|favicon.ico).*)", "/family/join"], // Les routes à protéger
};
