import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>ToolNext — ваш надійний сусід</h1>

        <div className={styles.searchBox}>
          <input type="text" placeholder="Знайдіть потрібний інструмент" />
          <button>Пошук</button>
        </div>
      </div>
    </section>
  );
}
