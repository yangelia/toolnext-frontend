import SearchForm from "../searchForm/searchForm";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>ToolNext — ваш надійний сусід</h1>

        <SearchForm/>
      </div>
      </div>
    </section>
  );
}
