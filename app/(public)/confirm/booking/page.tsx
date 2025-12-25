import Link from 'next/link';

export default function BookingConfirmationPage() {
  return (
    <div>
      <h1>Інструмент успішно заброньовано</h1>
      <p>
        Дякуємо за ваше замовлення! Ми зв&apos;яжемося з вами найближчим часом.
      </p>
      <Link href="/">На головну</Link>
    </div>
  );
}
