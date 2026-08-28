"use client";

import { useState } from "react";
import { getCurrency } from "@/lib/currencies";
import { useLang } from "@/lib/i18n";
import { convert, pairRate } from "@/lib/rates";
import type { LiveRates } from "@/lib/use-rates";
import { formatMoney, formatNumber, formatRate, formatRelative, parseAmount } from "@/lib/format";
import { CurrencyCombobox } from "./currency-combobox";

type Props = {
  amount: number;
  setAmount: (n: number) => void;
  from: string;
  setFrom: (c: string) => void;
  to: string;
  setTo: (c: string) => void;
  live: LiveRates;
};

export function ConverterCard({ amount, setAmount, from, setFrom, to, setTo, live }: Props) {
  const { t } = useLang();
  const [raw, setRaw] = useState(() => formatNumber(amount, 2));

  const { rates, status } = live;
  const result = convert(amount, from, to, rates.rates);
  const rate = pairRate(from, to, rates.rates);
  const inverse = pairRate(to, from, rates.rates);

  function commitRaw(next: string) {
    setRaw(next);
    const n = parseAmount(next);
    if (Number.isFinite(n)) setAmount(n);
  }

  function swap() {
    setFrom(to);
    setTo(from);
  }

  const fromCur = getCurrency(from);
  const toCur = getCurrency(to);

  return (
    <div className="card p-5 sm:p-7">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        {/* Monto + moneda origen */}
        <div>
          <label htmlFor="amount" className="eyebrow mb-2 block">{t("conv.amount")}</label>
          <div className="flex items-center gap-2 rounded-[var(--radius-field)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-3 focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_3px_var(--color-brand-tint)]">
            <span className="font-mono text-sm text-[var(--color-muted)]">{fromCur.symbol}</span>
            <input
              id="amount"
              inputMode="decimal"
              autoComplete="off"
              value={raw}
              onChange={(e) => commitRaw(e.target.value)}
              onBlur={() => setRaw(formatNumber(amount, 2))}
              className="tnum w-full bg-transparent py-3 text-lg font-semibold outline-none"
              aria-label={`${t("conv.amount")} en ${fromCur.name}`}
            />
          </div>
          <div className="mt-2">
            <CurrencyCombobox value={from} onChange={setFrom} label={t("conv.from")} exclude={[to]} />
          </div>
        </div>

        {/* Swap */}
        <div className="flex justify-center sm:pb-[4.4rem]">
          <button
            type="button"
            onClick={swap}
            aria-label={t("conv.swap")}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-all hover:rotate-180 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
          >
            ⇄
          </button>
        </div>

        {/* Resultado + moneda destino */}
        <div>
          <span className="eyebrow mb-2 block">{t("conv.result")}</span>
          <div className="flex min-h-[3.25rem] items-center rounded-[var(--radius-field)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3">
            <output
              className="tnum text-lg font-semibold"
              aria-live="polite"
            >
              {formatMoney(result, to)}
            </output>
          </div>
          <div className="mt-2">
            <CurrencyCombobox value={to} onChange={setTo} label={t("conv.to")} exclude={[from]} />
          </div>
        </div>
      </div>

      {/* Línea de tipo de cambio */}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--color-line)] pt-4 text-sm">
        <p className="tnum font-medium">
          1 {fromCur.code} = <span className="text-[var(--color-brand-strong)]">{formatRate(rate)}</span> {toCur.code}
        </p>
        <p className="tnum text-[var(--color-muted)]">
          1 {toCur.code} = {formatRate(inverse)} {fromCur.code}
        </p>
        <div className="ml-auto flex items-center gap-2">
          <span className="chip">{t("conv.midMarket")}</span>
          {status === "live" && (
            <span className="chip chip-live"><span className="dot" aria-hidden /> {t("conv.live")}</span>
          )}
          {status === "snapshot" && (
            <span className="chip" title={t("conv.offline")}>{t("conv.snapshot")}</span>
          )}
        </div>
      </div>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        {t("conv.updated")} {formatRelative(rates.updated)} · {rates.source}
      </p>
    </div>
  );
}
