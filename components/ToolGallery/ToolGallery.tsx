"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./ToolGallery.module.css";

interface ToolGalleryProps {
  images: string[];
}

export default function ToolGallery({ images }: ToolGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={css.gallery}>
      <Image
        src={mainImage}
        width={800}
        height={600}
        alt="Інструмент"
        className={css.mainImage}
        priority
      />

      {images.length > 1 && (
        <div className={css.thumbs}>
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              width={64}
              height={64}
              alt="Мініатюра інструменту"
              className={`${css.thumb} ${
                mainImage === img ? css.activeThumb : ""
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
