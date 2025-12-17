import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("auth/register", body);

    const cookieStore = cookies();

    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      setCookie.forEach((c: string) => {
        const [nameValue] = c.split(";");
        const [name, value] = nameValue.split("=");
        cookieStore.set(name, value, { path: "/" });
      });
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
