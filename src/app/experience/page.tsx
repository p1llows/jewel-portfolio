import type { Metadata } from "next";
import { ExperienceSection } from "@/components/experience/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and timeline of Jewel Ramirez, full-stack developer.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return <ExperienceSection isPreview={false} />;
}

