'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

export function RSVP() {
  const t = useTranslations('RSVP');

  const formSchema = React.useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, {
          message: t('form.fullNameError'),
        }),
        email: z.string().email({
          message: t('form.emailError'),
        }),
        plusOne: z.string().optional(),
        attendance: z.enum(['yes', 'no']),
        message: z.string().optional(),
      }),
    [t],
  );

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      plusOne: '',
      attendance: 'yes',
      message: '',
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    setIsSubmitted(true);
  }

  return (
    <section
      id='rsvp'
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
        <div className='absolute top-[-10%] right-[-10%] w-[50%] aspect-square bg-primary/10 blur-[130px] rounded-full' />
      </div>

      {/* Elegant Header */}
      <div className='flex flex-col items-center text-center mb-10 lg:mb-20'>
        <div className='flex flex-col items-center text-center mb-8 lg:mb-12'>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='relative'
          >
            <span className='font-serif text-[13px] uppercase tracking-[1em] text-primary/70 block mb-2'>
              {t('headerSubtitle')}
            </span>
            <h2 className='font-serif text-5xl sm:text-7xl lg:text-8xl text-foreground font-extralight tracking-tighter italic leading-[0.9] pb-2'>
              {t('headerTitle')}
            </h2>

            <div className='flex items-center justify-center mt-4 gap-4 relative'>
              <div className='h-px w-12 bg-linear-to-r from-transparent via-primary/30 to-transparent' />
              <div className='h-1.5 w-1.5 rounded-full border border-primary/30' />
              <div className='h-px w-12 bg-linear-to-r from-transparent via-primary/30 to-transparent' />
            </div>

            <p className='mt-6 text-xl leading-relaxed text-foreground/80 font-serif italic font-light max-w-md mx-auto'>
              {t('deadline')}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className='max-w-2xl mx-auto rounded-[2.5rem] border border-primary/20 bg-white/60 dark:bg-primary/[0.05] backdrop-blur-md p-8 md:p-10 lg:p-14 relative overflow-hidden group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]'
        >
          {/* Decorative Floral Elements */}
          <div className='absolute top-0 left-0 w-28 h-28 opacity-20 pointer-events-none'>
            <svg
              viewBox='0 0 100 100'
              className='w-full h-full text-primary fill-none stroke-current'
              strokeWidth='0.5'
            >
              <path d='M10,10 Q30,10 40,40 T70,50' />
              <circle cx='70' cy='50' r='2' fill='currentColor' />
              <path d='M10,10 Q10,30 40,40 T50,70' />
              <circle cx='50' cy='70' r='2' fill='currentColor' />
            </svg>
          </div>
          <div className='absolute bottom-0 right-0 w-28 h-28 opacity-20 pointer-events-none rotate-180'>
            <svg
              viewBox='0 0 100 100'
              className='w-full h-full text-primary fill-none stroke-current'
              strokeWidth='0.5'
            >
              <path d='M10,10 Q30,10 40,40 T70,50' />
              <circle cx='70' cy='50' r='2' fill='currentColor' />
              <path d='M10,10 Q10,30 40,40 T50,70' />
              <circle cx='50' cy='70' r='2' fill='currentColor' />
            </svg>
          </div>

          {/* Subtle Inner Glow */}
          <div className='absolute inset-0 bg-radial-to-br from-primary/[0.08] via-transparent to-transparent pointer-events-none' />

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className='flex flex-col items-center gap-6 text-center relative z-10'
            >
              <div className='w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 mb-1'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1'
                  className='w-10 h-10'
                >
                  <motion.path
                    d='M20 6L9 17L4 12'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
              </div>
              <div className='flex flex-col gap-4'>
                <h3 className='font-serif text-4xl sm:text-5xl text-foreground font-light italic leading-tight'>
                  {t('success.title')}
                </h3>
                <p className='text-lg sm:text-xl leading-relaxed text-foreground/70 font-serif italic font-light'>
                  {t('success.message1')}
                  <br />
                  {t('success.message2')}
                </p>
              </div>
              <Button
                variant='outline'
                className='mt-2 rounded-full px-12 h-12 border-primary/30 hover:bg-primary/5 transition-all duration-500 font-serif italic tracking-widest text-lg'
                onClick={() => setIsSubmitted(false)}
              >
                {t('success.resetButton')}
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 relative z-10'
            >
              <FieldGroup className='grid gap-x-10 gap-y-8 md:grid-cols-2'>
                <div>
                  <Controller
                    control={form.control}
                    name='fullName'
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className='flex flex-col gap-2'
                      >
                        <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.4em] text-primary/80'>
                          {t('form.fullNameLabel')}
                        </FieldLabel>
                        <Input
                          placeholder={t('form.fullNamePlaceholder')}
                          className='bg-transparent border-0 border-b border-primary/30 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/60 transition-all duration-500 h-auto text-xl font-serif italic placeholder:text-foreground/40'
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className='text-[10px] uppercase tracking-widest font-serif italic'
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    control={form.control}
                    name='email'
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className='flex flex-col gap-2'
                      >
                        <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.4em] text-primary/80'>
                          {t('form.emailLabel')}
                        </FieldLabel>
                        <Input
                          type='email'
                          placeholder={t('form.emailPlaceholder')}
                          className='bg-transparent border-0 border-b border-primary/30 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/60 transition-all duration-500 h-auto text-xl font-serif italic placeholder:text-foreground/40'
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className='text-[10px] uppercase tracking-widest font-serif italic'
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className='md:col-span-2'>
                  <Controller
                    control={form.control}
                    name='attendance'
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className='flex flex-col gap-4'
                      >
                        <FieldLabel className='font-serif text-[11px] uppercase tracking-[0.6em] text-primary/80 text-center'>
                          {t('form.attendanceLabel')}
                        </FieldLabel>
                        <div className='flex flex-wrap justify-center gap-x-12 gap-y-3'>
                          <label className='flex items-center gap-3 cursor-pointer group transition-transform active:scale-95'>
                            <Checkbox
                              checked={field.value === 'yes'}
                              onCheckedChange={(checked) => {
                                if (checked) field.onChange('yes');
                              }}
                              className='w-5 h-5 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                            />
                            <span className='font-serif italic text-xl text-foreground/80 group-hover:text-foreground transition-colors'>
                              {t('form.attendanceYes')}
                            </span>
                          </label>
                          <label className='flex items-center gap-3 cursor-pointer group transition-transform active:scale-95'>
                            <Checkbox
                              checked={field.value === 'no'}
                              onCheckedChange={(checked) => {
                                if (checked) field.onChange('no');
                              }}
                              className='w-5 h-5 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                            />
                            <span className='font-serif italic text-xl text-foreground/80 group-hover:text-foreground transition-colors'>
                              {t('form.attendanceNo')}
                            </span>
                          </label>
                        </div>
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className='text-[10px] uppercase tracking-widest text-center font-serif italic'
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className='md:col-span-2'>
                  <Controller
                    control={form.control}
                    name='plusOne'
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className='flex flex-col gap-2'
                      >
                        <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.4em] text-primary/80'>
                          {t('form.plusOneLabel')}
                        </FieldLabel>
                        <Input
                          placeholder={t('form.plusOnePlaceholder')}
                          className='bg-transparent border-0 border-b border-primary/30 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/60 transition-all duration-500 h-auto text-xl font-serif italic placeholder:text-foreground/40'
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className='text-[10px] uppercase tracking-widest font-serif italic'
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className='md:col-span-2'>
                  <Controller
                    control={form.control}
                    name='message'
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className='flex flex-col gap-2'
                      >
                        <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.4em] text-primary/80'>
                          {t('form.messageLabel')}
                        </FieldLabel>
                        <Textarea
                          placeholder={t('form.messagePlaceholder')}
                          className='bg-transparent border-0 border-b border-primary/30 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/60 transition-all duration-500 h-auto text-xl font-serif italic min-h-[100px] resize-none placeholder:text-foreground/40 leading-relaxed'
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className='text-[10px] uppercase tracking-widest font-serif italic'
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>

              <div className='flex flex-col items-center gap-6 pt-4'>
                <div className='relative group'>
                  <div className='absolute -inset-1 bg-primary/20 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200' />
                  <Button
                    type='submit'
                    size='lg'
                    className='relative rounded-full px-16 h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 font-serif text-xl italic tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]'
                  >
                    {t('form.submitButton')}
                  </Button>
                </div>
                <p className='text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-serif font-medium'>
                  {t('form.privacyNote')}
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
