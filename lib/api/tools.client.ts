// lib/api/tools.client.ts

import { api } from "@/lib/api/api";
import type { ToolsResponse } from "@/types/tool";

export interface FetchToolsParams {
  page?: number;
  perPage?: number;
  category?: string; // _id категорії
  search?: string;
}

export async function fetchToolsClient(
  params: FetchToolsParams
): Promise<ToolsResponse> {
  // Формуємо query-параметри
  const query: Record<
    string,
    string | number | undefined
  > = {
    page: params.page ?? 1,
    perPage: params.perPage ?? 16,
  };

  // Додаємо category тільки якщо вона реально вибрана
  if (params.category) {
    query.category = params.category;
  }

  // Додаємо search тільки якщо не порожній
  if (params.search) {
    query.search = params.search;
  }

  const res = await api.get<ToolsResponse>(
    "/tools",
    { params: query }
  );
  return res.data;
}
