export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  tags: string[];
}

export const certificationsData: Certification[] = [
  {
    id: "itpec-ip",
    title: "ITPEC IP Passport Examination Passer",
    issuer: "PhilNITS Foundation",
    year: "2025",
    tags: ["ITPEC", "PhilNITS", "IT Passport"],
  },
  {
    id: "scrum-foundation",
    title: "Scrum Foundation Professional Certification",
    issuer: "Certiprof University",
    year: "2025",
    tags: ["Scrum", "Agile", "Project Management"],
  },
  {
    id: "nlp-intro",
    title: "Introduction to Natural Language Processing",
    issuer: "Great Learning Academy",
    year: "2024",
    tags: ["NLP", "AI", "Python", "Data Science"],
  },
];
