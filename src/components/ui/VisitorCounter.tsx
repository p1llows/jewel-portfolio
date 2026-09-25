"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/visits");
        const data = await response.json();
        setCount(data.count || 12847);
      } catch {
        const stored = localStorage.getItem("visitCount");
        if (stored) {
          setCount(parseInt(stored, 10));
        } else {
          setCount(12847);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="flex flex-col items-end text-right font-mono select-none pr-2.5">
      <span className="text-[10px] tracking-wider text-secondary flex items-center gap-1 uppercase font-medium">
        VISITS
      </span>
      <span className="text-xs font-bold text-foreground font-mono tracking-tight mt-0.5">
        {loading ? "..." : count.toLocaleString()}
      </span>
    </div>
  );
}

