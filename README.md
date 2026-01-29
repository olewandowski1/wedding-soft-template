# Event Template

Elegant and functional event website starter built with **Next.js (App Router)**, **Tailwind CSS v4**, and **shadcn/ui**.

This template is meticulously designed for building high-quality websites for milestone events such as:

- 💍 **Weddings** – Shared stories, schedules, and registry links.
- 🎉 **Anniversaries** – Celebratory galleries and event details.
- 🎂 **Birthdays & Galas** – RSVPs and venue information.
- 🤝 **Meetups & Conferences** – Speaker lists and agendas.

## Features

- **Next.js App Router** – Modern routing with server components.
- **Tailwind CSS v4** – Next-gen CSS engine with native variables.
- **shadcn/ui** – Elegant UI components for a polished look.
- **Theming** – Support for light/dark modes, often useful for "mood" based event styles.
- **Mobile First** – Designed to look great on guests' phones.

## Quick start

### Prerequisites

- Node.js (LTS recommended)
- pnpm

### Install & run

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Event Page Setup

### 1) Personalize your Event Sections

The default entry page is `app/(main)/page.tsx`. Customize it with typical event sections:

- **Hero:** Big announcement (e.g., "Save the Date" or names).
- **Our Story:** Timeline or description of the hosts/celebrants.
- **Event Detail:** Date, time, and precise venue locations (Google Maps links).
- **RSVP:** A form or clear instructions for guests to confirm attendance.
- **Schedule:** Day-of-event timeline (Agendas).
- **Registry/Gifts:** Links to preferred stores or donation funds.
- **Photo Gallery:** Memories of the celebrants.

### 2) Configure Event Identity

Edit `config/site.ts` to set global event details:

- `NAME`: Event title (e.g., "Anna & John's Wedding").
- `DESCRIPTION`: A short welcome message or detail for SEO.
- `URL`: The domain where your event site will live.
- `SOCIALS`: Links to social profiles if applicable.

### 3) Visual Assets & OG Images

- Replace `public/og-image.svg` with a beautiful photo or branded graphic for social shares.
- Update `config/site.ts` `OG_IMAGE_URL` if necessary.
- Update `app/icon.tsx` with a custom event icon/logo.

### 4) Theming & Mood

Set `FIXED_THEME` in `config/site.ts` to `'light'` or `'dark'` to lock the vibe, or leave as `null` for system-aware themes.

---

## Project structure

- `app/` – Next.js routes/layouts
  - `app/(main)/page.tsx` – current entry page (renders `ComponentExample`)
  - `app/layout.tsx` – global layout, fonts, metadata, theme provider
- `components/` – app components and examples
  - `components/ui/` – shared UI components (shadcn)
- `config/site.ts` – site name/URL/description/social handles + SEO defaults
- `styles/globals.css` – Tailwind v4 entry + design tokens (light/dark)

## Technical Reference

### Commands

```bash
pnpm dev      # run local dev server
pnpm build    # create production build
pnpm start    # run production server
pnpm lint     # run eslint
pnpm format   # prettier (ts/tsx/mdx)
```

### Adding UI components (shadcn)

This repo is already configured with `components.json`.

```bash
pnpm shadcn add button
```

### Deployment

Deploy as a standard Next.js app.

- Build command: `pnpm build`
- Start command: `pnpm start`

## Notes

- The example page includes an external image URL (Unsplash). Replace it for production usage if needed.
- No environment variables are required by default.
