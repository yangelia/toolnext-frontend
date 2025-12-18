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
        {/* Close button */}
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className={styles.title}>Спочатку авторизуйтесь</h2>

        <p className={styles.text}>
          Щоб забронювати інструмент, потрібно увійти або зареєструватися на
          платформі
        </p>

        <div className={styles.actions}>
          <Link href="/login" className={styles.login}>
            Вхід
          </Link>

          <Link href="/register" className={styles.register}>
            Реєстрація
          </Link>
        </div>
      </div>
    </div>
  );
}
