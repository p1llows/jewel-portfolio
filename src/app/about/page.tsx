import type { Metadata } from "next";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: "Background, approach and story of Jewel Ramirez, a full-stack developer.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutSection isPreview={false} />;
}

