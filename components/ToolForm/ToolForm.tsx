"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ToolForm.module.css";

export type CategoryOption = {
  _id: string;
  title: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Обовʼязкове поле"),
  pricePerDay: Yup.number()
    .typeError("Введіть число")
    .required("Обовʼязкове поле"),
  category: Yup.string().required("Оберіть категорію"),
});

export default function ToolForm() {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className={styles.form}>
        {/* Image */}
        <div className={styles.imageSection}>
          <p className={styles.sectionTitle}>Фото інструменту</p>

          <div
            className={styles.imagePreview}
            onClick={() => {}}
            aria-label="Вибрати фото інструменту"
          >
            {/* <Image
                  src={preview}
                  alt={
                    isPlaceholder
                      ? "Фото інструменту (placeholder)"
                      : "Фото інструменту"
                  }
                  fill
                  className={`${styles.image} ${
                    isPlaceholder ? styles.placeholderImage : ""
                  }`}
                  unoptimized={isBlobPreview}
                /> */}
          </div>

          <div className={styles.imageButtons}>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => {}}
            >
              Завантажити фото
            </button>

            {/* <button
              type="button"
              className={styles.removeBtn}
              onClick={() => {}}
            >
              Видалити фото
            </button> */}
          </div>

          <input id="imageInput" type="file" accept="image/*" hidden />
        </div>

        {/* Fields */}
        <label className={styles.field}>
          <span className={styles.label}>Назва</span>
          <Field
            name="name"
            className={styles.input}
            placeholder="Введіть назву"
          />
          <ErrorMessage name="name" component="p" className={styles.error} />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Ціна/день</span>
          <Field
            name="pricePerDay"
            type="number"
            className={styles.input}
            placeholder="500"
          />
          <ErrorMessage
            name="pricePerDay"
            component="p"
            className={styles.error}
          />
        </label>

        {/* <label className={styles.field}>
              <span className={styles.label}>Категорія</span>
              <Field as="select" name="category" className={styles.select}>
                <option value="">Категорія</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="p"
                className={styles.error}
              />
            </label> */}

        <label className={styles.field}>
          <span className={styles.label}>Умови оренди</span>
          <Field
            as="textarea"
            name="rentalTerms"
            className={styles.textarea}
            placeholder="Застава 8000 грн. Станина та бак для води надаються окремо."
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Опис</span>
          <Field
            as="textarea"
            name="description"
            className={styles.textarea}
            placeholder="Ваш опис"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Характеристики</span>
          <Field
            as="textarea"
            name="specifications"
            className={styles.textarea}
            placeholder="Характеристики інструменту"
          />
        </label>

        {status ? <p className={styles.formError}>{status}</p> : null}

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitBtn}>
            fffff
          </button>

          <button type="button" className={styles.cancelBtn}>
            Відмінити
          </button>
        </div>
      </Form>
    </Formik>
  );
}
