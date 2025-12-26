"use client";

import { useToolDraftStore } from "@/lib/store/toolsStore";
import { ToolDraft } from "@/types/tool";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import styles from "./AddEditToolForm.module.css";

type Props = {
  toolId: string;
  initialValues: ToolDraft;
  submitLabel: string;
  disabled: boolean;
};

export default function ToolFormActions({
  toolId,
  initialValues,
  submitLabel,
  disabled,
}: Props) {
  const router = useRouter();
  const { resetForm } = useFormikContext<ToolDraft>();
  const clearDraft = useToolDraftStore((s) => s.clearDraft);

  const onCancel = () => {
    clearDraft(toolId);
    resetForm({ values: initialValues });
    router.back();
  };

  return (
    <div className={styles.buttons}>
      <button type="submit" className={styles.submitBtn} disabled={disabled}>
        {submitLabel}
      </button>

      <button
        type="button"
        className={styles.cancelBtn}
        onClick={onCancel}
        disabled={disabled}
      >
        Відмінити
      </button>
    </div>
  );
}
