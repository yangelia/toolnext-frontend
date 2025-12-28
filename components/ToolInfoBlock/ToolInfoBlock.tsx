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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleBookClick = () => {
    if (isAuthenticated) {
      router.push(`/tools/${tool._id}/booking`);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // === OWNER NORMALIZATION ===
  const owner = typeof tool.owner === "object" ? tool.owner : null;

  const ownerName = owner?.username || owner?.name || "Користувач";

  const ownerAvatar =
    owner?.avatar && owner.avatar.trim() !== ""
      ? owner.avatar
      : owner?.avatarUrl && owner.avatarUrl.trim() !== ""
      ? owner.avatarUrl
      : null;

  return (
    <section className={css.toolInfo}>
      <h1 className={css.toolTitle}>{tool.name}</h1>

      <p className={css.toolPrice}>{tool.pricePerDay} грн / день</p>

      <div className={css.toolOwner}>
        {ownerAvatar ? (
          <Image
            src={ownerAvatar}
            alt={ownerName}
            width={80}
            height={80}
            className={css.ownerAvatar}
          />
        ) : (
          <div className={css.ownerAvatarFallback}>
            {ownerName.charAt(0).toUpperCase()}
          </div>
        )}

        <div className={css.ownerInfo}>
          <p className={css.ownerName}>{ownerName}</p>

          {owner?._id && (
            <Link href={`/profile/${owner._id}`}>Переглянути профіль</Link>
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

      <button className={css.toolBut} onClick={handleBookClick}>
        Забронювати
      </button>

      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </section>
  );
}
