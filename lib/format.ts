import { getCurrency } from "./currencies";

// Locale de formato. Por defecto es-AR (mercado principal). `LangProvider` lo cambia a "en"
// cuando el usuario pasa a inglés, así fechas y tiempos relativos también quedan traducidos.
let LOCALE = "es-AR";
export function setFormatLocale(lang: "es" | "en") {
  LOCALE = lang === "en" ? "en" : "es-AR";
}

/**
 * Cantidad de dinero con el símbolo de la moneda. Usa los decimales propios de la moneda como
 * mínimo, pero agrega precisión cuando el valor es chico (p. ej. 1 ARS → US$ 0,00066).
 */
export function formatMoney(value: number, code: string): string {
  if (!Number.isFinite(value)) return "—";
  const c = getCurrency(code);
  const abs = Math.abs(value);
  let decimals = c.decimals;
  if (abs > 0 && abs < 1) {
    if (abs >= 0.1) decimals = Math.max(c.decimals, 4);
    else if (abs >= 0.001) decimals = 5;
    else if (abs >= 0.00001) decimals = 7;
    else decimals = 9;
  }
  const n = value.toLocaleString(LOCALE, {
    minimumFractionDigits: Math.min(decimals, c.decimals),
    maximumFractionDigits: decimals,
  });
  return `${c.symbol} ${n}`;
}

/** Número "pelado" (sin símbolo), útil para inputs y tablas. */
export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Tipo de cambio con precisión adaptativa. */
export function formatRate(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const decimals = value >= 100 ? 2 : value >= 1 ? 4 : value >= 0.01 ? 5 : 6;
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
}

export function parseAmount(raw: string): number {
  // Acepta "1.234,56" (es-AR) y "1234.56" (formato plano).
  const cleaned = raw.trim().replace(/\s/g, "");
  if (cleaned === "") return NaN;
  const hasComma = cleaned.includes(",");
  const normalized = hasComma ? cleaned.replace(/\./g, "").replace(",", ".") : cleaned;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

/** "hace 3 minutos" / "3 minutes ago", a partir de un timestamp o fecha ISO. */
export function formatRelative(input: number | string): string {
  const ms = typeof input === "number" ? input * 1000 : Date.parse(input);
  if (!Number.isFinite(ms)) return "";
  const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });
  const diffSec = Math.round((ms - Date.now()) / 1000);
  const abs = Math.abs(diffSec);
  if (abs < 60) return rtf.format(Math.round(diffSec), "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  return rtf.format(Math.round(diffSec / 86400), "day");
}

export function formatDate(input: number | string): string {
  const ms = typeof input === "number" ? input * 1000 : Date.parse(input);
  if (!Number.isFinite(ms)) return "";
  return new Date(ms).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
