'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export function Footer() {
  const t = useTranslations('Footer');
  const tHero = useTranslations('Hero');

  return (
    <footer className='relative border-t border-primary/5 bg-background py-16 lg:py-24 overflow-hidden'>
      <div className='relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center'>
        {/* Names & Signature */}
        <div className='flex flex-col items-center gap-4'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='font-script text-4xl lg:text-5xl text-foreground font-light italic tracking-tight'
          >
            {t('names')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className='flex flex-col items-center gap-2'
          >
            <p className='font-serif text-xs uppercase tracking-[0.3em] text-primary/80'>
              {t('date')} <span className='mx-2 opacity-30'>•</span>{' '}
              {t('venue')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className='flex items-center gap-4 pt-2'
          >
            <div className='h-px w-8 bg-primary/20' />
            <p className='font-serif text-[10px] uppercase tracking-[0.6em] text-primary/60'>
              {t('location')}
            </p>
            <div className='h-px w-8 bg-primary/20' />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
