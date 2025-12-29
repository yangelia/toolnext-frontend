"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { uk } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import css from "./BookingToolForm.module.css";
import { createBooking } from "@/lib/api/booking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import MiniLoader from "../MiniLoader/MiniLoader";

import type {
  CreateBookingPayload,
  BookingConflictError,
} from "@/types/booking";

/* ================= PROPS ================= */

type Props = {
  toolId: string;
  pricePerDay: number;
};

/* ================= FORM VALUES ================= */
/**
 * Это ФОРМЕННЫЕ значения (UI),
 * они НЕ обязаны совпадать с API payload
 */
type BookingFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  startDate: Date | null;
  endDate: Date | null;
  deliveryCity: string;
  deliveryBranch: string;
};

/* ================= VALIDATION ================= */

const bookingSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/,
      "Імʼя може містити лише українські або англійські літери"
    )
    .required("Вкажіть імʼя"),

  lastName: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/,
      "Прізвище може містити лише українські або англійські літери"
    )
    .required("Вкажіть прізвище"),

  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Невірний номер телефону")
    .required("Вкажіть номер телефону"),

  startDate: Yup.date().nullable().required("Оберіть дату початку"),

  endDate: Yup.date()
    .nullable()
    .min(Yup.ref("startDate"), "Дата завершення має бути пізніше")
    .required("Оберіть дату завершення"),

  deliveryCity: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/,
      "Назва міста може містити лише українські або англійські літери"
    )
    .required("Вкажіть місто"),

  deliveryBranch: Yup.string().required("Вкажіть відділення"),
});

/* ================= COMPONENT ================= */

export default function BookingToolForm({ toolId, pricePerDay }: Props) {
  const router = useRouter();

  return (
    <>
      <Formik<BookingFormValues>
        validateOnChange
        validateOnBlur
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          startDate: null,
          endDate: null,
          deliveryCity: "",
          deliveryBranch: "",
        }}
        validationSchema={bookingSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("BOOKING SUBMIT START:", values);
          setSubmitting(true);

          const payload: CreateBookingPayload = {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            deliveryCity: values.deliveryCity,
            deliveryBranch: values.deliveryBranch,
            startDate: values.startDate ? values.startDate.toISOString() : "",
            endDate: values.endDate ? values.endDate.toISOString() : "",
          };

          console.log("BOOKING PAYLOAD → API:", payload);
          console.log("BOOKING API CALL → /bookings/" + toolId);

          try {
            await createBooking(toolId, payload);

            console.log("BOOKING API SUCCESS");
            toast.success("Бронювання успішне!");
            console.log("REDIRECT TO /confirm/booking");
            router.push("/confirm/booking");
          } catch (err: unknown) {
            console.error("BOOKING ERROR RAW:", err);

            if (err instanceof AxiosError) {
              console.error("BOOKING ERROR STATUS:", err.response?.status);
              console.error("BOOKING ERROR DATA:", err.response?.data);
            }

            if (err instanceof AxiosError && err.response?.status === 409) {
              const conflict = err.response.data as BookingConflictError;

              if (conflict.freeSlots?.length) {
                const slotsText = conflict.freeSlots
                  .map(
                    (slot) =>
                      `з ${new Date(slot.from).toLocaleDateString(
                        "uk-UA"
                      )} до ${
                        slot.to
                          ? new Date(slot.to).toLocaleDateString("uk-UA")
                          : "без обмежень"
                      }`
                  )
                  .join("\n");

                toast.info(`Інструмент зайнятий! Вільні дати:\n${slotsText}`);
              }
            } else {
              toast.error("Сталася помилка при бронюванні");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, errors, touched, setFieldTouched }) => {
          const days =
            values.startDate && values.endDate
              ? Math.ceil(
                  (values.endDate.getTime() - values.startDate.getTime()) /
                    86400000
                )
              : 0;

          const totalPrice = days * pricePerDay;

          return (
            <>
              <Form className={css.booking_form}>
                <div className={css.input_container}>
                  <label>
                    Імʼя
                    <Field
                      name="firstName"
                      className={`${css.input} ${
                        touched.firstName && errors.firstName
                          ? css.input_error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={css.error}
                    />
                  </label>

                  <label>
                    Прізвище
                    <Field
                      name="lastName"
                      className={`${css.input} ${
                        touched.lastName && errors.lastName
                          ? css.input_error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={css.error}
                    />
                  </label>
                </div>

                <label>
                  Номер телефону
                  <Field
                    name="phone"
                    className={`${css.input} ${
                      touched.phone && errors.phone ? css.input_error : ""
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={css.error}
                  />
                </label>

                <p className={css.label_title}>Виберіть період бронювання</p>

                <ul className={css.input_container}>
                  <li>
                    <Field name="startDate">
                      {({ field, form }: FieldProps) => (
                        <DatePicker
                          className={`${css.input} ${
                            touched.startDate && errors.startDate
                              ? css.input_error
                              : ""
                          }`}
                          locale={uk}
                          placeholderText="Початкова дата"
                          dateFormat="dd.MM.yyyy"
                          selected={field.value}
                          onChange={(date) =>
                            form.setFieldValue("startDate", date)
                          }
                          onBlur={() => setFieldTouched("startDate", true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className={css.error}
                    />
                  </li>

                  <li>
                    <Field name="endDate">
                      {({ field, form }: FieldProps) => (
                        <DatePicker
                          className={`${css.input} ${
                            touched.endDate && errors.endDate
                              ? css.input_error
                              : ""
                          }`}
                          locale={uk}
                          placeholderText="Кінцева дата"
                          dateFormat="dd.MM.yyyy"
                          selected={field.value}
                          minDate={values.startDate ?? undefined}
                          onChange={(date) =>
                            form.setFieldValue("endDate", date)
                          }
                          onBlur={() => setFieldTouched("endDate", true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className={css.error}
                    />
                  </li>
                </ul>

                <div className={css.input_container}>
                  <label>
                    Місто доставки
                    <Field
                      name="deliveryCity"
                      className={`${css.input} ${
                        touched.deliveryCity && errors.deliveryCity
                          ? css.input_error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="deliveryCity"
                      component="div"
                      className={css.error}
                    />
                  </label>

                  <label>
                    Відділення Нової Пошти
                    <Field
                      name="deliveryBranch"
                      className={`${css.input} ${
                        touched.deliveryBranch && errors.deliveryBranch
                          ? css.input_error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="deliveryBranch"
                      component="div"
                      className={css.error}
                    />
                  </label>
                </div>

                <div className={css.container_prise}>
                  {days > 0 && <strong>Ціна: {totalPrice} грн</strong>}

                  <button
                    className={css.btn}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Забронювати
                  </button>
                </div>
              </Form>

              {isSubmitting && <MiniLoader />}
            </>
          );
        }}
      </Formik>

      <ToastContainer />
    </>
  );
}
