import type { Bilingual } from "./i18n";

// Metadata de cada moneda soportada. `iso` es el código de país ISO-3166 alfa-2 que usa el
// componente <Flag>. `decimals` define cuántos decimales mostrar: las monedas sin subunidad de
// uso corriente (JPY, CLP, COP grande, etc.) van con 0.

export type Currency = {
  code: string;
  name: Bilingual;
  iso: string;
  symbol: string;
  decimals: number;
};

const n = (es: string, en: string): Bilingual => ({ es, en });

export const CURRENCIES: Currency[] = [
  { code: "USD", name: n("Dólar estadounidense", "US dollar"), iso: "US", symbol: "US$", decimals: 2 },
  { code: "EUR", name: n("Euro", "Euro"), iso: "EU", symbol: "€", decimals: 2 },
  { code: "ARS", name: n("Peso argentino", "Argentine peso"), iso: "AR", symbol: "$", decimals: 2 },
  { code: "BRL", name: n("Real brasileño", "Brazilian real"), iso: "BR", symbol: "R$", decimals: 2 },
  { code: "CLP", name: n("Peso chileno", "Chilean peso"), iso: "CL", symbol: "$", decimals: 0 },
  { code: "UYU", name: n("Peso uruguayo", "Uruguayan peso"), iso: "UY", symbol: "$U", decimals: 2 },
  { code: "PYG", name: n("Guaraní paraguayo", "Paraguayan guaraní"), iso: "PY", symbol: "₲", decimals: 0 },
  { code: "BOB", name: n("Boliviano", "Bolivian boliviano"), iso: "BO", symbol: "Bs", decimals: 2 },
  { code: "PEN", name: n("Sol peruano", "Peruvian sol"), iso: "PE", symbol: "S/", decimals: 2 },
  { code: "COP", name: n("Peso colombiano", "Colombian peso"), iso: "CO", symbol: "$", decimals: 0 },
  { code: "MXN", name: n("Peso mexicano", "Mexican peso"), iso: "MX", symbol: "$", decimals: 2 },
  { code: "VES", name: n("Bolívar venezolano", "Venezuelan bolívar"), iso: "VE", symbol: "Bs.", decimals: 2 },
  { code: "GBP", name: n("Libra esterlina", "Pound sterling"), iso: "GB", symbol: "£", decimals: 2 },
  { code: "JPY", name: n("Yen japonés", "Japanese yen"), iso: "JP", symbol: "¥", decimals: 0 },
  { code: "CNY", name: n("Yuan chino", "Chinese yuan"), iso: "CN", symbol: "¥", decimals: 2 },
  { code: "CHF", name: n("Franco suizo", "Swiss franc"), iso: "CH", symbol: "CHF", decimals: 2 },
  { code: "CAD", name: n("Dólar canadiense", "Canadian dollar"), iso: "CA", symbol: "C$", decimals: 2 },
  { code: "AUD", name: n("Dólar australiano", "Australian dollar"), iso: "AU", symbol: "A$", decimals: 2 },
  { code: "NZD", name: n("Dólar neozelandés", "New Zealand dollar"), iso: "NZ", symbol: "NZ$", decimals: 2 },
  { code: "SEK", name: n("Corona sueca", "Swedish krona"), iso: "SE", symbol: "kr", decimals: 2 },
  { code: "NOK", name: n("Corona noruega", "Norwegian krone"), iso: "NO", symbol: "kr", decimals: 2 },
  { code: "DKK", name: n("Corona danesa", "Danish krone"), iso: "DK", symbol: "kr", decimals: 2 },
  { code: "ZAR", name: n("Rand sudafricano", "South African rand"), iso: "ZA", symbol: "R", decimals: 2 },
  { code: "INR", name: n("Rupia india", "Indian rupee"), iso: "IN", symbol: "₹", decimals: 2 },
  { code: "KRW", name: n("Won surcoreano", "South Korean won"), iso: "KR", symbol: "₩", decimals: 0 },
  { code: "SGD", name: n("Dólar de Singapur", "Singapore dollar"), iso: "SG", symbol: "S$", decimals: 2 },
  { code: "HKD", name: n("Dólar de Hong Kong", "Hong Kong dollar"), iso: "HK", symbol: "HK$", decimals: 2 },
  { code: "TRY", name: n("Lira turca", "Turkish lira"), iso: "TR", symbol: "₺", decimals: 2 },
  { code: "PLN", name: n("Esloti polaco", "Polish zloty"), iso: "PL", symbol: "zł", decimals: 2 },
  { code: "CZK", name: n("Corona checa", "Czech koruna"), iso: "CZ", symbol: "Kč", decimals: 2 },
  { code: "ILS", name: n("Séquel israelí", "Israeli shekel"), iso: "IL", symbol: "₪", decimals: 2 },
  { code: "AED", name: n("Dírham de EAU", "UAE dirham"), iso: "AE", symbol: "د.إ", decimals: 2 },
];

export const CURRENCY_BY_CODE: Record<string, Currency> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c]),
);

export const CURRENCY_CODES = CURRENCIES.map((c) => c.code);

export function getCurrency(code: string): Currency {
  return (
    CURRENCY_BY_CODE[code] ?? {
      code,
      name: { es: code, en: code },
      iso: code.slice(0, 2),
      symbol: code,
      decimals: 2,
    }
  );
}
