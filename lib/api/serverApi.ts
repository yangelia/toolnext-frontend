// lib/api/serverApi.ts
import { api } from "@/app/api/api";
import { ToolDetails } from "@/types/tool";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { cache } from "react";

export type HeaderUser = {
  name: string;
  avatarUrl: string;
};

// export async function getServerCurrentUser(): Promise<HeaderUser | null> {
export const getServerCurrentUser = cache(async () => {
  try {
    const cookieStore = await cookies();

    const res = await api.get("/users/current", {
      headers: { Cookie: cookieStore.toString() },
    });

    const u = res.data?.data?.user; // очікую щось типу: { _id, username, avatar, email, ... }

    if (!u) return null;

    return {
      name: u.username ?? u.name ?? "Користувач",
      avatarUrl: u.avatar ?? u.avatarUrl ?? "",
    };
  } catch {
    return null;
  }
});

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
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
