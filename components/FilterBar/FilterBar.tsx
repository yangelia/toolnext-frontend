// components/FilterBar/FilterBar.tsx

"use client";

import css from "./FilterBar.module.css";

interface FilterBarProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function FilterBar({
  categories,
  selected,
  onChange,
}: FilterBarProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(e.target.value);
  };

  const handleReset = () => {
    onChange("All");
  };

  return (
    <div className={css.filterBar}>
      <div className={css.selectWrapper}>
        <select
          className={css.select}
          value={selected}
          onChange={handleChange}
        >
          <option value="All">
            Усі категорії
          </option>
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        className={css.reset}
        onClick={handleReset}
      >
        Скинути фільтри
      </button>
    </div>
  );
}
