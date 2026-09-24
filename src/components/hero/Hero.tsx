"use client";

import { BinaryPortrait } from "@/components/effects/BinaryPortrait";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FileText, Github, Linkedin, Mail, Facebook } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const heroSection = heroRef.current;
    if (!heroSection) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
      ".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".hero-description",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power1.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-buttons",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power1.out" },
      "-=0.3"
    );
  }, []);

  return (
    <section ref={heroRef} className="relative py-12 sm:py-16 md:py-24 lg:py-28 min-h-[85vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 text-xs font-mono text-secondary tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-foreground" />
                01 / HOME
              </div>

              <h1 className="mb-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-muted hero-title">
                HELLO, I AM
              </h1>

              <h2 className="mb-6 text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground hero-subtitle">
                JEWEL
                <br />
                RAMIREZ
              </h2>

              <p className="mb-6 text-xl md:text-2xl font-mono text-secondary max-w-2xl hero-description">
                &lt;Full-Stack Developer /&gt;
              </p>

              <p className="mb-10 text-base md:text-lg text-secondary max-w-2xl leading-relaxed hero-description">
                I build high-performance web applications, resilient backend APIs, seamless integrations, and modern interactive digital experiences.
              </p>

              <div className="flex flex-wrap items-center gap-4 hero-buttons">
                <motion.a
                  href="/work"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-3.5 bg-foreground text-background font-semibold rounded shadow transition-all"
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
                  className="px-8 py-3.5 border border-border rounded font-medium hover:bg-surface transition-all text-foreground flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  RESUME
                </motion.a>
              </div>

              {/* Grayscale Social Links Icons */}
              <div className="mt-8 flex items-center gap-4 hero-buttons">
                <motion.a
                  href="https://github.com/p1llows"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                  className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
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
                  className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:jewelramirez.dev@gmail.com"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email"
                  className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
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
                  className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
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
                  className="p-2.5 rounded-md border border-border bg-surface/50 hover:bg-surface text-secondary hover:text-foreground grayscale transition-all hover:grayscale-0"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Binary Particle Portrait */}
          <div className="lg:col-span-5 relative z-20 flex justify-center lg:justify-end mt-4 lg:-mt-10">
            <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[700px] h-[360px] sm:h-[500px] md:h-[600px] lg:h-[720px] xl:h-[760px]">
              <BinaryPortrait src="/images/portrait-source.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
