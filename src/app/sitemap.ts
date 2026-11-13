import type { MetadataRoute } from "next";
import { caseStudyData } from "@/data/caseStudies";

export const dynamic = "force-static";

const SITE_URL = "https://jewel-portfolio.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["about", "work", "stack", "experience", "certifications", "github"];
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...pages.map((p) => ({
      url: `${SITE_URL}/${p}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...Object.keys(caseStudyData).map((slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
