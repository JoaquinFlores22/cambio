"use client";

import { useState } from "react";
import { getCurrency } from "@/lib/currencies";
import { useLang } from "@/lib/i18n";
import { convert, pairRate } from "@/lib/rates";
import type { LiveRates } from "@/lib/rates-context";
import { formatMoney, formatNumber, formatRate, formatRelative, parseAmount } from "@/lib/format";
import { CurrencyCombobox } from "./currency-combobox";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { RefreshRing } from "@/components/ui/refresh-ring";

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
  const { t, tr } = useLang();
  const [raw, setRaw] = useState(() => formatNumber(amount, 2));

  const { rates, status, refreshedAt, refreshing } = live;
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
    <div className="card-feature p-5 sm:p-8">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        {/* Monto + moneda origen */}
        <div>
          <label htmlFor="amount" className="field-label mb-2.5">{t("conv.amount")}</label>
          <div className="flex items-center gap-2 rounded-[var(--radius-field)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-3 transition-shadow focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_3px_var(--color-brand-tint)]">
            <span className="font-mono text-sm text-[var(--color-muted)]">{fromCur.symbol}</span>
            <input
              id="amount"
              inputMode="decimal"
              autoComplete="off"
              value={raw}
              onChange={(e) => commitRaw(e.target.value)}
              onBlur={() => setRaw(formatNumber(amount, 2))}
              className="tnum w-full bg-transparent py-3.5 text-xl font-semibold outline-none"
              aria-label={`${t("conv.amount")} · ${tr(fromCur.name)}`}
            />
          </div>
          <div className="mt-2.5">
            <CurrencyCombobox value={from} onChange={setFrom} label={t("conv.from")} exclude={[to]} />
          </div>
        </div>

        {/* Swap */}
        <div className="flex justify-center sm:pb-[4.6rem]">
          <button
            type="button"
            onClick={swap}
            aria-label={t("conv.swap")}
            className="group grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-all duration-300 hover:scale-110 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:shadow-[0_0_0_4px_var(--color-brand-tint)] active:scale-95"
          >
            <span className="transition-transform duration-500 group-hover:rotate-180">⇄</span>
          </button>
        </div>

        {/* Resultado + moneda destino */}
        <div>
          <span className="field-label mb-2.5">{t("conv.result")}</span>
          <div className="flex min-h-[3.5rem] items-center rounded-[var(--radius-field)] border border-[color-mix(in_oklab,var(--color-brand)_25%,var(--color-line))] bg-[var(--color-brand-tint)] px-3">
            <output className="tnum text-xl font-bold text-[var(--color-brand-strong)]" aria-live="polite">
              <AnimatedNumber value={result} format={(n) => formatMoney(n, to)} />
            </output>
          </div>
          <div className="mt-2.5">
            <CurrencyCombobox value={to} onChange={setTo} label={t("conv.to")} exclude={[from]} />
          </div>
        </div>
      </div>

      {/* Línea de tipo de cambio */}
      <div className="mt-6 border-t border-[var(--color-line)] pt-4">
        <p className="tnum text-sm">
          1 {fromCur.code} ={" "}
          <AnimatedNumber
            className="font-semibold text-[var(--color-brand-strong)]"
            value={rate}
            format={formatRate}
          />{" "}
          {toCur.code}
          <span className="mx-2 text-[var(--color-line-strong)]">·</span>
          <span className="text-[var(--color-muted)]">
            1 {toCur.code} = {formatRate(inverse)} {fromCur.code}
          </span>
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
          <span className="chip chip-static !py-1 !text-[0.68rem]">{t("conv.midMarket")}</span>
          {status === "snapshot" ? (
            <span title={t("conv.offline")}>{t("conv.snapshot")}</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[var(--color-positive)]">
              <RefreshRing refreshedAt={refreshedAt} active={refreshing} />
              {t("conv.live")}
            </span>
          )}
          <span aria-hidden>·</span>
          <span suppressHydrationWarning>
            {t("conv.updated")}{" "}
            {refreshedAt ? formatRelative(refreshedAt / 1000) : formatRelative(rates.updated)}
          </span>
        </div>
      </div>
    </div>
  );
}
