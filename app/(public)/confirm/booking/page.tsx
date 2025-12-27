import Link from "next/link";
import styles from "./BookingConfirmationPage.module.css";

export default function BookingConfirmationPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Інструмент успішно заброньовано</h1>

        <p className={styles.text}>
          Власник інструменту скоро з вами зв’яжеться стосовно деталей та оплати
          вашої броні
        </p>

        <Link href="/" className={styles.button}>
          На головну
        </Link>
      </section>
    </main>
  );
}
