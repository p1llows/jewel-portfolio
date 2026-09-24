import Link from "next/link";
import { experience } from "@/data/experience";

interface ExperienceSectionProps {
  isPreview?: boolean;
}

export function ExperienceSection({ isPreview = false }: ExperienceSectionProps) {
  const latestJob = experience[0];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
      {/* Header */}
      <div className="mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">
          03 / EXPERIENCE
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {isPreview ? "EXPERIENCE HIGHLIGHT" : "EXPERIENCE & HISTORY"}
        </h2>
      </div>

      {isPreview ? (
        /* Homepage Preview Mode (Full-width 2-column layout) */
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-secondary tracking-wider uppercase">
              {latestJob.period}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {latestJob.company}
            </h3>
            <div className="text-base font-mono text-secondary font-semibold">
              {latestJob.role}
            </div>
            <p className="text-sm text-secondary/80 leading-relaxed max-w-md">
              Leading agentic software architecture, core UI systems, and scholarly research development.
            </p>

            <div className="pt-4">
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
              >
                <span>SEE FULL EXPERIENCE</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-lg border border-border/60 bg-surface/40 p-6 space-y-6">
            <div className="text-xs font-mono text-secondary tracking-wider uppercase border-b border-border/40 pb-3">
              KEY RESPONSIBILITIES & DELIVERABLES
            </div>
            <ul className="space-y-3 text-sm text-secondary leading-relaxed">
              {latestJob.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 shrink-0 mt-2" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {latestJob.technologies && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-border/40">
                {latestJob.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono text-secondary bg-background border border-border/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Dedicated Page Timeline View (/experience) */
        <div className="relative border-l border-border/70 ml-2 pl-6 sm:pl-8 space-y-10 max-w-4xl">
          {experience.map((job) => (
            <div key={job.id} className="relative group">
              {/* Monochrome Timeline Node Marker */}
              <div className="absolute -left-[1.8rem] sm:-left-[2.3rem] top-1">
                {job.isCurrent ? (
                  <span className="block h-3 w-3 rounded-full bg-foreground shadow-sm" />
                ) : (
                  <span className="block h-3 w-3 rounded-full border border-border bg-background shadow-sm" />
                )}
              </div>

              {/* Date Badge */}
              <div className="text-xs font-mono text-secondary mb-1 tracking-wider uppercase">
                {job.period}
              </div>

              {/* Role Header */}
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                {job.role}
              </h3>

              {/* Company Subtitle */}
              <div className="text-sm font-semibold text-secondary mt-0.5 mb-2">
                {job.company}
              </div>

              {/* Sub-divider */}
              <div className="w-full border-b border-border/40 mb-3" />

              {/* Bullet Points */}
              <ul className="space-y-2 text-sm text-secondary leading-relaxed max-w-2xl">
                {job.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 shrink-0 mt-2" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              {job.technologies && (
                <div className="flex flex-wrap gap-2 mt-4 pt-1">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-secondary bg-surface border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}




