// app\tools\Tools.client.tsx

"use client";

import { useEffect } from "react";
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

  // Завантаження першої сторінки при монтуванні
  useEffect(() => {
    loadTools(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (page <= totalPages) loadTools();
  };

  return (
    <div className={css.app}>
      {/* Фільтр за категоріями */}

      <FilterBar
        categories={categories}
        selected={category || "All"}
        onChange={(catId) =>
          setCategory(
            catId === "All" ? null : catId
          )
        }
      />

      {/* Пошук */}
      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className={css.search}
      />

      {isLoading && <p>Завантаження...</p>}

      {tools.length > 0 ? (
        <>
          <ToolGrid tools={tools} />
          {page <= totalPages && (
            <div className={css.more}>
              <button
                className={css.link} // стиль як у посилання
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
