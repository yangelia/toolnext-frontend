import AddToolForm from '@/components/AddToolForm/AddToolForm';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Публікація інструменту | ToolNext',
  description: 'Додайте новий інструмент для оренди на платформі ToolNext',
};

export default function AddToolPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Публікація інструменту</h1>
      <AddToolForm />
    </section>
  );
}
