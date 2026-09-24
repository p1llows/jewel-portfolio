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
    id: "csms",
    title: "CSMS",
    subtitle: "Community Service Monitoring System",
    description: "Web-based monitoring platform for community service management and college records tracking.",
    technologies: ["React", "Tailwind CSS", "PHP", "Laravel", "MySQL"],
    previewUrl: "https://jewelramirez.vercel.app",
    githubUrl: "https://github.com/p1llows",
  },
  {
    id: "dessert-diaries",
    title: "DESSERT DIARIES",
    subtitle: "Recipe Sharing Platform",
    description: "A recipe sharing platform for sharing recipes and connecting with other culinary food lovers.",
    technologies: ["React", "Node.js", "Express", "Tailwind CSS", "MySQL"],
    previewUrl: "https://jewelramirez.vercel.app",
    githubUrl: "https://github.com/p1llows",
  },
  {
    id: "portfolio-v2",
    title: "PORTFOLIO V2",
    subtitle: "Modern Developer Portfolio",
    description: "Modern responsive portfolio featuring high-density bento systems, interactive binary portrait, and calm aesthetics.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Canvas API"],
    previewUrl: "https://jewelramirez.dev",
    githubUrl: "https://github.com/p1llows/jewel-portfolio",
  },
];
