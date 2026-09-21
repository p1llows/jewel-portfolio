export function ContactSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-secondary mb-4">07 / CONTACT</div>
        <h2 className="text-3xl font-bold tracking-tight">GET IN TOUCH</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-mono text-secondary">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded bg-surface px-4 py-3 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-mono text-secondary">
              MESSAGE
            </label>
            <textarea
              rows={4}
              placeholder="Your message..."
              className="w-full rounded bg-surface px-4 py-3 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
            />
          </div>
          <button className="rounded bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-secondary transition-colors">
            SEND MESSAGE
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-bold">EMAIL</h3>
            <a
              href="mailto:hello@jewelramirez.dev"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              hello@jewelramirez.dev
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-bold">TELEGRAM</h3>
            <a
              href="https://t.me/p1llows"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              @p1llows
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-bold">LINKEDIN</h3>
            <a
              href="https://linkedin.com/in/jewelramirez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              linkedin.com/in/jewelramirez
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
