import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CURRENCIES } from "@/lib/currencies";
import { Flag } from "@/components/ui/flag";
import { makeSlug } from "@/lib/pairs";
import { SNAPSHOT, pairRate } from "@/lib/rates";
import { formatRate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Todas las monedas",
  description:
    "Listado de monedas con su tipo de cambio contra el dólar estadounidense al valor medio de mercado. Entrá a cualquiera para ver el conversor, el gráfico histórico y la tabla de montos.",
  alternates: { canonical: `${SITE.url}/monedas` },
};

export default function CurrenciesPage() {
  const rows = CURRENCIES.filter((c) => c.code !== "USD");

  return (
    <>
      <section className="wrap pt-10 pb-2">
        <p className="eyebrow">Directorio</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Todas las monedas</h1>
        <p className="mt-3 max-w-xl text-[var(--color-muted)]">
          Tipo de cambio contra el dólar estadounidense, al valor medio de mercado. Tocá
          cualquiera para abrir el conversor completo.
        </p>
      </section>

      <div className="wrap mt-6">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((c) => {
            const rate = pairRate("USD", c.code, SNAPSHOT.rates);
            return (
              <li key={c.code}>
                <Link
                  href={`/convertir/${makeSlug("USD", c.code)}`}
                  className="card flex items-center gap-3 p-4 transition-transform hover:-translate-y-0.5"
                >
                  <Flag code={c.code} size="lg" />
                  <span className="min-w-0">
                    <span className="block font-mono text-sm font-semibold">{c.code}</span>
                    <span className="block truncate text-xs text-[var(--color-muted)]">{c.name}</span>
                  </span>
                  <span className="tnum ml-auto text-right text-sm">
                    <span className="block text-[var(--color-muted)]">1 USD</span>
                    <span className="block font-semibold text-[var(--color-brand-strong)]">
                      {formatRate(rate)}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
