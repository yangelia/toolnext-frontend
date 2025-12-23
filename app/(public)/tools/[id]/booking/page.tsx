import { notFound } from "next/navigation";
import css from './booking.module.css'
import BookingToolForm from "@/components/BookingToolForm/BookingToolForm";
import { getToolId } from "@/lib/api/booking";



type PageProps = {
  params: {
    id: string;
  };
};

export default async function BookingPage({ params }: PageProps) {
 
  const { id } = await params;
  const tool = await getToolId(id)
 
  

  if (!id) {
    notFound(); // редірект на 404
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Підтвердження бронювання</h1>
      <BookingToolForm toolId={id} pricePerDay={tool.pricePerDay} />
    </div>
  );
}