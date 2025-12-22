'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { useState } from 'react';
import styles from './AddToolForm.module.css';

export type AddToolFormValues = {
  name: string;
  pricePerDay: string;
  category: string;
  rentalTerms: string;
  description: string;
  specifications: string;
  image: File | null;
};

type Props = {
  initialValues?: AddToolFormValues;
  onSubmit: (values: AddToolFormValues) => Promise<void>;
  submitText?: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Обовʼязкове поле'),
  pricePerDay: Yup.number().required('Обовʼязкове поле'),
  category: Yup.string().required('Оберіть категорію'),
});

const defaultValues: AddToolFormValues = {
  name: '',
  pricePerDay: '',
  category: '',
  rentalTerms: '',
  description: '',
  specifications: '',
  image: null,
};

export default function AddToolForm({
  initialValues = defaultValues,
  onSubmit,
  submitText = 'Опублікувати',
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik<AddToolFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.form}>
          {/* Image */}
          <div
            className={styles.imageBlock}
            onClick={() => document.getElementById('imageInput')?.click()}
          >
            {preview ? (
              <Image src={preview} alt="preview" fill className={styles.image} />
            ) : (
              <div className={styles.placeholder}>Фото інструменту</div>
            )}

            <input
              id="imageInput"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (!file) return;
                setFieldValue('image', file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <label>
            Назва
            <Field name="name" />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </label>

          <label>
            Ціна / день
            <Field name="pricePerDay" type="number" />
            <ErrorMessage name="pricePerDay" component="p" className={styles.error} />
          </label>

          <label>
            Категорія
            <Field as="select" name="category">
              <option value="">Оберіть категорію</option>
              <option value="tools">Інструменти</option>
            </Field>
            <ErrorMessage name="category" component="p" className={styles.error} />
          </label>

          <label>
            Умови оренди
            <Field as="textarea" name="rentalTerms" />
          </label>

          <label>
            Опис
            <Field as="textarea" name="description" />
          </label>

          <label>
            Характеристики
            <Field as="textarea" name="specifications" />
          </label>

          <div className={styles.buttons}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Завантаження…' : submitText}
            </button>

            <button type="button" className={styles.cancel}>
              Відмінити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
