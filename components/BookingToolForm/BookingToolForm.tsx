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

type Props = {
  toolId: string;
  pricePerDay: number;
};

type BookingConflictError = {
  status: 409;
  message: string;
  bookedDates: { startDate: string; endDate: string }[];
  freeSlots: { from: string; to: string | null }[];
};

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
  startDate: Yup.date().required("Оберіть дату початку"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "Дата завершення має бути пізніше")
    .required("Оберіть дату завершення"),
  deliveryCity: Yup.string().matches(
    /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/,
    "Назва міста може містити лише українські або англійські літери"
  ).required("Вкажіть місто"),
  deliveryBranch: Yup.string().required("Вкажіть відділення"),
});

export default function BookingToolForm({ toolId, pricePerDay }: Props) {
  const router = useRouter();

  return (
    <>
      <Formik
        validateOnChange={true}
        validateOnBlur={true}
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
          setSubmitting(true);
          try {
            await createBooking(toolId, values);
            toast.success("Бронювання успішне!");
            router.push("/confirm/booking");
          } catch (err: unknown) {
            if (err instanceof AxiosError && err.response?.status === 409) {
              const conflict = err.response.data as BookingConflictError;
              if (conflict.freeSlots?.length) {
                const slotsText = conflict.freeSlots
                  .map(
                    (slot) =>
                      `з ${new Date(
                        slot.from
                      ).toLocaleDateString()} до ${
                        slot.to
                          ? new Date(slot.to).toLocaleDateString("uk-UA")
                          : "без обмежень"
                      }`
                  )
                  .join("\n");
                toast.info(`Інструмент зайнятий! Вільні дати: ${slotsText}`);
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
                  <Field
                    className={`${css.input} ${
                      touched.firstName && errors.firstName
                        ? css.input_error
                        : ""
                    }`}
                    name="firstName"
                    placeholder="Ваше ім'я"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => <div className={css.error}>{msg}</div>}
                  />
                </label>

                <label>
                  Прізвище
                  <Field
                    className={`${css.input} ${
                      touched.lastName && errors.lastName
                        ? css.input_error
                        : ""
                    }`}
                    name="lastName"
                    placeholder="Ваше прізвище"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => <div className={css.error}>{msg}</div>}
                  />
                </label>
              </div>

              <label>
                Номер телефону
                <Field
                  className={`${css.input} ${
                    touched.phone && errors.phone ? css.input_error : ""
                  }`}
                  name="phone"
                  placeholder="+38(XXX)XXXXXXX"
                />
                <ErrorMessage
                  name="phone"
                  render={(msg) => <div className={css.error}>{msg}</div>}
                />
              </label>

              <p className={css.label_title}>Виберіть період бронювання</p>

              <ul className={css.input_container}>
                <li><Field name="startDate">
                  {({ field, form }: FieldProps) => (
                    <DatePicker
                      id="startDate"
                      className={`${css.input} ${
                        touched.startDate && errors.startDate
                          ? css.input_error
                          : ""
                      }`}
                      locale={uk}
                      placeholderText="Початкова дата"
                      dateFormat="dd.MM.yyyy"
                      popperPlacement="bottom-start"
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) =>
                        form.setFieldValue("startDate", date)
                      }
                      onBlur={() => setFieldTouched("startDate", true)}
                    />
                  )}
                  
                </Field>
                <ErrorMessage
                  name="startDate"
                  render={(msg) => <div className={css.error}>{msg}</div>}
                /></li>
                
                <li><Field name="endDate">
                  {({ field, form }: FieldProps) => (
                    <DatePicker
                      id="endDate"
                      className={`${css.input} ${
                        touched.endDate && errors.endDate
                          ? css.input_error
                          : ""
                      }`}
                      locale={uk}
                      placeholderText="Кінцева дата"
                      dateFormat="dd.MM.yyyy"
                      popperPlacement="bottom-start"
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => form.setFieldValue("endDate", date)}
                      minDate={
                        values.startDate ? new Date(values.startDate) : undefined
                      }
                      onBlur={() => setFieldTouched("endDate", true)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="endDate"
                  render={(msg) => <div className={css.error}>{msg}</div>}
                /></li>
                
              </ul>

              <div className={css.input_container}>
                <label>
                  Місто доставки
                  <Field
                    className={`${css.input} ${
                      touched.deliveryCity && errors.deliveryCity
                        ? css.input_error
                        : ""
                    }`}
                    name="deliveryCity"
                  />
                  <ErrorMessage
                    name="deliveryCity"
                    render={(msg) => <div className={css.error}>{msg}</div>}
                  />
                </label>

                <label>
                  Відділення Нової Пошти
                  <Field
                    className={`${css.input} ${
                      touched.deliveryBranch && errors.deliveryBranch
                        ? css.input_error
                        : ""
                    }`}
                    name="deliveryBranch"
                  />
                  <ErrorMessage
                    name="deliveryBranch"
                    render={(msg) => <div className={css.error}>{msg}</div>}
                  />
                </label>
              </div>
              <div className={css.container_prise}>
                {days > 0 && (
                <strong>Ціна: {totalPrice} грн</strong>
              )}

                <button className={css.btn} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Завантаження..." : "Забронювати"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <ToastContainer />
    </>
  );
}
