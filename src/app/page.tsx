import { Hero } from "@/components/hero/Hero";
import { WorkSection } from "@/components/work/WorkSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { AboutSection } from "@/components/about/AboutSection";
import { StackSection } from "@/components/stack/StackSection";
import { GitHubSection } from "@/components/github/GitHubSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ExperienceSection />
      <AboutSection />
      <StackSection />
      <GitHubSection />
      <ContactSection />
    </>
  );
}
