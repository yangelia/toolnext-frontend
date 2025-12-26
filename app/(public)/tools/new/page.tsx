import { getCategoriesServer, getCurrentUserServer } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";
import ToolCreateFormClient from "@/components/ToolForm/ToolCreateFormClient";

export const metadata = {
  title: "Створити інструмент",
};

export default async function ToolNewPage() {
  const currentUser = await getCurrentUserServer();
  if (!currentUser) redirect("/auth/login");

  const categories = await getCategoriesServer();

  return (
    <>
      <h2>Створення інструменту</h2>
      <ToolCreateFormClient categories={categories} />
    </>
  );
}
