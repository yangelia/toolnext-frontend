// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const formData = await req.formData();

//   const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/tools`;

//   const res = await fetch(backendUrl, {
//     method: "POST",
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

export async function POST(req: Request) {
  const formData = await req.formData();

  return proxyFormDataWithRefresh({
    method: "POST",
    backendPath: "/tools",
    body: formData,
    incomingCookie: req.headers.get("cookie") ?? "",
  });
}
