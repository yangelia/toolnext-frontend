"use server";

import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { AxiosError } from "axios";

/**
 * Server Action для видалення інструменту
 * Виконується на сервері з доступом до cookies
 * @param toolId - ID інструменту для видалення
 * @returns Promise з результатом операції
 */
export async function deleteToolAction(toolId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();

    // Викликаємо API з cookies з сервера
    await api.delete(`/tools/${toolId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return { success: true };
  } catch (error) {
    // Перевіряємо чи це AxiosError
    if (error instanceof AxiosError) {
      console.error(
        "Server Action Error:",
        error.response?.data || error.message
      );

      // Повертаємо зрозумілу помилку
      if (error.response?.status === 401) {
        return { success: false, error: "Ви не авторизовані" };
      } else if (error.response?.status === 403) {
        return { success: false, error: "Немає прав для видалення" };
      } else if (error.response?.status === 404) {
        return { success: false, error: "Інструмент не знайдено" };
      }
    }

    console.error("Unexpected error:", error);
    return { success: false, error: "Помилка при видаленні" };
  }
}
