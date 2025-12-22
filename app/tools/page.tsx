import styles from './tools.module.css';

export const metadata = {
  title: 'Інструменти | ToolNext',
  description: 'Каталог інструментів для оренди',
};

export default function ToolsPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Інструменти</h1>

      {/* TODO:
          - FilterBar
          - ToolsGrid
          (если уже есть — просто вставь компоненты)
      */}
    </section>
  );
}
