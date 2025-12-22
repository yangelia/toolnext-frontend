import AddToolForm from '@/components/AddToolForm/AddToolForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Публікація інструменту | ToolNext',
  description: 'Додати новий інструмент для оренди',
};

export default function AddToolPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Публікація інструменту</h1>

      <AddToolForm mode="create" />
    </section>
  );
}
