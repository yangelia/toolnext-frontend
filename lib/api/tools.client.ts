import { api } from "@/lib/api/api";
import type { ToolsResponse } from "@/types/tool";

export interface FetchToolsParams {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
}

/**
 * Отримує список інструментів з сервера
 * @param params - параметри пагінації, фільтрації та пошуку
 * @returns Promise з списком інструментів та метаданими
 */
export async function fetchToolsClient(
  params: FetchToolsParams
): Promise<ToolsResponse> {
  const query: Record<string, string | number | undefined> = {
    page: params.page ?? 1,
    perPage: params.perPage ?? 16,
  };

  if (params.category) {
    query.category = params.category;
  }

  if (params.search) {
    query.search = params.search;
  }

  const res = await api.get<ToolsResponse>("/tools", { params: query });
  return res.data;
}

/**
 * 🆕 Видаляє інструмент за ID (клієнтська версія - НЕ ВИКОРИСТОВУЄТЬСЯ)
 * Залишено для сумісності, але використовуйте deleteToolAction замість цього
 * @param toolId - ID інструменту для видалення
 * @returns Promise<void>
 * @deprecated Використовуйте deleteToolAction з app/actions/deleteToolAction.ts
 */
export async function deleteToolById(toolId: string): Promise<void> {
  await api.delete(`/tools/${toolId}`);
}
