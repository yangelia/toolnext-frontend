"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToolBasic } from "@/types/tool";
import ToolCard from "@/components/ToolCard/ToolCard";
import DeleteConfirmModal from "@/components/Modal/DeleteConfirmModal";
import { deleteToolAction } from "@/app/actions/deleteToolAction";
import css from "./UserToolsGrid.module.css";

interface UserToolsGridProps {
  tools: ToolBasic[];
  isOwner: boolean;
}

export default function UserToolsGrid({ tools, isOwner }: UserToolsGridProps) {
  const router = useRouter();
  const [localTools, setLocalTools] = useState(tools);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toolToDelete, setToolToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!localTools || localTools.length === 0) return null;

  const handleCardClick = (e: React.MouseEvent, toolId: string) => {
    // Перевіряємо чи клік був не по кнопці/лінку
    const target = e.target as HTMLElement;
    const isButton = target.closest("button") || target.closest("a");

    if (!isButton) {
      router.push(`/tools/${toolId}`);
    }
  };

  const handleDeleteClick = (toolId: string) => {
    setToolToDelete(toolId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!toolToDelete) return;

    setIsDeleting(true);
    try {
      // Викликаємо Server Action замість клієнтського API
      const result = await deleteToolAction(toolToDelete);

      if (!result.success) {
        // Показуємо помилку з сервера
        alert(result.error || "Не вдалося видалити інструмент");
        return;
      }

      // Оптимістичне оновлення UI - видаляємо картку з локального стану
      setLocalTools((prev) => prev.filter((tool) => tool._id !== toolToDelete));

      setIsModalOpen(false);
      setToolToDelete(null);

      // Оновлюємо сторінку для синхронізації з сервером
      router.refresh();
    } catch (error) {
      console.error("Помилка при видаленні інструменту:", error);
      alert("Не вдалося видалити інструмент. Спробуйте ще раз.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setToolToDelete(null);
  };

  return (
    <>
      <section className={css.section}>
        <h2 className={css.sectionTitle}>Інструменти</h2>
        <ul className={css.grid}>
          {localTools.map((tool) => (
            <div
              key={tool._id}
              onClick={(e) => handleCardClick(e, tool._id)}
              className={css.cardWrapper}
            >
              <ToolCard
                tool={tool}
                isOwner={isOwner}
                onDelete={() => handleDeleteClick(tool._id)}
              />
            </div>
          ))}
        </ul>
      </section>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
