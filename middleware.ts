// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get("accessToken")?.value;

//   if (req.nextUrl.pathname.startsWith("/profile")) {
//     if (!accessToken) {
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*"],
// };

//! оновлення Header та Footer. Допуск до приватних сторінок
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isPrivateRoute(pathname: string) {
  // приватні tools
  if (pathname === "/tools/new") return true;
  if (/^\/tools\/[^/]+\/booking\/?$/.test(pathname)) return true;
  if (/^\/tools\/[^/]+\/edit\/?$/.test(pathname)) return true;

  return false;
}

function isAuthRoute(pathname: string) {
  return (
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const sessionId = req.cookies.get("sessionId")?.value;

  // якщо accessToken протух, але refreshToken+sessionId є => оновлюємо
  if (!accessToken && refreshToken && sessionId) {
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/refresh-and-redirect";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  // якщо залогінений — не пускаємо на /auth/*
  if (accessToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // приватні маршрути без accessToken → на логін
  if (!accessToken && isPrivateRoute(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/tools/:path*", "/auth/:path*"],
};
