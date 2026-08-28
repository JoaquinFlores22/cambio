"use client";

import { useState } from "react";
import Link from "next/link";
import { getCurrency } from "@/lib/currencies";
import { useLang } from "@/lib/i18n";
import { convert } from "@/lib/rates";
import { formatMoney } from "@/lib/format";

const SHORT_STEPS = [1, 10, 100, 1000, 10000];
const FULL_STEPS = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000];

type Props = {
  from: string;
  to: string;
  rates: Record<string, number>;
};

function Half({ from, to, rates, steps }: Props & { steps: number[] }) {
  const fromCur = getCurrency(from);
  const toCur = getCurrency(to);
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-[var(--color-muted)]">
          <th className="pb-2 font-medium">{fromCur.code}</th>
          <th className="pb-2 text-right font-medium">{toCur.code}</th>
        </tr>
      </thead>
      <tbody className="divide-line">
        {steps.map((n) => (
          <tr key={n}>
            <td className="tnum py-2">
              <Link
                href={`/convertir/${from.toLowerCase()}-to-${to.toLowerCase()}?amount=${n}`}
                className="hover:text-[var(--color-brand-strong)]"
              >
                {formatMoney(n, from)}
              </Link>
            </td>
            <td className="tnum py-2 text-right font-medium">
              {formatMoney(convert(n, from, to, rates), to)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ConversionTable({ from, to, rates }: Props) {
  const { t } = useLang();
  const [full, setFull] = useState(false);
  const steps = full ? FULL_STEPS : SHORT_STEPS;

  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-lg font-semibold">{t("table.title")}</h2>
      <div className="mt-4 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <Half from={from} to={to} rates={rates} steps={steps} />
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-muted)]">
            {t("table.reverseTitle")}
          </p>
          <Half from={to} to={from} rates={rates} steps={steps} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFull((v) => !v)}
        className="mt-4 text-sm font-medium text-[var(--color-brand-strong)] hover:underline"
      >
        {full ? t("table.showLess") : t("table.showMore")}
      </button>
    </div>
  );
}
