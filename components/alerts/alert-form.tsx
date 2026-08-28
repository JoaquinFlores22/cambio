"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { getCurrency } from "@/lib/currencies";
import { useLang } from "@/lib/i18n";
import { ALERTS_PAGE as C } from "@/lib/content";
import { SNAPSHOT, pairRate } from "@/lib/rates";
import { formatRate, parseAmount } from "@/lib/format";
import { CurrencyCombobox } from "@/components/converter/currency-combobox";

type Direction = "above" | "below";

export function AlertForm() {
  const { t, tr } = useLang();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("ARS");
  const [direction, setDirection] = useState<Direction>("above");
  const [target, setTarget] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const currentRate = pairRate(from, to, SNAPSHOT.rates);
  const targetNum = parseAmount(target);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid = Number.isFinite(targetNum) && targetNum > 0 && emailOk;

  const summary = useMemo(() => {
    const f = getCurrency(from).code;
    const tt = getCurrency(to).code;
    const dir = tr(direction === "above" ? C.above : C.below).toLowerCase();
    const L = C.summaryLines;
    return [
      tr(L.header),
      `${tr(L.pair)}: ${f} → ${tt}`,
      tr(L.notify)
        .replace("{from}", f)
        .replace("{dir}", dir)
        .replace("{value}", formatRate(targetNum || 0))
        .replace("{to}", tt),
      `${tr(L.now)}: ${formatRate(currentRate)} ${tt}`,
      `${tr(L.email)}: ${email}`,
    ].join("\n");
  }, [from, to, direction, targetNum, currentRate, email, tr]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(summary)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold">{tr(C.doneTitle)}</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{tr(C.doneBody)}</p>
        <pre className="mt-4 overflow-x-auto rounded-[var(--radius-field)] border border-[var(--color-line)] bg-[var(--color-bg)] p-4 text-xs text-[var(--color-muted)]">
{summary}
        </pre>
        <button type="button" className="btn btn-ghost mt-4" onClick={() => setSent(false)}>
          {tr(C.another)}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label mb-2">{tr(C.base)}</label>
          <CurrencyCombobox value={from} onChange={setFrom} label={tr(C.base)} exclude={[to]} />
        </div>
        <div>
          <label className="field-label mb-2">{tr(C.target)}</label>
          <CurrencyCombobox value={to} onChange={setTo} label={tr(C.target)} exclude={[from]} />
        </div>
      </div>

      <div>
        <span className="field-label mb-2">{tr(C.condition)}</span>
        <div className="seg" role="group" aria-label={tr(C.condition)}>
          <button type="button" aria-pressed={direction === "above"} onClick={() => setDirection("above")}>
            {tr(C.above)}
          </button>
          <button type="button" aria-pressed={direction === "below"} onClick={() => setDirection("below")}>
            {tr(C.below)}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="target" className="field-label mb-2">
            {tr(C.targetValue).replace("{to}", to).replace("{from}", from)}
          </label>
          <input
            id="target"
            inputMode="decimal"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder={formatRate(currentRate)}
            className="field tnum"
          />
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            {tr(C.today).replace("{from}", from).replace("{rate}", formatRate(currentRate)).replace("{to}", to)}
          </p>
        </div>
        <div>
          <label htmlFor="email" className="field-label mb-2">{tr(C.email)}</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vos@ejemplo.com"
            className="field"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={!valid}>
        {tr(C.submit)}
      </button>
      <p className="text-xs text-[var(--color-muted)]">{tr(C.demoNote)}</p>
    </form>
  );
}
