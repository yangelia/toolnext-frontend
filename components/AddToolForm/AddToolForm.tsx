'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import toast from 'react-hot-toast';
import styles from './AddToolForm.module.css';

/* ================= TYPES ================= */

type Props = {
  mode: 'create' | 'edit';
  toolId?: string;
};

type Category = {
  _id: string;
  name: string;
};

type Tool = {
  _id: string;
  name: string;
  pricePerDay: number;
  category: string | { _id: string };
  rentalTerms?: string;
  description: string;
  specifications?: string;
};

type FormValues = {
  image: File | null;
  name: string;
  pricePerDay: string;
  category: string;
  rentalTerms: string;
  description: string;
  specifications: string;
};

/* ================= MOCK CATEGORIES ================= */

const MOCK_CATEGORIES: Category[] = [
  { _id: 'power-tools', name: 'Електроінструменти' },
  { _id: 'hand-tools', name: 'Ручні інструменти' },
  { _id: 'garden', name: 'Садова техніка' },
  { _id: 'construction', name: 'Будівельне обладнання' },
];

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  name: Yup.string().required('Обовʼязкове поле'),
  pricePerDay: Yup.number()
    .typeError('Введіть число')
    .positive('Має бути більше 0')
    .required('Обовʼязкове поле'),
  category: Yup.string().required('Оберіть категорію'),
  description: Yup.string().required('Обовʼязкове поле'),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

/* ================= COMPONENT ================= */

export default function AddToolForm({ mode, toolId }: Props) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  /* cleanup blob url */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ---------- categories ---------- */
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        return data.categories ?? data;
      } catch {
        // ⬅️ fallback для проверки формы
        return MOCK_CATEGORIES;
      }
    },
  });

  /* ---------- tool for edit ---------- */
  const toolQuery = useQuery({
    queryKey: ['tool', toolId],
    enabled: mode === 'edit' && Boolean(toolId),
    queryFn: async (): Promise<Tool> => {
      const res = await fetch(`${API_URL}/tools/${toolId}`);
      if (!res.ok) throw new Error('Інструмент не знайдено');
      const data = await res.json();
      return data.tool ?? data;
    },
  });

  /* ---------- initial values ---------- */
  const initialValues: FormValues = useMemo(() => {
    const tool = toolQuery.data;

    return {
      image: null,
      name: tool?.name ?? '',
      pricePerDay: tool?.pricePerDay ? String(tool.pricePerDay) : '',
      category:
        typeof tool?.category === 'string'
          ? tool.category
          : tool?.category?._id ?? '',
      rentalTerms: tool?.rentalTerms ?? '',
      description: tool?.description ?? '',
      specifications: tool?.specifications ?? '',
    };
  }, [toolQuery.data]);

  /* ---------- mutation ---------- */
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const fd = new FormData();

      if (values.image) fd.append('image', values.image);
      fd.append('name', values.name.trim());
      fd.append('pricePerDay', values.pricePerDay);
      fd.append('category', values.category);
      fd.append('rentalTerms', values.rentalTerms.trim());
      fd.append('description', values.description.trim());
      fd.append('specifications', values.specifications.trim());

      const res = await fetch(
        `${API_URL}/tools${mode === 'edit' ? `/${toolId}` : ''}`,
        {
          method: mode === 'edit' ? 'PATCH' : 'POST',
          body: fd,
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Помилка збереження');
      }

      return res.json();
    },
    onSuccess: (data) => {
      const tool = data.tool ?? data;
      toast.success(
        mode === 'create'
          ? 'Інструмент опубліковано'
          : 'Зміни збережено'
      );
      router.push(`/tools/${tool._id}`);
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : 'Сталася помилка'
      );
    },
  });

  /* ---------- loaders ---------- */
  if (categoriesQuery.isLoading || (mode === 'edit' && toolQuery.isLoading)) {
    return <div className={styles.loader}>Завантаження…</div>;
  }

  /* ================= JSX ================= */

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
        await mutation.mutateAsync(values);
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.form}>
          {/* IMAGE */}
          <label className={styles.imageBlock}>
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                fill
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder}>
                Натисніть для додавання фото
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.currentTarget.files?.[0] || null;
                setFieldValue('image', file);
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
            />
          </label>

          <label className={styles.field}>
            Назва
            <Field name="name" className={styles.input} />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </label>

          <label className={styles.field}>
            Ціна за день
            <Field name="pricePerDay" type="number" className={styles.input} />
            <ErrorMessage name="pricePerDay" component="p" className={styles.error} />
          </label>

          <label className={styles.field}>
            Категорія
            <Field as="select" name="category" className={styles.select}>
              <option value="">Оберіть категорію</option>
              {categoriesQuery.data?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="p" className={styles.error} />
          </label>

          <label className={styles.field}>
            Опис
            <Field as="textarea" name="description" className={styles.textarea} />
            <ErrorMessage name="description" component="p" className={styles.error} />
          </label>

          <label className={styles.field}>
            Характеристики
            <Field as="textarea" name="specifications" className={styles.textarea} />
          </label>

          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending
                ? 'Збереження…'
                : 'Опублікувати'}
            </button>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.back()}
            >
              Відмінити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
