'use client';

import styles from "./LoginPage.module.css";
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api'
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Некоректна пошта")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Обов'язкове поле"),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (values: LoginRequest) => {
    try {
      const res = await login(values);
      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message ??
        "Oops... some error"
      );
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.page}>
          <div className={styles.card}>
            <div className={styles.formSection}>
              <div>
                <h1 className={styles.title}>Вхід</h1>
              </div>

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className={styles.form}>
                    <label className={styles.field}>

                      <span className={styles.label}>Пошта*</span>
      
                      <Field
                        type="email"
                        name="email"
                        placeholder="Ваша пошта"
                        className={`${styles.input}
                        ${errors.email && touched.email
                            ? styles.inputError
                            : ''
                          }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.errorText}
                      />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Пароль*</span>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Ваш пароль"
                        className={`${styles.input}
                        ${errors.password && touched.password
                            ? styles.inputError
                            : ''
                          }`}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className={styles.errorText}
                      />
                    </label>

                    <button
                      type="submit"
                      className={styles.submit}
                      disabled={isSubmitting}
                    >
                      Увійти
                    </button>

                    {error && <p className={styles.errorText}>{error}</p>}
                  </Form>
                )}
              </Formik>

              <div className={styles.switchAuth}>
                <span>Не маєте аккаунту?</span>
                <Link href="/auth/register">Реєстрація</Link>
              </div>

              <p className={styles.footerNote}>© 2025 ToolNext</p>

            </div>

            <div className={styles.imageSection} aria-hidden></div>
          </div>
        </div>
      </div>
    </main>
  );
}
