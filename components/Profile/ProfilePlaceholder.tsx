'use client';

import Link from 'next/link';
import css from './ProfilePlaceholder.module.css';

interface ProfilePlaceholderProps {
  isOwner: boolean;
}

export default function ProfilePlaceholder({
  isOwner,
}: ProfilePlaceholderProps) {
  return (
    <div className={css.placeholder}>
      <h2 className={css.sectionTitle}>Інструменти</h2>

      <div className={css.content}>
        <h3 className={css.title}>
          {isOwner
            ? 'У вас ще не опубліковано жодного інструменту'
            : 'У цього користувача ще не опубліковано жодного інструменту'}
        </h3>

        <p className={css.description}>
          {isOwner
            ? 'Мершій опублікуйте своє перше оголошення, щоб почати отримувати пасивний дохід'
            : 'У нас є великий вибір інструментів від інших користувачів'}
        </p>

        <Link
          href={isOwner ? '/tools/new' : '/'}
          className={css.button}
        >
          {isOwner ? 'Опублікувати інструмент' : 'Всі інструменти'}
        </Link>
      </div>
    </div>
  );
}
