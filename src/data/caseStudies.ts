export const caseStudyData: Record<string, CaseStudy> = {
  csms: {
    title: "CSMS",
    subtitle: "Community Service Monitoring System",
    overview: "A Community Service Management System for tracking and managing community service activities and college academic records.",
    problem: "Educational institutions needed a centralized web application to monitor community service hours, student logs, and activity records efficiently.",
    solution: "Developed a responsive web platform with automated logging, administrative review dashboards, and activity tracking.",
    role: "Full-Stack Developer",
    architecture: [
      "Laravel backend with MVC architecture",
      "MySQL relational database with normalized schema",
      "React frontend UI components",
      "Role-based authentication & authorization",
    ],
    technology: "React, Tailwind CSS, PHP, Laravel, MySQL",
    outcome: "Streamlined community service tracking and reduced manual verification time for college administrators.",
    features: [
      "Student activity logging & submission",
      "Admin verification dashboard",
      "Automated hour calculation",
      "Exportable reports and records",
    ],
    screens: [],
  },
  "dessert-diaries": {
    title: "DESSERT DIARIES",
    subtitle: "Recipe Sharing & Culinary Platform",
    overview: "A culinary recipe sharing platform designed for dessert enthusiasts to discover, share, and connect.",
    problem: "Food lovers needed an intuitive platform to post recipes, organize ingredients, and interact with fellow baking enthusiasts.",
    solution: "Created an interactive web app with recipe creation, tagging, search, and user community features.",
    role: "Full-Stack Developer",
    architecture: [
      "Express/Node.js API backend",
      "React interactive UI with responsive layouts",
      "MySQL database for recipes, ingredients, and users",
    ],
    technology: "React, Node.js, Express, Tailwind CSS, MySQL",
    outcome: "Built an engaging community platform for sharing recipes with fast search and clean presentation.",
    features: [
      "Recipe publishing with ingredient steps",
      "Category and ingredient filtering",
      "User profiles and bookmarks",
      "Responsive mobile and desktop UI",
    ],
    screens: [],
  },
  "portfolio-v2": {
    title: "PORTFOLIO V2",
    subtitle: "Modern Developer Portfolio",
    overview: "Modern responsive portfolio featuring high-density bento systems, an interactive binary particle portrait, and calm minimalist aesthetics.",
    problem: "Required a distinctive developer portfolio that showcases projects, experience, and tech stack with high performance and polish.",
    solution: "Built with Next.js App Router, custom HTML5 Canvas particle physics, and Tailwind CSS design tokens.",
    role: "Full-Stack Developer",
    architecture: [
      "Next.js App Router with TypeScript",
      "HTML5 Canvas GPU-accelerated particle engine",
      "Tailwind CSS custom token system",
      "Static generation for Cloudflare Pages",
    ],
    technology: "Next.js, React, TypeScript, Tailwind CSS, Canvas API",
    outcome: "A fast, production-ready developer portfolio with unique interactive binary portrait capabilities.",
    features: [
      "Interactive binary particle portrait with mouse repulsion & spring physics",
      "Dynamic light and dark theme switching",
      "Keyboard-navigable Command Palette (⌘K)",
      "Live visitor counter API",
      "Full responsive layout across mobile and desktop",
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
