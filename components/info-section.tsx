'use client';

import { Gift, Info, Shirt } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

export function InfoSection() {
  const t = useTranslations('InfoSection');
  const tHero = useTranslations('Hero');

  const infoItems = [
    {
      id: 'dressCode',
      icon: Shirt,
      title: t('dressCode.title'),
      description: t('dressCode.description'),
      label: 'Style',
    },
    {
      id: 'gifts',
      icon: Gift,
      title: t('gifts.title'),
      description: t('gifts.description'),
      label: 'Gift',
    },
    {
      id: 'additional',
      icon: Info,
      title: t('additionalInfo.title'),
      description: t('additionalInfo.description'),
      label: 'Note',
    },
  ];

  return (
    <section
      id='info'
      className='relative scroll-mt-24 py-20 sm:py-24 lg:py-32 overflow-hidden bg-background'
    >
      {/* Static Background */}
      <div className='absolute inset-0 pointer-events-none z-0'>
        <div
          className='absolute inset-0 opacity-[0.02]'
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        />
        <div className='absolute top-[-5%] left-[-5%] w-[45%] aspect-square bg-primary/10 blur-[130px] rounded-full' />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-6xl px-6'>
        {/* Elegant Header */}
        <div className='flex flex-col items-center text-center mb-10 lg:mb-20'>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='relative'
          >
            <span className='font-serif text-[10px] uppercase tracking-[0.8em] text-primary/80 block'>
              {t('headerSubtitle')}
            </span>
            <h2 className='font-serif text-5xl sm:text-7xl lg:text-8xl text-foreground font-extralight tracking-tighter italic'>
              {t('headerTitle')}
            </h2>

            <div className='flex items-center justify-center gap-3 relative'>
              <div className='h-px w-8 bg-primary/20' />
              <div className='h-1 w-1 rounded-full bg-primary/20' />
              <div className='h-px w-8 bg-primary/20' />
            </div>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 items-start'>
          {infoItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className={`relative flex flex-col items-start group ${
                index === 1 ? 'lg:pt-20' : index === 2 ? 'lg:pt-10' : ''
              }`}
            >
              {/* Large Background Identifier */}
              <div className='absolute -left-8 -top-12 font-serif text-[12rem] text-primary/[0.03] select-none pointer-events-none leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000'>
                {item.id.charAt(0).toUpperCase()}
              </div>

              {/* Minimal Line Identifier */}
              <div className='flex items-center gap-4 mb-8 w-full'>
                <div className='h-px flex-1 bg-primary/10' />
                <span className='font-serif text-[10px] uppercase tracking-[0.4em] text-primary/60 whitespace-nowrap'>
                  {item.label}
                </span>
                <div className='h-2 w-2 rounded-full border border-primary/20 shrink-0' />
              </div>

              <div className='flex flex-col gap-6 relative z-10 w-full'>
                <div className='flex items-center gap-6'>
                  <div className='w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/[0.03] border border-primary/5 -rotate-3 group-hover:rotate-0 transition-transform duration-500 shrink-0'>
                    <item.icon
                      size={24}
                      strokeWidth={1.2}
                      className='text-primary/80'
                    />
                  </div>
                  <h3 className='font-serif text-3xl lg:text-4xl text-foreground font-light italic leading-tight'>
                    {item.title}
                  </h3>
                </div>

                <div className='pl-20'>
                  <p className='text-lg leading-relaxed text-foreground/85 font-light italic'>
                    {item.description}
                  </p>

                  <div className='mt-8 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity duration-700'>
                    <div className='h-px w-6 bg-primary' />
                    <span className='font-serif text-[8px] uppercase tracking-[0.2em]'>
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
