'use client';

import Link from 'next/link';
import css from './ProfilePlaceholder.module.css';

interface ProfilePlaceholderProps {
  isOwner: boolean;
}

export default function ProfilePlaceholder({
  isOwner,
}: ProfilePlaceholderProps) {
  if (isOwner) {
    // Власник профілю - опублікувати інструмент
    return (
      <div className={css.placeholder}>
        <div className={css.content}>
          <h2 className={css.title}>
            У вас ще не опубліковано жодного інструменту
          </h2>
          <p className={css.description}>
            Мершій обулікуйте своє перше оголошення, щоб почати отримувати
            пасивний дохід
          </p>
          <Link
            href="/tools/create"
            className={css.button}
          >
            Опублікувати інструмент
          </Link>
        </div>
      </div>
    );
  }

  // Публічний перегляд - переглянути всі інструменти
  return (
    <div className={css.placeholder}>
      <div className={css.content}>
        <h2 className={css.title}>
          У цього користувача ще не опубліковано жодного інструменту
        </h2>
        <p className={css.description}>
          У нас є великий вибір інструментів від інших користувачів
        </p>
        <Link
          href="/"
          className={css.button}
        >
          Всі інструменти
        </Link>
      </div>
    </div>
  );
}
