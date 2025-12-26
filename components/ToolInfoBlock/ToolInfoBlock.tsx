"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ToolDetails } from "@/types/tool";
import { useAuthStore } from "@/lib/store/authStore";
import AuthRequiredModal from "@/components/AuthRequiredModal/AuthRequiredModal";

import css from "./ToolInfoBlock.module.css";

interface ToolInfoBlockProps {
  tool: ToolDetails;
}

export default function ToolInfoBlock({ tool }: ToolInfoBlockProps) {
  const router = useRouter();

  const { isAuthenticated, loading } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
  }));

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleBookClick = () => {
    // ⛔ Ждём, пока authStore узнает, кто пользователь
    if (loading) return;

    if (isAuthenticated) {
      router.push(`/tools/${tool._id}/booking`);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const ownerName = tool.owner.username;
  const ownerAvatar = tool.owner.avatar || "/avatar-placeholder.png";

  return (
    <section className={css.toolInfo}>
      <div className={css.container}>
        <h1 className={css.title}>{tool.name}</h1>
        <p className={css.price}>{tool.pricePerDay} грн / день</p>

        <div className={css.toolOwner}>
          <Image
            src={ownerAvatar}
            alt={ownerName || "Аватар користувача"}
            width={48}
            height={48}
            className={css.ownerAvatar}
          />

          <div className={css.ownerInfo}>
            <p className={css.ownerName}>{ownerName}</p>

            <Link href={`/users/${tool.owner._id}`} className={css.ownerLink}>
              Переглянути профіль
            </Link>
          </div>
        </div>

        <p className={css.description}>{tool.description}</p>

        <div className={css.toolSpec}>
          <ul className={css.specifications}>
            {Object.entries(tool.specifications).map(([key, value]) => (
              <li key={key}>
                <strong className="toolSpecTitle">{key}:</strong> {value}
              </li>
            ))}
          </ul>

          {tool.rentalTerms && (
            <p className={css.rentalTerms}>
              <strong>Умови оренди:</strong> {tool.rentalTerms}
            </p>
          )}
        </div>

        <button
          className={css.bookBut}
          onClick={handleBookClick}
          disabled={loading}
        >
          {loading ? "Перевірка авторизації..." : "Забронювати"}
        </button>

        <AuthRequiredModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </section>
  );
}
