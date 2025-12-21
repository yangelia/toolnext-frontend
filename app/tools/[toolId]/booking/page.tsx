import { notFound } from "next/navigation";
import css from './booking.module.css'
import BookingToolForm from "@/components/BookingToolForm/BookingToolForm";


type PageProps = {
  params: {
    toolId: string;
  };
};

export default async function BookingPage({ params }: PageProps) {
 
  const { toolId } = await params;
  const tool = 1000;
 
  

  if (!toolId) {
    notFound(); // редірект на 404
  }

  return (
    <div className={css.container}>
          <h1 className={css.title}>Підтвердження бронювання</h1>
          <BookingToolForm toolId={toolId} pricePerDay={tool} />
    </div>
  );
}