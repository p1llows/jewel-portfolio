export function AboutSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-secondary mb-4">04 / ABOUT</div>
        <h2 className="text-3xl font-bold tracking-tight">I AM JEWEL RAMIREZ.</h2>
      </div>

      <div className="max-w-2xl text-lg text-muted leading-relaxed">
        <p className="mb-6">
          Developer focused on building useful software, clean interfaces, and
          reliable systems.
        </p>
        <p>
          I enjoy working across the stack — from frontend experiences to APIs,
          databases, integrations, and infrastructure.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">LOCATION</div>
          <div className="text-sm">Manila, PH</div>
        </div>
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">AVAILABILITY</div>
          <div className="text-sm text-foreground">OPEN TO WORK</div>
        </div>
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">EMAIL</div>
          <a
            href="mailto:hello@jewelramirez.dev"
            className="text-sm text-secondary hover:text-foreground transition-colors"
          >
            hello@jewelramirez.dev
          </a>
        </div>
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">PHONE</div>
          <div className="text-sm text-secondary">+63 912 345 6789</div>
        </div>
      </div>
    </section>
  );
}
