"use client";

import { useEffect, useState } from "react";
import { getVisitCount } from "@/lib/visits";

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const recordOrFetchVisit = async () => {
      let hasVisited = false;
      try {
        hasVisited = !!sessionStorage.getItem("portfolio_has_visited");
      } catch {
        /* storage blocked — treat as a new visit */
      }

      const total = await getVisitCount(!hasVisited);
      if (cancelled) return;

      try {
        if (!hasVisited) sessionStorage.setItem("portfolio_has_visited", "true");
        localStorage.setItem("visitCount", String(total));
      } catch {
        /* ignore */
      }

      setCount(total);
      setLoading(false);
    };

    // Show the last known number immediately, then update from the database
    try {
      const stored = localStorage.getItem("visitCount");
      if (stored) {
        setCount(parseInt(stored, 10));
        setLoading(false);
      }
    } catch {
      /* ignore */
    }

    recordOrFetchVisit();
    return () => {
      cancelled = true;
    };
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
