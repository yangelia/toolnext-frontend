// lib/api/serverApi.ts
import { api } from "@/app/api/api";
import { Category } from "@/types/category";
import { ToolDetails } from "@/types/tool";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { cache } from "react";

export const getServerCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();

    const res = await api.get("/users/current", {
      headers: { Cookie: cookieStore.toString() },
    });

    return res.data?.data?.user ?? null;
  } catch {
    return null;
  }
});

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export async function getToolByIdServer(id: string) {
  const { data } = await api.get<ToolDetails>(`/tools/${id}`);
  return data;
}

export const getCurrentUserServer = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get("/users/current", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data?.data?.user ?? null;
  } catch {
    return null;
  }
};

export async function getCategoriesServer() {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}
