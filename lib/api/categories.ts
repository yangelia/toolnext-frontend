import { api } from "@/app/api/api";
import { Category } from "@/types/category";

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}
