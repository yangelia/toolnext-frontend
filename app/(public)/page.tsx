//app/page.tsx

import styles from "./page.module.css";
import Hero from "@/components/Hero/Hero";
import Benefits from "@/components/Benefits/Benefits";

import PopularTools from "@/components/PopularTools/PopularTools";
import { fetchPopularTools } from "@/lib/api/tools.server";
import FeedbackSection from "@/components/Feedback/FeedbackSection";

export default async function HomePage() {
  const popularTools = await fetchPopularTools();

  return (
    <div className={styles.container}>
      <section>
        <Hero />
        <Benefits />
      </section>
      <PopularTools tools={popularTools} />
      <FeedbackSection />
    </div>
  );
}
