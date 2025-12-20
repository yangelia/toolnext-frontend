// lib/api/tools.server.ts

import { api } from "@/lib/api/api";
import type {
  ToolBasic,
  ToolsResponse,
} from "@/types/tool";

export async function fetchPopularTools(): Promise<
  ToolBasic[]
> {
  try {
    const { tools } = await api
      .get<ToolsResponse>("/tools", {
        params: { perPage: 100 },
      })
      .then((r) => r.data);

    return tools
      .filter((tool) => tool.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  } catch (err) {
    console.error(
      "Failed to fetch popular tools:",
      err
    );
    return [];
  }
}
