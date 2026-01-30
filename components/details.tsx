'use client';

import * as React from 'react';
import Image from 'next/image';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

export function Details() {
  const t = useTranslations('Details');
  const tHero = useTranslations('Hero');
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef(null);
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
    disableParallax ? [0, 0] : [0, -50],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, 50],
  );

  const events = [
    {
      id: 'ceremony',
      title: t('ceremony.title'),
      time: t('ceremony.time'),
      location: t('ceremony.location'),
      address: t('ceremony.address'),
      description: t('ceremony.description'),
      image: '/images/8.jpg',
      label: '01',
    },
    {
      id: 'reception',
      title: t('reception.title'),
      time: t('reception.time'),
      location: t('reception.location'),
      address: t('reception.address'),
      description: t('reception.description'),
      image: '/images/3.jpg',
      label: '02',
    },
  ];

  return (
    <section
      ref={containerRef}
      id='details'
      className='relative scroll-mt-24 py-20 sm:py-24 lg:py-32 overflow-hidden bg-background'
    >
      <div className='relative z-10 mx-auto w-full max-w-6xl px-6'>
        {/* Elegant Header */}
        <div className='flex flex-col items-center text-center mb-16 lg:mb-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='relative'
          >
            <span className='font-serif text-[13px] uppercase tracking-[0.8em] text-primary/80 block'>
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

        {/* Events Grid */}
        <div className='flex flex-col gap-20 lg:gap-32'>
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
                index % 2 !== 0 ? 'lg:direction-rtl' : ''
              }`}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.2 }}
                style={{ y: index % 2 === 0 ? y1 : y2 }}
                className={`relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none will-change-transform ${
                  index % 2 !== 0 ? 'lg:order-2' : ''
                }`}
              >
                <div className='absolute inset-0 border border-primary/10 -m-4 lg:-m-8 rounded-sm pointer-events-none' />
                <div className='relative h-full w-full overflow-hidden rounded-sm shadow-2xl group'>
                  <Image
                    src={event.image}
                    alt={event.location}
                    fill
                    className='object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105'
                    sizes='(max-width: 1024px) 100vw, 40vw'
                  />
                  <div className='absolute inset-0 bg-primary/5 mix-blend-overlay' />

                  {/* Floating Number Overlay */}
                  <div className='absolute top-6 left-6 z-20'>
                    <span className='font-serif text-6xl text-white/20 select-none'>
                      {event.label}
                    </span>
                  </div>
                </div>

                {/* Decorative Small Image Accent */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className={`absolute -bottom-12 ${index % 2 === 0 ? '-right-12' : '-left-12'} hidden sm:block w-40 h-40 border border-white/40 shadow-xl overflow-hidden rounded-sm z-20`}
                >
                  <Image
                    src={index % 2 === 0 ? '/images/9.jpg' : '/images/11.jpg'}
                    alt='Accent'
                    fill
                    className='object-cover grayscale-[0.3]'
                  />
                </motion.div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className='flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8'
              >
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-center lg:justify-start gap-2 text-primary/80'>
                    <Clock size={16} strokeWidth={1.5} />
                    <span className='font-serif text-md tracking-widest uppercase'>
                      {event.time}
                    </span>
                  </div>
                  <h3 className='font-serif text-4xl lg:text-6xl text-foreground font-light leading-tight italic'>
                    {event.title}
                  </h3>
                </div>

                <div className='flex flex-col items-center lg:items-start gap-6'>
                  <div className='flex flex-col gap-4 p-8 bg-primary/[0.02] border border-primary/5 rounded-2xl relative overflow-hidden group hover:bg-primary/[0.03] transition-colors w-full'>
                    {/* Decorative background mark */}
                    <div className='absolute -right-4 -bottom-4 font-serif text-9xl text-primary/[0.03] select-none pointer-events-none uppercase'>
                      {event.id.slice(0, 1)}
                    </div>

                    <div className='flex items-start justify-center lg:justify-start gap-4 relative z-10'>
                      <MapPin
                        className='text-primary/60 mt-1 shrink-0'
                        size={20}
                      />
                      <div className='flex flex-col gap-1 text-left'>
                        <span className='font-serif text-lg text-foreground font-medium'>
                          {event.location}
                        </span>
                        <span className='text-sm text-foreground/70 leading-relaxed max-w-xs'>
                          {event.address}
                        </span>
                      </div>
                    </div>

                    <p className='text-lg leading-relaxed text-foreground/85 font-light italic relative z-10'>
                      &ldquo;{event.description}&rdquo;
                    </p>

                    <div className='pt-4 relative z-10 flex justify-center lg:justify-start'>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group/link inline-flex items-center gap-3 text-xs uppercase tracking-widest text-primary/80 hover:text-primary transition-colors'
                      >
                        <span className='border-b border-primary/20 pb-1 group-hover/link:border-primary transition-colors'>
                          {t('getDirections')}
                        </span>
                        <div className='w-8 h-px bg-primary/20 group-hover/link:w-12 transition-[width]' />
                      </a>
                    </div>
                  </div>

                  {/* Date Accent */}
                  <div className='flex items-center'>
                    <div className='font-script text-3xl text-primary/40 pt-2'>
                      {tHero('names')}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
