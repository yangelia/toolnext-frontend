import AddToolForm, {
  AddToolFormValues,
} from '@/components/AddToolForm/AddToolForm';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Публікація інструменту | ToolNext',
  description: 'Додайте новий інструмент для оренди',
};

export default function AddToolPage() {
  const handleSubmit = async (values: AddToolFormValues) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('pricePerDay', values.pricePerDay);
    formData.append('category', values.category);
    formData.append('rentalTerms', values.rentalTerms);
    formData.append('description', values.description);
    formData.append('specifications', values.specifications);

    if (values.image) {
      formData.append('images', values.image);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tools`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error('Помилка створення інструменту');
    }

    const tool = await res.json();
    window.location.href = `/tools/${tool._id}`;
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Публікація інструменту</h1>
      <AddToolForm onSubmit={handleSubmit} />
    </section>
  );
}
