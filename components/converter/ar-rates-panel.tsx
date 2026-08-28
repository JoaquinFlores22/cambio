"use client";

import { useLang, type Bilingual } from "@/lib/i18n";
import { sortArHouses, type ArRates } from "@/lib/rates";
import { formatNumber, formatRelative } from "@/lib/format";

const LABEL: Record<string, Bilingual> = {
  oficial: { es: "Oficial", en: "Official" },
  blue: { es: "Blue", en: "Blue" },
  bolsa: { es: "MEP (Bolsa)", en: "MEP" },
  contadoconliqui: { es: "CCL", en: "CCL" },
  tarjeta: { es: "Tarjeta / Turista", en: "Card / Tourist" },
  cripto: { es: "Cripto", en: "Crypto" },
  mayorista: { es: "Mayorista", en: "Wholesale" },
};

export function ArRatesPanel({ ar }: { ar: ArRates | null }) {
  const { t, tr } = useLang();
  if (!ar || ar.dolares.length === 0) return null;

  const houses = sortArHouses(ar.dolares);
  const oficial = houses.find((h) => h.casa === "oficial")?.venta ?? null;

  return (
    <div className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">{t("ar.title")}</h2>
        <span className="text-xs text-[var(--color-muted)]" suppressHydrationWarning>
          {t("conv.updated")} {formatRelative(ar.updated)}
        </span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{t("ar.subtitle")}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {houses.map((h) => {
          const spread =
            oficial && h.venta && h.casa !== "oficial"
              ? ((h.venta - oficial) / oficial) * 100
              : null;
          return (
            <div key={h.casa} className="rounded-[var(--radius-field)] border border-[var(--color-line)] bg-[var(--color-bg)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{LABEL[h.casa] ? tr(LABEL[h.casa]) : h.nombre}</span>
                {spread != null && (
                  <span
                    className="tnum text-xs font-medium"
                    style={{ color: spread >= 0 ? "var(--color-warning)" : "var(--color-positive)" }}
                    title={t("ar.spread")}
                  >
                    {spread >= 0 ? "+" : ""}
                    {spread.toFixed(1)}%
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-end gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[var(--color-muted)]">{t("ar.buy")}</p>
                  <p className="tnum text-base font-semibold">
                    {h.compra != null ? `$ ${formatNumber(h.compra, 2)}` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[var(--color-muted)]">{t("ar.sell")}</p>
                  <p className="tnum text-base font-semibold text-[var(--color-brand-strong)]">
                    {h.venta != null ? `$ ${formatNumber(h.venta, 2)}` : "—"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
