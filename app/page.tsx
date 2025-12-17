import styles from "./page.module.css";
import { fetchCategories } from "@/lib/api/categories";
import CategoryList from "@/components/Categories/CategoryList";

export default async function HomePage() {
  const categories = await fetchCategories();

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>

      <section>
        <h2>Категорії</h2>
        <CategoryList categories={categories} />
      </section>
    </div>
  );
}
