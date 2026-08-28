"use client";

import { useEffect, useState } from "react";
import { useRates } from "@/lib/use-rates";
import { ConverterCard } from "./converter-card";
import { ConversionTable } from "./conversion-table";
import { RateChart } from "./rate-chart";
import { ArRatesPanel } from "./ar-rates-panel";

type Props = {
  initialFrom?: string;
  initialTo?: string;
  initialAmount?: number;
  /** lee ?amount= / ?from= / ?to= al montar (solo para la home / links de la tabla) */
  readQuery?: boolean;
  showChart?: boolean;
  showTable?: boolean;
};

export function ConverterSection({
  initialFrom = "USD",
  initialTo = "ARS",
  initialAmount = 1000,
  readQuery = false,
  showChart = true,
  showTable = true,
}: Props) {
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
      {touchesArs && <ArRatesPanel ar={live.ar} />}
      {showChart && <RateChart from={from} to={to} />}
      {showTable && <ConversionTable from={from} to={to} rates={live.rates.rates} />}
    </div>
  );
}
