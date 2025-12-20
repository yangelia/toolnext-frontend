// components/FilterBar/FilterBar.tsx

"use client";

import type { Category } from "@/types/category";
import css from "./FilterBar.module.css";

interface FilterBarProps {
  categories: Category[];
  selected: string | null; // може бути null
  onChange: (categoryId: string | null) => void;
  onReset?: () => void; // додатковий проп для скидання всіх фільтрів
}

export default function FilterBar({
  categories,
  selected,
  onChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className={css.filterBar}>
      <div className={css.selectWrapper}>
        <select
          className={css.select}
          value={selected ?? "All"}
          onChange={(e) =>
            onChange(
              e.target.value === "All"
                ? null
                : e.target.value
            )
          }
        >
          <option value="All">
            Усі категорії
          </option>
          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <button
        className={css.reset}
        onClick={() => {
          if (onReset) {
            onReset(); // викликаємо скидання всіх фільтрів
          } else {
            onChange(null); // fallback: тільки категорія
          }
        }}
      >
        Скинути фільтри
      </button>
    </div>
  );
}
