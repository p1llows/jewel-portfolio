export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: "personal" | "professional";
  company?: string;
  previewUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  // Personal Projects (01 - 07)
  {
    id: "portfolio-v2",
    title: "PORTFOLIO V2",
    subtitle: "Interactive Binary Particle Portfolio",
    description: "Modern developer portfolio featuring interactive binary particle canvas portrait, dynamic theme engine, command palette, and high-density technical layouts.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Canvas API", "Framer Motion"],
    category: "personal",
    previewUrl: "https://jewelramirez.dev",
    githubUrl: "https://github.com/p1llows/jewel-portfolio",
  },
  {
    id: "philnits-prep",
    title: "PhilNITS Prep",
    subtitle: "IP Passport Examination Review Platform",
    description: "Comprehensive TALL-stack web assessment and review platform for the PhilNITS IP Passport examination, featuring spaced repetition learning, custom study planning, and performance analytics.",
    technologies: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL", "Docker"],
    category: "personal",
    previewUrl: "https://github.com/p1llows/philnits-prep",
    githubUrl: "https://github.com/p1llows/philnits-prep",
  },
  {
    id: "supportdesk-mini",
    title: "SupportDesk Mini",
    subtitle: "IT Support Ticket Management SPA",
    description: "A lightweight IT support ticket management single-page application (SPA) built with Laravel 12 REST API, React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui, and Docker Compose.",
    technologies: ["Laravel", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Docker"],
    category: "personal",
    previewUrl: "https://github.com/p1llows/supportdesk-mini",
    githubUrl: "https://github.com/p1llows/supportdesk-mini",
  },
  {
    id: "nl2sqlviz",
    title: "NL2SQLViz",
    subtitle: "Agentic NL-to-Visualization System",
    description: "Agentic Natural Language-to-Visualization System for Enterprise Analytics. Simplifies query construction and charts creation.",
    technologies: ["Vue", "Quasar", "Chart.js", "PostgreSQL", "Python"],
    category: "personal",
    previewUrl: "https://jewelramirez.vercel.app/projects",
    githubUrl: "https://github.com/p1llows",
  },
  {
    id: "csms",
    title: "Community Service Monitoring System",
    subtitle: "Community Service Monitoring System",
    description: "Web-based monitoring platform for community service management and college records tracking.",
    technologies: ["PostgreSQL", "Express.js", "React", "Node.js"],
    category: "personal",
    previewUrl: "https://jewelramirez.vercel.app/projects",
    githubUrl: "https://github.com/p1llows",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    subtitle: "Modern Developer Portfolio",
    description: "Modern responsive portfolio inspired by premium developer portfolios, layout structures, and calm aesthetics.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "React Router"],
    category: "personal",
    previewUrl: "https://jewelramirez.dev",
    githubUrl: "https://github.com/p1llows/jewel-portfolio",
  },
  {
    id: "dessert-diaries",
    title: "Dessert Diaries",
    subtitle: "Recipe Sharing Platform",
    description: "A Recipe Sharing Platform for sharing recipes and connecting with other food lovers.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    category: "personal",
    previewUrl: "https://jewelramirez.vercel.app/projects",
    githubUrl: "https://github.com/p1llows",
  },
  // Professional Projects (Work Experience)
  {
    id: "resolve",
    title: "Resolve",
    subtitle: "Internal Ticketing & Workstream Platform",
    description: "Internal ticketing and workstream platform developed at New Media Services featuring threaded conversations, internal notes, Telegram bot integrations, file attachment processing, and Filament admin workflows.",
    technologies: ["Laravel", "PHP", "Filament", "REST API", "Next.js", "MariaDB", "Redis", "Docker", "Telegram"],
    category: "professional",
    company: "New Media Services – Philippines",
  },
];
