import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { CurrenciesContent } from "@/components/pages/currencies-content";

export const metadata: Metadata = {
  title: "Todas las monedas",
  description:
    "Listado de monedas con su tipo de cambio contra el dólar estadounidense al valor medio de mercado. Entrá a cualquiera para ver el conversor, el gráfico histórico y la tabla de montos.",
  alternates: { canonical: `${SITE.url}/monedas` },
};

export default function CurrenciesPage() {
  return <CurrenciesContent />;
}
