// middleware.ts
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const familyCode = req.cookies.get("familyCode"); // Vérifie la présence du code de famille
  const url = req.nextUrl.clone();

  // Si pas de token, rediriger vers la page de connexion
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
    // Si l'utilisateur est authentifié mais essaie d'accéder aux pages de login ou de register
    if (url.pathname === "/auth/login" || url.pathname === "/auth/register") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Si l'utilisateur est authentifié mais n'a pas de code de famille, le rediriger vers /family/join
    if (
      !familyCode &&
      url.pathname !== "/family/join" &&
      url.pathname !== "/family/create"
    ) {
      url.pathname = "/family/join";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)", "/family/join"],
};
