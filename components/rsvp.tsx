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

      <div className='relative z-10 mx-auto w-full max-w-4xl px-6'>
        {/* Elegant Header */}
        <div className='flex flex-col items-center text-center mb-10 lg:mb-20'>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
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

            <p className='mt-8 text-xl leading-relaxed text-foreground/70 font-serif italic font-light max-w-md'>
              {t('deadline')}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className='max-w-2xl mx-auto rounded-[2.5rem] border border-primary/10 bg-primary/[0.03] backdrop-blur-sm p-8 md:p-12 lg:p-16 relative overflow-hidden group shadow-2xl shadow-primary/5'
        >
          {/* Subtle Inner Glow */}
          <div className='absolute inset-0 bg-linear-to-br from-primary/[0.03] to-transparent pointer-events-none' />

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='flex flex-col items-center gap-8 text-center relative z-10'
            >
              <div className='w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 text-primary'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  className='w-10 h-10'
                >
                  <path
                    d='M20 6L9 17L4 12'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <div className='flex flex-col gap-4'>
                <h3 className='font-serif text-4xl text-foreground font-light italic leading-tight'>
                  {t('success.title')}
                </h3>
                <p className='text-lg leading-relaxed text-foreground/60 font-light italic'>
                  {t('success.message1')}
                  <br />
                  {t('success.message2')}
                </p>
              </div>
              <Button
                variant='outline'
                className='rounded-full px-10 border-primary/20 hover:bg-primary/5 transition-colors font-serif italic tracking-wider'
                onClick={() => setIsSubmitted(false)}
              >
                {t('success.resetButton')}
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-10 relative z-10'
            >
              <FieldGroup className='grid gap-8 md:grid-cols-2'>
                <Controller
                  control={form.control}
                  name='fullName'
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className='flex flex-col gap-3'
                    >
                      <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.3em] text-primary/60'>
                        {t('form.fullNameLabel')}
                      </FieldLabel>
                      <Input
                        placeholder={t('form.fullNamePlaceholder')}
                        className='bg-transparent border-0 border-b border-primary/20 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/40 transition-colors h-auto text-lg font-serif italic'
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-[10px] uppercase tracking-widest'
                        />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name='email'
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className='flex flex-col gap-3'
                    >
                      <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.3em] text-primary/60'>
                        {t('form.emailLabel')}
                      </FieldLabel>
                      <Input
                        type='email'
                        placeholder={t('form.emailPlaceholder')}
                        className='bg-transparent border-0 border-b border-primary/20 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/40 transition-colors h-auto text-lg font-serif italic'
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-[10px] uppercase tracking-widest'
                        />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name='attendance'
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className='flex flex-col gap-3 md:col-span-2'
                    >
                      <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.8em] text-primary/60'>
                        {t('form.attendanceLabel')}
                      </FieldLabel>
                      <div className='flex flex-wrap gap-x-12 gap-y-6 pt-2'>
                        <label className='flex items-center gap-3 cursor-pointer group'>
                          <Checkbox
                            checked={field.value === 'yes'}
                            onCheckedChange={(checked) => {
                              if (checked) field.onChange('yes');
                            }}
                          />
                          <span className='font-serif italic text-lg text-foreground/80 group-hover:text-foreground transition-colors'>
                            {t('form.attendanceYes')}
                          </span>
                        </label>
                        <label className='flex items-center gap-3 cursor-pointer group'>
                          <Checkbox
                            checked={field.value === 'no'}
                            onCheckedChange={(checked) => {
                              if (checked) field.onChange('no');
                            }}
                          />
                          <span className='font-serif italic text-lg text-foreground/80 group-hover:text-foreground transition-colors'>
                            {t('form.attendanceNo')}
                          </span>
                        </label>
                      </div>
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-[10px] uppercase tracking-widest'
                        />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name='plusOne'
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className='flex flex-col gap-3'
                    >
                      <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.3em] text-primary/60'>
                        {t('form.plusOneLabel')}
                      </FieldLabel>
                      <Input
                        placeholder={t('form.plusOnePlaceholder')}
                        className='bg-transparent border-0 border-b border-primary/20 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/40 transition-colors h-auto text-lg font-serif italic'
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-[10px] uppercase tracking-widest'
                        />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name='message'
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className='flex flex-col gap-3 md:col-span-2'
                    >
                      <FieldLabel className='font-serif text-[10px] uppercase tracking-[0.3em] text-primary/60'>
                        {t('form.messageLabel')}
                      </FieldLabel>
                      <Textarea
                        placeholder={t('form.messagePlaceholder')}
                        className='bg-transparent border-0 border-b border-primary/20 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary/40 transition-colors h-auto text-lg font-serif italic min-h-[100px] resize-none'
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-[10px] uppercase tracking-widest'
                        />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <div className='flex flex-col items-center gap-6 pt-6'>
                <Button
                  type='submit'
                  size='lg'
                  className='rounded-full px-12 h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-[background-color,transform,box-shadow] font-serif text-lg italic tracking-widest shadow-xl shadow-primary/10'
                >
                  {t('form.submitButton')}
                </Button>
                <p className='text-[10px] uppercase tracking-[0.2em] text-foreground/30'>
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
