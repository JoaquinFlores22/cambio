// Configuración central del sitio. Cambiar acá para rebrandear el producto por cliente.
export const SITE = {
  name: "Cambio",
  // Glifo de la marca (flechas de intercambio). Se usa junto al wordmark.
  glyph: "⇄",
  tagline: "Convertí divisas al tipo real de mercado.",
  description:
    "Conversor de divisas con el tipo medio de mercado, gráfico histórico y las cotizaciones del dólar en Argentina (oficial, blue y MEP). Sin comisiones ocultas, datos actualizados cada día.",
  // URL de producción. Cambiar por el dominio del cliente al entregar.
  url: "https://cambio.example",
  locale: "es_AR",
  // Crédito del estudio en el footer. Vaciar si el cliente no lo quiere.
  madeBy: { label: "Estudio Flores", href: "https://estudioflores.example" },
  // Contacto para la demo / venta.
  whatsapp: "5491169024270",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Conversor" },
  { href: "/monedas", label: "Monedas" },
  { href: "/alertas", label: "Alertas" },
  { href: "/como-funciona", label: "Cómo funciona" },
] as const;
