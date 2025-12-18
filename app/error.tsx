"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Щось пішло не так</h2>
      <p>{error.message}</p>

      <button onClick={() => reset()}>Спробувати ще раз</button>
    </div>
  );
}
