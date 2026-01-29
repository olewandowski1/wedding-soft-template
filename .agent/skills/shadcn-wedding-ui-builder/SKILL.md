---
name: shadcn-wedding-ui-builder
description: Builds production-ready, performance-focused, WCAG 2.1 AA–compliant wedding websites using Next.js, shadcn/ui, Tailwind CSS, TypeScript, and Motion.
---

# Shadcn Wedding Page UI Builder Skill

This skill is a **pure implementation step**.

It builds a **wedding website** strictly according to an approved
**`IMPLEMENTATION-PLAN.md`** file produced by
`shadcn-wedding-component-research`.

Wedding websites are **personal, private, and invitational**.  
This skill does **not** optimize for SEO, marketing, or discoverability.

---

## Invocation Rule (MANDATORY)

- This skill MUST be invoked only after **`shadcn-wedding-component-research`**
- The **only input** to this skill MUST be: `IMPLEMENTATION-PLAN.md`
- `IMPLEMENTATION-PLAN.md` is the **single source of truth**
- If anything is unclear:
  - STOP
  - Report the issue
  - Do NOT guess or infer

---

## Mandatory Pre-Step: Repository Analysis

Before writing any code, the builder MUST:

1. Read the repository template
2. Understand:
   - Folder structure
   - Existing component conventions
   - Styling and theming approach
3. Respect all existing patterns

❗ No new architectural patterns or directories may be introduced.

---

## Assumed Tech Stack

- Next.js (App Router)
- TypeScript
- shadcn/ui
- Tailwind CSS
- Motion (`motion/react` mandated)
- Forms (`react-hook-form` + `zod` mandated for RSVP)

---

## Privacy & Access Implementation (MANDATORY)

- **Access Protection**: If the plan requires **Private (Password & QR Protected)** access, the builder MUST:
  - Implement a `cookies`-based access gate in the root layout or main page.
  - Use a Server Action for password verification.
  - Implement rate limiting (see existing patterns in `app/(main)/page.tsx`).
  - **QR Bypass**: Support auto-unlocking if a valid `accessKey` or `token` is passed as a query parameter. The builder MUST check for this parameter server-side and set the access cookie automatically to avoid the manual password entry.
- **Data Safety**: Never expose RSVP data or internal lists on the client side.

---

## Strict Project Structure Rules

### Custom Components

- ALL custom components MUST live in: `@/components`
- **Prioritize Template Components**: Use and adapt existing components from `@/components/` (Hero, Story, Details, Timeline, InfoSection, FAQ, Gallery, RSVP, AccessGate, Navigation).
- **i18n Implementation**: NEVER hardcode text in components. Use `useTranslations` from `next-intl` and store all strings in `messages/pl.json` and `messages/en.json`.
- No additional component directories may be created.
- **Check existing primitives**: Before creating a new UI component, check `@/components/ui` for existing bespoke primitives (e.g., `field.tsx`, `input-group.tsx`).

### shadcn/ui Components

- MUST live in: `@/components/ui`
- Do NOT modify internals unless explicitly required by the plan.

### Page Assembly

- The main page structure is defined in `app/(main)/page.tsx`.
- Orchestrate sections by importing from `@/components`.
- Handle the `AccessGate` logic with `cookies` and `Server Actions` as shown in the template.

---

## Mandatory Framework APIs

- **ALL images MUST use `next/image`**
- **ALL internal navigation MUST use `next/link`**
- Raw `<img>` tags are NOT allowed
- Raw `<a>` tags are NOT allowed for internal navigation
- **NEVER use `legacyBehavior` on `Link`**
- **Motion Usage**: Always use `motion/react`. Forbid `framer-motion` imports to maintain consistency.

---

## Typography & Font Rules (MANDATORY)

- All font configuration MUST happen in the **root layout**
- Fonts MUST be imported **only** via `next/font`
- Do NOT load fonts in components or pages

### Allowed Fonts

- Use Tailwind font variables only:
  - `font-sans`
  - `font-mono`
- Imported fonts MUST map to these variables

### Prohibited

- Do NOT add additional fonts
- Do NOT create custom font utility classes
- Do NOT use `<link>` font imports
- Do NOT use `@font-face`
- Do NOT override fonts inline

---

## Theme Rules

- Use the **theme strategy** defined in `IMPLEMENTATION-PLAN.md`
- Theme switching:
  - Enabled or disabled strictly per plan
- No system-based or automatic theme switching
- Colors via shadcn CSS variables only
- WCAG 2.1 AA contrast is mandatory

---

## Image Source & Usage Rules (MANDATORY)

### Image Source

- **ALL images are pre-provided** in: `public/images`
- The builder MUST:
  - Inspect available images
  - Use **only** images from this directory

❌ Do NOT:

- Add new images
- Modify image files
- Fetch remote images
- Create additional image directories
- Use placeholders or base64 images

---

### Image Selection Responsibility

The builder MUST decide which images are used as:

- Hero images
- Gallery or story images
- Venue or decorative visuals

Decisions MUST:

- Follow section intent from `IMPLEMENTATION-PLAN.md`
- Avoid redundancy
- Respect privacy and tone
- Prioritize performance and clarity

If image intent is unclear:

- STOP
- Report the issue
- Do NOT guess

---

### Hero Image Rules

- Use **only one** hero image if explicitly defined in the plan
- Must be:
  - Calm and emotionally appropriate
  - High-contrast and readable
  - Lightweight

---

### Image Implementation Rules

- All images MUST use `next/image`
- Must include:
  - Explicit `width` and `height`, or
  - `fill` with stable layout containment
- Meaningful `alt` text is mandatory
- Lazy-load all non-critical images
- Prevent CLS at all times

---

## Navigation Requirements (MANDATORY)

Every wedding website MUST include a navigation element.

The navigation MUST:

- Be sticky
- Reflect section order from `IMPLEMENTATION-PLAN.md`
- Support scroll-based navigation when applicable

### Accessibility & Responsiveness

- Semantic `nav`
- Keyboard accessible
- Visible focus states
- Accessible mobile navigation
- No layout shift

---

## Hero Section Rule (MANDATORY)

- Semantic `section`
- Full viewport height (`min-h-screen`)
- First section inside `<main>`
- Contains the **only H1**
- Visible immediately on load

---

## Performance Is a Feature (MANDATORY)

- Optimize all images
- Avoid heavy media
- Lazy-load non-critical sections
- **Sticky Nav Offset**: All sections MUST include `scroll-margin-top` (via Tailwind `scroll-mt-[offset]`) to account for the sticky navigation height.
- Prevent layout shift
- Framer Motion usage must be subtle and brief

If performance and visuals conflict, performance wins.

---

## Required Static Assets

### Favicon

- Simple, neutral icon
- Aligned with wedding tone
- Static asset only

### Open Graph Image

- Minimal and calm
- Focused on names or event title
- High contrast
- Static asset only

---

## Motion Rules

- Motion only
- No layout-shifting animations
- Respect `prefers-reduced-motion`
- Motion should enhance calmness, not draw attention

---

## Accessibility (MANDATORY)

- WCAG 2.1 AA minimum
- Keyboard navigation everywhere
- Visible focus indicators
- Correct labels and associations
- Semantic HTML throughout

---

## Build & Run Verification (MANDATORY)

The ONLY verification allowed:

1. `npm run build`

Rules:

- Commands MUST succeed
- Fix ONLY issues that prevent build
- Do NOT perform UI or UX validation

---

## Output Expectations

- Production-ready TypeScript code
- Correct folder placement
- Assets referenced correctly
- Explicit confirmation that:
  - `npm run build` succeeds

---

## What NOT to Do

- Do NOT perform UI or UX testing
- Do NOT add tests
- Do NOT redesign sections
- Do NOT introduce new dependencies
- Do NOT reinterpret requirements
- Do NOT skip build or run verification
