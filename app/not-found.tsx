import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center'>
      {/* Background Glows */}
      <div className='absolute inset-0 pointer-events-none z-0'>
        <div className='absolute -top-[10%] -left-[10%] w-[50%] aspect-square bg-primary/5 blur-[120px] rounded-full opacity-[0.08]' />
        <div className='absolute bottom-[10%] -right-[10%] w-[40%] aspect-square bg-primary/5 blur-[100px] rounded-full opacity-[0.06]' />
      </div>

      {/* Decorative Accents */}
      <div className='absolute left-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-32 opacity-[0.35] z-10 pointer-events-none'>
        <div className='vertical-text font-serif text-[10px] uppercase tracking-[1em] rotate-180 whitespace-nowrap text-primary'>
          404
        </div>
      </div>
      <div className='absolute right-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-32 opacity-[0.35] z-10 pointer-events-none'>
        <div className='vertical-text font-serif text-[10px] uppercase tracking-[1em] whitespace-nowrap text-primary'>
          {t('error')}
        </div>
      </div>

      <div className='relative z-10 flex flex-col items-center max-w-xl'>
        <div className='mb-16 scale-125'>
          <Logo />
        </div>

        <div className='mb-8 flex flex-col items-center relative'>
          <div className='absolute -top-12 left-1/2 -translate-x-1/2 font-serif text-[11px] uppercase tracking-[0.8em] text-primary/70 flex items-center gap-4 whitespace-nowrap'>
            <span className='h-px w-8 bg-linear-to-r from-transparent to-primary/20' />
            {t('label')}
            <span className='h-px w-8 bg-linear-to-l from-transparent to-primary/20' />
          </div>

          <h1 className='font-script text-7xl text-foreground sm:text-8xl leading-none mb-4'>
            404
          </h1>
          <h2 className='font-serif text-2xl sm:text-3xl text-foreground/80 tracking-wide'>
            {t('title')}
          </h2>
        </div>

        <p className='mb-12 text-balance font-serif text-lg leading-relaxed text-muted-foreground max-w-md italic'>
          {t('description')}
        </p>

        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <Button
            asChild
            size='lg'
            className='px-12 rounded-full font-serif tracking-widest uppercase text-xs h-14'
          >
            <Link href='/'>{t('backHome')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
