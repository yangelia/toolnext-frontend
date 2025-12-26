import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { ToolBasic } from "@/types/tool";
import css from "./ToolCard.module.css";

interface ToolCardProps {
  tool: ToolBasic;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const imageUrl = tool.image || "/images/placeholder-tool.jpg";

  // ✅ Додано тип React.ReactElement[]
  const stars: React.ReactElement[] = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={css.star}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={i < Math.floor(tool.rating) ? "#FFC107" : "#E0E0E0"}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
  }

  return (
    <li className={css.card}>
      <Link href={`/tools/${tool._id}`} className={css.imageLink}>
        <div className={css.imageWrapper}>
          <Image
            src={imageUrl}
            alt={tool.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={css.image}
          />
        </div>
      </Link>

      <div className={css.content}>
        <div className={css.rating}>{stars}</div>

        <Link href={`/tools/${tool._id}`} className={css.titleLink}>
          <h3 className={css.title}>{tool.name}</h3>
        </Link>

        <p className={css.category}>{tool.category.title}</p>

        <p className={css.price}>{tool.pricePerDay} грн/день</p>

        <Link href={`/tools/${tool._id}`} className={css.detailsButton}>
          Детальніше
        </Link>
      </div>
    </li>
  );
}
