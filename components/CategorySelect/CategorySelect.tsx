"use client";

import * as Select from "@radix-ui/react-select";
import { useFormikContext } from "formik";
import styles from "./CategorySelect.module.css";

type CategoryOption = { _id: string; title: string };

type Props<TValues extends Record<string, unknown>> = {
  name: keyof TValues & string;
  placeholder?: string;
  options: CategoryOption[];
};

export default function CategorySelect<
  TValues extends Record<string, unknown>
>({ name, placeholder, options }: Props<TValues>) {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<TValues>();

  const value = (values?.[name] ?? "") as string;

  return (
    <Select.Root
      value={value}
      onValueChange={(v) => {
        if (!v) return;
        setFieldValue(name, v);
      }}
      onOpenChange={(open) => {
        if (!open) setFieldTouched(name, true, true);
      }}
    >
      <Select.Trigger
        className={styles.trigger}
        aria-label={placeholder || name}
      >
        <Select.Value
          className={styles.value}
          placeholder={placeholder || "Обрати"}
        />

        <Select.Icon className={styles.icon} aria-hidden>
          {/* down */}
          <svg className={styles.iconDown} width="20" height="20">
            <use href="/icons/sprite.svg#icon-keyboard_arrow_down" />
          </svg>

          {/* up */}
          <svg className={styles.iconUp} width="20" height="20">
            <use href="/icons/sprite.svg#icon-keyboard_arrow_up" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={styles.content}
          position="popper"
          sideOffset={0}
        >
          <Select.Viewport className={styles.viewport}>
            {options.map((opt) => (
              <Select.Item
                key={opt._id}
                value={opt._id}
                className={styles.item}
              >
                <Select.ItemText>{opt.title}</Select.ItemText>
                <Select.ItemIndicator className={styles.check}>
                  ✓
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
