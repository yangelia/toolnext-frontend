import { Category } from "@/types/category";

interface Props {
  categories: Category[];
  onSelect?: (categoryId: string) => void;
}

export default function CategoryList({ categories, onSelect }: Props) {
  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat._id}>
          <button type="button" onClick={() => onSelect?.(cat._id)}>
            {cat.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
