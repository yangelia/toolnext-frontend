import * as Yup from "yup";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const isValidId = (value: unknown) => {
  if (value === null || value === undefined) return false;

  if (typeof value === "number") return Number.isFinite(value);

  if (typeof value === "string") {
    const v = value.trim();
    if (/^[a-fA-F0-9]{24}$/.test(v)) return true;
    if (/^\d+$/.test(v)) return true;
  }

  return false;
};

const imageSchema = Yup.mixed()
  .test("fileSize", "Розмір файлу має бути до 1MB", (value) => {
    if (!value) return true;
    return value instanceof File ? value.size <= MAX_IMAGE_SIZE : true;
  })
  .test("fileType", "Дозволені формати: jpg або png", (value) => {
    if (!value) return true;
    if (!(value instanceof File)) return true;

    const typeOk = SUPPORTED_IMAGE_TYPES.includes(value.type);
    const extOk = /\.(jpg|jpeg|png)$/i.test(value.name);
    return typeOk || extOk;
  });

export const buildToolSchema = (opts?: { requireImage?: boolean }) => {
  const requireImage = opts?.requireImage ?? true;

  return Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Мінімум 3 символи")
      .max(96, "Максимум 96 символів")
      .required("Обовʼязкове поле"),

    pricePerDay: Yup.number()
      .typeError("Введіть число")
      .min(0, "Ціна не може бути менше 0")
      .required("Обовʼязкове поле"),

    category: Yup.mixed()
      .test("valid-id", "Оберіть коректну категорію", isValidId)
      .required("Оберіть категорію"),

    description: Yup.string()
      .trim()
      .min(20, "Мінімум 20 символів")
      .max(2000, "Максимум 2000 символів")
      .required("Обовʼязкове поле"),

    rentalTerms: Yup.string()
      .trim()
      .min(20, "Мінімум 20 символів")
      .max(1000, "Максимум 1000 символів")
      .required("Обовʼязкове поле"),

    specifications: Yup.array()
      .of(
        Yup.object({
          key: Yup.string().trim().max(200, "Занадто довгий ключ"),
          value: Yup.string().trim().max(500, "Занадто довге значення"),
        })
      )
      .test(
        "specsTotal",
        "Характеристики: максимум 1000 символів сумарно",
        (arr) => {
          const total = (arr ?? []).reduce(
            (sum, p) =>
              sum +
              (p?.key?.trim()?.length ?? 0) +
              (p?.value?.trim()?.length ?? 0),
            0
          );
          return total <= 1000;
        }
      ),

    image: requireImage
      ? imageSchema.required("Додайте зображення")
      : imageSchema.nullable(),
  });
};

export const toolCreateSchema = buildToolSchema({ requireImage: true });
export const toolEditSchema = buildToolSchema({ requireImage: false });
