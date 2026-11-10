"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { stackCategories } from "@/data/stack";
import { projects } from "@/data/projects";
import { TechIcon } from "@/components/stack/TechIcon";
import { CountUp } from "@/components/motion/CountUp";

// ---- Derived data (computed once at module load) ----

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const ALIASES: Record<string, string> = { restapis: "restapi", basicpython: "python" };
const key = (s: string) => ALIASES[normalize(s)] ?? normalize(s);

/** tech key -> projects that list it */
const projectsByTech = new Map<string, typeof projects>();
for (const project of projects) {
  for (const tech of project.technologies) {
    const k = key(tech);
    projectsByTech.set(k, [...(projectsByTech.get(k) ?? []), project]);
  }
}

const projectsFor = (tech: string) => projectsByTech.get(key(tech)) ?? [];

const TOTAL_TECHS = new Set(stackCategories.flatMap((c) => c.items.map(key))).size;

interface Selection {
  tech: string;
  categoryId: string;
}

export function StackExplorer() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selection | null>(null);

  const q = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      stackCategories
        .map((category, index) => ({ category, index }))
        .filter(({ category }) => active === "all" || category.id === active)
        .map(({ category, index }) => ({
          category,
          index,
          items: category.items.filter((t) => !q || t.toLowerCase().includes(q)),
        }))
        .filter(({ items }) => items.length > 0),
    [active, q]
  );

  const shownCount = visible.reduce((sum, v) => sum + v.items.length, 0);

  const toggle = (tech: string, categoryId: string) =>
    setSelected((cur) => (cur?.tech === tech && cur.categoryId === categoryId ? null : { tech, categoryId }));

  const selectCategory = (id: string) => {
    setActive(id);
    setSelected(null);
  };

  const fade = (delay = 0) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Intro + stats */}
      <div className="grid gap-6 lg:grid-cols-12 items-end">
        <p className="lg:col-span-6 text-sm sm:text-base md:text-lg text-secondary leading-relaxed max-w-xl">
          The languages, frameworks and tools I build with. Select any technology to see the projects that use it.
        </p>
        <dl className="lg:col-span-6 grid grid-cols-3 border border-border bg-surface divide-x divide-border text-center sm:text-left font-mono">
          {[
            { label: "TECHNOLOGIES", value: TOTAL_TECHS },
            { label: "CATEGORIES", value: stackCategories.length },
            { label: "PROJECTS", value: projects.length },
          ].map((stat) => (
            <div key={stat.label} className="p-3 sm:p-4">
              <dt className="text-[11px] text-secondary uppercase tracking-wider mb-1 font-medium">{stat.label}</dt>
              <dd className="text-lg sm:text-[22px] font-bold text-foreground">
                <CountUp value={stat.value} duration={900} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Toolbar: category chips + search */}
      <div className="space-y-3">
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin"
        >
          {[{ id: "all", title: "All", count: TOTAL_TECHS }, ...stackCategories.map((c) => ({ id: c.id, title: c.title, count: c.items.length }))].map(
            (chip) => {
              const isActive = active === chip.id;
              return (
                <button
                  key={chip.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectCategory(chip.id)}
                  className={`shrink-0 border px-3 py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-secondary border-border hover:text-foreground hover:border-foreground"
                  }`}
                >
                  {chip.title} <span className={isActive ? "opacity-70" : "text-muted"}>{chip.count}</span>
                </button>
              );
            }
          )}
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technologies..."
            aria-label="Search technologies"
            className="w-full border border-border bg-background pl-9 pr-9 py-2 text-sm font-mono outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all placeholder:text-secondary/60 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-secondary hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {shownCount} technologies shown
        </p>
      </div>

      {/* Category blocks */}
      <div className="border-t border-border">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active} {...fade()} className="divide-y divide-border">
            {visible.length === 0 && (
              <div className="py-12 text-center font-mono text-sm text-secondary">
                No technologies match &ldquo;{query}&rdquo;.{" "}
                <button onClick={() => setQuery("")} className="underline hover:text-foreground">
                  Clear search
                </button>
              </div>
            )}

            {visible.map(({ category, index, items }) => {
              const selectedHere = selected?.categoryId === category.id ? selected.tech : null;
              const selectedProjects = selectedHere ? projectsFor(selectedHere) : [];

              return (
                <section key={category.id} className="py-6 sm:py-8">
                  <div className="flex items-baseline justify-between gap-4 mb-4 sm:mb-5">
                    <h3 className="text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2">
                      <span className="text-secondary">0{index + 1} /</span>
                      <span className="text-foreground">{category.title}</span>
                    </h3>
                    <span className="text-xs font-mono text-secondary uppercase tracking-wider shrink-0">
                      {items.length} {items.length === 1 ? "Tech" : "Techs"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {items.map((tech, i) => {
                      const used = projectsFor(tech).length;
                      const isSelected = selectedHere === tech;
                      return (
                        <motion.button
                          key={tech}
                          {...(reduce
                            ? { initial: false as const }
                            : {
                                initial: { opacity: 0, scale: 0.96 },
                                animate: { opacity: 1, scale: 1 },
                                transition: { duration: 0.3, delay: Math.min(i, 12) * 0.025, ease: [0.22, 1, 0.36, 1] as const },
                              })}
                          onClick={() => toggle(tech, category.id)}
                          aria-pressed={isSelected}
                          className={`group/tile relative flex items-center gap-3 border px-3 py-3 sm:px-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                            isSelected
                              ? "border-foreground bg-background text-foreground"
                              : "border-border bg-surface text-secondary hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          <TechIcon
                            name={tech}
                            className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover/tile:scale-110"
                          />
                          <span className="min-w-0 flex-1 truncate text-xs sm:text-sm font-mono">{tech}</span>
                          {used > 0 && (
                            <span
                              className="shrink-0 text-[11px] font-mono text-muted group-hover/tile:text-secondary"
                              title={`Used in ${used} ${used === 1 ? "project" : "projects"}`}
                            >
                              ×{used}
                            </span>
                          )}
                          <span
                            aria-hidden="true"
                            className={`absolute left-0 right-0 bottom-0 h-[2px] bg-foreground origin-left transition-transform duration-300 ${
                              isSelected ? "scale-x-100" : "scale-x-0 group-hover/tile:scale-x-100"
                            }`}
                          />
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Used-in panel for the selected tile */}
                  <AnimatePresence initial={false}>
                    {selectedHere && (
                      <motion.div
                        key={selectedHere}
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 sm:mt-4 border border-foreground bg-background">
                          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 font-mono text-xs">
                            <span className="uppercase tracking-wider text-foreground font-semibold">
                              {selectedHere}
                              <span className="text-secondary font-normal">
                                {" "}
                                · {selectedProjects.length > 0
                                  ? `used in ${selectedProjects.length} ${selectedProjects.length === 1 ? "project" : "projects"}`
                                  : "no listed projects yet"}
                              </span>
                            </span>
                            <button
                              onClick={() => setSelected(null)}
                              aria-label="Close details"
                              className="p-1 text-secondary hover:text-foreground"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          {selectedProjects.length > 0 && (
                            <ul className="divide-y divide-border">
                              {selectedProjects.map((project, n) => (
                                <li key={project.id}>
                                  <Link
                                    href={`/work/${project.id}`}
                                    className="group/link flex items-center gap-4 px-4 py-3 hover:bg-surface transition-colors"
                                  >
                                    <span className="font-mono text-xs text-muted w-6 shrink-0">0{n + 1}</span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm font-semibold text-foreground truncate">{project.title}</span>
                                      <span className="block text-xs font-mono text-secondary truncate">{project.subtitle}</span>
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 shrink-0 text-secondary transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-foreground" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
