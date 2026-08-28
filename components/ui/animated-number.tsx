"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  /** cómo formatear el número en cada frame */
  format: (n: number) => string;
  className?: string;
  /** ms de la transición */
  duration?: number;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Interpola el número mostrado cuando `value` cambia (efecto "count-up"). Respeta
 * `prefers-reduced-motion`: en ese caso salta directo al valor final.
 */
export function AnimatedNumber({ value, format, className, duration = 550 }: Props) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const from = fromRef.current;
    const to = value;
    if (reduce || from === to || !Number.isFinite(from) || !Number.isFinite(to)) {
      fromRef.current = to;
      setDisplay(to);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOut(p);
      setDisplay(from + (to - from) * eased);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = to;
    };
  }, [value, duration]);

  return (
    <span className={className} suppressHydrationWarning>
      {format(Number.isFinite(display) ? display : value)}
    </span>
  );
}
