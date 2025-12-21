"use client";
import { useRouter } from "next/navigation";
import css from "./ToolInfoBlock.module.css";
import { User } from "@/types/user";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { Tool } from "@/types/tool";
import { useState } from "react";
import AuthRequiredModal from "@/components/Modal/AuthRequiredModal/AuthRequiredModal";

import Image from "next/image";

export default function ToolInfoBlock({ tool }: { tool: Tool }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isOwner = Boolean(user?.id && user.id === tool.owner._id);

  const handleBookClick = () => {
    if (isAuthenticated) {
      router.push(`/manage-tools/${tool._id}/booking`);
    } else {
      setIsAuthModalOpen(true);
    }
  };
  const owner = tool.owner;
  return (
    <section className={css.toolInfo}>
      <div className="container">
        <h1 className={css.toolTitle}>{tool.name}</h1>
        <p className={css.toolPrice}>{tool.pricePerDay} грн/день</p>
        {isOwner && (
          <div className={css.toolOwner}>
            <img
              src={owner.avatar || "/avatar-placeholder.png"}
              alt={owner.username}
              className={css.ownerAvatar}
            />
            <div className={css.ownerInfo}>
              <p className={css.ownerName}>{owner.username}</p>
              <Link
                href={`/profile/${owner._id}`}
                className={`{css.ownerLink} button button--secondary`}
              >
                Переглянути профіль
              </Link>
            </div>
          </div>
        )}

        <p className={css.toolDescr}>{tool.description}</p>
        <div className={css.toolSpec}>
          {Object.entries(tool.specifications).map(([key, value]) => (
            <p key={key}>
              <strong className={css.toolSpecTitle}>{key}: </strong>
              {value}
            </p>
          ))}
          {tool.rentalTerms && (
            <p key="rentalTerms">
              <strong className={css.toolSpecTitle}>Умови оренди: </strong>
              {tool.rentalTerms}
            </p>
          )}
        </div>
        <button
          className={`${css.toolBut} button button--primary`}
          onClick={handleBookClick}
        >
          Забронювати
        </button>
        <AuthRequiredModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </section>
  );
}
