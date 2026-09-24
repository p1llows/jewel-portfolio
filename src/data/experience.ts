export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  bullets: string[];
  technologies?: string[];
  isHighlight?: boolean;
  isCurrent?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    id: "thesis-leader",
    period: "2025 – 2026",
    role: "Thesis Leader",
    company: "NL2SQLViz",
    bullets: [
      "Led development of an Agentic Natural Language-to-Visualization System.",
      "Engineered frontend UI, visualization logic, and core coordination workflows.",
      "Supervised development milestones, architecture, and scholarly research.",
    ],
    technologies: ["React", "Python", "NL2SQL", "Agentic AI", "Data Viz"],
    isCurrent: true,
  },
  {
    id: "ojt-intern",
    period: "2025",
    role: "OJT Intern",
    company: "Philippine National Bank",
    bullets: [
      "Assisted in data encoding and management of transaction records.",
      "Supported office operations and critical branch IT-related documentation.",
      "Assisted in maintaining and troubleshooting branch hardware and connectivity issues.",
    ],
    technologies: ["IT Support", "Hardware Troubleshooting", "Network Admin", "Documentation"],
    isHighlight: true,
    isCurrent: true,
  },
  {
    id: "bs-cs",
    period: "2022 – 2026",
    role: "BS Computer Science",
    company: "Don Mariano Marcos Memorial State University - South La Union Campus",
    bullets: [
      "Graduated with a Bachelor of Science in Computer Science.",
      "Developed leadership, communication, and teamwork skills through university organizations.",
      "Acquired foundational knowledge in programming, algorithms, and system design.",
    ],
    technologies: ["Computer Science", "Algorithms", "System Design", "Software Engineering"],
    isCurrent: false,
  },
];

