"use client";

// i18n liviano para el "chrome" de la interfaz (nav, conversor, botones, textos comunes).
// El contenido largo de las páginas de pares está en español (producto orientado a Argentina);
// sumar inglés ahí es cambiar los diccionarios de `pairs`, no tocar componentes.
//
// Persiste el idioma en localStorage y actualiza <html lang>. Default: es.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, string>;

const ES: Dict = {
  "nav.converter": "Conversor",
  "nav.currencies": "Monedas",
  "nav.alerts": "Alertas",
  "nav.how": "Cómo funciona",
  "nav.openMenu": "Abrir menú",

  "conv.amount": "Monto",
  "conv.from": "De",
  "conv.to": "A",
  "conv.swap": "Invertir monedas",
  "conv.result": "resultado",
  "conv.midMarket": "Tipo medio de mercado",
  "conv.updated": "Actualizado",
  "conv.rateLine": "{from} = {rate} {to}",
  "conv.inverseLine": "1 {to} = {rate} {from}",
  "conv.live": "En vivo",
  "conv.snapshot": "Última cotización guardada",
  "conv.offline": "Sin conexión con la fuente — mostrando el último valor disponible.",
  "conv.searchCurrency": "Buscar moneda",
  "conv.noResults": "Sin resultados",

  "table.title": "Conversiones frecuentes",
  "table.amountIn": "{code}",
  "table.reverseTitle": "En sentido inverso",

  "chart.title": "Evolución del tipo de cambio",
  "chart.range.30": "30 días",
  "chart.range.90": "90 días",
  "chart.range.365": "1 año",
  "chart.unavailable": "No hay datos históricos para este par todavía.",
  "chart.loading": "Cargando gráfico…",
  "chart.change": "{sign}{pct}% en {days} días",

  "ar.title": "Dólar en Argentina",
  "ar.subtitle": "En Argentina conviven varias cotizaciones. Estas son las de hoy.",
  "ar.buy": "Compra",
  "ar.sell": "Venta",
  "ar.spread": "Brecha vs. oficial",

  "cta.alerts": "Crear alerta de tipo de cambio",
  "cta.viewPair": "Ver par completo",
  "cta.allCurrencies": "Ver todas las monedas",

  "common.poweredBy": "Datos: tipo medio de mercado + cotizaciones del dólar argentino.",
  "common.madeBy": "Hecho por",
  "common.disclaimer":
    "Los valores son de referencia y pueden diferir del precio final de una operación. No constituye asesoramiento financiero.",
  "footer.rights": "Todos los derechos reservados.",
  "footer.popularPairs": "Pares populares",
  "footer.product": "Producto",
};

const EN: Dict = {
  "nav.converter": "Converter",
  "nav.currencies": "Currencies",
  "nav.alerts": "Alerts",
  "nav.how": "How it works",
  "nav.openMenu": "Open menu",

  "conv.amount": "Amount",
  "conv.from": "From",
  "conv.to": "To",
  "conv.swap": "Swap currencies",
  "conv.result": "result",
  "conv.midMarket": "Mid-market rate",
  "conv.updated": "Updated",
  "conv.rateLine": "{from} = {rate} {to}",
  "conv.inverseLine": "1 {to} = {rate} {from}",
  "conv.live": "Live",
  "conv.snapshot": "Last saved rate",
  "conv.offline": "No connection to the source — showing the last available value.",
  "conv.searchCurrency": "Search currency",
  "conv.noResults": "No results",

  "table.title": "Common conversions",
  "table.amountIn": "{code}",
  "table.reverseTitle": "The other way around",

  "chart.title": "Exchange rate over time",
  "chart.range.30": "30 days",
  "chart.range.90": "90 days",
  "chart.range.365": "1 year",
  "chart.unavailable": "No historical data for this pair yet.",
  "chart.loading": "Loading chart…",
  "chart.change": "{sign}{pct}% in {days} days",

  "ar.title": "US dollar in Argentina",
  "ar.subtitle": "Argentina has several parallel exchange rates. Here are today's.",
  "ar.buy": "Buy",
  "ar.sell": "Sell",
  "ar.spread": "Gap vs. official",

  "cta.alerts": "Create a rate alert",
  "cta.viewPair": "View full pair",
  "cta.allCurrencies": "View all currencies",

  "common.poweredBy": "Data: mid-market rate + Argentine dollar quotes.",
  "common.madeBy": "Made by",
  "common.disclaimer":
    "Values are indicative and may differ from the final price of a transaction. Not financial advice.",
  "footer.rights": "All rights reserved.",
  "footer.popularPairs": "Popular pairs",
  "footer.product": "Product",
};

const DICTS: Record<Lang, Dict> = { es: ES, en: EN };

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LangContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "cambio:lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      /* storage bloqueado: se queda en 'es' */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = DICTS[lang];
      const str = dict[key] ?? ES[key] ?? key;
      return interpolate(str, vars);
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}
