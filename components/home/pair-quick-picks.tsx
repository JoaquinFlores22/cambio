"use client";

import Link from "next/link";
import { PAIRS, pairTitle } from "@/lib/pairs";
import { useLang } from "@/lib/i18n";
import { pairRate } from "@/lib/rates";
import { useRates } from "@/lib/rates-context";
import { formatRate } from "@/lib/format";
import { Flag } from "@/components/ui/flag";

export function PairQuickPicks() {
  const { t, lang } = useLang();
  const { rates } = useRates();

  return (
    <section aria-label={t("common.mostSearched")}>
      <p className="eyebrow mb-4">{t("common.mostSearched")}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {PAIRS.slice(0, 8).map((p) => {
          const r = pairRate(p.from, p.to, rates.rates);
          return (
            <Link
              key={p.slug}
              href={`/convertir/${p.slug}`}
              className="card card-hover group flex items-center gap-3 p-3.5"
              title={pairTitle(p, lang)}
            >
              <div className="flex -space-x-1.5">
                <Flag code={p.from} size="sm" />
                <Flag code={p.to} size="sm" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs font-semibold">
                  {p.from} <span className="text-[var(--color-muted)]">→</span> {p.to}
                </p>
                <p className="tnum truncate text-xs text-[var(--color-muted)]" suppressHydrationWarning>
                  {formatRate(r)}
                </p>
              </div>
              <span
                className="ml-auto text-[var(--color-brand-strong)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
