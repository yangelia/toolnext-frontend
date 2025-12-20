import css from "./MiniLoader.module.css";

function MiniLoader() {
  return (
    <div className={css.wrapper} role="status" aria-live="polite">
      <div className={css.spinner} />
      <span className={css.text}>Loading...</span>
    </div>
  );
}

export default MiniLoader;
