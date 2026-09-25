import Link from "next/link";

interface AboutSectionProps {
  isPreview?: boolean;
}

export function AboutSection({ isPreview = false }: AboutSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">04 / ABOUT</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">I AM JEWEL RAMIREZ.</h2>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-6 space-y-4">
          <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed">
            Full-Stack Developer based in Baguio City, Philippines, currently working as a Junior Programmer at New Media Services. Computer Science graduate from Don Mariano Marcos Memorial State University — I landed in the field almost by accident, then realized in my first year I was actually good at it, and got hooked.
          </p>
          {!isPreview && (
            <>
              <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed mt-4">
                I work across the stack — React, Next.js, and TypeScript on the frontend; PHP, Laravel, and Node.js on the backend. Lately I&apos;ve been focused on AI-assisted development: agents, skills, and harnesses, and how they change the way apps and websites get built.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed mt-4">
                Outside of work, I build things because an idea won&apos;t leave me alone — like philnits-prep, a review tool for the same ITPEC IT Passport exam I&apos;m certified in.
              </p>
            </>
          )}

          {isPreview && (
            <div className="pt-2 sm:pt-4">
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

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-lg border border-border/60 bg-surface/40 p-4 sm:p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">LOCATION</div>
            <div className="text-sm font-semibold text-foreground">Baguio City, PH</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-4 sm:p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">DEGREE</div>
            <div className="text-sm font-semibold text-foreground">BS Computer Science</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-4 sm:p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">CERTIFICATION</div>
            <div className="text-sm font-semibold text-foreground">ITPEC IP Passport</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface/40 p-4 sm:p-5 transition-colors hover:border-foreground/30">
            <div className="mb-1 text-[11px] font-mono text-secondary tracking-wider uppercase">AVAILABILITY</div>
            <div className="text-sm font-semibold text-emerald-500">AVAILABLE FOR WORK</div>
          </div>
        </div>
      </div>

      {!isPreview && (
        <div className="mt-16 sm:mt-24 space-y-16 sm:space-y-20">
          {/* Hobbies Section */}
          <div>
            <div className="mb-6 sm:mb-8 pb-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground uppercase">BEYOND THE CODE</h3>
                <p className="text-xs font-mono text-secondary mt-1.5 tracking-widest uppercase">HOBBIES & INTERESTS</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Competitive Gaming", desc: "Bloodstrike, Mobile Legends, CODM, League, and Valorant — mostly ranked, sometimes just chill." },
                { title: "Manga & Anime", desc: "Shonen action through and through — Black Clover, Haikyuu, Blue Lock. Currently reading Kagurabachi." },
                { title: "Cafe Hopping", desc: "Always hunting for a good spot to work — good coffee, good vibe, good wifi. Order's a Spanish latte." },
              ].map((hobby, idx) => (
                <div key={idx} className="group rounded-lg border border-border/60 bg-surface/20 p-5 transition-all hover:bg-surface/60 hover:border-foreground/30">
                  <div className="text-sm font-bold text-foreground mb-2 group-hover:translate-x-1 transition-transform">{hobby.title}</div>
                  <p className="text-xs text-secondary leading-relaxed">{hobby.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Section */}
          <div>
            <div className="mb-6 sm:mb-8 pb-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground uppercase">VISUAL DIARY</h3>
                <p className="text-xs font-mono text-secondary mt-1.5 tracking-widest uppercase">LIFE IN PIXELS</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[200px]">
              {/* Replace these placeholder divs with actual next/image components later */}
              <div className="col-span-2 row-span-2 rounded-lg bg-surface/40 border border-border/40 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-mono tracking-wider font-semibold text-white">WORKSPACE</span>
                </div>
              </div>
              <div className="rounded-lg bg-surface/40 border border-border/40 overflow-hidden relative group">
                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-[10px] font-mono tracking-wider text-white">TRAVEL</span>
                </div>
              </div>
              <div className="rounded-lg bg-surface/40 border border-border/40 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-[10px] font-mono tracking-wider text-white">KEYBOARD</span>
                </div>
              </div>
              <div className="col-span-2 rounded-lg bg-surface/40 border border-border/40 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-mono tracking-wider font-semibold text-white">COFFEE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



