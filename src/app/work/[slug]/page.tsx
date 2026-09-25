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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <div className="mb-8 sm:mb-12 border-b border-border/60 pb-6">
        <div className="text-xs font-mono text-secondary mb-3 uppercase tracking-widest">
          02 / CASE STUDY
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-3 text-foreground">
          {caseStudy.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-secondary font-mono">{caseStudy.subtitle}</p>
      </div>

      <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-8 space-y-8 sm:space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Overview</h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              {caseStudy.overview}
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Problem</h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              {caseStudy.problem}
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Solution</h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              {caseStudy.solution}
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Role</h2>
            <p className="text-base sm:text-lg text-secondary">{caseStudy.role}</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Features</h2>
            <ul className="space-y-2.5">
              {caseStudy.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-foreground font-bold">✓</span>
                  <span className="text-base sm:text-lg text-secondary leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Technology</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technology.split(", ").map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border/60 bg-surface px-3 py-1 text-xs sm:text-sm font-mono text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Architecture</h2>
            <ul className="space-y-2.5">
              {caseStudy.architecture.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-secondary">•</span>
                  <span className="text-base sm:text-lg text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">Outcome</h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium">
              {caseStudy.outcome}
            </p>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-lg border border-border/60 bg-surface/40 p-5 sm:p-6 space-y-3">
            <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-foreground">Project Details</h3>
            <dl className="space-y-3 text-xs sm:text-sm font-mono">
              <div className="flex justify-between border-b border-border/30 pb-2">
                <dt className="text-secondary">TYPE</dt>
                <dd className="text-foreground font-semibold">Web Application</dd>
              </div>
              <div className="flex justify-between border-b border-border/30 pb-2">
                <dt className="text-secondary">TIMELINE</dt>
                <dd className="text-foreground font-semibold">2026</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary">STATUS</dt>
                <dd className="text-emerald-500 font-semibold">COMPLETED</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 pt-6 border-t border-border/40">
        <a
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-secondary hover:text-foreground transition-colors"
        >
          <span>← BACK TO WORK</span>
        </a>
      </div>
    </div>
  );
}
