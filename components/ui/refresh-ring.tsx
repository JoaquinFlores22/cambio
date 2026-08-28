"use client";

import { useEffect, useState } from "react";

/**
 * Anillo que se va llenando hasta el próximo refresco automático. Se reinicia cada vez que
 * `refreshedAt` cambia. Pista visual de "esto se actualiza solo".
 */
export function RefreshRing({
  refreshedAt,
  periodMs = 60_000,
  active = false,
  size = 16,
}: {
  refreshedAt: number;
  periodMs?: number;
  active?: boolean;
  size?: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = refreshedAt || Date.now();
    const loop = () => {
      const p = Math.min(1, (Date.now() - start) / periodMs);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [refreshedAt, periodMs]);

  const r = size / 2 - 2;
  const c = 2 * Math.PI * r;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={active ? "animate-spin" : ""}
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="2"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-positive)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.2s linear" }}
      />
    </svg>
  );
}
