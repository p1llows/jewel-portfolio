export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  bullets: string[];
  technologies?: string[];
  isHighlight?: boolean;
  isCurrent?: boolean;
  description?: string;
}

export const experience: ExperienceItem[] = [
  {
    id: "junior-programmer",
    period: "AUG 2026 – PRESENT",
    role: "Junior Programmer",
    company: "New Media Services – Philippines",
    description: "Working on the development and maintenance of internal web-based systems and integrations. Contribute to full-stack features, API development, ticketing workflows, third-party integrations, testing, and production improvements.",
    bullets: [
      "Develop and maintain features for Resolve, an internal ticketing and workstream platform.",
      "Implement ticket comments, threaded conversations, internal notes, public replies, attachments, permissions, and timeline functionality.",
      "Develop and update REST API functionality and API documentation for ticket creation and related workflows.",
      "Work on Telegram-to-Resolve integrations, including ticket creation, comments, references, and external user interactions.",
      "Improve attachment and inline-image handling, including pasted images, multi-file uploads, and storage integration.",
      "Test new features in production and identify usability, functional, and workflow improvements.",
      "Work with Laravel, Filament, PHP, MariaDB, Redis, Docker, Next.js, and API-based integrations.",
      "Collaborate with the development team through Git-based workflows, issue tracking, code review, and feature testing.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "Filament",
      "REST API",
      "Next.js",
      "MariaDB",
      "Redis",
      "Docker",
      "Telegram",
      "Git",
    ],
    isCurrent: true,
  },
  {
    id: "thesis-leader",
    period: "2025 – 2026",
    role: "Thesis Leader",
    company: "NL2SQLViz",
    description: "Leading agentic software architecture, core UI systems, and scholarly research development.",
    bullets: [
      "Led development of an Agentic Natural Language-to-Visualization System.",
      "Engineered frontend UI, visualization logic, and core coordination workflows.",
      "Supervised development milestones, architecture, and scholarly research.",
    ],
    technologies: ["Quasar Framework", "Vue.js", "LLMs", "LM Studio", "NL2SQL", "Agentic AI", "Data Viz"],
    isCurrent: false,
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
    isCurrent: false,
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

