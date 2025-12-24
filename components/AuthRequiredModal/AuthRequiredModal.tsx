"use client";

import Link from "next/link";
import styles from "./AuthRequiredModal.module.css";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthRequiredModal({
  isOpen,
  onClose,
}: AuthRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <svg className={styles.closeIcon}>
            <use
              className={styles.closeIconSwg}
              href="/icons/sprite.svg#icon-close"
            />
          </svg>
        </button>

        <h2 className={styles.title}>Спочатку авторизуйтесь</h2>

        <p className={styles.text}>
          Щоб забрронювати інструмент, треба спочатку зареєструватись, або
          авторизуватись на платформі
        </p>

        <div className={styles.wrap}>
          <Link href="/auth/login" className={styles.login}>
            Вхід
          </Link>

          <Link href="/auth/register" className={styles.register}>
            Реєстрація
          </Link>
        </div>
      </div>
    </div>
  );
}
