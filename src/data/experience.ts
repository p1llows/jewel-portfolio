export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string;
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "nms-creative",
    period: "2026 — PRESENT",
    company: "NMS CREATIVE",
    role: "Developer",
    description: "Building scalable web applications and integrations.",
    technologies: ["Laravel", "PHP", "Next.js", "Docker"],
  },
  {
    id: "previous-1",
    period: "2024 — 2026",
    company: "TECH SOLUTIONS",
    role: "Full-Stack Developer",
    description: "Developing enterprise-grade applications and APIs.",
    technologies: ["Node.js", "React", "PostgreSQL"],
  },
];
