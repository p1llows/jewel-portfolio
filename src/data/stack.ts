export interface StackCategory {
  id: string;
  title: string;
  items: string[];
}

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    title: "Front End & Animation",
    items: ["HTML", "CSS", "JavaScript", "React", "Vue", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "WebGL", "shadcn/ui", "MUI", "Quasar", "Vite"],
  },
  {
    id: "backend",
    title: "Back End",
    items: ["Node.js", "NestJS", "PHP", "Laravel", "Express.js", "REST APIs"],
  },
  {
    id: "database",
    title: "Database & Cloud DB",
    items: ["MySQL", "PostgreSQL", "MongoDB", "MariaDB", "Redis", "Supabase", "Firebase"],
  },
  {
    id: "devops",
    title: "DevOps & Cloud Hosting",
    items: ["Vercel", "Cloudflare Pages", "AWS S3", "Kubernetes", "Nginx", "Netlify", "GitHub Actions", "CI/CD", "Docker"],
  },
  {
    id: "platforms-tools",
    title: "Platforms & Tools",
    items: ["Git", "GitHub", "GitLab", "VS Code", "npm", "Figma", "Google Workspace", "Google Cloud"],
  },
  {
    id: "ai-data",
    title: "AI & Data",
    items: ["LM Studio", "Local LLM Integration", "Chart.js", "SQL", "Basic Python"],
  },
  {
    id: "testing",
    title: "Testing & API",
    items: ["Playwright", "Postman"],
  },
  {
    id: "ui-ux",
    title: "UI / UX",
    items: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Responsive Design"],
  },
];
