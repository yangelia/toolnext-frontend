import Image from "next/image";
import { useState } from "react";
import css from "./ToolGallery.module.css";

type Props = {
  images: string[];
};

export default function ToolGallery({ images }: Props) {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images?.length) return null;

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
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              width={64}
              height={64}
              alt="Мініатюра"
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
