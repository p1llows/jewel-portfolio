export function AboutSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-secondary mb-4">04 / ABOUT</div>
        <h2 className="text-3xl font-bold tracking-tight">I AM JEWEL RAMIREZ.</h2>
      </div>

      <div className="max-w-2xl text-lg text-muted leading-relaxed">
        <p className="mb-6">
          Web Developer based in Baguio City, Philippines. Computer Science graduate from Don Mariano Marcos Memorial State University with a passion for building clean aesthetic interfaces, high-density systems, and resilient backend software.
        </p>
        <p>
          I enjoy working across the stack — from interactive frontend web applications with React, Next.js, and TypeScript, to backend APIs with PHP, Laravel, Node.js, and database design.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">LOCATION</div>
          <div className="text-sm font-medium text-foreground">Baguio City, Philippines</div>
        </div>
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">DEGREE</div>
          <div className="text-sm font-medium text-foreground">BS Computer Science</div>
        </div>
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">CERTIFICATION</div>
          <div className="text-sm font-medium text-foreground">ITPEC IP Passport Passer</div>
        </div>
        <div>
          <div className="mb-2 text-xs font-mono text-secondary">AVAILABILITY</div>
          <div className="text-sm font-medium text-emerald-500">AVAILABLE FOR WORK</div>
        </div>
      </div>
    </section>
  );
}
