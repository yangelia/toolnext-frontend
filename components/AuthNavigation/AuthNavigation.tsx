"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";
import { useEffect } from "react";
import { User } from "@/types/user";

interface Props {
  user: User | null; // <-- корректный тип
}

export default function AuthNavigation({ user: serverUser }: Props) {
  const router = useRouter();

  const { isAuthenticated, user, clearIsAuthenticated, setUser } =
    useAuthStore();

  // Синхронизация серверного user → Zustand (SSR → CSR)
  useEffect(() => {
    if (serverUser) {
      setUser(serverUser);
    } else {
      clearIsAuthenticated();
    }
  }, [serverUser, setUser, clearIsAuthenticated]);

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
