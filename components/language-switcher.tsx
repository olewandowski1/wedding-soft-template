'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import { motion } from 'motion/react';
import Image from 'next/image';

export function LanguageSwitcher({ scrolled }: { scrolled?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('LanguageSwitcher');

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale || isPending) return;

    startTransition(() => {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
    });
  };

  const languages = [
    { code: 'pl', label: t('pl'), flag: '/flags/pl.svg', short: 'PL' },
    { code: 'en', label: t('en'), flag: '/flags/gb.svg', short: 'EN' },
  ];

  return (
    <div
      className='relative flex items-center p-1 rounded-full bg-[#fdfcf9]/80 backdrop-blur-xl shadow-[0_8px_32px_-4px_rgba(74,66,59,0.08),0_1px_2px_rgba(74,66,59,0.02)] border border-[#f0ede4] w-[76px] h-[40px]'
      role='navigation'
      aria-label={t('label')}
    >
      {/* Sliding Background Indicator */}
      <motion.div
        className='absolute top-1 bottom-1 w-[34px] bg-[#e6ddd3] rounded-full shadow-sm z-0'
        initial={false}
        animate={{
          x: locale === 'pl' ? 0 : 34,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 450, 
          damping: 30,
          mass: 0.8
        }}
      />

      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLocaleChange(lang.code)}
          disabled={isPending}
          className={cn(
            'relative z-10 flex-1 h-full flex items-center justify-center transition-all duration-500 overflow-hidden'
          )}
          title={lang.label}
        >
          <div className='flex items-center justify-center relative'>
            <div className='relative w-[22px] h-[22px] rounded-full overflow-hidden border border-black/5 shadow-sm'>
              <Image 
                src={lang.flag} 
                alt={lang.label} 
                fill 
                className={cn(
                  "object-cover transition-all duration-500",
                  locale === lang.code ? "scale-110 grayscale-0" : "scale-100 grayscale-[0.6] opacity-70"
                )} 
              />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
