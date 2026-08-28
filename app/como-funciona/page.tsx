import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/ui/jsonld";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Qué es el tipo medio de mercado, de dónde salen las cotizaciones del dólar en Argentina y cómo leer el gráfico histórico.",
  alternates: { canonical: `${SITE.url}/como-funciona` },
};

const STEPS = [
  {
    n: "01",
    title: "El tipo medio de mercado",
    body: "Es el punto medio entre el precio de compra y el de venta de una divisa en el mercado mayorista: la referencia que usan los bancos entre sí. No incluye comisiones ni el margen que agrega una casa de cambio, así que es el número más neutral para comparar.",
  },
  {
    n: "02",
    title: "Las cotizaciones del dólar en Argentina",
    body: "Cuando el par toca el peso argentino, mostramos también el dólar oficial, blue, MEP, CCL, tarjeta y cripto, con la brecha calculada contra el oficial. Estos valores se toman de fuentes públicas del mercado local y se actualizan varias veces al día.",
  },
  {
    n: "03",
    title: "El gráfico histórico",
    body: "La línea muestra cómo se movió el par en los últimos 30, 90 o 365 días, con la variación porcentual del período. Sirve para ubicar el valor de hoy dentro de un rango, en vez de mirar un solo día suelto.",
  },
  {
    n: "04",
    title: "Actualización y modo sin conexión",
    body: "La página carga al instante con la última cotización guardada y, apenas hay red, la reemplaza por el valor en vivo. Si la fuente no responde, seguís viendo el último dato disponible, señalizado como tal.",
  },
];

export default function HowPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `Cómo funciona ${SITE.name}`,
          step: STEPS.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.body })),
        }}
      />

      <section className="wrap pt-10 pb-2">
        <p className="eyebrow">Cómo funciona</p>
        <h1 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
          Números claros, sin letra chica.
        </h1>
      </section>

      <div className="wrap mt-8 max-w-3xl">
        <ol className="divide-line">
          {STEPS.map((s) => (
            <li key={s.n} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-6">
              <span className="font-mono text-sm text-[var(--color-brand-strong)]">{s.n}</span>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <span aria-hidden />
              <p className="text-sm text-[var(--color-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="card mt-10 p-6">
          <p className="text-sm text-[var(--color-muted)]">{SITE.description}</p>
          <Link href="/" className="btn btn-primary mt-4">Ir al conversor</Link>
        </div>
      </div>
    </>
  );
}
