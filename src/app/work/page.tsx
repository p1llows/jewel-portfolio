import type { Metadata } from "next";
import { WorkSection } from "@/components/work/WorkSection";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and case studies by Jewel Ramirez, full-stack developer.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkSection isPreview={false} />;
}

