import { Category } from "@/types/category";
import styles from "./CategoryList.module.css";

interface Props {
  categories: Category[];
  onSelect?: (categoryId: string) => void;
}

export default function CategoryList({ categories, onSelect }: Props) {
  return (
    <ul className={styles.list}>
      {categories.map((cat) => (
        <li key={cat._id} className={styles.item}>
          <button
            type="button"
            className={styles.button}
            onClick={() => onSelect?.(cat._id)}
          >
            {cat.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
