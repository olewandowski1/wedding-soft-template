'use client';

import { cn } from '@/lib/utils';
import { MenuIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import * as React from 'react';
import { LanguageSwitcher } from './language-switcher';
import { siteConfig } from '@/config/site';

export function Navigation() {
  const t = useTranslations('Navigation');
  const shouldReduceMotion = useReducedMotion();

  const navRoutes = React.useMemo(
    () => [
      { name: t('home'), href: '#hero' },
      { name: t('story'), href: '#story' },
      { name: t('details'), href: '#details' },
      { name: t('timeline'), href: '#timeline' },
      { name: t('info'), href: '#info' },
      { name: t('faq'), href: '#faq' },
      { name: t('gallery'), href: '#gallery' },
      { name: t('rsvp'), href: '#rsvp' },
    ],
    [t],
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');
  const [scrolled, setScrolled] = React.useState(false);

  const navRef = React.useRef<HTMLElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const isAutoScrollingRef = React.useRef(false);
  const autoScrollTimeoutRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const sectionIds = React.useMemo(
    () => navRoutes.map((r) => r.href.replace('#', '')),
    [navRoutes],
  );

  /* ------------------------------------------------------------------ */
  /* Body scroll lock (mobile menu)                                      */
  /* ------------------------------------------------------------------ */
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /* ------------------------------------------------------------------ */
  /* Scrolled state                                                      */
  /* ------------------------------------------------------------------ */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ------------------------------------------------------------------ */
  /* Smooth scroll                                                       */
  /* ------------------------------------------------------------------ */
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    isAutoScrollingRef.current = true;

    const offset = (navRef.current?.offsetHeight ?? 0) + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });

    setIsOpen(false);
    setActiveSection(id);
    window.history.replaceState(null, '', href);

    autoScrollTimeoutRef.current = setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 700);
  };

  /* ------------------------------------------------------------------ */
  /* Sync hash                                                           */
  /* ------------------------------------------------------------------ */
  React.useEffect(() => {
    if (isAutoScrollingRef.current) return;
    const hash = `#${activeSection}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [activeSection]);

  /* ------------------------------------------------------------------ */
  /* Initial hash                                                        */
  /* ------------------------------------------------------------------ */
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash || !sectionIds.includes(hash)) return;

    setActiveSection(hash);
    const el = document.getElementById(hash);
    if (!el) return;

    setTimeout(() => {
      const offset = (navRef.current?.offsetHeight ?? 0) + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 100);
  }, [sectionIds]);

  /* ------------------------------------------------------------------ */
  /* RAF active section detection                                        */
  /* ------------------------------------------------------------------ */
  React.useEffect(() => {
    const updateActiveSection = () => {
      if (isAutoScrollingRef.current) return;

      const offset = (navRef.current?.offsetHeight ?? 0) + 24;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateActiveSection();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    onScroll();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  /* ================================================================== */
  /* UI                                                                 */
  /* ================================================================== */

  return (
    <>
      <motion.header
        ref={navRef}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 z-50 w-full px-6 transition-[padding] duration-500 pointer-events-none',
          scrolled ? 'py-8' : 'py-10',
        )}
      >
        <div className='relative mx-auto flex max-w-7xl items-center justify-center'>
          <nav
            className={cn(
              'hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5 pointer-events-auto transition-all duration-500',
              scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/60'
                : 'bg-transparent',
            )}
          >
            {navRoutes.map((route) => {
              const isActive = activeSection === route.href.replace('#', '');

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={(e) => scrollToSection(e, route.href)}
                  className={cn(
                    'relative px-6 py-2.5 text-[10px] uppercase tracking-[0.4em] transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary',
                  )}
                >
                  <span className='relative z-10'>{route.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId='active-pill'
                      className='absolute inset-0 rounded-full bg-primary/[0.04]'
                      transition={{
                        type: 'tween',
                        duration: 0.2,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setIsOpen(true)}
            className='absolute right-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden pointer-events-auto'
          >
            <MenuIcon className='h-6 w-6 text-foreground' />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className='fixed inset-0 z-[100] flex flex-col bg-background lg:hidden'
          >
            <div className='flex items-center justify-between px-10 pt-8'>
              <div className='text-xs uppercase tracking-[0.6em] text-primary/70'>
                Menu · 2026
              </div>
              <button onClick={() => setIsOpen(false)}>
                <XIcon className='h-6 w-6 text-foreground' />
              </button>
            </div>

            <div className='absolute top-8 left-1/2 -translate-x-1/2'>
              <LanguageSwitcher />
            </div>

            <nav className='mt-16 px-10'>
              {navRoutes.map((route, i) => {
                const isActive = activeSection === route.href.replace('#', '');

                return (
                  <motion.div
                    key={route.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={route.href}
                      onClick={(e) => scrollToSection(e, route.href)}
                      className={cn(
                        'flex items-center border-b py-5',
                        isActive ? 'text-primary' : 'text-foreground/80',
                      )}
                    >
                      <span className='mr-auto font-serif text-4xl'>
                        {route.name}
                      </span>
                      <span className='opacity-50'>
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className='pointer-events-none absolute -bottom-10 -right-10 rotate-12 opacity-[0.03]'>
              <span className='font-script text-[15rem] text-primary'>
                {siteConfig.NAME}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='fixed bottom-8 right-12 z-40 hidden lg:block'>
        <LanguageSwitcher />
      </div>
    </>
  );
}
