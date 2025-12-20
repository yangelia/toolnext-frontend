// app/tools/page.tsx

import ToolsClient from "./Tools.client";
import { fetchCategoriesServer } from "@/lib/api/categories.server";
import type { Category } from "@/types/category";
import css from "./tools.module.css";

export default async function ToolsPage() {
  const categories: Category[] =
    await fetchCategoriesServer();

  return (
    <div className={css.container}>
      <h2 className={css.title}>
        Всі інструменти
      </h2>

      <ToolsClient categories={categories} />
    </div>
  );
}
