"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { sortArHouses, type ArRates } from "@/lib/rates";
import { formatNumber } from "@/lib/format";

const SHORT: Record<string, { es: string; en: string }> = {
  oficial: { es: "Oficial", en: "Official" },
  blue: { es: "Blue", en: "Blue" },
  bolsa: { es: "MEP", en: "MEP" },
};

/**
 * Versión reducida del panel del dólar para la home: sólo oficial / blue / MEP, en una fila,
 * con enlace a la página del par para ver todo.
 */
export function ArRatesStrip({ ar, pairSlug }: { ar: ArRates | null; pairSlug: string }) {
  const { t, tr } = useLang();
  if (!ar || ar.dolares.length === 0) return null;

  const houses = sortArHouses(ar.dolares).filter((h) => h.casa in SHORT);

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold">{t("ar.title")}</h2>
        <Link
          href={`/convertir/${pairSlug}`}
          className="text-xs font-medium text-[var(--color-brand-strong)] hover:underline"
        >
          {t("ar.seeAll")} →
        </Link>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-3">
        {houses.map((h) => (
          <div key={h.casa} className="rounded-[var(--radius-field)] bg-[var(--color-bg)] p-3">
            <dt className="text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
              {tr(SHORT[h.casa])}
            </dt>
            <dd className="tnum mt-1 text-base font-semibold">
              {h.venta != null ? `$ ${formatNumber(h.venta, 0)}` : "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
