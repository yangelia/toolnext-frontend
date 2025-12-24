// app/(public)/tools/new/page.tsx

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AddToolPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    redirect('/auth/login');
  }

  return (
    <div>
      <h1>Публікація інструменту</h1>
      <p>Форма створення інструменту (в розробці)</p>
    </div>
  );
}
