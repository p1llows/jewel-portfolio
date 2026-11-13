import type { Metadata } from "next";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certifications and credentials earned by Jewel Ramirez.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return <CertificationsSection />;
}
