import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET() {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    // Запрос к NoteHub API
    const apiRes = await api.get("auth/session", {
      headers: { Cookie: cookieHeader },
    });

    const setCookie = apiRes.headers["set-cookie"];

    const response = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    // Пробрасываем куки как есть
    if (setCookie && Array.isArray(setCookie)) {
      for (const cookie of setCookie) {
        response.headers.append("Set-Cookie", cookie);
      }
    } else if (typeof setCookie === "string") {
      response.headers.append("Set-Cookie", setCookie);
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
