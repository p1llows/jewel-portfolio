import type { Metadata } from "next";
import { GitHubSection } from "@/components/github/GitHubSection";

export const metadata: Metadata = {
  title: "GitHub Activity",
  description: "Open-source activity and contributions by Jewel Ramirez on GitHub.",
  alternates: { canonical: "/github" },
};

export default function GitHubPage() {
  return <GitHubSection />;
}
