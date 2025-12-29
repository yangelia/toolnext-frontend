"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import type { ToolBasic } from "@/types/tool";
import css from "./ToolCard.module.css";

// Інтерфейс пропсів компонента ToolCard
interface ToolCardProps {
  tool: ToolBasic;
  isOwner?: boolean;
  onDelete?: () => void; // ⚠️ ВАЖЛИВО: функція для видалення інструменту
}

// Функція для округлення рейтингу до найближчого валідного значення
const roundRating = (rating: number) => {
  if (rating >= 0 && rating <= 1.2) return 1;
  if (rating >= 1.3 && rating <= 1.7) return 1.5;
  if (rating >= 2.3 && rating <= 2.7) return 2.5;
  if (rating >= 3.3 && rating <= 3.7) return 3.5;
  if (rating >= 4.3 && rating <= 4.5) return 4.5;
  return Math.round(rating);
};

// Функція для рендерингу зірок рейтингу
const renderStars = (rating: number) => {
  const roundedRating = roundRating(rating);
  const stars: ReactElement[] = [];

  for (let i = 1; i <= 5; i++) {
    let iconId = "icon-star";

    if (i <= roundedRating) {
      iconId = "icon-star-filled";
    } else if (i - 0.5 === roundedRating) {
      iconId = "icon-star_half";
    }

    stars.push(
      <svg
        key={i}
        className={css.star}
        width="24"
        height="24"
        aria-hidden="true"
      >
        {/* ⚠️ ВАЖЛИВО: Template literal з backticks ` */}
        <use href={`/icons/sprite.svg#${iconId}`} />
      </svg>
    );
  }

  return stars;
};

// Основний компонент картки інструменту
export default function ToolCard({
  tool,
  isOwner = false,
  onDelete,
}: ToolCardProps) {
  // Обробник кліку по кнопці видалення
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Запобігаємо дефолтній поведінці
    e.stopPropagation(); // Зупиняємо спливання події (щоб не спрацював handleCardClick)
    if (onDelete) {
      onDelete(); // Викликаємо callback функцію видалення
    }
  };

  return (
    <li className={css.card}>
      <Image
        src={tool.images[0] ?? "/images/default-avatar.jpg"}
        alt={tool.name}
        width={304}
        height={374}
        className={css.image}
        placeholder="empty"
      />

      <div className={css.content}>
        <div className={css.starRating}>{renderStars(tool.rating)}</div>

        <h4 className={css.name}>{tool.name}</h4>

        <div className={css.footer}>
          <span className={css.price}>{tool.pricePerDay} грн/день</span>

          {isOwner ? (
            // Кнопки для власника інструменту
            <div className={css.controls}>
              {/* ⚠️ ВАЖЛИВО: Template literal з backticks ` */}
              <Link href={`/tools/${tool._id}/edit`} className={css.editButton}>
                Редагувати
              </Link>

              {/* Кнопка видалення з іконкою корзини */}
              <button
                type="button"
                className={css.deleteButton}
                aria-label="Видалити"
                onClick={handleDeleteClick}
              >
                <svg width="24" height="24" className={css.trashIcon}>
                  <use href="/icons/sprite.svg#icon-delete" />
                </svg>
              </button>
            </div>
          ) : (
            // Кнопка "Детальніше" для гостей
            /* ⚠️ ВАЖЛИВО: Template literal з backticks ` */
            <Link href={`/tools/${tool._id}`} className={css.link}>
              Детальніше
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
