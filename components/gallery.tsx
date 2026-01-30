'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import * as React from 'react';

export function Gallery() {
  const t = useTranslations('Gallery');
  const tHero = useTranslations('Hero');
  const containerRef = React.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const disableParallax = shouldReduceMotion || isMobile;
  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, -60],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, 40],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, -20],
  );

  return (
    <section
      ref={containerRef}
      id='gallery'
      className='relative scroll-mt-24 py-20 sm:py-24 lg:py-32 overflow-hidden bg-background'
    >
      <div className='relative z-10 mx-auto w-full max-w-6xl px-6'>
        {/* Elegant Header */}
        <div className='flex flex-col items-center text-center mb-10 lg:mb-20'>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='relative'
          >
            <span className='font-serif text-[13px] uppercase tracking-[0.8em] text-primary/60 block'>
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

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center'>
          {/* Visual Side - Polaroid Stack */}
          <div className='relative flex items-center justify-center h-[450px] sm:h-[550px]'>
            {/* Background Decorative Frame */}
            <div className='absolute inset-10 border border-primary/15 rounded-[3rem] -rotate-6 pointer-events-none bg-primary/5' />

            <motion.div
              style={{ y: y1, rotate: -12 }}
              className='absolute -translate-x-12 w-56 h-68 sm:w-60 sm:h-72 bg-white p-2.5 pb-10 shadow-2xl z-10 border border-black/5 opacity-40 will-change-transform'
            >
              <div className='relative w-full h-full overflow-hidden bg-muted'>
                <Image
                  src='/images/3.jpg'
                  alt='Memory'
                  fill
                  className='object-cover grayscale-[0.6]'
                  sizes='(max-width: 768px) 50vw, 30vw'
                />
              </div>
            </motion.div>

            <motion.div
              style={{ y: y3, rotate: 8 }}
              className='absolute translate-x-4 translate-y-4 w-60 h-72 sm:w-64 sm:h-80 bg-white p-3 pb-12 shadow-xl z-20 border border-black/5 will-change-transform'
            >
              <div className='relative w-full h-full overflow-hidden bg-muted'>
                <Image
                  src='/images/4.jpg'
                  alt='Memory'
                  fill
                  className='object-cover grayscale-[0.4]'
                  sizes='(max-width: 768px) 50vw, 30vw'
                />
              </div>
              <div className='mt-4 flex justify-center opacity-20'>
                <div className='w-12 h-px bg-black' />
              </div>
            </motion.div>

            <motion.div
              style={{ y: y2, rotate: -4 }}
              className='absolute -translate-x-4 -translate-y-8 w-52 h-64 sm:w-64 sm:h-80 bg-white p-3 pb-12 shadow-2xl z-30 border border-black/5 will-change-transform'
            >
              <div className='relative w-full h-full overflow-hidden bg-muted'>
                <Image
                  src='/images/2.jpg'
                  alt='Memory'
                  fill
                  className='object-cover grayscale-[0.2]'
                  sizes='(max-width: 768px) 50vw, 30vw'
                />
              </div>
              <div className='mt-4 flex justify-center opacity-20'>
                <div className='w-12 h-px bg-black' />
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='flex flex-col items-center lg:items-start text-center lg:text-left gap-10'
          >
            <div className='flex flex-col gap-6'>
              <h3 className='font-serif text-3xl sm:text-4xl text-foreground font-light italic leading-tight'>
                {t('viewGallery')}
              </h3>
              <p className='text-xl leading-relaxed text-foreground/70 font-serif italic font-light max-w-md'>
                {t('description')}
              </p>
            </div>

            <div className='relative w-full lg:w-auto group'>
              {/* Decorative Glow */}
              <div className='absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

              <a
                href='#' // Replace with your Google Doc / Drive link
                target='_blank'
                rel='noopener noreferrer'
                className='relative group flex items-center justify-center px-12 py-4 overflow-hidden rounded-full bg-primary text-primary-foreground transition-[transform,box-shadow,background-color] hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20'
              >
                <div className='absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none' />
                <span className='relative font-serif text-xl italic tracking-widest flex items-center'>
                  {t('viewGallery')}
                </span>
              </a>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='h-px w-20 bg-primary/10' />
              <span className='font-serif text-[8px] uppercase tracking-[0.6em] text-primary/30'>
                {t('headerTitle')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
