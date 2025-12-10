import { NextResponse, NextRequest } from "next/server";

const publicRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/profile", "/notes"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

  // Проверяем сессию, но безопасно
  let isAuth = false;

  try {
    const session = await fetch("https://notehub-api.goit.study/auth/session", {
      method: "GET",
      credentials: "include",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (session.ok) {
      const data = await session.json();
      isAuth = data?.success === true;
    }
  } catch {
    isAuth = false;
  }

  // --- ЛОГИКА ДОСТУПА ---
  if (!isAuth && isPrivate) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (isAuth && isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
