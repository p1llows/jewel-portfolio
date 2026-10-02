"use client";

import { useEffect, useState } from "react";
import { GitHubContributionData, ContributionDay } from "@/types/github";
import { Card } from "@/components/ui/Card";

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

  // Strict PRD monochrome grayscale color tokens for levels 0-4
  const getLevelBg = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#C4C4BF] dark:bg-[#3E3E3B]";
      case 2:
        return "bg-[#999994] dark:bg-[#5E5E5A]";
      case 3:
        return "bg-[#626260] dark:bg-[#8C8C87]";
      case 4:
        return "bg-foreground";
      default:
        return "bg-border";
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading State
  if (loading) {
    return (
      <Card className="w-full p-6 sm:p-8 text-center font-mono">
        <div className="flex items-center justify-center gap-3">
          <span className="w-2 h-2 bg-foreground animate-ping rounded-none" />
          <span className="text-xs text-secondary tracking-widest uppercase">
            Loading GitHub activity...
          </span>
        </div>
      </Card>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <Card className="w-full p-6 sm:p-8 text-center font-mono">
        <div className="text-xs text-foreground tracking-wider uppercase mb-2">
          Unable to load GitHub activity.
        </div>
        <p className="text-xs text-secondary mb-4 max-w-sm mx-auto">
          {error || "Check your connection or API configuration."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 text-xs font-mono rounded-none border border-border bg-background text-foreground hover:bg-surface transition-colors"
        >
          RETRY
        </button>
      </Card>
    );
  }

  return (
    <Card className="w-full font-mono overflow-hidden">
      {/* Header Strip: HANDLE @p1llows (left) | VIEW PROFILE -> (right) */}
      <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between text-xs">
        <div className="font-medium text-foreground">
          HANDLE: <span className="font-bold">@{data.username}</span>
        </div>
        <a
          href={`https://github.com/${data.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-foreground transition-colors font-medium"
        >
          VIEW PROFILE →
        </a>
      </div>

      {/* Stats Row: 3 equal cells separated by vertical 1px hairlines */}
      <div className="grid grid-cols-3 border-b border-border bg-background/40 divide-x divide-border text-center sm:text-left">
        <div className="p-4 sm:p-5">
          <div className="text-[11px] text-secondary uppercase tracking-wider mb-1 font-medium">
            CONTRIBUTIONS
          </div>
          <div className="text-lg sm:text-[22px] font-mono font-bold text-foreground">
            {data.totalContributions}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="text-[11px] text-secondary uppercase tracking-wider mb-1 font-medium">
            CURRENT STREAK
          </div>
          <div className="text-lg sm:text-[22px] font-mono font-bold text-foreground">
            {data.streaks.currentStreak} {data.streaks.currentStreak === 1 ? "day" : "days"}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="text-[11px] text-secondary uppercase tracking-wider mb-1 font-medium">
            LONGEST STREAK
          </div>
          <div className="text-lg sm:text-[22px] font-mono font-bold text-foreground">
            {data.streaks.longestStreak} {data.streaks.longestStreak === 1 ? "day" : "days"}
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="p-4 sm:p-6 space-y-4">
        <div className="relative overflow-x-auto pb-2 scrollbar-thin">
          <div className="min-w-[820px] select-none">
            {/* Month Headers aligned with Week columns */}
            <div className="flex gap-2 mb-2">
              <div className="w-6 shrink-0" />
              <div className="flex gap-[2px] text-xs font-mono text-secondary h-4 relative flex-1">
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
              <div className="flex flex-col justify-between text-xs font-mono text-secondary py-0.5 select-none w-6 shrink-0">
                <span />
                <span>Mon</span>
                <span />
                <span>Wed</span>
                <span />
                <span>Fri</span>
                <span />
              </div>

              {/* Heatmap Grid (7 rows) */}
              <div className="flex gap-[2px] flex-1">
                {data.weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[2px]">
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
                        className={`w-3 h-3 aspect-square rounded-none shrink-0 transition-all ${
                          day.date
                            ? "hover:outline hover:outline-1 hover:outline-foreground hover:z-10 focus:outline-none focus:ring-1 focus:ring-foreground"
                            : "opacity-0 pointer-events-none"
                        } ${getLevelBg(day.intensity)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Legend & Attribution */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted mt-5 pt-3 border-t border-border">
              <span>Learn how GitHub counts contributions</span>
              <div className="flex items-center gap-1.5 text-secondary">
                <span>Less</span>
                <div className={`w-2.5 h-2.5 rounded-none ${getLevelBg(0)}`} />
                <div className={`w-2.5 h-2.5 rounded-none ${getLevelBg(1)}`} />
                <div className={`w-2.5 h-2.5 rounded-none ${getLevelBg(2)}`} />
                <div className={`w-2.5 h-2.5 rounded-none ${getLevelBg(3)}`} />
                <div className={`w-2.5 h-2.5 rounded-none ${getLevelBg(4)}`} />
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
              className="z-50 pointer-events-none rounded-none bg-foreground text-background px-3 py-1.5 text-xs font-mono border border-border text-center shadow-none"
            >
              <div className="font-bold">{formatDate(hoveredDay.day.date)}</div>
              <div className="text-[11px]">
                {hoveredDay.day.count} contribution{hoveredDay.day.count === 1 ? "" : "s"}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
