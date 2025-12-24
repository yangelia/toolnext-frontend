'use client';

import Link from 'next/link';
import css from './UserActionButtons.module.css';

export default function UserActionButtons() {
  return (
    <div className={css.actions}>
      <Link
        href="/tools/new"
        className={css.addButton}
      >
        Додати інструмент
      </Link>
    </div>
  );
}
