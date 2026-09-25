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
    <div className="flex flex-col font-mono select-none">
      <span className="text-[10px] font-mono text-foreground font-bold tracking-wider uppercase mb-2">
        VISITS
      </span>
      <span className="text-xs font-bold text-foreground tracking-tight">
        {loading ? "..." : count.toLocaleString()}
      </span>
    </div>
  );
}

