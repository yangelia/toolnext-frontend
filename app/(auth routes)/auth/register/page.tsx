"use client";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import css from "./RegisterPage.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { ApiError } from "@/app/api/api";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (isAuthenticated) {
      toast.error("Ви вже авторизовані.");
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Доступ обмежено</h1>
        <p>
          Ви вже маєте активну сесію. Будь ласка, вийдіть, щоб зареєструвати
          новий обліковий запис.
        </p>
      </main>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Зупиняємо стандартну відправку форми
    setError("");
    const formData = new FormData(event.currentTarget);
    const rawValues = Object.fromEntries(formData);

    if (rawValues.password !== rawValues.confirmPassword) {
      const passwordMatchError = "Паролі мають співпадати.";
      setError(passwordMatchError);
      toast.error(passwordMatchError);
      return;
    }
    const { confirmPassword, ...dataToSend } = rawValues;
    try {
      // Типізуємо дані форми
      const payload = dataToSend as RegisterRequest;
      const data = await register(payload);
      // При успішній реєстрації (data містить об'єкт користувача)
      if (data) {
        setUser(data); // 5. ✅ АВТОРИЗАЦІЯ (Zustand)
        toast.success("Реєстрація успішна! Ласкаво просимо.");

        // 6. ✅ Перенаправлення
        router.push("/profile");
      } else {
        // Обробка непередбачуваних випадків
        const unexpectedError = "Неочікувана помилка при реєстрації.";
        setError(unexpectedError);
        toast.error(unexpectedError);
      }
    } catch (error) {
      // 7. ✅ ОБРОБКА ПОМИЛОК БЕКЕНДУ з використанням ApiError
      const apiError = error as ApiError;

      // ApiError має властивість response, яка містить об'єкт data
      const errorMessage =
        apiError.response?.data?.error ||
        apiError.message ||
        "Помилка сервера. Спробуйте пізніше.";

      // Відображення помилки у формі
      setError(errorMessage);
      // Відображення пуш-повідомлення
      toast.error(errorMessage);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Реєстрація</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* Відображення помилки */}
        {error && <div className={css.errorMessage}>{error}</div>}

        <label>
          Ім'я*
          <input type="text" name="username" className={css.input} required />
        </label>
        <label>
          Пошта*
          <input type="email" name="email" className={css.input} required />
        </label>
        <label>
          Пароль*
          <input
            type="password"
            name="password"
            className={css.input}
            required
          />
        </label>
        <label>
          Підтвердіть пароль*
          <input
            type="password"
            name="confirmPassword"
            className={css.input}
            required
          />
        </label>

        <button type="submit" className={css.submitButton}>
          Зареєструватися
        </button>

        {/* Додано посилання на вхід */}
        <p className={css.loginLink}>
          Вже маєте аккаунт? <Link href="/login">Вхід</Link>
        </p>
      </form>
    </main>
  );
}
