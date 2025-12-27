// import { NextResponse } from "next/server";

// type Params = { params: Promise<{ id: string }> };

// export async function PATCH(req: Request, { params }: Params) {
//   const { id } = await params;
//   const formData = await req.formData();

//   const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/tools/${id}`;

//   const res = await fetch(backendUrl, {
//     method: "PATCH",
//     body: formData,
//     headers: {
//       Cookie: req.headers.get("cookie") ?? "",
//     },
//   });

//   const text = await res.text();

//   try {
//     const data = text ? JSON.parse(text) : null;
//     return NextResponse.json(data, { status: res.status });
//   } catch {
//     return new NextResponse(text, { status: res.status });
//   }
// }

import { proxyFormDataWithRefresh } from "@/app/api/_utils/proxyWithRefresh";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const formData = await req.formData();

  return proxyFormDataWithRefresh({
    method: "PATCH",
    backendPath: `/tools/${id}`,
    body: formData,
    incomingCookie: req.headers.get("cookie") ?? "",
  });
}
