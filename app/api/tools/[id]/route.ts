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

//!
// import { NextResponse } from "next/server";
// import { proxyFormDataWithRefresh } from "@/app/api/_utils/proxyWithRefresh";

// type Params = { params: { id: string } };

// export async function PATCH(req: Request, { params }: Params) {
//   const { id } = params;
//   const formData = await req.formData();

//   return proxyFormDataWithRefresh({
//     method: "PATCH",
//     backendPath: `/tools/${id}`,
//     body: formData,
//     incomingCookie: req.headers.get("cookie") ?? "",
//   });
// }

import { NextResponse } from "next/server";
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

export async function DELETE(req: Request, { params }: Params) {
  const { id } = await params;

  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/tools/${id}`;

  const res = await fetch(backendUrl, {
    method: "DELETE",
    headers: {
      Cookie: req.headers.get("cookie") ?? "",
    },
  });

  if (res.status === 204) return new NextResponse(null, { status: 204 });

  const text = await res.text();

  try {
    const data = text ? JSON.parse(text) : null;
    return NextResponse.json(data, { status: res.status });
  } catch {
    return new NextResponse(text, { status: res.status });
  }
}
