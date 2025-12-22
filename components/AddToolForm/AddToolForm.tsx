'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { useState } from 'react';
import styles from './AddToolForm.module.css';

type FormValues = {
  name: string;
  pricePerDay: string;
  category: string;
  rentalTerms: string;
  description: string;
  specifications: string;
  image: File | null;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Обовʼязкове поле'),
  pricePerDay: Yup.number().required('Обовʼязкове поле'),
  category: Yup.string().required('Оберіть категорію'),
});

export default function AddToolForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const initialValues: FormValues = {
    name: '',
    pricePerDay: '',
    category: '',
    rentalTerms: '',
    description: '',
    specifications: '',
    image: null,
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('ADD TOOL', values);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.form}>
          {/* Image */}
          <div
            className={styles.imageBlock}
            onClick={() => document.getElementById('imageInput')?.click()}
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                fill
                className={styles.image}
              />
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

          <label className={styles.field}>
            Назва
            <Field name="name" className={styles.input} />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </label>

          <label className={styles.field}>
            Ціна / день
            <Field
              name="pricePerDay"
              type="number"
              className={styles.input}
            />
            <ErrorMessage
              name="pricePerDay"
              component="p"
              className={styles.error}
            />
          </label>

          <label className={styles.field}>
            Категорія
            <Field as="select" name="category" className={styles.select}>
              <option value="">Оберіть категорію</option>
              <option value="tools">Інструменти</option>
            </Field>
            <ErrorMessage
              name="category"
              component="p"
              className={styles.error}
            />
          </label>

          <label className={styles.field}>
            Умови оренди
            <Field
              as="textarea"
              name="rentalTerms"
              className={styles.textarea}
            />
          </label>

          <label className={styles.field}>
            Опис
            <Field
              as="textarea"
              name="description"
              className={styles.textarea}
            />
          </label>

          <label className={styles.field}>
            Характеристики
            <Field
              as="textarea"
              name="specifications"
              className={styles.textarea}
            />
          </label>

          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Завантаження…' : 'Опублікувати'}
            </button>

            <button type="button" className={styles.cancelButton}>
              Відмінити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
