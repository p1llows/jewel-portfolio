export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  tags: string[];
  logo?: string;
  status?: string;
  category?: string;
  description?: string;
  verifyUrl?: string;
  isUpNext?: boolean;
}

export const certificationsData: Certification[] = [
  {
    id: "itpec-ip",
    title: "ITPEC IP Passport Examination Passer",
    issuer: "PhilNITS Foundation",
    year: "2025",
    description: "IT fundamentals, security, and strategy.",
    logo: "/images/philnits.jpg",
    status: "PASSED",
    category: "IT PASSPORT",
    verifyUrl: "https://www.itpec.org/statsandresults/all-passers-information/Philippines/2025A_IP.pdf",
    tags: ["ITPEC", "PhilNITS", "IT Passport"],
  },
  {
    id: "scrum-foundation",
    title: "Scrum Foundation Professional Certification",
    issuer: "CertiProf",
    year: "2025",
    description: "Scrum roles, events, and artifacts.",
    logo: "/images/certiprof.png",
    status: "CERTIFIED",
    category: "AGILE",
    verifyUrl: "https://certiprof.com/",
    tags: ["Scrum", "Agile", "Project Management"],
  },
  {
    id: "nlp-intro",
    title: "Introduction to Natural Language Processing",
    issuer: "Great Learning Academy",
    year: "2024",
    description: "Text processing and core NLP techniques in Python.",
    logo: "/images/greatlearning.jpg",
    status: "COMPLETED",
    category: "NLP",
    verifyUrl: "https://www.mygreatlearning.com/academy",
    tags: ["NLP", "AI", "Python", "Data Science"],
  },
];


