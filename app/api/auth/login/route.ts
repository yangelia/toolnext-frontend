import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Шлём логин на NoteHub API
    const apiRes = await api.post("auth/login", body);

    // Получаем Set-Cookie от NoteHub API
    const setCookie = apiRes.headers["set-cookie"];

    const res = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    // Проксируем куки ВЕРНУТЬ пользователю
    if (setCookie) {
      setCookie.forEach((cookie: string) => {
        res.headers.append("Set-Cookie", cookie);
      });
    }

    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.response?.data?.message || "Login failed" },
        { status: error.status || 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
