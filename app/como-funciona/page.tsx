import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { HOW_PAGE } from "@/lib/content";
import { HowContent } from "@/components/pages/how-content";
import { JsonLd } from "@/components/ui/jsonld";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Qué es el tipo medio de mercado, de dónde salen las cotizaciones del dólar en Argentina y cómo leer el gráfico histórico.",
  alternates: { canonical: `${SITE.url}/como-funciona` },
};

export default function HowPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `Cómo funciona ${SITE.name}`,
          step: HOW_PAGE.steps.map((s) => ({
            "@type": "HowToStep",
            name: s.title.es,
            text: s.body.es,
          })),
        }}
      />
      <HowContent />
    </>
  );
}
