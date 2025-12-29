'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { ReactElement } from 'react';
import type { ToolBasic } from '@/types/tool';
import css from './ToolCard.module.css';

interface ToolCardProps {
  tool: ToolBasic;
  isOwner?: boolean;
}

const roundRating = (rating: number) => {
  if (rating >= 0 && rating <= 1.2) return 1;
  if (rating >= 1.3 && rating <= 1.7) return 1.5;
  if (rating >= 2.3 && rating <= 2.7) return 2.5;
  if (rating >= 3.3 && rating <= 3.7) return 3.5;
  if (rating >= 4.3 && rating <= 4.5) return 4.5;
  return Math.round(rating);
};

const renderStars = (rating: number) => {
  const roundedRating = roundRating(rating);
  const stars: ReactElement[] = [];

  for (let i = 1; i <= 5; i++) {
    let iconId = 'icon-star';

    if (i <= roundedRating) {
      iconId = 'icon-star-filled';
    } else if (i - 0.5 === roundedRating) {
      iconId = 'icon-star_half';
    }

    stars.push(
      <svg
        key={i}
        className={css.star}
        width="24"
        height="24"
        aria-hidden="true"
      >
        <use href={`/icons/sprite.svg#${iconId}`} />
      </svg>
    );
  }

  return stars;
};

export default function ToolCard({ tool, isOwner = false }: ToolCardProps) {
  return (
    <li className={css.card}>
      <Image
        src={tool.images[0] ?? '/images/default-avatar.jpg'}
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
            <div className={css.controls}>
              <Link
                href={`/tools/${tool._id}/edit`}
                className={css.editButton}
              >
                Редагувати
              </Link>

              <button
                type="button"
                className={css.deleteButton}
                aria-label="Видалити"
              >
                <svg
                  width="24"
                  height="24"
                  className={css.trashIcon}
                >
                  <use href="/icons/sprite.svg#icon-delete" />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              href={`/tools/${tool._id}`}
              className={css.link}
            >
              Детальніше
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
