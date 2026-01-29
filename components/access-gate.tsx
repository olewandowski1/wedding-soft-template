'use client';

import { CircleAlertIcon, LockIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { type UnlockState } from '@/lib/access';

type UnlockAction = (
  prevState: UnlockState,
  formData: FormData,
) => UnlockState | Promise<UnlockState>;

type AccessGateProps = {
  unlockAction: UnlockAction;
};

export function AccessGate({ unlockAction }: AccessGateProps) {
  const t = useTranslations('AccessGate');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(unlockAction, {
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'error') {
      setOpen(true);
    }
    if (state.status === 'success') {
      setOpen(false);
      router.refresh();
    }
  }, [state.status, router]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size='lg'
          className='rounded-full px-12 py-6 font-serif text-lg italic tracking-widest hover:scale-105 transition-transform shadow-xl'
        >
          {t('trigger')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='max-w-md border-none bg-transparent p-0 shadow-none'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className='relative overflow-hidden rounded-[2rem] bg-background/80 backdrop-blur-xl border border-primary/10 p-8 shadow-2xl'
        >
          {/* Decorative Background Accent */}
          <div className='absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl' />
          <div className='absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl' />

          <form action={formAction} className='relative z-10 space-y-8'>
            <div className='flex flex-col items-center text-center gap-4'>
              <div className='relative w-16 h-16 flex items-center justify-center rounded-full border border-primary/10 bg-primary/[0.03] mb-2'>
                <LockIcon className='w-6 h-6 text-primary/40' />
                <div className='absolute inset-1 rounded-full border border-primary/5 animate-pulse' />
              </div>

              <div className='space-y-2'>
                <AlertDialogTitle className='font-serif text-3xl lg:text-4xl font-light italic text-foreground'>
                  {t('title')}
                </AlertDialogTitle>
                <AlertDialogDescription className='font-serif text-foreground/60 leading-relaxed px-4'>
                  {t('description')}
                </AlertDialogDescription>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='access-key'
                  className='font-serif text-[10px] uppercase tracking-[0.3em] text-primary/60 ml-1'
                >
                  {t('passwordLabel')}
                </Label>
                <Input
                  id='access-key'
                  name='accessKey'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='h-12 rounded-xl bg-primary/[0.02] border-primary/10 focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-serif italic text-lg text-center tracking-widest'
                />
              </div>

              <AnimatePresence mode='wait'>
                {state.status === 'error' && state.message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert
                      variant='error'
                      className='bg-destructive/5 border-destructive/10 text-destructive rounded-xl'
                    >
                      <CircleAlertIcon className='w-4 h-4' />
                      <div className='ml-2'>
                        <AlertTitle className='font-serif text-sm font-medium'>
                          {state.message.title}
                        </AlertTitle>
                        <AlertDescription className='text-xs opacity-80'>
                          {state.message.detail}
                        </AlertDescription>
                      </div>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className='text-[10px] text-center text-muted-foreground uppercase tracking-[0.2em] font-serif'>
                {t('passwordInfo')}
              </p>
            </div>

            <AlertDialogFooter className='flex-col sm:flex-col gap-3'>
              <Button
                type='submit'
                disabled={isPending}
                className='w-full h-12 rounded-full font-serif text-lg italic tracking-widest shadow-lg shadow-primary/10 active:scale-[0.98] transition-all'
              >
                {isPending ? t('checking') : t('unlock')}
              </Button>
              <AlertDialogCancel className='w-full border-none shadow-none hover:bg-primary/[0.03] rounded-full h-10 font-serif text-[10px] uppercase tracking-[0.4em] text-primary/40'>
                {t('cancel')}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </form>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
