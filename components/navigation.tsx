'use client';

import { cn } from '@/lib/utils';
import { MenuIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import * as React from 'react';
import { LanguageSwitcher } from './language-switcher';

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
  const sectionIds = React.useMemo(
    () => navRoutes.map((route) => route.href.replace('#', '')),
    [navRoutes],
  );
  const isAutoScrollingRef = React.useRef(false);
  const autoScrollTimeoutRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      isAutoScrollingRef.current = true;
      const offset = (navRef.current?.offsetHeight ?? 0) + 16;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsOpen(false);
      setActiveSection(id);
      window.history.replaceState(null, '', href);
      autoScrollTimeoutRef.current = setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 700);
    }
  };

  const updateActiveSection = React.useCallback(() => {
    if (isAutoScrollingRef.current) return;
    const offset = (navRef.current?.offsetHeight ?? 0) + 40;
    let current = sectionIds[0];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const top = element.getBoundingClientRect().top;
      if (top - offset <= 0) {
        current = id;
      }
    });

    setActiveSection(current);
  }, [sectionIds]);

  React.useEffect(() => {
    if (isAutoScrollingRef.current) return;
    const newHash = `#${activeSection}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }, [activeSection]);

  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const offset = (navRef.current?.offsetHeight ?? 0) + 16;
          const top =
            element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 100);
      }
    }
  }, []); // Run only on mount

  React.useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateActiveSection();
        rafId = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [updateActiveSection]);

  return (
    <>
      <motion.header
        ref={navRef}
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: -20, filter: 'blur(10px)' }
        }
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 z-50 w-full px-6 transition-all duration-500 pointer-events-none',
          scrolled ? 'py-6' : 'py-8',
        )}
      >
        <div className='max-w-7xl mx-auto flex items-center justify-center relative'>
          <nav
            className={cn(
              'hidden lg:flex items-center justify-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 pointer-events-auto',
              scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_-4px_rgba(74,66,59,0.12),0_1px_4px_rgba(74,66,59,0.05)] border border-white/60 ring-1 ring-black/[0.05]'
                : 'bg-transparent border-transparent shadow-none ring-0 backdrop-blur-none',
            )}
          >
            <div className='hidden items-center lg:flex'>
              {navRoutes.map((route) => {
                const isActive = activeSection === route.href.replace('#', '');
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={(e) => scrollToSection(e, route.href)}
                    className={cn(
                      'relative px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.4em] transition-all duration-500',
                      isActive
                        ? 'text-primary'
                        : scrolled
                          ? 'text-[#4a423b]/60 hover:text-primary'
                          : 'text-[#4a423b]/40 hover:text-primary',
                    )}
                  >
                    <span className='relative z-10'>{route.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId='activeSection'
                        className='absolute inset-0 rounded-full bg-primary/[0.03] border border-primary/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]'
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        <motion.div
                          layoutId='activeIndicator'
                          className='absolute -bottom-[-2px] left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-primary/40 rounded-full'
                        />
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          <button
            className={cn(
              'flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full transition-all lg:hidden pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2',
              scrolled
                ? 'bg-white backdrop-blur-sm border border-white/40 shadow-[0_4px_16px_rgba(74,66,59,0.08)]'
                : 'bg-transparent border-none shadow-none',
              isOpen && 'opacity-0 scale-90 pointer-events-none',
            )}
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon className='h-6 w-6 text-foreground' />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id='mobile-navigation'
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className='fixed inset-0 flex flex-col items-center justify-center lg:hidden bg-[#fdfcf9] z-[100] pointer-events-auto shadow-2xl overflow-hidden'
              >
                {/* Decorative background logo/watermark */}
                <div className='absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none transform rotate-12'>
                  <span className='font-script text-[30rem] text-primary'>
                    Z&J
                  </span>
                </div>

                {/* Integrated Close Button */}
                <div className='absolute top-8 right-10'>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='h-12 w-12 flex items-center justify-center bg-transparent transition-transform active:scale-90 duration-300'
                  >
                    <XIcon className='h-6 w-6 text-foreground' />
                    <span className='sr-only'>Close Menu</span>
                  </button>
                </div>

                {/* Menu Title */}
                <div className='absolute top-12 left-10 font-serif text-[10px] uppercase tracking-[0.6em] text-primary/40'>
                  Menu . 2026
                </div>

                <nav className='flex flex-col gap-0 w-full px-10'>
                  {navRoutes.map((route, i) => {
                    const isActive =
                      activeSection === route.href.replace('#', '');
                    return (
                      <motion.div
                        key={route.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.2 }}
                      >
                        <Link
                          href={route.href}
                          onClick={(e) => scrollToSection(e, route.href)}
                          className={cn(
                            'group relative flex items-center py-5 border-b border-border/40 transition-all duration-500',
                            isActive ? 'text-primary' : 'text-foreground/80',
                          )}
                        >
                          <span
                            className={cn(
                              'font-serif text-4xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 mr-auto',
                              isActive ? 'italic' : '',
                            )}
                          >
                            {route.name}
                          </span>
                          <span className='font-serif text-[14px] opacity-30 tracking-widest pt-2 tabular-nums'>
                            {(i + 1).toString().padStart(2, '0')}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className='absolute bottom-8 flex flex-col items-center gap-8'>
                  <LanguageSwitcher />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Detached Language Switcher - Floating bottom right */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, scale: 0.9, filter: 'blur(10px)' }
        }
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className='fixed bottom-8 right-12 z-40 hidden lg:block'
      >
        <LanguageSwitcher />
      </motion.div>
    </>
  );
}
