import { GitHubContributionGraph } from "@/components/github/GitHubContributionGraph";
import { Card } from "@/components/ui/Card";
import { Github } from "lucide-react";

export function GitHubSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60">
        <div className="text-xs sm:text-sm font-mono font-semibold text-secondary tracking-widest uppercase mb-2">07 / GITHUB</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">GITHUB</h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Profile Card & Info */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <p className="text-xs font-mono font-medium text-secondary tracking-wide">
              Code / Experiments / Open Source
            </p>
            <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed max-w-lg">
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

          <Card className="lg:col-span-7 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header Strip */}
              <div className="bg-background border-b border-border px-4 sm:px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-secondary">HANDLE:</span>
                  <span className="font-bold text-foreground">@p1llows</span>
                </div>
                <Github className="w-4 h-4 text-secondary" />
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  Building software with Next.js, React, TypeScript, Three.js, Laravel, PHP, and Python. Open to technical collaborations and scholarly software development.
                </p>
              </div>
            </div>

            {/* Footer Strip */}
            <div className="px-4 sm:px-6 py-3 border-t border-border flex items-center justify-between font-mono text-xs text-secondary bg-surface">
              <span>REPOS: PUBLIC & RESEARCH</span>
              <span className="hidden sm:inline-block text-muted">STATUS: ACTIVE</span>
            </div>
          </Card>
        </div>

        {/* Contribution Graph Section */}
        <div>
          <GitHubContributionGraph username="p1llows" />
        </div>
      </div>
    </section>
  );
}



