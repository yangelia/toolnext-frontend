import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get("next") ?? "/";
  const cookieStore = await cookies();

  try {
    const apiRes = await api.post("auth/refresh", null, {
      headers: { Cookie: cookieStore.toString() }, // важливо: sessionId + refreshToken
    });

    const res = NextResponse.redirect(new URL(next, req.url));

    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        res.headers.append("Set-Cookie", cookieStr);
      }
    }

    return res;
  } catch {
    // refresh не вдався -> чистимо і ведемо на логін
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("sessionId");

    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
