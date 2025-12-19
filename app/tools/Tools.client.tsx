"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ToolGrid from "@/components/ToolGrid/ToolGrid";
import FilterBar from "@/components/FilterBar/FilterBar";
import type { Tool } from "@/types/tool";
import css from "./tools.module.css";

interface ToolsResponse {
  tools: Tool[];
  page: number;
  perPage: number;
  totalTools: number;
  totalPages: number;
}

interface ToolsClientProps {
  initialTools: Tool[];
}

const categories = [
  "Мийки високого тиску",
  "Плиткорізи та інструменти для плитки",
  "Зварювальне обладнання",
  "Пилки та різаки",
  "Перфоратори та відбійні молотки",
  "Шліфувальні та полірувальні машини",
];

async function fetchTools(
  category: string,
  page: number,
  perPage = 16
): Promise<ToolsResponse> {
  const url = new URL(
    "http://localhost:3000/tools"
  );

  url.searchParams.set("page", page.toString());
  url.searchParams.set(
    "perPage",
    perPage.toString()
  );

  if (category !== "All") {
    url.searchParams.set("category", category);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to fetch tools");
  }

  return res.json();
}

export default function ToolsClient({
  initialTools,
}: ToolsClientProps) {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } =
    useQuery<ToolsResponse>({
      queryKey: ["tools", category, page],
      queryFn: () => fetchTools(category, page),

      // 👇 заміна keepPreviousData
      placeholderData: (prev) => prev,

      // 👇 початкові дані з сервера
      initialData: {
        tools: initialTools,
        page: 1,
        perPage: 16,
        totalTools: initialTools.length,
        totalPages: 1,
      },
    });

  const tools = data.tools;
  const totalPages = data.totalPages;

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={css.app}>
      <FilterBar
        categories={categories}
        selected={category}
        onChange={(cat) => {
          setCategory(cat);
          setPage(1);
        }}
      />

      {(isLoading || isFetching) && (
        <p>Завантаження...</p>
      )}

      {error && (
        <p>
          Помилка завантаження:{" "}
          {(error as Error).message}
        </p>
      )}

      {tools.length > 0 ? (
        <>
          <ToolGrid tools={tools} />

          {page < totalPages && (
            <button
              className={css.loadMore}
              onClick={handleLoadMore}
            >
              Показати ще
            </button>
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
