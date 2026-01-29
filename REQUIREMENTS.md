# Wedding Website Requirements

## 1. Project Context

- Page type: Wedding event website
- Event type: Wedding (ceremony with optional reception)
- Event format: In-person
- Couple names (placeholder): **Zofia & Jan**
- Wedding date(s): **September 12, 2026**
- Ceremony time: **15:30**
- Reception time: **17:30**
- Location(s): **Warsaw, Poland — Pałac Ślubów Warszawa, ul. Miodowa 1, 00-251 Warszawa**
- Target audience:
  - Primary: Invited guests
  - Secondary: International guests
- Primary goal:
  - Communicate wedding details clearly
  - Collect RSVPs safely and reliably

## 2. Website Vibe & Visual Identity

- Primary vibe: **Romantic & Soft**
- Secondary influence (subtle only): **Classic & Elegant**
- Descriptive adjectives: **soft, intimate, warm, serene, timeless**
- First 5‑second emotional impression: **A gentle, personal invitation that feels calm and heartfelt.**

## 3. Color System

- Primary color: **Soft blush / muted rose** to convey warmth and romance
- Secondary/accent: **Dusty mauve or champagne gold** used sparingly for highlights
- Neutrals/backgrounds: **Warm ivory / light beige** with subtle contrast for text legibility
- Contrast considerations:
  - Ensure readable text in daylight and on mobile screens
  - Prioritize clarity for older guests
  - WCAG 2.1 AA contrast baseline for body text

## 4. Typography

- Heading tone: **Elegant, soft, and romantic** (serif or refined display tone)
- Body text: **Highly readable, clean sans or soft serif** for longer informational content
- Emphasis rules:
  - Names: standout typographic emphasis
  - Dates: clear, distinct emphasis
  - Locations: medium emphasis with strong readability
  - Section separation: consistent spacing and subtle typographic hierarchy

## 5. Theme Strategy

- Preferred theme: **Light**
- Theme switching: **Disabled**
- Justification:
  - Emotional clarity and warmth
  - Accessibility and consistent readability
  - Simplicity for a one‑time event

## 6. Page Structure & Narrative Flow

Invitation-driven journey with the following sections, in order:

1. **Hero Header** — announcement, names, date
2. **Our Story** — brief personal narrative
3. **Event Details** — ceremony & reception logistics
4. **Timeline** — schedule of the day
5. **Practical Info** — dress code, gifts, guest tips
6. **FAQ** — common questions
7. **Gallery** — curated images or teaser photos
8. **RSVP** — final action point

Persistent elements (if access allows):

- Language switcher (PL / EN)
- Sticky navigation (scroll-to-section)
- Simple footer

## 7. Hero Section

- First section on the page
- Full viewport height (100vh)
- **Not required to be all-image**; hero may combine soft visuals with clear text content
- Primary H1 includes:
  - Names of the couple
  - Wedding date with year
- Immediate clarity:
  - What the event is
  - When it takes place
  - Where it takes place
- Emotional focus over promotional language
- Avoid heavy or autoplay media

## 8. Content & Data

- **Static content:**
  - Couple story
  - Ceremony and reception details (times, address, parking, maps)
  - Venue information
  - Dress code
  - Gifts or “no gifts” preferences
- **Dynamic content:**
  - RSVP responses
  - Guest-specific inputs (plus-one, dietary needs)
- **Forms:**
  - RSVP is mandatory
  - Friendly but strict validation
  - Clear confirmation after submission
- **Data sensitivity:** High

## 9. Multilanguage Strategy

- Supported languages:
  - Polish (PL)
  - English (EN)
- Full content parity required
- Tone:
  - Culturally appropriate
  - Meaning-equivalent
- Privacy and access rules apply equally to all languages

## 10. Privacy & Access Strategy

- **Recommended privacy variant:** Private (Password & QR Protected)
- **QR bypass:** Dedicated QR token in URL auto-unlocks without manual password entry
- **Rate limiting:** Required for access attempts
- **Note:** Privacy variant must be explicitly confirmed by the couple

## 11. Visibility & Indexing Strategy

- Default assumption: **Not intended for search engine discovery**
- Visibility intent options:
  - Public
  - Private (Protected)
- Indexing: **Disabled by default**; enable only on explicit request
- Content structure optimized for human clarity, not SEO

## 12. Performance & Constraints

- Performance is a first-class feature
- Avoid:
  - Autoplay video
  - Heavy hero media
- Priorities:
  - Fast loading on mobile networks
  - Stable layout with no content shift
- Visual elegance must not compromise reliability

## 13. Responsiveness & Accessibility

- Mobile-first design
- Large touch targets
- Simple navigation paths
- Keyboard navigation support
- WCAG 2.1 AA contrast baseline
- Text scaling without layout breakage
- Readability for older guests

## 14. Assumptions & Open Questions

- Final wedding date and time (with year)
- Ceremony and reception locations (full addresses)
- Selected privacy variant confirmation (public vs private)
- RSVP deadline and rules (plus-one policy, dietary notes)
- Availability of photos/assets for gallery
- Gift or registry preferences (including “no gifts” wording)
- Dress code specifics
