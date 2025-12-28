// app\tools\Tools.client.tsx

"use client";

import { useEffect, useState } from "react";
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

  const [mounted, setMounted] = useState(false);

  // mount guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // ініціалізація search з URL
  useEffect(() => {
    const urlSearch =
      searchParams.get("search") ?? "";
    setSearch(urlSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // завантаження даних
  useEffect(() => {
    if (!mounted) return;
    loadTools(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, mounted]);

  if (!mounted) return null;

  const handleLoadMore = () => {
    if (page < totalPages) {
      loadTools();
    }
  };

  const handleResetFilters = () => {
    setCategory(null);
    setSearch("");
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
        onReset={handleResetFilters}
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
