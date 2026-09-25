# Jewel Ramirez — Portfolio v2

A modern developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, WebGL, and Framer Motion. Deployed on Cloudflare Pages.

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion, GSAP
- **3D / Canvas:** Interactive Binary Particle Engine (Canvas 2D) & Three.js WebGL
- **Icons:** Lucide Icons & React Icons (Simple Icons)
- **API Integrations:** GitHub GraphQL API & Public HTML Scraper Fallback
- **Database / Analytics:** Visitor Counter API (`/api/visits`), Supabase integration ready
- **Deployment:** Cloudflare Pages

---

## 🛠️ Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/p1llows/jewel-portfolio.git
   cd jewel-portfolio
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and set your GitHub Personal Access Token (for fetching GitHub activity via GraphQL):
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   NEXT_PUBLIC_GITHUB_USERNAME=p1llows
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Verification

To verify production builds:

```bash
npm run build
```

To run the production server locally:

```bash
npm run start
```

---

## 🌐 Deploy to Cloudflare Pages

1. Push your changes to GitHub.
2. Connect your repository to **Cloudflare Pages**.
3. **Build settings:**
   - Framework preset: `Next.js (Static HTML Export)` or `Next.js`
   - Build command: `npm run build`
   - Output directory: `.next` or `out`
4. Add environment variables (`GITHUB_TOKEN`, `NEXT_PUBLIC_GITHUB_USERNAME`) under **Settings > Environment Variables**.

---

## 📂 Project Structure

```
jewel-portfolio/
├── public/
│   └── images/
│       └── portrait-source.jpg  # Source image for Binary Portrait
├── src/
│   ├── app/                      # Next.js App Router pages & APIs
│   │   ├── about/               # About page route
│   │   ├── api/                 # API Routes (visits, github-contributions)
│   │   ├── contact/             # Contact page route
│   │   ├── experience/          # Experience page route
│   │   ├── github/              # GitHub activity route
│   │   ├── stack/               # Tech Stack route
│   │   ├── work/                # Projects portfolio
│   │   │   └── [slug]/          # Detailed Case Study pages
│   │   ├── globals.css          # Global Tailwind CSS & design variables
│   │   ├── layout.tsx           # Root layout with ThemeProvider & AppLayout
│   │   └── page.tsx             # Main Homepage
│   ├── components/              # Modular UI & Section Components
│   │   ├── about/               # About section components
│   │   ├── contact/             # Contact form & social channels
│   │   ├── effects/             # Interactive Binary Canvas Engine
│   │   ├── experience/          # Interactive experience timeline
│   │   ├── github/              # GitHub contribution graph & profile cards
│   │   ├── hero/                # Hero section & GSAP entrance animations
│   │   ├── layout/              # Responsive Navbar, Desktop Sidebar & Mobile Drawer
│   │   ├── navigation/          # NavLink components
│   │   ├── stack/               # Tech icon matrix & stack categories
│   │   ├── ui/                  # Theme toggle, Visitor counter, Command Palette
│   │   └── work/                # Project cards & case study layouts
│   ├── data/                    # Structured content (projects, experience, stack, case studies)
│   ├── lib/                     # GitHub GraphQL client, utils & helper functions
│   └── types/                   # TypeScript interfaces & types
├── .env.example                 # Environment variables template
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

---

## 🎨 Design System

- **Monochrome Theme:** Custom high-contrast light and dark palette with persistent state in `localStorage`.
- **Typography:** Modern monospace (`JetBrains Mono`) for metadata and clean sans-serif for content.
- **Responsive Layout:** 
  - Desktop: Fixed sidebar navigation with docked status indicator and tools.
  - Mobile & Tablet (`< 768px`): Glassmorphic top navigation header with animated slide-over drawer menu.

---

## ✨ Features Implemented

### ✅ Core & Layout
- Full Next.js 14 App Router integration with TypeScript.
- Complete responsive design across mobile (`< 480px`), tablet (`768px`), laptop, and desktop viewports.
- Responsive mobile header bar & slide-over glassmorphic drawer menu.

### ✅ Interactive Features & Animations
- **Binary Particle Engine (`BinaryPortrait`):** 2D canvas sampling engine rendering real-time binary characters with mouse/touch repulsion physics and theme-aware lighting.
- **GSAP Hero Entrance:** Staggered sequence for hero text and CTA buttons.
- **Command Palette (`Cmd/Ctrl+K`):** Global search modal for instant page navigation and quick actions.

### ✅ GitHub Contribution Heatmap
- Live 1-year contribution calendar powered by GitHub's **GraphQL API**.
- Robust HTML scraper fallback parser with week padding (`0..6` Sunday–Saturday) for complete visual accuracy.
- Normalized cell dimensions (`w-3 h-3`) and month header alignment across all devices.

### ✅ Case Studies & Content
- Individual case study pages (`/work/[slug]`) generated statically via `generateStaticParams`.
- Visitor counter API with local fallback storage (`/api/visits`).
