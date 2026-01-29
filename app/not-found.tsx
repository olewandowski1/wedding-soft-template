import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Logo />

      <h1>404</h1>

      <h2>{t('title')}</h2>

      <p>{t('description')}</p>

      <Button asChild size='lg'>
        <Link href='/'>{t('backHome')}</Link>
      </Button>
    </div>
  );
}
