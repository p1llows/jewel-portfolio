import type { Metadata } from "next";
import { StackSection } from "@/components/stack/StackSection";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Languages, frameworks and tools used by Jewel Ramirez.",
  alternates: { canonical: "/stack" },
};

export default function StackPage() {
  return <StackSection isPreview={false} />;
}

