import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { ConverterSection } from "@/components/converter/converter-section";
import { PairQuickPicks } from "@/components/home/pair-quick-picks";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/ui/jsonld";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
};

const VALUES = [
  {
    title: "Tipo medio de mercado",
    body: "El mismo valor de referencia que usan los bancos entre sí, sin el margen que suma cada casa de cambio. Es el punto de partida honesto para saber cuánto vale tu plata.",
  },
  {
    title: "El dólar argentino, completo",
    body: "Oficial, blue, MEP, CCL, tarjeta y cripto en una sola vista, con la brecha calculada. Ningún conversor internacional te muestra esto.",
  },
  {
    title: "Historial real",
    body: "Gráfico de 30 días, 90 días y un año para cada par, con la variación porcentual. Para decidir con contexto, no con la foto de un solo día.",
  },
];

const FAQ = [
  {
    q: "¿De dónde salen las cotizaciones?",
    a: "El tipo medio de mercado viene de un agregador internacional que se actualiza una vez por día. Las cotizaciones del dólar en Argentina (oficial, blue, MEP) se refrescan varias veces durante la jornada hábil.",
  },
  {
    q: "¿Cobran comisión?",
    a: "No. Cambio es una calculadora: te muestra el valor de referencia. No compra ni vende divisas, así que no hay spread ni comisión de por medio.",
  },
  {
    q: "¿Puedo usarlo sin conexión?",
    a: "La página carga con la última cotización guardada y funciona igual. Cuando recupera conexión, actualiza los valores automáticamente y te lo indica.",
  },
  {
    q: "¿Sirve para operaciones reales?",
    a: "Como referencia, sí. El precio final de una compra o venta concreta puede diferir según la entidad, el medio de pago y el momento. No es asesoramiento financiero.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: SITE.name,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: SITE.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="wrap pt-12 pb-4 sm:pt-16">
        <p className="eyebrow">{SITE.tagline}</p>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">
          Cuánto vale tu dinero en otra moneda, al valor real.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--color-muted)]">
          Conversor con el tipo medio de mercado, gráfico histórico y todas las
          cotizaciones del dólar en Argentina.
        </p>
      </section>

      <div className="wrap">
        <ConverterSection initialFrom="USD" initialTo="ARS" initialAmount={1000} readQuery />
      </div>

      <section className="wrap mt-10">
        <p className="mb-3 text-sm font-medium text-[var(--color-muted)]">Pares más buscados</p>
        <PairQuickPicks />
      </section>

      <section className="wrap mt-24">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">Por qué {SITE.name}</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal as="article" key={v.title} delay={i * 0.05} className="card p-6">
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap mt-24">
        <div className="card overflow-hidden p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl">Preguntas frecuentes</h2>
              <p className="mt-3 text-[var(--color-muted)]">
                Y si necesitás la calculadora en tu propio sitio,{" "}
                <Link href="/alertas" className="text-[var(--color-brand-strong)] underline underline-offset-4">
                  hablemos
                </Link>
                .
              </p>
            </div>
            <div className="divide-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {f.q}
                    <span className="text-[var(--color-brand-strong)] transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap mt-16">
        <div className="card flex flex-col items-start gap-4 bg-[var(--color-brand-tint)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">¿Seguís un tipo de cambio en particular?</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Configurá una alerta y te avisamos cuando llegue al valor que esperás.
            </p>
          </div>
          <Link href="/alertas" className="btn btn-primary shrink-0">
            Crear alerta
          </Link>
        </div>
      </section>
    </>
  );
}
