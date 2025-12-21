// app\tools\Tools.client.tsx

"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ToolGrid from "@/components/ToolGrid/ToolGrid";
import FilterBar from "@/components/FilterBar/FilterBar";
import { useToolsStore } from "@/lib/store/toolsStore";
import type { Category } from "@/types/category";
import css from "./tools.module.css";

interface ToolsClientProps {
  categories: Category[];
}

export default function ToolsClient({
  categories,
}: ToolsClientProps) {
  const searchParams = useSearchParams();
  const searchFromUrl =
    searchParams.get("search") ?? "";

  const {
    tools,
    page,
    totalPages,
    isLoading,
    category,
    search,
    setCategory,
    setSearch,
    loadTools,
  } = useToolsStore();

  // 🔹 1. Синхронізація search зі стору з URL
  useEffect(() => {
    if (searchFromUrl !== search) {
      setSearch(searchFromUrl);
      loadTools(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFromUrl]);

  // 🔹 2. Завантаження при зміні категорії
  useEffect(() => {
    loadTools(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      loadTools();
    }
  };

  // 🔹 3. Скидання фільтрів і пошуку
  const handleResetFilters = () => {
    setCategory(null); // скидати категорію
    setSearch(""); // скидати пошук
    loadTools(true); // перезавантажити першу сторінку
  };

  return (
    <div className={css.app}>
      <FilterBar
        categories={categories}
        selected={category || "All"}
        onChange={(catId) =>
          setCategory(
            catId === "All" ? null : catId
          )
        }
        onReset={handleResetFilters} // передаємо функцію скидання
      />

      {isLoading && <p>Завантаження...</p>}

      {tools.length > 0 ? (
        <>
          <ToolGrid tools={tools} />
          {page < totalPages && (
            <div className={css.more}>
              <button
                className={css.link}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading
                  ? "Завантаження..."
                  : "Показати ще"}
              </button>
            </div>
          )}
        </>
      ) : (
        !isLoading && (
          <p>Інструменти не знайдені</p>
        )
      )}
    </div>
  );
}
