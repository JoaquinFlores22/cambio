"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { sortArHouses, type ArRates } from "@/lib/rates";
import { formatNumber } from "@/lib/format";
import { AnimatedNumber } from "@/components/ui/animated-number";

const SHORT: Record<string, { es: string; en: string }> = {
  oficial: { es: "Oficial", en: "Official" },
  blue: { es: "Blue", en: "Blue" },
  bolsa: { es: "MEP", en: "MEP" },
};

/**
 * Versión reducida del panel del dólar para la home: sólo oficial / blue / MEP, con la brecha,
 * y enlace a la página del par para ver todo.
 */
export function ArRatesStrip({ ar, pairSlug }: { ar: ArRates | null; pairSlug: string }) {
  const { t, tr } = useLang();
  if (!ar || ar.dolares.length === 0) return null;

  const houses = sortArHouses(ar.dolares).filter((h) => h.casa in SHORT);
  const oficial = houses.find((h) => h.casa === "oficial")?.venta ?? null;

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold">{t("ar.title")}</h2>
        <Link href={`/convertir/${pairSlug}`} className="link-arrow text-xs">
          {t("ar.seeAll")} <span className="arrow" aria-hidden>→</span>
        </Link>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-3">
        {houses.map((h) => {
          const gap =
            oficial && h.venta && h.casa !== "oficial" ? ((h.venta - oficial) / oficial) * 100 : null;
          return (
            <div
              key={h.casa}
              className="card-hover rounded-[var(--radius-field)] border border-[var(--color-line)] bg-[var(--color-bg)] p-3.5"
            >
              <dt className="flex items-center justify-between text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
                {tr(SHORT[h.casa])}
                {gap != null && (
                  <span
                    className="tnum font-medium"
                    style={{ color: gap >= 0 ? "var(--color-warning)" : "var(--color-positive)" }}
                  >
                    {gap >= 0 ? "+" : ""}
                    {gap.toFixed(1)}%
                  </span>
                )}
              </dt>
              <dd className="tnum mt-1.5 text-lg font-bold">
                {h.venta != null ? (
                  <>
                    $ <AnimatedNumber value={h.venta} format={(n) => formatNumber(n, 0)} />
                  </>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
