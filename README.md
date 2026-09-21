# Jewel Ramirez Portfolio v2

A modern developer portfolio built with Next.js, TypeScript, and Tailwind CSS, deployed on Cloudflare Pages.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion, GSAP
- **3D/WebGL:** Three.js
- **Icons:** Lucide Icons
- **Backend/Database:** Supabase (visitor counter API ready)
- **Deployment:** Cloudflare Pages

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare Pages

1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `.next`

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout with theme provider
│   ├── page.tsx         # Homepage
│   ├── work/            # Work section pages
│   ├── experience/      # Experience section pages
│   ├── about/           # About section pages
│   ├── stack/           # Stack section pages
│   └── contact/         # Contact section pages
├── components/          # React components
│   ├── layout/          # Navigation and layout
│   ├── hero/            # Hero section
│   ├── work/            # Work-related components
│   ├── experience/      # Experience-related components
│   ├── about/           # About-related components
│   ├── stack/           # Stack-related components
│   ├── github/          # GitHub-related components
│   ├── contact/         # Contact-related components
│   ├── effects/         # WebGL and animation effects
│   └── ui/              # Reusable UI components
├── data/                # Content data files
├── lib/                 # Utility functions
└── types/               # TypeScript type definitions
```

## Design System

- **Colors:** Monochrome palette (light/dark mode)
- **Typography:** Geist (primary), Space Grotesk (fallback), JetBrains Mono (technical metadata)
- **Theme:** Light/dark mode with localStorage persistence

## Features Implemented

### ✅ Phase 1: Foundation
- Next.js 14 App Router
- TypeScript
- Tailwind CSS v3
- ESLint
- Cloudflare Pages export config
- Project structure

### ✅ Phase 2: Homepage Skeleton
- Hero section with introduction
- Navigation with sidebar
- Work section with project cards
- Experience section
- About section
- Stack section
- GitHub section
- Contact section
- All routes: `/`, `/work`, `/experience`, `/about`, `/stack`, `/contact`, `/github`

### ✅ Phase 3: Binary Portrait & Animations
- Three.js WebGL binary particle portrait
- Interactive mouse repulsion
- Responsive particle count
- GSAP hero entrance animations
- Light/dark theme toggle

### ✅ Phase 4: Backend
- Visitor counter API (`/api/visits`)
- LocalStorage fallback for development
- Ready for Supabase integration

## Configuration

### Cloudflare Pages

Environment variables needed for production:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
```

### Portrait Image

Place your portrait image at:
```
public/images/portrait-source.jpg
```

The binary portrait will automatically generate particles from this image.

## Next Steps

- Command palette (`Cmd/Ctrl+K`)
- Case studies pages (`/work/[slug]`)
- SEO metadata
- Accessibility improvements
- Mobile navigation improvements
