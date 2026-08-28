"use client";

// i18n de toda la aplicación — contenido y UX.
//
// - `t(key, vars?)`  → strings de interfaz (nav, botones, labels del conversor…), del
//   diccionario UI de acá abajo.
// - `tr(bilingual)`  → resuelve un objeto `{ es, en }` (lo usan `lib/pairs.ts` y
//   `lib/content.ts` para el contenido largo de las páginas).
//
// El idioma se persiste en localStorage y se refleja en <html lang>. Default: es.
// Como el sitio es export estático, el HTML servido está en español (mercado principal:
// Argentina) y el cambio a inglés ocurre en el cliente, al instante, sobre toda la página.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { setFormatLocale } from "./format";

export type Lang = "es" | "en";

export type Bilingual<T = string> = { es: T; en: T };

type Dict = Record<string, string>;

const ES: Dict = {
  "nav.converter": "Conversor",
  "nav.currencies": "Monedas",
  "nav.alerts": "Alertas",
  "nav.how": "Cómo funciona",
  "nav.menu": "Menú",
  "nav.close": "Cerrar",

  "conv.amount": "Monto",
  "conv.from": "De",
  "conv.to": "A",
  "conv.swap": "Invertir monedas",
  "conv.result": "Resultado",
  "conv.midMarket": "Tipo medio de mercado",
  "conv.updated": "Actualizado",
  "conv.live": "En vivo",
  "conv.snapshot": "Última cotización guardada",
  "conv.offline": "Sin conexión con la fuente — se muestra el último valor disponible.",
  "conv.searchCurrency": "Buscar moneda",
  "conv.noResults": "Sin resultados",
  "conv.seeDetail": "Ver todo sobre {pair}",

  "table.title": "Conversiones frecuentes",
  "table.reverseTitle": "En sentido inverso",
  "table.showMore": "Ver tabla completa",
  "table.showLess": "Ver menos",

  "chart.title": "Evolución del tipo de cambio",
  "chart.range.30": "30 días",
  "chart.range.90": "90 días",
  "chart.range.365": "1 año",
  "chart.unavailable": "Todavía no hay datos históricos para este par.",
  "chart.loading": "Cargando gráfico…",
  "chart.change": "{sign}{pct}% en {days} días",

  "ar.title": "Dólar en Argentina",
  "ar.subtitle": "En Argentina conviven varias cotizaciones. Estas son las de hoy.",
  "ar.buy": "Compra",
  "ar.sell": "Venta",
  "ar.spread": "Brecha vs. oficial",
  "ar.seeAll": "Ver todas las cotizaciones",

  "faq.title": "Preguntas frecuentes",
  "faq.pairTitle": "Preguntas sobre {pair}",

  "pair.breadcrumb": "Conversor",
  "pair.convert": "Convertir {from} a {to}",
  "pair.reverse": "Ver {title} ({from} a {to})",
  "pair.others": "Otros pares",

  "footer.disclaimer":
    "Los valores son de referencia y pueden diferir del precio final de una operación. No constituye asesoramiento financiero.",
  "footer.rights": "Todos los derechos reservados.",
  "footer.popularPairs": "Pares populares",
  "footer.product": "Producto",
  "footer.madeBy": "Hecho por",
  "footer.dataNote": "Datos: tipo medio de mercado + cotizaciones del dólar argentino.",

  "common.mostSearched": "Pares más buscados",
  "common.goToConverter": "Ir al conversor",
};

const EN: Dict = {
  "nav.converter": "Converter",
  "nav.currencies": "Currencies",
  "nav.alerts": "Alerts",
  "nav.how": "How it works",
  "nav.menu": "Menu",
  "nav.close": "Close",

  "conv.amount": "Amount",
  "conv.from": "From",
  "conv.to": "To",
  "conv.swap": "Swap currencies",
  "conv.result": "Result",
  "conv.midMarket": "Mid-market rate",
  "conv.updated": "Updated",
  "conv.live": "Live",
  "conv.snapshot": "Last saved rate",
  "conv.offline": "No connection to the source — showing the last available value.",
  "conv.searchCurrency": "Search currency",
  "conv.noResults": "No results",
  "conv.seeDetail": "See everything about {pair}",

  "table.title": "Common conversions",
  "table.reverseTitle": "The other way around",
  "table.showMore": "Show full table",
  "table.showLess": "Show less",

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
  "ar.seeAll": "See all quotes",

  "faq.title": "Frequently asked questions",
  "faq.pairTitle": "Questions about {pair}",

  "pair.breadcrumb": "Converter",
  "pair.convert": "Convert {from} to {to}",
  "pair.reverse": "See {title} ({from} to {to})",
  "pair.others": "Other pairs",

  "footer.disclaimer":
    "Values are indicative and may differ from the final price of a transaction. Not financial advice.",
  "footer.rights": "All rights reserved.",
  "footer.popularPairs": "Popular pairs",
  "footer.product": "Product",
  "footer.madeBy": "Made by",
  "footer.dataNote": "Data: mid-market rate + Argentine dollar quotes.",

  "common.mostSearched": "Most searched pairs",
  "common.goToConverter": "Go to the converter",
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
  tr: <T>(value: Bilingual<T>) => T;
};

const LangContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "cambio:lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    // `?lang=en` en la URL tiene prioridad (links compartibles); si no, lo guardado.
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("lang");
      if (fromUrl === "es" || fromUrl === "en") {
        setLangState(fromUrl);
        localStorage.setItem(STORAGE_KEY, fromUrl);
        return;
      }
    } catch {
      /* noop */
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      /* storage bloqueado: queda en 'es' */
    }
  }, []);

  // Sincroniza el locale de formato (fechas, tiempos relativos) con el idioma, en render para
  // que el primer paint del cliente ya use el correcto.
  setFormatLocale(lang);

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
      const str = DICTS[lang][key] ?? ES[key] ?? key;
      return interpolate(str, vars);
    },
    [lang],
  );

  const tr = useCallback(
    <T,>(value: Bilingual<T>): T => (lang === "en" ? value.en : value.es),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, setLang, t, tr]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}
