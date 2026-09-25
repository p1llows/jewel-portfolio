import { GitHubContributionGraph } from "@/components/github/GitHubContributionGraph";

export function GitHubSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">07 / GITHUB</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">GITHUB</h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Profile Card & Info */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <p className="text-xs font-mono text-secondary uppercase tracking-wider">
              CODE / EXPERIMENTS / OPEN SOURCE
            </p>
            <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-md">
              Check out open-source repositories, developer tools, WebGL prototypes, and scholarly software projects hosted on GitHub.
            </p>

            <div className="pt-2">
              <a
                href="https://github.com/p1llows"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
              >
                <span>VIEW GITHUB PROFILE</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-lg border border-border/60 bg-surface/40 p-4 sm:p-6 transition-all hover:border-foreground/30 space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-secondary uppercase">HANDLE:</span>
                <span className="font-mono text-sm font-bold text-foreground">@p1llows</span>
              </div>
            </div>

            <p className="text-sm text-secondary leading-relaxed">
              Building software with Next.js, React, TypeScript, Three.js, Laravel, PHP, and Python. Open to technical collaborations and scholarly software development.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-secondary pt-3 border-t border-border/40">
              <span>REPOS: PUBLIC & RESEARCH</span>
            </div>
          </div>
        </div>

        {/* Contribution Graph Section */}
        <div>
          <GitHubContributionGraph username="p1llows" />
        </div>
      </div>
    </section>
  );
}



