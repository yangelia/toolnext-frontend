'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

import { createTool, updateTool, getToolById, getCategories } from '@/lib/api/tools';

import styles from './AddToolForm.module.css';

type Props = {
  mode: 'create' | 'edit';
  toolId?: string;
};

type Category = {
  _id: string;
  name: string;
};

export default function AddToolForm({ mode, toolId }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ---------- LOAD DATA ---------- */

  useEffect(() => {
    getCategories().then(setCategories);

    if (mode === 'edit' && toolId) {
      getToolById(toolId).then((tool) => {
        setName(tool.name);
        setPricePerDay(String(tool.pricePerDay));
        setCategory(tool.category);
        setDescription(tool.description || '');
        setImagePreview(tool.images?.[0] || null);
      });
    }
  }, [mode, toolId]);

  /* ---------- HANDLERS ---------- */

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('pricePerDay', pricePerDay);
      formData.append('category', category);
      formData.append('description', description);

      if (imageFile) {
        formData.append('images', imageFile);
      }

      if (mode === 'create') {
        await createTool(formData);
      }

      if (mode === 'edit' && toolId) {
        await updateTool(toolId, formData);
      }

      alert('Інструмент збережено');
    } catch (error) {
      console.error(error);
      alert('Помилка при збереженні');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- RENDER ---------- */

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* IMAGE */}
      <label className={styles.imageBlock}>
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>Натисніть для додавання фото</div>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </label>

      {/* NAME */}
      <div className={styles.field}>
        <label>Назва</label>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* PRICE */}
      <div className={styles.field}>
        <label>Ціна за день</label>
        <input
          className={styles.input}
          type="number"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          required
        />
      </div>

      {/* CATEGORY */}
      <div className={styles.field}>
        <label>Категорія</label>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Оберіть категорію</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* DESCRIPTION */}
      <div className={styles.field}>
        <label>Опис</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* BUTTONS */}
      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Збереження...' : 'Опублікувати'}
        </button>
      </div>
    </form>
  );
}
