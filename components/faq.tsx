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
      {/* Background accents */}
      <div className='absolute right-0 top-0 -z-10 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl lg:h-96 lg:w-96' />
      <div className='absolute bottom-0 left-0 -z-10 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl lg:h-96 lg:w-96' />

      <div className='relative z-10 mx-auto w-full max-w-4xl px-4'>
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className='mb-16 text-center md:mb-24'
        >
          <span className='mb-2 block font-serif text-[13px] uppercase tracking-[0.8em] text-primary/80'>
            {t('headerSubtitle')}
          </span>
          <h2 className='font-serif text-3xl font-light uppercase tracking-[0.2em] text-foreground md:text-7xl'>
            {t('headerTitle')}
          </h2>
          <div className='mt-8 flex justify-center'>
            <div className='h-[1px] w-24 bg-primary/20' />
          </div>
        </motion.div>

        <div className='mx-auto max-w-3xl relative'>
          {/* Decorative vertical line - simplified opacity */}
          <div className='absolute left-[-2rem] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary/10 to-transparent' />

          <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className='border-b border-primary/10'
              >
                <AccordionItem
                  value={faq.id}
                  className='border-none px-0 group/item'
                >
                  <AccordionTrigger className='hover:after:bg-transparent rounded-none border-none py-6 text-left hover:no-underline md:py-8 focus-visible:ring-0 after:hidden'>
                    <div className='flex flex-col items-start gap-3 w-full'>
                      <span className='font-serif text-xs tracking-[0.3em] text-primary/60 uppercase'>
                        {faq.number}
                      </span>
                      <span className='font-serif text-lg md:text-3xl lg:text-4xl text-foreground font-extralight italic leading-tight group-hover/item:text-primary/70 transition-colors duration-300'>
                        {faq.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='pb-8 md:pb-12 text-lg leading-relaxed text-foreground/85 font-light italic'>
                    <div className='max-w-2xl flex flex-col gap-8'>
                      <p>{faq.a}</p>
                      <div className='flex items-center gap-3 opacity-30'>
                        <div className='h-px w-8 bg-primary' />
                        <span className='font-serif text-[10px] uppercase tracking-[0.4em]'>
                          {tHero('withLove')}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
