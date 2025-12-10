"use client";

interface Prop {
  error: Error;
}

export default function Error({ error }: Prop) {
  return <p>Could not fetch note details. {error.message}</p>;
}
