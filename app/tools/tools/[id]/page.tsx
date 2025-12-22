import AddToolForm from '@/components/AddToolForm/AddToolForm';
import styles from './page.module.css';

type Props = {
  params: {
    toolId: string;
  };
};

export const metadata = {
  title: 'Редагування інструменту | ToolNext',
};

export default function EditToolPage({ params }: Props) {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Редагувати інструмент</h1>

      <AddToolForm mode="edit" toolId={params.toolId} />
    </section>
  );
}
