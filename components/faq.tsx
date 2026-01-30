'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  const t = useTranslations('FAQ');
  const tHero = useTranslations('Hero');
  const shouldReduceMotion = useReducedMotion();

  const faqs = [
    {
      id: 'accommodation',
      q: t('questions.accommodation.q'),
      a: t('questions.accommodation.a'),
      number: '01',
    },
    {
      id: 'transport',
      q: t('questions.transport.q'),
      a: t('questions.transport.a'),
      number: '02',
    },
    {
      id: 'children',
      q: t('questions.children.q'),
      a: t('questions.children.a'),
      number: '03',
    },
    {
      id: 'parking',
      q: t('questions.parking.q'),
      a: t('questions.parking.a'),
      number: '04',
    },
  ];

  return (
    <section
      id='faq'
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
        <div className='absolute top-[10%] right-[-5%] w-[40%] aspect-square bg-primary/5 blur-[120px] rounded-full' />
        <div className='absolute bottom-[10%] left-[-5%] w-[35%] aspect-square bg-primary/10 blur-[130px] rounded-full' />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-4xl px-6'>
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

            <div className='flex items-center justify-center mt-4 gap-3 relative'>
              <div className='h-px w-8 bg-primary/20' />
              <div className='h-1 w-1 rounded-full bg-primary/20' />
              <div className='h-px w-8 bg-primary/20' />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className='relative'
        >
          {/* Decorative vertical line */}
          <div className='absolute left-2 md:left-0 top-0 bottom-0 w-px bg-linear-to-b from-primary/0 via-primary/20 to-primary/0' />

          <Accordion
            type='single'
            collapsible
            className='flex flex-col gap-4 md:gap-6 pl-10 md:pl-16'
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className='border-none overflow-hidden group/item'
              >
                <AccordionTrigger className='group/trigger flex items-center gap-4 py-8 text-left hover:no-underline focus-visible:ring-0 after:hidden'>
                  <div className='flex flex-col items-start gap-3 w-full'>
                    <span className='font-serif text-xs tracking-[0.3em] text-primary/60 uppercase'>
                      {faq.number}
                    </span>
                    <span className='font-serif text-2xl md:text-4xl lg:text-5xl text-foreground font-extralight italic leading-tight group-hover/trigger:text-primary/70 transition-colors duration-500'>
                      {faq.q}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='pb-10 pr-6 md:pr-12 text-lg md:text-xl leading-relaxed text-foreground/85 font-light italic'>
                  <div className='flex flex-col gap-8 max-w-2xl'>
                    <p>{faq.a}</p>
                    <div className='flex items-center gap-3 opacity-30 group-hover/item:opacity-60 transition-opacity duration-700'>
                      <div className='h-px w-8 bg-primary' />
                      <span className='font-serif text-[10px] uppercase tracking-[0.4em]'>
                        {tHero('withLove')}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
