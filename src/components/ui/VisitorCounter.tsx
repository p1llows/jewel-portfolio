"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/visits");
        const data = await response.json();
        setCount(data.count);
      } catch {
        // Fallback to localStorage
        const stored = localStorage.getItem("visitCount");
        if (stored) {
          setCount(parseInt(stored, 10));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) {
    return (
      <div className="text-xs font-mono">
        <p className="text-secondary mb-1">VISITS</p>
        <p className="text-foreground">...</p>
      </div>
    );
  }

  return (
    <div className="text-xs font-mono">
      <p className="text-secondary mb-1">VISITS</p>
      <p className="text-foreground">{count.toLocaleString()}</p>
    </div>
  );
}
