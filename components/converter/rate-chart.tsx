"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getCurrency } from "@/lib/currencies";
import { useLang } from "@/lib/i18n";
import { fetchHistory, type HistoryPoint } from "@/lib/history";
import { formatRate, formatDate } from "@/lib/format";

const RANGES = [30, 90, 365] as const;
type Range = (typeof RANGES)[number];

const W = 720;
const H = 240;
const PAD = { top: 16, right: 8, bottom: 22, left: 8 };

type Props = { from: string; to: string; arKind?: string };

export function RateChart({ from, to, arKind = "blue" }: Props) {
  const { t } = useLang();
  const [range, setRange] = useState<Range>(90);
  const [data, setData] = useState<HistoryPoint[] | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "unavailable">("loading");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const gradId = useId();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    setState("loading");
    setData(null);
    setHoverIdx(null);
    fetchHistory(from, to, range, arKind, controller.signal)
      .then((points) => {
        if (controller.signal.aborted) return;
        if (points && points.length >= 2) {
          setData(points);
          setState("ready");
        } else {
          setState("unavailable");
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setState("unavailable");
      });
    return () => controller.abort();
  }, [from, to, range, arKind]);

  const geom = useMemo(() => {
    if (!data) return null;
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || max || 1;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const x = (i: number) => PAD.left + (i / (data.length - 1)) * innerW;
    const y = (v: number) => PAD.top + innerH - ((v - min) / span) * innerH;
    const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
    const area = `${line} L${x(data.length - 1).toFixed(1)},${(H - PAD.bottom).toFixed(1)} L${x(0).toFixed(1)},${(H - PAD.bottom).toFixed(1)} Z`;
    return { x, y, line, area, min, max };
  }, [data]);

  const change = useMemo(() => {
    if (!data || data.length < 2) return null;
    const first = data[0].value;
    const last = data[data.length - 1].value;
    const pct = ((last - first) / first) * 100;
    return { pct, up: pct >= 0 };
  }, [data]);

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!data || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const ratio = Math.max(0, Math.min(1, (px - PAD.left) / (W - PAD.left - PAD.right)));
    setHoverIdx(Math.round(ratio * (data.length - 1)));
  }

  const toCur = getCurrency(to);
  const fromCur = getCurrency(from);
  const hover = hoverIdx != null && data ? data[hoverIdx] : null;

  return (
    <div className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{t("chart.title")}</h2>
          <p className="text-sm text-[var(--color-muted)]">
            {fromCur.code} / {toCur.code}
          </p>
        </div>
        <div className="seg" role="group" aria-label={t("chart.title")}>
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
            >
              {t(`chart.range.${r}`)}
            </button>
          ))}
        </div>
      </div>

      {change && (
        <p className="tnum mt-2 text-sm font-medium" style={{ color: change.up ? "var(--color-positive)" : "var(--color-negative)" }}>
          {t("chart.change", {
            sign: change.up ? "+" : "",
            pct: change.pct.toFixed(2),
            days: range,
          })}
        </p>
      )}

      <div className="mt-4">
        {state === "loading" && (
          <div className="grid h-[240px] place-items-center text-sm text-[var(--color-muted)]">
            {t("chart.loading")}
          </div>
        )}
        {state === "unavailable" && (
          <div className="grid h-[240px] place-items-center rounded-[var(--radius-field)] border border-dashed border-[var(--color-line-strong)] px-6 text-center text-sm text-[var(--color-muted)]">
            {t("chart.unavailable")}
          </div>
        )}
        {state === "ready" && geom && data && (
          <div className="relative">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="w-full touch-none"
              role="img"
              aria-label={`${fromCur.code}/${toCur.code}, ${range} días`}
              onPointerMove={onMove}
              onPointerLeave={() => setHoverIdx(null)}
            >
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={geom.area} fill={`url(#${gradId})`} />
              <path d={geom.line} fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {hover && hoverIdx != null && (
                <g>
                  <line
                    x1={geom.x(hoverIdx)}
                    x2={geom.x(hoverIdx)}
                    y1={PAD.top}
                    y2={H - PAD.bottom}
                    stroke="var(--color-line-strong)"
                    strokeWidth="1"
                  />
                  <circle cx={geom.x(hoverIdx)} cy={geom.y(hover.value)} r="4" fill="var(--color-brand)" stroke="var(--color-surface)" strokeWidth="2" />
                </g>
              )}
            </svg>
            <div className="mt-1 flex justify-between text-xs text-[var(--color-muted)]">
              <span>{formatDate(data[0].date)}</span>
              <span className="tnum">
                {hover
                  ? `${formatDate(hover.date)} · 1 ${fromCur.code} = ${formatRate(hover.value)} ${toCur.code}`
                  : `${formatDate(data[data.length - 1].date)}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
