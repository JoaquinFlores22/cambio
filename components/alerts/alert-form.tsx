"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { getCurrency } from "@/lib/currencies";
import { SNAPSHOT, pairRate } from "@/lib/rates";
import { formatRate, parseAmount } from "@/lib/format";
import { CurrencyCombobox } from "@/components/converter/currency-combobox";

type Direction = "above" | "below";

export function AlertForm() {
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
    const f = getCurrency(from);
    const t = getCurrency(to);
    const dir = direction === "above" ? "suba por encima de" : "baje por debajo de";
    return `Alerta de tipo de cambio\nPar: ${f.code} → ${t.code}\nAvisar cuando 1 ${f.code} ${dir} ${formatRate(targetNum || 0)} ${t.code}\nHoy: ${formatRate(currentRate)} ${t.code}\nEmail: ${email}`;
  }, [from, to, direction, targetNum, currentRate, email]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(summary)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Alerta registrada</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Se abrió WhatsApp con el detalle de tu alerta. En una instalación productiva, este
          paso lo hace el backend: guarda la alerta y envía el aviso por email en cuanto se
          cumple la condición.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-[var(--radius-field)] border border-[var(--color-line)] bg-[var(--color-bg)] p-4 text-xs text-[var(--color-muted)]">
{summary}
        </pre>
        <button type="button" className="btn btn-ghost mt-4" onClick={() => setSent(false)}>
          Crear otra
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-2 block">Moneda base</label>
          <CurrencyCombobox value={from} onChange={setFrom} label="Moneda base" exclude={[to]} />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Moneda objetivo</label>
          <CurrencyCombobox value={to} onChange={setTo} label="Moneda objetivo" exclude={[from]} />
        </div>
      </div>

      <div>
        <span className="eyebrow mb-2 block">Condición</span>
        <div className="seg" role="group" aria-label="Condición de la alerta">
          <button type="button" aria-pressed={direction === "above"} onClick={() => setDirection("above")}>
            Sube por encima de
          </button>
          <button type="button" aria-pressed={direction === "below"} onClick={() => setDirection("below")}>
            Baja por debajo de
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="target" className="eyebrow mb-2 block">
            Valor objetivo ({to} por 1 {from})
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
            Hoy: 1 {from} = {formatRate(currentRate)} {to}
          </p>
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">Email para el aviso</label>
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
        Crear alerta
      </button>
      <p className="text-xs text-[var(--color-muted)]">
        Demo: al enviar se abre WhatsApp con el detalle. La versión instalada guarda la alerta y
        manda el email automáticamente.
      </p>
    </form>
  );
}
