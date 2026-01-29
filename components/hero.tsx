'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from 'motion/react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './language-switcher';

type HeroProps = {
  locked?: boolean;
  cta?: ReactNode;
};

export function Hero({ locked = false, cta }: HeroProps) {
  const t = useTranslations('Hero');
  const [mounted, setMounted] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -40]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 40]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={targetRef}
      id='hero'
      className='relative flex min-h-[100dvh] flex-col items-center justify-start lg:justify-center overflow-hidden bg-background px-6 pt-24 pb-8 lg:pt-40 lg:pb-12'
    >
      {/* Noise Texture Overlay */}
      <div
        className='absolute inset-0 z-1 opacity-[0.03] pointer-events-none'
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      {/* Dynamic Background Elements */}
      <div className='absolute inset-0 pointer-events-none z-0'>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute -top-[10%] -left-[10%] w-[50%] aspect-square bg-primary/5 blur-[120px] rounded-full'
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.04, 0.08, 0.04],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className='absolute top-[30%] -right-[10%] w-[40%] aspect-square bg-primary/5 blur-[100px] rounded-full'
        />
        <motion.div
          animate={{
            opacity: [0.02, 0.05, 0.02],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className='absolute bottom-[10%] left-[20%] w-[25%] aspect-square bg-primary/10 blur-[80px] rounded-full'
        />
      </div>

      {/* Decorative Floating Elements (Petals/Dust) */}
      {!shouldReduceMotion && mounted && (
        <div className='absolute inset-0 pointer-events-none z-1'>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute h-1 w-1 rounded-full bg-primary/10'
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0,
              }}
              animate={{
                y: ['-10%', '110%'],
                x: Math.random() * 20 - 10 + '%',
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      )}

      {/* Side Narrative Accents */}
      <div className='absolute left-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-32 opacity-[0.15] z-10 pointer-events-none'>
        <div className='vertical-text font-serif text-[10px] uppercase tracking-[1em] rotate-180 whitespace-nowrap text-primary'>
          {t('est')}
        </div>
      </div>
      <div className='absolute right-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-32 opacity-[0.15] z-10 pointer-events-none'>
        <div className='vertical-text font-serif text-[10px] uppercase tracking-[1em] whitespace-nowrap text-primary'>
          {t('withLove')}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        animate='visible'
        className='relative z-10 flex w-full max-w-4xl flex-col items-center text-center'
      >
        {/* Header Title Section */}
        <motion.div variants={itemVariants} className='mb-2 relative'>
          {/* Decorative Ornament Above */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.15, y: 0 }}
            transition={{ delay: 1.5, duration: 2 }}
            className='absolute -top-16 left-1/2 -translate-x-1/2 hidden sm:block pointer-events-none'
          >
            <svg
              width='80'
              height='40'
              viewBox='0 0 100 50'
              className='text-primary'
            >
              <path
                d='M10 40 C 30 10, 70 10, 90 40'
                stroke='currentColor'
                strokeWidth='0.5'
                fill='none'
              />
              <circle cx='50' cy='20' r='1.5' fill='currentColor' />
            </svg>
          </motion.div>

          {/* Side Accents for H1 Area */}
          <div className='absolute -left-16 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-10 pointer-events-none'>
            <div className='h-24 w-px bg-linear-to-b from-transparent via-primary to-transparent' />
          </div>
          <div className='absolute -right-16 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-10 pointer-events-none'>
            <div className='h-24 w-px bg-linear-to-b from-transparent via-primary to-transparent' />
          </div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className='absolute -top-8 left-1/2 -translate-x-1/2 font-serif text-[9px] uppercase tracking-[0.8em] text-primary/40 hidden sm:flex items-center gap-4 whitespace-nowrap'
          >
            <span className='h-px w-10 bg-linear-to-r from-transparent to-primary/20' />
            {t('chapter')}
            <span className='h-px w-10 bg-linear-to-l from-transparent to-primary/20' />
          </motion.span>
          <h1 className='font-script text-7xl text-foreground sm:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.95] sm:leading-[0.85] tracking-tight relative z-10'>
            {t('names')}
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='mb-4 flex flex-col items-center gap-4'
        >
          <p className='font-serif text-[14px] uppercase tracking-[0.5em] text-foreground sm:text-base lg:text-lg font-medium'>
            {t('date')}
          </p>
          <div className='flex items-center gap-3 relative'>
            <div className='h-px w-8 bg-primary/20' />
            <div className='h-1 w-1 rounded-full bg-primary/20' />
            <div className='h-px w-8 bg-primary/20' />
          </div>
          <motion.span
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className='font-script text-2xl text-primary/40 -mt-2'
          >
            {t('story')}
          </motion.span>
        </motion.div>

        {/* CTA Button Section - Contained and Premium */}
        <motion.div variants={itemVariants} className='mb-4 sm:mb-8'>
          {cta ? (
            cta
          ) : (
            <Button
              className='group relative h-13 overflow-hidden rounded-full bg-primary px-10 sm:px-16 text-[11px] uppercase tracking-[0.4em] text-primary-foreground transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.2)] active:scale-95 shadow-md'
              onClick={() =>
                document
                  .getElementById('rsvp')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span className='relative z-10'>{t('rsvp')}</span>
              <div className='absolute inset-0 z-0 translate-y-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-y-0' />
            </Button>
          )}
        </motion.div>

        {/* Image Grid Section - 3 Column Layout */}
        <motion.div
          variants={itemVariants}
          className='relative mx-auto grid w-full max-w-6xl gap-3 sm:grid-cols-[1fr_0.8fr_1fr] lg:gap-5'
        >
          {/* Decorative Corner Elements */}
          <div className='absolute -top-20 -left-10 hidden 2xl:block opacity-20 pointer-events-none'>
            <p className='font-serif text-[8rem] uppercase tracking-tighter text-primary/10 select-none'>
              2026
            </p>
          </div>

          {/* Main Large Image (Left) */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : y1 }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, 5, 0],
                    rotate: [0, 0.5, 0],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='relative aspect-4/5 w-full overflow-hidden rounded-sm hover:z-20 transition-all shadow-md group'
          >
            <Image
              src='/images/4.jpg'
              alt={t('heroImageAlt')}
              fill
              priority
              sizes='(max-width: 768px) 100vw, 25vw'
              className='object-cover transition-transform duration-[2s] group-hover:scale-105'
            />
            {/* Gloss Overlay */}
            <div className='absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000' />
          </motion.div>

          {/* Secondary Stacked Images (Middle) */}
          <div className='flex flex-col gap-3 lg:gap-5'>
            <motion.div
              style={{ y: shouldReduceMotion ? 0 : y2 }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      x: [0, -4, 0],
                      scale: [1, 1.01, 1],
                    }
              }
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className='relative aspect-3/2 w-full overflow-hidden rounded-sm shadow-sm group'
            >
              <Image
                src='/images/7.jpg'
                alt='Wedding celebration'
                fill
                sizes='(max-width: 768px) 100vw, 20vw'
                className='object-cover transition-transform duration-[2s] group-hover:scale-110'
              />
              <div className='absolute bottom-2 right-2 opacity-50 pointer-events-none'>
                <svg width='30' height='30' viewBox='0 0 100 100' fill='none'>
                  <path
                    d='M10 10 L 90 90 M 10 90 L 90 10'
                    stroke='currentColor'
                    strokeWidth='0.5'
                    className='text-white/40'
                  />
                </svg>
              </div>
            </motion.div>
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, 6, 0],
                      rotate: [0, -0.5, 0],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className='relative aspect-3/2 w-full overflow-hidden rounded-sm grow shadow-sm group'
            >
              <Image
                src='/images/3.jpg'
                alt='Wedding moments'
                fill
                sizes='(max-width: 768px) 100vw, 20vw'
                className='object-cover transition-transform duration-[2s] group-hover:scale-110'
              />
              <div className='absolute inset-0 border-[0.5px] border-white/10 m-2 rounded-xs' />
            </motion.div>
          </div>

          {/* New Image (Right) */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : y1 }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, -6, 0],
                    rotate: [0, -0.3, 0],
                  }
            }
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className='relative aspect-4/5 w-full hidden sm:block overflow-hidden rounded-sm hover:z-20 transition-all shadow-md group'
          >
            <Image
              src='/images/5.jpg'
              alt='Wedding detail'
              fill
              sizes='(max-width: 768px) 100vw, 25vw'
              className='object-cover transition-transform duration-[2s] group-hover:scale-105'
            />
          </motion.div>

          <div className='absolute -top-1/4 -right-12 hidden 2xl:block opacity-30 mix-blend-multiply pointer-events-none'>
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              width='150'
              height='150'
              viewBox='0 0 100 100'
              fill='none'
            >
              <circle
                cx='50'
                cy='50'
                r='45'
                stroke='currentColor'
                strokeWidth='0.1'
                strokeDasharray='1 4'
                className='text-primary'
              />
              <path
                d='M50 5 L 50 15 M 95 50 L 85 50 M 50 95 L 50 85 M 5 50 L 15 50'
                stroke='currentColor'
                strokeWidth='0.1'
                className='text-primary'
              />
            </motion.svg>
          </div>

          <div className='absolute -bottom-14 -right-14 hidden xl:block opacity-30 mix-blend-multiply pointer-events-none'>
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, delay: 1.2 }}
              width='180'
              height='180'
              viewBox='0 0 100 100'
              fill='none'
            >
              <path
                d='M90 10 C 80 60, 50 90, 10 80'
                stroke='currentColor'
                strokeWidth='0.2'
                className='text-primary/50'
              />
              <path
                d='M70 20 Q 50 50, 20 70'
                stroke='currentColor'
                strokeWidth='0.2'
                className='text-primary/30'
              />
              <path
                d='M90 10 Q 95 30, 80 40'
                stroke='currentColor'
                strokeWidth='0.2'
                className='text-primary/30'
              />
            </motion.svg>
          </div>

          {/* New Bottom Left Accent */}
          <div className='absolute -bottom-10 -left-12 hidden 2xl:block opacity-[0.15] pointer-events-none'>
            <span className='font-script text-[6rem] -rotate-12 text-primary select-none'>
              Forever
            </span>
          </div>

          <div className='absolute -top-10 -right-20 hidden 2xl:block opacity-[0.05] pointer-events-none'>
            <span className='font-script text-[12rem] text-primary/30 select-none'>
              Always
            </span>
          </div>

          <div className='absolute top-1/4 -left-20 hidden 2xl:block opacity-30 mix-blend-multiply pointer-events-none'>
            <motion.svg
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              width='100'
              height='100'
              viewBox='0 0 100 100'
              fill='none'
            >
              <path
                d='M50 10 C 20 40, 80 60, 50 90'
                stroke='currentColor'
                strokeWidth='0.1'
                className='text-primary/40'
              />
              <path
                d='M30 30 Q 70 50, 30 70'
                stroke='currentColor'
                strokeWidth='0.1'
                className='text-primary/20'
              />
            </motion.svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative scroll indicator line (Optional, very subtle) */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 overflow-hidden h-12 w-px'>
        <motion.div
          animate={{ y: [0, 48, 48], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className='w-full h-1/2 bg-linear-to-b from-primary/40 to-transparent'
        />
      </div>
    </section>
  );
}
