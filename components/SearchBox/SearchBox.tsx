"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

const SearchBox = ({
  value,
  onChange,
  onClear,
  onKeyPress,
}: SearchBoxProps) => {
  return (
    <div className={css.searchBox}>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyPress}
      />
      {value && onClear && (
        <button className={css.clearButton} onClick={onClear} type="button">
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBox;
