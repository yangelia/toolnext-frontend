import css from "./OverlayLoader.module.css";

export default function OverlayLoader() {
  return (
    <div className={css.backdrop} role="status" aria-live="polite">
      <div className={css.box}>
        <div className={css.spinner} />
        <span className={css.text}>Loading...</span>
      </div>
    </div>
  );
}
