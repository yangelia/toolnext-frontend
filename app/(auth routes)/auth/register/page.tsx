"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./RegisterPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string()
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
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { fetchUser } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        // const endpoint = `${API_URL}/auth/register`;
        const res = await fetch("/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            password: values.password,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const message =
            data?.message || data?.error || "Не вдалося зареєструватися";
          toast.error(message, {
            style: {
              border: "1px solid #8808CC",
              padding: "16px",
              color: "#000",
            },
            iconTheme: { primary: "#8808CC", secondary: "#FFFAEE" },
          });

          throw new Error(message);
        }

        // Обновляем состояние авторизации перед редиректом
        await fetchUser();
        router.replace(redirectTo);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Сталася помилка";
        setStatus(message);
        if (typeof window !== "undefined") alert(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    status,
  } = formik;

  return (
    <section className={styles.container}>
      <Toaster position="top-center" />
      <div className={styles.page}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Реєстрація</h1>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {[
              {
                name: "name",
                label: "Ім'я*",
                type: "text",
                placeholder: "Ваше ім'я",
                autoComplete: "name",
              },
              {
                name: "email",
                label: "Пошта*",
                type: "email",
                placeholder: "Ваша пошта",
                autoComplete: "email",
              },
              {
                name: "password",
                label: "Пароль*",
                type: "password",
                placeholder: "******",
                autoComplete: "new-password",
              },
              {
                name: "confirmPassword",
                label: "Підтвердіть пароль*",
                type: "password",
                placeholder: "******",
                autoComplete: "new-password",
              },
            ].map((field) => {
              const hasError =
                touched[field.name as keyof typeof touched] &&
                errors[field.name as keyof typeof errors];
              return (
                <label key={field.name} className={styles.field}>
                  <span className={styles.label}>{field.label}</span>
                  <input
                    className={`${styles.input} ${
                      hasError ? styles.inputError : ""
                    }`}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    value={values[field.name as keyof typeof values]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(hasError)}
                    required
                  />
                  {hasError ? (
                    <span className={styles.errorText}>
                      {errors[field.name as keyof typeof errors] as string}
                    </span>
                  ) : null}
                </label>
              );
            })}

            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
            </button>
            {status ? <div className={styles.formStatus}>{status}</div> : null}
          </form>

          <div className={styles.switchAuth}>
            <span>Вже маєте акаунт? </span>
            <Link href="/login">Вхід</Link>
          </div>
        </div>

        <div className={styles.imageSection} aria-hidden>
          <Image
            src="/images/registr_img.webp"
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
