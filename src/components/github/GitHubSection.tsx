export function GitHubSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
      <div className="mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">06 / GITHUB</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">GITHUB</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-mono text-secondary uppercase tracking-wider">
            CODE / EXPERIMENTS / OPEN SOURCE
          </p>
          <p className="text-base text-secondary leading-relaxed max-w-md">
            Check out open-source repositories, developer tools, WebGL prototypes, and scholarly software projects hosted on GitHub.
          </p>

          <div className="pt-4">
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

        <div className="lg:col-span-7 rounded-lg border border-border/60 bg-surface/40 p-6 transition-all hover:border-foreground/30 space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-secondary uppercase">HANDLE:</span>
              <span className="font-mono text-sm font-bold text-foreground">@p1llows</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/30">
              ACTIVE
            </span>
          </div>

          <p className="text-sm text-secondary leading-relaxed">
            Building software with Next.js, React, TypeScript, Three.js, Laravel, PHP, and Python. Open to technical collaborations and scholarly software development.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-secondary pt-3 border-t border-border/40">
            <span>IDENTITY: p1llows</span>
            <span>·</span>
            <span>REPOS: PUBLIC & RESEARCH</span>
          </div>
        </div>
      </div>
    </section>
  );
}


