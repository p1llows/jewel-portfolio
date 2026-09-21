# PRD — Jewel Ramirez Portfolio v2

**Greenfield implementation guide for Codex**

| Item | Detail |
|---|---|
| **Project** | Jewel Ramirez personal developer portfolio |
| **Status** | Starting from scratch (greenfield) |
| **Coding agent** | Codex |
| **Framework** | Next.js + TypeScript |
| **Deployment** | Cloudflare (see [Section 3](#3-core-technology-stack)) |
| **Database** | Supabase |
| **Rendering** | Three.js / WebGL |
| **Animation** | GSAP + selective Motion |
| **Styling** | Tailwind CSS |

> **How to use this document**
> Give Codex sections 1–44 as the PRD, then give it the instruction in [Section 45](#45-instruction-to-give-codex-after-the-prd) **after** the PRD. Codex begins with **Phase 1 only** ([Section 43](#43-implementation-phases)).
>
> **Build order:** Foundation → static homepage → binary portrait → animations → real content → Supabase visitor counter → polish.

---

## Contents

| Part | Sections |
|---|---|
| [1 · Overview & Setup](#part-1--overview--setup) | 1 Mission · 2 Start fresh · 3 Tech stack · 4 Architecture |
| [2 · Design System](#part-2--design-system) | 5 Visual identity · 6 Colors · 7 Typography |
| [3 · Layout & Navigation](#part-3--layout--navigation) | 8 Desktop · 9 Mobile · 10 Homepage structure |
| [4 · Hero & Binary Portrait](#part-4--hero--binary-portrait) | 11 Hero · 12–22 Portrait pipeline, WebGL, physics, mobile, reduced motion |
| [5 · Theme Switching](#part-5--theme-switching) | 23 Light/dark wave |
| [6 · Content Sections](#part-6--content-sections) | 24 Work · 25 Cards · 26 Case studies · 27 Experience · 28 About · 29 Stack · 30 GitHub |
| [7 · Features & Backend](#part-7--features--backend) | 31–33 Visitor counter · 34 Command palette |
| [8 · Animation & Performance](#part-8--animation--performance) | 35 Animation stack · 36 Performance |
| [9 · Quality](#part-9--quality) | 37 Responsive · 38 Accessibility · 39 SEO · 40 Data structure |
| [10 · Principles & Guardrails](#part-10--principles--guardrails) | 41 Design principles · 42 Never-do list |
| [11 · Delivery](#part-11--delivery) | 43 Phases · 44 Definition of done · 45 Instruction for Codex |

---

# Part 1 · Overview & Setup

## 1. Mission

Create a completely new personal portfolio for **Jewel Ramirez**. Do **not** modify, migrate, or reuse the existing portfolio implementation. This is a **greenfield project**.

The goal is a polished, modern developer portfolio that feels like a sophisticated software product rather than a traditional resume website.

> **The message the site must communicate**
> Jewel Ramirez is a full-stack developer who builds real software, modern interfaces, APIs, integrations, and interactive digital experiences.

The defining visual feature is an **interactive binary particle portrait**.

## 2. Start Completely Fresh

Create a new project from scratch.

**Do not:**

- Inspect the old portfolio's implementation
- Copy components from the old portfolio
- Copy its CSS, layout, or dependencies
- Assume anything about its architecture

The old portfolio may be used only as a reference for **existing personal content** if needed. If personal or project information is not available, create **clearly marked placeholders** rather than inventing information.

## 3. Core Technology Stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| 3D / WebGL | Three.js |
| Animation | GSAP, Motion |
| Backend / database | Supabase |
| Icons | Lucide Icons |
| Tooling | ESLint |
| Hosting | Cloudflare (Pages / Workers) |

- Use the latest stable versions compatible with the project environment.
- Do not add unnecessary libraries.

### Deployment target: Cloudflare

The site will be deployed on **Cloudflare**, not Vercel. Codex must make sensible decisions and document them:

- **Adapter:** Next.js server features (such as the `/api/visits` route) need a Cloudflare adapter. Before choosing, check Cloudflare's current Next.js deployment guide, then record the chosen approach and the reason in the README.
- **Keep it simple:** Prefer static rendering for every page. Only `/api/visits` should need server code.
- **Secrets:** Store Supabase keys as Cloudflare environment variables/secrets. Never expose the service key to the client.
- **Images:** Do not depend on the Vercel image optimizer. Pre-optimize images or use a supported Cloudflare approach.
- **No Vercel-only features:** No Vercel Analytics, Vercel KV, or similar services.
- **Verify:** Run a Cloudflare-compatible production build and a local preview before calling Phase 1 done.

## 4. Project Architecture

Start with a clean structure. Codex may adjust it if it has a strong technical reason. Do not over-engineer.

```text
jewel-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── experience/page.tsx
│   ├── about/page.tsx
│   ├── stack/page.tsx
│   ├── contact/page.tsx
│   └── api/visits/route.ts
├── components/
│   ├── layout/   navigation/   hero/
│   ├── work/     experience/   about/
│   ├── stack/    github/       contact/
│   └── effects/  ui/
├── data/
│   ├── projects.ts   experience.ts
│   └── stack.ts      navigation.ts
├── lib/
│   ├── supabase.ts   utils.ts
├── public/images/portrait-source.jpg
├── types/
└── .env.local · package.json · tsconfig.json
```

---

# Part 2 · Design System

## 5. Visual Identity

| The design must be | It must NOT feel |
|---|---|
| Modern | Editorial |
| Technical | Newspaper-like |
| Minimal | Cyberpunk |
| Warm | Gaming-oriented |
| Monochrome | Excessively futuristic |
| Interactive | Generic SaaS |
| Professional | Template-like |
| Personal | |

## 6. Color System

The original reference image is used **only for color inspiration**. Create centralized design tokens; do not scatter hard-coded colors through components.

| Token | Light | Dark |
|---|---|---|
| **Background** | `#F4F4F2` | `#111111` |
| **Surface** | `#EBEBE8` | `#191919` |
| **Foreground** | `#171717` | `#F1F1ED` |
| **Secondary** | `#555555` | `#A6A6A0` |
| **Muted** | `#888888` | `#70706C` |
| **Border** | `#D2D2CE` | `#30302D` |

## 7. Typography

| Role | Typeface |
|---|---|
| Primary | Geist |
| Fallback | Space Grotesk |
| Technical | JetBrains Mono |

Use the technical font **sparingly**, for metadata such as:

```text
01 / HOME
2026
STATUS: AVAILABLE
12,847 VISITS
NEXT.JS
```

Do not use serif or editorial typography.

---

# Part 3 · Layout & Navigation

## 8. Desktop Layout

Fixed left sidebar, approximately **240px** wide. Main content fills the remaining viewport. Keep the sidebar minimal.

```text
JEWEL
RAMIREZ

01  HOME
02  WORK
03  EXPERIENCE
04  ABOUT
05  STACK
06  CONTACT

────────────────

● AVAILABLE

◐ LIGHT / DARK

VISITS
12,847

© 2026
```

## 9. Mobile Layout

```text
JEWEL.RAMIREZ                       MENU
```

Use an animated menu drawer/overlay. Requirements:

- Keyboard accessible
- Escape closes it
- Proper focus management
- ARIA labels
- No horizontal scrolling

## 10. Homepage Structure

| # | Section | Note |
|---|---|---|
| 01 | HOME | |
| 02 | WORK | |
| 03 | EXPERIENCE | |
| 04 | ABOUT | |
| 05 | STACK | |
| 06 | GITHUB | Can be visually integrated rather than a numbered nav item |
| 07 | CONTACT | |

---

# Part 4 · Hero & Binary Portrait

> ⭐ **Highest-priority feature**
> The binary particle portrait is the signature feature. This part gets the most technical attention.

## 11. Hero

The hero is the primary visual experience and must immediately establish identity and profession.

```text
01 / HOME

HELLO, I'M

JEWEL
RAMIREZ

FULL-STACK DEVELOPER

I build modern web applications,
APIs, integrations, and digital
experiences.

[ VIEW WORK ]   [ CONTACT ]

                       BINARY PORTRAIT
```

## 12. Binary Portrait

Use the uploaded portrait as the source image. Copy it to:

```text
public/images/portrait-source.jpg
```

The final website must **not** reference a temporary uploaded-file path.

## 13. Portrait Transformation Pipeline

```text
Portrait
   ↓  Image preprocessing
   ↓  Grayscale / luminance
   ↓  Pixel sampling
   ↓  Particle target positions
   ↓  0 / 1 assignment
   ↓  Three.js WebGL renderer
```

The resulting image should clearly resemble the original portrait.

## 14. Portrait Composition

Do not render the original rectangular image. Extract the subject visually.

**Emphasize:** hair, face, neck, tie, suit, shoulders.

- The white background should disappear.
- The outer edges should gradually dissolve into particles.

> **Target feeling:** A digital portrait constructed from binary data.

## 15. Binary Characters

Particles are visually the characters **0** and **1**, in a monospaced technical typeface. Viewers should discover the binary as they look closer.

| Viewing distance | What the viewer sees |
|---|---|
| Normal | A portrait |
| Close range | Individual 0 / 1 characters (`0 1 0 1 1 0 1 …`) |

## 16. WebGL Implementation

Use **Three.js / WebGL** with GPU-based rendering. Possible approaches: `THREE.Points`, `ShaderMaterial`, instanced rendering. Choose whichever gives the best visual quality and performance.

> 🚫 **Do NOT**
> - Render thousands of `<span>0</span>` / `<span>1</span>` DOM elements.
> - Keep the particle system primarily outside React's render cycle.

## 17. Particle State

Each particle conceptually maintains:

- **Current position**
- **Target position** (its original portrait position)
- **Velocity**

## 18. Mouse Interaction

```text
Cursor
  ↓
Repulsion field
  ↓
Particles move away
```

The interaction should be smooth, localized, responsive, physical, and subtle. Do not create explosive particle behavior.

## 19. Spring Return

After the cursor leaves, particles return to their targets using spring-like physics:

```text
target → spring → particle → velocity → damping
```

The portrait should naturally reform.

## 20. Idle Animation

With no interaction, movement should be **almost imperceptible**: tiny particle drift, gentle floating, or very subtle noise. Do not make the portrait constantly shake.

## 21. Mobile Particle Behavior

Touch devices should not simply pretend to have a mouse. Possible behavior:

- Touch repulsion / finger interaction
- Reduced particle count
- Gentle idle animation

If performance is poor, gracefully simplify the effect. Portfolio content must always remain usable.

## 22. Reduced Motion

Respect `prefers-reduced-motion`. When enabled:

- Disable particle physics or greatly reduce them
- Disable aggressive scroll animations
- Disable the theme wave animation
- Keep the UI functional

---

# Part 5 · Theme Switching

## 23. Light / Dark Mode

Theme control label: **◐ LIGHT / DARK**. The transition uses a wave/reveal effect: the new theme expands outward from the theme-control area.

Possible implementations: View Transitions API, CSS clip-path, or GSAP. **Use the simplest reliable implementation.**

---

# Part 6 · Content Sections

> ⭐ **Authenticity rule**
> Use only real information. Where details are missing, use clearly marked placeholders. Never invent dates, responsibilities, outcomes, or statistics.

## 24. Work Section

```text
02 / WORK

SELECTED PROJECTS
```

| Initial candidate | Description |
|---|---|
| **Resolve** | Ticketing / collaboration platform |
| **Telegram Helpdesk** | Telegram-to-Resolve integration |
| **Portfolio** | This portfolio |

Do not fabricate project details. Use clearly marked placeholders if information is unavailable.

## 25. Project Card

```text
01

RESOLVE

Ticketing & Collaboration Platform

Laravel · Filament · PHP · MariaDB · Redis

[ PROJECT PREVIEW ]

VIEW CASE STUDY →
```

**Hover effects (keep subtle):** image movement, arrow movement, border transition, metadata emphasis.

## 26. Case Studies

Route: `/work/[slug]`. Must be based on real information. Structure:

| Section | Section |
|---|---|
| Overview | Features |
| Problem | Implementation |
| Role | Challenges |
| Architecture | Screenshots |
| Technology | Outcome |

## 27. Experience

Homepage version:

```text
03 / EXPERIENCE

2026 — PRESENT
NMS CREATIVE
Developer

Short description.
Laravel · PHP · Next.js · Docker

────────────────

PREVIOUS EXPERIENCE
...
FULL HISTORY →
```

Do not invent dates or responsibilities.

## 28. About

```text
04 / ABOUT

I'M JEWEL RAMIREZ.

Developer focused on building
useful software, clean interfaces,
and reliable systems.

I enjoy working across the stack —
from frontend experiences to APIs,
databases, integrations, and
infrastructure.
```

Keep this section concise.

## 29. Stack

| Category | Technologies |
|---|---|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS |
| **Backend** | Laravel, PHP, Node.js |
| **Database** | MariaDB, PostgreSQL, Redis |
| **Tools** | Git, Docker, Linux, GitHub |

- Only list technologies that are actually used or known.
- Do not create percentage bars.

## 30. GitHub

GitHub identity: **p1llows**

```text
GITHUB

CODE / EXPERIMENTS / OPEN SOURCE

[ CONTRIBUTION GRAPH ]

VIEW GITHUB →
```

Do not fabricate statistics.

---

# Part 7 · Features & Backend

## 31. Visitor Counter

Implement a **real** visitor counter shown in the sidebar (`VISITS / 12,847`). The number must come from the backend.

```text
Next.js API
     ↓
Supabase
     ↓
visit count
```

## 32. Visitor Database

Suggested table: `portfolio_stats`. Create only the minimum required structure.

| Field | Purpose |
|---|---|
| `id` | Row identifier |
| `visits` | Total visit count |
| `updated_at` | Last update time |

## 33. Visitor Counting Logic

Do not increment on every React render. Use a visitor/session mechanism:

```text
New session
    ↓
Check visit marker
    ↓
No marker → increment
    ↓
Store marker
```

- This prevents refreshes from inflating the number.
- Use server-side logic where appropriate.
- Protect the endpoint from trivial abuse.
- The endpoint runs on Cloudflare: keep Supabase secrets in Cloudflare environment variables, server-side only.

## 34. Command Palette

Shortcut: **Cmd + K** / **Ctrl + K**. Must be keyboard accessible.

| Navigation | Actions |
|---|---|
| Home | Toggle Theme |
| Work | Open GitHub |
| Experience | |
| About | |
| Stack | |
| Contact | |

---

# Part 8 · Animation & Performance

## 35. Animation Stack

| Library | Use for |
|---|---|
| **Three.js** | Binary portrait, particle system, WebGL only |
| **GSAP** | Hero entrance, scroll reveals, theme transition, experience timeline, page transitions |
| **Motion** | Buttons, small interactions, navigation, hover states |

Avoid unnecessary overlap between animation libraries.

## 36. Performance

> **Priority:** Performance is more important than particle count.

- GPU particle rendering; no thousands of DOM nodes
- No React state updates every frame
- Proper animation cleanup and Three.js disposal
- Responsive canvas; device-aware particle count
- Lazy-load heavy effects where appropriate
- Avoid unnecessary JavaScript; optimize images
- Avoid memory leaks

---

# Part 9 · Quality

## 37. Responsive Design

Design separately for **desktop, laptop, tablet, and mobile**. Do not simply scale desktop down. The hero should be intentionally redesigned for mobile:

```text
JEWEL RAMIREZ

FULL-STACK
DEVELOPER

[ portrait ]

[ VIEW WORK ]
[ CONTACT ]
```

## 38. Accessibility

- Semantic HTML
- Keyboard navigation and focus states
- ARIA labels
- Accessible theme control and mobile menu
- Reduced motion support
- Good contrast
- Keyboard-accessible command palette
- Textual content usable without the WebGL effect

## 39. SEO

Implement: metadata, OpenGraph, Twitter/X metadata, favicon, robots, sitemap.

Title: **Jewel Ramirez — Full-Stack Developer**. Use accurate descriptions.

## 40. Data Structure

Store content separately so the portfolio is easy to update:

```text
data/
├── projects.ts
├── experience.ts
├── stack.ts
└── navigation.ts
```

---

# Part 10 · Principles & Guardrails

## 41. Design Principles

Codex should continuously evaluate the UI against these principles.

| Principle | Meaning |
|---|---|
| **1. Hierarchy** | Important information is immediately visible. |
| **2. Restraint** | Not every element needs animation. |
| **3. Contrast** | Use the monochrome palette intentionally. |
| **4. Whitespace** | Do not fill space unnecessarily. |
| **5. Technical personality** | Metadata and interactions feel like a developer-built product. |
| **6. Performance** | The visual experience must never destroy usability. |
| **7. Authenticity** | Only use real information. |

## 42. Things Codex Must Never Do

- Copy another developer's portfolio (including Bryl Lim's layout)
- Create a newspaper layout or use editorial typography
- Use excessive gradients or excessive glassmorphism
- Add random 3D objects
- Add fake statistics, testimonials, project outcomes, or skill percentages
- Render thousands of DOM particles
- Put all code in one giant component
- Add unnecessary dependencies
- Over-engineer the database
- Make the site dependent on JavaScript for basic navigation
- Sacrifice accessibility for animation
- Sacrifice mobile usability for visual effects
- Use Vercel-specific services (Analytics, KV, image optimizer)

---

# Part 11 · Delivery

## 43. Implementation Phases

| Phase | Focus | Key outputs |
|---|---|---|
| **1** | Project foundation | Next.js, TypeScript, Tailwind, ESLint, fonts, theme, tokens, layout, sidebar, mobile nav, Cloudflare deployment config |
| **2** | Homepage skeleton | Hero, Work, Experience, About, Stack, GitHub, Contact (placeholders; no particles yet) |
| **3** | Binary portrait | Image processing, particles, WebGL, 0/1, repulsion, spring return, responsive, reduced motion |
| **4** | Animation | GSAP entrances, scroll reveals, theme wave, timeline, hover |
| **5** | Backend | Supabase, `/api/visits`, visitor counter |
| **6** | Developer features | Command palette, GitHub section, case studies, experience page |
| **7** | Polish | Cross-browser/device/keyboard/reduced-motion/slow-connection testing, optimization |

**Phase notes**

- **Phase 2:** First make the layout excellent, before touching the particle system.
- **Phase 3:** This phase gets the most technical attention.
- **Phase 7 test targets:** Desktop Chrome, Firefox, Safari, mobile, tablet, keyboard, reduced motion, slow connection.

## 44. Definition of Done

### Visual

- [ ] Modern technical design
- [ ] Warm monochrome palette
- [ ] Geist / Space Grotesk typography
- [ ] JetBrains Mono metadata
- [ ] Sidebar navigation
- [ ] Mobile navigation
- [ ] Light/dark mode
- [ ] Theme wave

### Hero

- [ ] Jewel's introduction
- [ ] Binary portrait
- [ ] WebGL rendering
- [ ] Mouse interaction
- [ ] Spring physics
- [ ] Mobile behavior
- [ ] Reduced motion

### Content

- [ ] Work
- [ ] Experience
- [ ] About
- [ ] Stack
- [ ] GitHub
- [ ] Contact

### Features

- [ ] Visitor counter
- [ ] Command palette
- [ ] Project case studies
- [ ] Theme switcher

### Engineering

- [ ] TypeScript
- [ ] Responsive
- [ ] Accessible
- [ ] SEO
- [ ] Good performance
- [ ] Clean architecture
- [ ] No fabricated information
- [ ] Production build succeeds
- [ ] Deploys successfully to Cloudflare

## 45. Instruction to Give Codex (after the PRD)

> **We are starting this portfolio completely from scratch. Do not inspect or reuse the implementation of my previous portfolio. Create a new Next.js project and implement this PRD as a greenfield application.**
>
> **Do not start by building everything at once.**
>
> First initialize the project and establish the design system and application architecture. Then implement the homepage skeleton. Then implement the binary portrait as an isolated WebGL component. Then add the remaining interactions and backend features.
>
> After each phase, run lint, type checking, and build validation. Keep the code production-ready and maintainable.
>
> **The binary portrait is the signature feature, but the overall website must remain a polished developer portfolio rather than becoming a Three.js experiment.**
>
> **Do not invent any personal information, work history, project outcomes, statistics, testimonials, or technologies. Use placeholders when information has not yet been provided.**
>
> **Do not ask me to make architectural decisions that can reasonably be determined from this PRD. Make sensible engineering decisions and document them.**
>
> **Begin with Phase 1 only.**

### Recommended build order

```text
Foundation → static homepage → binary portrait → animations
→ real content → Supabase visitor counter → polish
```

Do not start with Supabase or the particle system before the basic layout exists. The portfolio's identity comes from the combination of the UI and the portrait, not the particle effect alone.
