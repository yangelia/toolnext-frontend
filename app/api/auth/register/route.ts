import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post("auth/register", body);
    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      setCookie.forEach((cookieString) => {
        response.headers.append("set-cookie", cookieString);
      });
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        error.response?.data || { error: error.message },
        { status: error.response?.status ?? 500 }
      );
    }

    console.error("Critical Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
