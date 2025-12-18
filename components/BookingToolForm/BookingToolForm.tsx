"use client";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldProps} from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBooking } from "@/lib/api/clientApi";
import DatePicker from "react-datepicker";
import { uk } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import css from './BookingToolForm.module.css'

type Props = {
    toolId: string,
    pricePerDay: number
};

type FreeSlot = {
  from: string | Date;
  to: string | Date | null;
};

const bookingSchema = Yup.object({
  firstName: Yup.string().required("Вкажіть імʼя"),
  lastName: Yup.string().required("Вкажіть прізвище"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Невірний номер телефону")
    .required("Вкажіть номер телефону"),
  startDate: Yup.date().required("Оберіть дату початку"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "Дата завершення має бути пізніше")
    .required("Оберіть дату завершення"),
  deliveryCity: Yup.string().required("Вкажіть місто"),
  deliveryBranch: Yup.string().required("Вкажіть відділення"),
});

export default function BookingToolForm({ toolId, pricePerDay }: Props) {
  const router = useRouter();
  const [serverWarning, setServerWarning] = useState<string | null>(null);
  const [freeSlots, setFreeSlots] = useState<FreeSlot[]>([]);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phone: "",
        startDate: "",
        endDate: "",
        deliveryCity: "",
        deliveryBranch: "",
      }}
      validationSchema={bookingSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setServerWarning(null);
        setFreeSlots([]);

        const result = await createBooking(toolId, values);
        console.log("booking", result);
        

        // Конфлікт дат
        if (result.status === 409) {
          setServerWarning("Обрані дати зайняті");
          setFreeSlots(result.freeSlots || []);
          setSubmitting(false);
          return;
        }

        router.push("/booking-confirmation");
      }}
    >
      {({ values, isSubmitting }) => {
        const days =
          values.startDate && values.endDate
            ? Math.ceil(
                (new Date(values.endDate).getTime() -
                  new Date(values.startDate).getTime()) /
                  86400000
              )
            : 0;

        const totalPrice = days * pricePerDay;

        return (
        
          <Form className={css.booking_form}>
            <div className={css.input_container}>
              <label>
                Імʼя
                <Field className={css.input} name="firstName" placeholder="Ваше ім'я"/>
                <ErrorMessage name="firstName" component="div" />
              </label>

              <label>
                Прізвище
                <Field className={css.input}  name="lastName" placeholder="Ваше прізвище"/>
                <ErrorMessage name="lastName" component="div" />
              </label>
            </div>

            <label >
              Номер телефону
              <Field className={css.input}  name="phone" placeholder="+38(XXX)XXXXXXX" />
              <ErrorMessage name="phone" component="div" />
            </label>

            <p className={css.label_title}>Виберіть період бронювання</p>
            
            <div className={css.input_container}>
  {/* start date */}
  <label htmlFor="startDate" className={css.label_hidden}>startDate</label>
  <Field name="startDate">
    {({ field, form }: FieldProps) => {
      const { touched, errors } = form;
      return (
        <DatePicker
          id="startDate"
          className={`${css.input} 
            ${touched.startDate && !errors.startDate ? css.input_valid : ""} 
            ${touched.startDate && errors.startDate ? css.input_error : ""}
          `}
          name="startDate"
          locale={uk}
          showPopperArrow={false}
          placeholderText="Початкова дата"
          dateFormat="dd.MM.yyyy"
          popperPlacement="bottom-start"
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => form.setFieldValue("startDate", date)}
        />
      );
    }}
  </Field>
  <ErrorMessage name="startDate" component="div" />

  {/* end date */}
  <label htmlFor="endDate" className={css.label_hidden}>endDate</label>
  <Field name="endDate">
    {({ field, form }: FieldProps) => {
      const { touched, errors } = form;
      return (
        <DatePicker
          id="endDate"
          className={`${css.input} 
            ${touched.endDate && !errors.endDate ? css.input_valid : ""} 
            ${touched.endDate && errors.endDate ? css.input_error : ""}
          `}
          name="endDate"
          locale={uk}
          showPopperArrow={false}
          placeholderText="Кінцева дата"
          dateFormat="dd.MM.yyyy"
          popperPlacement="bottom-start"
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => form.setFieldValue("endDate", date)}
          minDate={form.values.startDate}
        />
      );
    }}
  </Field>
  <ErrorMessage name="endDate" component="div" />
</div>

            <div className={css.input_container}>
              <label>
                Місто доставки
                <Field className={css.input}  name="deliveryCity" />
                <ErrorMessage name="deliveryCity" component="div" />
              </label>

              <label>
                Відділення Нової Пошти
                <Field className={css.input}  name="deliveryBranch" />
                <ErrorMessage name="deliveryBranch" component="div" />
              </label>
            </div>

            {/* Блок ціни */}
            {days > 0 && (
              <div className={css.prise}>
                <strong>
                  Ціна: {totalPrice} грн
                </strong>
              </div>
            )}

            {/* Конфлікт дат */}
            {serverWarning && (
              <div className="warning">
                {serverWarning}
               {freeSlots.length > 0 && (
  <ul>
    {freeSlots.map((slot, i) => (
      <li key={i}>
        з {new Date(slot.from).toLocaleDateString("uk-UA")} до{" "}
        {slot.to
          ? new Date(slot.to).toLocaleDateString("uk-UA")
          : "без обмежень"}
      </li>
    ))}
  </ul>
)}
              </div>
            )}

            <button className={css.btn} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Завантаження..." : "Забронювати"}
            </button>
          </Form>
        );
      }}
          </Formik>
  );
}
