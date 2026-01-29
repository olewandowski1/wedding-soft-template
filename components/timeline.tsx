'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

export function Timeline() {
  const t = useTranslations('Timeline');
  const tHero = useTranslations('Hero');
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const items = [
    {
      id: 'ceremony',
      time: t('items.ceremony.time'),
      title: t('items.ceremony.title'),
      description: t('items.ceremony.description'),
    },
    {
      id: 'reception',
      time: t('items.reception.time'),
      title: t('items.reception.title'),
      description: t('items.reception.description'),
    },
    {
      id: 'dinner',
      time: t('items.dinner.time'),
      title: t('items.dinner.title'),
      description: t('items.dinner.description'),
    },
    {
      id: 'party',
      time: t('items.party.time'),
      title: t('items.party.title'),
      description: t('items.party.description'),
    },
    {
      id: 'cake',
      time: t('items.cake.time'),
      title: t('items.cake.title'),
      description: t('items.cake.description'),
    },
    {
      id: 'midnight',
      time: t('items.midnight.time'),
      title: t('items.midnight.title'),
      description: t('items.midnight.description'),
    },
  ];

  return (
    <section
      ref={containerRef}
      id='timeline'
      className='relative scroll-mt-24 py-20 sm:py-24 lg:py-32 overflow-hidden bg-background'
    >
      {/* Background Ornaments */}
      <div className='absolute inset-0 pointer-events-none z-0'>
        <div
          className='absolute inset-0 opacity-[0.02]'
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        />
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          }}
          className='absolute top-[20%] right-[-5%] w-[40%] aspect-square bg-primary/5 blur-[120px] rounded-full'
        />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-5xl px-6'>
        {/* Elegant Header */}
        <div className='flex flex-col items-center text-center mb-10 lg:mb-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='relative'
          >
            <span className='font-serif text-[10px] uppercase tracking-[0.8em] text-primary/60 block'>
              {t('headerSubtitle')}
            </span>
            <h2 className='font-serif text-5xl sm:text-7xl lg:text-8xl text-foreground font-extralight tracking-tighter italic'>
              {t('headerTitle')}
            </h2>

            <div className='flex items-center justify-center mt-4 gap-3 relative'>
              <div className='h-px w-8 bg-primary/20' />
              <div className='h-1 w-1 rounded-full bg-primary/20' />
              <div className='h-px w-8 bg-primary/20' />
            </div>
          </motion.div>
        </div>

        {/* Timeline Path */}
        <div className='relative max-w-4xl mx-auto'>
          {/* Vertical Center Line */}
          <div className='absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary/0 via-primary/20 to-primary/0 -translate-x-1/2 hidden md:block' />

          {/* Items */}
          <div className='flex flex-col gap-16 md:gap-24'>
            {items.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                tHero={tHero}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  tHero,
}: {
  item: any;
  index: number;
  tHero: any;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, delay: index * 0.1 }}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center`}
    >
      {/* Time Label (Desktop Left/Right Overlap) */}
      <div
        className={`flex flex-col px-0 md:px-12 ${isEven ? 'md:items-end text-left md:text-right' : 'md:order-2 md:items-start text-left'}`}
      >
        <div className='flex items-center gap-4 text-primary/60 mb-1 lg:mb-2 lg:direction-rtl'>
          <span className='font-serif text-base tracking-widest uppercase'>
            {item.time}
          </span>
        </div>
        <h3 className='font-serif text-3xl lg:text-4xl text-foreground font-light italic leading-tight'>
          {item.title}
        </h3>

        {/* Ornament for Desktop */}
        <div
          className={`hidden md:block w-12 h-px bg-primary/20 mt-4 ${isEven ? 'self-end' : 'self-start'}`}
        />
      </div>

      {/* Center Marker */}
      <div className='absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:w-3 md:h-3 rounded-full border border-primary/30 z-20 flex items-center justify-center shrink-0'>
        <div className='w-1 h-1 rounded-full bg-primary/40' />
      </div>

      {/* Content Box */}
      <div className={`px-0 md:px-12 ${!isEven ? 'md:order-1' : ''}`}>
        <div className='relative p-6 sm:p-8 bg-primary/[0.02] border border-primary/5 rounded-2xl overflow-hidden hover:bg-primary/[0.03] transition-colors group'>
          {/* Background Accent */}
          <div className='absolute -right-4 -bottom-4 font-serif text-8xl text-primary/[0.03] select-none pointer-events-none group-hover:text-primary/[0.05] transition-colors uppercase'>
            {item.id.slice(0, 1)}
          </div>

          <p className='text-lg leading-relaxed text-foreground/70 font-light font-serif italic relative z-10'>
            {item.description}
          </p>

          {/* Script Accent inside box occasionally */}
          {index % 3 === 0 && (
            <div className='absolute top-2 right-4 opacity-10 font-script text-2xl rotate-[-10deg] pointer-events-none'>
              {tHero('withLove')}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
