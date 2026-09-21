import { Project } from "@/data/projects";

export const caseStudyData: Record<string, CaseStudy> = {
  resolve: {
    title: "RESOLVE",
    subtitle: "Ticketing & Collaboration Platform",
    overview: "A comprehensive ticketing and collaboration platform for teams with real-time updates, automated workflows, and team collaboration features.",
    problem: "Teams needed a unified platform for ticket management, internal requests, and customer support without switching between multiple tools.",
    solution: "Built a centralized platform combining ticketing, collaboration, and automation capabilities.",
    role: "Full-Stack Developer",
    architecture: [
      "Laravel backend with modular architecture",
      "Real-time WebSocket connections",
      "Redis-based caching layer",
      "MariaDB with read replicas",
    ],
    technology: "Laravel, Filament, PHP, MariaDB, Redis",
    outcome: "Reduced ticket response time by 40%, improved team collaboration metrics by 60%",
    features: [
      "Automated ticket routing and assignment",
      "Real-time team chat integration",
      "Custom workflow builder",
      "Analytics dashboard",
      "SLA tracking and escalation",
    ],
    screens: [],
  },
  "telegram-helpdesk": {
    title: "TELEGRAM HELPDesk",
    subtitle: "Telegram-to-Resolve Integration",
    overview: "Seamless integration between Telegram and Resolve ticketing system, allowing users to create and manage tickets directly from Telegram.",
    problem: "Users wanted to submit support requests via their preferred messaging platform (Telegram) without needing to access a web interface.",
    solution: "Built a Telegram bot that syncs with the Resolve ticketing system, enabling ticket creation, status updates, and communication.",
    role: "Full-Stack Developer",
    architecture: [
      "Telegram Bot API integration",
      "Node.js webhook server",
      "Laravel API integration",
      "Redis for message queuing",
    ],
    technology: "Node.js, Telegram Bot API, Laravel, Redis",
    outcome: "30% increase in support ticket submissions, improved user satisfaction with instant responses",
    features: [
      "Ticket creation from Telegram",
      "Status updates and notifications",
      "Inline commands for quick actions",
      "Ticket history and context",
    ],
    screens: [],
  },
  "portfolio-v2": {
    title: "PORTFOLIO",
    subtitle: "This Portfolio Website",
    overview: "A modern developer portfolio featuring an interactive binary particle portrait, smooth animations, and a clean technical aesthetic.",
    problem: "Needed a professional portfolio that showcases technical skills while being visually distinctive and performant.",
    solution: "Built with Next.js, Three.js for WebGL, and GSAP for animations.",
    role: "Full-Stack Developer",
    architecture: [
      "Next.js App Router",
      "Three.js WebGL rendering",
      "GSAP animations",
      "Static export for Cloudflare Pages",
    ],
    technology: "Next.js, TypeScript, Tailwind CSS, Three.js",
    outcome: "Clean, fast-loading portfolio with unique visual identity",
    features: [
      "Interactive binary particle portrait",
      "Light/dark theme switching",
      "Responsive design",
      "Optimized performance",
      "GSAP animations",
    ],
    screens: [],
  },
};

export interface CaseStudy {
  title: string;
  subtitle: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  architecture: string[];
  technology: string;
  outcome: string;
  features: string[];
  screens: string[];
}
