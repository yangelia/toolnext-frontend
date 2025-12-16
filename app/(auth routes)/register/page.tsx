"use client";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import css from "./RegisterPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const payload = Object.fromEntries(formData) as RegisterRequest;
      const data = await register(payload);
      if (data) {
        setUser(data);
        toast.success("Registration successful!");
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
      toast.error("Oops... some error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Реєстрація</h1>
      <form className={css.form} action="handleSubmit">
        <label>
          Ім'я*
          <input type="text" name="userName" className={css.input} />
        </label>
        <label>
          Пошта*
          <input type="email" name="email" className={css.input} />
        </label>
        <label>
          Пароль*
          <input type="password" name="password" className={css.input} />
        </label>
        <label>
          Підтвердіть пароль*
          <input type="password" name="password" className={css.input} />
        </label>
      </form>
    </main>
  );
}
