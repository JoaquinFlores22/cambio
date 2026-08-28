"use client";

import { useLang } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { ALERTS_PAGE as C } from "@/lib/content";
import { AlertForm } from "@/components/alerts/alert-form";

export function AlertsContent() {
  const { tr } = useLang();

  return (
    <>
      <section className="wrap pt-10 pb-2">
        <p className="eyebrow">{tr(C.eyebrow)}</p>
        <h1 className="mt-3 max-w-2xl text-3xl sm:text-4xl">{tr(C.title)}</h1>
        <p className="mt-3 max-w-xl text-[var(--color-muted)]">{tr(C.subtitle)}</p>
      </section>

      <div className="wrap mt-6 max-w-2xl">
        <AlertForm />
      </div>

      <section className="wrap mt-16 max-w-2xl">
        <h2 className="text-xl font-semibold">{tr(C.sellTitle)}</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{tr(C.sellBody)}</p>
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
            "Hola, me interesa la calculadora de divisas para mi sitio.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-4"
        >
          {tr(C.sellButton)}
        </a>
      </section>
    </>
  );
}
