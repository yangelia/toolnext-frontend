"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./RegisterPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { register } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { useEffect, useState } from "react";
//import iziToast from "izitoast";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(2, "Мінімум 2 символи")
    .required("Обов'язкове поле"),
  email: Yup.string()
    .trim()
    .email("Некоректна пошта")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Обов'язкове поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Паролі не співпадають")
    .required("Обов'язкове поле"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { isAuthenticated, loading, setUser, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return null;
  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError("");

    try {
      const res = await register(values);
      setUser(res);

      router.push("/auth/login");
      toast.success("Реєстрація успішна! Увійдіть у акаунт.");
    } catch (err) {
      const apiError = err as ApiError;
      const message = apiError.response?.data?.error || "Помилка сервера";

      // Спеціально обробляємо помилку зайнятої пошти
      if (
        message.toLowerCase().includes("email") ||
        message.toLowerCase().includes("пошта")
      ) {
        toast.error("Ця пошта вже використовується");
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.page}>
        <div className={styles.formSection}>
          <Link href="/" className={styles.logo} aria-label="ToolNext home">
            <Image
              src="/images/Tool-Next.svg"
              alt="ToolNext"
              width={92}
              height={20}
              priority
            />
          </Link>
          <h1 className={styles.title}>Реєстрація</h1>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className={styles.form}>
                {/* Username */}
                <label className={styles.field}>
                  <span className={styles.label}>Ім'я користувача*</span>
                  <Field
                    name="username"
                    placeholder="Ваше ім'я"
                    className={`${styles.input} ${
                      errors.username && touched.username
                        ? styles.inputError
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={styles.errorText}
                  />
                </label>

                {/* Email */}
                <label className={styles.field}>
                  <span className={styles.label}>Пошта*</span>
                  <Field
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    className={`${styles.input} ${
                      (errors.email && touched.email) || error.includes("пошта")
                        ? styles.inputError
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorText}
                  />
                </label>

                {/* Password */}
                <label className={styles.field}>
                  <span className={styles.label}>Пароль*</span>
                  <Field
                    type="password"
                    name="password"
                    placeholder="******"
                    className={`${styles.input} ${
                      errors.password && touched.password
                        ? styles.inputError
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.errorText}
                  />
                </label>

                {/* Confirm Password */}
                <label className={styles.field}>
                  <span className={styles.label}>Підтвердіть пароль*</span>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="******"
                    className={`${styles.input} ${
                      errors.confirmPassword && touched.confirmPassword
                        ? styles.inputError
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.errorText}
                  />
                </label>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
                </button>

                {error && <div className={styles.serverError}>{error}</div>}
              </Form>
            )}
          </Formik>

          <div className={styles.switchAuth}>
            <span>Вже маєте акаунт?</span>
            <Link href="/auth/login">Вхід</Link>
          </div>
          <p className={styles.copy}>© {new Date().getFullYear()} ToolNext</p>
        </div>
        <div className={styles.imageSection} aria-hidden={true}>
          <Image
            src="/images/registr_img.webp"
            alt="Робочі інструменти на полицях"
            fill
            priority
            className={styles.image}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
}
