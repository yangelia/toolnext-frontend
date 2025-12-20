'use client';

import styles from "./LoginPage.module.css";
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api'
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";



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
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: LoginRequest) => {
    try {
      const res = await login(values);
      
      console.log('Login response:', res);
      if (res && res._id && res.email) {
        setUser(res);
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
      <section className={styles.container}>
        <div className={styles.page}>
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
              
            </div>

            <div className={styles.imageSection} aria-hidden={true}>
              <Image
                src="/images/login_img.webp"
                alt="Робочі інструменти на полицях"
                fill
                priority
                className={styles.image}
              />
            </div>
        </div>
      </section>
  );
}
