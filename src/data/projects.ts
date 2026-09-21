export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  previewUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "resolve",
    title: "RESOLVE",
    subtitle: "Ticketing & Collaboration Platform",
    description: "A comprehensive ticketing and collaboration platform for teams.",
    technologies: ["Laravel", "Filament", "PHP", "MariaDB", "Redis"],
    previewUrl: "#",
    githubUrl: "https://github.com/p1llows/resolve",
  },
  {
    id: "telegram-helpdesk",
    title: "TELEGRAM HELPDesk",
    subtitle: "Telegram-to-Resolve Integration",
    description: "Seamless integration between Telegram and Resolve ticketing system.",
    technologies: ["Node.js", "Telegram Bot API", "Laravel", "Redis"],
    previewUrl: "#",
    githubUrl: "https://github.com/p1llows/telegram-helpdesk",
  },
  {
    id: "portfolio-v2",
    title: "PORTFOLIO",
    subtitle: "This Portfolio Website",
    description: "A modern developer portfolio with interactive elements.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
    previewUrl: "#",
    githubUrl: "https://github.com/p1llows/jewel-portfolio",
  },
];
