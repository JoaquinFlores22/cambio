import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { AlertForm } from "@/components/alerts/alert-form";

export const metadata: Metadata = {
  title: "Alertas de tipo de cambio",
  description:
    "Configurá una alerta y recibí un aviso por email cuando un par de divisas llegue al valor que esperás.",
  alternates: { canonical: `${SITE.url}/alertas` },
};

export default function AlertsPage() {
  return (
    <>
      <section className="wrap pt-10 pb-2">
        <p className="eyebrow">Alertas</p>
        <h1 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
          Te avisamos cuando el cambio llegue a tu número.
        </h1>
        <p className="mt-3 max-w-xl text-[var(--color-muted)]">
          Elegí el par, la condición y el valor. Cuando se cumpla, recibís un email. Sin apps,
          sin crear cuenta.
        </p>
      </section>

      <div className="wrap mt-6 max-w-2xl">
        <AlertForm />
      </div>

      <section className="wrap mt-16 max-w-2xl">
        <h2 className="text-xl font-semibold">¿Querés esta calculadora en tu sitio?</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {SITE.name} es un producto white-label: se adapta a los colores y el dominio de tu
          empresa, con o sin el módulo de alertas por email. Escribinos y lo vemos.
        </p>
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
            "Hola, me interesa la calculadora de divisas para mi sitio.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-4"
        >
          Consultar por WhatsApp
        </a>
      </section>
    </>
  );
}
