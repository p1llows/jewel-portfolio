import Link from "next/link";

interface ContactSectionProps {
  isPreview?: boolean;
}

export function ContactSection({ isPreview = false }: ContactSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
      <div className="mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">07 / CONTACT</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">GET IN TOUCH</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-6 space-y-4 rounded-lg border border-border/60 bg-surface/40 p-6">
          <div className="text-xs font-mono text-secondary tracking-wider uppercase border-b border-border/40 pb-3">
            SEND A DIRECT MESSAGE
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-mono text-secondary">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded bg-background border border-border/50 px-4 py-2.5 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-mono text-secondary">
              MESSAGE
            </label>
            <textarea
              rows={4}
              placeholder="Your message..."
              className="w-full rounded bg-background border border-border/50 px-4 py-2.5 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
            />
          </div>
          <button className="rounded bg-foreground px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-background hover:opacity-90 transition-opacity">
            SEND MESSAGE
          </button>
        </div>

        <div className="lg:col-span-6 space-y-4 rounded-lg border border-border/60 bg-surface/40 p-6">
          <div className="text-xs font-mono text-secondary tracking-wider uppercase border-b border-border/40 pb-3">
            DIRECT CONTACT CHANNELS
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="mb-1 text-xs font-mono text-secondary uppercase tracking-wider">EMAIL</h3>
              <a
                href="mailto:jewelramirez.dev@gmail.com"
                className="text-sm font-semibold text-foreground hover:text-secondary transition-colors"
              >
                jewelramirez.dev@gmail.com
              </a>
            </div>
            <div>
              <h3 className="mb-1 text-xs font-mono text-secondary uppercase tracking-wider">LINKEDIN</h3>
              <a
                href="https://linkedin.com/in/jewel-r"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-foreground hover:text-secondary transition-colors"
              >
                linkedin.com/in/jewel-r
              </a>
            </div>
            <div>
              <h3 className="mb-1 text-xs font-mono text-secondary uppercase tracking-wider">FACEBOOK</h3>
              <a
                href="https://www.facebook.com/jewellr.r"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-foreground hover:text-secondary transition-colors"
              >
                facebook.com/jewellr.r
              </a>
            </div>
            <div>
              <h3 className="mb-1 text-xs font-mono text-secondary uppercase tracking-wider">DISCORD</h3>
              <a
                href="https://discord.com/users/1541353877750677534"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-foreground hover:text-secondary transition-colors"
              >
                discord.com/users/1541353877750677534
              </a>
            </div>
          </div>
        </div>
      </div>

      {isPreview && (
        <div className="mt-10 pt-4 border-t border-border/40">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
          >
            <span>SEE FULL CONTACT</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}



