import axios from "axios";

const STATUS_TEXT: Record<number, string> = {
  400: "Перевірте поля форми — здається, десь є некоректні дані.",
  401: "Сесія завершилась. Увійдіть знову, будь ласка.",
  403: "Немає доступу до цієї дії.",
  404: "Не знайшли ресурс. Можливо, його вже видалили.",
  413: "Файл завеликий. Завантажте менше зображення.",
  500: "Упс… щось пішло не так на сервері. Спробуйте ще раз за хвилинку.",
};

export function getErrorMessage(err: unknown): string {
  // не axios-помилка
  if (!axios.isAxiosError(err)) {
    return err instanceof Error
      ? err.message
      : "Сталася помилка. Спробуйте ще раз.";
  }

  // немає response -> мережа / CORS / сервер недоступний
  if (!err.response) {
    return "Немає з’єднання з сервером. Перевірте інтернет і спробуйте ще раз.";
  }

  const { status, data } = err.response as {
    status: number;
    data?: { message?: unknown; error?: unknown };
  };

  const msg = typeof data?.message === "string" ? data.message.trim() : "";
  const errText = typeof data?.error === "string" ? data.error.trim() : "";

  return (
    msg ||
    errText ||
    STATUS_TEXT[status] ||
    "Не вдалося виконати запит. Спробуйте ще раз."
  );
}
