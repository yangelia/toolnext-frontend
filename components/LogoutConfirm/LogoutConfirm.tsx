"use client";

import css from "./LogoutConfirm.module.css";

type LogoutConfirmProps = {
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const LogoutConfirm = ({
  onCancel,
  isLoading,
  onConfirm,
}: LogoutConfirmProps) => {
  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Ви впевнені, що хочете вийти?</h2>

      <div className={css.actions}>
        <button
          type="button"
          className={css.secondaryBtn}
          onClick={onCancel}
          disabled={isLoading}
        >
          Залишитись
        </button>
        <button
          type="button"
          className={css.primaryBtn}
          onClick={onConfirm}
          disabled={isLoading}
        >
          Вийти
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirm;
