// toolnext-frontend/app/page.tsx

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>ToolNext</h1>

      <section>
        <h2>Популярні інструменти</h2>
        {/* tools grid будет здесь */}
      </section>
    </div>
  );
}
