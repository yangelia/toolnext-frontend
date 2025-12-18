"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import AuthRequiredModal from "@/components/Modal/AuthRequiredModal/AuthRequiredModal";
import { Tool } from "@/types/tool";

import styles from "./ToolInfoBlock.module.css";

interface ToolInfoBlockProps {
  tool: Tool;
  isAuthenticated: boolean;
}

export default function ToolInfoBlock({
  tool,
  isAuthenticated,
}: ToolInfoBlockProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
  };

  return (
    <>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>{tool.name}</h1>
        <p className={styles.price}>{tool.pricePerDay} грн / день</p>
        <div className={styles.owner}>
          <Image
            src={tool.owner.avatar}
            alt={tool.owner.username}
            width={40}
            height={40}
            className={styles.avatar}
          />

          <div>
            <p className={styles.ownerName}>{tool.owner.username}</p>
            <Link
              href={`/profile/${tool.owner._id}`}
              className={styles.profileLink}
            >
              Переглянути профіль
            </Link>
          </div>
        </div>

        <p className={styles.description}>{tool.description}</p>

        <ul className={styles.specifications}>
          {Object.entries(tool.specifications).map(([key, value]) => (
            <li key={key}>
              <span>{key}:</span> {value}
            </li>
          ))}
        </ul>

        <div className={styles.rentalTerms}>
          <h3>Умови оренди</h3>
          <p>{tool.rentalTerms}</p>
        </div>

        {isAuthenticated ? (
          <Link href={`/booking/${tool._id}`} className={styles.bookButton}>
            Забронювати
          </Link>
        ) : (
          <button className={styles.bookButton} onClick={handleBookingClick}>
            Забронювати
          </button>
        )}
      </section>

      {/* Модалка */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
