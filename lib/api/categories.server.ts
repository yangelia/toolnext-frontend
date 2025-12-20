// lib\api\categories.server.ts

import { Category } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined"
  );
}

export async function fetchCategoriesServer(): Promise<
  Category[]
> {
  const res = await fetch(
    `${API_URL}/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
