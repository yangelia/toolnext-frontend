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
    // ⬅️ КЛЮЧЕВО: ждём, пока auth инициализируется
    if (loading) return;

    if (isAuthenticated) {
      router.push(`/tools/${tool._id}/booking`);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // owner приходит из populate → объект
  const owner =
    tool.owner && typeof tool.owner === "object" ? tool.owner : null;

  const ownerName = owner?.username ?? "Користувач";
  const ownerAvatar = owner?.avatar ?? "/images/default-avatar.jpg";

  return (
    <section className={css.toolInfo}>
      <h1 className={css.toolTitle}>{tool.name}</h1>

      <p className={css.toolPrice}>{tool.pricePerDay} грн / день</p>

      <div className={css.toolOwner}>
        <Image
          src={ownerAvatar}
          alt={ownerName}
          width={80}
          height={80}
          className={css.ownerAvatar}
        />

        <div className={css.ownerInfo}>
          <p className={css.ownerName}>{ownerName}</p>

          {owner?._id && (
            <Link href={`/users/${owner._id}`}>Переглянути профіль</Link>
          )}
        </div>
      </div>

      <p className={css.toolDescr}>{tool.description}</p>

      <div className={css.toolSpec}>
        <ul>
          {Object.entries(tool.specifications).map(([key, value]) => (
            <li key={key}>
              <strong className={css.toolSpecTitle}>{key}:</strong> {value}
            </li>
          ))}
        </ul>

        {tool.rentalTerms && (
          <p>
            <strong>Умови оренди:</strong> {tool.rentalTerms}
          </p>
        )}
      </div>

      <button
        className={css.toolBut}
        onClick={handleBookClick}
        disabled={loading}
      >
        Забронювати
      </button>

      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </section>
  );
}
