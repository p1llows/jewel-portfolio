export function GitHubSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight">GITHUB</h2>
        <p className="mt-2 text-sm text-secondary">CODE / EXPERIMENTS / OPEN SOURCE</p>
      </div>

      <div className="mb-8 rounded border border-border bg-surface p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="font-mono text-xs text-secondary">GITHUB</span>
          <span className="text-sm">p1llows</span>
        </div>
        <div className="flex gap-4 text-xs font-mono text-secondary">
          <span>STATUS: ACTIVE</span>
          <span>LOC: ~50K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/p1llows"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-foreground transition-colors"
        >
          VIEW GITHUB
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
