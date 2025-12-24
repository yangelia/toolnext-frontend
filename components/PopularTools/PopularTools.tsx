// components/PopularToolsSection/PopularToolsSection.tsx

import ToolGrid from "../ToolGrid/ToolGrid";
import type { ToolBasic } from "@/types/tool";
import Link from "next/link";
import css from "./PopularTools.module.css";

interface PopularToolsProps {
  tools: ToolBasic[];
}

export default function PopularTools({
  tools,
}: PopularToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className={css.container}>
      <h2 className={css.title}>
        Популярні інструменти
      </h2>
      <ToolGrid tools={tools} />
      <div className={css.more}>
        <Link
          href="/tools"
          className={css.link}
        >
          До всіх інструментів
        </Link>
      </div>
    </section>
  );
}
