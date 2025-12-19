import Link from "next/link";
import type { Tool } from "@/types/tool";
import css from "./ToolCard.module.css";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({
  tool,
}: ToolCardProps) {
  const rating = Math.round(tool.rating);

  return (
    <li className={css.card}>
      <img
        src={tool.images[0]}
        alt={tool.name}
        className={css.image}
        loading="lazy"
      />

      <div className={css.content}>
        <div className={css.stars}>
          {"★".repeat(rating)}
        </div>

        <h4 className={css.name}>{tool.name}</h4>

        <div className={css.footer}>
          <span className={css.price}>
            {tool.pricePerDay} грн/день
          </span>

          <Link
            href={`/tools/${tool._id}`}
            className={css.link}
          >
            Детальніше
          </Link>
        </div>
      </div>
    </li>
  );
}
