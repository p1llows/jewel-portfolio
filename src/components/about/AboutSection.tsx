import Link from "next/link";

interface AboutSectionProps {
  isPreview?: boolean;
}

export function AboutSection({ isPreview = false }: AboutSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
      <div className="mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">04 / ABOUT</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">I AM JEWEL RAMIREZ.</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-6 space-y-4">
          <p className="text-base sm:text-lg text-secondary leading-relaxed">
            Web Developer based in Baguio City, Philippines. Computer Science graduate from Don Mariano Marcos Memorial State University with a passion for building clean aesthetic interfaces, high-density systems, and resilient backend software.
          </p>
          {!isPreview && (
            <p className="text-sm text-secondary/90 leading-relaxed">
              I enjoy working across the stack — from interactive frontend web applications with React, Next.js, and TypeScript, to backend APIs with PHP, Laravel, Node.js, and database design.
            </p>
          )}

          {isPreview && (
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
              >
                <span>SEE FULL ABOUT</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border/60 bg-surface/40 p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">LOCATION</div>
            <div className="text-sm font-semibold text-foreground">Baguio City, PH</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">DEGREE</div>
            <div className="text-sm font-semibold text-foreground">BS Computer Science</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">CERTIFICATION</div>
            <div className="text-sm font-semibold text-foreground">ITPEC IP Passport</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">AVAILABILITY</div>
            <div className="text-sm font-semibold text-emerald-500">AVAILABLE FOR WORK</div>
          </div>
        </div>
      </div>
    </section>
  );
}



