import { notFound } from "next/navigation";
import { caseStudyData } from "@/data/caseStudies";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(caseStudyData).map((slug) => ({
    slug,
  }));
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudyData[params.slug as keyof typeof caseStudyData];

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-secondary mb-4">
          02 / CASE STUDY
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          {caseStudy.title}
        </h1>
        <p className="text-xl text-secondary">{caseStudy.subtitle}</p>
      </div>

      <div className="grid gap-16 md:grid-cols-3">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-lg text-muted leading-relaxed">
              {caseStudy.overview}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Problem</h2>
            <p className="text-lg text-muted leading-relaxed">
              {caseStudy.problem}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p className="text-lg text-muted leading-relaxed">
              {caseStudy.solution}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Role</h2>
            <p className="text-lg text-secondary">{caseStudy.role}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="space-y-2">
              {caseStudy.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-secondary">✓</span>
                  <span className="text-lg text-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technology</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technology.split(", ").map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-surface px-3 py-1 text-sm text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Architecture</h2>
            <ul className="space-y-2">
              {caseStudy.architecture.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-secondary">•</span>
                  <span className="text-lg text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Outcome</h2>
            <p className="text-lg text-foreground leading-relaxed">
              {caseStudy.outcome}
            </p>
          </section>
        </div>

        <div className="space-y-8">
          <div className="rounded border border-border bg-surface p-6">
            <h3 className="mb-4 font-bold">Case Study</h3>
            <nav className="space-y-4 text-sm">
              <a href="#" className="text-secondary hover:text-foreground">
                Overview
              </a>
              <a href="#" className="text-secondary hover:text-foreground">
                Problem & Solution
              </a>
              <a href="#" className="text-secondary hover:text-foreground">
                Architecture
              </a>
              <a href="#" className="text-secondary hover:text-foreground">
                Technology
              </a>
            </nav>
          </div>

          <div className="rounded border border-border bg-surface p-6">
            <h3 className="mb-4 font-bold">Project Details</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-secondary">Type</dt>
                <dd className="text-foreground">Web Application</dd>
              </div>
              <div>
                <dt className="text-secondary">Timeline</dt>
                <dd className="text-foreground">2026</dd>
              </div>
              <div>
                <dt className="text-secondary">Status</dt>
                <dd className="text-foreground">Completed</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-16 flex gap-4">
        <a
          href="/work"
          className="text-sm font-medium text-secondary hover:text-foreground transition-colors"
        >
          ← BACK TO WORK
        </a>
      </div>
    </div>
  );
}
