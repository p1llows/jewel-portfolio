import Link from "next/link";
import { Mail, Linkedin, Facebook, MessageSquare, Send } from "lucide-react";

interface ContactSectionProps {
  isPreview?: boolean;
}

export function ContactSection({ isPreview = false }: ContactSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">08 / CONTACT</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">GET IN TOUCH</h2>
      </div>

      <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 pr-0 lg:pr-4 pt-2">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-5 uppercase">
              HAVE A PROJECT? LET'S TALK.
            </h3>
            <div className="border-l-2 border-border/80 pl-4 sm:pl-5 py-1 space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed">
                I help turn ideas into working software — web apps, internal tools, systems, integrations, you name it. Currently taking on freelance and contract work.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed">
                Tell me what you're building and I'll tell you how I can help.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-3">
              <a href="mailto:jewelramirez.dev@gmail.com" aria-label="Email" className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0 hover:-translate-y-1">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/jewel-r" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0 hover:-translate-y-1">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/jewellr.r" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0 hover:-translate-y-1">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://discord.com/users/1541353877750677534" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0 hover:-translate-y-1">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-8 pt-2 lg:pl-8">
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full rounded-md border border-border/50 bg-background px-4 py-3 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all placeholder:text-secondary/60"
              />
              <input
                type="email"
                placeholder="Enter a valid email address"
                className="w-full rounded-md border border-border/50 bg-background px-4 py-3 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all placeholder:text-secondary/60"
              />
              <textarea
                rows={4}
                placeholder="Enter your message"
                className="w-full rounded-md border border-border/50 bg-background px-4 py-3 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all resize-none placeholder:text-secondary/60"
              />
            </div>

            <div className="pt-2">
              <button className="flex items-center justify-center gap-2 w-full sm:w-auto rounded bg-foreground px-8 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold text-background hover:opacity-90 transition-opacity">
                <span>SUBMIT</span>
              </button>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}



