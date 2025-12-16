'use client';

import styles from "./LoginPage.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api'
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;

      const res = await login(formValues);
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
      )
    }
   }
  
  return (
    <div className={styles.container}>
       <form action={handleSubmit}>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        Password
        <input type="password" name="password" required />
      </label>
        <button type="submit">Log in</button>
        {error && <p>{error}</p>}
      </form>
      <span><Link href="/auth/register">Registration</Link></span>
    </div>
  );
};
