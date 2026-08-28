import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { AlertsContent } from "@/components/pages/alerts-content";

export const metadata: Metadata = {
  title: "Alertas de tipo de cambio",
  description:
    "Configurá una alerta y recibí un aviso por email cuando un par de divisas llegue al valor que esperás.",
  alternates: { canonical: `${SITE.url}/alertas` },
};

export default function AlertsPage() {
  return <AlertsContent />;
}
