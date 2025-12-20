// lib/api/serverApi.ts
import { api } from "@/app/api/api";
import { cookies } from "next/headers";

export type HeaderUser = {
  name: string;
  avatarUrl: string;
};

export async function getServerCurrentUser(): Promise<HeaderUser | null> {
  try {
    const cookieStore = await cookies();

    // бек: /users/current
    const res = await api.get("/users/current", {
      headers: { Cookie: cookieStore.toString() },
    });

    const u = res.data; // очікую щось типу: { _id, username, avatar, email, ... }

    return {
      name: u.username ?? u.name ?? "Користувач",
      avatarUrl: u.avatar ?? u.avatarUrl ?? "",
    };
  } catch {
    return null;
  }
}
