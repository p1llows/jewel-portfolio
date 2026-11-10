"use client";

import { BinaryPortrait } from "@/components/effects/BinaryPortrait";
import { motion } from "framer-motion";
import { TypeText } from "@/components/motion/TypeText";
import { FileText, Github, Linkedin, Mail, Facebook } from "lucide-react";

// Staggered entrance. initial/animate render in the server HTML (no flash of unstyled text)
// and run on the compositor (transform/opacity only).
const ease = [0.22, 1, 0.36, 1] as const;
const reveal = (delay: number, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export function Hero() {
  return (
    <section className="relative py-4 sm:py-6 lg:py-8 xl:py-10 min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 relative z-10">
            <div>
              <motion.div {...reveal(0, 12)} className="mb-3 sm:mb-4 text-xs sm:text-sm font-mono font-semibold text-secondary tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-none bg-foreground" />
                01 / HOME
              </motion.div>

              <motion.h1 {...reveal(0.1, 30)} className="mb-1 sm:mb-2 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-muted">
                HELLO, I AM
              </motion.h1>

              <motion.h2 {...reveal(0.2, 36)} className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-foreground leading-[0.95]">
                JEWEL
                <br />
                RAMIREZ
              </motion.h2>

              <motion.p {...reveal(0.35)} className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-mono text-secondary max-w-2xl">
                <TypeText text="<Full-Stack Developer />" delay={1000} />
              </motion.p>

              <motion.p {...reveal(0.45)} className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-secondary max-w-2xl leading-relaxed">
                I build high-performance web applications, resilient backend APIs, seamless integrations, and modern interactive digital experiences.
              </motion.p>

              <motion.div {...reveal(0.55)} className="flex flex-wrap items-center gap-3 sm:gap-4">
                <motion.a
                  href="/work"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 bg-foreground text-background font-semibold rounded shadow transition-all"
                >
                  VIEW WORK
                </motion.a>
                <motion.a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Resume will be available soon!");
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group/btn relative overflow-hidden w-full sm:w-auto justify-center px-6 sm:px-8 py-3 border border-border bg-background rounded font-medium text-foreground flex items-center transition-colors duration-500 ease-out hover:border-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                >
                  {/* Fill wipes in from the left on hover/focus (same effect as the section ArrowLink buttons) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100 motion-reduce:transition-none"
                  />
                  <span className="relative flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    RESUME
                  </span>
                </motion.a>
              </motion.div>

              {/* Grayscale Social Links Icons */}
              <motion.div {...reveal(0.65)} className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                <motion.a
                  href="https://github.com/p1llows"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                  className="p-2.5 rounded-md border border-border bg-surface hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/jewel-r"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-md border border-border bg-surface hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:jewelramirez.dev@gmail.com"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email"
                  className="p-2.5 rounded-md border border-border bg-surface hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/jewellr.r"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Facebook"
                  className="p-2.5 rounded-md border border-border bg-surface hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://discord.com/users/1541353877750677534"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Discord"
                  className="p-2.5 rounded-md border border-border bg-surface hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Interactive Binary Particle Portrait */}
          <div className="lg:col-span-5 relative z-20 flex justify-center lg:justify-end mt-4 lg:-mt-12 xl:-mt-16">
            <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[660px] xl:max-w-[740px] h-[360px] sm:h-[500px] md:h-[580px] lg:h-[680px] xl:h-[740px] min-h-[340px]">
              <BinaryPortrait src="/images/portrait-source.jpg" zoom={1.45} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
