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
              href="mailto:jewelramirez.dev@gmail.com"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              jewelramirez.dev@gmail.com
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-bold">LINKEDIN</h3>
            <a
              href="https://linkedin.com/in/jewel-r"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              linkedin.com/in/jewel-r
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-bold">FACEBOOK</h3>
            <a
              href="https://www.facebook.com/jewellr.r"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              facebook.com/jewellr.r
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-bold">DISCORD</h3>
            <a
              href="https://discord.com/users/1541353877750677534"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              discord.com/users/1541353877750677534
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
