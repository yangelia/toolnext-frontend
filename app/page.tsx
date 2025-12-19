// toolnext-frontend/app/page.tsx

import styles from "./page.module.css";
import Hero from "@/components/Hero/Hero";
import Benefits from "@/components/Benefits/Benefits";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <section>
        <Hero />
        <Benefits />
      </section>
    </div>
  );
}
