"use client";

import css from "./DeleteConfirm.module.css";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export default function DeleteConfirm({
  onCancel,
  onConfirm,
  isLoading = false,
}: Props) {
  return (
    <div className={css.wrap}>
      <h3 className={css.title}>Ви впевнені, що хочете видалити оголошення?</h3>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelBtn}
          onClick={onCancel}
          disabled={isLoading}
        >
          Залишити
        </button>

        <button
          type="button"
          className={css.deleteBtn}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Видаляю..." : "Видалити"}
        </button>
      </div>
    </div>
  );
}
