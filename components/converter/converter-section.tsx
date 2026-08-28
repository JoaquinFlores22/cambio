"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useRates } from "@/lib/rates-context";
import { makeSlug, pairTitle } from "@/lib/pairs";
import { ConverterCard } from "./converter-card";
import { ConversionTable } from "./conversion-table";
import { RateChart } from "./rate-chart";
import { ArRatesPanel } from "./ar-rates-panel";
import { ArRatesStrip } from "./ar-rates-strip";

type Props = {
  initialFrom?: string;
  initialTo?: string;
  initialAmount?: number;
  /** lee ?amount= / ?from= / ?to= al montar (home y links de la tabla) */
  readQuery?: boolean;
  /** "home" muestra una vista compacta; "pair" muestra todo el detalle */
  variant?: "home" | "pair";
};

export function ConverterSection({
  initialFrom = "USD",
  initialTo = "ARS",
  initialAmount = 1000,
  readQuery = false,
  variant = "pair",
}: Props) {
  const { t, lang } = useLang();
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [amount, setAmount] = useState(initialAmount);
  const live = useRates();

  useEffect(() => {
    if (!readQuery || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = Number(params.get("amount"));
    if (Number.isFinite(q) && q > 0) setAmount(q);
    const f = params.get("from")?.toUpperCase();
    const tt = params.get("to")?.toUpperCase();
    if (f) setFrom(f);
    if (tt) setTo(tt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const touchesArs = from === "ARS" || to === "ARS";
  const pairSlug = makeSlug(from, to);

  return (
    <div className="space-y-6">
      <ConverterCard
        amount={amount}
        setAmount={setAmount}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        live={live}
      />

      {variant === "home" ? (
        <>
          {touchesArs && <ArRatesStrip ar={live.ar} pairSlug={pairSlug} />}
          <RateChart from={from} to={to} />
          <Link href={`/convertir/${pairSlug}`} className="link-arrow text-sm">
            {t("conv.seeDetail", { pair: pairTitle({ from, to }, lang) })}{" "}
            <span className="arrow" aria-hidden>→</span>
          </Link>
        </>
      ) : (
        <>
          {touchesArs && <ArRatesPanel ar={live.ar} />}
          <RateChart from={from} to={to} />
          <ConversionTable from={from} to={to} rates={live.rates.rates} />
        </>
      )}
    </div>
  );
}
