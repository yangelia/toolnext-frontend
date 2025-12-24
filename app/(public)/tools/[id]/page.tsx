import ToolGallery from "@/components/ToolGallery/ToolGallery";
import ToolInfoBlock from "@/components/ToolInfoBlock/ToolInfoBlock";
import { ToolDetails } from "@/types/tool";
import styles from "./toolDetails.module.css";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

async function getTool(id: string): Promise<ToolDetails | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools/${id}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ToolDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tool = await getTool(params.id);

  if (!tool) {
    return (
      <div className="container">
        <p>Інструмент не знайдено.</p>
      </div>
    );
  }

  return (
    <section className={`${styles.page} container`}>
      <ToolGallery images={tool.images} />
      <ToolInfoBlock tool={tool} />
    </section>
  );
}
