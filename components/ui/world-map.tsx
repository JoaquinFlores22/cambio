"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "@/lib/use-theme";

// Basado en el componente "World Map" de Aceternity UI, adaptado a los tokens de Cambio:
// mapa de puntos discreto + arcos finos en el color de marca, animación sobria (se dibuja una
// vez). El SVG del mapa va embebido como data URI (permitido por img-src 'self' data:).

type Point = { lat: number; lng: number };
export type MapDot = { start: Point; end: Point };

const MAP_W = 800;
const MAP_H = 400;

function project(lat: number, lng: number) {
  return {
    x: (lng + 180) * (MAP_W / 360),
    y: (90 - lat) * (MAP_H / 180),
  };
}

function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const midX = (a.x + b.x) / 2;
  const midY = Math.min(a.y, b.y) - Math.abs(b.x - a.x) * 0.18 - 20;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
}

export function WorldMap({ dots = [] }: { dots?: MapDot[] }) {
  const theme = useTheme();

  const mapSrc = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
      radius: 0.22,
      color: theme === "dark" ? "#3a4a43" : "#c2ccc6",
      shape: "circle",
      backgroundColor: "transparent",
    });
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [theme]);

  const paths = useMemo(
    () =>
      dots.map((d) => ({
        d: curve(project(d.start.lat, d.start.lng), project(d.end.lat, d.end.lng)),
        start: project(d.start.lat, d.start.lng),
        end: project(d.end.lat, d.end.lng),
      })),
    [dots],
  );

  return (
    <div className="relative aspect-[2/1] w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mapSrc}
        alt=""
        aria-hidden
        className="pointer-events-none h-full w-full select-none object-contain opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        draggable={false}
      />
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Mapa de plazas financieras conectadas"
      >
        <defs>
          <linearGradient id="cambio-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0" />
            <stop offset="15%" stopColor="var(--color-brand)" stopOpacity="0.9" />
            <stop offset="85%" stopColor="var(--color-brand)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((p, i) => (
          <g key={i}>
            <motion.path
              d={p.d}
              fill="none"
              stroke="url(#cambio-arc)"
              strokeWidth={1.1}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.25 * i, ease: "easeInOut" }}
            />
            {[p.start, p.end].map((pt, j) => (
              <g key={j}>
                <circle cx={pt.x} cy={pt.y} r={2} fill="var(--color-brand)" />
                <circle cx={pt.x} cy={pt.y} r={2} fill="var(--color-brand)" opacity={0.35}>
                  <animate attributeName="r" from="2" to="10" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.35" to="0" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

export default WorldMap;
