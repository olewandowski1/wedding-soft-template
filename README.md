# Wedding Soft Template

A premium, romantic, and intimate wedding website starter built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, and **shadcn/ui**.

This template is specifically designed for couples who want a **soft, warm, and heartfelt** digital invitation. It prioritizes emotional clarity, accessibility for all generations, and a seamless mobile experience.

## ✨ Key Features

- **🌸 Romantic Aesthetic** – Meticulously crafted design system featuring a soft blush, ivory, and champagne gold palette.
- **🌍 Multilanguage Support** – Full localization support (Polish & English) powered by `next-intl`.
- **🔐 Privacy Gate** – Secure access control for guest-only content via Password and QR-code bypass.
- **⚡ Modern Stack** – Next.js 15+, Tailwind CSS v4 (native CSS variables), and shadcn/ui.
- **📱 Mobile First** – Optimized for guests viewing on their phones during the big day.
- **🎭 Smooth Animations** – Subtle, non-intrusive micro-interactions using Framer Motion for a premium feel.

## 🚀 Quick Start

### Prerequisites

- Node.js (LTS recommended)
- `npm`

### Install & Run

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 🛠️ Configuration & Personalization

### 1. Wedding Identity

Edit [`config/site.ts`](file:///c:/Users/olive/OneDrive/Obrazy/Dokumenty/Playground/wedding-soft-template/config/site.ts) to set your global details:

- `NAME`: Your names (e.g., "Zofia & Jan").
- `DESCRIPTION`: SEO and social share message.
- `FIXED_THEME`: Locked to `'light'` by default to maintain the romantic "soft" vibe.

### 2. Localization

Content is managed via JSON files in the `messages/` directory:

- [`pl.json`](file:///c:/Users/olive/OneDrive/Obrazy/Dokumenty/Playground/wedding-soft-template/messages/pl.json) – Polish translations.
- [`en.json`](file:///c:/Users/olive/OneDrive/Obrazy/Dokumenty/Playground/wedding-soft-template/messages/en.json) – English translations.

### 3. Sections & Workflow

The main entry point is [`app/[locale]/page.tsx`](file:///c:/Users/olive/OneDrive/Obrazy/Dokumenty/Playground/wedding-soft-template/app/[locale]/page.tsx). Customize the following sections:

- **Hero:** The big announcement.
- **Our Story:** Your personal narrative.
- **Details:** Ceremony and reception logistics (Maps, parking).
- **Timeline:** The day-of schedule.
- **RSVP:** Interactive form for guest confirmations.

## 📂 Project Structure

- `app/[locale]/` – Next.js routes with i18n support.
- `components/` – Custom wedding components.
- `components/ui/` – Foundation UI components (shadcn/ui).
- `messages/` – Translation files for PL and EN.
- `lib/` – Utilities, auth logic, and hooks.
- `styles/globals.css` – Tailwind v4 theme and design tokens.

## 📖 Technical Reference

### Commands

```bash
npm run dev      # run local dev server
npm run build    # create production build
npm run start    # run production server
npm run lint     # run eslint check
npm run format   # run prettier formatting
```

### Adding New UI Components

This project is configured with `components.json`.

```bash
npx shadcn@latest add [component-name]
```

## 📝 Notes

- **Theming:** The template is optimized for Light Mode to preserve the soft aesthetic. Dark mode support exists in CSS variables but is disabled by default in `config/site.ts`.
- **Privacy:** Ensure you set up your `AUTH_PASSWORD` in `.env.local` for the access gate to function correctly.
