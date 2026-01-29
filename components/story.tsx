'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

export function Story() {
  const t = useTranslations('Story');
  const tHero = useTranslations('Hero');
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -1]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      id='story'
      className='relative scroll-mt-24 py-24 sm:py-32 lg:py-48 overflow-hidden bg-background'
    >
      {/* Background Ornaments */}
      <div className='absolute inset-0 pointer-events-none z-0'>
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute top-0 right-[-10%] w-[50%] aspect-square bg-primary/20 blur-[120px] rounded-full'
        />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-6xl px-6'>
        {/* Header with Decorative Reveal */}
        <div className='flex flex-col items-center text-center mb-10 lg:mb-20'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
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

        <div className='grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 lg:gap-32 items-center'>
          {/* Stacked Image Composition */}
          <div className='relative flex items-center justify-center lg:justify-start'>
            {/* Decorative SVG Ornament behind stack */}
            <motion.div
              style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 45]) }}
              className='absolute -top-12 -left-12 w-48 h-48 text-primary/5 hidden lg:block'
            >
              <svg
                viewBox='0 0 200 200'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 0 C 120 40, 160 40, 200 40 C 160 60, 160 100, 160 120 C 140 160, 100 160, 80 200 C 60 160, 20 160, 0 160 C 40 140, 40 100, 40 80 C 40 40, 80 40, 100 0 Z'
                  stroke='currentColor'
                  strokeWidth='0.5'
                />
              </svg>
            </motion.div>

            <div className='relative w-full max-w-md aspect-[4/5] sm:max-w-lg group/stack'>
              {/* Extra Back Image */}
              <motion.div
                style={{
                  rotate: shouldReduceMotion ? 2 : rotate2,
                  y: shouldReduceMotion
                    ? 0
                    : useTransform(scrollYProgress, [0, 1], [40, -40]),
                }}
                initial={{ opacity: 0, x: 40, y: 30, rotate: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 2,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='absolute -bottom-10 -right-6 w-[70%] h-[70%] overflow-hidden rounded-sm border border-white/30 shadow-xl z-5 transition-transform duration-1000 group-hover/stack:translate-x-2 group-hover/stack:translate-y-2'
              >
                <Image
                  src='/images/4.jpg'
                  alt={t('imageAlt2')}
                  fill
                  className='object-cover grayscale-[0.2]'
                  sizes='20vw'
                />
              </motion.div>

              {/* Middle Image (Stacked Offset) */}
              <motion.div
                style={{
                  rotate: shouldReduceMotion ? -3 : rotate1,
                  y: shouldReduceMotion ? 0 : yOffset,
                }}
                initial={{ opacity: 0, x: -60, y: 40, rotate: -10 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 1.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='absolute -top-12 -left-12 w-full h-full overflow-hidden rounded-sm border border-white/40 shadow-2xl z-0 transition-transform duration-700 group-hover/stack:-translate-x-4 group-hover/stack:-translate-y-4'
              >
                <Image
                  src='/images/3.jpg'
                  alt={t('imageAlt2')}
                  fill
                  className='object-cover grayscale-[0.3]'
                  sizes='(max-width: 1024px) 100vw, 40vw'
                />
                <div className='absolute inset-0 bg-primary/5 mix-blend-overlay' />
              </motion.div>

              {/* Main Front Image */}
              <motion.div
                style={{ rotate: shouldReduceMotion ? 2 : rotate2 }}
                initial={{ opacity: 0, scale: 0.8, rotate: 5, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 1.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='relative w-full h-full overflow-hidden rounded-sm border border-white/60 shadow-2xl z-10 group'
              >
                <Image
                  src='/images/2.jpg'
                  alt={t('imageAlt1')}
                  fill
                  className='object-cover transition-transform duration-1000 group-hover:scale-105'
                  sizes='(max-width: 1024px) 100vw, 40vw'
                />
                {/* Gloss effect */}
                <div className='absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000' />
              </motion.div>
            </div>
          </div>

          {/* Narrative Content with Staggered Reveal */}
          <div className='flex flex-col gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className='flex flex-col gap-8'
            >
              <div className='relative'>
                {/* Decorative Opening Quote Ornament */}
                <span className='absolute -left-12 -top-12 font-serif text-[12rem] text-primary/5 select-none pointer-events-none'>
                  &ldquo;
                </span>
                <p className='font-serif text-3xl sm:text-4xl lg:text-5xl italic text-foreground leading-[1.1] tracking-tight relative z-10'>
                  &ldquo;{t('quote')}&rdquo;
                </p>
              </div>

              <div className='flex flex-col gap-6 text-lg leading-relaxed text-foreground/70 font-light max-w-md'>
                <p>{t('historyParagraph1')}</p>
                <div className='flex items-center gap-3'>
                  <div className='h-px w-6 bg-primary/30' />
                  <div className='h-1 w-1 rounded-full bg-primary/30' />
                </div>
                <p>{t('historyParagraph2')}</p>
              </div>
            </motion.div>

            {/* Future Section with Subtle Card Feel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className='relative mt-4 p-8 sm:p-10 bg-primary/[0.02] border border-primary/5 rounded-2xl overflow-hidden'
            >
              {/* Corner Ornament */}
              <div className='absolute top-0 right-0 w-24 h-24 text-primary/5 pointer-events-none rotate-45 translate-x-12 -translate-y-12'>
                <svg viewBox='0 0 100 100' fill='currentColor'>
                  <circle cx='50' cy='50' r='50' />
                </svg>
              </div>

              <span className='font-serif text-[10px] uppercase tracking-[0.4em] text-primary/50 mb-4 block'>
                {t('futureTitle')}
              </span>
              <div className='flex font-serif flex-col gap-6 text-lg leading-relaxed text-foreground/80 italic relative z-10'>
                <p>{t('futureParagraph1')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dynamic Floating Petals for Story Section (Matching Hero) */}
      {!shouldReduceMotion && isMounted && (
        <div className='absolute inset-0 pointer-events-none z-1'>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute h-1 w-1 rounded-full bg-primary/10'
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0,
              }}
              animate={{
                y: ['-10%', '110%'],
                x: `${Math.random() * 20 - 10}%`,
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 15,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
