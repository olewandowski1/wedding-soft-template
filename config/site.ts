export const siteConfig = {
  NAME: 'Zofia & Jan',
  SLUG: 'zofia-jan-wedding',
  FIXED_THEME: 'light' as 'light' | 'dark' | null,

  URL: 'https://wedding-soft-template.vercel.app/',

  DESCRIPTION:
    'Zapraszamy na ślub Zofii i Jana. Znajdziecie tu wszystkie szczegóły uroczystości i formularz RSVP.',
  SHORT_DESCRIPTION: 'Strona Ślubna',
} as const;

export type SiteConfig = typeof siteConfig;
