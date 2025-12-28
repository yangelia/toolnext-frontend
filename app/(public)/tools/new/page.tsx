'use client';

import { useCallback, useState } from 'react';

interface ToolFormState {
  name: string;
  category: string;
  pricePerDay: string;
  description: string;
  images: File[];
}

const INITIAL_FORM: ToolFormState = {
  name: '',
  category: '',
  pricePerDay: '',
  description: '',
  images: [],
};

export default function NewToolPage() {
  const [form, setForm] = useState<ToolFormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Универсальный setter поля формы
   * (ключевое отличие — типизированный generic)
   */
  const updateField = useCallback(
    <K extends keyof ToolFormState>(field: K, value: ToolFormState[K]) => {
      setForm(prev => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof ToolFormState, value);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    updateField('images', Array.from(e.target.files));
  };

  /**
   * Явная подготовка данных перед отправкой
   */
  const prepareFormData = () => {
    const data = new FormData();

    data.append('name', form.name.trim());
    data.append('category', form.category.trim());
    data.append('pricePerDay', String(Number(form.pricePerDay)));
    data.append('description', form.description.trim());

    form.images.forEach(file => {
      data.append('images', file);
    });

    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = prepareFormData();

      // 🔜 здесь будет POST /tools
      console.log('FORM DATA:', [...formData.entries()]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '40px 0' }}>
      <form onSubmit={handleSubmit}>
        <h1>Add new tool</h1>

        <label>
          Tool name
          <input
            name="name"
            value={form.name}
            onChange={handleTextChange}
            required
          />
        </label>

        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleTextChange}
            required
          />
        </label>

        <label>
          Price per day
          <input
            name="pricePerDay"
            type="number"
            min="0"
            value={form.pricePerDay}
            onChange={handleTextChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleTextChange}
          />
        </label>

        <label>
          Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Create tool'}
        </button>
      </form>
    </main>
  );
}
