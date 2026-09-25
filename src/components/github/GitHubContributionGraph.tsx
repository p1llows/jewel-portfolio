"use client";

import { useEffect, useState } from "react";
import { GitHubContributionData, ContributionDay } from "@/types/github";

interface GitHubContributionGraphProps {
  username?: string;
}

export function GitHubContributionGraph({ username }: GitHubContributionGraphProps = {}) {
  const [data, setData] = useState<GitHubContributionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const url = username ? `/api/github-contributions?username=${username}` : "/api/github-contributions";
        const res = await fetch(url);
        const json = await res.json();

        if (!json.success || !json.weeks || json.weeks.length === 0) {
          throw new Error(json.error || "Unable to load GitHub activity.");
        }

        setData(json);
      } catch (err) {
        setError((err as Error).message || "Unable to load GitHub activity.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [username]);

  const getLevelBg = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#cccccc] dark:bg-[#333333] border border-[#bbbbbb] dark:border-[#444444]";
      case 2:
        return "bg-[#999999] dark:bg-[#555555] border border-[#888888] dark:border-[#666666]";
      case 3:
        return "bg-[#555555] dark:bg-[#999999] border border-[#444444] dark:border-[#aaaaaa]";
      case 4:
        return "bg-[#171717] dark:bg-[#f1f1ed] border border-[#000000] dark:border-[#ffffff]";
      default:
        return "bg-[#e5e5e0] dark:bg-[#1f1f1f] border border-[#d2d2ce] dark:border-[#30302d]";
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="w-full rounded-lg border border-border/60 bg-surface/40 p-6 sm:p-8 text-center font-mono">
        <div className="flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-foreground animate-ping" />
          <span className="text-xs text-secondary tracking-widest uppercase">
            Loading GitHub activity...
          </span>
        </div>
      </div>
    );
  }

  // Error State (No fake fallback rendered)
  if (error || !data) {
    return (
      <div className="w-full rounded-lg border border-border/60 bg-surface/40 p-6 sm:p-8 text-center font-mono">
        <div className="text-xs text-red-500 dark:text-red-400 tracking-wider uppercase mb-2">
          Unable to load GitHub activity.
        </div>
        <p className="text-xs text-secondary mb-4 max-w-sm mx-auto">
          {error || "Check your connection or API configuration."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 text-[11px] font-mono rounded border border-border bg-surface hover:text-foreground transition-colors"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-border/60 bg-surface/40 p-5 sm:p-6 font-sans space-y-6">
      {/* Top Header & Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-tight">
            <span className="font-bold text-base">{data.totalContributions}</span> contributions in the last year
          </h3>
          <p className="text-xs font-mono text-secondary">
            USER: @{data.username}
          </p>
        </div>

        {/* Streaks & Stats */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded bg-background border border-border/50">
            <span className="text-secondary mr-1.5 uppercase text-[10px]">CURRENT STREAK:</span>
            <span className="font-bold text-foreground">{data.streaks.currentStreak} {data.streaks.currentStreak === 1 ? "day" : "days"}</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-background border border-border/50">
            <span className="text-secondary mr-1.5 uppercase text-[10px]">LONGEST STREAK:</span>
            <span className="font-bold text-foreground">{data.streaks.longestStreak} {data.streaks.longestStreak === 1 ? "day" : "days"}</span>
          </div>
        </div>
      </div>

      {/* Contribution Calendar Heatmap Container */}
      <div className="relative overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-[850px] select-none">
          {/* Month Headers aligned with Week columns */}
          <div className="flex gap-2 mb-2">
            <div className="w-6 shrink-0" />
            <div className="flex gap-1 text-[10px] font-mono text-secondary h-4 relative flex-1">
              {data.weeks.map((_, weekIdx) => {
                const month = data.months.find((m) => m.firstWeekIndex === weekIdx);
                return (
                  <div key={weekIdx} className="w-3 shrink-0 relative">
                    {month && (
                      <span className="absolute left-0 top-0 whitespace-nowrap z-10">
                        {month.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid with Day Labels */}
          <div className="flex gap-2">
            {/* Day Labels Column */}
            <div className="flex flex-col justify-between text-[10px] font-mono text-secondary py-0.5 select-none w-6 shrink-0">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-1 flex-1">
              {data.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.contributionDays.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      tabIndex={day.date ? 0 : -1}
                      role="gridcell"
                      aria-label={day.date ? `${formatDate(day.date)}: ${day.count} contribution${day.count === 1 ? "" : "s"}` : undefined}
                      onMouseEnter={(e) => {
                        if (!day.date) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredDay({ day, x: rect.left + rect.width / 2, y: rect.top });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-3 h-3 aspect-square rounded-[2px] shrink-0 transition-transform ${
                        day.date
                          ? "hover:scale-125 hover:z-10 focus:outline-none focus:ring-1 focus:ring-foreground"
                          : "opacity-0 pointer-events-none"
                      } ${getLevelBg(day.intensity)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-secondary mt-5 pt-3 border-t border-border/30">
            <span>Learn how GitHub counts contributions</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className={`w-2.5 h-2.5 rounded-[2px] ${getLevelBg(0)}`} />
              <div className={`w-2.5 h-2.5 rounded-[2px] ${getLevelBg(1)}`} />
              <div className={`w-2.5 h-2.5 rounded-[2px] ${getLevelBg(2)}`} />
              <div className={`w-2.5 h-2.5 rounded-[2px] ${getLevelBg(3)}`} />
              <div className={`w-2.5 h-2.5 rounded-[2px] ${getLevelBg(4)}`} />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredDay && (
          <div
            style={{
              position: "fixed",
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 45}px`,
              transform: "translateX(-50%)",
            }}
            className="z-50 pointer-events-none rounded bg-foreground text-background px-3 py-1.5 text-xs font-mono shadow-md border border-border/40 text-center animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="font-bold">{formatDate(hoveredDay.day.date)}</div>
            <div className="text-[11px] opacity-90">
              {hoveredDay.day.count} contribution{hoveredDay.day.count === 1 ? "" : "s"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
