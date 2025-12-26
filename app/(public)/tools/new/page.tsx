import { getCategoriesServer, getCurrentUserServer } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";
import ToolCreateFormClient from "@/components/ToolForm/ToolCreateFormClient";
import styles from "./ToolNew.module.css";

export const metadata = {
  title: "Створити інструмент",
};

export default async function AddToolPage() {
  const currentUser = await getCurrentUserServer();
  if (!currentUser) redirect("/auth/login");

  const categories = await getCategoriesServer();

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Створення інструменту</h2>
      <ToolCreateFormClient categories={categories} />
    </div>
  );
}
