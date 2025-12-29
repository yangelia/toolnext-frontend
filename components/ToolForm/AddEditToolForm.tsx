"use client";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikHelpers,
} from "formik";
import styles from "./AddEditToolForm.module.css";
import { ToolDraft } from "@/types/tool";
import { useMemo } from "react";
import ToolDraftSync from "./ToolDraftSync";
import ToolFormActions from "./ToolFormActions";
import ImageTool from "./ImageTool";
import {
  toolCreateSchema,
  toolEditSchema,
} from "@/lib/validation/toolValidation";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import CategorySelect from "../CategorySelect/CategorySelect";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { dataUrlToFile } from "@/lib/utils/dataUrlToFile";

export type CategoryOption = {
  _id: string;
  title: string;
};

type ToolFromApi = {
  name?: string;
  pricePerDay?: number | string | null;
  category?: CategoryOption | string | null;
  rentalTerms?: string;
  description?: string;
  specifications?: Record<string, string> | null;
  images?: string[];
};

type ToolFormProps = {
  categories: CategoryOption[];
  toolId: string; // для чернетки: edit id або "new"
  tool?: ToolFromApi | null; // для create можна null
  submitLabel: string; // "Створити" | "Оновити"
  onSubmit: (formData: FormData) => Promise<void>;
  busy?: boolean;
};

const IMAGE_FIELD = "image";

export default function AddEditToolForm({
  categories,
  toolId,
  tool,
  submitLabel,
  onSubmit,
  busy,
}: ToolFormProps) {
  const categoryId =
    typeof tool?.category === "string"
      ? tool.category
      : tool?.category?._id ?? "";

  const initialValue: ToolDraft = useMemo(
    () => ({
      name: tool?.name || "",
      pricePerDay: tool?.pricePerDay != null ? String(tool.pricePerDay) : "",
      category: categoryId || "",
      rentalTerms: tool?.rentalTerms || "",
      description: tool?.description || "",
      specifications: tool?.specifications
        ? Object.entries(tool.specifications).map(([key, value]) => ({
            key,
            value,
          }))
        : [{ key: "", value: "" }],
      image: null,
    }),
    [tool, categoryId]
  );

  const toolImageUrl = tool?.images?.[0] ?? null;

  const isCreate = submitLabel.toLowerCase().includes("створ") || !tool;
  const validationSchema = isCreate ? toolCreateSchema : toolEditSchema;

  const handleSubmit = async (
    values: ToolDraft,
    helpers: FormikHelpers<ToolDraft>
  ) => {
    const specsRecord = values.specifications
      .map((p) => ({ key: p.key.trim(), value: p.value.trim() }))
      .filter((p) => p.key.length > 0)
      .reduce<Record<string, string>>((acc, p) => {
        acc[p.key] = p.value;
        return acc;
      }, {});

    const fd = new FormData();
    fd.append("name", values.name.trim());
    fd.append("pricePerDay", String(Number(values.pricePerDay)));
    fd.append("category", values.category);
    fd.append("rentalTerms", values.rentalTerms || "");
    fd.append("description", values.description || "");
    fd.append("specifications", JSON.stringify(specsRecord));
    const img = values.image;

    if (img instanceof File) {
      fd.append(IMAGE_FIELD, img);
    } else if (typeof img === "string" && img.startsWith("data:")) {
      const file = await dataUrlToFile(img, "tool-image");
      fd.append(IMAGE_FIELD, file);
    }

    try {
      await onSubmit(fd);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik<ToolDraft>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ values, isSubmitting }) => {
        const isBusy = isSubmitting || Boolean(busy);
        return (
          <Form className={styles.form}>
            {isBusy && <OverlayLoader />}
            <ToolDraftSync toolId={toolId} initialValues={initialValue} />

            <ImageTool initialImageUrl={toolImageUrl} />
            <ErrorMessage
              name="image"
              component="span"
              className={styles.error}
            />

            <label className={styles.field}>
              <span className={styles.label}>Назва</span>
              <Field
                name="name"
                className={styles.input}
                placeholder="Введіть назву"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Ціна/день</span>
              <Field
                name="pricePerDay"
                type="number"
                className={styles.input}
                placeholder="500"
              />
              <ErrorMessage
                name="pricePerDay"
                component="span"
                className={styles.error}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Категорія</span>
              <CategorySelect<ToolDraft>
                name="category"
                placeholder="Категорія"
                options={categories}
              />
              <ErrorMessage
                name="category"
                component="span"
                className={styles.error}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Умови оренди</span>
              <Field
                as="textarea"
                name="rentalTerms"
                className={styles.textareaRT}
              />
              <ErrorMessage
                name="rentalTerms"
                component="span"
                className={styles.error}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Опис</span>
              <Field
                as="textarea"
                name="description"
                className={styles.textarea}
              />
              <ErrorMessage
                name="description"
                component="span"
                className={styles.error}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>
                Характеристики (назва - опис)
              </span>
              <FieldArray name="specifications">
                {({ push, remove }) => (
                  <div className={styles.specList}>
                    {values.specifications.map((_, idx) => (
                      <div key={idx} className={styles.specRow}>
                        <Field
                          name={`specifications.${idx}.key`}
                          className={styles.input}
                          placeholder="Напр. вага"
                        />
                        <Field
                          name={`specifications.${idx}.value`}
                          className={styles.input}
                          placeholder="Напр. 2 кг"
                        />
                        <button
                          type="button"
                          onClick={() => remove(idx)}
                          disabled={values.specifications.length === 1}
                        >
                          <svg
                            className={styles.menuDelete}
                            width="24"
                            height="24"
                            aria-hidden="true"
                          >
                            <use href="/icons/sprite.svg#icon-close" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push({ key: "", value: "" })}
                    >
                      + Додати характеристику
                    </button>
                  </div>
                )}
              </FieldArray>
            </label>

            <ToolFormActions
              toolId={toolId}
              initialValues={initialValue}
              submitLabel={submitLabel}
              disabled={isBusy}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
