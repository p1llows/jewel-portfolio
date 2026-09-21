import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-secondary mb-4">03 / EXPERIENCE</div>
        <h2 className="text-3xl font-bold tracking-tight">EXPERIENCE</h2>
      </div>

      <div className="grid gap-8">
        {experience.map((job) => (
          <div key={job.id} className="border-b border-border pb-8">
            <div className="mb-2">
              <span className="font-mono text-sm text-secondary">{job.period}</span>
            </div>
            <h3 className="text-xl font-bold">{job.company}</h3>
            <div className="mb-2 text-sm text-secondary">{job.role}</div>
            <p className="mb-4 text-sm text-muted max-w-xl">{job.description}</p>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono uppercase tracking-wider text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <a
          href="/experience"
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-foreground transition-colors"
        >
          VIEW FULL HISTORY
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
