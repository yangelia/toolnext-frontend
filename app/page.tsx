import styles from "./page.module.css";
import Hero from "@/components/Hero/Hero";
import Benefits from "@/components/Benefits/Benefits";


export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>ToolNext</h1>

      <section>
        <h2>Популярні інструменти</h2>
        {/* tools grid будет здесь */}
        <Hero/>
        <Benefits/>
      </section>
    </div>
  );
}
