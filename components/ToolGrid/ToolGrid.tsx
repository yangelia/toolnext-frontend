import css from "./ToolGrid.module.css";
import type { Tool } from "@/types/tool";
import Link from "next/link";

interface ToolGridProps {
  tools: Tool[];
}

export default function ToolGrid({
  tools,
}: ToolGridProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <ul className={css.grid}>
      {tools.map((tool) => (
        <li
          key={tool._id}
          className={css.card}
        >
          <img
            src={tool.images[0]}
            alt={tool.name}
            className={css.image}
            loading="lazy"
          />
          <h4 className={css.stars}>* * * * *</h4>
          <h4 className={css.name}>
            {tool.name}
          </h4>
          <span className={css.price}>
            {tool.pricePerDay} грн/день
          </span>
          <Link
            href={`/tools/${tool._id}`}
            className={css.link}
          >
            Детальніше
          </Link>
        </li>
      ))}
    </ul>
  );
}
