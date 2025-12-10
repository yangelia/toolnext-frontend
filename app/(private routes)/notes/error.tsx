"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  console.error("Error caught by error.tsx:", error);

  return (
    <div style={{ padding: 20 }}>
      <h2>Could not fetch notes, pardon</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
