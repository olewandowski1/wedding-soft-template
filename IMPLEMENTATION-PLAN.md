# Wedding Website Implementation Plan

## 1. Global Architecture Notes
- Semantic structure: `header`, `main`, `section`, `footer` with a single-page narrative flow.
- Privacy & access:
  - Private (password + QR token) gating is required before any content is visible.
  - QR pass-through tokens must unlock access without manual entry.
  - RSVP data treated as sensitive.
- Theme & vibe:
  - Fixed light theme only.
  - Visual tone must remain romantic, soft, and intimate with classic elegance as a subtle influence.
- i18n strategy:
  - Full parity for PL/EN content using next-intl with existing message files.
- Motion usage:
  - Subtle, optional, and restrained (fade/slide with short durations).
  - No attention-grabbing or large-scale motion.
- Package management: use **npm** for any dependency additions.

## 2. Global Asset Overview
- All images are available in `/public/images` and must be referenced from there.
- If an asset is missing, use a placeholder and explicitly note the need to replace it.
- Estimated total images: **6–10**
- Image types:
  - Photography: **primary** (couple portraits, venue)
  - Decorative: **secondary** (floral textures, soft gradients)
  - Illustration: **optional** (minimal)
- Aspect ratio guidance:
  - Hero: Full-bleed or 16:9
  - Content: 4:5 portrait or 1:1 square (preferred)
- Priority assets (above-the-fold):
  - One hero visual (lightweight, optimized, non-blocking)
- Asset sensitivity:
  - Couple and guest photos are private; avoid public exposure patterns.

## 3. Required shadcn/ui Components (Install If Missing)
Use **npm** with the shadcn CLI to add any missing components.
- `accordion` (FAQ)
- `button` (Navigation, RSVP)
- `card` (Details, Practical Info)
- `input` (RSVP)
- `label` (RSVP)
- `select` (RSVP)
- `textarea` (RSVP)
- `separator` (Section separation)

## 3. Section-by-Section Plan

### Section: Hero Header
**Purpose**
- Provide immediate clarity on who, when, and where.

**Navigation ID (MANDATORY)**
- `hero`

**Chosen Source**
- Existing template hero section component.

**Components / Blocks**
- Hero layout with primary H1, subtitle details, and a soft visual area.

**Layout & Composition**
- Full viewport height (100vh).
- Mixed content: text-first with a soft visual area (not all-image).
- Clear hierarchy: names → date → location → time.
- Mobile-first stack; on desktop, balanced split layout.

**Assets Required**
- 1 hero visual (photo or decorative texture).

**Motion & Interaction**
- Optional subtle text fade-in.

**Accessibility Notes**
- Strong contrast for main text; ensure H1 is the top-level heading.

---

### Section: Our Story
**Purpose**
- Convey a gentle, intimate narrative of the couple.

**Navigation ID (MANDATORY)**
- `story`

**Chosen Source**
- Existing template story section component.

**Components / Blocks**
- Story text block, optional quote, supporting image.

**Layout & Composition**
- Single-column on mobile; text + image on desktop.
- Soft spacing and calm rhythm.

**Assets Required**
- 1–2 photos (couple portrait or candid).

**Motion & Interaction**
- Minimal fade or slide on scroll.

**Accessibility Notes**
- Maintain readable line length and clear paragraph spacing.

---

### Section: Event Details
**Purpose**
- Provide ceremony and reception logistics clearly.

**Navigation ID (MANDATORY)**
- `details`

**Chosen Source**
- Existing template details section component.

**Components / Blocks**
- Two cards or columns: Ceremony and Reception.
- Address, time, and map cues.

**Layout & Composition**
- Card-based layout; stack on mobile.
- Emphasize date/time and venue address.

**Assets Required**
- Optional venue exterior photo (1).

**Motion & Interaction**
- None required.

**Accessibility Notes**
- Ensure addresses are readable and copy-friendly.

---

### Section: Timeline
**Purpose**
- Communicate the day’s flow at a glance.

**Navigation ID (MANDATORY)**
- `timeline`

**Chosen Source**
- Existing template timeline section component.

**Components / Blocks**
- Vertical timeline with time labels and brief descriptions.

**Layout & Composition**
- Single-column for clarity; bullets or markers.

**Assets Required**
- None.

**Motion & Interaction**
- Minimal emphasis on the current/next step if desired.

**Accessibility Notes**
- Time labels must be clear and aligned with descriptions.

---

### Section: Practical Info
**Purpose**
- Provide dress code, gift guidance, and guest tips.

**Navigation ID (MANDATORY)**
- `info`

**Chosen Source**
- Existing template info section component.

**Components / Blocks**
- Informational cards or list blocks.

**Layout & Composition**
- Compact, scannable blocks; no visual overload.

**Assets Required**
- Optional decorative iconography (lightweight).

**Motion & Interaction**
- None required.

**Accessibility Notes**
- Avoid dense text; keep labels clear.

---

### Section: FAQ
**Purpose**
- Answer common guest questions succinctly.

**Navigation ID (MANDATORY)**
- `faq` (Note: not in current navigation; if included, add to navigation in a future step.)

**Chosen Source**
- Existing template FAQ section component.

**Components / Blocks**
- Accordion-style questions and answers.

**Layout & Composition**
- Single-column list; adequate spacing.

**Assets Required**
- None.

**Motion & Interaction**
- Accordion open/close with short, gentle transitions.

**Accessibility Notes**
- Keyboard navigation and proper button semantics.

---

### Section: Gallery
**Purpose**
- Provide a soft visual teaser of the couple and tone.

**Navigation ID (MANDATORY)**
- `gallery`

**Chosen Source**
- Existing template gallery section component.

**Components / Blocks**
- Grid of images with consistent aspect ratios.

**Layout & Composition**
- 2-column on mobile, 3–4 on desktop.

**Assets Required**
- 4–6 photos (lightweight, optimized).

**Motion & Interaction**
- Subtle hover scaling or none.

**Accessibility Notes**
- Alt text required for all images.

---

### Section: RSVP
**Purpose**
- Capture attendance reliably and privately.

**Navigation ID (MANDATORY)**
- `rsvp`

**Chosen Source**
- Existing template RSVP section component.

**Components / Blocks**
- Form fields for name, attendance, plus-one, dietary notes.

**Layout & Composition**
- Single-column form with clear labels and spacing.

**Submission Logic (For RSVP only)**
- Destination: **TBD** (must remain private; no public exposure).
- Validation rules: name required, attendance required, optional dietary notes.

**Assets Required**
- None.

**Motion & Interaction**
- Clear, calm success state after submission.

**Accessibility Notes**
- Proper label association; error messages must be readable.

## 4. Open Questions & Risks
- RSVP destination and storage mechanism is not defined.
- Final wedding date/time and venue should be confirmed.
- Asset availability and licensing for photos.
- FAQ inclusion needs navigation alignment (currently not in navigation IDs).
- Privacy gate behavior and rate limiting strategy need implementation details.
- Any decorative imagery should be validated for contrast and performance.
