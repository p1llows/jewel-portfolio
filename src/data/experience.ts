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
    id: "lead-dev",
    period: "2024 — PRESENT",
    company: "SCHOLARLY RESEARCH & DEVELOPMENT",
    role: "Lead Developer",
    description: "Engineered frontend UI, visualization logic, and core coordination workflows. Supervised development milestones, architecture, and scholarly research.",
    technologies: ["React", "Laravel", "PHP", "Tailwind CSS", "MySQL"],
  },
  {
    id: "pnb",
    period: "2023 — 2024",
    company: "PHILIPPINE NATIONAL BANK (PNB)",
    role: "IT Support Intern",
    description: "Supported office operations and critical branch IT-related documentation. Assisted in maintaining and troubleshooting branch hardware and connectivity issues.",
    technologies: ["IT Support", "Hardware Troubleshooting", "Network Admin", "Documentation"],
  },
  {
    id: "dmmmsu",
    period: "2020 — 2024",
    company: "DON MARIANO MARCOS MEMORIAL STATE UNIVERSITY",
    role: "BS Computer Science Graduate",
    description: "Graduated with a Bachelor of Science in Computer Science. Acquired foundational knowledge in programming, algorithms, system design, and software engineering.",
    technologies: ["Computer Science", "Algorithms", "System Design", "Software Engineering"],
  },
];
