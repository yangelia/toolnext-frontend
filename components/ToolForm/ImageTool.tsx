// "use client";

// import Image from "next/image";
// import { useFormikContext } from "formik";
// import styles from "./AddEditToolForm.module.css";
// import type { ToolDraft } from "@/types/tool";
// import { useMemo, useEffect, useState, useId } from "react";

// type Props = {
//   initialImageUrl?: string | null;
// };

// const PLACEHOLDER = "/images/placeholder-image.png";
// const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
// const ALLOWED_TYPES = ["image/jpeg", "image/png"];

// export default function ImageTool({ initialImageUrl }: Props) {
//   const { values, setFieldValue } = useFormikContext<ToolDraft>();
//   const [error, setError] = useState("");
//   const inputId = useId();

//   const previewUrl = useMemo(() => {
//     if (values.image) return URL.createObjectURL(values.image);
//     return initialImageUrl || PLACEHOLDER;
//   }, [values.image, initialImageUrl]);

//   useEffect(() => {
//     if (!values.image) return;
//     return () => URL.revokeObjectURL(previewUrl);
//   }, [values.image, previewUrl]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setError("");

//     if (!file) return;

//     if (!ALLOWED_TYPES.includes(file.type)) {
//       setError("Дозволені формати: jpg або png");
//       e.target.value = "";
//       return;
//     }

//     if (file.size > MAX_IMAGE_SIZE) {
//       setError("Максимальний розмір зображення 1 MB");
//       e.target.value = "";
//       return;
//     }

//     setFieldValue("image", file);
//     e.target.value = ""; // щоб можна було вибрати той самий файл повторно
//   };

//   const handleClear = () => {
//     setFieldValue("image", null);
//     setError("");
//   };

//   return (
//     <div className={styles.imageTool}>
//       <p className={styles.label}>Фото інструменту</p>

//       <div className={styles.imagePreview}>
//         <Image
//           src={previewUrl}
//           alt="Фото інструменту"
//           fill
//           sizes="(max-width: 480px) 100vw, 335px"
//           className={styles.previewImg}
//         />
//       </div>

//       <input
//         id={inputId}
//         className={styles.fileInput}
//         type="file"
//         accept="image/png, image/jpeg"
//         onChange={handleFileChange}
//       />

//       <div className={styles.buttonsImg}>
//         <label htmlFor={inputId} className={styles.uploadBtn}>
//           Завантажити фото
//         </label>

//         {values.image && (
//           <button
//             type="button"
//             onClick={handleClear}
//             className={styles.clearBtn}
//           >
//             Скасувати вибір
//           </button>
//         )}
//       </div>

//       {error && <p className={styles.error}>{error}</p>}
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useFormikContext } from "formik";
import styles from "./AddEditToolForm.module.css";
import type { ToolDraft } from "@/types/tool";
import { useMemo, useEffect, useState, useId } from "react";

type Props = {
  initialImageUrl?: string | null;
};

const PLACEHOLDER = "/images/placeholder-image.png";
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Не вдалося прочитати файл"));
    reader.readAsDataURL(file);
  });
}

export default function ImageTool({ initialImageUrl }: Props) {
  const { values, setFieldValue } = useFormikContext<ToolDraft>();
  const [error, setError] = useState("");
  const inputId = useId();

  const previewUrl = useMemo(() => {
    const img = values.image;

    if (img instanceof File) return URL.createObjectURL(img); // на всяк випадок
    if (typeof img === "string" && img.length > 0) return img; // ✅ dataURL з draft
    return initialImageUrl || PLACEHOLDER;
  }, [values.image, initialImageUrl]);

  useEffect(() => {
    if (!(values.image instanceof File)) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [values.image, previewUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Дозволені формати: jpg або png");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Максимальний розмір зображення 1 MB");
      e.target.value = "";
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setFieldValue("image", dataUrl);
    } catch {
      setError("Не вдалося завантажити фото. Спробуйте інше.");
    } finally {
      e.target.value = "";
    }
  };

  const handleClear = () => {
    setFieldValue("image", null);
    setError("");
  };

  return (
    <div className={styles.imageTool}>
      <p className={styles.label}>Фото інструменту</p>

      <div className={styles.imagePreview}>
        <Image
          src={previewUrl}
          alt="Фото інструменту"
          fill
          sizes="(max-width: 480px) 100vw, 335px"
          className={styles.previewImg}
        />
      </div>

      <input
        id={inputId}
        className={styles.fileInput}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />

      <div className={styles.buttonsImg}>
        <label htmlFor={inputId} className={styles.uploadBtn}>
          Завантажити фото
        </label>

        {values.image && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearBtn}
          >
            Скасувати вибір
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
