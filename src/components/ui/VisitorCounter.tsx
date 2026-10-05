"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recordOrFetchVisit = async () => {
      try {
        const hasVisited = sessionStorage.getItem("portfolio_has_visited");
        const method = hasVisited ? "GET" : "POST";

        const response = await fetch("/api/visits", { method });
        const data = await response.json();

        if (!hasVisited) {
          sessionStorage.setItem("portfolio_has_visited", "true");
        }

        setCount(data.count || 12847);
        localStorage.setItem("visitCount", String(data.count || 12847));
      } catch {
        const stored = localStorage.getItem("visitCount");
        setCount(stored ? parseInt(stored, 10) : 12847);
      } finally {
        setLoading(false);
      }
    };

    recordOrFetchVisit();
  }, []);

  return (
    <div className="flex flex-col items-end text-right font-mono select-none pr-2.5">
      <span className="text-xs tracking-wider text-secondary flex items-center gap-1 uppercase font-medium">
        VISITS
      </span>
      <span className="text-xs font-bold text-foreground font-mono tracking-tight mt-0.5">
        {loading ? "..." : count.toLocaleString()}
      </span>
    </div>
  );
}
